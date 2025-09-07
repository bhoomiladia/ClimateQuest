"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Car, Lightbulb, Recycle } from "lucide-react"

const ecoActions = [
  {
    icon: Leaf,
    action: "Plant a Tree",
    impact: "+50 CO₂ absorbed per year",
    points: 100,
    color: "bg-[#A8D38D]",
  },
  {
    icon: Car,
    action: "Bike to School",
    impact: "-2kg CO₂ per day",
    points: 25,
    color: "bg-[#B6DA9F]",
  },
  {
    icon: Lightbulb,
    action: "Use LED Bulbs",
    impact: "-80% energy usage",
    points: 75,
    color: "bg-[#D8FFB1]",
  },
  {
    icon: Recycle,
    action: "Recycle Plastic",
    impact: "Save 2000L water",
    points: 50,
    color: "bg-[#E7FFCE]",
  },
]

export function InteractiveSection() {
  const [selectedAction, setSelectedAction] = useState<number | null>(null)
  const [totalPoints, setTotalPoints] = useState(0)

  const handleActionClick = (index: number, points: number) => {
    setSelectedAction(index)
    setTotalPoints((prev) => prev + points)

    // Reset selection after animation
    setTimeout(() => setSelectedAction(null), 1000)
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#F2FAE9] to-[#E7FFCE]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-[var(--font-poppins)] text-[#2D5016]">Try It Now!</h2>
        <p className="text-xl mb-12 text-[#4A7C59]">Choose one eco-action → See impact instantly</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {ecoActions.map((action, index) => (
            <Card
              key={index}
              className={`cursor-pointer transition-all duration-300 hover:scale-110 ${
                selectedAction === index
                  ? "animate-pulse scale-110 shadow-2xl shadow-[#A8D38D]/50"
                  : "hover:shadow-lg hover:shadow-[#B6DA9F]/30"
              } 
              bg-white/80 border-[#B6DA9F] backdrop-blur-sm hover:bg-[#F2FAE9]/50`}
              onClick={() => handleActionClick(index, action.points)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 rounded-full ${action.color} flex items-center justify-center mx-auto mb-4`}>
                  <action.icon className="w-8 h-8 text-[#2D5016]" />
                </div>
                <h3 className="font-bold text-[#2D5016] mb-2">{action.action}</h3>
                <p className="text-sm text-[#4A7C59] mb-2">{action.impact}</p>
                <p className="text-[#A8D38D] font-bold">+{action.points} points</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {totalPoints > 0 && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <Card className="bg-gradient-to-r from-[#D8FFB1] to-[#B6DA9F] p-6 text-[#2D5016] max-w-md mx-auto border-[#A8D38D]">
              <h3 className="text-2xl font-bold mb-2">Great Job!</h3>
              <p className="text-lg">
                You've earned <span className="font-bold">{totalPoints}</span> eco-points!
              </p>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}
