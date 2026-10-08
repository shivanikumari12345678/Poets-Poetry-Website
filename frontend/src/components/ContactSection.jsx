import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactSection({ t }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding" style={{ background: '#FFFDF8' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Mail size={16} />
            <span>{t.contact.tag}</span>
          </div>
          <h2>{t.contact.title}</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '0.9fr 1.1fr',
          gap: '40px',
        }} className="contact-grid">
          {/* Coordinates */}
          <div>
            <h3 style={{ fontSize: '1.4rem', color: '#5C1720', marginBottom: '20px' }}>
              केंद्रीय सचिवालय एवं संपर्क विवरण
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: '#F7F1E6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={20} color="#7A1F2B" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#292522' }}>मुख्यालय एवं प्रशासनिक कार्यालय</div>
                  <div style={{ color: '#6B625A', fontSize: '0.92rem' }}>{t.contact.hq}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: '#F7F1E6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={20} color="#7A1F2B" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#292522' }}>आधिकारिक ईमेल</div>
                  <div style={{ color: '#6B625A', fontSize: '0.92rem' }}>{t.contact.email}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: '#F7F1E6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={20} color="#7A1F2B" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#292522' }}>दूरभाष एवं हेल्पलाइन</div>
                  <div style={{ color: '#6B625A', fontSize: '0.92rem' }}>{t.contact.phone}</div>
                </div>
              </div>
            </div>

            <div style={{
              background: '#F7F1E6',
              border: '1px solid #E4DCCF',
              borderRadius: '8px',
              padding: '18px',
              fontSize: '0.88rem',
              color: '#4A423D',
            }}>
              💡 <strong>गोष्ठी हेल्पलाइन:</strong> रविवार को ऑनलाइन ई-गोष्ठी संबंधी किसी भी तकनीकी सहायता हेतु हमारी टीम दोपहर 02:00 बजे से व्हाट्सएप पर उपलब्ध रहती है।
            </div>
          </div>

          {/* Form */}
          <div className="card" style={{ padding: '32px' }}>
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>आपका नाम *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="उदा. शैलेंद्र द्विवेदी"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>ईमेल *</label>
                    <input
                      type="email"
                      required
                      className="form-control"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="shailendra@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>मोबाइल नंबर</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>विषय (Subject) *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="उदा. रविवार गोष्ठी अथवा पुस्तक प्रकाशन संबंधी"
                  />
                </div>

                <div className="form-group">
                  <label>संदेश (Message) *</label>
                  <textarea
                    required
                    rows="4"
                    className="form-control"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="अपना संदेश यहाँ लिखें..."
                  />
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
                  <Send size={18} />
                  <span>{loading ? 'प्रेषित हो रहा है...' : t.contact.sendMsg}</span>
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px' }}>
                <CheckCircle2 size={44} color="#2E7D32" style={{ margin: '0 auto 12px auto' }} />
                <h3 style={{ color: '#5C1720', marginBottom: '8px' }}>संदेश प्राप्त हुआ!</h3>
                <p>हमारी केंद्रीय संपर्क टीम जल्द ही आपसे संवाद करेगी।</p>
                <button onClick={() => setSubmitted(false)} className="btn btn-outline" style={{ marginTop: '16px' }}>
                  नया संदेश
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 850px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
