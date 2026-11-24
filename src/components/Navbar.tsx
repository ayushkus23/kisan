import React from 'react';
import { Language } from '../types';
import { translations } from '../locales/translations';

interface NavbarProps {
  lang: Language;
  onOpenDrawer: () => void;
  onOpenLanguageModal: () => void;
  onOpenBookingsModal: () => void;
  onOpenAttachModal: () => void;
  onCallSupport: () => void;
  activeView: 'farmer' | 'owner' | 'admin';
  onChangeView: (view: 'farmer' | 'owner' | 'admin') => void;
  bookingCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onOpenDrawer,
  onOpenLanguageModal,
  onOpenBookingsModal,
  onOpenAttachModal,
  onCallSupport,
  activeView,
  onChangeView,
  bookingCount = 0
}) => {
  const t = translations[lang];

  return (
    <header className="navbar">
      <div className="nav-left">
        <button
          type="button"
          className="hamburger-btn"
          onClick={onOpenDrawer}
          aria-label="Menu"
          title="Menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <div 
          className="logo" 
          onClick={() => onChangeView('farmer')}
          style={{ cursor: 'pointer' }}
          title={t.brandName}
        >
          🚜 <span>{activeView === 'owner' ? t.ownerPortalHeading : activeView === 'admin' ? t.adminHeading : t.brandName}</span>
        </div>
      </div>

      <div className="nav-right">
        {/* Desktop items (> 600px) */}
        <button
          type="button"
          className="btn-nav-bookings desktop-nav-item"
          onClick={onOpenBookingsModal}
          title={t.navMyBookings}
        >
          📋 <span>{t.navMyBookings}</span>
          {bookingCount > 0 && (
            <span className="nav-booking-badge">{bookingCount}</span>
          )}
        </button>

        <button
          type="button"
          className="btn-nav-attach desktop-nav-item"
          onClick={onOpenAttachModal}
          title={t.navAttachBtn}
        >
          🚜 <span>{t.navAttachBtn}</span>
        </button>

        {/* Compact Language Toggle (All screens) */}
        <button
          type="button"
          className="lang-switch-btn nav-lang-btn"
          onClick={onOpenLanguageModal}
          title={t.menuLanguage}
          aria-label={t.menuLanguage}
        >
          🌐 <span id="currentLangTag">{lang === 'hi' ? 'हिंदी' : 'EN'}</span>
        </button>

        {/* Support Phone / WhatsApp button (All screens) */}
        <button
          type="button"
          className="nav-call-icon"
          onClick={onCallSupport}
          title={t.menuHelpline}
          aria-label={t.menuHelpline}
        >
          📞
        </button>
      </div>
    </header>
  );
};
