"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroOverlay() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none bg-pastel-gradient pt-16">
      <div className="relative mb-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-charcoal mb-6 text-balance font-poppins leading-tight">
          <span className="inline-block">Discover Climate</span>
          <br />
          <span className="inline-block text-sage-dark">Solutions Together</span>
        </h1>
      </div>

      <div className="relative mb-10">
        <p className="text-lg md:text-xl text-charcoal max-w-3xl text-balance leading-relaxed opacity-90">
          Engaging climate education through interactive lessons, sustainable practices, and community action for the
          next generation.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 pointer-events-auto mb-12">
        <Link href="/signup">
          <Button
            size="lg"
            className="bg-pistachio hover:bg-celadon text-white font-semibold px-10 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-poppins border-0"
          >
            Begin Your Journey
          </Button>
        </Link>

      </div>

      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-4 pointer-events-auto max-w-2xl">
        {["Climate Science", "Green Energy", "Conservation"].map((lesson, index) => (
          <div key={lesson} className="group cursor-pointer">
            <div className="bg-white/80 backdrop-blur-sm border border-celadon/30 rounded-full px-6 py-3 text-sm font-medium text-sage-dark hover:bg-celadon hover:text-white transition-all duration-300 group-hover:scale-105 shadow-sm">
              {lesson}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
