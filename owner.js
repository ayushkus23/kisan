// ==========================================
// Project Tractor — Tractor Owner Portal Controller
// File: owner.js
// ==========================================

// 1. Supabase Cloud Client
const SUPABASE_URL = 'https://dtyimtqwvdlhqipsmnpi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0eWltdHF3dmRsaHFpcHNtbnBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQxOTYzNzQsImV4cCI6MjEwOTc3MjM3NH0.FA1mEc44H431jJMv39QfTDkKEbe3gotqwKqKawYH_Ek';

let sbClient = null;
try {
    if (window.supabase && typeof window.supabase.createClient === 'function') {
        sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
} catch (e) {
    console.warn('Owner Portal Supabase warning:', e);
}

// 2. Bilingual Translations for Owner Portal
const ownerTranslations = {
    hi: {
        ownerPortalTitle: "प्रोजेक्ट ट्रैक्टर",
        ownerBadgeTag: "मालिक डैशबोर्ड",
        btnSwitchFarmer: "🌾 किसान पोर्टल",
        btnLogout: "🚪 लॉगआउट",
        ownerHeroPill: "🚜 ट्रैक्टर मालिक कंट्रोल रूम",
        ownerHeroSubtitle: "आपके ट्रैक्टरों के लिए आये सभी बुकिंग अनुरोध, खेत का GPS रास्ता, और कमाई का लाइव ब्यौरा यहाँ देखें।",
        btnAddFleetTractor: "➕ नया ट्रैक्टर जोड़ें",
        kpiTotalRequests: "कुल बुकिंग अनुरोध",
        kpiPendingRequests: "स्वीकृति की प्रतीक्षा (Pending)",
        kpiAcceptedRequests: "स्वीकृत बुकिंग्स (Confirmed)",
        kpiTotalEarnings: "संभावित कुल कमाई",
        sectionRequestsTitle: "आये हुए बुकिंग अनुरोध (Booking Orders)",
        sectionRequestsSubtitle: "किसान भाइयों ने आपके ट्रैक्टर के लिए यह अनुरोध भेजे हैं। खेत का रास्ता देखें और स्वीकार/अस्वीकार करें।",
        tabAll: "सभी",
        tabPending: "⏳ नये अनुरोध",
        tabAccepted: "✅ स्वीकृत",
        tabRejected: "❌ अस्वीकृत",
        sectionFleetTitle: "मेरे पंजीकृत ट्रैक्टर (My Fleet)",
        sectionFleetSubtitle: "आपके द्वारा पोर्टल पर जोड़े गए ट्रैक्टर जिनकी बुकिंग किसान भाई कर सकते हैं।",
        btnAddTractor: "➕ ट्रैक्टर जोड़ें",
        statusPending: "⏳ निर्णय बाकी (Pending)",
        statusAccepted: "✅ स्वीकृत (Confirmed)",
        statusRejected: "❌ अस्वीकृत (Rejected)",
        statusCancelled: "🚫 किसान ने रद्द किया",
        btnAccept: "✅ स्वीकार करें (Accept)",
        btnReject: "❌ अस्वीकार करें (Reject)",
        btnViewRoute: "📍 खेत का GPS रास्ता",
        btnCallFarmer: "📞 कॉल करें",
        btnWhatsAppFarmer: "💬 WhatsApp",
        emptyRequestsTitle: "कोई बुकिंग अनुरोध नहीं मिला",
        emptyRequestsDesc: "इस श्रेणी में अभी कोई बुकिंग अनुरोध मौजूद नहीं है।",
        emptyFleetTitle: "कोई ट्रैक्टर नहीं जुड़ा है",
        emptyFleetDesc: "अपना पहला ट्रैक्टर जोड़ें और किसानों से बुकिंग पाना शुरू करें।",
        toastAccepted: "✅ बुकिंग सफलतापूर्वक स्वीकार कर ली गई!",
        toastRejected: "⚠️ बुकिंग अस्वीकार कर दी गई।",
        toastTractorAdded: "🎉 नया ट्रैक्टर सफलतापूर्वक लिस्ट हो गया!"
    },
    en: {
        ownerPortalTitle: "Project Tractor",
        ownerBadgeTag: "Owner Dashboard",
        btnSwitchFarmer: "🌾 Farmer Portal",
        btnLogout: "🚪 Logout",
        ownerHeroPill: "🚜 Tractor Owner Control Room",
        ownerHeroSubtitle: "Review incoming tractor rental requests, inspect farm GPS route, and manage your earnings here.",
        btnAddFleetTractor: "➕ Add New Tractor",
        kpiTotalRequests: "Total Requests",
        kpiPendingRequests: "Awaiting Action (Pending)",
        kpiAcceptedRequests: "Accepted Bookings (Confirmed)",
        kpiTotalEarnings: "Estimated Total Earnings",
        sectionRequestsTitle: "Incoming Booking Requests",
        sectionRequestsSubtitle: "Farmers requested your machinery. Inspect farm location and Accept or Reject orders.",
        tabAll: "All",
        tabPending: "⏳ Pending",
        tabAccepted: "✅ Accepted",
        tabRejected: "❌ Rejected",
        sectionFleetTitle: "My Registered Tractors (My Fleet)",
        sectionFleetSubtitle: "Tractors registered by you available for booking by farmers.",
        btnAddTractor: "➕ Add Tractor",
        statusPending: "⏳ Pending Decision",
        statusAccepted: "✅ Accepted (Confirmed)",
        statusRejected: "❌ Rejected",
        statusCancelled: "🚫 Cancelled by Farmer",
        btnAccept: "✅ Accept Booking",
        btnReject: "❌ Reject Booking",
        btnViewRoute: "📍 View Farm GPS Route",
        btnCallFarmer: "📞 Call Farmer",
        btnWhatsAppFarmer: "💬 WhatsApp",
        emptyRequestsTitle: "No Booking Requests Found",
        emptyRequestsDesc: "There are currently no booking requests in this filter.",
        emptyFleetTitle: "No Tractors in Fleet",
        emptyFleetDesc: "Register your first tractor and start receiving bookings from local farmers.",
        toastAccepted: "✅ Booking successfully accepted!",
        toastRejected: "⚠️ Booking has been rejected.",
        toastTractorAdded: "🎉 New tractor listed successfully!"
    }
};

let currentOwnerLang = localStorage.getItem('tractorLang') || 'hi';
let currentOwnerFilter = 'all';
let ownerBookings = [];
let ownerFleet = [];

// Real photo mappings
const tractorPhotosMap = {
    "Mahindra 575 DI (45 HP)": "images/dhan-tractor.jpg",
    "Swaraj 855 FE (52 HP)": "images/gehu-tractor.jpg",
    "John Deere 5310 (55 HP)": "images/ganna-tractor.jpg",
    "Sonalika DI 745 (50 HP)": "images/ganna-tractor.jpg",
    "Massey Ferguson 241 (42 HP)": "images/dhan-tractor.jpg",
    "Farmtrac 60 (50 HP)": "images/dhulai-tractor.jpg",
    "Chhota Mini Tractor (24 HP)": "images/compact-tractor.jpg",
    "Combine Harvester (Multi-Crop)": "images/combine-harvester.jpg"
};

// ==========================================
// 3. Page Initialization & User Loading
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    loadOwnerProfile();
    applyOwnerLanguage(currentOwnerLang);
    loadOwnerBookings();
    loadOwnerFleet();
    loadOwnerCallbacks();
});

function getOwnerSession() {
    const raw = localStorage.getItem('tractorOwnerSession');
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
}

function loadOwnerProfile() {
    const session = getOwnerSession();
    const rawUser = localStorage.getItem('tractorUser') || 'मालिक';
    const rawProfile = localStorage.getItem('tractorUserProfile');
    let profile = { fullName: rawUser, village: 'भारत' };

    if (rawProfile) {
        try { profile = JSON.parse(rawProfile); } catch (e) {}
    }

    const name = (session && session.name) || profile.fullName || rawUser;
    const village = (session && session.village) || profile.village || 'गांव / जिला';
    const isApproved = session ? session.approved === true : true;

    // Update Header Chip
    const nameEl = document.getElementById('ownerChipName');
    const locEl = document.getElementById('ownerChipLoc');
    const greetingTitle = document.getElementById('ownerGreetingTitle');
    const bannerEl = document.getElementById('unapprovedBanner');

    if (nameEl) {
        nameEl.innerHTML = `${name} ${isApproved ? '<span style="color:#10b981;font-size:11px;font-weight:700;">✓ अधिकृत</span>' : '<span style="color:#f59e0b;font-size:11px;font-weight:700;">⏳ अप्रूवल लंबित</span>'}`;
    }
    if (locEl) locEl.textContent = `📍 ${village}`;
    if (greetingTitle) {
        greetingTitle.textContent = currentOwnerLang === 'hi' 
            ? `राम-राम, ${name} जी! 🙏` 
            : `Welcome, ${name}! 🙏`;
    }

    // Toggle unapproved banner
    if (bannerEl) {
        bannerEl.style.display = isApproved ? 'none' : 'flex';
    }
}

function applyOwnerLanguage(lang) {
    currentOwnerLang = lang;
    localStorage.setItem('tractorLang', lang);

    const langTag = document.getElementById('ownerLangTag');
    if (langTag) {
        langTag.textContent = lang === 'hi' ? 'हिंदी' : 'English';
    }

    const t = ownerTranslations[lang] || ownerTranslations.hi;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.textContent = t[key];
        }
    });

    renderOwnerBookings();
    renderOwnerFleet();
}

function toggleOwnerLanguage() {
    const nextLang = currentOwnerLang === 'hi' ? 'en' : 'hi';
    applyOwnerLanguage(nextLang);
}

function ownerLogout() {
    localStorage.removeItem('tractorOwnerSession');
    localStorage.removeItem('tractorUser');
    localStorage.removeItem('tractorUserProfile');
    window.location.replace('login.html');
}

// ==========================================
// 4. Bookings Fetching & State via Phase 2 RPC
// ==========================================
async function loadOwnerBookings() {
    const session = getOwnerSession();

    // 1. If owner is not approved, strictly show zero bookings and pending banner
    if (session && session.approved !== true) {
        ownerBookings = [];
        updateKpiMetrics();
        renderOwnerBookings();
        return;
    }

    let cloudData = null;

    // 2. Fetch via secure RPC owner_get_bookings
    if (sbClient && session && session.id && session.pin) {
        try {
            const { data, error } = await sbClient.rpc('owner_get_bookings', {
                p_owner_id: session.id,
                p_pin: session.pin
            });

            if (!error && Array.isArray(data)) {
                cloudData = data;
            } else if (error) {
                console.warn('owner_get_bookings RPC error:', error);
            }
        } catch (e) {
            console.warn('RPC invocation failed:', e);
        }
    }

    if (cloudData && cloudData.length > 0) {
        ownerBookings = cloudData.map(b => ({
            orderId: b.booking_code || b.id,
            bookingCode: b.booking_code,
            machineId: b.vehicle_id,
            machineTitle: b.vehicle_brand || 'ट्रैक्टर सेवा',
            machinePhoto: b.vehicle_image || tractorPhotosMap[b.vehicle_brand] || 'images/dhan-tractor.jpg',
            farmerName: b.farmer_name || 'किसान भाई',
            farmerPhone: b.farmer_mobile || '',
            farmerVillage: b.village_location || 'खेत का स्थान',
            gpsLink: b.gps_link,
            crop: b.crop || '',
            duration: `${b.hours || 1} घंटे`,
            fuelOption: b.fuel_option,
            fuelText: b.fuel_option === 'with-fuel' ? 'डीजल सहित' : 'डीजल किसान का',
            total: Number(b.total_amount || b.base_amount || 0).toLocaleString('en-IN'),
            rawCost: Number(b.total_amount || b.base_amount || 0),
            date: b.booking_date || new Date(b.created_at).toLocaleDateString('hi-IN'),
            timeSlot: b.time_slot || '',
            status: b.status || 'requested',
            createdAt: b.created_at
        }));
    } else {
        // Fallback to local storage only if offline/demo
        const local = localStorage.getItem('tractorBookings');
        if (local && (!session || session.approved === true)) {
            try {
                ownerBookings = JSON.parse(local).map(b => ({
                    ...b,
                    bookingCode: b.bookingCode || b.orderId,
                    rawCost: parseFloat(String(b.total).replace(/,/g, '')) || 0,
                    status: b.status || 'requested'
                }));
            } catch (e) {
                ownerBookings = [];
            }
        } else {
            ownerBookings = [];
        }
    }

    updateKpiMetrics();
    renderOwnerBookings();
}

function refreshOwnerBookings() {
    showOwnerToast('⏳ ताजा डेटा लाया जा रहा है...', '🔄');
    loadOwnerProfile();
    loadOwnerBookings();
    loadOwnerFleet();
    loadOwnerCallbacks();
}

// ==========================================
// 5. KPI Metrics Calculator
// ==========================================
function updateKpiMetrics() {
    const total = ownerBookings.length;
    const pending = ownerBookings.filter(b => b.status === 'requested' || b.status === 'pending').length;
    const accepted = ownerBookings.filter(b => ['accepted', 'assigned', 'reached', 'done', 'confirmed'].includes(b.status)).length;
    const rejected = ownerBookings.filter(b => b.status === 'cancelled' || b.status === 'rejected').length;

    // Sum of confirmed/done earnings
    const earnings = ownerBookings
        .filter(b => ['accepted', 'assigned', 'reached', 'done', 'confirmed'].includes(b.status))
        .reduce((sum, b) => sum + (b.rawCost || 0), 0);

    // Update KPI UI
    const totalEl = document.getElementById('statTotalRequests');
    const pendingEl = document.getElementById('statPendingRequests');
    const acceptedEl = document.getElementById('statAcceptedRequests');
    const earningsEl = document.getElementById('statTotalEarnings');

    if (totalEl) totalEl.textContent = total;
    if (pendingEl) pendingEl.textContent = pending;
    if (acceptedEl) acceptedEl.textContent = accepted;
    if (earningsEl) earningsEl.textContent = `₹${earnings.toLocaleString('en-IN')}`;

    // Update Tab Counters
    const tabAllEl = document.getElementById('countTabAll');
    const tabPendEl = document.getElementById('countTabPending');
    const tabAccEl = document.getElementById('countTabAccepted');
    const tabRejEl = document.getElementById('countTabRejected');

    if (tabAllEl) tabAllEl.textContent = total;
    if (tabPendEl) tabPendEl.textContent = pending;
    if (tabAccEl) tabAccEl.textContent = accepted;
    if (tabRejEl) tabRejEl.textContent = rejected;
}

// ==========================================
// 6. Filtering & Rendering Bookings
// ==========================================
function filterOwnerBookings(filter, btnEl) {
    currentOwnerFilter = filter;
    document.querySelectorAll('.owner-tab-btn').forEach(btn => btn.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    renderOwnerBookings();
}

function renderOwnerBookings() {
    const container = document.getElementById('ownerBookingsList');
    if (!container) return;

    const session = getOwnerSession();
    const t = ownerTranslations[currentOwnerLang] || ownerTranslations.hi;

    // If unapproved owner, show clear awaiting message
    if (session && session.approved !== true) {
        container.innerHTML = `
            <div class="owner-empty-box" style="border: 2px dashed #f59e0b; background: #fffdf5; padding: 36px 20px;">
                <div class="empty-icon" style="font-size: 48px;">⏳</div>
                <h3 style="color: #92400e;">खाता सत्यापन में है (Under Admin Review)</h3>
                <p style="max-width: 520px; margin: 10px auto; color: #78350f;">
                    आपका खाता सुरक्षा कारणों से एडमिन द्वारा सत्यापित किया जा रहा है। सत्यापन पूरा होते ही आपके गाँव व आस-पास के किसान भाइयों के सभी बुकिंग अनुरोध यहाँ तुरंत लाइव दिखाई देंगे।
                </p>
                <button type="button" class="btn btn-refresh-quick" onclick="refreshOwnerBookings()" style="margin-top: 14px;">
                    🔄 स्टेटस पुनः जांचें
                </button>
            </div>
        `;
        return;
    }

    let filtered = ownerBookings;
    if (currentOwnerFilter === 'pending') {
        filtered = ownerBookings.filter(b => b.status === 'requested' || b.status === 'pending');
    } else if (currentOwnerFilter === 'accepted') {
        filtered = ownerBookings.filter(b => ['accepted', 'assigned', 'reached', 'done', 'confirmed'].includes(b.status));
    } else if (currentOwnerFilter === 'rejected') {
        filtered = ownerBookings.filter(b => b.status === 'cancelled' || b.status === 'rejected');
    }

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="owner-empty-box">
                <div class="empty-icon">🌾</div>
                <h3>${t.emptyRequestsTitle}</h3>
                <p>${t.emptyRequestsDesc}</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(b => {
        const isRequested = b.status === 'requested' || b.status === 'pending';
        const isAccepted = b.status === 'accepted';
        const isAssigned = b.status === 'assigned';
        const isReached = b.status === 'reached';
        const isDone = b.status === 'done' || b.status === 'completed';
        const isCancelled = b.status === 'cancelled' || b.status === 'rejected';

        let statusClass = 'status-pending';
        let statusText = '⏳ नया अनुरोध (Pending)';

        if (isAccepted) {
            statusClass = 'status-accepted';
            statusText = '🤝 स्वीकृत (Order Accepted)';
        } else if (isAssigned) {
            statusClass = 'status-assigned';
            statusText = '🚜 ड्राइवर रवाना (On Way)';
        } else if (isReached) {
            statusClass = 'status-reached';
            statusText = '📍 खेत पहुंचे (Work in Progress)';
        } else if (isDone) {
            statusClass = 'status-completed';
            statusText = '✅ काम पूरा (Done)';
        } else if (isCancelled) {
            statusClass = 'status-cancelled';
            statusText = '❌ रद्द / अस्वीकृत (Cancelled)';
        }

        const phoneClean = (b.farmerPhone || '').replace(/[^0-9]/g, '');
        const photo = b.machinePhoto || 'images/dhan-tractor.jpg';
        const displayCode = b.bookingCode || b.orderId;

        return `
            <div class="owner-order-card ${statusClass}">
                <div class="order-card-header">
                    <div class="order-machine-info">
                        <img src="${photo}" alt="${b.machineTitle}" class="order-machine-thumb">
                        <div>
                            <h3 class="order-machine-title">${b.machineTitle}</h3>
                            <span class="order-id-tag">कोड: <strong>${displayCode}</strong> • 📅 ${b.date}</span>
                        </div>
                    </div>
                    <span class="order-status-pill ${statusClass}">${statusText}</span>
                </div>

                <div class="order-details-grid">
                    <div class="detail-item">
                        <span class="detail-label">👨‍🌾 किसान का नाम:</span>
                        <strong class="detail-value">${b.farmerName || 'अज्ञात किसान'}</strong>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">📞 मोबाइल नंबर:</span>
                        <strong class="detail-value">${b.farmerPhone ? '+91 ' + b.farmerPhone : 'उपलब्ध नहीं'}</strong>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">📍 खेत का गांव / पता:</span>
                        <span class="detail-value">${b.farmerVillage || 'गांव का नाम'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">⏱️ काम का समय / स्लॉट:</span>
                        <span class="detail-value">${b.duration} (${b.fuelText}) ${b.timeSlot ? '• ' + b.timeSlot : ''}</span>
                    </div>
                </div>

                <div class="order-footer-bar">
                    <div class="order-cost-box">
                        <span class="cost-label">कुल किराया (Rent):</span>
                        <strong class="cost-amount">₹${b.total}</strong>
                    </div>

                    <div class="order-action-buttons">
                        <!-- Direct Call -->
                        ${phoneClean ? `
                            <a href="tel:${phoneClean}" class="btn-action-icon btn-call" title="कॉल करें">
                                📞
                            </a>
                            <a href="https://wa.me/91${phoneClean}?text=Namaste%20${encodeURIComponent(b.farmerName)}%20ji,%20main%20Project%20Tractor%20se%20aapki%20booking%20${encodeURIComponent(displayCode)}%20ke%20silsile%20mein%20sampark%20kar%20raha%20hoon." target="_blank" rel="noopener noreferrer" class="btn-action-icon btn-whatsapp" title="WhatsApp पर पूछें">
                                💬
                            </a>
                        ` : ''}

                        <!-- View GPS Route -->
                        <button type="button" class="btn-action-route" onclick="openRouteModal('${displayCode}')">
                            ${t.btnViewRoute}
                        </button>

                        <!-- Step 1: When Requested -> Accept or Reject -->
                        ${isRequested ? `
                            <button type="button" class="btn-action-accept" onclick="updateOwnerBookingStatus('${displayCode}', 'accepted')">
                                ✅ स्वीकारें (Accept)
                            </button>
                            <button type="button" class="btn-action-reject" onclick="updateOwnerBookingStatus('${displayCode}', 'cancelled')">
                                ❌ अस्वीकारें (Reject)
                            </button>
                        ` : ''}

                        <!-- Step 2: When Accepted -> Dispatch Driver -->
                        ${isAccepted ? `
                            <button type="button" class="btn-action-dispatch" onclick="updateOwnerBookingStatus('${displayCode}', 'assigned')" title="ड्राइवर रवाना करें">
                                🚜 ड्राइवर रवाना (On Way)
                            </button>
                        ` : ''}

                        <!-- Step 3: When Assigned -> Mark Reached Farm -->
                        ${isAssigned ? `
                            <button type="button" class="btn-action-reached" onclick="updateOwnerBookingStatus('${displayCode}', 'reached')" title="खेत पहुंचे मार्क करें">
                                📍 खेत पहुंचे (Mark Reached)
                            </button>
                        ` : ''}

                        <!-- Step 4: When Reached -> Mark Done / Completed -->
                        ${isReached ? `
                            <button type="button" class="btn-action-complete" onclick="updateOwnerBookingStatus('${displayCode}', 'done')" title="काम पूरा दर्ज करें">
                                🏁 काम पूरा हुआ (Mark Done)
                            </button>
                        ` : ''}

                        <!-- Completed Badge -->
                        ${isDone ? `
                            <span class="badge-action-done" style="background:#e8f5e9;color:#2e7d32;padding:6px 12px;border-radius:6px;font-weight:700;">
                                🏁 काम पूरा व पेमेंट प्राप्त
                            </span>
                        ` : ''}

                        <!-- Cancelled Badge -->
                        ${isCancelled ? `
                            <span class="badge-action-done rejected" style="background:#fef2f2;color:#dc2626;padding:6px 12px;border-radius:6px;font-weight:700;">
                                ❌ रद्द / अस्वीकृत
                            </span>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ==========================================
// 7. Live Status Transitions via Phase 2 RPC
// ==========================================
async function updateOwnerBookingStatus(bookingCode, newStatus) {
    const session = getOwnerSession();
    if (!session || !session.id || !session.pin) {
        alert('मालिक सत्र समाप्त हो गया है। कृपया पुनः लॉगिन करें।');
        window.location.replace('login.html');
        return;
    }

    if (newStatus === 'cancelled' && !confirm('क्या आप सच में इस बुकिंग को अस्वीकार (Reject) करना चाहते हैं?')) {
        return;
    }

    if (newStatus === 'done' && !confirm('क्या खेत का काम पूरा हो चुका है और किसान से किराया प्राप्त हो गया है?')) {
        return;
    }

    showOwnerToast('⏳ स्थिति अपडेट की जा रही है...', '🔄');

    // 1. Call Secure Supabase RPC
    if (sbClient) {
        try {
            const { data, error } = await sbClient.rpc('owner_update_booking_status', {
                p_owner_id: session.id,
                p_pin: session.pin,
                p_booking_code: bookingCode,
                p_new_status: newStatus
            });

            if (error || !data || !data.success) {
                const msg = (data && data.message) || (error && error.message) || 'त्रुटि हुई';
                showOwnerToast(`⚠️ ${msg}`, '⚠️');
                return;
            }
        } catch (e) {
            console.warn('owner_update_booking_status error:', e);
        }
    }

    // 2. Update local state & UI
    const target = ownerBookings.find(b => b.bookingCode === bookingCode || b.orderId === bookingCode);
    if (target) {
        target.status = newStatus;
    }

    updateKpiMetrics();
    renderOwnerBookings();

    const statusLabels = {
        accepted: 'बुकिंग सफलतापूर्वक स्वीकार कर ली गई!',
        assigned: 'ड्राइवर खेत की ओर रवाना हो गया!',
        reached: 'ट्रैक्टर खेत पर पहुंच गया!',
        done: 'काम सफलतापूर्वक पूरा दर्ज हुआ व पेमेंट प्राप्त!',
        cancelled: 'बुकिंग अस्वीकार/रद्द कर दी गई।'
    };
    showOwnerToast(`✅ ${statusLabels[newStatus] || 'अपडेट सफल!'}`, '✅');
}

// ==========================================
// 8. Farm GPS Route Modal
// ==========================================
function openRouteModal(orderId) {
    const b = ownerBookings.find(item => item.orderId === orderId || item.bookingCode === orderId);
    if (!b) return;

    const modal = document.getElementById('ownerRouteModal');
    const farmerNameEl = document.getElementById('routeFarmerName');
    const farmerPhoneEl = document.getElementById('routeFarmerPhone');
    const farmerVillageEl = document.getElementById('routeFarmerVillage');
    const callBtn = document.getElementById('btnCallFarmerModal');
    const gmapsBtn = document.getElementById('btnOpenGoogleMaps');

    if (farmerNameEl) farmerNameEl.textContent = b.farmerName || 'किसान भाई';
    if (farmerPhoneEl) farmerPhoneEl.textContent = b.farmerPhone ? '+91 ' + b.farmerPhone : 'उपलब्ध नहीं';
    if (farmerVillageEl) farmerVillageEl.textContent = b.farmerVillage || 'खेत का गांव';

    const cleanPhone = (b.farmerPhone || '').replace(/[^0-9]/g, '');
    if (callBtn) callBtn.href = `tel:${cleanPhone}`;

    // Destination GPS navigation link
    let navUrl = b.gpsLink;
    if (!navUrl || navUrl.indexOf('google.com/maps') === -1) {
        // Fallback: search query with village name
        navUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.farmerVillage || 'Kisan Farm')}`;
    }
    if (gmapsBtn) gmapsBtn.href = navUrl;

    if (modal) modal.style.display = 'flex';
}

function closeRouteModal() {
    const modal = document.getElementById('ownerRouteModal');
    if (modal) modal.style.display = 'none';
}

// ==========================================
// 9. My Fleet via public.vehicles table
// ==========================================
async function loadOwnerFleet() {
    const session = getOwnerSession();
    let cloudTractors = null;

    if (sbClient && session && session.id) {
        try {
            const { data, error } = await sbClient
                .from('vehicles')
                .select('*')
                .eq('owner_id', session.id)
                .order('created_at', { ascending: false });

            if (!error && Array.isArray(data)) {
                cloudTractors = data;
            }
        } catch (e) {
            console.warn('Supabase fetch vehicles error:', e);
        }
    }

    if (cloudTractors && cloudTractors.length > 0) {
        ownerFleet = cloudTractors.map(t => ({
            id: t.id,
            brand: t.brand_model,
            rent: t.rate_per_hour || t.rate_with_diesel,
            village: t.village || 'गृह क्षेत्र',
            photo: t.image_url || tractorPhotosMap[t.brand_model] || 'images/dhan-tractor.jpg',
            verified: t.verified === true,
            active: t.active === true
        }));
    } else {
        // Fallback demo fleet for verified partner
        ownerFleet = [
            {
                id: 'fleet-1',
                brand: 'धान 4WD मड-मास्टर ट्रैक्टर (Mahindra 575 DI)',
                rent: 600,
                village: 'मेरठ (पश्चिमी यूपी)',
                photo: 'images/dhan-tractor.jpg',
                verified: true,
                active: true
            },
            {
                id: 'fleet-2',
                brand: 'सुपर-सीडर व रोटावेटर ट्रैक्टर (Swaraj 855 FE)',
                rent: 550,
                village: 'मेरठ (पश्चिमी यूपी)',
                photo: 'images/gehu-tractor.jpg',
                verified: true,
                active: true
            }
        ];
    }

    renderOwnerFleet();
}

function renderOwnerFleet() {
    const container = document.getElementById('ownerFleetList');
    if (!container) return;
    const t = ownerTranslations[currentOwnerLang] || ownerTranslations.hi;

    if (ownerFleet.length === 0) {
        container.innerHTML = `
            <div class="owner-empty-box">
                <div class="empty-icon">🚜</div>
                <h3>${t.emptyFleetTitle}</h3>
                <p>${t.emptyFleetDesc}</p>
            </div>
        `;
        return;
    }

    container.innerHTML = ownerFleet.map(item => `
        <div class="fleet-card">
            <img src="${item.photo || 'images/dhan-tractor.jpg'}" alt="${item.brand}" class="fleet-card-img">
            <div class="fleet-card-body">
                <div class="fleet-status-chip ${item.verified ? 'verified-chip' : 'pending-chip'}" style="margin-bottom:8px; font-weight:700;">
                    ${item.verified ? '🟢 सत्यापित ट्रैक्टर (Verified)' : '⏳ सत्यापन लंबित (Pending Admin Approval)'}
                </div>
                <h4 class="fleet-brand-title">${item.brand}</h4>
                <div class="fleet-meta-row">
                    <span>📍 स्थान: ${item.village || 'गांव'}</span>
                    <strong class="fleet-rent-tag">₹${Number(item.rent).toLocaleString('en-IN')}/घंटा</strong>
                </div>
            </div>
        </div>
    `).join('');
}

// ==========================================
// 10. Add Tractor Modal via owner_add_vehicle RPC
// ==========================================
function openOwnerTractorModal() {
    const modal = document.getElementById('ownerAddTractorModal');
    if (modal) modal.style.display = 'flex';
}

function closeOwnerTractorModal() {
    const modal = document.getElementById('ownerAddTractorModal');
    if (modal) modal.style.display = 'none';
}

async function handleOwnerAddTractor(event) {
    event.preventDefault();
    const session = getOwnerSession();
    if (!session || !session.id || !session.pin) {
        alert('कृपया पहले लॉगिन करें।');
        return;
    }

    const brand = document.getElementById('newTractorBrand')?.value;
    const drive = document.getElementById('newTractorDrive')?.value || '2WD';
    const rc = document.getElementById('newTractorRC')?.value || 'RC-APPLIED';
    const rent = parseFloat(document.getElementById('newTractorRent')?.value) || 550;
    const village = document.getElementById('newTractorVillage')?.value || session.village || '';

    if (!brand || !rent || !village) return;

    showOwnerToast('⏳ ट्रैक्टर जोड़ा जा रहा है...', '🚜');

    if (sbClient) {
        try {
            const { data, error } = await sbClient.rpc('owner_add_vehicle', {
                p_owner_id: session.id,
                p_pin: session.pin,
                p_brand: brand,
                p_drive: drive,
                p_rc: rc,
                p_rate: rent,
                p_village: village,
                p_implements: ['रोटावेटर', 'कल्टीवेटर']
            });

            if (error || !data || !data.success) {
                showOwnerToast((data && data.message) || 'जोड़ने में त्रुटि', '⚠️');
                return;
            }
        } catch (e) {
            console.warn('owner_add_vehicle error:', e);
        }
    }

    // Add to local fleet
    ownerFleet.unshift({
        id: 'fleet-' + Date.now(),
        brand: brand,
        rent: rent,
        village: village,
        photo: tractorPhotosMap[brand] || 'images/dhan-tractor.jpg',
        verified: false,
        active: true
    });

    renderOwnerFleet();
    closeOwnerTractorModal();
    showOwnerToast('🎉 नया ट्रैक्टर सफलतापूर्वक लिस्ट हो गया (सत्यापन लंबित)!', '🚜');
}

// ==========================================
// 11. Toast Notifications
// ==========================================
function showOwnerToast(msg, icon = '✅') {
    const toast = document.getElementById('ownerToast');
    const iconEl = document.getElementById('ownerToastIcon');
    const textEl = document.getElementById('ownerToastText');

    if (!toast) return;

    if (iconEl) iconEl.textContent = icon;
    if (textEl) textEl.textContent = msg;

    toast.style.display = 'flex';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3500);
}

// ==========================================
// 12. Farmer Call Back Requests (24h Auto-Clean)
// ==========================================
let ownerCallbacks = [];

async function loadOwnerCallbacks() {
    const listEl = document.getElementById('ownerCallbackList');
    const badgeEl = document.getElementById('badgePendingCalls');
    if (!listEl) return;

    const cutoff = Date.now() - 24 * 60 * 60 * 1000;
    const cutoffISO = new Date(cutoff).toISOString();

    let callbacks = [];

    // 1. Fetch from Supabase
    if (sbClient) {
        try {
            // Auto clean records older than 24h
            sbClient.from('callback_requests').delete().lt('created_at', cutoffISO).then();

            const { data, error } = await sbClient
                .from('callback_requests')
                .select('*')
                .order('created_at', { ascending: false });

            if (data && !error) {
                callbacks = data;
            }
        } catch (e) {
            console.warn('Supabase fetch callbacks error:', e);
        }
    }

    // 2. Fallback / Merge with LocalStorage
    try {
        const local = JSON.parse(localStorage.getItem('tractorCallbackRequests') || '[]');
        // Local clean older than 24h
        const freshLocal = local.filter(r => new Date(r.created_at || r.requested_at).getTime() > cutoff);
        localStorage.setItem('tractorCallbackRequests', JSON.stringify(freshLocal));

        // Merge any not in Supabase list
        freshLocal.forEach(locItem => {
            if (!callbacks.some(c => c.id === locItem.id || (c.phone === locItem.phone && Math.abs(new Date(c.created_at).getTime() - new Date(locItem.created_at).getTime()) < 5000))) {
                callbacks.push(locItem);
            }
        });
    } catch (e) {}

    // Sort newest first
    callbacks.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    ownerCallbacks = callbacks;

    // Update pending badge
    const pendingCount = callbacks.filter(c => c.status === 'pending').length;
    if (badgeEl) {
        badgeEl.textContent = `⏳ ${pendingCount} कॉल बाकी`;
        badgeEl.style.display = callbacks.length > 0 ? 'inline-block' : 'none';
    }

    renderOwnerCallbacks();
}

function renderOwnerCallbacks() {
    const listEl = document.getElementById('ownerCallbackList');
    if (!listEl) return;

    if (!ownerCallbacks || ownerCallbacks.length === 0) {
        listEl.innerHTML = `
            <div class="owner-empty-state" style="padding: 24px 16px;">
                <div class="empty-icon">📞</div>
                <h4>पिछले 24 घंटे में कोई कॉल अनुरोध नहीं</h4>
                <p>जब भी कोई किसान सहायता केंद्र से कॉल बैक मांगेगा, उसका नंबर यहाँ तुरंत दिखेगा।</p>
            </div>
        `;
        return;
    }

    listEl.innerHTML = ownerCallbacks.map(req => {
        const isCalled = req.status === 'called';
        const phone = req.phone || '';
        const name = req.farmer_name || 'किसान भाई';
        const village = req.village || 'किसान सहायता केंद्र';
        const timeAgo = formatTimeAgo(req.created_at);
        const waMsg = encodeURIComponent(`नमस्ते ${name}! आपने प्रोजेक्ट ट्रैक्टर किसान सहायता केंद्र पर कॉल बैक का अनुरोध किया था। बताइए आपकी क्या सहायता कर सकते हैं?`);

        return `
            <div class="callback-card-item ${isCalled ? 'status-called' : 'status-pending'}">
                <div class="callback-info-main">
                    <div class="callback-farmer-row">
                        <span>👤 ${name}</span>
                        <span class="callback-time-badge">⏱️ ${timeAgo}</span>
                        ${isCalled ? '<span style="color:#10b981;font-size:12px;font-weight:700;">✅ कॉल हो चुकी</span>' : '<span style="color:#f97316;font-size:12px;font-weight:700;">⏳ कॉल बाकी</span>'}
                    </div>
                    <div class="callback-phone-row">
                        📱 +91 ${phone}
                    </div>
                    <div class="callback-location-row">
                        📍 ${village}
                    </div>
                </div>

                <div class="callback-actions-row">
                    <a href="tel:${phone}" class="btn-call-direct" title="सीधे फोन से कॉल करें">
                        📞 अभी कॉल करें
                    </a>
                    <a href="https://wa.me/91${phone}?text=${waMsg}" target="_blank" class="btn-wa-direct" title="WhatsApp पर बात करें">
                        💬 WhatsApp
                    </a>
                    ${!isCalled ? `
                        <button type="button" class="btn-mark-called" onclick="markCallbackDone('${req.id}')" title="कॉल पूरी हुई मार्क करें">
                            ✅ बात हो गई
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

async function markCallbackDone(id) {
    const target = ownerCallbacks.find(c => c.id === id);
    if (!target) return;

    target.status = 'called';

    // Update in LocalStorage
    try {
        const local = JSON.parse(localStorage.getItem('tractorCallbackRequests') || '[]');
        const locTarget = local.find(c => c.id === id);
        if (locTarget) locTarget.status = 'called';
        localStorage.setItem('tractorCallbackRequests', JSON.stringify(local));
    } catch (e) {}

    // Update in Supabase
    if (sbClient) {
        try {
            await sbClient.from('callback_requests').update({ status: 'called' }).eq('id', id);
        } catch (e) {}
    }

    renderOwnerCallbacks();
    showOwnerToast('✅ किसान से बात पूरी हुई दर्ज किया गया!', '📞');
}

function formatTimeAgo(isoString) {
    if (!isoString) return 'अभी';
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    if (diffMins < 1) return 'अभी-अभी';
    if (diffMins < 60) return `${diffMins} मिनट पहले`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} घंटे पहले`;
    return 'आज';
}

