"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Heart } from "lucide-react"
import { useState } from "react"

export default function DonationForm() {
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('monthly')
  const [amount, setAmount] = useState('50')
  const [customAmount, setCustomAmount] = useState('')
  const [donorName, setDonorName] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)

  const predefinedAmounts = ['10', '25', '50', '100']

  return (
    <section className="py-20 bg-[#ccc5b0]">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <CardContent className="p-8 md:p-12">
              {/* Choose Amount Header */}
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Choose amount</h3>
              
              {/* Donation Type Toggle */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <button
                  onClick={() => setDonationType('one-time')}
                  className={`text-sm font-medium transition ${
                    donationType === 'one-time' ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  One-Time Donation
                </button>
                
                <div className="relative">
                  <div className={`w-12 h-6 rounded-full transition ${
                    donationType === 'monthly' ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      donationType === 'monthly' ? 'left-7' : 'left-1'
                    }`}></div>
                  </div>
                </div>
                
                <button
                  onClick={() => setDonationType('monthly')}
                  className={`text-sm font-medium transition flex items-center gap-1 ${
                    donationType === 'monthly' ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  Monthly Support
                  {donationType === 'monthly' && <Heart className="w-4 h-4 text-emerald-500 fill-emerald-500" />}
                </button>
              </div>

              {/* Custom Amount Input */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={customAmount || amount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value)
                      setAmount(e.target.value)
                    }}
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 text-lg font-semibold text-gray-900 focus:outline-none focus:border-emerald-500"
                    placeholder="50"
                  />
                  <select className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent text-sm font-semibold text-gray-700 focus:outline-none cursor-pointer">
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                  </select>
                </div>
              </div>

              {/* Predefined Amount Buttons */}
              <div className="grid grid-cols-4 gap-3 mb-8">
                {predefinedAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => {
                      setAmount(amt)
                      setCustomAmount('')
                    }}
                    className={`py-3 rounded-xl text-sm font-semibold transition ${
                      amount === amt && !customAmount
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {amt}
                  </button>
                ))}
              </div>

              {/* Donate Anonymously Checkbox */}
              <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Donate Anonymously</span>
                </label>
              </div>

              {/* Donor Name Input */}
              <div className="mb-6">
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="Adam Cooper Jr."
                  className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-4 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Terms Agreement */}
              <div className="mb-8">
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="mt-0.5">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">I Agree To The Terms</span>
                </label>
              </div>

              {/* Donate and QR Code Buttons */}
              <div className="flex gap-4 mb-6">
                <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-6 text-base font-semibold rounded-xl">
                  DONATE
                </Button>
                <Button variant="outline" className="px-6 py-6 border-2 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-semibold">
                  USE QR CODE
                </Button>
              </div>

              {/* Trouble with Payment Link */}
              <div className="text-center">
                <button className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition">
                  TROUBLE WITH PAYMENT?
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}