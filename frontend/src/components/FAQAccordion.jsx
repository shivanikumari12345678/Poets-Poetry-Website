import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQAccordion({ t, lang }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      qHi: 'रविवार ई-गोष्ठी में भाग लेने की क्या प्रक्रिया और नियम हैं?',
      qEn: 'What is the procedure and guidelines to attend the Sunday E-Goshthi?',
      aHi: 'आप हमारी वेबसाइट के "रविवार ई-गोष्ठी" अनुभाग से निःशुल्क डिजिटल प्रवेश पास प्राप्त कर सकते हैं। गोष्ठी में भाग लेने के लिए आपको ज़ूम मीटिंग लिंक और समय प्रदान किया जाता है। रचना पाठ करने हेतु संपादकीय मंडल द्वारा रचना का पूर्व-चयन अनिवार्य है।',
      aEn: 'You can generate a complimentary digital pass from our Sunday E-Goshthi section. You will receive the Zoom credentials and timetable. For recitation slots, prior editorial review is required.',
    },
    {
      qHi: 'क्या रचना प्रेषित करने के बाद सर्वाधिकार (Copyright) कवि के पास सुरक्षित रहते हैं?',
      qEn: 'Does the poet retain full copyright after submitting their composition?',
      aHi: 'हाँ, रचनाकार के सर्वाधिकार 100% उसके पास ही सुरक्षित रहते हैं। बुलंदी साहित्य संस्थान रचना का उपयोग केवल रविवार गोष्ठी में पाठ, यूट्यूब प्रसारण तथा संस्थान के गैर-लाभकारी डिजिटल बुलेटिन में प्रकाशन हेतु करता है।',
      aEn: 'Yes, 100% of the copyright remains with the author. Bulandi utilizes submitted poems solely for virtual recitation, broadcasting, and non-commercial literary chronicles.',
    },
    {
      qHi: 'क्या प्रवासी भारतीय एवं विदेशी रचनाकार भी सहभागिता कर सकते हैं?',
      qEn: 'Can non-resident Indians (NRIs) and international participants take part?',
      aHi: 'निसंदेह! वर्तमान में अमेरिका, ब्रिटेन, कनाडा, यूएई, ऑस्ट्रेलिया, सिंगापुर आदि 45 से अधिक देशों के हिंदी व भारतीय भाषा प्रेमी नियमित रूप से प्रति रविवार गोष्ठी में सहभागिता करते हैं।',
      aEn: 'Absolutely! Poets and listeners from 45+ countries (USA, UK, Canada, UAE, Australia, etc.) actively participate every Sunday.',
    },
    {
      qHi: 'संस्थान की सदस्यता लेने से रचनाकार को क्या लाभ प्राप्त होते हैं?',
      qEn: 'What benefits do members receive upon joining Bulandi?',
      aHi: 'सदस्यों को वार्षिक डिजिटल पहचान पत्र, रविवार गोष्ठियों में प्राथमिकता, राष्ट्रीय सम्मेलनों में वीआईपी प्रवेश तथा बुलंदी के अंतरराष्ट्रीय नेटवर्क से सीधा जुड़ाव प्राप्त होता है।',
      aEn: 'Members receive official digital membership cards, guaranteed priority slots in weekly sessions, VIP invites to national conventions, and community networking.',
    },
    {
      qHi: 'क्या नवोदित कवियों और युवाओं के लिए कोई विशेष मार्गदर्शन उपलब्ध है?',
      qEn: 'Is there guidance and mentorship available for budding youth poets?',
      aHi: 'जी हाँ, बुलंदी का मुख्य ध्येय ही नए रचनाकारों को तराशना है। वरिष्ठ छंद-शास्त्रियों और प्राध्यापकों द्वारा नवोदित कवियों को मात्रा-गणना, बहर, और अभिव्यक्ति सुधार पर मार्गदर्शन दिया जाता है।',
      aEn: 'Yes, nurturing young poets is Bulandi’s core mission. Senior literati and prosody scholars provide poetic meter and recitation mentorship.',
    },
  ];

  return (
    <section id="faq" className="section-padding" style={{ background: '#FFFDF8', borderTop: '1px solid #E4DCCF' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        <div className="section-header">
          <div className="section-tag">
            <HelpCircle size={16} />
            <span>{t.faq.tag}</span>
          </div>
          <h2>{t.faq.title}</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  border: isOpen ? '1px solid #D69A2D' : '1px solid #E4DCCF',
                  borderRadius: '8px',
                  background: isOpen ? '#F7F1E6' : '#FFFFFF',
                  overflow: 'hidden',
                  transition: 'all 0.25s',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  style={{
                    width: '100%',
                    padding: '18px 22px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    color: isOpen ? '#7A1F2B' : '#292522',
                  }}
                >
                  <span>{lang === 'hi' ? faq.qHi : faq.qEn}</span>
                  {isOpen ? <ChevronUp size={20} color="#7A1F2B" /> : <ChevronDown size={20} color="#6B625A" />}
                </button>

                {isOpen && (
                  <div style={{ padding: '0 22px 20px 22px', fontSize: '0.96rem', lineHeight: 1.75, color: '#4A423D' }}>
                    {lang === 'hi' ? faq.aHi : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
