"use client";

import { Heart, ArrowRight } from "lucide-react"

export default function PartnersTicker() {
  return (
    <div className="bg-white border-y border-gray-200 py-4">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-emerald-500" />
            <span>QUICK DONATE</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <span className="text-gray-900">gofundme</span>
            <span className="text-gray-900">FAMILY ALLIANCE</span>
            <span className="text-gray-900">Medtronic</span>
          </div>

          <div className="flex items-center gap-2">
            <span>SCROLL DOWN</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  )
}