import React, { useState } from 'react';
import { Image, Maximize2 } from 'lucide-react';

export default function GallerySection({ t }) {
  const [selectedImg, setSelectedImg] = useState(null);

  const galleryItems = [
    {
      src: '/assets/images/hero-banner.jpg',
      title: 'काव्य दीप एवं पांडुलिपि साधना',
      caption: 'Bulandi Literary Diya & Heritage Parchment Quill',
    },
    {
      src: '/assets/images/world-record.jpg',
      title: '101 घंटे विश्व कीर्तिमान सम्मान',
      caption: 'World Book of Records (London) Adjudication Trophy & Certificate',
    },
    {
      src: '/assets/images/online-goshthi.jpg',
      title: '248वीं रविवार अंतरराष्ट्रीय ई-गोष्ठी',
      caption: 'Global Virtual Conference Room Connecting 45+ Nations',
    },
    {
      src: '/assets/images/kavi-session.jpg',
      title: 'अखिल भारतीय विराट कवि सम्मेलन',
      caption: 'Grand Auditorium Stage with Renowned Hindi Poets & Audience',
    },
  ];

  return (
    <section id="gallery" className="section-padding" style={{ background: '#F7F1E6' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Image size={16} />
            <span>चित्र दीर्घा</span>
          </div>
          <h2>बुलंदी ऐतिहासिक स्मृतियां व चित्र दीर्घा</h2>
          <p>संस्थान के राष्ट्रीय कवि सम्मेलनों, रविवार गोष्ठियों एवं विश्व रिकॉर्ड आयोजनों की चुनिंदा झलकियां।</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                padding: 0,
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
              }}
              onClick={() => setSelectedImg(item)}
            >
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                <img
                  src={item.src}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.75))',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '16px',
                  color: '#FFFFFF',
                }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: '#F7D070' }}>{item.title}</div>
                    <div style={{ fontSize: '0.8rem', color: '#E4DCCF' }}>{item.caption}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      {selectedImg && (
        <div className="modal-overlay" onClick={() => setSelectedImg(null)}>
          <div className="modal-container large-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedImg.title}</h3>
              <button className="modal-close-btn" onClick={() => setSelectedImg(null)}>✕</button>
            </div>
            <div className="modal-body" style={{ textAlign: 'center' }}>
              <img
                src={selectedImg.src}
                alt={selectedImg.title}
                style={{ maxWidth: '100%', maxHeight: '70vh', margin: '0 auto', borderRadius: '8px' }}
              />
              <p style={{ marginTop: '14px', color: '#5C1720', fontWeight: 600 }}>{selectedImg.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
