"use client";

export default function ImpactSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-gray-600 mb-3 tracking-wider">OUR IMPACT</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Together, we're making a difference
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {/* People Helped */}
          <div className="text-center">
            <div className="mb-3">
              <span className="text-5xl md:text-6xl font-bold text-emerald-500">10K+</span>
            </div>
            <p className="text-sm font-semibold text-gray-700">People Received Help</p>
          </div>

          {/* Funds Raised */}
          <div className="text-center">
            <div className="mb-3">
              <span className="text-5xl md:text-6xl font-bold text-emerald-500">$2.5M</span>
            </div>
            <p className="text-sm font-semibold text-gray-700">Funds Raised</p>
          </div>

          {/* Volunteers */}
          <div className="text-center">
            <div className="mb-3">
              <span className="text-5xl md:text-6xl font-bold text-emerald-500">500+</span>
            </div>
            <p className="text-sm font-semibold text-gray-700">Active Volunteers</p>
          </div>

          {/* Communities Served */}
          <div className="text-center">
            <div className="mb-3">
              <span className="text-5xl md:text-6xl font-bold text-emerald-500">85+</span>
            </div>
            <p className="text-sm font-semibold text-gray-700">Communities Served</p>
          </div>
        </div>
      </div>
    </section>
  )
}