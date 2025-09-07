// app/api/community/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Groq } from "groq-sdk";
import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/Task";
import User from "@/models/User";

const ALLOWED_MIME_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Server error: GROQ_API_KEY not set" },
        { status: 500 }
      );
    }

    await connectToDatabase();
    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const formData = await req.formData();
    const task = formData.get("task")?.toString();
    const userId = formData.get("userId")?.toString();
    const file = formData.get("image") as any;

    // Basic validations
    if (!task) return NextResponse.json({ success: false, message: "Task description required" }, { status: 400 });
    if (!userId) return NextResponse.json({ success: false, message: "User ID required" }, { status: 400 });
    if (!file || typeof file.arrayBuffer !== "function") {
      return NextResponse.json({ success: false, message: "Invalid image" }, { status: 400 });
    }
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json({ success: false, message: "Invalid file type" }, { status: 400 });
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ success: false, message: "File too large (max 5MB)" }, { status: 400 });
    }

    // Convert image to base64
    const bytes = Buffer.from(await file.arrayBuffer());
    const image_b64 = bytes.toString("base64");

    // AI Prompt
    const prompt = `**Eco Task Verification**
Task: "${task}"
Analyze the attached image to verify if the task was actually performed, If no clear evidence is found give 0 points.
If a negative activity harmful to the environment is detected, mark the task as False regardless of task completion also give negative points.
Respond exactly in this format:
VERIFICATION
Status: [Verified | Unclear | False]
Confidence: [XX]%
FEEDBACK
- [Feedback 1]
- [Feedback 2]
POINTS
[Number of points to award, 0-100]`;

    // Send request to Groq
    const response = await client.chat.completions.create({
      model: "meta-llama/llama-4-maverick-17b-128e-instruct",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: `data:${file.type};base64,${image_b64}` } },
          ],
        },
      ],
      max_tokens: 512,
    });

    const ai_message = response.choices[0]?.message?.content || "";

    // Parse AI response
    const verification: { status: "Verified" | "Unclear" | "False"; confidence: number } = { status: "Unclear", confidence: 0 };
    const feedback: string[] = [];
    let points = 0;

    if (ai_message.includes("===VERIFICATION===")) {
      const section = ai_message.split("===VERIFICATION===")[1].split("===")[0];
      for (const line of section.split("\n")) {
        const clean = line.trim();
        if (clean.startsWith("Status:")) verification.status = clean.split(":")[1].trim() as any;
        if (clean.startsWith("Confidence:")) verification.confidence = parseInt(clean.replace(/[^0-9]/g, ""));
      }
    }

    if (ai_message.includes("===FEEDBACK===")) {
      const section = ai_message.split("===FEEDBACK===")[1].split("===")[0];
      for (const line of section.split("\n")) {
        const clean = line.trim();
        if (clean.startsWith("-")) feedback.push(clean.replace("- ", "").trim());
      }
    }

    if (ai_message.includes("===POINTS===")) {
      const section = ai_message.split("===POINTS===")[1].split("===")[0];
      points = parseInt(section.trim()) || 0;
    }

    // Save task to DB
    const taskDoc = await Task.create({
      user: userId,
      description: task,
      imageUrl: `/uploads/${file.name || "upload.png"}`, // fallback filename
      verification,
      feedback,
      points,
    });

    // Update user points
    if (verification.status === "Verified" && points > 0) {
      await User.findByIdAndUpdate(userId, { $inc: { points } });
    }

    return NextResponse.json({ success: true, task: taskDoc, raw_response: ai_message });
  } catch (err: any) {
    console.error("Error verifying task:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
