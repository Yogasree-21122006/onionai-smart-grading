import React, { useState, useEffect } from 'react';
import { Clock, ShieldCheck, AlertTriangle, Sparkles, Factory, RefreshCw, CheckCircle2, ChevronRight } from 'lucide-react';

export function StorageAdvisorySection({ result, t, quantityKg = 100 }) {
  const [advisory, setAdvisory] = useState(null);

  const grade = result?.batch_grade || 'Grade A';
  const defectPct = result?.average_defect_pct || 3.2;

  useEffect(() => {
    fetch('/api/storage-advisory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grade: grade,
        defect_pct: defectPct,
        quantity_kg: quantityKg
      })
    })
      .then(res => res.json())
      .then(data => setAdvisory(data))
      .catch(err => {
        // Fallback advisory
        setAdvisory({
          estimated_days_range: grade === 'Grade A' ? '14 - 21 Days' : grade === 'Grade B' ? '8 - 12 Days' : '3 - 6 Days',
          days_numeric: grade === 'Grade A' ? 18 : grade === 'Grade B' ? 10 : 4,
          risk_level: grade === 'Grade A' ? 'Low' : grade === 'Grade B' ? 'Moderate' : 'High / Spoilage Alert',
          summary: 'Optimal post-harvest temperature and aeration prevents moisture retention.',
          guidelines: [
            "Store in well-aerated slatted wooden crates or bamboo mesh racks.",
            "Maintain 65% - 70% Relative Humidity to prevent root sprout initiation.",
            "Ensure cross-ventilation to disperse heat from natural bulb respiration."
          ],
          value_addition: {
            needed: grade === 'Grade C',
            title: "Zero-Waste Value Addition: Onion Powder & Puree",
            description: "Convert vulnerable onions into shelf-stable culinary products.",
            options: [
              { product: "Dehydrated Onion Powder", yield_kg: (quantityKg * 0.09).toFixed(1), market_rate_per_kg: 230, est_revenue: (quantityKg * 0.09 * 230).toFixed(0), shelf_life: "12 Months" },
              { product: "Onion Paste / Puree", yield_kg: (quantityKg * 0.75).toFixed(1), market_rate_per_kg: 45, est_revenue: (quantityKg * 0.75 * 45).toFixed(0), shelf_life: "6 Months" }
            ]
          }
        });
      });
  }, [grade, defectPct, quantityKg]);

  if (!advisory) return null;

  const isLowRisk = advisory.risk_level === 'Low';
  const isHighRisk = advisory.risk_level.includes('High');

  return (
    <section id="storage-section" className="py-10">
      <div className="app-container">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 bg-pink-100 text-pink-800 text-xs font-bold px-3 py-1 rounded-full mb-2">
            <Clock className="w-3.5 h-3.5 text-pink-600" />
            Step 5: Post-Harvest Spoilage Prevention
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            {t.shelfTitle}
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Science-backed shelf-life forecasting & food waste reduction pathways.
          </p>
        </div>

        {/* Advisory Content Grid */}
        <div className="grid lg:grid-cols-12 gap-6 max-w-5xl mx-auto">
          
          {/* Left: Shelf-Life Gauge Card */}
          <div className="lg:col-span-5 glass-card p-6 border border-orange-200 flex flex-col justify-between text-center">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                {t.estShelfLife}
              </p>

              {/* Circular Gauge Graphic */}
              <div className="relative w-44 h-44 mx-auto flex items-center justify-center my-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="text-slate-100"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className={isLowRisk ? "text-emerald-500" : isHighRisk ? "text-rose-500" : "text-amber-500"}
                    strokeWidth="10"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 * (1 - (advisory.days_numeric / 25))}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    style={{ transition: 'stroke-dashoffset 1s ease' }}
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-slate-900 font-outfit leading-none">
                    {advisory.estimated_days_range}
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold mt-1">
                    {t.daysRemaining}
                  </span>
                </div>
              </div>

              {/* Risk Status Pill */}
              <div className="inline-block mt-2">
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                  isLowRisk ? 'bg-emerald-100 text-emerald-800' : isHighRisk ? 'bg-rose-100 text-rose-800 animate-pulse' : 'bg-amber-100 text-amber-800'
                }`}>
                  Status: {advisory.risk_level}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-6 bg-slate-50 p-3 rounded-xl border border-slate-200">
              {advisory.summary}
            </p>
          </div>

          {/* Right: Storage Rules & Value-Addition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Storage Guidelines Card */}
            <div className="glass-card p-6 border border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                {t.storageGuidance}
              </h4>

              <div className="space-y-2.5">
                {advisory.guidelines.map((guide, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/70">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span>{guide}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Zero-Waste Processing Advisory */}
            <div className="pink-tint-card p-6 border-2 border-pink-200">
              <div className="flex items-center gap-2 mb-2">
                <Factory className="w-5 h-5 text-pink-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  {t.valueAddTitle}
                </h4>
              </div>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                {advisory.value_addition.description || "Turn vulnerable or low-grade batches into high-demand shelf-stable value-added goods."}
              </p>

              {advisory.value_addition?.options ? (
                <div className="grid sm:grid-cols-2 gap-3">
                  {advisory.value_addition.options.map((opt, i) => (
                    <div key={i} className="bg-white p-3.5 rounded-xl border border-pink-200 shadow-sm">
                      <p className="text-xs font-bold text-pink-900">{opt.product}</p>
                      <div className="mt-2 flex justify-between items-end">
                        <div>
                          <p className="text-[10px] text-slate-500 font-medium">Est. Yield ({opt.yield_kg} kg)</p>
                          <p className="text-base font-black text-emerald-600">₹{Number(opt.est_revenue).toLocaleString()}</p>
                        </div>
                        <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-md">
                          {opt.shelf_life} Shelf
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-3 rounded-xl border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Batch is in prime condition. Standard whole bulb market sale delivers maximum return.</span>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
