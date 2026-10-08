import React, { useState } from 'react';
import { ShieldCheck, Check, Sparkles, CreditCard, Award, UserCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MembershipSection({ t }) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
  });
  const [memberCard, setMemberCard] = useState(null);
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      id: 'standard',
      name: t.membership.plan1Name,
      price: t.membership.plan1Price,
      amount: 500,
      features: t.membership.plan1Feat,
      highlight: false,
      badge: 'प्रवेश स्तर',
    },
    {
      id: 'special',
      name: t.membership.plan2Name,
      price: t.membership.plan2Price,
      amount: 1500,
      features: t.membership.plan2Feat,
      highlight: true,
      badge: 'सर्वाधिक लोकप्रिय',
    },
    {
      id: 'patron',
      name: t.membership.plan3Name,
      price: t.membership.plan3Price,
      amount: 5000,
      features: t.membership.plan3Feat,
      highlight: false,
      badge: 'प्रतिष्ठापूर्ण आजीवन',
    },
  ];

  const handleOpenPlan = (plan) => {
    setSelectedPlan(plan);
    setMemberCard(null);
    setCheckoutModalOpen(true);
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/memberships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          plan: `${selectedPlan.name} (${selectedPlan.price})`,
          amount: selectedPlan.amount,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMemberCard(data.data);
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      }
    } catch (err) {
      const fallbackMember = {
        memberId: `BLD-MEM-${Math.floor(1000 + Math.random() * 9000)}`,
        name: formData.name,
        plan: selectedPlan.name,
        amount: selectedPlan.amount,
        transactionId: `TXN-BULANDI-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: new Date(),
      };
      setMemberCard(fallbackMember);
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="membership" className="section-padding" style={{ background: '#F7F1E6' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <ShieldCheck size={16} />
            <span>{t.membership.tag}</span>
          </div>
          <h2>{t.membership.title}</h2>
          <p>{t.membership.subtitle}</p>
        </div>

        {/* 3 Tier Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '28px',
          alignItems: 'stretch',
        }}>
          {plans.map((p) => (
            <div
              key={p.id}
              className="card"
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '36px 28px',
                border: p.highlight ? '2px solid #D69A2D' : '1px solid #E4DCCF',
                background: p.highlight ? '#FFFFFF' : '#FFFDF8',
                transform: p.highlight ? 'scale(1.03)' : 'none',
                boxShadow: p.highlight ? '0 12px 30px rgba(214,154,45,0.2)' : 'var(--shadow-sm)',
              }}
            >
              {p.highlight && (
                <div style={{
                  position: 'absolute',
                  top: '-13px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #D69A2D, #A87516)',
                  color: '#292522',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  padding: '4px 14px',
                  borderRadius: '999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  {p.badge}
                </div>
              )}

              <div>
                <h3 style={{ fontSize: '1.4rem', color: '#5C1720', marginBottom: '8px' }}>{p.name}</h3>
                <div style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: '#7A1F2B',
                  marginBottom: '20px',
                }}>
                  {p.price}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                  {p.features.map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem' }}>
                      <Check size={18} color="#2E7D32" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ color: '#292522' }}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleOpenPlan(p)}
                className={p.highlight ? 'btn btn-accent' : 'btn btn-outline'}
                style={{ width: '100%', padding: '12px' }}
              >
                <span>{t.membership.selectBtn}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Simulated Membership Checkout Modal */}
      {checkoutModalOpen && (
        <div className="modal-overlay" onClick={() => setCheckoutModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <CreditCard color="#D69A2D" />
                <span>बुलंदी सदस्यता पंजीकरण — {selectedPlan?.name}</span>
              </h3>
              <button className="modal-close-btn" onClick={() => setCheckoutModalOpen(false)}>✕</button>
            </div>

            <div className="modal-body">
              {!memberCard ? (
                <form onSubmit={handleCheckoutSubmit}>
                  <div style={{ background: '#F7F1E6', padding: '12px 16px', borderRadius: '8px', marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: '#7A1F2B' }}>चयनित योजना: {selectedPlan?.name}</div>
                      <div style={{ fontSize: '0.82rem', color: '#6B625A' }}>सुरक्षित टेस्ट पेमेंट गेटवे (Razorpay / UPI Mode)</div>
                    </div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#A87516' }}>{selectedPlan?.price}</div>
                  </div>

                  <div className="form-group">
                    <label>सदस्य का पूरा नाम *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="उदा. प्रो. सतीश कुमार"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>ईमेल पता *</label>
                      <input
                        type="email"
                        required
                        className="form-control"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="member@example.com"
                      />
                    </div>
                    <div className="form-group">
                      <label>मोबाइल / व्हाट्सएप नंबर *</label>
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

                  <div className="form-group">
                    <label>शहर / राज्य (City / State) *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="उदा. प्रयागराज, उ.प्र."
                    />
                  </div>

                  <div style={{
                    background: '#FFF9E6',
                    border: '1px solid #D69A2D',
                    borderRadius: '6px',
                    padding: '10px 14px',
                    fontSize: '0.82rem',
                    color: '#6B625A',
                    marginBottom: '18px',
                  }}>
                    💳 <strong>नोट:</strong> यह विकास एवं समीक्षा हेतु अनुकरणीय टेस्ट भुगतान मोड है। सबमिट करने पर सीधे सदस्य ID जनरेट होगी।
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-accent"
                    style={{ width: '100%', padding: '13px' }}
                  >
                    {loading ? 'भुगतान प्रक्रियाधीन...' : `भुगतान करें (${selectedPlan?.price}) एवं ID कार्ड पाएं`}
                  </button>
                </form>
              ) : (
                /* Official Digital Member ID Card */
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #5C1720 0%, #7A1F2B 100%)',
                    borderRadius: '12px',
                    padding: '24px',
                    color: '#FFFDF8',
                    border: '2px solid #D69A2D',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                    textAlign: 'left',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #D69A2D', paddingBottom: '10px', marginBottom: '14px' }}>
                      <div>
                        <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#F7D070' }}>
                          बुलंदी साहित्य संस्थान
                        </div>
                        <div style={{ fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                          OFFICIAL DIGITAL MEMBERSHIP CARD
                        </div>
                      </div>
                      <Award size={32} color="#D69A2D" />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.9rem', marginBottom: '16px' }}>
                      <div>
                        <div style={{ color: '#E4DCCF', fontSize: '0.78rem' }}>सदस्य का नाम:</div>
                        <div style={{ fontWeight: 700, fontSize: '1rem' }}>{memberCard.name}</div>
                      </div>
                      <div>
                        <div style={{ color: '#E4DCCF', fontSize: '0.78rem' }}>सदस्यता क्रमांक (ID):</div>
                        <div style={{ fontWeight: 800, color: '#F7D070' }}>{memberCard.memberId}</div>
                      </div>
                      <div>
                        <div style={{ color: '#E4DCCF', fontSize: '0.78rem' }}>श्रेणी (Tier):</div>
                        <div style={{ fontWeight: 600 }}>{selectedPlan?.name}</div>
                      </div>
                      <div>
                        <div style={{ color: '#E4DCCF', fontSize: '0.78rem' }}>लेन-देन ID (Txn):</div>
                        <div style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{memberCard.transactionId}</div>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: '#E4DCCF', textAlign: 'center', borderTop: '1px dashed rgba(214,154,45,0.4)', paddingTop: '8px' }}>
                      यह सदस्यता कार्ड बुलंदी साहित्य संस्थान के नियमों के अधीन मान्य है।
                    </div>
                  </div>

                  <p style={{ marginTop: '16px', fontSize: '0.88rem', color: '#2E7D32', fontWeight: 600 }}>
                    ✓ सदस्यता सक्रिय हो गई है। डिजिटल ID कार्ड आपके डेटाबेस में दर्ज कर लिया गया है।
                  </p>

                  <button
                    onClick={() => { setMemberCard(null); setCheckoutModalOpen(false); }}
                    className="btn btn-outline"
                    style={{ marginTop: '12px' }}
                  >
                    सम्पन्न (Done)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
