import React from 'react';
import { Feather, Heart, Shield, Globe } from 'lucide-react';

export default function Footer({ t, onOpenAdmin }) {
  return (
    <footer style={{ background: '#5C1720', color: '#FFFDF8', padding: '60px 0 24px 0', borderTop: '3px solid #D69A2D' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '36px',
          marginBottom: '40px',
        }}>
          {/* Org Bio */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#7A1F2B',
                border: '1px solid #D69A2D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Feather size={18} color="#D69A2D" />
              </div>
              <span style={{ fontFamily: "'Noto Serif Devanagari', 'Cinzel', serif", fontSize: '1.2rem', fontWeight: 800, color: '#F7D070' }}>
                बुलंदी साहित्य संस्थान
              </span>
            </div>
            <p style={{ color: '#E4DCCF', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '16px' }}>
              {t.footer.bio}
            </p>
            <div style={{ fontSize: '0.82rem', color: '#D69A2D', fontWeight: 600 }}>
              ★ 101-Hour Non-Stop Poetry World Record Holder
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#F7D070', fontSize: '1.05rem', marginBottom: '16px' }}>{t.footer.quickLinks}</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: '#E4DCCF' }}>
              <li><a href="#about">संस्थान का परिचय (About Us)</a></li>
              <li><a href="#goshthi">रविवार ई-गोष्ठी पास (Sunday Pass)</a></li>
              <li><a href="#records">विश्व कीर्तिमान (World Records)</a></li>
              <li><a href="#events">आगामी कार्यक्रम (Events)</a></li>
              <li><a href="#submit">रचना प्रेषण पोर्टल (Poem Submission)</a></li>
              <li><a href="#membership">वार्षिक सदस्यता (Membership)</a></li>
            </ul>
          </div>

          {/* Guidelines & Support */}
          <div>
            <h4 style={{ color: '#F7D070', fontSize: '1.05rem', marginBottom: '16px' }}>सहयोग एवं नियमावली</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: '#E4DCCF' }}>
              <li><a href="#donations">सांस्कृतिक सहयोग कोष (Donations)</a></li>
              <li><a href="#volunteer">स्वयंसेवक पंजीकरण (Volunteer)</a></li>
              <li><a href="#volunteer">विश्वविद्यालय MoU (Institutional MoU)</a></li>
              <li><a href="#faq">सामान्य प्रश्नोत्तरी (FAQ)</a></li>
              <li><a href="#contact">सचिवालय संपर्क (Contact Us)</a></li>
            </ul>
          </div>

          {/* Secretariat Contact & Admin Link */}
          <div>
            <h4 style={{ color: '#F7D070', fontSize: '1.05rem', marginBottom: '16px' }}>केंद्रीय संपर्क</h4>
            <p style={{ color: '#E4DCCF', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '14px' }}>
              बुलंदी सचिवालय, नई दिल्ली / बरेली (उ.प्र.)<br />
              ईमेल: contact@bulandisahitya.org<br />
              हेल्पलाइन: +91 94123 45678
            </p>

            <button
              onClick={onOpenAdmin}
              style={{
                background: 'rgba(214, 154, 45, 0.2)',
                border: '1px solid #D69A2D',
                color: '#F7D070',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              <Shield size={16} />
              <span>प्रशासक लॉगिन (Admin Portal)</span>
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          borderTop: '1px solid rgba(228, 220, 207, 0.2)',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.84rem',
          color: '#E4DCCF',
        }}>
          <div>{t.footer.copyright}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>हिंदी एवं भारतीय भाषाओं के वैश्विक संवर्धन हेतु समर्पित</span>
            <Heart size={14} color="#D69A2D" fill="#D69A2D" />
          </div>
        </div>
      </div>
    </footer>
  );
}
