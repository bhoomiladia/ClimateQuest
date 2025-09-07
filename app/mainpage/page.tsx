'use client'

import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BookOpen, MessageSquare, BarChart3, User, LogOut, Settings } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function MainPage() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  const features = [

    {
      title: "Study",
      description: "Interactive climate lessons and educational content",
      icon: BookOpen,
      href: "/study",
      color: "bg-celadon hover:bg-pistachio",
    },
    {
      title: "Chatbot",
      description: "Get instant answers about climate science and solutions",
      icon: MessageSquare,
      href: "/chatbot",
      color: "bg-pistachio hover:bg-celadon",
    },
    {
      title: "Community",
      description: "Connect with other climate enthusiasts and share ideas",
      icon: User,
      href: "/community",
      color: "bg-pistachio hover:bg-celadon",
    },
  ]

  // Redirect if not authenticated
  if (!session) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-pastel-gradient">
      {/* Top Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-celadon/30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-sage-dark font-poppins">ClimateQuest</h1>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="border-sage-dark/30 text-sage-dark hover:bg-sage-dark hover:text-white bg-transparent"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={"/diverse-user-avatars.png"} alt={session.user?.name || "User"} />
                    <AvatarFallback className="bg-celadon text-sage-dark">
                      {session.user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium text-sage-dark">{session.user?.name}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">{session.user?.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4 text-balance font-poppins">
            Welcome back, <span className="text-sage-dark">{session.user?.name?.split(" ")[0]}</span>!
          </h1>
          <p className="text-lg text-charcoal/80 max-w-2xl mx-auto text-balance leading-relaxed">
            Continue your climate education journey and make a positive impact on our planet.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Link key={feature.title} href={feature.href}>
                <Card className="group cursor-pointer border-celadon/30 hover:border-celadon transition-all duration-300 hover:shadow-lg bg-white/60 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-sage-dark font-poppins">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-charcoal/75 text-lg leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Quick Stats */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-celadon/30 p-8">
          <h2 className="text-2xl font-bold text-sage-dark mb-6 font-poppins text-center">Your Climate Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-sage-dark mb-2">12</div>
              <div className="text-charcoal/70">Lessons Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sage-dark mb-2">85%</div>
              <div className="text-charcoal/70">Progress This Month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sage-dark mb-2">24</div>
              <div className="text-charcoal/70">Days Streak</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}