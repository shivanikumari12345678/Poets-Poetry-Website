import React, { useState, useEffect } from 'react';
import { Shield, BookOpen, Users, Award, Heart, Check, Star, Clock, RefreshCw } from 'lucide-react';

export default function AdminReviewModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('poems');
  const [poems, setPoems] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [members, setMembers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedPoemId, setExpandedPoemId] = useState(null);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [resPoems, resSessions, resMembers, resDonations, resStats] = await Promise.all([
        fetch('/api/poems').then((r) => r.json()),
        fetch('/api/sunday-sessions').then((r) => r.json()),
        fetch('/api/memberships').then((r) => r.json()),
        fetch('/api/donations').then((r) => r.json()),
        fetch('/api/admin/stats').then((r) => r.json()),
      ]);

      if (resPoems.success) setPoems(resPoems.data);
      if (resSessions.success) setSessions(resSessions.data);
      if (resMembers.success) setMembers(resMembers.data);
      if (resDonations.success) setDonations(resDonations.data);
      if (resStats.success) setStats(resStats.stats);
    } catch (err) {
      console.warn('Admin fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAdminData();
    }
  }, [isOpen]);

  const handleUpdateStatus = async (poemId, newStatus) => {
    try {
      const res = await fetch(`/api/poems/${poemId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setPoems((prev) =>
          prev.map((p) => (p._id === poemId || p.trackingId === poemId ? { ...p, status: newStatus } : p))
        );
      }
    } catch (err) {
      console.error('Update status error:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container large-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '1050px' }}>
        {/* Header */}
        <div className="modal-header" style={{ background: '#5C1720', color: '#FFFDF8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield size={24} color="#D69A2D" />
            <div>
              <h3 style={{ color: '#FFFDF8', margin: 0, fontSize: '1.25rem' }}>
                बुलंदी प्रशासक नियंत्रण कक्ष (MERN Admin CMS Portal)
              </h3>
              <div style={{ fontSize: '0.78rem', color: '#F7D070' }}>
                Official Content Review, Moderation & Live Database Controller
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={fetchAdminData}
              title="Refresh Data"
              style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#FFF', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}
            >
              <RefreshCw size={14} className={loading ? 'spin' : ''} />
              <span>ताज़ा करें</span>
            </button>
            <button className="modal-close-btn" onClick={onClose} style={{ color: '#FFF' }}>✕</button>
          </div>
        </div>

        <div className="modal-body" style={{ background: '#FDF9F0' }}>
          {/* KPI Dashboard Stats Cards */}
          {stats && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
              marginBottom: '24px',
            }}>
              <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '8px', border: '1px solid #E4DCCF', borderLeft: '4px solid #7A1F2B' }}>
                <div style={{ fontSize: '0.8rem', color: '#6B625A' }}>कुल प्राप्त कविताएं</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#7A1F2B' }}>{stats.totalPoems}</div>
              </div>
              <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '8px', border: '1px solid #E4DCCF', borderLeft: '4px solid #2E7D32' }}>
                <div style={{ fontSize: '0.8rem', color: '#6B625A' }}>स्वीकृत रचनाएं</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2E7D32' }}>{stats.approvedPoems}</div>
              </div>
              <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '8px', border: '1px solid #E4DCCF', borderLeft: '4px solid #D69A2D' }}>
                <div style={{ fontSize: '0.8rem', color: '#6B625A' }}>रविवार गोष्ठी श्रोता</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#A87516' }}>{stats.sundayAttendees}</div>
              </div>
              <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '8px', border: '1px solid #E4DCCF', borderLeft: '4px solid #1565C0' }}>
                <div style={{ fontSize: '0.8rem', color: '#6B625A' }}>सक्रिय सदस्य</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1565C0' }}>{stats.activeMembers}</div>
              </div>
              <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '8px', border: '1px solid #E4DCCF', borderLeft: '4px solid #7A1F2B' }}>
                <div style={{ fontSize: '0.8rem', color: '#6B625A' }}>कुल सहयोग राशि</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#7A1F2B' }}>₹{stats.totalDonationsCollected}</div>
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #E4DCCF', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
            <button
              onClick={() => setActiveTab('poems')}
              className={activeTab === 'poems' ? 'btn btn-primary' : 'btn btn-outline'}
              style={{ padding: '8px 16px', fontSize: '0.88rem' }}
            >
              <BookOpen size={16} />
              <span>रचना समीक्षा मंडल ({poems.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('sessions')}
              className={activeTab === 'sessions' ? 'btn btn-primary' : 'btn btn-outline'}
              style={{ padding: '8px 16px', fontSize: '0.88rem' }}
            >
              <Users size={16} />
              <span>रविवार गोष्ठी रजिस्टर ({sessions.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={activeTab === 'members' ? 'btn btn-primary' : 'btn btn-outline'}
              style={{ padding: '8px 16px', fontSize: '0.88rem' }}
            >
              <Award size={16} />
              <span>सदस्यता पंजिका ({members.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('donations')}
              className={activeTab === 'donations' ? 'btn btn-primary' : 'btn btn-outline'}
              style={{ padding: '8px 16px', fontSize: '0.88rem' }}
            >
              <Heart size={16} />
              <span>सहयोग खाता ({donations.length})</span>
            </button>
          </div>

          {/* Tab 1: Poems Moderation */}
          {activeTab === 'poems' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h4 style={{ color: '#5C1720', fontSize: '1.15rem' }}>प्राप्त रचनाओं की संपादकीय समीक्षा सूची</h4>
                <span style={{ fontSize: '0.82rem', color: '#6B625A' }}>स्वीकृति / गोष्ठी चयन लाइव डेटाबेस में तुरंत अपडेट होता है</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {poems.map((poem) => (
                  <div key={poem._id} style={{ background: '#FFFFFF', border: '1px solid #E4DCCF', borderRadius: '8px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontWeight: 800, fontSize: '1.15rem', color: '#7A1F2B' }}>{poem.title}</span>
                          <span style={{ fontFamily: 'monospace', fontSize: '0.78rem', background: '#F7F1E6', padding: '2px 8px', borderRadius: '4px', color: '#6B625A' }}>
                            {poem.trackingId}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.88rem', color: '#6B625A', marginTop: '4px' }}>
                          रचनाकार: <strong>{poem.poetName}</strong> ({poem.city}) | भाषा: {poem.language} | विधा: {poem.genre}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#8E847B', marginTop: '2px' }}>
                          संपर्क: {poem.email} {poem.phone ? `| ${poem.phone}` : ''}
                        </div>
                      </div>

                      {/* Status Badges & Action Buttons */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '999px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          background:
                            poem.status === 'approved' ? '#E8F5E9' :
                            poem.status === 'shortlisted' ? '#FFF8E1' : '#F5F5F5',
                          color:
                            poem.status === 'approved' ? '#2E7D32' :
                            poem.status === 'shortlisted' ? '#F57F17' : '#616161',
                          border: `1px solid ${
                            poem.status === 'approved' ? '#A5D6A7' :
                            poem.status === 'shortlisted' ? '#FFE082' : '#E0E0E0'
                          }`,
                        }}>
                          {poem.status === 'approved' ? '✓ स्वीकृत' : poem.status === 'shortlisted' ? '⭐ गोष्ठी चयनित' : '⏳ प्रतीक्षारत'}
                        </span>

                        <button
                          onClick={() => handleUpdateStatus(poem._id, 'approved')}
                          className="btn"
                          style={{ padding: '4px 10px', fontSize: '0.78rem', background: '#2E7D32', color: '#FFF' }}
                        >
                          स्वीकृत
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(poem._id, 'shortlisted')}
                          className="btn"
                          style={{ padding: '4px 10px', fontSize: '0.78rem', background: '#D69A2D', color: '#292522' }}
                        >
                          गोष्ठी चयनित
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(poem._id, 'pending')}
                          className="btn btn-outline"
                          style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                        >
                          प्रतीक्षारत
                        </button>
                      </div>
                    </div>

                    {/* Expand/Collapse Poem Content */}
                    <div style={{ marginTop: '12px', borderTop: '1px dashed #E4DCCF', paddingTop: '10px' }}>
                      <button
                        onClick={() => setExpandedPoemId(expandedPoemId === poem._id ? null : poem._id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7A1F2B', fontSize: '0.85rem', fontWeight: 600, padding: 0 }}
                      >
                        {expandedPoemId === poem._id ? '▲ पंक्तियां छिपाएं' : '▼ संपूर्ण कविता पंक्तियां पढ़ें'}
                      </button>

                      {expandedPoemId === poem._id && (
                        <div style={{
                          background: '#FFFDF8',
                          padding: '14px',
                          borderRadius: '6px',
                          marginTop: '8px',
                          fontFamily: "'Noto Serif Devanagari', serif",
                          fontSize: '0.98rem',
                          lineHeight: '1.9',
                          whiteSpace: 'pre-line',
                          border: '1px solid #E4DCCF',
                        }}>
                          {poem.content}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Sunday Session Attendees */}
          {activeTab === 'sessions' && (
            <div style={{ background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E4DCCF', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#F7F1E6', borderBottom: '2px solid #E4DCCF', textAlign: 'left' }}>
                    <th style={{ padding: '12px' }}>प्रवेश पास ID</th>
                    <th style={{ padding: '12px' }}>सहभागी का नाम</th>
                    <th style={{ padding: '12px' }}>संपर्क विवरण</th>
                    <th style={{ padding: '12px' }}>देश / राज्य</th>
                    <th style={{ padding: '12px' }}>श्रेणी</th>
                    <th style={{ padding: '12px' }}>कविता शीर्षक</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((sess) => (
                    <tr key={sess._id} style={{ borderBottom: '1px solid #E4DCCF' }}>
                      <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 700, color: '#7A1F2B' }}>{sess.regId}</td>
                      <td style={{ padding: '12px', fontWeight: 600 }}>{sess.name}</td>
                      <td style={{ padding: '12px', color: '#6B625A' }}>{sess.email}<br />{sess.phone}</td>
                      <td style={{ padding: '12px' }}>{sess.country}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '0.78rem',
                          background: sess.participantRole === 'poet' ? '#FFF8E1' : '#E8F5E9',
                          color: sess.participantRole === 'poet' ? '#A87516' : '#2E7D32',
                          fontWeight: 700,
                        }}>
                          {sess.participantRole === 'poet' ? 'कवि' : 'श्रोता'}
                        </span>
                      </td>
                      <td style={{ padding: '12px', fontStyle: 'italic' }}>{sess.poemTitle || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab 3: Members Directory */}
          {activeTab === 'members' && (
            <div style={{ background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E4DCCF', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#F7F1E6', borderBottom: '2px solid #E4DCCF', textAlign: 'left' }}>
                    <th style={{ padding: '12px' }}>सदस्यता ID</th>
                    <th style={{ padding: '12px' }}>नाम</th>
                    <th style={{ padding: '12px' }}>शहर</th>
                    <th style={{ padding: '12px' }}>सदस्यता योजना</th>
                    <th style={{ padding: '12px' }}>राशि</th>
                    <th style={{ padding: '12px' }}>लेन-देन ID</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((mem) => (
                    <tr key={mem._id} style={{ borderBottom: '1px solid #E4DCCF' }}>
                      <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 700, color: '#7A1F2B' }}>{mem.memberId}</td>
                      <td style={{ padding: '12px', fontWeight: 600 }}>{mem.name}</td>
                      <td style={{ padding: '12px' }}>{mem.city}</td>
                      <td style={{ padding: '12px', color: '#5C1720', fontWeight: 600 }}>{mem.plan}</td>
                      <td style={{ padding: '12px', fontWeight: 700, color: '#2E7D32' }}>₹{mem.amount}</td>
                      <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: '0.8rem', color: '#6B625A' }}>{mem.transactionId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab 4: Donations Ledger */}
          {activeTab === 'donations' && (
            <div style={{ background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E4DCCF', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#F7F1E6', borderBottom: '2px solid #E4DCCF', textAlign: 'left' }}>
                    <th style={{ padding: '12px' }}>रसीद क्रमांक</th>
                    <th style={{ padding: '12px' }}>सहयोगकर्ता</th>
                    <th style={{ padding: '12px' }}>सहयोग राशि</th>
                    <th style={{ padding: '12px' }}>उद्देश्य</th>
                    <th style={{ padding: '12px' }}>PAN नंबर</th>
                    <th style={{ padding: '12px' }}>लेन-देन ID</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((don) => (
                    <tr key={don._id} style={{ borderBottom: '1px solid #E4DCCF' }}>
                      <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 700, color: '#7A1F2B' }}>{don.receiptId}</td>
                      <td style={{ padding: '12px', fontWeight: 600 }}>{don.donorName}</td>
                      <td style={{ padding: '12px', fontWeight: 800, color: '#2E7D32' }}>₹{don.amount}</td>
                      <td style={{ padding: '12px' }}>{don.cause}</td>
                      <td style={{ padding: '12px', fontFamily: 'monospace' }}>{don.panNumber || '—'}</td>
                      <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: '0.8rem', color: '#6B625A' }}>{don.transactionId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
