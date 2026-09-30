import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, TrendingUp, Award, Eye, Globe, FileCheck, CheckCircle2, ChevronRight } from 'lucide-react';

export function LandingPage({ t, lang, setLang, onStartApp }) {
  const [showPoster, setShowPoster] = useState(false);

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ta', label: 'தமிழ் (Tamil)', flag: '🇮🇳' },
    { code: 'hi', label: 'हिंदी (Hindi)', flag: '🇮🇳' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Formal Navbar */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '12px 0', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src="/assets/logo.png" 
              alt="OnionAI Logo" 
              style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #fed7aa', padding: '2px', background: 'white' }} 
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.5px' }} className="brand-font">
                  Onion<span style={{ color: '#ff6a00' }}>AI</span>
                </span>
                <span className="tag-pill tag-green" style={{ fontSize: '0.7rem' }}>e-NAM Live</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Right Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Language Selector */}
            <div style={{ display: 'flex', alignItems: 'center', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '6px 12px' }}>
              <Globe style={{ width: '16px', height: '16px', color: '#ff6a00', marginRight: '6px' }} />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                style={{ border: 'none', background: 'transparent', fontSize: '0.85rem', fontWeight: 600, color: '#1e293b', outline: 'none', cursor: 'pointer' }}
              >
                {languages.map(l => (
                  <option key={l.code} value={l.code}>{l.flag} {l.label}</option>
                ))}
              </select>
            </div>

            {/* Launch App Orange Button */}
            <button 
              onClick={onStartApp}
              className="btn-orange"
              style={{ padding: '8px 18px', fontSize: '0.88rem' }}
            >
              <Sparkles style={{ width: '16px', height: '16px' }} />
              <span>{t.startGrading}</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Hero Section */}
      <main style={{ flex: 1 }}>
        <div className="landing-hero app-container">
          
          <div className="tag-pill tag-orange" style={{ marginBottom: '16px', display: 'inline-flex' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff6a00', marginRight: '4px' }}></span>
            🌱 {t.slogan}
          </div>

          <h1 className="hero-title">
            Smart Onion <span style={{ color: '#ff6a00' }}>Grading</span> & Fair Mandi Pricing
          </h1>

          <p className="hero-subtitle">
            {t.heroDesc}
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button 
              onClick={onStartApp}
              className="btn-orange"
              style={{ fontSize: '1.05rem', padding: '14px 32px' }}
            >
              <Sparkles style={{ width: '20px', height: '20px' }} />
              <span>{t.startGrading}</span>
              <ArrowRight style={{ width: '18px', height: '18px' }} />
            </button>

            <button 
              onClick={() => setShowPoster(true)}
              className="btn-white"
              style={{ fontSize: '1rem', padding: '14px 24px' }}
            >
              <Eye style={{ width: '18px', height: '18px', color: '#ff6a00' }} />
              <span>{t.exploreSteps}</span>
            </button>
          </div>

          {/* 4 Impact Metric Cards */}
          <div className="grid grid-4" style={{ marginTop: '48px', textAlign: 'left' }}>
            <div className="card" style={{ padding: '18px' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Post-Harvest Loss</p>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ff6a00', marginTop: '4px' }}>30% Reduced</h3>
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>Prevents spoilage with smart storage advisory</p>
            </div>

            <div className="card" style={{ padding: '18px' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Farmer Profit Protection</p>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#059669', marginTop: '4px' }}>+₹4,200 / Ton</h3>
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>Eliminates subjective middleman cuts</p>
            </div>

            <div className="card" style={{ padding: '18px' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>AI Vision Accuracy</p>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#2563eb', marginTop: '4px' }}>98.4% Precision</h3>
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>Size mm, color freshness & mold detection</p>
            </div>

            <div className="card" style={{ padding: '18px' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Quality Proof</p>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#7c3aed', marginTop: '4px' }}>QR Verified</h3>
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>Cryptographic SHA-256 digital certificate</p>
            </div>
          </div>

          {/* Hero Image Showcase */}
          <div className="hero-image-frame">
            <img 
              src="/assets/logo.png" 
              alt="OnionAI System" 
              style={{ width: '100%', maxHeight: '380px', objectFit: 'contain' }}
            />
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer style={{ background: '#0f172a', color: '#94a3b8', padding: '24px 0', borderTop: '1px solid #1e293b' }}>
        <div className="app-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 800, color: 'white' }}>Onion<span style={{ color: '#ff6a00' }}>AI</span></span>
            <span style={{ fontSize: '0.75rem' }}>• For Farmers, For Food, For a Sustainable Tomorrow</span>
          </div>
          <div style={{ fontSize: '0.75rem' }}>
            Aligned with World Food Day & e-NAM / AGMARKNET Standard
          </div>
        </div>
      </footer>

      {/* Poster Modal */}
      {showPoster && (
        <div className="modal-backdrop" onClick={() => setShowPoster(false)}>
          <div className="modal-content" style={{ maxWidth: '800px', padding: '20px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid #e2e8f0' }}>
              <h3 style={{ fontWeight: 800, fontSize: '1.1rem' }}>OnionAI 8-Step System Poster</h3>
              <button onClick={() => setShowPoster(false)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 800 }}>✕</button>
            </div>
            <div style={{ padding: '16px 0', textAlign: 'center' }}>
              <img src="/assets/entire_steps.png" alt="OnionAI Poster" style={{ maxHeight: '70vh', margin: '0 auto', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
