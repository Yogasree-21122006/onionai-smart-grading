import React, { useState } from 'react';
import { 
  Smartphone, Camera, BrainCircuit, Award, 
  Clock, FileCheck, QrCode, TrendingUp, Maximize2 
} from 'lucide-react';

export function PosterWorkflow({ t, setActiveTab }) {
  const [showPosterModal, setShowPosterModal] = useState(false);

  const steps = [
    {
      num: 1,
      title: t.step1Title,
      desc: t.step1Desc,
      icon: Smartphone,
      color: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50 border-emerald-200"
    },
    {
      num: 2,
      title: t.step2Title,
      desc: t.step2Desc,
      icon: Camera,
      color: "from-purple-500 to-indigo-600",
      bgLight: "bg-purple-50 border-purple-200"
    },
    {
      num: 3,
      title: t.step3Title,
      desc: t.step3Desc,
      icon: BrainCircuit,
      color: "from-blue-500 to-cyan-600",
      bgLight: "bg-blue-50 border-blue-200"
    },
    {
      num: 4,
      title: t.step4Title,
      desc: t.step4Desc,
      icon: Award,
      color: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50 border-amber-200"
    },
    {
      num: 5,
      title: t.step5Title,
      desc: t.step5Desc,
      icon: Clock,
      color: "from-rose-500 to-pink-600",
      bgLight: "bg-rose-50 border-rose-200"
    },
    {
      num: 6,
      title: t.step6Title,
      desc: t.step6Desc,
      icon: FileCheck,
      color: "from-green-600 to-emerald-700",
      bgLight: "bg-green-50 border-green-200"
    },
    {
      num: 7,
      title: t.step7Title,
      desc: t.step7Desc,
      icon: QrCode,
      color: "from-indigo-600 to-purple-700",
      bgLight: "bg-indigo-50 border-indigo-200"
    },
    {
      num: 8,
      title: t.step8Title,
      desc: t.step8Desc,
      icon: TrendingUp,
      color: "from-orange-500 to-red-600",
      bgLight: "bg-orange-50 border-orange-200"
    }
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-200/80">
      <div className="app-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-800 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            ✨ Complete Ecosystem Flow
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 tracking-tight">
            How It Works?
          </h2>
          <p className="text-base text-slate-600">
            Simple steps. Powerful results. Fair for every farmer.
          </p>

          <div className="mt-4">
            <button
              onClick={() => setShowPosterModal(true)}
              className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-200 px-4 py-2 rounded-xl transition-all shadow-sm"
            >
              <Maximize2 className="w-4 h-4" />
              View Official OnionAI System Architecture Poster
            </button>
          </div>
        </div>

        {/* 8 Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.num}
                className={`p-5 rounded-2xl border transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${step.bgLight}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color} text-white font-black text-sm flex items-center justify-center shadow-sm`}>
                    {step.num}
                  </span>
                  <div className={`p-2 rounded-xl bg-white shadow-sm`}>
                    <Icon className="w-5 h-5 text-slate-700" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 leading-tight">
                  {step.title}
                </h3>
                
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Flow Summary */}
        <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-600 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold">Ready to grade your onion harvest?</h4>
            <p className="text-xs text-orange-100">Takes less than 5 seconds. Works 100% offline & edge-ready.</p>
          </div>
          <button
            onClick={() => setActiveTab('scanner')}
            className="bg-white text-orange-600 font-bold px-6 py-2.5 rounded-xl text-sm shadow hover:bg-orange-50 transition-all whitespace-nowrap"
          >
            Launch AI Scanner 🚀
          </button>
        </div>

      </div>

      {/* Poster Modal */}
      {showPosterModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-lg">OnionAI Official Flow Poster</h3>
              <button 
                onClick={() => setShowPosterModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-xl px-2"
              >
                ✕
              </button>
            </div>
            <div className="overflow-auto py-3 text-center">
              <img 
                src="/assets/entire_steps.png" 
                alt="OnionAI Entire Steps Poster" 
                className="max-h-[72vh] mx-auto rounded-xl object-contain border border-slate-200 shadow-sm"
              />
            </div>
            <div className="pt-2 text-center text-xs text-slate-500">
              OnionAI: From Your Farm to the Market — Just a Scan Away
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
