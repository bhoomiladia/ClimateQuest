"use client"


import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { HeroOverlay } from "@/components/hero-overlay"
import { FeaturesSection } from "@/components/features-section"
import { InteractiveSection } from "@/components/interactive-section"
import { DashboardPreview } from "@/components/dashboard-preview"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-pastel-gradient">
      <Navigation />

      {/* Hero Section with 3D Canvas */}
      <div className="relative h-screen w-full overflow-hidden">
          <Suspense fallback={null}>
          </Suspense>
        <HeroOverlay />
      </div>

      <FeaturesSection />
      <InteractiveSection />
      <DashboardPreview />
      <Footer />
    </div>
  )
}
