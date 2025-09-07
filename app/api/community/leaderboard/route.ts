import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

// GET leaderboard (sorted by points)
export async function GET() {
  await connectToDatabase();
  const leaderboard = await User.find()
    .sort({ points: -1 })
    .limit(20) // top 20 users
    .select("name avatar points badge");

  // Add rank numbers
  const ranked = leaderboard.map((user, i) => ({
    rank: i + 1,
    user: user.name,
    avatar: user.avatar,
    points: user.points,
    badge: user.badge,
  }));

  return NextResponse.json(ranked);
}
