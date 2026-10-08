import React from 'react';
import { Award, BookOpen, Users, Globe2, Sparkles, ArrowRight, PlayCircle } from 'lucide-react';

export default function Hero({ t, onOpenSubmit, onOpenGoshthiPass }) {
  const stats = [
    { icon: <BookOpen size={28} color="#D69A2D" />, value: t.hero.stat1, label: t.hero.stat1Label },
    { icon: <Award size={28} color="#D69A2D" />, value: t.hero.stat2, label: t.hero.stat2Label },
    { icon: <Users size={28} color="#D69A2D" />, value: t.hero.stat3, label: t.hero.stat3Label },
    { icon: <Globe2 size={28} color="#D69A2D" />, value: t.hero.stat4, label: t.hero.stat4Label },
  ];

  return (
    <section id="home" style={{
      position: 'relative',
      background: 'linear-gradient(180deg, #FDF9F0 0%, #FFFDF8 100%)',
      padding: '70px 0 60px 0',
      borderBottom: '1px solid #E4DCCF',
      overflow: 'hidden',
    }}>
      {/* Background Decorative Motif */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(214,154,45,0.08) 0%, rgba(122,31,43,0.03) 60%, transparent 80%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.15fr 0.85fr',
          gap: '40px',
          alignItems: 'center',
          marginBottom: '50px',
        }} className="hero-grid">
          {/* Left Column: Headlines & Call to Actions */}
          <div>
            <div className="section-tag" style={{ marginBottom: '18px' }}>
              <Sparkles size={16} />
              <span>{t.hero.tag}</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.1rem, 3.8vw, 3.2rem)',
              lineHeight: 1.25,
              color: '#5C1720',
              marginBottom: '20px',
              fontFamily: "'Noto Serif Devanagari', 'Cinzel', serif",
            }}>
              {t.hero.title}
            </h1>

            <p style={{
              fontSize: '1.12rem',
              lineHeight: 1.8,
              color: '#4A423D',
              marginBottom: '32px',
              maxWidth: '640px',
            }}>
              {t.hero.subtitle}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
              <button onClick={onOpenSubmit} className="btn btn-primary" style={{ padding: '13px 26px', fontSize: '1.02rem' }}>
                <span>{t.hero.btnSubmit}</span>
                <ArrowRight size={18} />
              </button>

              <button onClick={onOpenGoshthiPass} className="btn btn-accent" style={{ padding: '13px 24px', fontSize: '1.02rem' }}>
                <PlayCircle size={20} />
                <span>{t.hero.btnGoshthi}</span>
              </button>
            </div>
          </div>

          {/* Right Column: High-Definition Cultural Visual Showcase */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(122, 31, 43, 0.2)',
              border: '3px solid #D69A2D',
            }}>
              <img
                src="/assets/images/hero-banner.jpg"
                alt="Bulandi Sahitya Sansthan Literary Lamp and Quill"
                style={{ width: '100%', height: '390px', objectFit: 'cover' }}
                onError={(e) => {
                  // Fallback styling if image path is not loaded
                  e.target.style.background = '#7A1F2B';
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(30, 8, 12, 0.88))',
                padding: '24px 20px 16px 20px',
                color: '#FFFDF8',
              }}>
                <div style={{ display: 'inline-block', background: '#D69A2D', color: '#292522', fontWeight: 800, fontSize: '0.75rem', padding: '3px 10px', borderRadius: '4px', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Historic Milestone
                </div>
                <div style={{ fontFamily: "'Noto Serif Devanagari', serif", fontSize: '1.15rem', fontWeight: 700 }}>
                  101-घंटे अखंड काव्य पाठ — वर्ल्ड बुक ऑफ रिकॉर्ड्स (लंदन)
                </div>
              </div>
            </div>

            {/* Floating Gold Quality Seal Badge */}
            <div style={{
              position: 'absolute',
              top: '-15px',
              right: '-15px',
              background: 'linear-gradient(135deg, #D69A2D, #A87516)',
              color: '#292522',
              borderRadius: '50%',
              width: '80px',
              height: '80px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
              border: '2px solid #FFFDF8',
              textAlign: 'center',
              fontWeight: 800,
              fontSize: '0.72rem',
              lineHeight: 1.1,
            }}>
              <Award size={20} color="#292522" />
              <span>RECORD</span>
              <span>HOLDER</span>
            </div>
          </div>
        </div>

        {/* 4 Live Metric Counter Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginTop: '20px',
        }}>
          {stats.map((stat, idx) => (
            <div key={idx} className="card" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              background: '#FFFFFF',
              borderTop: '3px solid #D69A2D',
              padding: '20px',
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '12px',
                background: 'rgba(214, 154, 45, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {stat.icon}
              </div>
              <div>
                <div style={{
                  fontFamily: "'Cinzel', 'Noto Serif Devanagari', serif",
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: '#7A1F2B',
                  lineHeight: 1.1,
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.88rem', color: '#6B625A', fontWeight: 600, marginTop: '4px' }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
