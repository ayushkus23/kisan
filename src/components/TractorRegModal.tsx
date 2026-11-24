import React, { useState } from 'react';
import { Language, OwnerRegistration } from '../types';
import { translations } from '../locales/translations';
import { supabase } from '../lib/supabase';

interface TractorRegModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const TractorRegModal: React.FC<TractorRegModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const t = translations[lang];

  const [step, setStep] = useState<number>(1);
  const [ownerName, setOwnerName] = useState<string>('');
  const [ownerPhone, setOwnerPhone] = useState<string>('');
  const [village, setVillage] = useState<string>('');
  const [district, setDistrict] = useState<string>('मेरठ (Meerut)');
  const [brand, setBrand] = useState<string>('Mahindra');
  const [hp, setHp] = useState<number>(50);
  const [rateWithFuel, setRateWithFuel] = useState<number>(600);
  const [rateWithoutFuel, setRateWithoutFuel] = useState<number>(400);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newOwner: OwnerRegistration = {
      owner_name: ownerName.trim(),
      phone: ownerPhone.trim(),
      village: village.trim(),
      district,
      tractor_brand: brand,
      tractor_hp: hp,
      implements: ['Rotavator', 'Plough'],
      rate_with_diesel: rateWithFuel,
      rate_without_diesel: rateWithoutFuel,
      created_at: new Date().toISOString()
    };

    try {
      await supabase.from('owners').insert([newOwner]);
    } catch (err) {
      console.warn('Offline fallback owner reg:', err);
    }

    try {
      const stored = JSON.parse(localStorage.getItem('registered_owners') || '[]');
      stored.push(newOwner);
      localStorage.setItem('registered_owners', JSON.stringify(stored));
    } catch (e) {
      console.warn(e);
    }

    setIsSubmitting(false);
    setIsDone(true);
  };

  return (
    <div className="modal-overlay" style={{ display: 'flex' }} onClick={onClose}>
      <div className="modal-card reg-modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#163e24' }}>
              🚜 {t.menuRegTractor}
            </h3>
            <span style={{ fontSize: '0.85rem', color: '#475569' }}>
              {t.menuRegTractorSub}
            </span>
          </div>
          <button type="button" className="drawer-close-btn" onClick={onClose}>&times;</button>
        </div>

        {isDone ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <span style={{ fontSize: '3rem' }}>🎉</span>
            <h3 style={{ color: '#15803d', margin: '14px 0 6px' }}>
              {lang === 'hi' ? 'ट्रैक्टर सफलतापूर्वक दर्ज हुआ!' : 'Tractor Registered Successfully!'}
            </h3>
            <p style={{ color: '#475569', fontSize: '0.95rem' }}>
              {lang === 'hi' ? 'हमारी टीम 2 घंटे के अंदर सत्यापन के लिए कॉल करेगी।' : 'Our team will call you within 2 hours for verification.'}
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onClose}
              style={{ minHeight: '48px', padding: '10px 24px', marginTop: '16px', fontWeight: 700 }}
            >
              {t.btnClose}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '6px' }}>
                  {lang === 'hi' ? 'मालिक का नाम' : 'Owner Name'}
                </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder={lang === 'hi' ? 'उदा. बलविंदर सिंह' : 'e.g. Balwinder Singh'}
                  value={ownerName}
                  onChange={e => setOwnerName(e.target.value)}
                  style={{ width: '100%', minHeight: '48px', padding: '10px', borderRadius: '8px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '6px' }}>
                    {lang === 'hi' ? 'मोबाइल नंबर' : 'Phone'}
                  </label>
                  <input
                    type="tel"
                    required
                    inputMode="numeric"
                    maxLength={10}
                    className="form-control"
                    placeholder="10 Digits"
                    value={ownerPhone}
                    onChange={e => setOwnerPhone(e.target.value.replace(/\D/g, ''))}
                    style={{ width: '100%', minHeight: '48px', padding: '10px', borderRadius: '8px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '6px' }}>
                    {lang === 'hi' ? 'गांव' : 'Village'}
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder={lang === 'hi' ? 'गांव का नाम' : 'Village'}
                    value={village}
                    onChange={e => setVillage(e.target.value)}
                    style={{ width: '100%', minHeight: '48px', padding: '10px', borderRadius: '8px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '6px' }}>
                    {lang === 'hi' ? 'ब्रांड (Company)' : 'Tractor Brand'}
                  </label>
                  <select
                    className="form-control"
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                    style={{ width: '100%', minHeight: '48px', padding: '10px', borderRadius: '8px' }}
                  >
                    <option value="Mahindra">Mahindra</option>
                    <option value="Sonalika">Sonalika</option>
                    <option value="John Deere">John Deere</option>
                    <option value="Swaraj">Swaraj</option>
                    <option value="Farmtrac">Farmtrac</option>
                    <option value="New Holland">New Holland</option>
                    <option value="Eicher">Eicher</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '6px' }}>
                    {lang === 'hi' ? 'हॉर्सपावर (HP)' : 'Horsepower (HP)'}
                  </label>
                  <input
                    type="number"
                    min={20}
                    max={120}
                    className="form-control"
                    value={hp}
                    onChange={e => setHp(parseInt(e.target.value) || 50)}
                    style={{ width: '100%', minHeight: '48px', padding: '10px', borderRadius: '8px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '6px' }}>
                    {lang === 'hi' ? 'डीजल सहित रेट (₹/h)' : 'Rate with Diesel'}
                  </label>
                  <input
                    type="number"
                    min={200}
                    className="form-control"
                    value={rateWithFuel}
                    onChange={e => setRateWithFuel(parseInt(e.target.value) || 600)}
                    style={{ width: '100%', minHeight: '48px', padding: '10px', borderRadius: '8px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '6px' }}>
                    {lang === 'hi' ? 'किसान डीजल रेट (₹/h)' : 'Rate without Diesel'}
                  </label>
                  <input
                    type="number"
                    min={150}
                    className="form-control"
                    value={rateWithoutFuel}
                    onChange={e => setRateWithoutFuel(parseInt(e.target.value) || 400)}
                    style={{ width: '100%', minHeight: '48px', padding: '10px', borderRadius: '8px' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ width: '100%', minHeight: '52px', marginTop: '10px', fontSize: '1.05rem', fontWeight: 800 }}
              >
                {isSubmitting ? (lang === 'hi' ? 'दर्ज हो रहा है...' : 'Registering...') : `✓ ${t.btnSubmit}`}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
