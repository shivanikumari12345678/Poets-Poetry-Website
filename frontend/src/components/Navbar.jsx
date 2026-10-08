import React, { useState } from 'react';
import { Globe, Shield, Menu, X, Feather, Heart, Sparkles } from 'lucide-react';

export default function Navbar({ lang, setLang, t, onOpenAdmin, onOpenSubmit, onOpenDonate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLang(lang === 'hi' ? 'en' : 'hi');
  };

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#goshthi', label: t.nav.goshthi },
    { href: '#records', label: t.nav.records },
    { href: '#events', label: t.nav.events },
    { href: '#submit', label: t.nav.submit },
    { href: '#membership', label: t.nav.membership },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#donations', label: t.nav.donate },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, background: '#FFFDF8', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
      {/* Top Notification Announcement Bar */}
      <div style={{ background: 'linear-gradient(90deg, #5C1720, #7A1F2B, #5C1720)', color: '#FFFDF8', padding: '6px 0', fontSize: '0.84rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500 }}>
            <span>{t.announcement}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              style={{
                background: 'rgba(255, 253, 248, 0.15)',
                border: '1px solid rgba(214, 154, 45, 0.4)',
                color: '#FFFDF8',
                padding: '3px 12px',
                borderRadius: '999px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.82rem',
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
              title="Toggle Language"
            >
              <Globe size={14} color="#D69A2D" />
              <span>{t.switchLang}</span>
            </button>

            {/* Admin Portal Shortcut */}
            <button
              onClick={onOpenAdmin}
              style={{
                background: 'rgba(214, 154, 45, 0.2)',
                border: '1px solid #D69A2D',
                color: '#F7D070',
                padding: '3px 12px',
                borderRadius: '999px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.82rem',
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
              title="Open Admin CMS Controller"
            >
              <Shield size={14} />
              <span>{t.adminPortalBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar */}
      <nav style={{ padding: '14px 0', borderBottom: '1px solid #E4DCCF' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo & Emblem */}
          <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #7A1F2B, #5C1720)',
              border: '2px solid #D69A2D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(122, 31, 43, 0.3)',
            }}>
              <Feather size={24} color="#D69A2D" />
            </div>
            <div>
              <div style={{
                fontFamily: "'Noto Serif Devanagari', 'Cinzel', serif",
                fontSize: '1.28rem',
                fontWeight: 800,
                color: '#7A1F2B',
                lineHeight: 1.15,
                letterSpacing: '0.3px',
              }}>
                बुलंदी साहित्य संस्थान
              </div>
              <div style={{ fontSize: '0.72rem', letterSpacing: '1.5px', color: '#A87516', fontWeight: 700, textTransform: 'uppercase' }}>
                Bulandi Literary Foundation
              </div>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }} className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  color: '#292522',
                  padding: '6px 2px',
                  position: 'relative',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#7A1F2B')}
                onMouseLeave={(e) => (e.target.style.color = '#292522')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action CTA Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="desktop-ctas">
            <button onClick={onOpenSubmit} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.88rem' }}>
              <Feather size={15} />
              <span>{t.nav.submit}</span>
            </button>
            <button onClick={onOpenDonate} className="btn btn-accent" style={{ padding: '8px 16px', fontSize: '0.88rem' }}>
              <Heart size={15} fill="#292522" />
              <span>{t.nav.donate}</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#7A1F2B',
              padding: '6px',
            }}
            className="mobile-menu-toggle"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          background: '#FFFDF8',
          borderBottom: '2px solid #D69A2D',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: '#292522',
                padding: '8px 0',
                borderBottom: '1px solid #E4DCCF',
              }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
            <button onClick={() => { setMobileMenuOpen(false); onOpenSubmit(); }} className="btn btn-outline">
              <Feather size={16} />
              <span>{t.nav.submit}</span>
            </button>
            <button onClick={() => { setMobileMenuOpen(false); onOpenDonate(); }} className="btn btn-accent">
              <Heart size={16} fill="#292522" />
              <span>{t.nav.donate}</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav, .desktop-ctas {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
