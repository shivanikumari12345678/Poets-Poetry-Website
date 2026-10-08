import React, { useState } from 'react';
import { Award, Trophy, Star, Eye, ShieldCheck } from 'lucide-react';

export default function WorldRecords({ t }) {
  const [certModalOpen, setCertModalOpen] = useState(false);

  return (
    <section id="records" className="section-padding" style={{ background: '#FFFDF8' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag" style={{ background: 'rgba(214,154,45,0.2)', borderColor: '#D69A2D' }}>
            <Trophy size={16} />
            <span>{t.records.tag}</span>
          </div>
          <h2>{t.records.title}</h2>
          <p>{t.records.desc}</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '0.9fr 1.1fr',
          gap: '40px',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #FFFDF8, #F7F1E6)',
          border: '2px solid #D69A2D',
          borderRadius: '16px',
          padding: '36px',
          boxShadow: '0 10px 30px rgba(214,154,45,0.15)',
        }} className="record-container">
          {/* Trophy & Record Picture */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 12px 28px rgba(0,0,0,0.18)',
              border: '2px solid #D69A2D',
            }}>
              <img
                src="/assets/images/world-record.jpg"
                alt="Bulandi 101 Hours World Record Certificate and Trophy"
                style={{ width: '100%', height: '340px', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Record Details */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#A87516', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>
              <Star size={18} fill="#D69A2D" />
              <span>OFFICIALLY ADJUDICATED & CERTIFIED</span>
            </div>

            <h3 style={{ fontSize: '1.65rem', color: '#5C1720', marginBottom: '14px' }}>
              {t.records.certTitle}
            </h3>

            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4A423D', marginBottom: '20px' }}>
              लगातार 101 घंटे तक दिन-रात अनवरत चले इस काव्य महाकुंभ में भारत के सभी राज्यों तथा विश्व के 40 से अधिक देशों से कवियों ने लाइव सहभागिता की। साहित्य के इतिहास में यह विश्व का सबसे दीर्घकालिक ऑनलाइन कवि सम्मेलन दर्ज हुआ।
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
              <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '8px', border: '1px solid #E4DCCF' }}>
                <div style={{ fontSize: '0.8rem', color: '#6B625A', fontWeight: 600 }}>प्रमाणन संस्था 1</div>
                <div style={{ fontWeight: 800, color: '#7A1F2B', fontSize: '0.98rem' }}>World Book of Records (London)</div>
              </div>
              <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '8px', border: '1px solid #E4DCCF' }}>
                <div style={{ fontSize: '0.8rem', color: '#6B625A', fontWeight: 600 }}>प्रमाणन संस्था 2</div>
                <div style={{ fontWeight: 800, color: '#7A1F2B', fontSize: '0.98rem' }}>Golden Book of Records</div>
              </div>
            </div>

            <button onClick={() => setCertModalOpen(true)} className="btn btn-accent" style={{ padding: '12px 24px' }}>
              <Eye size={18} />
              <span>{t.records.viewCert}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Certificate Showcase Lightbox Modal */}
      {certModalOpen && (
        <div className="modal-overlay" onClick={() => setCertModalOpen(false)}>
          <div className="modal-container large-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <Trophy color="#D69A2D" />
                <span>101-Hour World Record Official Certificate & Citation</span>
              </h3>
              <button className="modal-close-btn" onClick={() => setCertModalOpen(false)}>✕</button>
            </div>
            <div className="modal-body" style={{ textAlign: 'center' }}>
              <img
                src="/assets/images/world-record.jpg"
                alt="World Record Trophy & Certificate Full View"
                style={{ maxWidth: '100%', maxHeight: '65vh', margin: '0 auto', borderRadius: '8px', border: '2px solid #D69A2D' }}
              />
              <p style={{ marginTop: '16px', fontWeight: 600, color: '#5C1720' }}>
                Official Citation: "Longest Virtual Poetry Relay Marathon (101 Consecutive Hours) Organized by Bulandi Sahitya Sansthan"
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 850px) {
          .record-container {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
