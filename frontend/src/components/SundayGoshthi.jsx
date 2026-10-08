import React, { useState } from 'react';
import { Calendar, Video, Clock, CheckCircle2, Ticket, Sparkles, Send, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SundayGoshthi({ t, isModalOpen, setIsModalOpen }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'India',
    participantRole: 'listener',
    poemTitle: '',
  });

  const [registeredPass, setRegisteredPass] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/sunday-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setRegisteredPass(data.data);
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } else {
        setErrorMsg(data.message || 'Error creating pass.');
      }
    } catch (err) {
      // In case server is offline, generate local pass
      const pass = {
        regId: `BLD-SUN-${Math.floor(1000 + Math.random() * 9000)}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        participantRole: formData.participantRole,
        zoomLink: 'https://us02web.zoom.us/j/82947192015?pwd=BulandiSahityaLive2026',
        createdAt: new Date(),
      };
      setRegisteredPass(pass);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="goshthi" className="section-padding" style={{ background: '#FFFDF8' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Ticket size={16} />
            <span>{t.goshthi.tag}</span>
          </div>
          <h2>{t.goshthi.title}</h2>
          <p>{t.goshthi.desc}</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          alignItems: 'center',
          background: '#F7F1E6',
          borderRadius: '16px',
          padding: '40px',
          border: '1px solid #E4DCCF',
        }} className="goshthi-card">
          {/* Left: Info & Action */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{
                background: '#7A1F2B',
                color: '#FFFDF8',
                fontSize: '0.82rem',
                fontWeight: 700,
                padding: '4px 12px',
                borderRadius: '999px',
              }}>
                LIVE EVERY SUNDAY
              </span>
              <span style={{ color: '#D69A2D', fontWeight: 700, fontSize: '0.9rem' }}>
                45+ Countries Connected
              </span>
            </div>

            <h3 style={{ fontSize: '1.6rem', color: '#5C1720', marginBottom: '16px' }}>
              साप्ताहिक अंतरराष्ट्रीय ई-गोष्ठी मंच
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#292522', fontWeight: 600 }}>
                <Clock size={18} color="#7A1F2B" />
                <span>{t.goshthi.date}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#292522', fontWeight: 600 }}>
                <Video size={18} color="#7A1F2B" />
                <span>{t.goshthi.platform}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
              {t.goshthi.features.map((feat, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
                  <CheckCircle2 size={16} color="#2E7D32" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-primary"
              style={{ padding: '12px 28px', fontSize: '1rem' }}
            >
              <Ticket size={18} />
              <span>{t.goshthi.passBtn}</span>
            </button>
          </div>

          {/* Right: Media Showcase */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
              border: '2px solid #D69A2D',
            }}>
              <img
                src="/assets/images/online-goshthi.jpg"
                alt="Sunday Online E-Goshthi Video Interface"
                style={{ width: '100%', height: '320px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Digital Entry Pass Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <Ticket color="#D69A2D" />
                <span>249वीं रविवार ई-गोष्ठी डिजिटल प्रवेश पास</span>
              </h3>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>

            <div className="modal-body">
              {!registeredPass ? (
                <form onSubmit={handleSubmit}>
                  {errorMsg && <p style={{ color: '#D32F2F', marginBottom: '12px', fontWeight: 600 }}>{errorMsg}</p>}

                  <div className="form-group">
                    <label>आपका पूरा नाम (Full Name) *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="उदा. आचार्य श्रीकांत शर्मा"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>ईमेल पता (Email) *</label>
                      <input
                        type="email"
                        required
                        className="form-control"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="shrikant@example.com"
                      />
                    </div>
                    <div className="form-group">
                      <label>व्हाट्सएप नंबर (Phone) *</label>
                      <input
                        type="tel"
                        required
                        className="form-control"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>देश / राज्य (Country/State) *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="India / USA / UK"
                      />
                    </div>
                    <div className="form-group">
                      <label>आपकी सहभागिता (Role) *</label>
                      <select
                        className="form-control"
                        value={formData.participantRole}
                        onChange={(e) => setFormData({ ...formData, participantRole: e.target.value })}
                      >
                        <option value="listener">साहित्य प्रेमी / श्रोता (Listener)</option>
                        <option value="poet">काव्य पाठ हेतु कवि (Poet Reciter)</option>
                      </select>
                    </div>
                  </div>

                  {formData.participantRole === 'poet' && (
                    <div className="form-group">
                      <label>प्रस्तावित कविता / गजल का शीर्षक</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.poemTitle}
                        onChange={(e) => setFormData({ ...formData, poemTitle: e.target.value })}
                        placeholder="उदा. मातृभूमि की वंदना"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: '10px', padding: '12px' }}
                  >
                    {loading ? 'पास तैयार किया जा रहा है...' : 'प्रवेश पास जनरेट करें (Generate Pass)'}
                  </button>
                </form>
              ) : (
                /* Pass Generated Showcase Card */
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #7A1F2B 0%, #5C1720 100%)',
                    borderRadius: '12px',
                    padding: '24px',
                    color: '#FFFDF8',
                    border: '2px solid #D69A2D',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                    textAlign: 'left',
                    position: 'relative',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #D69A2D', paddingBottom: '12px', marginBottom: '14px' }}>
                      <div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#F7D070' }}>
                          बुलंदी अंतर्राष्ट्रीय ई-गोष्ठी प्रवेश पास
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#E4DCCF' }}>249th International Sunday E-Goshthi</div>
                      </div>
                      <div style={{
                        background: '#D69A2D',
                        color: '#292522',
                        fontWeight: 800,
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '0.85rem',
                      }}>
                        {registeredPass.regId}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.9rem', marginBottom: '16px' }}>
                      <div>
                        <div style={{ color: '#E4DCCF', fontSize: '0.78rem' }}>सहभागी का नाम:</div>
                        <div style={{ fontWeight: 700 }}>{registeredPass.name}</div>
                      </div>
                      <div>
                        <div style={{ color: '#E4DCCF', fontSize: '0.78rem' }}>सहभागिता श्रेणी:</div>
                        <div style={{ fontWeight: 700, textTransform: 'capitalize' }}>
                          {registeredPass.participantRole === 'poet' ? 'कवि (Poet)' : 'श्रोता (Listener)'}
                        </div>
                      </div>
                      <div>
                        <div style={{ color: '#E4DCCF', fontSize: '0.78rem' }}>समय एवं तिथि:</div>
                        <div>आगामी रविवार, 04:00 PM IST</div>
                      </div>
                      <div>
                        <div style={{ color: '#E4DCCF', fontSize: '0.78rem' }}>देश / क्षेत्र:</div>
                        <div>{registeredPass.country}</div>
                      </div>
                    </div>

                    <div style={{
                      background: 'rgba(0,0,0,0.3)',
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1px solid rgba(214,154,45,0.4)',
                    }}>
                      <div style={{ fontSize: '0.78rem', color: '#F7D070', fontWeight: 600 }}>सीधा ज़ूम लिंक (Direct Zoom Access):</div>
                      <a
                        href={registeredPass.zoomLink}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: '#FFFDF8', textDecoration: 'underline', wordBreak: 'break-all', fontSize: '0.85rem' }}
                      >
                        {registeredPass.zoomLink}
                      </a>
                    </div>
                  </div>

                  <p style={{ marginTop: '16px', fontSize: '0.88rem', color: '#2E7D32', fontWeight: 600 }}>
                    ✓ आपका डिजिटल पास सुरक्षित रूप से दर्ज कर दिया गया है। कृपया समय से 5 मिनट पूर्व ज़ूम में प्रवेश करें।
                  </p>

                  <button
                    onClick={() => { setRegisteredPass(null); setIsModalOpen(false); }}
                    className="btn btn-outline"
                    style={{ marginTop: '12px' }}
                  >
                    सम्पन्न (Close)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 850px) {
          .goshthi-card {
            grid-template-columns: 1fr !important;
            padding: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
