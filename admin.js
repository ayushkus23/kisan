// ==========================================
// Project Tractor — Admin Portal Controller
// File: admin.js
// ==========================================

const SUPABASE_URL = 'https://dtyimtqwvdlhqipsmnpi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0eWltdHF3dmRsaHFpcHNtbnBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQxOTYzNzQsImV4cCI6MjEwOTc3MjM3NH0.FA1mEc44H431jJMv39QfTDkKEbe3gotqwKqKawYH_Ek';

let sbClient = null;
try {
    if (window.supabase && typeof window.supabase.createClient === 'function') {
        sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
} catch (e) {
    console.warn('Admin Supabase client init warning:', e);
}

let adminData = {
    owners: [],
    vehicles: [],
    bookings: []
};

let currentAdminTab = 'owners';

// ==========================================
// 1. Initialization & Session Check
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    checkAdminAuth();
});

function checkAdminAuth() {
    const sessionRaw = sessionStorage.getItem('tractorAdminSession');
    const authScreen = document.getElementById('adminAuthScreen');
    const dashScreen = document.getElementById('adminDashboardScreen');
    const navActions = document.getElementById('adminNavActions');

    if (sessionRaw) {
        if (authScreen) authScreen.style.display = 'none';
        if (dashScreen) dashScreen.style.display = 'block';
        if (navActions) navActions.style.display = 'flex';
        loadAdminOverview();
    } else {
        if (authScreen) authScreen.style.display = 'block';
        if (dashScreen) dashScreen.style.display = 'none';
        if (navActions) navActions.style.display = 'none';
    }
}

async function handleAdminLogin(event) {
    event.preventDefault();
    const emailInput = document.getElementById('adminEmail');
    const passwordInput = document.getElementById('adminPassword');

    let email = emailInput ? emailInput.value.trim().toLowerCase() : '';
    const password = passwordInput ? passwordInput.value.trim() : '';

    if (!email || !password) {
        showAdminMsg('कृपया अपनी ईमेल/यूजरनेम और पासवर्ड दर्ज करें', 'error');
        return;
    }

    // Allow full email or user shortcuts (ayush, admin, ayushkushwaha2312)
    const allowedUsernames = [
        'ayushkushwaha2312@gmail.com',
        'ayush',
        'admin',
        'ayushkus23',
        'ayushkushwaha2312'
    ];

    if (allowedUsernames.includes(email)) {
        email = 'ayushkushwaha2312@gmail.com'; // map to verified admin email
    } else {
        showAdminMsg('⚠️ अनधिकृत ईमेल! केवल अधिकृत एडमिन (ayushkushwaha2312@gmail.com) ही लॉगिन कर सकते हैं।', 'error');
        return;
    }

    showAdminMsg('⏳ एडमिन प्रमाणीकरण हो रहा है...', 'info');

    let authSuccess = false;
    let adminEmail = email;

    // 1. Supabase Auth (Encrypted check)
    if (sbClient && sbClient.auth) {
        try {
            const { data, error } = await sbClient.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (!error && data && data.user) {
                authSuccess = true;
                adminEmail = data.user.email;
            }
        } catch (e) {
            console.warn('Supabase auth sign in check:', e);
        }
    }

    // 2. Fallback to secure PostgreSQL RPC (admin_login)
    if (!authSuccess && sbClient) {
        try {
            const { data: rpcRes, error: rpcErr } = await sbClient.rpc('admin_login', {
                p_email: email,
                p_password: password
            });

            if (!rpcErr && rpcRes && rpcRes.success) {
                authSuccess = true;
                adminEmail = rpcRes.email;
            } else if (rpcRes && rpcRes.message) {
                showAdminMsg(rpcRes.message, 'error');
                return;
            }
        } catch (e) {
            console.warn('RPC admin_login check:', e);
        }
    }

    if (!authSuccess) {
        showAdminMsg('गलत एडमिन पासवर्ड। कृपया सही पासवर्ड दर्ज करें।', 'error');
        return;
    }

    sessionStorage.setItem('tractorAdminSession', JSON.stringify({
        email: adminEmail,
        timestamp: Date.now()
    }));

    showAdminMsg('✅ प्रमाणीकरण सफल! एडमिन कंट्रोल रूम खोला जा रहा है...', 'success');
    setTimeout(() => {
        checkAdminAuth();
    }, 600);
}

function showAdminMsg(text, type) {
    const box = document.getElementById('adminLoginMsg');
    if (!box) return;
    box.textContent = text;
    box.className = 'message-box ' + type;
    box.style.display = 'block';
}

function adminLogout() {
    sessionStorage.removeItem('tractorAdminSession');
    if (sbClient && sbClient.auth) {
        sbClient.auth.signOut().then();
    }
    checkAdminAuth();
}

// ==========================================
// 2. Load Overview Data via admin_get_overview RPC
// ==========================================
async function loadAdminOverview() {
    if (!sbClient) return;

    try {
        const { data, error } = await sbClient.rpc('admin_get_overview');
        if (error) {
            console.warn('admin_get_overview error:', error);
            return;
        }

        if (data) {
            adminData.owners = Array.isArray(data.owners) ? data.owners : [];
            adminData.vehicles = Array.isArray(data.vehicles) ? data.vehicles : [];
            adminData.bookings = Array.isArray(data.bookings) ? data.bookings : [];
        }
    } catch (e) {
        console.warn('Failed to load admin overview:', e);
    }

    renderAdminKpis();
    renderAdminOwners();
    renderAdminFleet();
    renderAdminBookings();
}

function refreshAdminData() {
    loadAdminOverview();
}

// ==========================================
// 3. Tab Switching
// ==========================================
function switchAdminTab(tabName) {
    currentAdminTab = tabName;

    document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('adminOwnersView').style.display = 'none';
    document.getElementById('adminFleetView').style.display = 'none';
    document.getElementById('adminBookingsView').style.display = 'none';

    if (tabName === 'owners') {
        document.getElementById('tabOwnersBtn').classList.add('active');
        document.getElementById('adminOwnersView').style.display = 'block';
    } else if (tabName === 'fleet') {
        document.getElementById('tabFleetBtn').classList.add('active');
        document.getElementById('adminFleetView').style.display = 'block';
    } else if (tabName === 'bookings') {
        document.getElementById('tabBookingsBtn').classList.add('active');
        document.getElementById('adminBookingsView').style.display = 'block';
    }
}

// ==========================================
// 4. Render KPI Cards
// ==========================================
function renderAdminKpis() {
    const owners = adminData.owners || [];
    const vehicles = adminData.vehicles || [];
    const bookings = adminData.bookings || [];

    const totalOwners = owners.length;
    const pendingOwners = owners.filter(o => o.approved !== true).length;

    const totalVehicles = vehicles.length;
    const verifiedVehicles = vehicles.filter(v => v.verified === true).length;

    const totalBookings = bookings.length;
    const requestedBookings = bookings.filter(b => b.status === 'requested').length;

    const totalVolume = bookings.reduce((sum, b) => sum + Number(b.total_amount || b.base_amount || 0), 0);

    // Update KPI UI
    const ownersEl = document.getElementById('statAdminOwners');
    const pendOwnersEl = document.getElementById('statPendingOwnersLabel');
    const vehEl = document.getElementById('statAdminVehicles');
    const verVehEl = document.getElementById('statVerifiedFleetLabel');
    const bookEl = document.getElementById('statAdminBookings');
    const reqBookEl = document.getElementById('statRequestedBookingsLabel');
    const volEl = document.getElementById('statAdminTotalVolume');

    if (ownersEl) ownersEl.textContent = totalOwners;
    if (pendOwnersEl) pendOwnersEl.textContent = `⏳ ${pendingOwners} अप्रूवल लंबित`;
    if (vehEl) vehEl.textContent = totalVehicles;
    if (verVehEl) verVehEl.textContent = `🟢 ${verifiedVehicles} सत्यापित`;
    if (bookEl) bookEl.textContent = totalBookings;
    if (reqBookEl) reqBookEl.textContent = `⏳ ${requestedBookings} नए अनुरोध`;
    if (volEl) volEl.textContent = `₹${totalVolume.toLocaleString('en-IN')}`;

    // Update Tab Badges
    const bOwners = document.getElementById('tabOwnersBadge');
    const bFleet = document.getElementById('tabFleetBadge');
    const bBook = document.getElementById('tabBookingsBadge');

    if (bOwners) bOwners.textContent = pendingOwners > 0 ? `⏳ ${pendingOwners}` : totalOwners;
    if (bFleet) bFleet.textContent = totalVehicles - verifiedVehicles > 0 ? `⏳ ${totalVehicles - verifiedVehicles}` : totalVehicles;
    if (bBook) bBook.textContent = requestedBookings > 0 ? `⏳ ${requestedBookings}` : totalBookings;
}

// ==========================================
// 5. Render Owners Tab
// ==========================================
function renderAdminOwners() {
    const tbody = document.getElementById('adminOwnersTableBody');
    if (!tbody) return;

    const owners = adminData.owners || [];
    if (owners.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 24px; color:#607d8b;">कोई ट्रैक्टर मालिक पंजीकृत नहीं है</td></tr>`;
        return;
    }

    tbody.innerHTML = owners.map(o => {
        const isApproved = o.approved === true;
        const createdDate = o.created_at ? new Date(o.created_at).toLocaleDateString('hi-IN') : '—';
        const cleanMobile = (o.mobile || '').replace(/[^0-9]/g, '').slice(-10);

        return `
            <tr>
                <td><strong>${o.name || 'मालिक'}</strong></td>
                <td>
                    <a href="tel:${cleanMobile}" style="color:#1f5130; text-decoration:none; font-weight:700;">
                        📞 +91 ${cleanMobile}
                    </a>
                </td>
                <td>📍 ${o.village_district || 'गांव'}</td>
                <td><code style="background:#eef4ec; padding:2px 6px; border-radius:4px;">${o.dl_number || 'RC/DL लंबित'}</code></td>
                <td>${createdDate}</td>
                <td>
                    ${isApproved
                        ? '<span class="admin-pill pill-green">✅ स्वीकृत (Approved)</span>'
                        : '<span class="admin-pill pill-amber">⏳ अप्रूवल लंबित</span>'
                    }
                </td>
                <td style="text-align: right;">
                    ${isApproved
                        ? `<button type="button" class="btn-admin-action btn-revoke" onclick="toggleOwnerApproval('${o.id}', false)">❌ अप्रूवल हटाएं</button>`
                        : `<button type="button" class="btn-admin-action btn-approve" onclick="toggleOwnerApproval('${o.id}', true)">✅ स्वीकृत करें (Approve)</button>`
                    }
                </td>
            </tr>
        `;
    }).join('');
}

async function toggleOwnerApproval(ownerId, newApprovalStatus) {
    if (!sbClient) return;

    try {
        const { data, error } = await sbClient.rpc('admin_toggle_owner_approval', {
            p_owner_id: ownerId,
            p_approved: newApprovalStatus
        });

        if (error) {
            alert('स्थिति बदलने में त्रुटि: ' + error.message);
            return;
        }

        // Update in memory
        const target = adminData.owners.find(o => o.id === ownerId);
        if (target) {
            target.approved = newApprovalStatus;
        }

        renderAdminKpis();
        renderAdminOwners();
    } catch (e) {
        console.warn('toggleOwnerApproval failed:', e);
    }
}

// ==========================================
// 6. Render Fleet Tab
// ==========================================
function renderAdminFleet() {
    const tbody = document.getElementById('adminFleetTableBody');
    if (!tbody) return;

    const vehicles = adminData.vehicles || [];
    if (vehicles.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 24px; color:#607d8b;">कोई ट्रैक्टर फ्लीट में मौजूद नहीं है</td></tr>`;
        return;
    }

    tbody.innerHTML = vehicles.map(v => {
        const isVerified = v.verified === true;
        const rate = v.rate_per_hour || v.rate_with_diesel || 550;
        const ownerContact = v.owner_mobile ? `+91 ${v.owner_mobile}` : '';

        return `
            <tr>
                <td>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <img src="${v.image_url || 'images/dhan-tractor.jpg'}" alt="" style="width:36px; height:36px; border-radius:6px; object-fit:cover;">
                        <strong>${v.brand_model || 'ट्रैक्टर'}</strong>
                    </div>
                </td>
                <td>
                    ${v.owner_name || 'मालिक'}
                    ${ownerContact ? `<br><small style="color:#607d8b;">${ownerContact}</small>` : ''}
                </td>
                <td><strong>₹${Number(rate).toLocaleString('en-IN')}</strong></td>
                <td>📍 ${v.village || 'गांव'}</td>
                <td><span class="admin-pill pill-blue">${v.drive_type || '2WD'}</span></td>
                <td>
                    ${isVerified
                        ? '<span class="admin-pill pill-green">🟢 सत्यापित (Verified)</span>'
                        : '<span class="admin-pill pill-amber">⏳ सत्यापन बाकी</span>'
                    }
                </td>
                <td style="text-align: right;">
                    ${isVerified
                        ? `<button type="button" class="btn-admin-action btn-revoke" onclick="toggleVehicleVerification('${v.id}', false)">✕ अन-वेरिफाई</button>`
                        : `<button type="button" class="btn-admin-action btn-approve" onclick="toggleVehicleVerification('${v.id}', true)">✓ सत्यापित करें (Verify)</button>`
                    }
                </td>
            </tr>
        `;
    }).join('');
}

async function toggleVehicleVerification(vehicleId, newVerificationStatus) {
    if (!sbClient) return;

    try {
        const { data, error } = await sbClient.rpc('admin_toggle_vehicle_verification', {
            p_vehicle_id: vehicleId,
            p_verified: newVerificationStatus
        });

        if (error) {
            alert('सत्यापन स्थिति बदलने में त्रुटि: ' + error.message);
            return;
        }

        const target = adminData.vehicles.find(v => v.id === vehicleId);
        if (target) {
            target.verified = newVerificationStatus;
        }

        renderAdminKpis();
        renderAdminFleet();
    } catch (e) {
        console.warn('toggleVehicleVerification failed:', e);
    }
}

// ==========================================
// 7. Render All Bookings Tab
// ==========================================
function renderAdminBookings() {
    const tbody = document.getElementById('adminBookingsTableBody');
    if (!tbody) return;

    const bookings = adminData.bookings || [];
    const vehicles = adminData.vehicles || [];

    if (bookings.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 24px; color:#607d8b;">कोई किसान बुकिंग उपलब्ध नहीं है</td></tr>`;
        return;
    }

    tbody.innerHTML = bookings.map(b => {
        const code = b.booking_code || '—';
        const cleanFarmerPhone = (b.farmer_mobile || '').replace(/[^0-9]/g, '').slice(-10);
        const total = Number(b.total_amount || b.base_amount || 0).toLocaleString('en-IN');
        const st = b.status || 'requested';

        let statusPill = `<span class="admin-pill pill-amber">⏳ नया अनुरोध</span>`;
        if (st === 'accepted') statusPill = `<span class="admin-pill pill-green">🤝 स्वीकृत</span>`;
        if (st === 'assigned') statusPill = `<span class="admin-pill pill-blue">🚜 ड्राइवर रवाना</span>`;
        if (st === 'reached') statusPill = `<span class="admin-pill pill-blue">📍 खेत पहुंचे</span>`;
        if (st === 'done') statusPill = `<span class="admin-pill pill-green">🏁 काम पूरा</span>`;
        if (st === 'cancelled') statusPill = `<span class="admin-pill pill-red">❌ रद्द</span>`;

        // Vehicle assignment dropdown options
        const vehicleOptions = vehicles.map(v => `
            <option value="${v.id}" ${b.vehicle_id === v.id ? 'selected' : ''}>
                ${v.brand_model} (${v.owner_name || 'मालिक'})
            </option>
        `).join('');

        return `
            <tr>
                <td><strong style="color:#1f5130;">${code}</strong></td>
                <td>
                    <strong>${b.farmer_name || 'किसान भाई'}</strong><br>
                    <a href="tel:${cleanFarmerPhone}" style="color:#607d8b; text-decoration:none; font-size:12px;">
                        📞 +91 ${cleanFarmerPhone}
                    </a>
                </td>
                <td>📍 ${b.village_location || 'स्थान'}</td>
                <td>
                    ${b.booking_date || '—'}<br>
                    <small style="color:#607d8b;">${b.time_slot || ''}</small>
                </td>
                <td>
                    🌾 ${b.crop || 'फसल'}<br>
                    <small style="color:#607d8b;">${b.hours || 1} घंटे</small>
                </td>
                <td><strong>₹${total}</strong></td>
                <td>${statusPill}</td>
                <td>
                    <select class="admin-assign-select" onchange="assignVehicleToBooking('${code}', this.value)">
                        <option value="">-- ट्रैक्टर चुनें --</option>
                        ${vehicleOptions}
                    </select>
                </td>
            </tr>
        `;
    }).join('');
}

async function assignVehicleToBooking(bookingCode, vehicleId) {
    if (!sbClient || !vehicleId) return;

    try {
        const { data, error } = await sbClient.rpc('admin_assign_vehicle', {
            p_booking_code: bookingCode,
            p_vehicle_id: vehicleId
        });

        if (error) {
            alert('ट्रैक्टर असाइन करने में त्रुटि: ' + error.message);
            return;
        }

        const target = adminData.bookings.find(b => b.booking_code === bookingCode);
        if (target) {
            target.vehicle_id = vehicleId;
            if (target.status === 'requested') target.status = 'accepted';
        }

        renderAdminKpis();
        renderAdminBookings();
    } catch (e) {
        console.warn('assignVehicleToBooking failed:', e);
    }
}
