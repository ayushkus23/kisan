import React, { useState, useMemo } from 'react';
import { initialFleetData, FleetItem, mandiRatesList } from '../data/initialData';
import { Language, Booking } from '../types';
import { translations } from '../locales/translations';
import { getSupabaseImageUrl } from '../lib/supabase';

interface FarmerPortalProps {
  lang: Language;
  onSelectVehicle: (vehicle: FleetItem) => void;
  onOpenMyBookings: () => void;
  onOpenAttachModal: () => void;
  onCallSupport: () => void;
  latestBooking?: Booking | null;
}

export const FarmerPortal: React.FC<FarmerPortalProps> = ({
  lang,
  onSelectVehicle,
  onOpenMyBookings,
  onOpenAttachModal,
  onCallSupport,
  latestBooking
}) => {
  const t = translations[lang];

  // Filters & State
  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'nearest' | 'rate' | 'hp'>('nearest');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Crop Pills definition
  const cropPills = [
    { id: 'all', label: t.cropPillAll, icon: '🚜' },
    { id: 'dhan', label: t.cropPillPaddy, icon: '🌾' },
    { id: 'gehu', label: t.cropPillWheat, icon: '🌾' },
    { id: 'ganna', label: t.cropPillSugarcane, icon: '🎋' },
    { id: 'sabzi', label: t.cropPillPotato, icon: '🥔' },
    { id: 'bagwani', label: t.cropPillMustard, icon: '🍎' },
    { id: 'dhulai', label: lang === 'hi' ? 'माल ढुलाई' : 'Haulage', icon: '🚛' }
  ];

  // Voice narration using SpeechSynthesis
  const handleToggleVoice = () => {
    if (!('speechSynthesis' in window)) {
      alert(lang === 'hi' ? 'आपके ब्राउज़र में आवाज़ की सुविधा उपलब्ध नहीं है।' : 'Speech synthesis not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textToSpeak = lang === 'hi'
        ? "नमस्ते किसान भाइयों। प्रोजेक्ट ट्रैक्टर में आपका स्वागत है। आज मौसम बिल्कुल साफ है, रabi की बुवाई और जुताई के लिए अनुकूल समय है। अपने खेत के लिए सही ट्रैक्टर अभी बुक करें।"
        : "Welcome to Project Tractor. Clear weather expected today. Ideal conditions for sowing and field preparation. Book your machine now.";

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.9;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // Filtered & Sorted fleet list
  const filteredFleet = useMemo(() => {
    let list = [...initialFleetData];

    // Crop filter
    if (selectedCrop !== 'all') {
      list = list.filter(v => v.categories.includes(selectedCrop));
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(v =>
        v.name[lang].toLowerCase().includes(q) ||
        v.location[lang].toLowerCase().includes(q) ||
        v.suitableWork[lang].toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'rate') {
      list.sort((a, b) => a.rate - b.rate);
    } else if (sortBy === 'hp') {
      list.sort((a, b) => parseInt(b.power) - parseInt(a.power));
    } else {
      // Default: nearest
      list.sort((a, b) => a.distanceKm - b.distanceKm);
    }

    return list;
  }, [selectedCrop, searchQuery, sortBy, lang]);

  return (
    <main className="main-content">
      {/* 1. Hero Section */}
      <section className="hero-banner hero-simplified">
        <h1 className="hero-lead-line">
          {t.heroMainTitle}
        </h1>
        
        <div style={{ marginTop: '16px' }}>
          <p style={{ fontWeight: 700, margin: '0 0 10px', fontSize: '1rem', color: '#14341e' }}>
            {t.heroWorkLabel}
          </p>
          <div className="crop-pills-container">
            {cropPills.map(crop => (
              <button
                key={crop.id}
                type="button"
                className={`crop-pill ${selectedCrop === crop.id ? 'active' : ''}`}
                onClick={() => setSelectedCrop(crop.id)}
              >
                <span>{crop.icon}</span>
                <span>{crop.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Weather Advisory & Voice Assist */}
      <section className="daily-info-container">
        <div className="weather-advisory-card">
          <div className="weather-col-left">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.6rem' }}>⛅</span>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#163e24' }}>
                  {t.weatherAdvisoryTitle}
                </h4>
                <p style={{ margin: '4px 0 0', fontSize: '0.875rem', color: '#475569' }}>
                  {t.weatherAdvisoryText}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleToggleVoice}
              style={{ minHeight: '48px', padding: '8px 16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <span>{isSpeaking ? '⏹️' : '🔊'}</span>
              <span>{isSpeaking ? t.btnVoiceStop : t.btnVoiceListen}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Live Mandi Market Ticker */}
      <section className="mandi-ticker-section" style={{ margin: '14px 0 20px', background: '#fdfaf2', border: '1px solid #fed7aa', borderRadius: '12px', padding: '10px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '1.2rem' }}>📊</span>
          <strong style={{ fontSize: '0.9rem', color: '#9a3412' }}>{t.mandiRatesTitle}:</strong>
        </div>
        <div style={{ display: 'flex', overflowX: 'auto', gap: '14px', paddingBottom: '4px' }}>
          {mandiRatesList.map((m, idx) => (
            <div 
              key={idx}
              style={{
                flexShrink: 0,
                background: '#ffffff',
                border: '1px solid #ffedd5',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.875rem'
              }}
            >
              <span style={{ fontWeight: 600 }}>{m.item}:</span>{' '}
              <span style={{ fontWeight: 800, color: '#2e7d32' }}>{m.rate}</span>{' '}
              <span style={{ fontSize: '0.75rem', color: m.change.includes('+') ? '#16a34a' : '#64748b' }}>({m.change})</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Active Booking Status Card (If any) */}
      {latestBooking && (
        <section style={{ marginBottom: '20px', background: '#f0fdf4', border: '2px solid #86efac', borderRadius: '14px', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <span style={{ background: '#22c55e', color: '#ffffff', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
                ✓ {t.statusPending}
              </span>
              <h4 style={{ margin: '8px 0 4px', fontSize: '1.1rem', color: '#14532d' }}>
                {latestBooking.vehicle_name} ({latestBooking.booking_date})
              </h4>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#166534' }}>
                {latestBooking.farmer_name} • {latestBooking.hours_needed} {lang === 'hi' ? 'घंटे' : 'hours'} • ₹{latestBooking.estimated_cost}
              </p>
            </div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onOpenMyBookings}
              style={{ minHeight: '48px', padding: '8px 16px', fontWeight: 700 }}
            >
              📋 {t.navMyBookings}
            </button>
          </div>
        </section>
      )}

      {/* 5. Fleet Header & Search/Sort Bar */}
      <section className="fleet-section">
        <div className="fleet-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h3 style={{ margin: 0, fontSize: '1.35rem', color: '#14341e', fontWeight: 800 }}>
              {t.fleetHeading}
            </h3>
            <span className="fleet-count">
              {filteredFleet.length} {lang === 'hi' ? 'गाड़ियां उपलब्ध' : 'Available'}
            </span>
          </div>
        </div>

        {/* Search & Sort Controls */}
        <div className="search-sort-bar">
          <div style={{ flex: 1, minWidth: '220px' }}>
            <input
              type="text"
              className="form-control search-input"
              placeholder={t.filterSearchPlaceholder}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ width: '100%', minHeight: '48px', fontSize: '1rem', padding: '8px 14px', borderRadius: '10px' }}
            />
          </div>
          <div className="sort-select-wrap">
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#475569' }}>
              {lang === 'hi' ? 'क्रम:' : 'Sort:'}
            </span>
            <select
              className="form-control"
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              style={{ minHeight: '48px', padding: '8px 12px', fontSize: '0.95rem', borderRadius: '10px' }}
            >
              <option value="nearest">{t.sortFastest}</option>
              <option value="rate">{t.sortCheapest}</option>
              <option value="hp">{t.sortHp}</option>
            </select>
          </div>
        </div>

        {/* 6. Fleet Cards Grid */}
        <div className="fleet-grid">
          {filteredFleet.map(machine => (
            <div key={machine.id} className="machine-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={getSupabaseImageUrl(machine.image)}
                  alt={machine.name[lang]}
                  className="machine-card-image"
                  style={{ width: '100%', height: '190px', objectFit: 'cover' }}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== window.location.origin + '/' + machine.image && !target.src.endsWith(machine.image)) {
                      target.src = machine.image;
                    }
                  }}
                  loading="lazy"
                />
                <span className="machine-badge" style={{ position: 'absolute', top: '10px', left: '10px' }}>
                  {machine.badge[lang]}
                </span>
                <span 
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.7)',
                    color: '#ffffff',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}
                >
                  📍 {machine.distanceKm} km
                </span>
              </div>

              <div className="machine-card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px' }}>
                <h4 style={{ margin: '0 0 6px', fontSize: '1.15rem', color: '#163e24', fontWeight: 800 }}>
                  {machine.name[lang]}
                </h4>
                <p style={{ margin: '0 0 10px', fontSize: '0.875rem', color: '#475569', lineHeight: 1.4 }}>
                  {machine.subtitle[lang]}
                </p>

                <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '12px' }}>
                  <div>⚙️ <strong>{machine.power}</strong> • {machine.tool[lang]}</div>
                  <div style={{ color: '#047857', marginTop: '3px' }}>🌾 {machine.suitableWork[lang]}</div>
                </div>

                {/* Rates Row */}
                <div style={{ marginTop: 'auto', borderTop: '1px solid #f1f5f9', paddingTop: '10px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{t.fuelIncludedTag}:</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1f5130' }}>
                      ₹{machine.rate} <small style={{ fontSize: '0.75rem', fontWeight: 600 }}>{t.perHour}</small>
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '4px' }}>
                    <span style={{ fontSize: '0.85rem', color: '#0284c7' }}>{t.farmerFuelTag}:</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0369a1' }}>
                      ₹{Math.max(100, machine.rate - machine.fuelDiscount)} <small style={{ fontSize: '0.75rem', fontWeight: 600 }}>{t.perHour}</small>
                    </span>
                  </div>
                </div>

                {/* Primary Booking CTA (56px high) */}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onSelectVehicle(machine)}
                  style={{
                    width: '100%',
                    minHeight: '56px',
                    fontSize: '1.05rem',
                    fontWeight: 800,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  🚜 <span>{t.btnBookNow}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Bottom Quick Action Bar */}
      <div className="bottom-quick-bar" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', padding: '12px 16px', background: '#ffffff', position: 'sticky', bottom: 0, boxShadow: '0 -3px 12px rgba(0,0,0,0.08)', zIndex: 100 }}>
        <button
          type="button"
          onClick={onOpenMyBookings}
          style={{ minHeight: '48px', padding: '6px', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#f8fafc', fontWeight: 700, fontSize: '0.85rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
          <span>📋</span>
          <span>{t.navMyBookings}</span>
        </button>
        <button
          type="button"
          onClick={onOpenAttachModal}
          style={{ minHeight: '48px', padding: '6px', borderRadius: '10px', border: 'none', background: '#e8b931', color: '#163e24', fontWeight: 800, fontSize: '0.85rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
          <span>🚜</span>
          <span>{t.navAttachBtn}</span>
        </button>
        <button
          type="button"
          onClick={onCallSupport}
          style={{ minHeight: '48px', padding: '6px', borderRadius: '10px', border: 'none', background: '#22c55e', color: '#ffffff', fontWeight: 800, fontSize: '0.85rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
          <span>📞</span>
          <span>{lang === 'hi' ? 'सहायता' : 'Help'}</span>
        </button>
      </div>
    </main>
  );
};
