"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Target, Zap } from "lucide-react"

export function DashboardPreview() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#E7FFCE] to-[#D8FFB1]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl  text-center mb-4 font-[var(--font-poppins)] text-[#2D5016]">
          Track Your Impact
        </h2>
        <p className="text-xl text-center mb-16 text-[#4A7C59] max-w-2xl mx-auto">
          Gamified progress tracking with visual rewards and achievements
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white/80 border-[#B6DA9F] backdrop-blur-sm hover:shadow-lg hover:shadow-[#A8D38D]/20 transition-all duration-300">
            <CardHeader className="text-center">
              <Trophy className="w-12 h-12 text-[#A8D38D] mx-auto mb-2" />
              <CardTitle className="text-[#2D5016] font-[var(--font-poppins)]">Eco Points</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-[#A8D38D] mb-4">2,450</div>
              <Progress value={75} className="mb-2" />
              <p className="text-[#4A7C59]">Level 7 Climate Hero</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 border-[#B6DA9F] backdrop-blur-sm hover:shadow-lg hover:shadow-[#A8D38D]/20 transition-all duration-300">
            <CardHeader className="text-center">
              <Target className="w-12 h-12 text-[#B6DA9F] mx-auto mb-2" />
              <CardTitle className="text-[#2D5016] font-[var(--font-poppins)]">Actions Completed</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-[#B6DA9F] mb-4">47</div>
              <Progress value={60} className="mb-2" />
              <p className="text-[#4A7C59]">13 more to next badge</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 border-[#B6DA9F] backdrop-blur-sm hover:shadow-lg hover:shadow-[#A8D38D]/20 transition-all duration-300">
            <CardHeader className="text-center">
              <Zap className="w-12 h-12 text-[#D8FFB1] mx-auto mb-2" />
              <CardTitle className="text-[#2D5016] font-[var(--font-poppins)]">CO₂ Saved</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-[#D8FFB1] mb-4">156kg</div>
              <Progress value={85} className="mb-2" />
              <p className="text-[#4A7C59]">Monthly goal: 200kg</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
