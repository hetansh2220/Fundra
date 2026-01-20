"use client";

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="bg-[#ccc5b0] py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Hope Rise<br />is Support
          </h1>

          <div className="flex items-center justify-center gap-4 mb-8">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 text-sm font-semibold rounded-xl">
              DONATE
            </Button>
            <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition font-semibold text-sm">
              I NEED HELP
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}