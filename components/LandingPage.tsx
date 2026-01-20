"use client";

import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import PartnersTicker from "@/components/PartnersTicker"
import WhatWeDoSection from "@/components/WhatWeDoSection"
import ImpactSection from "@/components/ImpactSection"
import DonationForm from "@/components/DonationForm"
import CampaignStories from "@/components/CampaignStories"
import Footer from "@/components/Footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <PartnersTicker />
      <WhatWeDoSection />
      <ImpactSection />
      <DonationForm />
      <CampaignStories />
      <Footer />
    </div>
  )
}