import React, { useState, useEffect } from 'react';
import { TrendingUp, ShieldCheck, AlertOctagon, DollarSign, Store, ArrowRight } from 'lucide-react';

export function PricingCalculator({ result, t, onGenerateCert }) {
  const [markets, setMarkets] = useState([
    { id: 'coimbatore', name: 'Coimbatore (TN)', base_modal_price: 28.0, state: 'Tamil Nadu', market_trend: '+4.2% Today' },
    { id: 'lasalgaon', name: 'Lasalgaon APMC (MH) - Asia\'s Largest', base_modal_price: 26.5, state: 'Maharashtra', market_trend: '+2.8% Today' },
    { id: 'dindigul', name: 'Dindigul (TN) - Shallot/Red Hub', base_modal_price: 32.0, state: 'Tamil Nadu', market_trend: '+5.1% Today' },
    { id: 'nashik', name: 'Nashik APMC (MH)', base_modal_price: 25.0, state: 'Maharashtra', market_trend: '-1.0% Today' },
    { id: 'azadpur', name: 'Azadpur Mandi (Delhi)', base_modal_price: 30.5, state: 'Delhi', market_trend: '+3.6% Today' },
    { id: 'hubli', name: 'Hubli APMC (Karnataka)', base_modal_price: 27.0, state: 'Karnataka', market_trend: '+1.5% Today' }
  ]);
  const [selectedMarketId, setSelectedMarketId] = useState('coimbatore');
  const [quantityKg, setQuantityKg] = useState(100);
  const [pricingData, setPricingData] = useState(null);

  const grade = result?.batch_grade || 'Grade A';

  // Fetch live market data
  useEffect(() => {
    fetch('/api/mandi-rates')
      .then(res => res.json())
      .then(data => {
        if (data.markets) setMarkets(data.markets);
      })
      .catch(err => console.log("Using cached market rates"));
  }, []);

  // Recalculate pricing
  useEffect(() => {
    fetch('/api/calculate-price', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grade: grade,
        quantity_kg: Number(quantityKg),
        market_id: selectedMarketId
      })
    })
      .then(res => res.json())
      .then(data => setPricingData(data))
      .catch(err => {
        // Fallback local calc
        const selectedMkt = markets.find(m => m.id === selectedMarketId) || markets[0];
        const multiplier = grade === 'Grade A' ? 1.18 : grade === 'Grade B' ? 1.00 : 0.65;
        const fairRate = selectedMkt.base_modal_price * multiplier;
        const fairTotal = fairRate * quantityKg;
        const middlemanRate = fairRate * 0.70;
        const middlemanTotal = middlemanRate * quantityKg;
        setPricingData({
          market_name: selectedMkt.name,
          base_mandi_rate_kg: selectedMkt.base_modal_price,
          fair_rate_per_kg: fairRate,
          fair_total_value: fairTotal,
          middleman_rate_per_kg: middlemanRate,
          middleman_total_offer: middlemanTotal,
          farmer_protection_gain: fairTotal - middlemanTotal
        });
      });
  }, [grade, quantityKg, selectedMarketId]);

  return (
    <section id="pricing-section" className="py-10">
      <div className="app-container">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            Step 4: Real-time Mandi Fair Valuation
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            {t.pricingTitle}
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            {t.pricingSubtitle}
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-4xl mx-auto glass-card p-6 sm:p-8 border border-emerald-200">
          
          {/* Controls: Mandi Selector & Quantity Slider */}
          <div className="grid md:grid-cols-2 gap-6 pb-6 border-b border-slate-200">
            
            {/* Market Dropdown */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                {t.selectMandi}
              </label>
              <div className="relative">
                <select
                  value={selectedMarketId}
                  onChange={(e) => setSelectedMarketId(e.target.value)}
                  className="w-full bg-white border-2 border-slate-200 focus:border-orange-500 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 outline-none shadow-sm cursor-pointer"
                >
                  {markets.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} (Base: ₹{m.base_modal_price}/kg)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Harvest Quantity input + slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {t.batchWeight}
                </label>
                <span className="text-sm font-black text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-lg border border-orange-200">
                  {quantityKg} kg ({Number(quantityKg / 100).toFixed(1)} Quintals)
                </span>
              </div>
              
              <input
                type="range"
                min="10"
                max="5000"
                step="10"
                value={quantityKg}
                onChange={(e) => setQuantityKg(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />

              <div className="flex gap-2 mt-2">
                {[50, 100, 250, 500, 1000].map(q => (
                  <button
                    key={q}
                    onClick={() => setQuantityKg(q)}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-md transition-all ${
                      quantityKg === q ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {q}kg
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Pricing Results Display */}
          {pricingData && (
            <div className="mt-8 space-y-6">
              
              {/* Primary Green Cards Grid */}
              <div className="grid sm:grid-cols-2 gap-5">
                
                {/* Fair Market Rate Card */}
                <div className="green-tint-card p-5 border-2 border-emerald-300 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-bl-xl">
                    Live e-NAM
                  </div>
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    {t.fairMandiRate} ({grade})
                  </p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-4xl font-black text-emerald-700 font-outfit">
                      ₹{pricingData.fair_rate_per_kg}
                    </span>
                    <span className="text-sm font-semibold text-slate-600">/ kg</span>
                  </div>
                  <p className="text-xs text-emerald-800 font-medium mt-2">
                    Based on {pricingData.market_name} standard grading metrics.
                  </p>
                </div>

                {/* Total Estimated Fair Value */}
                <div className="green-tint-card p-5 border-2 border-emerald-400 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-bl-xl">
                    Total Revenue
                  </div>
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    {t.estimatedBatchVal} ({quantityKg} kg)
                  </p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-emerald-700 font-outfit">
                      ₹{pricingData.fair_total_value.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800 font-semibold mt-2">
                    Guaranteed fair market return without middleman cuts.
                  </p>
                </div>

              </div>

              {/* Anti-Exploitation Middleman Breakdown Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-xl">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-lg">
                      ⚠️
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">
                        Middleman Exploitation Protection Alert
                      </h4>
                      <p className="text-xs text-slate-400">
                        Traditional brokers typically deduct 30% under subjective quality excuses.
                      </p>
                    </div>
                  </div>

                  <div className="text-center sm:text-right">
                    <p className="text-xs text-slate-400">Middleman Typical Offer</p>
                    <p className="text-base font-bold text-rose-400 line-through">
                      ₹{pricingData.middleman_total_offer.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Savings Gain Highlight */}
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">
                      Protected Farmer Surplus:
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-emerald-400">
                      + ₹{pricingData.farmer_protection_gain.toLocaleString()} Extra Profit
                    </span>
                  </div>

                  <button
                    onClick={onGenerateCert}
                    className="btn-primary-orange !py-2.5 !px-5 text-xs sm:text-sm font-bold shadow-md"
                  >
                    <span>Generate Proof Certificate</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
