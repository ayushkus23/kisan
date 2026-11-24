import React, { useState, useEffect } from 'react';
import { Language, Booking } from '../types';
import { translations } from '../locales/translations';
import { initialFleetData } from '../data/initialData';
import { supabase, getSupabaseImageUrl } from '../lib/supabase';

interface OwnerPortalProps {
  lang: Language;
  onSwitchToFarmer: () => void;
  onLogout: () => void;
}

export const OwnerPortal: React.FC<OwnerPortalProps> = ({
  lang,
  onSwitchToFarmer,
  onLogout
}) => {
  const t = translations[lang];

  // Local state for bookings & tractors
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [onlineStatus, setOnlineStatus] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch or load initial mock bookings
  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.warn('Supabase fetch bookings warning:', error.message);
        } else if (data && data.length > 0) {
          setBookings(data as Booking[]);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Offline mode for owner bookings:', err);
      }

      // Local storage fallback + mock demo requests
      const local = JSON.parse(localStorage.getItem('farmer_bookings') || '[]');
      if (local.length > 0) {
        setBookings(local);
      } else {
        setBookings([
          {
            id: 'BK-9801',
            vehicle_id: 1,
            vehicle_name: lang === 'hi' ? 'धान 4WD मड-मास्टर ट्रैक्टर' : 'Paddy 4WD Mud-Master Tractor',
            farmer_name: 'रामेश्वर सिंह',
            farmer_phone: '9876543210',
            farmer_village: 'दौराला, मेरठ',
            booking_date: new Date().toISOString().split('T')[0],
            time_slot: 'morning',
            hours_needed: 4,
            fuel_option: 'included',
            estimated_cost: 2400,
            rate_applied: 600,
            status: 'pending'
          },
          {
            id: 'BK-9802',
            vehicle_id: 4,
            vehicle_name: lang === 'hi' ? 'हाई-टॉर्क हैवी ड्यूटी ट्रैक्टर' : 'High-Torque Heavy Duty Tractor',
            farmer_name: 'सुरेश कुमार',
            farmer_phone: '9897123456',
            farmer_village: 'मोहिउद्दीनपुर, मेरठ',
            booking_date: new Date().toISOString().split('T')[0],
            time_slot: 'noon',
            hours_needed: 3,
            fuel_option: 'farmer',
            estimated_cost: 1350,
            rate_applied: 450,
            status: 'accepted'
          }
        ]);
      }
      setIsLoading(false);
    };

    fetchBookings();
  }, [lang]);

  const handleUpdateStatus = (id: string | number | undefined, newStatus: 'accepted' | 'cancelled') => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status: newStatus } : b))
    );

    // Save to local storage
    try {
      const updated = bookings.map(b => (b.id === id ? { ...b, status: newStatus } : b));
      localStorage.setItem('farmer_bookings', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  };

  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const acceptedBookings = bookings.filter(b => b.status === 'accepted' || b.status === 'in_progress');
  const totalEarningsToday = acceptedBookings.reduce((sum, b) => sum + (b.estimated_cost || 0), 0);

  return (
    <div className="owner-portal-body" style={{ minHeight: '100vh', background: '#f4f8f2', paddingBottom: '40px' }}>
      {/* Owner Navbar */}
      <header className="owner-navbar" style={{ background: '#153922', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.5rem' }}>👨‍🌾</span>
          <div>
            <h3 style={{ margin: 0, color: '#ffffff', fontSize: '1.1rem', fontWeight: 800 }}>
              {t.ownerPortalHeading}
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#e8b931', fontWeight: 700 }}>
              {lang === 'hi' ? 'ट्रैक्टर मालिक व पार्टनर' : 'Machinery Partner'}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onSwitchToFarmer}
            style={{ minHeight: '48px', padding: '6px 14px', fontSize: '0.9rem', fontWeight: 700 }}
          >
            🌾 {lang === 'hi' ? 'किसान पोर्टल' : 'Farmer Portal'}
          </button>
          <button
            type="button"
            onClick={onLogout}
            style={{ minHeight: '48px', padding: '6px 12px', background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff', borderRadius: '8px', cursor: 'pointer' }}
          >
            🚪
          </button>
        </div>
      </header>

      <main className="main-content" style={{ marginTop: '20px' }}>
        {/* Availability Toggle & KPI Cards */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '24px' }}>
          {/* Status card */}
          <div style={{ background: '#ffffff', borderRadius: '14px', padding: '18px', border: '1.5px solid #dcfce7', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
              {lang === 'hi' ? 'मेरी उपलब्धता (Status)' : 'My Availability'}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
              <strong style={{ fontSize: '1.2rem', color: onlineStatus ? '#15803d' : '#991b1b' }}>
                {onlineStatus ? t.ownerStatusOnline : t.ownerStatusOffline}
              </strong>
              <button
                type="button"
                onClick={() => setOnlineStatus(!onlineStatus)}
                style={{
                  minHeight: '48px',
                  padding: '8px 16px',
                  borderRadius: '24px',
                  border: 'none',
                  background: onlineStatus ? '#22c55e' : '#cbd5e1',
                  color: '#ffffff',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {onlineStatus ? (lang === 'hi' ? 'चालू' : 'ON') : (lang === 'hi' ? 'बंद' : 'OFF')}
              </button>
            </div>
          </div>

          {/* Earnings card */}
          <div style={{ background: '#ffffff', borderRadius: '14px', padding: '18px', border: '1.5px solid #fef08a', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
              {t.ownerEarningsToday}
            </span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#163e24', marginTop: '6px' }}>
              ₹{totalEarningsToday}
            </div>
            <span style={{ fontSize: '0.8rem', color: '#15803d', fontWeight: 600 }}>
              {acceptedBookings.length} {lang === 'hi' ? 'स्वीकृत काम' : 'accepted trips'}
            </span>
          </div>

          {/* Requests count */}
          <div style={{ background: '#ffffff', borderRadius: '14px', padding: '18px', border: '1.5px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
              {t.ownerActiveBookings}
            </span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ca8a04', marginTop: '6px' }}>
              {pendingBookings.length}
            </div>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
              {lang === 'hi' ? 'तुरंत जवाब दें' : 'Awaiting confirmation'}
            </span>
          </div>
        </section>

        {/* 1. Pending Booking Requests */}
        <section style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '1.25rem', color: '#163e24', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🔔</span>
            <span>{t.ownerActiveBookings} ({pendingBookings.length})</span>
          </h3>

          {pendingBookings.length === 0 ? (
            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', textAlign: 'center', color: '#64748b' }}>
              ✓ {lang === 'hi' ? 'अभी कोई नया पेंडिंग अनुरोध नहीं है।' : 'No pending booking requests right now.'}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px' }}>
              {pendingBookings.map((b, idx) => (
                <div key={b.id || idx} style={{ background: '#ffffff', border: '2px solid #fed7aa', borderRadius: '14px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <span style={{ background: '#ffedd5', color: '#9a3412', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                        {t.statusPending}
                      </span>
                      <h4 style={{ margin: '6px 0 2px', fontSize: '1.15rem', color: '#163e24' }}>
                        {b.farmer_name} • {b.farmer_village}
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>
                        🚜 {b.vehicle_name} • 📅 {b.booking_date} ({b.time_slot}) • ⏱️ {b.hours_needed}h
                      </p>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#15803d' }}>
                        ₹{b.estimated_cost}
                      </div>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        {b.fuel_option === 'included' ? t.fuelIncludedTag : t.farmerFuelTag}
                      </span>
                    </div>
                  </div>

                  {/* Actions: Accept or Decline (>= 48px tap target) */}
                  <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(b.id, 'accepted')}
                      style={{
                        flex: 1,
                        minHeight: '48px',
                        borderRadius: '10px',
                        border: 'none',
                        background: '#22c55e',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '1rem',
                        cursor: 'pointer'
                      }}
                    >
                      ✓ {t.ownerBtnAccept}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(b.id, 'cancelled')}
                      style={{
                        minHeight: '48px',
                        padding: '0 16px',
                        borderRadius: '10px',
                        border: '1.5px solid #cbd5e1',
                        background: '#f8fafc',
                        color: '#64748b',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      ✕ {t.ownerBtnReject}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 2. Confirmed & Active Bookings */}
        <section style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '1.25rem', color: '#163e24', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>✅</span>
            <span>{t.ownerConfirmedBookings} ({acceptedBookings.length})</span>
          </h3>

          {acceptedBookings.length === 0 ? (
            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', textAlign: 'center', color: '#64748b' }}>
              {lang === 'hi' ? 'कोई स्वीकृत बुकिंग अभी सक्रिय नहीं है।' : 'No accepted bookings active currently.'}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px' }}>
              {acceptedBookings.map((b, idx) => (
                <div key={b.id || idx} style={{ background: '#ffffff', border: '1.5px solid #bbf7d0', borderRadius: '14px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                        ✓ {t.statusAccepted}
                      </span>
                      <h4 style={{ margin: '6px 0 2px', fontSize: '1.15rem', color: '#163e24' }}>
                        {b.farmer_name} ({b.farmer_phone})
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.875rem', color: '#475569' }}>
                        📍 {b.farmer_village} • 📅 {b.booking_date} ({b.time_slot})
                      </p>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#15803d' }}>
                        ₹{b.estimated_cost}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                    <a
                      href={`tel:${b.farmer_phone}`}
                      style={{
                        flex: 1,
                        minHeight: '48px',
                        borderRadius: '10px',
                        background: '#15803d',
                        color: '#ffffff',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        textDecoration: 'none',
                        fontWeight: 700
                      }}
                    >
                      📞 {t.ownerBtnCallFarmer}
                    </a>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(b.farmer_village)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: 1,
                        minHeight: '48px',
                        borderRadius: '10px',
                        background: '#0284c7',
                        color: '#ffffff',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        textDecoration: 'none',
                        fontWeight: 700
                      }}
                    >
                      🗺️ {t.ownerBtnRoute}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 3. My Registered Fleet */}
        <section>
          <h3 style={{ fontSize: '1.25rem', color: '#163e24', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🚜</span>
            <span>{t.ownerMyTractors}</span>
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
            {initialFleetData.slice(0, 3).map(m => (
              <div key={m.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <img 
                  src={getSupabaseImageUrl(m.image)} 
                  alt={m.name[lang]} 
                  style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} 
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith(m.image)) target.src = m.image;
                  }}
                />
                <div>
                  <h5 style={{ margin: '0 0 4px', fontSize: '0.95rem', color: '#163e24' }}>{m.name[lang]}</h5>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{m.power} • ₹{m.rate}/h</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
