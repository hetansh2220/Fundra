"use client";

import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">HR</span>
            </div>
            <span className="font-semibold text-gray-900 text-sm">HOPE RISE</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-gray-700">
            <a href="#who-we-are" className="hover:text-emerald-500 transition">WHO WE ARE</a>
            <a href="#what-we-do" className="hover:text-emerald-500 transition">WHAT WE DO</a>
            <a href="#news-events" className="hover:text-emerald-500 transition">NEWS & EVENTS</a>
            <a href="#get-involved" className="hover:text-emerald-500 transition">GET INVOLVED</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <Phone className="w-4 h-4 text-gray-700" />
            </button>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 text-xs font-semibold rounded-lg">
              DONATE
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}