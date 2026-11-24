import React, { useState } from 'react';
import { FleetItem } from '../data/initialData';
import { Language, FuelOption, TimeSlot, Booking } from '../types';
import { translations } from '../locales/translations';
import { supabase } from '../lib/supabase';

interface BookingWizardModalProps {
  vehicle: FleetItem;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onBookingSuccess: (booking: Booking) => void;
}

export const BookingWizardModal: React.FC<BookingWizardModalProps> = ({
  vehicle,
  isOpen,
  onClose,
  lang,
  onBookingSuccess
}) => {
  const t = translations[lang];

  // Wizard state
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [fuelOption, setFuelOption] = useState<FuelOption>('included');
  
  // Date default to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];
  const [bookingDate, setBookingDate] = useState<string>(defaultDateStr);

  const [timeSlot, setTimeSlot] = useState<TimeSlot>('morning');
  const [hoursNeeded, setHoursNeeded] = useState<number>(4);
  const [farmerName, setFarmerName] = useState<string>('');
  const [farmerPhone, setFarmerPhone] = useState<string>('');
  const [farmerVillage, setFarmerVillage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (!isOpen) return null;

  // Rate calculation
  const hourlyRate = fuelOption === 'included' 
    ? vehicle.rate 
    : Math.max(100, vehicle.rate - vehicle.fuelDiscount);
  const totalCost = hourlyRate * hoursNeeded;

  // Min and Max dates (today to next 30 days)
  const todayStr = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const handleNext = () => {
    setErrorMessage('');
    if (currentStep === 5 && !farmerName.trim()) {
      setErrorMessage(lang === 'hi' ? 'कृपया अपना नाम दर्ज करें।' : 'Please enter your name.');
      return;
    }
    if (currentStep === 6) {
      const cleanPhone = farmerPhone.replace(/\D/g, '');
      if (cleanPhone.length !== 10) {
        setErrorMessage(lang === 'hi' ? 'कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें।' : 'Please enter a valid 10-digit mobile number.');
        return;
      }
      if (!farmerVillage.trim()) {
        setErrorMessage(lang === 'hi' ? 'कृपया अपने गांव का नाम लिखें।' : 'Please enter your village name.');
        return;
      }
    }
    setCurrentStep(prev => Math.min(prev + 1, 7));
  };

  const handleBack = () => {
    setErrorMessage('');
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmitBooking = async () => {
    setIsSubmitting(true);
    setErrorMessage('');

    const newBooking: Booking = {
      vehicle_id: typeof vehicle.id === 'string' ? parseInt(vehicle.id.replace(/\D/g, '') || '1') : vehicle.id,
      vehicle_name: vehicle.name[lang],
      farmer_name: farmerName.trim(),
      farmer_phone: farmerPhone.trim(),
      farmer_village: farmerVillage.trim(),
      booking_date: bookingDate,
      time_slot: timeSlot,
      hours_needed: hoursNeeded,
      fuel_option: fuelOption,
      estimated_cost: totalCost,
      rate_applied: hourlyRate,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    try {
      // 1. Try to push to Supabase
      const { data, error } = await supabase
        .from('bookings')
        .insert([newBooking])
        .select();

      if (error) {
        console.warn('Supabase booking insert notice:', error.message);
      } else if (data && data.length > 0) {
        newBooking.id = data[0].id;
      }
    } catch (err) {
      console.warn('Network offline or Supabase fallback:', err);
    }

    // 2. LocalStorage backup
    try {
      const existing = JSON.parse(localStorage.getItem('farmer_bookings') || '[]');
      existing.unshift({
        ...newBooking,
        id: newBooking.id || 'BK-' + Date.now().toString().slice(-6)
      });
      localStorage.setItem('farmer_bookings', JSON.stringify(existing));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }

    setIsSubmitting(false);
    onBookingSuccess(newBooking);
    onClose();
  };

  const progressPercent = (currentStep / 7) * 100;

  return (
    <div className="modal-overlay" style={{ display: 'flex' }} onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#163e24' }}>{t.wizardTitle}</h3>
            <span style={{ fontSize: '0.875rem', color: '#475569' }}>
              {vehicle.name[lang]} ({vehicle.power})
            </span>
          </div>
          <button 
            type="button" 
            className="drawer-close-btn" 
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Wizard Progress Bar */}
        <div className="wizard-progress-wrap">
          <div className="wizard-progress-header">
            <span>{t.wizardStepText} {currentStep} {t.wizardOfText} 7</span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <div className="wizard-progress-track">
            <div 
              className="wizard-progress-fill" 
              style={{ width: `${progressPercent}%`, transition: 'width 0.3s ease' }} 
            />
          </div>
        </div>

        {/* Step Contents */}
        <div className="wizard-body" style={{ minHeight: '260px' }}>
          {errorMessage && (
            <div className="wizard-error-banner" style={{ background: '#fee2e2', color: '#991b1b', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontWeight: 600 }}>
              ⚠️ {errorMessage}
            </div>
          )}

          {/* STEP 1: Fuel Option */}
          {currentStep === 1 && (
            <div className="wizard-step-pane">
              <h4 className="wizard-question-title">{t.wizardStep1Title}</h4>
              <div className="fuel-options-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginTop: '14px' }}>
                <div 
                  className={`fuel-card ${fuelOption === 'included' ? 'selected' : ''}`}
                  onClick={() => setFuelOption('included')}
                  style={{
                    padding: '16px',
                    border: fuelOption === 'included' ? '2.5px solid #2e7d32' : '1.5px solid #cbd5e1',
                    borderRadius: '12px',
                    background: fuelOption === 'included' ? '#f0fdf4' : '#ffffff',
                    cursor: 'pointer',
                    minHeight: '48px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#163e24' }}>
                      ⛽ {t.wizardFuelOptionA}
                    </div>
                    <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2e7d32' }}>
                      ₹{vehicle.rate}{t.perHour}
                    </span>
                  </div>
                  <p style={{ margin: '6px 0 0', fontSize: '0.875rem', color: '#475569' }}>
                    {lang === 'hi' ? 'डीजल का पूरा खर्चा ट्रैक्टर मालिक का होगा।' : 'Owner covers all diesel fuel costs.'}
                  </p>
                </div>

                <div 
                  className={`fuel-card ${fuelOption === 'farmer' ? 'selected' : ''}`}
                  onClick={() => setFuelOption('farmer')}
                  style={{
                    padding: '16px',
                    border: fuelOption === 'farmer' ? '2.5px solid #2e7d32' : '1.5px solid #cbd5e1',
                    borderRadius: '12px',
                    background: fuelOption === 'farmer' ? '#f0fdf4' : '#ffffff',
                    cursor: 'pointer',
                    minHeight: '48px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#163e24' }}>
                      🛢️ {t.wizardFuelOptionB}
                    </div>
                    <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2e7d32' }}>
                      ₹{Math.max(100, vehicle.rate - vehicle.fuelDiscount)}{t.perHour}
                    </span>
                  </div>
                  <p style={{ margin: '6px 0 0', fontSize: '0.875rem', color: '#475569' }}>
                    {lang === 'hi' 
                      ? `डीजल आप खुद देंगे। किराये में ₹${vehicle.fuelDiscount}/घंटा की सीधी छूट मिलेगी!` 
                      : `You provide your own diesel. Save ₹${vehicle.fuelDiscount}/hour straight!`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Date Picker */}
          {currentStep === 2 && (
            <div className="wizard-step-pane">
              <h4 className="wizard-question-title">{t.wizardStep2Title}</h4>
              <p style={{ fontSize: '0.875rem', color: '#475569', marginBottom: '12px' }}>
                {lang === 'hi' ? 'खेत में काम कराने की तारीख चुनें:' : 'Select preferred date for farm work:'}
              </p>
              <input 
                type="date"
                className="form-control"
                value={bookingDate}
                min={todayStr}
                max={maxDateStr}
                onChange={e => setBookingDate(e.target.value)}
                style={{ width: '100%', minHeight: '52px', fontSize: '1rem', padding: '10px 14px', borderRadius: '10px' }}
              />
            </div>
          )}

          {/* STEP 3: Time Slot */}
          {currentStep === 3 && (
            <div className="wizard-step-pane">
              <h4 className="wizard-question-title">{t.wizardStep3Title}</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '12px' }}>
                {[
                  { id: 'morning', label: t.wizardSlotMorning, icon: '🌅' },
                  { id: 'noon', label: t.wizardSlotNoon, icon: '☀️' },
                  { id: 'afternoon', label: t.wizardSlotAfternoon, icon: '🌇' },
                  { id: 'custom', label: t.wizardSlotCustom, icon: '⏱️' }
                ].map(slot => (
                  <div
                    key={slot.id}
                    onClick={() => setTimeSlot(slot.id as TimeSlot)}
                    style={{
                      padding: '14px',
                      borderRadius: '10px',
                      border: timeSlot === slot.id ? '2.5px solid #2e7d32' : '1.5px solid #cbd5e1',
                      background: timeSlot === slot.id ? '#f0fdf4' : '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      minHeight: '48px'
                    }}
                  >
                    <span style={{ fontSize: '1.4rem' }}>{slot.icon}</span>
                    <span style={{ fontWeight: 600, color: '#1e293b' }}>{slot.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Hours Needed */}
          {currentStep === 4 && (
            <div className="wizard-step-pane">
              <h4 className="wizard-question-title">{t.wizardStep4Title}</h4>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                <button
                  type="button"
                  onClick={() => setHoursNeeded(prev => Math.max(1, prev - 1))}
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    border: '2px solid #cbd5e1',
                    background: '#f8fafc',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  -
                </button>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#163e24' }}>{hoursNeeded}</span>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>
                    {lang === 'hi' ? 'घंटे (Hours)' : 'Hours'}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setHoursNeeded(prev => Math.min(24, prev + 1))}
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    border: '2px solid #cbd5e1',
                    background: '#f8fafc',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  +
                </button>
              </div>

              {/* Preset chips */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
                {[2, 4, 6, 8, 10].map(h => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setHoursNeeded(h)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '20px',
                      border: hoursNeeded === h ? '2px solid #2e7d32' : '1px solid #cbd5e1',
                      background: hoursNeeded === h ? '#2e7d32' : '#ffffff',
                      color: hoursNeeded === h ? '#ffffff' : '#334155',
                      fontWeight: 600,
                      cursor: 'pointer',
                      minHeight: '48px',
                      minWidth: '48px'
                    }}
                  >
                    {h}h
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: Farmer Name */}
          {currentStep === 5 && (
            <div className="wizard-step-pane">
              <h4 className="wizard-question-title">{t.wizardStep5Title}</h4>
              <div style={{ marginTop: '16px' }}>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '6px' }}>
                  {lang === 'hi' ? 'नाम (Farmer Name)' : 'Full Name'}
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={t.wizardNamePlaceholder}
                  value={farmerName}
                  onChange={e => setFarmerName(e.target.value)}
                  style={{ width: '100%', minHeight: '52px', fontSize: '1rem', padding: '10px 14px', borderRadius: '10px' }}
                />
              </div>
            </div>
          )}

          {/* STEP 6: Phone & Village */}
          {currentStep === 6 && (
            <div className="wizard-step-pane">
              <h4 className="wizard-question-title">{t.wizardStep6Title}</h4>
              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '6px' }}>
                    {lang === 'hi' ? 'मोबाइल नंबर (10 अंक)' : 'Mobile Phone Number'}
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    className="form-control"
                    placeholder={t.wizardPhonePlaceholder}
                    value={farmerPhone}
                    onChange={e => setFarmerPhone(e.target.value.replace(/\D/g, ''))}
                    style={{ width: '100%', minHeight: '52px', fontSize: '1rem', padding: '10px 14px', borderRadius: '10px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '6px' }}>
                    {lang === 'hi' ? 'गांव का नाम (Village / Location)' : 'Village Name'}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t.wizardVillagePlaceholder}
                    value={farmerVillage}
                    onChange={e => setFarmerVillage(e.target.value)}
                    style={{ width: '100%', minHeight: '52px', fontSize: '1rem', padding: '10px 14px', borderRadius: '10px' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: Review & Honest Submission */}
          {currentStep === 7 && (
            <div className="wizard-step-pane">
              <h4 className="wizard-question-title">{t.wizardStep7Title}</h4>
              
              <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '14px', marginTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#64748b' }}>{lang === 'hi' ? 'गाड़ी:' : 'Tractor:'}</span>
                  <strong>{vehicle.name[lang]}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#64748b' }}>{lang === 'hi' ? 'डीजल विकल्प:' : 'Fuel Option:'}</span>
                  <strong>{fuelOption === 'included' ? t.fuelIncludedTag : t.farmerFuelTag}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#64748b' }}>{lang === 'hi' ? 'तारीख व समय:' : 'Date & Time:'}</span>
                  <strong>{bookingDate} ({timeSlot})</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#64748b' }}>{lang === 'hi' ? 'घंटे:' : 'Hours:'}</span>
                  <strong>{hoursNeeded} {lang === 'hi' ? 'घंटे' : 'hours'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#64748b' }}>{lang === 'hi' ? 'किसान:' : 'Farmer:'}</span>
                  <strong>{farmerName} ({farmerPhone})</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #cbd5e1', paddingTop: '8px', marginTop: '8px' }}>
                  <span style={{ fontWeight: 700, color: '#163e24' }}>{t.wizardRunningTotal}:</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2e7d32' }}>₹{totalCost}</span>
                </div>
              </div>

              {/* Guest Reassurance Note */}
              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', padding: '10px 14px', marginTop: '14px', fontSize: '0.875rem', color: '#065f46' }}>
                ℹ️ {t.wizardGuestNote}
              </div>
            </div>
          )}
        </div>

        {/* Wizard Navigation Action Buttons */}
        <div className="wizard-nav-row" style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '16px' }}>
          {currentStep > 1 ? (
            <button
              type="button"
              className="btn-wizard-back"
              onClick={handleBack}
              disabled={isSubmitting}
            >
              ← {t.wizardBackBtn}
            </button>
          ) : <div />}

          {currentStep < 7 ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleNext}
              style={{ minHeight: '52px', minWidth: '120px', padding: '12px 24px', fontSize: '1rem', fontWeight: 700 }}
            >
              {t.wizardNextBtn} →
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmitBooking}
              disabled={isSubmitting}
              style={{ minHeight: '56px', width: '100%', padding: '12px 24px', fontSize: '1.1rem', fontWeight: 800 }}
            >
              {isSubmitting ? (lang === 'hi' ? 'भेजा जा रहा है...' : 'Sending...') : `✓ ${t.wizardSendRequestBtn}`}
            </button>
          )}
        </div>

        {/* Sticky Running Rate Bar */}
        <div className="wizard-sticky-rate">
          <div className="sticky-rate-info">
            <span className="sticky-rate-label">{t.wizardRunningTotal}</span>
            <span className="sticky-rate-val">₹{totalCost}</span>
          </div>
          <div className="sticky-rate-sub">
            ₹{hourlyRate}{t.perHour} &times; {hoursNeeded}h
          </div>
        </div>
      </div>
    </div>
  );
};
