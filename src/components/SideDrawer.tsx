import React from 'react';
import { Language, UserAuth } from '../types';
import { translations } from '../locales/translations';
import { getSupabaseImageUrl } from '../lib/supabase';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  userAuth: UserAuth;
  onOpenMyBookings: () => void;
  onOpenAttachModal: () => void;
  onOpenLanguageModal: () => void;
  onOpenTermsModal: () => void;
  onCallSupport: () => void;
  onAuthClick: () => void;
  activeView: 'farmer' | 'owner' | 'admin';
  onChangeView: (view: 'farmer' | 'owner' | 'admin') => void;
  bookingCount?: number;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  lang,
  userAuth,
  onOpenMyBookings,
  onOpenAttachModal,
  onOpenLanguageModal,
  onOpenTermsModal,
  onCallSupport,
  onAuthClick,
  activeView,
  onChangeView,
  bookingCount = 0
}) => {
  const t = translations[lang];

  return (
    <>
      <div 
        className={`drawer-overlay ${isOpen ? 'open' : ''}`}
        id="drawerOverlay"
        onClick={onClose}
        style={{ display: isOpen ? 'block' : 'none' }}
      />
      <aside className={`side-drawer ${isOpen ? 'open' : ''}`} id="sideDrawer">
        <div className="drawer-header">
          <div className="drawer-user-info">
            <img 
              src={getSupabaseImageUrl("images/dhan-tractor.jpg")} 
              alt="Farmer Avatar" 
              className="drawer-real-avatar" 
              onError={(e) => {
                const target = e.currentTarget;
                target.src = "images/dhan-tractor.jpg";
              }}
            />
            <div className="drawer-user-meta">
              <h3 id="drawerUserName">
                {userAuth.name ? userAuth.name : (lang === 'hi' ? 'नमस्ते, किसान भाई 🙏' : 'Welcome, Farmer Brother 🙏')}
              </h3>
              <span className="user-badge" id="drawerUserBadge">
                {userAuth.isLoggedIn ? (lang === 'hi' ? 'सत्यापित किसान' : 'Verified Farmer') : t.drawerVerifiedBadge}
              </span>
            </div>
          </div>
          <button 
            type="button" 
            className="drawer-close-btn" 
            onClick={onClose}
            aria-label="Close Drawer"
          >
            &times;
          </button>
        </div>

        <nav className="drawer-menu">
          {/* Farmer section */}
          <button
            type="button"
            className={`drawer-item ${activeView === 'farmer' ? 'active' : ''}`}
            onClick={() => {
              onChangeView('farmer');
              onClose();
            }}
          >
            <span className="drawer-item-icon">🏠</span>
            <span className="item-title">{t.menuHome}</span>
          </button>

          <button
            type="button"
            className="drawer-item"
            onClick={() => {
              onOpenMyBookings();
              onClose();
            }}
          >
            <span className="drawer-item-icon">📋</span>
            <div className="item-text-group">
              <span className="item-title">{t.menuMyBookings}</span>
              <span className="item-sub" id="drawerBookingCount">
                {bookingCount} {lang === 'hi' ? 'बुकिंग' : 'Bookings'}
              </span>
            </div>
          </button>

          <button
            type="button"
            className="drawer-item"
            onClick={() => {
              onCallSupport();
              onClose();
            }}
          >
            <span className="drawer-item-icon">📞</span>
            <span className="item-title">{t.menuHelpline}</span>
          </button>

          <button
            type="button"
            className="drawer-item"
            onClick={() => {
              onOpenTermsModal();
              onClose();
            }}
          >
            <span className="drawer-item-icon">📜</span>
            <span className="item-title">{t.menuTerms}</span>
          </button>

          <button
            type="button"
            className="drawer-item"
            onClick={() => {
              onOpenLanguageModal();
              onClose();
            }}
          >
            <span className="drawer-item-icon">🌐</span>
            <span className="item-title">{t.menuLanguage}</span>
          </button>

          <button
            type="button"
            className="drawer-item"
            id="drawerAuthBtn"
            onClick={() => {
              onAuthClick();
              onClose();
            }}
          >
            <span className="drawer-item-icon" id="drawerAuthIcon">
              {userAuth.isLoggedIn ? '🚪' : '🔑'}
            </span>
            <span className="item-title" id="drawerAuthText">
              {userAuth.isLoggedIn ? t.navLogout : t.navLogin}
            </span>
          </button>

          {/* Dedicated Divider for Tractor Owners */}
          <div className="drawer-section-divider">
            <span>{t.drawerOwnerSectionTitle}</span>
          </div>

          <button
            type="button"
            className={`drawer-item highlight-owner-drawer ${activeView === 'owner' ? 'active' : ''}`}
            onClick={() => {
              onChangeView('owner');
              onClose();
            }}
          >
            <span className="drawer-item-icon">👨‍🌾</span>
            <div className="item-text-group">
              <span className="item-title">{t.menuOwnerPortal}</span>
              <span className="item-sub">{t.menuOwnerPortalSub}</span>
            </div>
          </button>

          <button
            type="button"
            className="drawer-item highlight-item"
            onClick={() => {
              onOpenAttachModal();
              onClose();
            }}
          >
            <span className="drawer-item-icon">🚜</span>
            <div className="item-text-group">
              <span className="item-title">{t.menuRegTractor}</span>
              <span className="item-sub">{t.menuRegTractorSub}</span>
            </div>
          </button>

          {/* Admin link */}
          <button
            type="button"
            className={`drawer-item ${activeView === 'admin' ? 'active' : ''}`}
            onClick={() => {
              onChangeView('admin');
              onClose();
            }}
            style={{ marginTop: '8px', opacity: 0.85 }}
          >
            <span className="drawer-item-icon">⚙️</span>
            <span className="item-title">{t.navAdminPortal}</span>
          </button>
        </nav>

        <div className="drawer-footer">
          <p>🚜 <strong>Project Tractor v1.0</strong></p>
          <p className="drawer-footer-tag">{t.drawerFooterTag}</p>
        </div>
      </aside>
    </>
  );
};
