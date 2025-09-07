import { Github, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-[#A8D38D] border-t border-[#B6DA9F] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-[#2D5016] mb-4 font-[var(--font-poppins)]">ClimateQuest Mini</h3>
            <p className="text-[#4A7C59] mb-4 max-w-md">
              Interactive climate education platform designed to engage young learners with gamified experiences and
              real-world impact tracking.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-[#2D5016] hover:text-[#F2FAE9] hover:bg-[#2D5016]/10">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-[#2D5016] hover:text-[#F2FAE9] hover:bg-[#2D5016]/10">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-[#2D5016] hover:text-[#F2FAE9] hover:bg-[#2D5016]/10">
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[#2D5016] mb-4">Learn</h4>
            <ul className="space-y-2 text-[#4A7C59]">
              <li>
                <a href="#" className="hover:text-[#2D5016] transition-colors">
                  Climate Basics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#2D5016] transition-colors">
                  Simulations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#2D5016] transition-colors">
                  Challenges
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#2D5016] transition-colors">
                  Resources
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#2D5016] mb-4">Support</h4>
            <ul className="space-y-2 text-[#4A7C59]">
              <li>
                <a href="#" className="hover:text-[#2D5016] transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#2D5016] transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#2D5016] transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#2D5016] transition-colors">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#B6DA9F] pt-8 text-center">
          <p className="text-[#4A7C59]">© 2025 ClimateQuest Mini. Empowering the next generation of climate heroes.</p>
        </div>
      </div>
    </footer>
  )
}
