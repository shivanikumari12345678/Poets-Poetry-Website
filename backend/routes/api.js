const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const PoemSubmission = require('../models/PoemSubmission');
const SundaySession = require('../models/SundaySession');
const Membership = require('../models/Membership');
const Donation = require('../models/Donation');
const Event = require('../models/Event');
const { Volunteer, Collaboration, Contact } = require('../models/Forms');

// In-Memory store fallback in case MongoDB is temporarily starting or offline
const memoryStore = {
  poems: [
    {
      _id: 'mem_p1',
      trackingId: 'BLD-POEM-2026-8812',
      title: 'माटी की सुगंध',
      poetName: 'डॉ. रमेश चंद्र शर्मा',
      email: 'rc.sharma@example.com',
      phone: '+91 98765 43210',
      city: 'वाराणसी (Varanasi)',
      language: 'Hindi',
      genre: 'Kavita',
      content: 'जब जब माटी की सौंधी खुशबू महकती है,\nमन की वीणा पर कोई मधुर तान बजती है।\nगंगा के पावन तट पर भोर की जो लाली है,\nवही मेरी कविता की अमर प्याली है।',
      status: 'approved',
      createdAt: new Date(),
    },
    {
      _id: 'mem_p2',
      trackingId: 'BLD-POEM-2026-8813',
      title: 'अल्फ़ाज़ और अहसास',
      poetName: 'शबाना आज़मी रिज़वी',
      email: 'shabana.rizvi@example.com',
      phone: '+91 98111 22334',
      city: 'लखनऊ (Lucknow)',
      language: 'Urdu / Hindi',
      genre: 'Ghazal',
      content: 'चराग़-ए-शाम जलाना सिखा दिया उसने,\nहुनर ख़ामोश दिलों का बता दिया उसने।\nसफ़र में धूप बहुत थी मगर वो साया था,\nजो हर क़दम पे हौसला बढ़ा दिया उसने।',
      status: 'shortlisted',
      createdAt: new Date(),
    },
    {
      _id: 'mem_p3',
      trackingId: 'BLD-POEM-2026-8814',
      title: 'वंदे मातरम् की गूंज',
      poetName: 'प्रणव कुमार त्रिपाठी',
      email: 'pranav.k@example.com',
      phone: '+91 97654 32109',
      city: 'प्रयागराज (Prayagraj)',
      language: 'Hindi',
      genre: 'Rashtriya Kavya',
      content: 'सिंधु से लेकर हिमालय तक जो ध्वज फहराता है,\nहर कण में बलिदानों का अमर इतिहास समाता है।',
      status: 'pending',
      createdAt: new Date(),
    }
  ],
  sessions: [
    {
      _id: 'mem_s1',
      regId: 'BLD-SUN-4091',
      sessionNumber: '249th International Sunday E-Goshthi',
      name: 'आचार्य विद्याधर मिश्र',
      email: 'vidyadhar@example.com',
      phone: '+91 99887 76655',
      country: 'India',
      participantRole: 'poet',
      poemTitle: 'ऋतुराज का आह्वान',
      zoomLink: 'https://us02web.zoom.us/j/82947192015?pwd=BulandiSahityaLive2026',
      createdAt: new Date(),
    },
    {
      _id: 'mem_s2',
      regId: 'BLD-SUN-4092',
      sessionNumber: '249th International Sunday E-Goshthi',
      name: 'सुमन लता वर्मा',
      email: 'suman.verma@example.com',
      phone: '+91 94567 89012',
      country: 'United Kingdom',
      participantRole: 'listener',
      poemTitle: '',
      zoomLink: 'https://us02web.zoom.us/j/82947192015?pwd=BulandiSahityaLive2026',
      createdAt: new Date(),
    }
  ],
  members: [
    {
      _id: 'mem_m1',
      memberId: 'BLD-MEM-1044',
      name: 'राजेंद्र नाथ त्रिपाठी',
      email: 'rajendra.nath@example.com',
      phone: '+91 98200 11223',
      city: 'नई दिल्ली (New Delhi)',
      plan: 'संरक्षक सदस्य (₹5,000/आजीवन)',
      amount: 5000,
      paymentStatus: 'completed',
      transactionId: 'TXN-BULANDI-892104',
      createdAt: new Date(),
    },
    {
      _id: 'mem_m2',
      memberId: 'BLD-MEM-1045',
      name: 'डॉ. मीनाक्षी चतुर्वेदी',
      email: 'meenakshi.c@example.com',
      phone: '+91 91234 56789',
      city: 'जयपुर (Jaipur)',
      plan: 'विशेष सदस्य (₹1,500/वर्ष)',
      amount: 1500,
      paymentStatus: 'completed',
      transactionId: 'TXN-BULANDI-771239',
      createdAt: new Date(),
    }
  ],
  donations: [
    {
      _id: 'mem_d1',
      receiptId: 'BLD-DON-9012',
      donorName: 'कवि कुमार गौरव',
      email: 'kavi.kg@example.com',
      phone: '+91 98711 34567',
      amount: 2100,
      cause: 'Weekly Technical Broadcasting',
      panNumber: 'ABCDE1234F',
      transactionId: 'TXN-DON-445891',
      createdAt: new Date(),
    }
  ],
  events: [
    {
      _id: 'ev_1',
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
      _id: 'ev_2',
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
      _id: 'ev_3',
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
    }
  ],
  volunteers: [],
  collaborations: [],
  contacts: [],
};

const isMongooseReady = () => mongoose.connection.readyState === 1;

// 1. Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Bulandi Sahitya Sansthan API',
    database: isMongooseReady() ? 'MongoDB Connected' : 'Resilient In-Memory Mode',
    timestamp: new Date().toISOString(),
  });
});

// 2. Events List
router.get('/events', async (req, res) => {
  try {
    if (isMongooseReady()) {
      const count = await Event.countDocuments();
      if (count === 0) {
        await Event.insertMany(memoryStore.events);
      }
      const events = await Event.find().sort({ createdAt: -1 });
      return res.json({ success: true, data: events });
    }
    res.json({ success: true, data: memoryStore.events });
  } catch (err) {
    res.json({ success: true, data: memoryStore.events });
  }
});

// 3. Poem Submissions
router.get('/poems', async (req, res) => {
  try {
    if (isMongooseReady()) {
      const poems = await PoemSubmission.find().sort({ createdAt: -1 });
      return res.json({ success: true, data: poems });
    }
    res.json({ success: true, data: memoryStore.poems });
  } catch (err) {
    res.json({ success: true, data: memoryStore.poems });
  }
});

router.post('/poems', async (req, res) => {
  try {
    const { title, poetName, email, phone, city, language, genre, content } = req.body;
    if (!title || !poetName || !email || !content) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingId = `BLD-POEM-2026-${randomSuffix}`;

    const newPoem = {
      trackingId,
      title,
      poetName,
      email,
      phone: phone || '',
      city: city || 'Unspecified',
      language: language || 'Hindi',
      genre: genre || 'Kavita',
      content,
      status: 'pending',
      createdAt: new Date(),
    };

    if (isMongooseReady()) {
      const saved = await PoemSubmission.create(newPoem);
      return res.status(201).json({ success: true, data: saved });
    }

    newPoem._id = 'mem_p_' + Date.now();
    memoryStore.poems.unshift(newPoem);
    res.status(201).json({ success: true, data: newPoem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update poem status (Approved, Shortlisted, Rejected) by Admin
router.patch('/poems/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'approved', 'shortlisted', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value.' });
    }

    if (isMongooseReady() && mongoose.Types.ObjectId.isValid(id)) {
      const updated = await PoemSubmission.findByIdAndUpdate(id, { status }, { new: true });
      if (updated) return res.json({ success: true, data: updated });
    }

    // fallback memory check
    const poem = memoryStore.poems.find((p) => p._id.toString() === id.toString() || p.trackingId === id);
    if (poem) {
      poem.status = status;
      return res.json({ success: true, data: poem });
    }

    res.status(404).json({ success: false, message: 'Poem submission not found.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 4. Sunday Session Registration
router.get('/sunday-sessions', async (req, res) => {
  try {
    if (isMongooseReady()) {
      const sessions = await SundaySession.find().sort({ createdAt: -1 });
      return res.json({ success: true, data: sessions });
    }
    res.json({ success: true, data: memoryStore.sessions });
  } catch (err) {
    res.json({ success: true, data: memoryStore.sessions });
  }
});

router.post('/sunday-sessions', async (req, res) => {
  try {
    const { name, email, phone, country, participantRole, poemTitle } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Name, email, and phone are required.' });
    }

    const regId = `BLD-SUN-${Math.floor(1000 + Math.random() * 9000)}`;
    const sessionDoc = {
      regId,
      sessionNumber: '249th International Sunday E-Goshthi',
      name,
      email,
      phone,
      country: country || 'India',
      participantRole: participantRole || 'listener',
      poemTitle: poemTitle || '',
      zoomLink: 'https://us02web.zoom.us/j/82947192015?pwd=BulandiSahityaLive2026',
      createdAt: new Date(),
    };

    if (isMongooseReady()) {
      const saved = await SundaySession.create(sessionDoc);
      return res.status(201).json({ success: true, data: saved });
    }

    sessionDoc._id = 'mem_s_' + Date.now();
    memoryStore.sessions.unshift(sessionDoc);
    res.status(201).json({ success: true, data: sessionDoc });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 5. Memberships
router.get('/memberships', async (req, res) => {
  try {
    if (isMongooseReady()) {
      const members = await Membership.find().sort({ createdAt: -1 });
      return res.json({ success: true, data: members });
    }
    res.json({ success: true, data: memoryStore.members });
  } catch (err) {
    res.json({ success: true, data: memoryStore.members });
  }
});

router.post('/memberships', async (req, res) => {
  try {
    const { name, email, phone, city, plan, amount } = req.body;
    if (!name || !email || !phone || !plan) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const memberId = `BLD-MEM-${Math.floor(1000 + Math.random() * 9000)}`;
    const transactionId = `TXN-BULANDI-${Math.floor(100000 + Math.random() * 900000)}`;

    const memberDoc = {
      memberId,
      name,
      email,
      phone,
      city: city || 'India',
      plan,
      amount: Number(amount) || 500,
      paymentStatus: 'completed',
      transactionId,
      createdAt: new Date(),
    };

    if (isMongooseReady()) {
      const saved = await Membership.create(memberDoc);
      return res.status(201).json({ success: true, data: saved });
    }

    memberDoc._id = 'mem_m_' + Date.now();
    memoryStore.members.unshift(memberDoc);
    res.status(201).json({ success: true, data: memberDoc });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 6. Donations
router.get('/donations', async (req, res) => {
  try {
    if (isMongooseReady()) {
      const list = await Donation.find().sort({ createdAt: -1 });
      return res.json({ success: true, data: list });
    }
    res.json({ success: true, data: memoryStore.donations });
  } catch (err) {
    res.json({ success: true, data: memoryStore.donations });
  }
});

router.post('/donations', async (req, res) => {
  try {
    const { donorName, email, phone, amount, cause, panNumber } = req.body;
    if (!donorName || !email || !amount) {
      return res.status(400).json({ success: false, message: 'Name, email, and amount are required.' });
    }

    const receiptId = `BLD-DON-${Math.floor(1000 + Math.random() * 9000)}`;
    const transactionId = `TXN-DON-${Math.floor(100000 + Math.random() * 900000)}`;

    const donationDoc = {
      receiptId,
      donorName,
      email,
      phone: phone || '',
      amount: Number(amount),
      cause: cause || 'General Cultural Outreach',
      panNumber: panNumber || '',
      transactionId,
      createdAt: new Date(),
    };

    if (isMongooseReady()) {
      const saved = await Donation.create(donationDoc);
      return res.status(201).json({ success: true, data: saved });
    }

    donationDoc._id = 'mem_d_' + Date.now();
    memoryStore.donations.unshift(donationDoc);
    res.status(201).json({ success: true, data: donationDoc });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 7. Volunteer application
router.post('/volunteers', async (req, res) => {
  try {
    const { name, email, phone, city, role, skills } = req.body;
    if (!name || !email || !phone || !role) {
      return res.status(400).json({ success: false, message: 'Required fields missing.' });
    }
    const doc = { name, email, phone, city: city || '', role, skills: skills || '', createdAt: new Date() };
    if (isMongooseReady()) {
      const saved = await Volunteer.create(doc);
      return res.status(201).json({ success: true, data: saved });
    }
    doc._id = 'vol_' + Date.now();
    memoryStore.volunteers.push(doc);
    res.status(201).json({ success: true, data: doc });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 8. Collaboration request
router.post('/collaborations', async (req, res) => {
  try {
    const { institutionName, contactPerson, designation, email, phone, institutionType, proposal } = req.body;
    if (!institutionName || !contactPerson || !email) {
      return res.status(400).json({ success: false, message: 'Required fields missing.' });
    }
    const doc = { institutionName, contactPerson, designation: designation || '', email, phone: phone || '', institutionType: institutionType || 'University', proposal: proposal || '', createdAt: new Date() };
    if (isMongooseReady()) {
      const saved = await Collaboration.create(doc);
      return res.status(201).json({ success: true, data: saved });
    }
    doc._id = 'collab_' + Date.now();
    memoryStore.collaborations.push(doc);
    res.status(201).json({ success: true, data: doc });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 9. Contact inquiry
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }
    const doc = { name, email, phone: phone || '', subject: subject || 'General Query', message, createdAt: new Date() };
    if (isMongooseReady()) {
      const saved = await Contact.create(doc);
      return res.status(201).json({ success: true, data: saved });
    }
    doc._id = 'cnt_' + Date.now();
    memoryStore.contacts.push(doc);
    res.status(201).json({ success: true, data: doc });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 10. Admin Dashboard Aggregate Stats
router.get('/admin/stats', async (req, res) => {
  try {
    if (isMongooseReady()) {
      const [poemsCount, approvedPoems, sessionsCount, membersCount, donations] = await Promise.all([
        PoemSubmission.countDocuments(),
        PoemSubmission.countDocuments({ status: 'approved' }),
        SundaySession.countDocuments(),
        Membership.countDocuments(),
        Donation.find({}, 'amount'),
      ]);
      const totalDonations = donations.reduce((sum, d) => sum + (d.amount || 0), 0);
      return res.json({
        success: true,
        stats: {
          totalPoems: poemsCount,
          approvedPoems,
          sundayAttendees: sessionsCount,
          activeMembers: membersCount,
          totalDonationsCollected: totalDonations,
        },
      });
    }

    const totalDonations = memoryStore.donations.reduce((sum, d) => sum + (d.amount || 0), 0);
    res.json({
      success: true,
      stats: {
        totalPoems: memoryStore.poems.length,
        approvedPoems: memoryStore.poems.filter((p) => p.status === 'approved').length,
        sundayAttendees: memoryStore.sessions.length,
        activeMembers: memoryStore.members.length,
        totalDonationsCollected: totalDonations,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
