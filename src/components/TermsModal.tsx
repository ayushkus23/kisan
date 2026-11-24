import React from 'react';
import { Language } from '../types';
import { translations } from '../locales/translations';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const TermsModal: React.FC<TermsModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const t = translations[lang];

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ display: 'flex' }} onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#163e24' }}>
            📜 {t.menuTerms}
          </h3>
          <button type="button" className="drawer-close-btn" onClick={onClose}>&times;</button>
        </div>

        <div style={{ marginTop: '16px', maxHeight: '340px', overflowY: 'auto', fontSize: '0.92rem', lineHeight: 1.6, color: '#334155' }}>
          <h4>{lang === 'hi' ? '1. पारदर्शी और सही किराया' : '1. Transparent & Fair Rates'}</h4>
          <p>
            {lang === 'hi' 
              ? 'प्रोजेक्ट ट्रैक्टर पर दिया गया हर रेट अंतिम है। किसी भी बिचौलिये या दलाल का कोई कमीशन नहीं जोड़ा जाता।'
              : 'Every rate shown on Project Tractor is direct and transparent. No middleman fees or hidden commissions.'}
          </p>

          <h4>{lang === 'hi' ? '2. डीजल विकल्प की स्पष्टता' : '2. Clear Diesel Fuel Policy'}</h4>
          <p>
            {lang === 'hi'
              ? 'यदि आप "किसान का डीजल" चुनते हैं, तो काम शुरू होने से पहले पर्याप्त साफ डीजल उपलब्ध कराना किसान की जिम्मेदारी होगी।'
              : 'If you choose "Farmer\'s Diesel", providing sufficient clean diesel before work begins is the farmer\'s responsibility.'}
          </p>

          <h4>{lang === 'hi' ? '3. भुगतान व सुरक्षा' : '3. Payment & Safety'}</h4>
          <p>
            {lang === 'hi'
              ? 'काम पूरा होने और खेत की गुणवत्ता जांचने के बाद ही पूरा भुगतान सीधे ट्रैक्टर मालिक को नकद या UPI द्वारा करें।'
              : 'Full payment is made directly to the tractor owner via cash or UPI only after work completion and satisfaction.'}
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={onClose}
          style={{ width: '100%', minHeight: '48px', marginTop: '16px', fontWeight: 700 }}
        >
          {t.btnClose}
        </button>
      </div>
    </div>
  );
};
