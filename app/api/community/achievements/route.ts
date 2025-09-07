import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Achievement from "@/models/Achievement";

// GET all achievements (with user info)
export async function GET() {
  await connectToDatabase();
  const achievements = await Achievement.find().populate("user", "name avatar");
  return NextResponse.json(achievements);
}

// POST a new achievement
export async function POST(req: Request) {
  await connectToDatabase();
  const { userId, title, description } = await req.json();

  const achievement = await Achievement.create({
    user: userId,
    title,
    description,
  });
  return NextResponse.json(achievement, { status: 201 });
}
