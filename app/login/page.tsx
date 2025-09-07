'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setLoading(true);
  
      try {
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });
  
        if (result?.error) {
          setError('Invalid email or password');
        } else {
          router.push('/mainpage'); // Redirect to main page on success
          router.refresh(); // Refresh to update session state
        }
      } catch (error) {
        setError('An error occurred during login');
      } finally {
        setLoading(false);
      }
    };
  

  return (
    <div className="min-h-screen bg-pastel-gradient flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-celadon/20 shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-poppins font-bold text-charcoal">Welcome Back</CardTitle>
          <CardDescription className="text-sage-dark">Sign in to continue your climate journey</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-charcoal font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                className="border-celadon/30 focus:border-pistachio focus:ring-pistachio/20"
                required
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <Link href="/forgot-password" className="text-pistachio hover:text-celadon transition-colors">
                Forgot password?
              </Link>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-pistachio hover:bg-celadon text-white font-medium py-2.5 disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
          <div className="text-center text-sm text-sage-dark">
            Don't have an account?{" "}
            <Link href="/signup" className="text-pistachio hover:text-celadon font-medium transition-colors">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}