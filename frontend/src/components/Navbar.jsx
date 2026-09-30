import React from 'react';
import { Globe, Sparkles, Volume2, ShieldCheck, ChevronDown } from 'lucide-react';

export function Navbar({ lang, setLang, activeTab, setActiveTab, t }) {
  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ta', label: 'தமிழ் (Tamil)', flag: '🇮🇳' },
    { code: 'hi', label: 'हिंदी (Hindi)', flag: '🇮🇳' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-orange-100/80 shadow-sm">
      <div className="app-container">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => setActiveTab('home')}
          >
            <img 
              src="/assets/logo.png" 
              alt="OnionAI Logo" 
              className="h-12 w-12 object-contain drop-shadow-sm rounded-full bg-white p-0.5 border border-orange-200" 
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900 brand-font">
                  Onion<span className="text-orange-500">AI</span>
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  v1.0 e-NAM
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 bg-orange-50/70 p-1.5 rounded-xl border border-orange-200/60">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'home' 
                  ? 'bg-white text-orange-600 shadow-sm border border-orange-200' 
                  : 'text-slate-600 hover:text-orange-600'
              }`}
            >
              {t.navHome}
            </button>
            <button
              onClick={() => setActiveTab('scanner')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'scanner' 
                  ? 'bg-orange-500 text-white shadow-sm' 
                  : 'text-slate-600 hover:text-orange-600'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              {t.navScanner}
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'pricing' 
                  ? 'bg-white text-orange-600 shadow-sm border border-orange-200' 
                  : 'text-slate-600 hover:text-orange-600'
              }`}
            >
              {t.navPricing}
            </button>
            <button
              onClick={() => setActiveTab('storage')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'storage' 
                  ? 'bg-white text-orange-600 shadow-sm border border-orange-200' 
                  : 'text-slate-600 hover:text-orange-600'
              }`}
            >
              {t.navStorage}
            </button>
            <button
              onClick={() => setActiveTab('steps')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'steps' 
                  ? 'bg-white text-orange-600 shadow-sm border border-orange-200' 
                  : 'text-slate-600 hover:text-orange-600'
              }`}
            >
              {t.navSteps}
            </button>
          </nav>

          {/* Language Switcher & Fast CTA */}
          <div className="flex items-center gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative flex items-center bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 shadow-sm hover:border-orange-400 transition-all">
              <Globe className="w-4 h-4 text-orange-500 mr-2" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-transparent text-sm font-semibold text-slate-800 outline-none cursor-pointer pr-1"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Scan Button */}
            <button
              onClick={() => setActiveTab('scanner')}
              className="btn-primary-orange md:flex hidden !py-2 !px-4 text-sm"
            >
              <Sparkles className="w-4 h-4" />
              {t.startGrading}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
