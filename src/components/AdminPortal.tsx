import React, { useState } from 'react';
import { Language, Booking } from '../types';
import { translations } from '../locales/translations';
import { initialFleetData } from '../data/initialData';
import { getSupabaseImageUrl } from '../lib/supabase';

interface AdminPortalProps {
  lang: Language;
  onSwitchToFarmer: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  lang,
  onSwitchToFarmer
}) => {
  const t = translations[lang];

  const [activeTab, setActiveTab] = useState<'bookings' | 'vehicles' | 'owners'>('bookings');

  // Stored bookings or sample
  const sampleBookings: Booking[] = [
    {
      id: 'BK-1001',
      vehicle_id: 1,
      vehicle_name: 'धान 4WD मड-मास्टर ट्रैक्टर',
      farmer_name: 'रामेश्वर सिंह',
      farmer_phone: '9876543210',
      farmer_village: 'दौराला, मेरठ',
      booking_date: '2026-11-25',
      time_slot: 'morning',
      hours_needed: 4,
      fuel_option: 'included',
      estimated_cost: 2400,
      rate_applied: 600,
      status: 'pending'
    },
    {
      id: 'BK-1002',
      vehicle_id: 2,
      vehicle_name: 'सुपर-सीडर व रोटावेटर ट्रैक्टर',
      farmer_name: 'सतपाल सिंह',
      farmer_phone: '9897123456',
      farmer_village: 'सरधना, मेरठ',
      booking_date: '2026-11-24',
      time_slot: 'noon',
      hours_needed: 5,
      fuel_option: 'farmer',
      estimated_cost: 1750,
      rate_applied: 350,
      status: 'accepted'
    },
    {
      id: 'BK-1003',
      vehicle_id: 4,
      vehicle_name: 'हाई-टॉर्क हैवी ड्यूटी ट्रैक्टर',
      farmer_name: 'जयप्रकाश त्यागी',
      farmer_phone: '9837987654',
      farmer_village: 'मोहिउद्दीनपुर, मेरठ',
      booking_date: '2026-11-23',
      time_slot: 'morning',
      hours_needed: 6,
      fuel_option: 'included',
      estimated_cost: 4200,
      rate_applied: 700,
      status: 'completed'
    }
  ];

  const [bookingsList, setBookingsList] = useState<Booking[]>(sampleBookings);

  const sampleOwners = [
    { id: 1, name: 'बलविंदर सिंह', phone: '9812345678', village: 'दौराला', tractors: 2, joined: '10 Nov 2026' },
    { id: 2, name: 'सुरजीत राणा', phone: '9823456789', village: 'सरधना', tractors: 1, joined: '12 Nov 2026' },
    { id: 3, name: 'महेंद्र चौधरी', phone: '9834567890', village: 'हस्तिनापुर', tractors: 3, joined: '15 Nov 2026' }
  ];

  const handleStatusChange = (id: string | number | undefined, status: 'pending' | 'accepted' | 'completed' | 'cancelled') => {
    setBookingsList(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  return (
    <div className="admin-portal-body" style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '40px' }}>
      {/* Admin Navbar */}
      <header style={{ background: '#0f172a', color: '#ffffff', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.5rem' }}>⚙️</span>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>{t.adminHeading}</h3>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Project Tractor Super Admin</span>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={onSwitchToFarmer}
          style={{ minHeight: '48px', padding: '6px 14px', fontWeight: 700 }}
        >
          🌾 {lang === 'hi' ? 'किसान पोर्टल पर जाएं' : 'Back to Farmer Portal'}
        </button>
      </header>

      <main className="main-content" style={{ marginTop: '20px' }}>
        {/* KPI Counter Cards */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>{t.adminKpiOwners}</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>
              {sampleOwners.length}
            </div>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>{t.adminKpiTractors}</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0284c7', marginTop: '6px' }}>
              {initialFleetData.length}
            </div>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>{t.adminKpiBookings}</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f59e0b', marginTop: '6px' }}>
              {bookingsList.length}
            </div>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>{t.adminKpiCompleted}</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#16a34a', marginTop: '6px' }}>
              ₹{bookingsList.filter(b => b.status === 'completed').reduce((s, b) => s + b.estimated_cost, 0)}
            </div>
          </div>
        </section>

        {/* Tab Controls */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px' }}>
          {[
            { id: 'bookings', label: t.adminTabBookings, icon: '📋' },
            { id: 'vehicles', label: t.adminTabVehicles, icon: '🚜' },
            { id: 'owners', label: t.adminTabOwners, icon: '👨‍🌾' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                minHeight: '48px',
                padding: '8px 18px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === tab.id ? '#0f172a' : '#e2e8f0',
                color: activeTab === tab.id ? '#ffffff' : '#334155',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* 1. Bookings Tab */}
        {activeTab === 'bookings' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
            {bookingsList.map(b => (
              <div key={b.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: b.status === 'completed' ? '#dcfce7' : b.status === 'accepted' ? '#e0f2fe' : '#fef3c7', color: b.status === 'completed' ? '#15803d' : b.status === 'accepted' ? '#0369a1' : '#b45309' }}>
                    {b.status.toUpperCase()}
                  </span>
                  <h4 style={{ margin: '6px 0 2px', fontSize: '1.05rem', color: '#0f172a' }}>
                    {b.farmer_name} ({b.farmer_phone})
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                    🚜 {b.vehicle_name} • 📅 {b.booking_date} • 📍 {b.farmer_village}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#16a34a' }}>₹{b.estimated_cost}</div>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{b.hours_needed} hrs</span>
                  </div>

                  <select
                    value={b.status}
                    onChange={e => handleStatusChange(b.id, e.target.value as any)}
                    style={{ minHeight: '48px', padding: '6px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontWeight: 600 }}
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. Vehicles Tab */}
        {activeTab === 'vehicles' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
            {initialFleetData.map(v => (
              <div key={v.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <img 
                  src={getSupabaseImageUrl(v.image)} 
                  alt={v.name[lang]} 
                  style={{ width: '70px', height: '70px', borderRadius: '8px', objectFit: 'cover' }} 
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith(v.image)) target.src = v.image;
                  }}
                />
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '1rem', color: '#0f172a' }}>{v.name[lang]}</h4>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{v.power} • {v.location[lang]}</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#16a34a', marginTop: '4px' }}>₹{v.rate}/hr</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. Owners Tab */}
        {activeTab === 'owners' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
            {sampleOwners.map(o => (
              <div key={o.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#0f172a' }}>{o.name}</h4>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>📞 {o.phone} • 📍 {o.village}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontWeight: 700, color: '#0284c7' }}>{o.tractors} Tractors</span>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Joined: {o.joined}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
