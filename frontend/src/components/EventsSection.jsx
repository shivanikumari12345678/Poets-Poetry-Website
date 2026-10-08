import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Tag, ArrowRight, Video } from 'lucide-react';

export default function EventsSection({ t, lang, onRegisterEvent }) {
  const [filter, setFilter] = useState('all');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setEvents(data.data);
        }
      })
      .catch((err) => {
        console.warn('Events API unavailable, using fallback:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const fallbackEvents = [
    {
      _id: '1',
      title: '249th International Sunday Online E-Goshthi',
      titleHi: '249वीं अंतर्राष्ट्रीय रविवार ई-गोष्ठी',
      category: 'online',
      date: 'Next Sunday, 04:00 PM IST',
      venue: 'Global Zoom Platform & YouTube Live',
      venueHi: 'वैश्विक ज़ूम मंच व यूट्यूब लाइव',
      description: 'Weekly flagship poetry symposium featuring distinguished poets from India and 45+ overseas nations.',
      descriptionHi: 'प्रति सप्ताह आयोजित होने वाली प्रतिष्ठापूर्ण काव्य गोष्ठी, जिसमें देश-विदेश के कवि भाग लेते हैं।',
      badge: 'Flagship Weekly',
      badgeHi: 'साप्ताहिक गौरव',
      isOpen: true,
    },
    {
      _id: '2',
      title: 'All India Kavi Sammelan 2026 (Grand Auditorium)',
      titleHi: 'अखिल भारतीय कवि सम्मेलन 2026 (भव्य सभागार)',
      category: 'offline',
      date: '15 November 2026, 05:30 PM',
      venue: 'Siri Fort Auditorium, New Delhi',
      venueHi: 'सिरी फोर्ट ऑडिटोरियम, नई दिल्ली',
      description: 'Grand physical convention celebrating Indian literary masters, youth voices, and cultural preservation.',
      descriptionHi: 'भारतीय भाषा कवियों, नवोदित रचनाकारों और राष्ट्रीय विभूतियों का महाकुंभ।',
      badge: 'Physical Gala',
      badgeHi: 'भव्य आयोजन',
      isOpen: true,
    },
    {
      _id: '3',
      title: 'National Youth Poetry Competition 2026',
      titleHi: 'राष्ट्रीय युवा काव्य सृजन प्रतियोगिता 2026',
      category: 'competition',
      date: 'Submissions Open till 30 Nov 2026',
      venue: 'Digital Evaluation & Certificate Award',
      venueHi: 'डिजिटल मूल्यांकन एवं प्रमाण पत्र वितरण',
      description: 'Open competition for young poets aged 15-35. Cash awards, memento, and feature in Bulandi Patrika.',
      descriptionHi: 'युवा रचनाकारों हेतु विशेष प्रतियोगिता। नकद पुरस्कार, स्मृति चिह्न एवं पत्रिका में प्रकाशन।',
      badge: 'Awards ₹51,000',
      badgeHi: 'पुरस्कार ₹51,000',
      isOpen: true,
    },
  ];

  const displayList = events.length > 0 ? events : fallbackEvents;
  const filteredList = filter === 'all' ? displayList : displayList.filter((e) => e.category === filter);

  return (
    <section id="events" className="section-padding" style={{ background: '#F7F1E6' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Calendar size={16} />
            <span>{t.events.tag}</span>
          </div>
          <h2>{t.events.title}</h2>
        </div>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '36px' }}>
          {[
            { id: 'all', label: t.events.filterAll },
            { id: 'online', label: t.events.filterOnline },
            { id: 'offline', label: t.events.filterOffline },
            { id: 'competition', label: t.events.filterComp },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={filter === tab.id ? 'btn btn-primary' : 'btn btn-outline'}
              style={{ padding: '8px 20px', fontSize: '0.92rem' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Event Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}>
          {filteredList.map((evt) => (
            <div key={evt._id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{
                    background: 'rgba(214,154,45,0.18)',
                    color: '#A87516',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    padding: '3px 10px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                  }}>
                    {lang === 'hi' ? evt.badgeHi || evt.badge : evt.badge}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: '#6B625A', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} />
                    {evt.date}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', color: '#5C1720', marginBottom: '10px' }}>
                  {lang === 'hi' ? evt.titleHi || evt.title : evt.title}
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6B625A', fontSize: '0.88rem', marginBottom: '14px' }}>
                  <MapPin size={16} color="#7A1F2B" />
                  <span>{lang === 'hi' ? evt.venueHi || evt.venue : evt.venue}</span>
                </div>

                <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: '#4A423D', marginBottom: '20px' }}>
                  {lang === 'hi' ? evt.descriptionHi || evt.description : evt.description}
                </p>
              </div>

              <button
                onClick={() => onRegisterEvent(evt)}
                className="btn btn-outline"
                style={{ width: '100%', justifyContent: 'space-between', padding: '10px 16px' }}
              >
                <span>{t.events.registerBtn}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
