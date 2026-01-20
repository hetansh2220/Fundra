"use client";
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">HR</span>
              </div>
              <span className="font-bold text-white text-lg">HOPE RISE</span>
            </div>
            <p className="text-sm mb-6 text-gray-400 max-w-sm">
              Empowering innovators and entrepreneurs to bring their tech ideas to life through community-driven funding.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>support@hoperise.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>123 Innovation St, Tech Valley, CA 94000</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">COMPANY</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-emerald-500 transition">About Us</a></li>
              <li><a href="#" className="text-sm hover:text-emerald-500 transition">How It Works</a></li>
              <li><a href="#" className="text-sm hover:text-emerald-500 transition">Our Team</a></li>
              <li><a href="#" className="text-sm hover:text-emerald-500 transition">Careers</a></li>
              <li><a href="#" className="text-sm hover:text-emerald-500 transition">Press</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">SUPPORT</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-emerald-500 transition">Help Center</a></li>
              <li><a href="#" className="text-sm hover:text-emerald-500 transition">Safety & Trust</a></li>
              <li><a href="#" className="text-sm hover:text-emerald-500 transition">Contact Us</a></li>
              <li><a href="#" className="text-sm hover:text-emerald-500 transition">FAQs</a></li>
              <li><a href="#" className="text-sm hover:text-emerald-500 transition">Blog</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">RESOURCES</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-emerald-500 transition">Start a Campaign</a></li>
              <li><a href="#" className="text-sm hover:text-emerald-500 transition">Success Stories</a></li>
              <li><a href="#" className="text-sm hover:text-emerald-500 transition">Campaign Tips</a></li>
              <li><a href="#" className="text-sm hover:text-emerald-500 transition">API Documentation</a></li>
              <li><a href="#" className="text-sm hover:text-emerald-500 transition">Developer Tools</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-2xl">
            <h3 className="text-white font-semibold mb-3 text-sm">STAY UPDATED</h3>
            <p className="text-sm text-gray-400 mb-4">Subscribe to our newsletter for the latest tech innovations and funding success stories.</p>
            <div className="flex gap-3">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-500"
              />
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 text-sm font-semibold rounded-lg">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-6 text-xs text-gray-400">
            <a href="#" className="hover:text-emerald-500 transition">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-500 transition">Terms of Service</a>
            <a href="#" className="hover:text-emerald-500 transition">Cookie Policy</a>
            <a href="#" className="hover:text-emerald-500 transition">Accessibility</a>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-emerald-500 rounded-full flex items-center justify-center transition">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-emerald-500 rounded-full flex items-center justify-center transition">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-emerald-500 rounded-full flex items-center justify-center transition">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-emerald-500 rounded-full flex items-center justify-center transition">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-emerald-500 rounded-full flex items-center justify-center transition">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="text-center mt-8 pt-8 border-t border-gray-800">
          <p className="text-xs text-gray-500">
            © 2026 Hope Rise. All rights reserved. Made with ❤️ for innovators worldwide.
          </p>
        </div>
      </div>
    </footer>
  )
}