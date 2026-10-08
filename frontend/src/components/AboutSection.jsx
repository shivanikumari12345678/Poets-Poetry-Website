import React from 'react';
import { BookOpen, Compass, Award, CheckCircle } from 'lucide-react';

export default function AboutSection({ t }) {
  return (
    <section id="about" className="section-padding" style={{ background: '#F7F1E6', borderTop: '1px solid #E4DCCF', borderBottom: '1px solid #E4DCCF' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Compass size={16} />
            <span>{t.about.tag}</span>
          </div>
          <h2>{t.about.title}</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '50px',
          alignItems: 'center',
        }} className="about-grid">
          <div>
            <h3 style={{ fontSize: '1.5rem', color: '#5C1720', marginBottom: '18px' }}>
              साहित्य की अमूल्य धरोहर को नई पीढ़ी तक ले जाने का संकल्प
            </h3>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '18px', color: '#4A423D' }}>
              {t.about.p1}
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '24px', color: '#4A423D' }}>
              {t.about.p2}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {t.about.points.map((point, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#FFFFFF', padding: '12px 18px', borderRadius: '8px', borderLeft: '4px solid #7A1F2B' }}>
                  <CheckCircle size={18} color="#7A1F2B" style={{ flexShrink: 0 }} />
                  <span style={{ fontWeight: 600, color: '#292522' }}>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 16px 36px rgba(0,0,0,0.12)',
              border: '3px solid #D69A2D',
            }}>
              <img
                src="/assets/images/kavi-session.jpg"
                alt="All India Kavi Sammelan by Bulandi"
                style={{ width: '100%', height: '380px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 850px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
