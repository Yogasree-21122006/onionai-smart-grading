import React, { useState } from 'react';
import { 
  Award, ShieldAlert, Sparkles, Volume2, VolumeX, 
  Layers, CheckCircle, AlertTriangle, Eye, ArrowRight, FileCheck, CircleDot 
} from 'lucide-react';
import { speakResult, stopSpeech } from '../utils/speech';

export function ResultsDashboard({ result, t, lang, onProceedToPricing, onGenerateCert }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!result) return null;

  const isGradeA = result.batch_grade === 'Grade A';
  const isGradeB = result.batch_grade === 'Grade B';
  const isGradeC = result.batch_grade === 'Grade C';

  const handleVoiceNarration = () => {
    if (isPlayingAudio) {
      stopSpeech();
      setIsPlayingAudio(false);
      return;
    }

    let speechText = "";
    if (lang === 'ta') {
      speechText = `உங்கள் வெங்காய தொகுதியின் தரம்: ${result.batch_grade}. சராசரி விட்டம்: ${result.average_diameter_mm} மில்லிமீட்டர். தோல் பொலிவு: ${result.average_freshness_pct} சதவீதம். குறைபாடு அளவு: ${result.average_defect_pct} சதவீதம். பரிந்துரைக்கப்பட்ட சேமிப்பு நாட்கள்: ${result.shelf_life.estimated_days}.`;
    } else if (lang === 'hi') {
      speechText = `आपके प्याज का गुणवत्ता ग्रेड है: ${result.batch_grade}. औसत व्यास: ${result.average_diameter_mm} मिलीमीटर. छिलके की ताजगी: ${result.average_freshness_pct} प्रतिशत. कुल दोष: ${result.average_defect_pct} प्रतिशत. अनुमानित शेल्फ-लाइफ: ${result.shelf_life.estimated_days}.`;
    } else {
      speechText = `AI Quality Grade Verdict: ${result.batch_grade}. Average bulb diameter is ${result.average_diameter_mm} millimeters. Skin freshness is ${result.average_freshness_pct} percent. Defect rate is ${result.average_defect_pct} percent. Estimated shelf life is ${result.shelf_life.estimated_days}.`;
    }

    setIsPlayingAudio(true);
    speakResult(speechText, lang);
    setTimeout(() => setIsPlayingAudio(false), 8000);
  };

  return (
    <section className="py-8">
      <div className="app-container">
        
        {/* Results Card Header */}
        <div className="glass-card p-6 sm:p-8 border border-orange-200">
          
          {/* Top Title & Audio Narrator Button */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Step 3 & 4 AI Inspection
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {t.resultsTitle}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Detected {result.total_onions_detected} onion(s) in batch sample
              </p>
            </div>

            {/* Voice Readout Button */}
            <button
              onClick={handleVoiceNarration}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow transition-all active:scale-95"
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4 text-rose-400" />
                  {t.stopAudio}
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                  {t.listenAudio} (Voice)
                </>
              )}
            </button>
          </div>

          {/* Main Grade Verdict Banner */}
          <div className={`mt-6 p-6 rounded-2xl border text-white flex flex-col sm:flex-row items-center justify-between gap-6 ${
            isGradeA ? 'badge-grade-a' : isGradeB ? 'badge-grade-b' : 'badge-grade-c'
          }`}>
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 shadow-inner">
                <Award className="w-10 h-10 text-white" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-extrabold text-white/80">
                  {t.overallGrade}
                </p>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                  {result.batch_grade}
                </h2>
                <p className="text-xs text-white/90 font-semibold mt-0.5">
                  {isGradeA ? t.gradeA_desc : isGradeB ? t.gradeB_desc : t.gradeC_desc}
                </p>
              </div>
            </div>

            {/* Quick Action Pills */}
            <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
              <button
                onClick={onProceedToPricing}
                className="bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Calculate Mandi Price</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onGenerateCert}
                className="bg-black/30 hover:bg-black/40 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-white/30 backdrop-blur-sm transition-all flex items-center gap-1.5"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>Get Certificate</span>
              </button>
            </div>
          </div>

          {/* Side-by-side: Visual Overlay & 3 Parameters */}
          <div className="grid lg:grid-cols-12 gap-6 mt-8">
            
            {/* Left: Annotated Computer Vision Bounding Boxes */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 shadow-md flex-1 flex flex-col justify-center">
                <div className="relative rounded-xl overflow-hidden bg-black flex items-center justify-center">
                  <img 
                    src={result.processed_image} 
                    alt="AI Annotated Onions" 
                    className="w-full h-auto object-contain max-h-[400px]"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-emerald-400 font-bold border border-emerald-500/40">
                    OpenCV + HSV Segmentation Active
                  </div>
                </div>
                <p className="text-center text-[11px] text-slate-400 mt-2">
                  Green: Grade A (&gt;60mm) | Amber: Grade B (45-60mm) | Red: Grade C / Defect (&lt;45mm or Mold)
                </p>
              </div>
            </div>

            {/* Right: The 3 Core Evaluation Parameters */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Parameter 1: Size & Geometry */}
              <div className="peach-tint-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <CircleDot className="w-4 h-4 text-orange-500" />
                    {t.paramSize}
                  </h4>
                  <span className="text-xs font-black text-orange-600 bg-orange-100 px-2 py-0.5 rounded-md">
                    Ø {result.average_diameter_mm} mm
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center mt-3">
                  <div className="bg-white p-2 rounded-xl border border-orange-200">
                    <p className="text-[10px] text-slate-500 font-bold">{t.large}</p>
                    <p className="text-sm font-extrabold text-emerald-600">{result.size_breakdown.large_pct}%</p>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-orange-200">
                    <p className="text-[10px] text-slate-500 font-bold">{t.medium}</p>
                    <p className="text-sm font-extrabold text-amber-600">{result.size_breakdown.medium_pct}%</p>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-orange-200">
                    <p className="text-[10px] text-slate-500 font-bold">{t.small}</p>
                    <p className="text-sm font-extrabold text-rose-600">{result.size_breakdown.small_pct}%</p>
                  </div>
                </div>
              </div>

              {/* Parameter 2: Color & Outer Skin */}
              <div className="pink-tint-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-pink-500" />
                    {t.paramColor}
                  </h4>
                  <span className="text-xs font-black text-pink-700 bg-pink-100 px-2 py-0.5 rounded-md">
                    {result.average_freshness_pct}% Healthy Tunic
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden mt-3">
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-rose-500 h-full rounded-full transition-all duration-700"
                    style={{ width: `${result.average_freshness_pct}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-medium">
                  <span>Pale / Discolored</span>
                  <span>Rich Red/Purple Pigmentation</span>
                </div>
              </div>

              {/* Parameter 3: Defect Detection */}
              <div className="green-tint-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-emerald-600" />
                    {t.paramDefects}
                  </h4>
                  <span className={`text-xs font-black px-2 py-0.5 rounded-md ${
                    result.average_defect_pct < 5 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {result.average_defect_pct}% Defect Density
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center mt-3">
                  <div className="bg-white p-2 rounded-xl border border-slate-200">
                    <p className="text-[10px] text-slate-500 font-bold">Healthy Skin</p>
                    <p className="text-xs font-black text-emerald-600">{result.defect_breakdown.healthy_pct}%</p>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-200">
                    <p className="text-[10px] text-slate-500 font-bold">Black Mold</p>
                    <p className="text-xs font-black text-rose-600">{result.defect_breakdown.black_mold_pct}%</p>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-200">
                    <p className="text-[10px] text-slate-500 font-bold">Sprouting</p>
                    <p className="text-xs font-black text-amber-600">{result.defect_breakdown.sprouting_pct}%</p>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-200">
                    <p className="text-[10px] text-slate-500 font-bold">Neck Rot</p>
                    <p className="text-xs font-black text-purple-600">{result.defect_breakdown.neck_rot_pct}%</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
