import React, { useState } from 'react';
import { Language, Booking } from '../types';
import { translations } from '../locales/translations';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  bookings: Booking[];
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  lang,
  bookings
}) => {
  const t = translations[lang];
  const [filterPhone, setFilterPhone] = useState<string>('');

  if (!isOpen) return null;

  const filtered = filterPhone.trim()
    ? bookings.filter(b => b.farmer_phone.includes(filterPhone.trim()))
    : bookings;

  return (
    <div className="modal-overlay" style={{ display: 'flex' }} onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#163e24' }}>
              📋 {t.navMyBookings}
            </h3>
            <span style={{ fontSize: '0.85rem', color: '#475569' }}>
              {lang === 'hi' ? 'अपनी बुकिंग का स्टेटस व विवरण देखें' : 'Track booking status and details'}
            </span>
          </div>
          <button type="button" className="drawer-close-btn" onClick={onClose}>&times;</button>
        </div>

        {/* Filter input */}
        <div style={{ marginTop: '14px' }}>
          <input
            type="tel"
            inputMode="numeric"
            placeholder={lang === 'hi' ? 'मोबाइल नंबर से खोजें...' : 'Search by phone number...'}
            value={filterPhone}
            onChange={e => setFilterPhone(e.target.value.replace(/\D/g, ''))}
            style={{ width: '100%', minHeight: '48px', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1' }}
          />
        </div>

        {/* Bookings List */}
        <div style={{ marginTop: '16px', maxHeight: '360px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 10px', color: '#64748b' }}>
              🚜 {lang === 'hi' ? 'कोई बुकिंग नहीं मिली। अभी नया ट्रैक्टर बुक करें!' : 'No bookings found. Book your tractor now!'}
            </div>
          ) : (
            filtered.map((b, idx) => (
              <div 
                key={b.id || idx}
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '14px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        background: b.status === 'accepted' ? '#dcfce7' : b.status === 'completed' ? '#f0fdf4' : '#fef3c7',
                        color: b.status === 'accepted' ? '#15803d' : b.status === 'completed' ? '#166534' : '#b45309'
                      }}
                    >
                      {b.status === 'pending' ? t.statusPending : b.status === 'accepted' ? t.statusAccepted : t.statusCompleted}
                    </span>
                    <h4 style={{ margin: '8px 0 2px', fontSize: '1.05rem', color: '#163e24' }}>
                      {b.vehicle_name}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569' }}>
                      📅 {b.booking_date} ({b.time_slot}) • ⏱️ {b.hours_needed} {lang === 'hi' ? 'घंटे' : 'hrs'}
                    </p>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#16a34a' }}>
                      ₹{b.estimated_cost}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {b.fuel_option === 'included' ? t.fuelIncludedTag : t.farmerFuelTag}
                    </span>
                  </div>
                </div>

                {b.farmer_name && (
                  <div style={{ marginTop: '8px', borderTop: '1px dashed #cbd5e1', paddingTop: '6px', fontSize: '0.8rem', color: '#64748b' }}>
                    👤 {b.farmer_name} • 📞 {b.farmer_phone} • 📍 {b.farmer_village}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClose}
          style={{ width: '100%', minHeight: '48px', marginTop: '16px', fontWeight: 700 }}
        >
          {t.btnClose}
        </button>
      </div>
    </div>
  );
};
