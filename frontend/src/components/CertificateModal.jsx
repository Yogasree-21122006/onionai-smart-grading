import React, { useState, useEffect } from 'react';
import { ShieldCheck, QrCode, Download, Share2, Check, ExternalLink, Printer } from 'lucide-react';

export function CertificateModal({ isOpen, onClose, result, t, quantityKg = 100 }) {
  const [certData, setCertData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const grade = result?.batch_grade || 'Grade A';
  const sizeCategory = result?.average_diameter_mm >= 60 ? 'Large' : result?.average_diameter_mm >= 45 ? 'Medium' : 'Small';
  const defectRate = result?.average_defect_pct || 3.2;

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetch('/api/generate-certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade: grade,
          size_category: `${sizeCategory} (${result?.average_diameter_mm || 62}mm)`,
          defect_rate: defectRate,
          fair_rate_per_kg: grade === 'Grade A' ? 28.0 : grade === 'Grade B' ? 24.0 : 16.0,
          quantity_kg: quantityKg,
          market_name: 'Coimbatore Mandi (TN)',
          farmer_name: 'Farmer Ravi',
          location: 'Coimbatore, Tamil Nadu',
          app_url_base: window.location.origin
        })
      })
        .then(res => res.json())
        .then(data => {
          setCertData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [isOpen, result, grade, quantityKg]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    if (certData?.verification_url) {
      navigator.clipboard.writeText(certData.verification_url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative max-w-lg w-full bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-orange-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full w-8 h-8 flex items-center justify-center font-bold z-10 transition-all"
        >
          ✕
        </button>

        {/* Certificate Card Printable Area */}
        <div id="printable-certificate" className="p-6 sm:p-8 bg-gradient-to-b from-orange-50/40 via-white to-orange-50/30">
          
          {/* Certificate Brand Header */}
          <div className="text-center pb-5 border-b-2 border-dashed border-orange-200">
            <div className="flex items-center justify-center gap-2 mb-1">
              <img src="/assets/logo.png" alt="OnionAI" className="w-10 h-10 object-contain rounded-full" />
              <span className="text-2xl font-black text-slate-900 tracking-tight brand-font">
                Onion<span className="text-orange-500">AI</span>
              </span>
            </div>
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest mt-2">
              Onion Grading Certificate
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Tamper-Evident AGMARKNET / e-NAM Digital Quality Pass
            </p>
          </div>

          {/* Certificate Body Data */}
          {loading ? (
            <div className="py-12 text-center text-sm font-bold text-slate-500">
              Generating Tamper-Evident QR Certificate...
            </div>
          ) : certData ? (
            <div className="mt-5 space-y-4">
              
              {/* Key Value Table */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2.5">
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span className="font-bold text-slate-500">{t.batchId}</span>
                  <span className="font-black text-slate-900 font-mono text-sm">{certData.batch_id}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span className="font-bold text-slate-500">Quality Grade</span>
                  <span className="font-black text-emerald-700 bg-emerald-100 px-3 py-0.5 rounded-full text-xs">
                    {certData.quality_grade}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span className="font-bold text-slate-500">Bulb Sizing</span>
                  <span className="font-bold text-slate-800">{certData.size_category}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span className="font-bold text-slate-500">Defect Rate</span>
                  <span className="font-bold text-slate-800">{certData.defect_rate_pct}%</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span className="font-bold text-slate-500">Estimated Fair Price</span>
                  <span className="font-black text-emerald-600 text-sm">₹{certData.fair_price_per_kg} / kg</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="font-bold text-slate-500">{t.dateIssued}</span>
                  <span className="font-bold text-slate-800">{certData.date}</span>
                </div>
              </div>

              {/* QR Code & Verified Stamp Row */}
              <div className="p-4 rounded-2xl bg-white border-2 border-emerald-300 flex items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-7 h-7 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-emerald-800 uppercase block tracking-wider">
                      Verified & Trusted
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      HASH: {certData.integrity_hash}
                    </span>
                  </div>
                </div>

                {/* Scannable QR Code */}
                <div className="text-center flex-shrink-0">
                  <img 
                    src={certData.qr_code_base64} 
                    alt="Traceability QR Code" 
                    className="w-20 h-20 rounded-lg border border-slate-300 shadow-sm"
                  />
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight block mt-0.5">
                    Scan to Verify
                  </span>
                </div>
              </div>

            </div>
          ) : null}

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap gap-2 justify-between items-center">
          <button
            onClick={handleCopyLink}
            className="text-xs font-bold text-slate-700 hover:text-orange-600 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 shadow-sm transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            {copied ? "Link Copied!" : "Copy Verify Link"}
          </button>

          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="btn-secondary !py-2 !px-3.5 text-xs font-bold"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="btn-primary-orange !py-2 !px-4 text-xs font-bold"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
