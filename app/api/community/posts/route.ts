import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Post from "@/models/Post";
import User from "@/models/User";

export async function GET() {
  await connectToDatabase();

  // Get all posts with user info
  const posts = await Post.find()
    .sort({ createdAt: -1 }) // latest first
    .populate("user", "name avatar"); // populate user fields

  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  await connectToDatabase();

  try {
    const { userId, content, task, image, verification } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newPost = await Post.create({
      content,
      task: task || null,
      image: image || null,
      verification: verification || null,
      user: user._id, // reference the user
    });

    // Populate user info before returning
    await newPost.populate("user", "name avatar");

    return NextResponse.json(newPost, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
