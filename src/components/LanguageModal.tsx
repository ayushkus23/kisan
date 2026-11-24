import React from 'react';
import { Language } from '../types';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onSelectLang
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ display: 'flex' }} onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '380px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#163e24' }}>
            🌐 अपनी भाषा चुनें / Choose Language
          </h3>
          <button type="button" className="drawer-close-btn" onClick={onClose}>&times;</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
          <button
            type="button"
            onClick={() => {
              onSelectLang('hi');
              onClose();
            }}
            style={{
              padding: '16px',
              borderRadius: '12px',
              border: currentLang === 'hi' ? '2.5px solid #2e7d32' : '1.5px solid #cbd5e1',
              background: currentLang === 'hi' ? '#f0fdf4' : '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              minHeight: '52px'
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#163e24' }}>हिंदी</div>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>किसान भाइयों के लिए सहज</span>
            </div>
            {currentLang === 'hi' && <span style={{ fontSize: '1.3rem', color: '#15803d' }}>✓</span>}
          </button>

          <button
            type="button"
            onClick={() => {
              onSelectLang('en');
              onClose();
            }}
            style={{
              padding: '16px',
              borderRadius: '12px',
              border: currentLang === 'en' ? '2.5px solid #2e7d32' : '1.5px solid #cbd5e1',
              background: currentLang === 'en' ? '#f0fdf4' : '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              minHeight: '52px'
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#163e24' }}>English</div>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Standard English UI</span>
            </div>
            {currentLang === 'en' && <span style={{ fontSize: '1.3rem', color: '#15803d' }}>✓</span>}
          </button>
        </div>
      </div>
    </div>
  );
};
