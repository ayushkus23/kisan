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
});

function loadOwnerProfile() {
    const rawUser = localStorage.getItem('tractorUser') || 'मालिक';
    const rawProfile = localStorage.getItem('tractorUserProfile');
    let profile = { fullName: rawUser, village: 'भारत' };

    if (rawProfile) {
        try {
            profile = JSON.parse(rawProfile);
        } catch (e) {}
    }

    const name = profile.fullName || rawUser;
    const village = profile.village || 'गांव / जिला';

    // Update Header Chip
    const nameEl = document.getElementById('ownerChipName');
    const locEl = document.getElementById('ownerChipLoc');
    const greetingTitle = document.getElementById('ownerGreetingTitle');

    if (nameEl) nameEl.textContent = name;
    if (locEl) locEl.textContent = `📍 ${village}`;
    if (greetingTitle) {
        greetingTitle.textContent = currentOwnerLang === 'hi' 
            ? `राम-राम, ${name} जी! 🙏` 
            : `Welcome, ${name}! 🙏`;
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
    localStorage.removeItem('tractorUser');
    localStorage.removeItem('tractorUserProfile');
    window.location.replace('login.html');
}

// ==========================================
// 4. Bookings Fetching & State
// ==========================================
async function loadOwnerBookings() {
    let cloudData = null;

    if (sbClient) {
        try {
            const { data, error } = await sbClient
                .from('bookings')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && Array.isArray(data)) {
                cloudData = data;
            }
        } catch (e) {
            console.warn('Supabase fetch bookings error:', e);
        }
    }

    if (cloudData && cloudData.length > 0) {
        ownerBookings = cloudData.map(b => ({
            orderId: b.id,
            machineId: b.machine_id,
            machineTitle: b.machine_name,
            machinePhoto: tractorPhotosMap[b.machine_name] || 'images/dhan-tractor.jpg',
            farmerName: b.farmer_name,
            farmerPhone: b.farmer_phone,
            farmerVillage: b.village,
            gpsLink: b.gps_link,
            duration: `${b.work_duration || 1} ${b.rate_unit || 'घंटे'}`,
            fuelOption: b.fuel_option,
            fuelText: b.fuel_option === 'with-fuel' ? 'डीजल सहित' : 'डीजल किसान का',
            total: Number(b.estimated_cost || 0).toLocaleString('en-IN'),
            rawCost: Number(b.estimated_cost || 0),
            date: b.booking_date || new Date(b.created_at).toLocaleDateString('hi-IN'),
            status: b.status || 'pending',
            createdAt: b.created_at
        }));
    } else {
        // Fallback to localStorage
        const local = localStorage.getItem('tractorBookings');
        if (local) {
            try {
                ownerBookings = JSON.parse(local).map(b => ({
                    ...b,
                    rawCost: parseFloat(String(b.total).replace(/,/g, '')) || 0,
                    status: b.status || 'pending'
                }));
            } catch (e) {
                ownerBookings = [];
            }
        }
    }

    updateKpiMetrics();
    renderOwnerBookings();
}

function refreshOwnerBookings() {
    showOwnerToast('⏳ ताजा डेटा लाया जा रहा है...', '🔄');
    loadOwnerBookings();
    loadOwnerFleet();
}

// ==========================================
// 5. KPI Metrics Calculator
// ==========================================
function updateKpiMetrics() {
    const total = ownerBookings.length;
    const pending = ownerBookings.filter(b => b.status === 'pending').length;
    const accepted = ownerBookings.filter(b => b.status === 'accepted' || b.status === 'confirmed').length;
    const rejected = ownerBookings.filter(b => b.status === 'rejected').length;

    // Sum of accepted earnings
    const earnings = ownerBookings
        .filter(b => b.status === 'accepted' || b.status === 'confirmed')
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

    const t = ownerTranslations[currentOwnerLang] || ownerTranslations.hi;

    let filtered = ownerBookings;
    if (currentOwnerFilter === 'pending') {
        filtered = ownerBookings.filter(b => b.status === 'pending');
    } else if (currentOwnerFilter === 'accepted') {
        filtered = ownerBookings.filter(b => b.status === 'accepted' || b.status === 'confirmed');
    } else if (currentOwnerFilter === 'rejected') {
        filtered = ownerBookings.filter(b => b.status === 'rejected');
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
        const isPending = b.status === 'pending';
        const isAccepted = b.status === 'accepted';
        const isAssigned = b.status === 'assigned';
        const isCompleted = b.status === 'completed' || b.status === 'done';
        const isRejected = b.status === 'rejected';
        const isCancelled = b.status === 'cancelled';

        let statusClass = 'status-pending';
        let statusText = t.statusPending;

        if (isAccepted) {
            statusClass = 'status-accepted';
            statusText = '🤝 स्वीकृत (Accepted)';
        } else if (isAssigned) {
            statusClass = 'status-assigned';
            statusText = '🚜 ड्राइवर रवाना (On Way)';
        } else if (isCompleted) {
            statusClass = 'status-completed';
            statusText = '✅ काम पूरा हुआ (Done)';
        } else if (isRejected) {
            statusClass = 'status-rejected';
            statusText = t.statusRejected;
        } else if (isCancelled) {
            statusClass = 'status-cancelled';
            statusText = t.statusCancelled;
        }

        const phoneClean = (b.farmerPhone || '').replace(/[^0-9]/g, '');
        const photo = b.machinePhoto || 'images/dhan-tractor.jpg';

        return `
            <div class="owner-order-card ${statusClass}">
                <div class="order-card-header">
                    <div class="order-machine-info">
                        <img src="${photo}" alt="${b.machineTitle}" class="order-machine-thumb">
                        <div>
                            <h3 class="order-machine-title">${b.machineTitle}</h3>
                            <span class="order-id-tag">#${b.orderId} • 📅 ${b.date}</span>
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
                        <strong class="detail-value">${b.farmerPhone || 'उपलब्ध नहीं'}</strong>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">📍 खेत का गांव / पता:</span>
                        <span class="detail-value">${b.farmerVillage || 'गांव का नाम'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">⏱️ काम का समय:</span>
                        <span class="detail-value">${b.duration} (${b.fuelText})</span>
                    </div>
                </div>

                <div class="order-footer-bar">
                    <div class="order-cost-box">
                        <span class="cost-label">कुल किराया (Rent):</span>
                        <strong class="cost-amount">₹${b.total}</strong>
                    </div>

                    <div class="order-action-buttons">
                        <!-- Direct Call -->
                        <a href="tel:${phoneClean}" class="btn-action-icon btn-call" title="कॉल करें">
                            📞
                        </a>
                        <!-- WhatsApp Chat -->
                        <a href="https://wa.me/91${phoneClean}?text=Namaste%20${encodeURIComponent(b.farmerName)}%20ji,%20main%20Project%20Tractor%20se%20aapki%20tractor%20booking%20ke%20liye%20sampark%20kar%20raha%20hoon." target="_blank" rel="noopener noreferrer" class="btn-action-icon btn-whatsapp" title="WhatsApp पर पूछें">
                            💬
                        </a>
                        <!-- View GPS Route -->
                        <button type="button" class="btn-action-route" onclick="openRouteModal('${b.orderId}')">
                            ${t.btnViewRoute}
                        </button>

                        <!-- Accept / Reject Actions -->
                        ${isPending ? `
                            <button type="button" class="btn-action-accept" onclick="acceptBooking('${b.orderId}')">
                                ${t.btnAccept}
                            </button>
                            <button type="button" class="btn-action-reject" onclick="rejectBooking('${b.orderId}')">
                                ${t.btnReject}
                            </button>
                        ` : ''}

                        ${isAccepted ? `
                            <button type="button" class="btn-action-dispatch" onclick="dispatchDriver('${b.orderId}')" title="ड्राइवर को खेत की ओर रवाना करें">
                                🚜 ड्राइवर रवाना करें
                            </button>
                            <button type="button" class="btn-action-complete" onclick="completeBooking('${b.orderId}')" title="काम पूरा दर्ज करें">
                                ✅ काम पूरा
                            </button>
                        ` : ''}

                        ${isAssigned ? `
                            <button type="button" class="btn-action-complete" onclick="completeBooking('${b.orderId}')" title="काम पूरा दर्ज करें">
                                ✅ काम पूरा हुआ
                            </button>
                        ` : ''}

                        ${isCompleted ? `
                            <span class="badge-action-done" style="background:#e8f5e9;color:#2e7d32;">🏁 काम पूरा व पेमेंट प्राप्त</span>
                        ` : ''}

                        ${isRejected ? `
                            <span class="badge-action-done rejected">❌ अस्वीकृत</span>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ==========================================
// 7. Accept / Reject Decision Handlers
// ==========================================
async function acceptBooking(orderId) {
    const t = ownerTranslations[currentOwnerLang] || ownerTranslations.hi;
    const target = ownerBookings.find(b => b.orderId === orderId);
    if (!target) return;

    target.status = 'accepted';
    updateKpiMetrics();
    renderOwnerBookings();
    showOwnerToast(t.toastAccepted, '✅');

    // Sync to Supabase
    if (sbClient) {
        try {
            await sbClient
                .from('bookings')
                .update({ status: 'accepted' })
                .eq('id', orderId);
        } catch (e) {
            console.warn('Supabase accept error:', e);
        }
    }

    // Sync to localStorage
    const local = localStorage.getItem('tractorBookings');
    if (local) {
        try {
            const arr = JSON.parse(local);
            const found = arr.find(b => b.orderId === orderId);
            if (found) {
                found.status = 'accepted';
                localStorage.setItem('tractorBookings', JSON.stringify(arr));
            }
        } catch (e) {}
    }
}

async function rejectBooking(orderId) {
    const t = ownerTranslations[currentOwnerLang] || ownerTranslations.hi;
    if (!confirm('क्या आप सच में इस बुकिंग अनुरोध को अस्वीकार (Reject) करना चाहते हैं?')) return;

    const target = ownerBookings.find(b => b.orderId === orderId);
    if (!target) return;

    target.status = 'rejected';
    updateKpiMetrics();
    renderOwnerBookings();
    showOwnerToast(t.toastRejected, '⚠️');

    // Sync to Supabase
    if (sbClient) {
        try {
            await sbClient
                .from('bookings')
                .update({ status: 'rejected' })
                .eq('id', orderId);
        } catch (e) {
            console.warn('Supabase reject error:', e);
        }
    }

    // Sync to localStorage
    const local = localStorage.getItem('tractorBookings');
    if (local) {
        try {
            const arr = JSON.parse(local);
            const found = arr.find(b => b.orderId === orderId);
            if (found) {
                found.status = 'rejected';
                localStorage.setItem('tractorBookings', JSON.stringify(arr));
            }
        } catch (e) {}
    }
}

async function updateOwnerBookingStatus(orderId, newStatus, toastMsg, toastIcon) {
    const target = ownerBookings.find(b => b.orderId === orderId);
    if (!target) return;

    target.status = newStatus;
    updateKpiMetrics();
    renderOwnerBookings();
    if (toastMsg) showOwnerToast(toastMsg, toastIcon || '✅');

    // Sync to Supabase
    if (sbClient) {
        try {
            await sbClient
                .from('bookings')
                .update({ status: newStatus })
                .eq('id', orderId);
        } catch (e) {
            console.warn('Supabase status error:', e);
        }
    }

    // Sync to localStorage
    const local = localStorage.getItem('tractorBookings');
    if (local) {
        try {
            const arr = JSON.parse(local);
            const found = arr.find(b => b.orderId === orderId);
            if (found) {
                found.status = newStatus;
                localStorage.setItem('tractorBookings', JSON.stringify(arr));
            }
        } catch (e) {}
    }
}

async function dispatchDriver(orderId) {
    await updateOwnerBookingStatus(orderId, 'assigned', '🚜 ड्राइवर खेत के लिए रवाना हो गया!', '🚜');
}

async function completeBooking(orderId) {
    if (!confirm('क्या खेत का काम पूरा हो चुका है और किसान से किराया प्राप्त हो गया है?')) return;
    await updateOwnerBookingStatus(orderId, 'completed', '✅ काम पूरा हुआ व पेमेंट प्राप्त!', '🏁');
}

// ==========================================
// 8. Farm GPS Route Modal
// ==========================================
function openRouteModal(orderId) {
    const b = ownerBookings.find(item => item.orderId === orderId);
    if (!b) return;

    const modal = document.getElementById('ownerRouteModal');
    const farmerNameEl = document.getElementById('routeFarmerName');
    const farmerPhoneEl = document.getElementById('routeFarmerPhone');
    const farmerVillageEl = document.getElementById('routeFarmerVillage');
    const callBtn = document.getElementById('btnCallFarmerModal');
    const gmapsBtn = document.getElementById('btnOpenGoogleMaps');

    if (farmerNameEl) farmerNameEl.textContent = b.farmerName || 'किसान भाई';
    if (farmerPhoneEl) farmerPhoneEl.textContent = b.farmerPhone || 'उपलब्ध नहीं';
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
// 9. My Fleet (Registered Tractors)
// ==========================================
async function loadOwnerFleet() {
    let cloudTractors = null;
    const rawUser = localStorage.getItem('tractorUser');

    if (sbClient) {
        try {
            const { data, error } = await sbClient
                .from('custom_tractors')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && Array.isArray(data)) {
                cloudTractors = data;
            }
        } catch (e) {
            console.warn('Supabase fetch fleet error:', e);
        }
    }

    if (cloudTractors && cloudTractors.length > 0) {
        ownerFleet = cloudTractors.map(t => ({
            id: t.id,
            brand: t.tractor_brand,
            rent: t.daily_rent,
            village: t.village,
            ownerName: t.owner_name,
            ownerPhone: t.owner_phone,
            photo: tractorPhotosMap[t.tractor_brand] || 'images/dhan-tractor.jpg',
            status: t.status || 'active'
        }));
    } else {
        // Fallback to localStorage
        const local = localStorage.getItem('customTractors');
        if (local) {
            try {
                ownerFleet = JSON.parse(local).map(t => ({
                    ...t,
                    brand: t.brand || t.tractor_brand,
                    rent: t.rent || t.daily_rent,
                    photo: tractorPhotosMap[t.brand || t.tractor_brand] || 'images/dhan-tractor.jpg',
                    status: 'active'
                }));
            } catch (e) {
                ownerFleet = [];
            }
        }
    }

    // Default sample tractors if empty so owner sees a populated fleet
    if (ownerFleet.length === 0) {
        ownerFleet = [
            {
                id: 'fleet-1',
                brand: 'Mahindra 575 DI (45 HP)',
                rent: 3200,
                village: 'गृह क्षेत्र (Base Garage)',
                photo: 'images/dhan-tractor.jpg',
                status: 'active'
            },
            {
                id: 'fleet-2',
                brand: 'Swaraj 855 FE (52 HP)',
                rent: 3800,
                village: 'गृह क्षेत्र (Base Garage)',
                photo: 'images/gehu-tractor.jpg',
                status: 'active'
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
                <div class="fleet-status-chip">🟢 काम के लिए उपलब्ध (Active)</div>
                <h4 class="fleet-brand-title">${item.brand}</h4>
                <div class="fleet-meta-row">
                    <span>📍 स्थान: ${item.village || 'गांव'}</span>
                    <strong class="fleet-rent-tag">₹${Number(item.rent).toLocaleString('en-IN')}/दिन</strong>
                </div>
            </div>
        </div>
    `).join('');
}

// ==========================================
// 10. Add Tractor Modal Handler
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
    const t = ownerTranslations[currentOwnerLang] || ownerTranslations.hi;

    const brand = document.getElementById('newTractorBrand')?.value;
    const rent = parseFloat(document.getElementById('newTractorRent')?.value) || 3000;
    const village = document.getElementById('newTractorVillage')?.value || '';
    const rawUser = localStorage.getItem('tractorUser') || 'मालिक';
    const profile = JSON.parse(localStorage.getItem('tractorUserProfile') || '{}');

    if (!brand || !rent || !village) return;

    const newTractor = {
        id: 'tractor-' + Date.now(),
        owner_name: profile.fullName || rawUser,
        owner_phone: profile.phone || '9876543210',
        village: village,
        tractor_brand: brand,
        daily_rent: rent,
        status: 'active',
        created_at: new Date().toISOString()
    };

    // Save to Supabase
    if (sbClient) {
        try {
            await sbClient.from('custom_tractors').insert([newTractor]);
        } catch (e) {
            console.warn('Supabase add tractor error:', e);
        }
    }

    // Save to local fleet list
    ownerFleet.unshift({
        id: newTractor.id,
        brand: brand,
        rent: rent,
        village: village,
        photo: tractorPhotosMap[brand] || 'images/dhan-tractor.jpg',
        status: 'active'
    });

    renderOwnerFleet();
    closeOwnerTractorModal();
    showOwnerToast(t.toastTractorAdded, '🚜');
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

