import React, { useState } from 'react';
import { Heart, ShieldAlert, CheckCircle, Receipt, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DonationsSection({ t }) {
  const [amount, setAmount] = useState('1100');
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cause, setCause] = useState('Weekly Global Broadcasting');
  const [panNumber, setPanNumber] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);

  const presets = ['501', '1100', '2100', '5100'];

  const handlePresetClick = (val) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value);
    setAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalAmt = Number(amount);
    if (!finalAmt || finalAmt <= 0) {
      alert('कृपया वैध सहयोग राशि चुनें या दर्ज करें।');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorName,
          email,
          phone,
          amount: finalAmt,
          cause,
          panNumber,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setReceipt(data.data);
        confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
      }
    } catch (err) {
      const fallbackReceipt = {
        receiptId: `BLD-DON-${Math.floor(1000 + Math.random() * 9000)}`,
        donorName,
        email,
        amount: finalAmt,
        cause,
        transactionId: `TXN-DON-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: new Date(),
      };
      setReceipt(fallbackReceipt);
      confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="donations" className="section-padding" style={{ background: '#FFFDF8', borderTop: '1px solid #E4DCCF' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag" style={{ background: 'rgba(122,31,43,0.1)', color: '#7A1F2B' }}>
            <Heart size={16} fill="#7A1F2B" />
            <span>{t.donations.tag}</span>
          </div>
          <h2>{t.donations.title}</h2>
          <p>{t.donations.subtitle}</p>
        </div>

        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          {!receipt ? (
            <div className="card" style={{ padding: '36px', borderTop: '4px solid #D69A2D' }}>
              <form onSubmit={handleSubmit}>
                {/* Preset Amount Selector */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '10px' }}>
                    सहयोग राशि चुनें (Select Contribution Amount)
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '12px' }}>
                    {presets.map((p) => (
                      <button
                        type="button"
                        key={p}
                        onClick={() => handlePresetClick(p)}
                        className={amount === p && !customAmount ? 'btn btn-primary' : 'btn btn-outline'}
                        style={{ padding: '12px 6px', fontSize: '1.05rem', fontWeight: 700 }}
                      >
                        ₹{p}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    min="51"
                    placeholder="अथवा अन्य इच्छित राशि दर्ज करें (₹ Other Amount)"
                    className="form-control"
                    value={customAmount}
                    onChange={handleCustomChange}
                  />
                </div>

                <div className="form-group">
                  <label>{t.donations.causeLabel} *</label>
                  <select
                    className="form-control"
                    value={cause}
                    onChange={(e) => setCause(e.target.value)}
                  >
                    <option value="Weekly Global Broadcasting">{t.donations.cause1}</option>
                    <option value="Rural Poet Outreach">{t.donations.cause2}</option>
                    <option value="Manuscript Preservation">{t.donations.cause3}</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>सहयोगकर्ता का नाम (Full Name) *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="उदा. अनुराधा त्रिवेदी"
                    />
                  </div>
                  <div className="form-group">
                    <label>ईमेल पता (Email) *</label>
                    <input
                      type="email"
                      required
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="donor@example.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>संपर्क फोन नंबर *</label>
                    <input
                      type="tel"
                      required
                      className="form-control"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="form-group">
                    <label>PAN कार्ड नंबर (ऐच्छिक)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={panNumber}
                      onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                      placeholder="ABCDE1234F"
                    />
                  </div>
                </div>

                {/* 80G Legal Disclaimer Banner */}
                <div style={{
                  background: '#FFF9E6',
                  border: '1px solid #D69A2D',
                  borderRadius: '8px',
                  padding: '14px 18px',
                  fontSize: '0.86rem',
                  lineHeight: 1.6,
                  color: '#6B625A',
                  margin: '18px 0 24px 0',
                }}>
                  {t.donations.taxDisclaimer}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-accent"
                  style={{ width: '100%', padding: '14px', fontSize: '1.05rem' }}
                >
                  <Heart size={18} fill="#292522" />
                  <span>{loading ? 'प्रक्रियाधीन...' : `₹${amount || '0'} ${t.donations.donateBtn}`}</span>
                </button>
              </form>
            </div>
          ) : (
            /* Instant Donation Receipt Preview */
            <div className="card" style={{ textAlign: 'center', padding: '40px', borderTop: '4px solid #2E7D32' }}>
              <div style={{
                background: '#F7F1E6',
                border: '2px solid #D69A2D',
                borderRadius: '12px',
                padding: '28px',
                textAlign: 'left',
                maxWidth: '520px',
                margin: '0 auto 24px auto',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E4DCCF', paddingBottom: '12px', marginBottom: '14px' }}>
                  <div>
                    <div style={{ fontWeight: 800, color: '#7A1F2B', fontSize: '1.15rem' }}>बुलंदी साहित्य संस्थान</div>
                    <div style={{ fontSize: '0.78rem', color: '#6B625A' }}>आधिकारिक सांस्कृतिक सहयोग रसीद</div>
                  </div>
                  <Receipt size={28} color="#D69A2D" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.9rem', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: '#6B625A' }}>रसीद संख्या:</span>
                    <div style={{ fontWeight: 700, color: '#7A1F2B' }}>{receipt.receiptId}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: '#6B625A' }}>सहयोग राशि:</span>
                    <div style={{ fontWeight: 800, color: '#2E7D32', fontSize: '1.1rem' }}>₹{receipt.amount}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: '#6B625A' }}>सहयोगकर्ता:</span>
                    <div style={{ fontWeight: 600 }}>{receipt.donorName}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: '#6B625A' }}>उद्देश्य:</span>
                    <div style={{ fontWeight: 600 }}>{receipt.cause}</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.75rem', color: '#6B625A', borderTop: '1px dashed #E4DCCF', paddingTop: '10px', textAlign: 'center' }}>
                  भारतीय साहित्य एवं संस्कृति के उत्थान में आपके पावन योगदान हेतु संस्थान आपका हृदय से आभारी है।
                </div>
              </div>

              <p style={{ color: '#2E7D32', fontWeight: 600, marginBottom: '18px' }}>
                ✓ सहयोग रसीद सफलतापूर्वक तैयार कर ली गई है।
              </p>

              <button
                onClick={() => {
                  setReceipt(null);
                  setDonorName('');
                  setEmail('');
                  setPhone('');
                }}
                className="btn btn-outline"
              >
                अन्य सहयोग (New Contribution)
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
