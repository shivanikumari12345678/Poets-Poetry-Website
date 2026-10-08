import React from 'react';
import { Feather, Sparkles } from 'lucide-react';

export default function PoetryRecital({ t }) {
  return (
    <section className="section-padding" style={{ background: '#FFFDF8', borderTop: '1px solid #E4DCCF' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Feather size={16} />
            <span>{t.recital.tag}</span>
          </div>
          <h2>{t.recital.title}</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}>
          <div className="card" style={{ background: '#F7F1E6', borderLeft: '5px solid #7A1F2B', padding: '30px' }}>
            <div className="poetry-verse" style={{ margin: 0, padding: '16px 0', background: 'transparent', border: 'none', boxShadow: 'none' }}>
              {t.recital.quote1}
            </div>
            <div style={{ textAlign: 'right', marginTop: '16px', fontWeight: 700, color: '#A87516', fontSize: '0.95rem' }}>
              {t.recital.author1}
            </div>
          </div>

          <div className="card" style={{ background: '#F7F1E6', borderLeft: '5px solid #D69A2D', padding: '30px' }}>
            <div className="poetry-verse" style={{ margin: 0, padding: '16px 0', background: 'transparent', border: 'none', boxShadow: 'none' }}>
              {t.recital.quote2}
            </div>
            <div style={{ textAlign: 'right', marginTop: '16px', fontWeight: 700, color: '#A87516', fontSize: '0.95rem' }}>
              {t.recital.author2}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
