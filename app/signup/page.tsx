"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignupPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setSuccess("");
      setLoading(true);

      // Validation
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
  
        const data = await res.json();
  
        if (!res.ok) {
          setError(data.error || "Signup failed");
          setLoading(false);
          return;
        }
  
        setSuccess("Account created successfully!");
        setError("");
  
        // Redirect to login page after signup
        setTimeout(() => router.push("/login?message=Account created successfully"), 1500);
      } catch (err) {
        setError("Something went wrong");
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-pastel-gradient flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-celadon/20 shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-poppins font-bold text-charcoal">Join ClimateQuest</CardTitle>
          <CardDescription className="text-sage-dark">Start your journey to learn about climate change</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-charcoal font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-celadon/30 focus:border-pistachio focus:ring-pistachio/20"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-charcoal font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="border-celadon/30 focus:border-pistachio focus:ring-pistachio/20"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-charcoal font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password (min. 6 characters)"
                className="border-celadon/30 focus:border-pistachio focus:ring-pistachio/20"
                required
                minLength={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-charcoal font-medium">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="border-celadon/30 focus:border-pistachio focus:ring-pistachio/20"
                required
              />
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-pistachio hover:bg-celadon text-white font-medium py-2.5 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
          <div className="text-center text-sm text-sage-dark">
            Already have an account?{" "}
            <Link href="/login" className="text-pistachio hover:text-celadon font-medium transition-colors">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}