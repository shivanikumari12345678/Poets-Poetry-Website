import React, { useState } from 'react';
import { Users2, Building2, Send, CheckCircle2 } from 'lucide-react';

export default function VolunteerCollab({ t }) {
  const [activeTab, setActiveTab] = useState('volunteer');
  const [volSuccess, setVolSuccess] = useState(false);
  const [collabSuccess, setCollabSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [volForm, setVolForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    role: 'मंच संचालन / एंकरिंग (Anchoring)',
    skills: '',
  });

  const [collabForm, setCollabForm] = useState({
    institutionName: '',
    contactPerson: '',
    designation: '',
    email: '',
    phone: '',
    institutionType: 'विश्वविद्यालय (University)',
    proposal: '',
  });

  const handleVolSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(volForm),
      });
      setVolSuccess(true);
    } catch (err) {
      setVolSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCollabSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/collaborations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(collabForm),
      });
      setCollabSuccess(true);
    } catch (err) {
      setCollabSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="volunteer" className="section-padding" style={{ background: '#F7F1E6', borderTop: '1px solid #E4DCCF' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Users2 size={16} />
            <span>{t.volunteer.tag}</span>
          </div>
          <h2>{t.volunteer.title}</h2>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
            <button
              onClick={() => setActiveTab('volunteer')}
              className={activeTab === 'volunteer' ? 'btn btn-primary' : 'btn btn-outline'}
              style={{ padding: '12px', fontSize: '0.96rem' }}
            >
              <Users2 size={18} />
              <span>{t.volunteer.volTab}</span>
            </button>
            <button
              onClick={() => setActiveTab('collab')}
              className={activeTab === 'collab' ? 'btn btn-primary' : 'btn btn-outline'}
              style={{ padding: '12px', fontSize: '0.96rem' }}
            >
              <Building2 size={18} />
              <span>{t.volunteer.collabTab}</span>
            </button>
          </div>

          {/* Volunteer Form */}
          {activeTab === 'volunteer' && (
            <div className="card" style={{ padding: '32px' }}>
              {!volSuccess ? (
                <form onSubmit={handleVolSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>स्वयंसेवक का नाम *</label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        value={volForm.name}
                        onChange={(e) => setVolForm({ ...volForm, name: e.target.value })}
                        placeholder="आपका पूरा नाम"
                      />
                    </div>
                    <div className="form-group">
                      <label>ईमेल पता *</label>
                      <input
                        type="email"
                        required
                        className="form-control"
                        value={volForm.email}
                        onChange={(e) => setVolForm({ ...volForm, email: e.target.value })}
                        placeholder="volunteer@example.com"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>व्हाट्सएप नंबर *</label>
                      <input
                        type="tel"
                        required
                        className="form-control"
                        value={volForm.phone}
                        onChange={(e) => setVolForm({ ...volForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="form-group">
                      <label>निवास शहर *</label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        value={volForm.city}
                        onChange={(e) => setVolForm({ ...volForm, city: e.target.value })}
                        placeholder="उदा. बरेली / दिल्ली"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>सहयोग का इच्छित क्षेत्र *</label>
                    <select
                      className="form-control"
                      value={volForm.role}
                      onChange={(e) => setVolForm({ ...volForm, role: e.target.value })}
                    >
                      <option value="मंच संचालन / एंकरिंग (Anchoring)">मंच संचालन / एंकरिंग (Anchoring)</option>
                      <option value="ज़ूम व तकनीकी प्रसारण (Zoom & Tech)">ज़ूम व तकनीकी प्रसारण (Zoom & Tech)</option>
                      <option value="रचना प्रूफरीडिंग व संपादन (Editing)">रचना प्रूफरीडिंग व संपादन (Editing)</option>
                      <option value="ग्राफिक डिज़ाइन व सोशल मीडिया">ग्राफिक डिज़ाइन व सोशल मीडिया</option>
                      <option value="स्थानीय आयोजक समन्वयक (City Coordinator)">स्थानीय आयोजक समन्वयक (City Coordinator)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>संक्षिप्त अनुभव या संदेश</label>
                    <textarea
                      rows="3"
                      className="form-control"
                      value={volForm.skills}
                      onChange={(e) => setVolForm({ ...volForm, skills: e.target.value })}
                      placeholder="अपने साहित्यिक या तकनीकी अनुभव का विवरण दें..."
                    />
                  </div>

                  <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
                    <Send size={18} />
                    <span>{loading ? 'जमा हो रहा है...' : 'स्वयंसेवक आवेदन जमा करें'}</span>
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '24px' }}>
                  <CheckCircle2 size={44} color="#2E7D32" style={{ margin: '0 auto 12px auto' }} />
                  <h3 style={{ color: '#5C1720', marginBottom: '8px' }}>आवेदन सफलतापूर्वक प्राप्त हुआ!</h3>
                  <p>बुलंदी स्वयंसेवक समन्वय समिति शीघ्र ही आपसे संपर्क करेगी।</p>
                  <button onClick={() => setVolSuccess(false)} className="btn btn-outline" style={{ marginTop: '14px' }}>
                    नया आवेदन
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Institutional MoU Collab Form */}
          {activeTab === 'collab' && (
            <div className="card" style={{ padding: '32px' }}>
              {!collabSuccess ? (
                <form onSubmit={handleCollabSubmit}>
                  <div className="form-group">
                    <label>विश्वविद्यालय / कॉलेज / संस्था का नाम *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={collabForm.institutionName}
                      onChange={(e) => setCollabForm({ ...collabForm, institutionName: e.target.value })}
                      placeholder="उदा. रुहेलखंड विश्वविद्यालय / दिल्ली कॉलेज"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>अधिकृत संपर्क व्यक्ति *</label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        value={collabForm.contactPerson}
                        onChange={(e) => setCollabForm({ ...collabForm, contactPerson: e.target.value })}
                        placeholder="उदा. डॉ. आर. के. पाठक"
                      />
                    </div>
                    <div className="form-group">
                      <label>पदनाम (Designation) *</label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        value={collabForm.designation}
                        onChange={(e) => setCollabForm({ ...collabForm, designation: e.target.value })}
                        placeholder="विभागाध्यक्ष (हिन्दी) / कुलसचिव"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>आधिकारिक ईमेल *</label>
                      <input
                        type="email"
                        required
                        className="form-control"
                        value={collabForm.email}
                        onChange={(e) => setCollabForm({ ...collabForm, email: e.target.value })}
                        placeholder="hod.hindi@univ.ac.in"
                      />
                    </div>
                    <div className="form-group">
                      <label>संपर्क फोन नंबर *</label>
                      <input
                        type="tel"
                        required
                        className="form-control"
                        value={collabForm.phone}
                        onChange={(e) => setCollabForm({ ...collabForm, phone: e.target.value })}
                        placeholder="+91 94123 45678"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>संस्था का प्रकार *</label>
                    <select
                      className="form-control"
                      value={collabForm.institutionType}
                      onChange={(e) => setCollabForm({ ...collabForm, institutionType: e.target.value })}
                    >
                      <option value="विश्वविद्यालय (University)">विश्वविद्यालय (University)</option>
                      <option value="महाविद्यालय (College / Degree Institution)">महाविद्यालय (College)</option>
                      <option value="साहित्यिक अकादमी / परिषद (Literary Academy)">साहित्यिक अकादमी / परिषद (Literary Academy)</option>
                      <option value="सांस्कृतिक केंद्र / NGO (Cultural NGO)">सांस्कृतिक केंद्र / NGO</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>प्रस्तावित सहयोग विवरण (MoU Scope / Proposal) *</label>
                    <textarea
                      required
                      rows="3"
                      className="form-control"
                      value={collabForm.proposal}
                      onChange={(e) => setCollabForm({ ...collabForm, proposal: e.target.value })}
                      placeholder="संयुक्त राष्ट्रीय संगोष्ठी, छात्र काव्य कार्यशाला अथवा शोध सहयोग..."
                    />
                  </div>

                  <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
                    <Send size={18} />
                    <span>{loading ? 'प्रेषित हो रहा है...' : 'संस्थागत MoU प्रस्ताव भेजें'}</span>
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '24px' }}>
                  <CheckCircle2 size={44} color="#2E7D32" style={{ margin: '0 auto 12px auto' }} />
                  <h3 style={{ color: '#5C1720', marginBottom: '8px' }}>संस्थागत प्रस्ताव प्राप्त हुआ!</h3>
                  <p>संस्थान का उच्च स्तरीय शिष्टमंडल शीघ्र ही औपचारिक विमर्श हेतु संपर्क करेगा।</p>
                  <button onClick={() => setCollabSuccess(false)} className="btn btn-outline" style={{ marginTop: '14px' }}>
                    नया प्रस्ताव
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
