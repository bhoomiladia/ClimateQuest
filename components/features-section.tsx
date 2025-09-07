"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Bot, Globe, BarChart3, Users } from "lucide-react"

const features = [
  {
    icon: Bot,
    title: "AI Tutor",
    description: "Personalized guidance & interactive Q&A",
    color: "text-[#A8D38D]",
  },
  {
    icon: Globe,
    title: "Mini Simulations",
    description: "See your choices impact the planet",
    color: "text-[#B6DA9F]",
  },
  {
    icon: BarChart3,
    title: "Eco Dashboard",
    description: "Track your eco-points and progress",
    color: "text-[#A8D38D]",
  },
  {
    icon: Users,
    title: "Community Challenges",
    description: "Fun ways to act collectively",
    color: "text-[#B6DA9F]",
  },
]

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in", "slide-in-from-bottom-4", "duration-700")
          }
        })
      },
      { threshold: 0.1 },
    )

    const cards = sectionRef.current?.querySelectorAll(".feature-card")
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-gradient-to-b from-[#F2FAE9] to-[#E7FFCE]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl text-center mb-4 font-[var(--font-poppins)] text-[#2D5016]">
          How ClimateQuest Works
        </h2>
        <p className="text-xl text-center mb-16 text-[#4A6741] max-w-2xl mx-auto">
          Interactive learning experiences designed to make climate education engaging and impactful
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="feature-card bg-white/80 border-[#B6DA9F]/30 hover:border-[#A8D38D]/60 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#B6DA9F]/20 backdrop-blur-sm"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <feature.icon className={`w-12 h-12 ${feature.color}`} />
                </div>
                <h3 className="text-xl mb-2 font-[var(--font-poppins)] text-[#2D5016]">{feature.title}</h3>
                <p className="text-[#4A6741]">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
