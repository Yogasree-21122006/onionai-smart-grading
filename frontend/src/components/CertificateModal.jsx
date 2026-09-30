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
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', overflowY: 'auto' }}>
      <div style={{ position: 'relative', maxWidth: '540px', width: '100%', background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', border: '2px solid #fed7aa' }}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', color: '#64748b', background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', cursor: 'pointer', zIndex: 10 }}
        >
          ✕
        </button>

        {/* Certificate Card Printable Area */}
        <div id="printable-certificate" style={{ padding: '24px', background: 'linear-gradient(180deg, #fffaf5 0%, #ffffff 100%)' }}>
          
          {/* Certificate Brand Header */}
          <div style={{ textAlign: 'center', paddingBottom: '16px', borderBottom: '2px dashed #fed7aa' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '4px' }}>
              <img src="/assets/logo.png" alt="OnionAI" style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid #fed7aa', padding: '2px', background: 'white' }} />
              <span style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.5px' }} className="brand-font">
                Onion<span style={{ color: '#ff6a00' }}>AI</span>
              </span>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '6px' }}>
              Onion Grading Certificate
            </h3>
            <p style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>
              Tamper-Evident AGMARKNET / e-NAM Digital Pass
            </p>
          </div>

          {/* Certificate Body Data */}
          {loading ? (
            <div style={{ padding: '40px 0', textAlign: 'center', fontSize: '0.9rem', fontWeight: 700, color: '#64748b' }}>
              Generating Tamper-Evident QR Certificate...
            </div>
          ) : certData ? (
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Key Value Table */}
              <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '16px', border: '1px solid #e2e8f0', fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #e2e8f0' }}>
                  <span style={{ fontWeight: 700, color: '#64748b' }}>{t.batchId}</span>
                  <span style={{ fontWeight: 900, color: '#0f172a', fontFamily: 'monospace', fontSize: '0.9rem' }}>{certData.batch_id}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #e2e8f0' }}>
                  <span style={{ fontWeight: 700, color: '#64748b' }}>Quality Grade</span>
                  <span style={{ fontWeight: 900, color: '#059669', background: '#ecfdf5', padding: '2px 8px', borderRadius: '12px', border: '1px solid #a7f3d0' }}>
                    {certData.quality_grade}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #e2e8f0' }}>
                  <span style={{ fontWeight: 700, color: '#64748b' }}>Bulb Sizing</span>
                  <span style={{ fontWeight: 800, color: '#0f172a' }}>{certData.size_category}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #e2e8f0' }}>
                  <span style={{ fontWeight: 700, color: '#64748b' }}>Defect Rate</span>
                  <span style={{ fontWeight: 800, color: certData.defect_rate_pct <= 5 ? '#059669' : '#ea580c' }}>{certData.defect_rate_pct}%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #e2e8f0' }}>
                  <span style={{ fontWeight: 700, color: '#64748b' }}>Estimated Fair Price</span>
                  <span style={{ fontWeight: 900, color: '#059669', fontSize: '0.95rem' }}>₹{certData.fair_price_per_kg} / kg</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
                  <span style={{ fontWeight: 700, color: '#64748b' }}>{t.dateIssued}</span>
                  <span style={{ fontWeight: 800, color: '#0f172a' }}>{certData.date}</span>
                </div>
              </div>

              {/* QR Code & Verified Stamp Row */}
              <div className="cert-qr-stamp-box">
                <div className="cert-qr-stamp-info">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#065f46', fontWeight: 900, fontSize: '0.85rem' }}>
                    <ShieldCheck style={{ width: '18px', height: '18px', color: '#059669' }} />
                    <span>VERIFIED & TRUSTED</span>
                  </div>
                  <p style={{ fontSize: '0.72rem', color: '#047857', fontFamily: 'monospace', marginTop: '4px', wordBreak: 'break-all' }}>
                    HASH: {certData.integrity_hash}
                  </p>
                </div>

                <div className="cert-qr-stamp-code">
                  <img 
                    src={certData.qr_code_base64} 
                    alt="Traceability QR Code" 
                    className="cert-qr-img"
                  />
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748b', display: 'block', marginTop: '3px' }}>
                    Scan to Verify
                  </span>
                </div>
              </div>

            </div>
          ) : null}

        </div>

        {/* Footer Actions */}
        <div style={{ padding: '14px 20px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={handleCopyLink}
            className="btn-white"
            style={{ fontSize: '0.78rem', padding: '8px 14px' }}
          >
            {copied ? <Check style={{ width: 14, height: 14, color: '#059669' }} /> : <Share2 style={{ width: 14, height: 14 }} />}
            <span>{copied ? "Link Copied!" : "Copy Verify Link"}</span>
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handlePrint}
              className="btn-white"
              style={{ fontSize: '0.78rem', padding: '8px 14px' }}
            >
              <Printer style={{ width: 14, height: 14 }} />
              <span>Print PDF</span>
            </button>
            <button
              onClick={onClose}
              className="btn-orange"
              style={{ fontSize: '0.78rem', padding: '8px 18px' }}
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
