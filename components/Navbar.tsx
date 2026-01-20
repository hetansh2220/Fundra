"use client";
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="bg-[#ebe9dc] border-b border-[#d4d2c5]">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">HR</span>
            </div>
            <span className="font-semibold text-gray-800 text-sm">HOPE RISE</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-gray-800">
            <a href="#who-we-are" className="hover:text-gray-600 transition">WHO WE ARE</a>
            <a href="#what-we-do" className="hover:text-gray-600 transition">WHAT WE DO</a>
            <a href="#news-events" className="hover:text-gray-600 transition">NEWS & EVENTS</a>
            <a href="#get-involved" className="hover:text-gray-600 transition">GET INVOLVED</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-[#d4d2c5] rounded-full transition">
              <Phone className="w-4 h-4 text-gray-800" />
            </button>
            <Button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2 text-xs font-semibold rounded-sm">
              DONATE
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}