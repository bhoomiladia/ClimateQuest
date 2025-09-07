"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageCircle, Share2, Trophy, Users, Camera, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

export default function CommunityPage() {
  const { data: session } = useSession();

  const [posts, setPosts] = useState<any[]>([]);
  const [challenges, setChallenges] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  const [postContent, setPostContent] = useState("");
  const [taskText, setTaskText] = useState(""); 
  const [verificationImage, setVerificationImage] = useState<string | null>(null);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Fetch all data on mount
  useEffect(() => {
    fetch("/api/community/posts").then(r => r.json()).then(setPosts);
    fetch("/api/community/challenges").then(r => r.json()).then(setChallenges);
    fetch("/api/community/leaderboard").then(r => r.json()).then(setLeaderboard);
  }, []);

  // Upload image
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setVerificationImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Verify task
  const verifyTask = async () => {
    if (!taskText || !verificationImage || !session?.user?.id) return;
    setIsVerifying(true);
    setVerificationResult(null);

    try {
      const formData = new FormData();
      formData.append("task", taskText);
      formData.append("userId", session.user.id);
      const blob = await (await fetch(verificationImage)).blob();
      formData.append("image", blob, "task.png");

      const res = await fetch("/api/community/verify-task", { method: "POST", body: formData });
      const data = await res.json();

      if (data.success) {
        setVerificationResult({
          success: true,
          status: data.task.verification.status,
          points: data.task.points,
          raw_response: data.raw_response,
        });
      } else {
        setVerificationResult({ success: false, message: data.message || "Verification failed" });
      }
    } catch (err) {
      console.error(err);
      setVerificationResult({ success: false, message: "Verification failed. Try again." });
    } finally {
      setIsVerifying(false);
    }
  };

  // Share post
  const handleSharePost = async () => {
    if (!postContent && !verificationImage && !taskText) return;
    if (!session?.user) return;

    const res = await fetch("/api/community/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: postContent,
        task: taskText || null,
        image: verificationImage || null,
        verification: verificationResult || null,
        userId: session.user.id, // send just userId
      }),
    });

    const newPost = await res.json();

    // Prepend to posts to keep feed persistent
    setPosts([newPost, ...posts]);

    // Reset form
    setPostContent("");
    setTaskText("");
    setVerificationImage(null);
    setVerificationResult(null);
  };

  // Filter posts for "My Actions"
  const myPosts = posts.filter(p => p.user?.id === session?.user?.id);

  return (
    <div className="min-h-screen bg-pastel-gradient">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-celadon/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pistachio rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-charcoal">Climate Community</h1>
              <p className="text-sage-dark">Connect with fellow eco-warriors</p>
            </div>
          </div>
          <Link href="/mainpage">
            <Button variant="outline" className="border-celadon text-celadon hover:bg-celadon hover:text-white">
             Back
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="feed" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 border border-celadon/20">
            <TabsTrigger value="feed">My Actions</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
          </TabsList>

          {/* FEED */}
          <TabsContent value="feed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Share Your Eco-Action</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  placeholder="Share your thoughts or eco-action"
                  className="w-full p-3 border rounded-lg resize-none"
                  rows={3}
                  value={postContent}
                  onChange={e => setPostContent(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Describe the task you completed"
                  className="w-full mt-3 p-2 border rounded-lg"
                  value={taskText}
                  onChange={e => setTaskText(e.target.value)}
                />
                  {taskText && (
              <div className="mt-3">
                <label className="flex gap-2 items-center cursor-pointer">
                  <Camera className="h-4 w-4" />
                  Upload Verification Photo
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>

                {verificationImage && <img src={verificationImage} alt="preview" className="mt-2 h-20 rounded" />}

                {verificationResult && (
                  <div className="mt-2 p-2 border rounded bg-white/50">
                    {verificationResult.success ? (
                      <>
                        <p>Status: {verificationResult.status}</p>
                        <p>Points Earned: {verificationResult.points}</p>
                        <pre className="text-xs">{verificationResult.raw_response}</pre>
                      </>
                    ) : (
                      <p className="text-red-600">{verificationResult.message}</p>
                    )}
                  </div>
                )}

                {/* Show button only if verification hasn't succeeded yet */}
                {!verificationResult?.success && (
                  <Button onClick={verifyTask} disabled={isVerifying || !verificationImage} className="mt-3">
                    {isVerifying && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                    {isVerifying ? "Verifying..." : "Verify & Earn Points"}
                  </Button>
                )}
              </div>
            )}

                <Button onClick={handleSharePost} disabled={!postContent && !verificationImage && !taskText} className="mt-4">
                  Share
                </Button>
              </CardContent>
            </Card>

            {/* My posts */}
            {myPosts.map(post => (
              <Card key={post._id} className="rounded-2xl hover:shadow-md transition">
                <CardContent>
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={post.user?.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{post.user?.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{post.user?.name}</h3>
                      <p>{post.content}</p>
                      {post.task && (
                        <p className="mt-2 text-sm">
                          🌱 <strong>Task:</strong> {post.task}{" "}
                          {post.verification?.success ? (
                            <Badge className="ml-2 bg-green-500 text-white">✅ Verified (+{post.verification.points} pts)</Badge>
                          ) : post.verification ? (
                            <Badge className="ml-2 bg-red-500 text-white">❌ Not Verified</Badge>
                          ) : null}
                        </p>
                      )}
                      {post.image && <img src={post.image} alt="Task proof" className="mt-3 rounded-lg w-full max-h-72 object-cover" />}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* CHALLENGES */}
          <TabsContent value="challenges">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {challenges.map(ch => (
                <Card key={ch._id}>
                  <CardHeader>
                    <CardTitle>{ch.title}</CardTitle>
                    <CardDescription>{ch.difficulty}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{ch.description}</p>
                    <p>Participants: {ch.participants}</p>
                    <p>Reward: {ch.reward}</p>
                    <p>{ch.timeLeft}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* LEADERBOARD */}
          <TabsContent value="leaderboard">
            <div className="space-y-3">
              {leaderboard.map(user => (
                <Card key={user.rank} className="rounded-2xl hover:shadow-md transition">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl font-bold w-8 text-center">
                        {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : user.rank === 3 ? "🥉" : user.rank}
                      </div>
                      <div className="flex items-center gap-2">
                      <Avatar className="h-fit w-fit ">
                    <AvatarImage src={"/diverse-user-avatars.png"} alt={user.user || "User"} />
                    <AvatarFallback className="bg-celadon p-2 text-sage-dark">
                      {user.user
                        ?.split(" ")
                        .map((n:string) => n[0])
                        .join("") || "U"}
                    </AvatarFallback>
                  </Avatar>
                        <div>
                          <p className="font-semibold">{user.user}</p>
                          <p className="text-xs text-gray-500">{user.points} pts</p>
                        </div>
                      </div>
                    </div>
                    {user.badge && <Badge className="bg-celadon text-white">{user.badge}</Badge>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* POSTS TAB (All posts) */}
          <TabsContent value="posts">
            <div className="space-y-4">
              {posts.map(post => (
                <Card key={post._id} className="hover:shadow-md transition rounded-2xl">
                  <CardContent>
                    <div className="flex items-center gap-3 mb-3">
                      
                      <Avatar className="h-fit w-fit ">
                    <AvatarImage src={"/diverse-user-avatars.png"} alt={post.user?.name || "User"} />
                    <AvatarFallback className="bg-celadon p-2 text-sage-dark">
                      {post.user?.name
                        ?.split(" ")
                        .map((n:string) => n[0])
                        .join("") || "U"}
                    </AvatarFallback>
                  </Avatar>
                  
                      <div>
                        <h3 className="font-semibold">{post.user?.name || "Anonymous"}</h3>
                        <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                      </div>
                    </div>

                    <p className="text-gray-800 mb-3">{post.content}</p>
                    {post.image && <img src={post.image} alt="Post attachment" className="rounded-lg w-full max-h-72 object-cover mb-3" />}
                    {post.task && (
                      <Badge className="mb-3">🌱 Task: {post.task}</Badge>
                    )}
                    {post.verification?.success ? (
                      <Badge className="bg-green-500 text-white mb-3">
                        ✅ Verified (+{post.verification.points} pts)
                      </Badge>
                    ) : post.verification ? (
                      <Badge className="bg-red-500 text-white mb-3">❌ Not Verified</Badge>
                    ) : null}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

        </Tabs>
      </main>
    </div>
  );
}
