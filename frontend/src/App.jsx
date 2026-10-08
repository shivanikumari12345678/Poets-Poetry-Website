import React, { useState, useEffect } from 'react';
import { translations } from './translations';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SundayGoshthi from './components/SundayGoshthi';
import AboutSection from './components/AboutSection';
import WorldRecords from './components/WorldRecords';
import EventsSection from './components/EventsSection';
import PoemSubmissionSection from './components/PoemSubmissionSection';
import MembershipSection from './components/MembershipSection';
import PoetryRecital from './components/PoetryRecital';
import DonationsSection from './components/DonationsSection';
import GallerySection from './components/GallerySection';
import FAQAccordion from './components/FAQAccordion';
import VolunteerCollab from './components/VolunteerCollab';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminReviewModal from './components/AdminReviewModal';
import { Calendar, Ticket, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('bulandi_lang') || 'hi';
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isGoshthiModalOpen, setIsGoshthiModalOpen] = useState(false);
  const [registerEvent, setRegisterEvent] = useState(null);
  const [eventRegSuccess, setEventRegSuccess] = useState(false);
  const [eventForm, setEventForm] = useState({ name: '', email: '', phone: '', city: '' });

  useEffect(() => {
    localStorage.setItem('bulandi_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang] || translations.hi;

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    setEventRegSuccess(true);
  };

  return (
    <div className="bulandi-app">
      {/* Sticky Navigation */}
      <Navbar
        lang={lang}
        setLang={setLang}
        t={t}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenSubmit={() => scrollToSection('submit')}
        onOpenDonate={() => scrollToSection('donations')}
      />

      {/* Hero Section */}
      <Hero
        t={t}
        onOpenSubmit={() => scrollToSection('submit')}
        onOpenGoshthiPass={() => setIsGoshthiModalOpen(true)}
      />

      {/* Sunday Online E-Goshthi Spotlight */}
      <SundayGoshthi
        t={t}
        isModalOpen={isGoshthiModalOpen}
        setIsModalOpen={setIsGoshthiModalOpen}
      />

      {/* About Us & Vision */}
      <AboutSection t={t} />

      {/* World Records Showcase */}
      <WorldRecords t={t} />

      {/* Programs, Offline Conclaves & Competitions */}
      <EventsSection
        t={t}
        lang={lang}
        onRegisterEvent={(evt) => {
          setRegisterEvent(evt);
          setEventRegSuccess(false);
        }}
      />

      {/* Poem Submission Portal */}
      <PoemSubmissionSection t={t} />

      {/* Annual & Lifetime Membership */}
      <MembershipSection t={t} />

      {/* Poetic Recital Classical Corner */}
      <PoetryRecital t={t} />

      {/* Cultural Support & Donations */}
      <DonationsSection t={t} />

      {/* Curated Media Gallery */}
      <GallerySection t={t} />

      {/* FAQ & Guidelines Accordion */}
      <FAQAccordion t={t} lang={lang} />

      {/* Volunteers & Institutional MoU */}
      <VolunteerCollab t={t} />

      {/* Headquarters Contact */}
      <ContactSection t={t} />

      {/* Footer */}
      <Footer t={t} onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Admin CMS Moderator Controller Modal */}
      <AdminReviewModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Quick Event Registration Modal */}
      {registerEvent && (
        <div className="modal-overlay" onClick={() => setRegisterEvent(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <Calendar color="#D69A2D" />
                <span>कार्यक्रम पंजीकरण (Event Registration)</span>
              </h3>
              <button className="modal-close-btn" onClick={() => setRegisterEvent(null)}>✕</button>
            </div>

            <div className="modal-body">
              {!eventRegSuccess ? (
                <form onSubmit={handleEventSubmit}>
                  <div style={{ background: '#F7F1E6', padding: '12px', borderRadius: '6px', marginBottom: '16px' }}>
                    <div style={{ fontWeight: 700, color: '#7A1F2B' }}>
                      {lang === 'hi' ? registerEvent.titleHi || registerEvent.title : registerEvent.title}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#6B625A' }}>
                      {lang === 'hi' ? registerEvent.venueHi || registerEvent.venue : registerEvent.venue} | {registerEvent.date}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>पूरा नाम *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={eventForm.name}
                      onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>ईमेल *</label>
                      <input
                        type="email"
                        required
                        className="form-control"
                        value={eventForm.email}
                        onChange={(e) => setEventForm({ ...eventForm, email: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>मोबाइल नंबर *</label>
                      <input
                        type="tel"
                        required
                        className="form-control"
                        value={eventForm.phone}
                        onChange={(e) => setEventForm({ ...eventForm, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>शहर / राज्य *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={eventForm.city}
                      onChange={(e) => setEventForm({ ...eventForm, city: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
                    पंजीकरण सुनिश्चित करें
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <CheckCircle2 size={44} color="#2E7D32" style={{ margin: '0 auto 12px auto' }} />
                  <h3 style={{ color: '#5C1720', marginBottom: '8px' }}>पंजीकरण सफल!</h3>
                  <p style={{ color: '#4A423D' }}>
                    {registerEvent.title} हेतु आपका स्थान सुरक्षित कर लिया गया है। विवरण आपके ईमेल पर प्रेषित कर दिया गया है।
                  </p>
                  <button onClick={() => setRegisterEvent(null)} className="btn btn-outline" style={{ marginTop: '16px' }}>
                    सम्पन्न
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
