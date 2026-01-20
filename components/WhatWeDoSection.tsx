"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Headphones, Users, ArrowRight } from "lucide-react"

export default function WhatWeDoSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-gray-600 mb-3 tracking-wider">WHAT WE DO</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Providing Hope And Help<br />During Challenging Times
          </h2>
          <Button variant="outline" className="border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-6 py-2 text-xs font-semibold rounded-full">
            LEARN MORE
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Cards Section */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-16">
          {/* Make a Donation Card */}
          <Card className="bg-white border-2 border-gray-200 hover:shadow-lg transition">
            <CardContent className="p-6">
              <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Make a Donation</h3>
              <p className="text-sm text-gray-600 mb-6">
                Contribute today to help fund treatments, research, and vital support services for those battling cancer.
              </p>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">A</span>
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
                <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">P</span>
                </div>
                <span className="text-xs text-gray-600 ml-2">Payment Options</span>
              </div>

              <Button variant="ghost" className="w-full justify-between text-gray-800 hover:bg-gray-50 p-0 h-auto font-semibold text-sm">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Get Support Card */}
          <Card className="bg-white border-2 border-gray-200 hover:shadow-lg transition">
            <CardContent className="p-6">
              <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center mb-4">
                <Headphones className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get Support</h3>
              <p className="text-sm text-gray-600 mb-6">
                Access vital resources, financial aid, and counseling for cancer patients and their families in their time of need.
              </p>
              
              <div className="flex items-center gap-3 mb-4 text-xs font-semibold text-gray-700">
                <span># Financial Aid</span>
                <span># Therapy</span>
              </div>

              <Button variant="ghost" className="w-full justify-between text-gray-800 hover:bg-gray-50 p-0 h-auto font-semibold text-sm">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Become a Volunteer Card */}
          <Card className="bg-white border-2 border-gray-200 hover:shadow-lg transition">
            <CardContent className="p-6">
              <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Become a Volunteer</h3>
              <p className="text-sm text-gray-600 mb-6">
                Join our team of volunteers to support cancer patients, assist with community outreach, and make a positive impact.
              </p>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-pink-400 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-white"></div>
                </div>
                <span className="text-xs text-gray-600 ml-2">Join Our Team</span>
              </div>

              <Button variant="ghost" className="w-full justify-between text-gray-800 hover:bg-gray-50 p-0 h-auto font-semibold text-sm">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}