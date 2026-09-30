import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Scale, TrendingUp, AlertTriangle, Eye } from 'lucide-react';

export function HeroSection({ t, setActiveTab }) {
  return (
    <section className="pt-8 pb-12 overflow-hidden">
      <div className="app-container">
        
        {/* Top Announcement Tag */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2 bg-orange-100/90 border border-orange-200 px-4 py-1.5 rounded-full text-orange-800 text-xs sm:text-sm font-bold shadow-sm animate-bounce">
            <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-ping"></span>
            🌱 {t.slogan}
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Text */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-5">
              Smart Onion <span className="text-orange-500 underline decoration-orange-300 decoration-wavy">Grading</span> & Fair Mandi Pricing.
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 max-w-2xl leading-relaxed">
              {t.heroDesc}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start items-center">
              <button
                onClick={() => setActiveTab('scanner')}
                className="btn-primary-orange !py-3.5 !px-8 text-base font-bold shadow-lg"
              >
                <Sparkles className="w-5 h-5" />
                {t.startGrading}
                <ArrowRight className="w-5 h-5 ml-1" />
              </button>

              <button
                onClick={() => setActiveTab('steps')}
                className="btn-secondary !py-3.5 !px-6 text-base font-semibold"
              >
                <Eye className="w-5 h-5 text-orange-500" />
                {t.exploreSteps}
              </button>
            </div>

            {/* Social Impact / Trust Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-xs font-semibold text-slate-500">Post-Harvest Loss</p>
                <p className="text-sm font-bold text-orange-600">30% Reduced</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-xs font-semibold text-slate-500">Farmer Profit Gain</p>
                <p className="text-sm font-bold text-emerald-600">+₹4,200/Ton</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-xs font-semibold text-slate-500">Vision Accuracy</p>
                <p className="text-sm font-bold text-blue-600">98.4% Precise</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-xs font-semibold text-slate-500">Traceability</p>
                <p className="text-sm font-bold text-purple-600">QR Certified</p>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              
              {/* Decorative background glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-3xl blur-2xl opacity-20 -z-10 animate-pulse"></div>

              {/* Main Visual Poster Presentation Card */}
              <div className="glass-card p-4 border border-orange-200 bg-white/95">
                <div className="relative rounded-2xl overflow-hidden shadow-inner bg-slate-900 border border-slate-800">
                  <img 
                    src="/assets/logo.png" 
                    alt="OnionAI System" 
                    className="w-full h-auto object-cover hover:scale-105 transition-all duration-500"
                  />
                  
                  {/* Floating Grade Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-300 shadow-lg flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-xs font-black text-emerald-800 uppercase tracking-wider">AI Live Camera Active</span>
                  </div>

                  {/* Floating Price Tag */}
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl border border-orange-300 shadow-xl">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Fair Market Value</p>
                    <p className="text-lg font-black text-emerald-600">₹28.00 <span className="text-xs text-slate-600 font-medium">/ kg</span></p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-600 font-medium px-2">
                  <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    AGMARK Standard
                  </span>
                  <span className="flex items-center gap-1.5 text-orange-700 font-bold">
                    <TrendingUp className="w-4 h-4 text-orange-600" />
                    e-NAM Live Connected
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
