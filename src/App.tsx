import React, { useState, useEffect } from 'react';
import { Language, Booking, UserAuth } from './types';
import { FleetItem, initialFleetData } from './data/initialData';
import { Navbar } from './components/Navbar';
import { SideDrawer } from './components/SideDrawer';
import { FarmerPortal } from './components/FarmerPortal';
import { OwnerPortal } from './components/OwnerPortal';
import { AdminPortal } from './components/AdminPortal';
import { BookingWizardModal } from './components/BookingWizardModal';
import { TractorRegModal } from './components/TractorRegModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { WelcomeModal } from './components/WelcomeModal';
import { LanguageModal } from './components/LanguageModal';
import { TermsModal } from './components/TermsModal';

export const App: React.FC = () => {
  // 1. Language state (persist in localStorage)
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('kisan_lang');
    return saved === 'en' ? 'en' : 'hi';
  });

  // 2. Active View (sync with URL ?view=owner | ?view=admin)
  const [activeView, setActiveView] = useState<'farmer' | 'owner' | 'admin'>(() => {
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view');
    if (view === 'owner' || view === 'admin') return view;
    return 'farmer';
  });

  useEffect(() => {
    const currentParam = new URLSearchParams(window.location.search).get('view') || 'farmer';
    if (currentParam !== activeView) {
      const url = activeView === 'farmer' ? window.location.pathname : `?view=${activeView}`;
      window.history.replaceState(null, '', url);
    }
  }, [activeView]);

  // 3. User Authentication state
  const [userAuth, setUserAuth] = useState<UserAuth>(() => {
    try {
      const stored = localStorage.getItem('kisan_user');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn(e);
    }
    return { isLoggedIn: false, isGuest: false };
  });

  // 4. Modals state
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedVehicle, setSelectedVehicle] = useState<FleetItem | null>(null);
  const [isAttachModalOpen, setIsAttachModalOpen] = useState<boolean>(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState<boolean>(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState<boolean>(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState<boolean>(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState<boolean>(() => {
    // Show welcome modal if new user and not chosen guest or logged in
    const visited = localStorage.getItem('kisan_welcomed');
    return !visited;
  });

  // 5. Bookings list
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('farmer_bookings') || '[]');
    } catch {
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleSelectLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('kisan_lang', newLang);
  };

  const handleBookingSuccess = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
    showToast(
      lang === 'hi'
        ? '✓ बुकिंग अनुरोध सफलतापूर्वक भेजा गया!'
        : '✓ Booking request submitted successfully!'
    );
  };

  const handleCallSupport = () => {
    const phone = '9876543210';
    window.location.href = `tel:${phone}`;
  };

  const handleWelcomeGuest = () => {
    localStorage.setItem('kisan_welcomed', 'true');
    setUserAuth({ isLoggedIn: false, isGuest: true, name: lang === 'hi' ? 'गेस्ट किसान' : 'Guest Farmer' });
    setIsWelcomeModalOpen(false);
  };

  const handleWelcomeLogin = () => {
    localStorage.setItem('kisan_welcomed', 'true');
    setUserAuth({ isLoggedIn: true, isGuest: false, name: lang === 'hi' ? 'किसान भाई' : 'Verified Farmer' });
    setIsWelcomeModalOpen(false);
    showToast(lang === 'hi' ? 'सफलतापूर्वक लॉगिन हुआ!' : 'Logged in successfully!');
  };

  return (
    <div className="app-container">
      {/* Toast Banner */}
      {toastMessage && (
        <div 
          style={{
            position: 'fixed',
            top: '70px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#166534',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: '24px',
            fontWeight: 700,
            zIndex: 10000,
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        lang={lang}
        activeView={activeView}
        onChangeView={setActiveView}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenLanguageModal={() => setIsLangModalOpen(true)}
        onOpenBookingsModal={() => setIsMyBookingsOpen(true)}
        onOpenAttachModal={() => setIsAttachModalOpen(true)}
        onCallSupport={handleCallSupport}
        bookingCount={bookings.length}
      />

      {/* 3-Line Side Drawer */}
      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        lang={lang}
        userAuth={userAuth}
        activeView={activeView}
        onChangeView={setActiveView}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        onOpenAttachModal={() => setIsAttachModalOpen(true)}
        onOpenLanguageModal={() => setIsLangModalOpen(true)}
        onOpenTermsModal={() => setIsTermsModalOpen(true)}
        onCallSupport={handleCallSupport}
        onAuthClick={() => {
          if (userAuth.isLoggedIn) {
            setUserAuth({ isLoggedIn: false, isGuest: false });
            localStorage.removeItem('kisan_user');
            showToast(lang === 'hi' ? 'लॉगआउट हो गया।' : 'Logged out.');
          } else {
            handleWelcomeLogin();
          }
        }}
        bookingCount={bookings.length}
      />

      {/* View Switcher */}
      {activeView === 'farmer' && (
        <FarmerPortal
          lang={lang}
          onSelectVehicle={v => setSelectedVehicle(v)}
          onOpenMyBookings={() => setIsMyBookingsOpen(true)}
          onOpenAttachModal={() => setIsAttachModalOpen(true)}
          onCallSupport={handleCallSupport}
          latestBooking={bookings[0] || null}
        />
      )}

      {activeView === 'owner' && (
        <OwnerPortal
          lang={lang}
          onSwitchToFarmer={() => setActiveView('farmer')}
          onLogout={() => {
            setActiveView('farmer');
            showToast(lang === 'hi' ? 'मालिक पोर्टल से बाहर आ गए।' : 'Switched to Farmer Portal.');
          }}
        />
      )}

      {activeView === 'admin' && (
        <AdminPortal
          lang={lang}
          onSwitchToFarmer={() => setActiveView('farmer')}
        />
      )}

      {/* Booking Wizard Modal */}
      {selectedVehicle && (
        <BookingWizardModal
          vehicle={selectedVehicle}
          isOpen={Boolean(selectedVehicle)}
          onClose={() => setSelectedVehicle(null)}
          lang={lang}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* Tractor Attachment Modal */}
      <TractorRegModal
        isOpen={isAttachModalOpen}
        onClose={() => setIsAttachModalOpen(false)}
        lang={lang}
      />

      {/* My Bookings Lookup Modal */}
      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        lang={lang}
        bookings={bookings}
      />

      {/* Welcome Onboarding Modal */}
      <WelcomeModal
        isOpen={isWelcomeModalOpen}
        onClose={() => setIsWelcomeModalOpen(false)}
        lang={lang}
        onLoginClick={handleWelcomeLogin}
        onRegisterClick={handleWelcomeLogin}
        onGuestClick={handleWelcomeGuest}
      />

      {/* Language Switch Modal */}
      <LanguageModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
        currentLang={lang}
        onSelectLang={handleSelectLang}
      />

      {/* Terms & Policies Modal */}
      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        lang={lang}
      />
    </div>
  );
};
