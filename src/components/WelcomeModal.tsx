import React from 'react';
import { Language } from '../types';
import { translations } from '../locales/translations';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onGuestClick: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  isOpen,
  lang,
  onLoginClick,
  onRegisterClick,
  onGuestClick
}) => {
  const t = translations[lang];

  if (!isOpen) return null;

  return (
    <div className="welcome-modal-overlay" style={{ display: 'flex' }}>
      <div className="welcome-modal-card">
        <div className="welcome-logo-icon" style={{ fontSize: '3rem', marginBottom: '10px' }}>
          🚜
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#163e24', margin: '0 0 8px' }}>
          {t.welcomeTitle}
        </h2>
        <p style={{ fontSize: '0.95rem', color: '#475569', margin: '0 0 24px', lineHeight: 1.5 }}>
          {t.welcomeSubtitle}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Primary: Login */}
          <button
            type="button"
            className="btn btn-primary"
            onClick={onLoginClick}
            style={{ width: '100%', minHeight: '52px', fontSize: '1.05rem', fontWeight: 700 }}
          >
            🔑 {t.welcomeLoginBtn}
          </button>

          {/* Secondary: Create Account */}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onRegisterClick}
            style={{ width: '100%', minHeight: '52px', fontSize: '1.05rem', fontWeight: 700 }}
          >
            📝 {t.welcomeRegisterBtn}
          </button>

          {/* Guest Link */}
          <button
            type="button"
            className="welcome-guest-link"
            onClick={onGuestClick}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#047857',
              fontSize: '0.95rem',
              fontWeight: 700,
              padding: '12px',
              cursor: 'pointer',
              minHeight: '48px'
            }}
          >
            {t.welcomeGuestBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
