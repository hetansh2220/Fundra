"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export default function CampaignStories() {
  const campaigns = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      status: "FUNDED",
      statusColor: "bg-emerald-500",
      category: "AI & Machine Learning",
      categoryBg: "bg-blue-100",
      categoryText: "text-blue-800",
      title: "AI-Powered Health Assistant",
      description: "Built an AI app that helps patients track symptoms and get personalized health insights. Now serving 10K+ users.",
      raised: "$125,000",
      goal: "$125,000",
      backers: "234 Backers",
      progress: 100
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      status: "IN PROGRESS",
      statusColor: "bg-yellow-500",
      category: "SaaS Platform",
      categoryBg: "bg-purple-100",
      categoryText: "text-purple-800",
      title: "Smart Project Manager",
      description: "Revolutionary project management tool with automated workflows and AI-driven insights for remote teams.",
      raised: "$68,500",
      goal: "$100,000",
      backers: "156 Backers",
      progress: 68.5
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop",
      status: "FUNDED",
      statusColor: "bg-emerald-500",
      category: "Mobile App",
      categoryBg: "bg-green-100",
      categoryText: "text-green-800",
      title: "EcoTrack - Carbon Footprint App",
      description: "Mobile app helping users track and reduce their carbon footprint through daily activities and challenges.",
      raised: "$85,000",
      goal: "$85,000",
      backers: "412 Backers",
      progress: 100
    }
  ]

  return (
    <section className="py-20 bg-[#ccc5b0]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-gray-600 mb-3 tracking-wider">SUCCESS STORIES</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Innovative Ideas Brought<br />To Life
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how entrepreneurs and innovators turned their tech visions into reality with community backing
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="bg-white border-2 border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute top-4 right-4 ${campaign.statusColor} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                  {campaign.status}
                </div>
              </div>
              <CardContent className="p-6">
                <div className="mb-4">
                  <span className={`inline-block ${campaign.categoryBg} ${campaign.categoryText} text-xs font-semibold px-3 py-1 rounded-full`}>
                    {campaign.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{campaign.title}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {campaign.description}
                </p>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Raised</span>
                    <span className="font-semibold text-gray-900">{campaign.raised}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{width: `${campaign.progress}%`}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{campaign.backers}</span>
                    <span>Goal: {campaign.goal}</span>
                  </div>
                </div>
                <Button variant="ghost" className="w-full justify-between text-gray-800 hover:bg-gray-50 font-semibold text-sm group">
                  Read Full Story
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Stories Button */}
        <div className="text-center mt-12">
          <Button variant="outline" className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-3 text-sm font-semibold rounded-xl">
            VIEW ALL STORIES
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}