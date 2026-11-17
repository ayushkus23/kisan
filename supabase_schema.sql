-- ====================================================================
-- PROJECT TRACTOR - COMPLETE SUPABASE DATABASE SCHEMA (PHASE 1 + PHASE 2)
-- Copy and run this ENTIRE script in Supabase Dashboard -> SQL Editor -> Run
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------------------
-- Clean Reset: Drop old conflicting prototype tables if they exist
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS public.bookings CASCADE;
DROP TABLE IF EXISTS public.vehicles CASCADE;
DROP TABLE IF EXISTS public.owners CASCADE;
DROP TABLE IF EXISTS public.admins CASCADE;
DROP SEQUENCE IF EXISTS public.booking_code_seq CASCADE;

-- --------------------------------------------------------------------
-- 2. TABLE: owners
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.owners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    mobile TEXT UNIQUE NOT NULL,
    pin_hash TEXT,
    dl_number TEXT,
    village_district TEXT NOT NULL,
    approved BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- --------------------------------------------------------------------
-- 3. TABLE: vehicles
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES public.owners(id) ON DELETE CASCADE,
    brand_model TEXT NOT NULL,
    drive_type TEXT DEFAULT '2WD' CHECK (drive_type IN ('2WD', '4WD', '2WD / 4WD')),
    rc_number TEXT,
    rate_per_hour NUMERIC NOT NULL,
    rate_with_diesel NUMERIC,
    rate_without_diesel NUMERIC,
    rate_unit TEXT DEFAULT 'घंटा',
    implements TEXT[] DEFAULT '{}',
    village TEXT NOT NULL,
    verified BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    image_url TEXT DEFAULT 'images/dhan-tractor.jpg',
    power TEXT,
    suitable_crops TEXT,
    suitable_work TEXT,
    category TEXT DEFAULT 'all',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- --------------------------------------------------------------------
-- 4. TABLE: bookings
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_code TEXT UNIQUE NOT NULL, -- e.g. TRAC-0001
    vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
    farmer_name TEXT NOT NULL,
    farmer_mobile TEXT NOT NULL,
    village_location TEXT NOT NULL,
    crop TEXT,
    booking_date DATE NOT NULL,
    time_slot TEXT NOT NULL,
    hours NUMERIC NOT NULL CHECK (hours > 0),
    fuel_option TEXT CHECK (fuel_option IN ('with-fuel', 'without-fuel')),
    base_amount NUMERIC NOT NULL,
    travel_charge NUMERIC DEFAULT 0,
    total_amount NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'requested' CHECK (status IN ('requested', 'accepted', 'assigned', 'reached', 'done', 'cancelled')),
    gps_link TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Sequence for readable booking codes: TRAC-0001, TRAC-0002...
CREATE SEQUENCE IF NOT EXISTS public.booking_code_seq START WITH 1;

CREATE OR REPLACE FUNCTION public.set_booking_code()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.booking_code IS NULL OR NEW.booking_code = '' THEN
        NEW.booking_code := 'TRAC-' || LPAD(NEXTVAL('public.booking_code_seq')::TEXT, 4, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_booking_code ON public.bookings;
CREATE TRIGGER trigger_set_booking_code
BEFORE INSERT ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.set_booking_code();

-- --------------------------------------------------------------------
-- 5. TABLE: admins
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================
ALTER TABLE public.owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Vehicles RLS: Anyone can view active vehicles
DROP POLICY IF EXISTS "Public can view active vehicles" ON public.vehicles;
CREATE POLICY "Public can view active vehicles"
ON public.vehicles FOR SELECT
TO anon, authenticated
USING (active = true);

-- Bookings RLS:
-- 1. Farmers can insert new bookings with initial status 'requested'
DROP POLICY IF EXISTS "Public can insert requested booking" ON public.bookings;
CREATE POLICY "Public can insert requested booking"
ON public.bookings FOR INSERT
TO anon, authenticated
WITH CHECK (status = 'requested');

-- 2. Secure RPC: Farmer Lookup by BOTH Booking Code AND Mobile Number
-- Strictly prevents enumeration; no one can list other farmers' bookings
DROP FUNCTION IF EXISTS public.lookup_farmer_booking(TEXT, TEXT);
CREATE OR REPLACE FUNCTION public.lookup_farmer_booking(p_code TEXT, p_mobile TEXT)
RETURNS SETOF public.bookings
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT * FROM public.bookings
    WHERE UPPER(TRIM(booking_code)) = UPPER(TRIM(p_code))
      AND RIGHT(REGEXP_REPLACE(farmer_mobile, '[^0-9]', '', 'g'), 10) = RIGHT(REGEXP_REPLACE(p_mobile, '[^0-9]', '', 'g'), 10)
    LIMIT 1;
$$;

-- 3. Secure RPC: Farmer Cancellation by BOTH Booking Code AND Mobile Number
DROP FUNCTION IF EXISTS public.cancel_farmer_booking(TEXT, TEXT);
CREATE OR REPLACE FUNCTION public.cancel_farmer_booking(p_code TEXT, p_mobile TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_updated INT;
BEGIN
    UPDATE public.bookings
    SET status = 'cancelled'
    WHERE UPPER(TRIM(booking_code)) = UPPER(TRIM(p_code))
      AND RIGHT(REGEXP_REPLACE(farmer_mobile, '[^0-9]', '', 'g'), 10) = RIGHT(REGEXP_REPLACE(p_mobile, '[^0-9]', '', 'g'), 10)
      AND status IN ('requested', 'accepted');
    GET DIAGNOSTICS v_updated = ROW_COUNT;
    RETURN v_updated > 0;
END;
$$;

-- 4. Secure RPC: Fetch Multiple Device Bookings for "My Bookings"
DROP FUNCTION IF EXISTS public.lookup_device_bookings(TEXT[], TEXT);
CREATE OR REPLACE FUNCTION public.lookup_device_bookings(p_codes TEXT[], p_mobile TEXT)
RETURNS SETOF public.bookings
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT * FROM public.bookings
    WHERE booking_code = ANY(p_codes)
      AND (
          p_mobile IS NULL 
          OR p_mobile = '' 
          OR RIGHT(REGEXP_REPLACE(farmer_mobile, '[^0-9]', '', 'g'), 10) = RIGHT(REGEXP_REPLACE(p_mobile, '[^0-9]', '', 'g'), 10)
      )
    ORDER BY created_at DESC;
$$;

-- ====================================================================
-- SEED DATA: 1 Approved Partner + Initial Active Fleet
-- (Vehicles clearly show Verified badge only if verified = true)
-- ====================================================================
INSERT INTO public.owners (id, name, mobile, village_district, approved)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    'प्रोजेक्ट ट्रैक्टर अधिकृत पार्टनर (Verified Demo Partner)',
    '9876543210',
    'मेरठ, उत्तर प्रदेश',
    true
)
ON CONFLICT (mobile) DO UPDATE SET approved = true;

INSERT INTO public.vehicles (
    id, owner_id, brand_model, drive_type, rate_per_hour, rate_with_diesel, rate_without_diesel,
    rate_unit, implements, village, verified, active, image_url, power, suitable_crops, suitable_work, category
) VALUES
(
    '22222222-2222-2222-2222-000000000001',
    '11111111-1111-1111-1111-111111111111',
    'धान 4WD मड-मास्टर ट्रैक्टर (Mahindra 575 DI)',
    '4WD',
    600, 600, 380,
    'घंटा',
    ARRAY['केज व्हील', '6 फीट वेट रोटावेटर'],
    'मेरठ (पश्चिमी यूपी)',
    true, true,
    'images/dhan-tractor.jpg',
    '45-50 HP (4WD)',
    'धान / चावल (Paddy)',
    'कड़वा जुताई (Puddling), कीचड़ तैयार करना',
    'dhan'
),
(
    '22222222-2222-2222-2222-000000000002',
    '11111111-1111-1111-1111-111111111111',
    'सुपर-सीडर व रोटावेटर ट्रैक्टर (Swaraj 855 FE)',
    '2WD',
    550, 550, 350,
    'घंटा',
    ARRAY['7 फीट सुपर सीडर', 'मल्टी-क्रॉप ड्रिल'],
    'मेरठ (पश्चिमी यूपी)',
    true, true,
    'images/gehu-tractor.jpg',
    '50-55 HP',
    'गेहूं, सरसों, चना, मटर',
    'बारीक जुताई व सटीक बीज/खाद बोवाई (बिना पराली जलाए)',
    'gehu'
),
(
    '22222222-2222-2222-2222-000000000003',
    '11111111-1111-1111-1111-111111111111',
    'लेज़र लैंड लेवलर ट्रैक्टर (John Deere 5310)',
    '2WD',
    750, 750, 500,
    'घंटा',
    ARRAY['लेज़र ट्रांसमीटर पोल', '7 फीट लेवलर बकेट'],
    'मेरठ (पश्चिमी यूपी)',
    true, true,
    'images/gehu-tractor.jpg',
    '55-60 HP',
    'धान, गेहूं, गन्ना, सभी फसलें',
    'खेत को 100% समतल करना (30% पानी व खाद बचत)',
    'gehu'
),
(
    '22222222-2222-2222-2222-000000000004',
    '11111111-1111-1111-1111-111111111111',
    'हाई-टॉर्क हैवी ड्यूटी ट्रैक्टर (Sonalika DI 745)',
    '2WD',
    700, 700, 450,
    'घंटा',
    ARRAY['3-बॉटम एमबी हल', '15 टन हैवी ट्रॉली हुक'],
    'मेरठ (पश्चिमी यूपी)',
    true, true,
    'images/ganna-tractor.jpg',
    '55-65 HP',
    'गन्ना, कपास, मक्का',
    'गहरी जुताई, ट्रेन्च बनाना और 15 टन ढुलाई',
    'ganna'
),
(
    '22222222-2222-2222-2222-000000000005',
    '11111111-1111-1111-1111-111111111111',
    'सुपर स्ट्रा रीपर व भूसा मशीन',
    '2WD',
    1100, 1100, 750,
    'एकड़',
    ARRAY['डबल कटर बार', 'हैवी ब्लोअर', 'ट्रॉली अटैचमेंट'],
    'मेरठ (पश्चिमी यूपी)',
    true, true,
    'images/combine-harvester.jpg',
    '50-60 HP',
    'गेहूं, जौ (कटाई के बाद)',
    'पराली काटकर बारीक पौष्टिक भूसा बनाना',
    'gehu'
),
(
    '22222222-2222-2222-2222-000000000006',
    '11111111-1111-1111-1111-111111111111',
    'छोटा चैंपियन नैरो ट्रैक्टर',
    '2WD',
    380, 380, 240,
    'घंटा',
    ARRAY['पोटैटो डिगर', '4 फीट मिनी रोटावेटर'],
    'मेरठ (पश्चिमी यूपी)',
    false, true, -- Verified = false: badge will NOT show!
    'images/compact-tractor.jpg',
    '24-28 HP (Narrow Width)',
    'आलू, प्याज, टमाटर, सब्जियां',
    'क्यारियां बनाना, संकरी जुताई और आलू खुदाई',
    'sabzi'
),
(
    '22222222-2222-2222-2222-000000000007',
    '11111111-1111-1111-1111-111111111111',
    'हाइड्रोलिक ट्रॉली ट्रैक्टर सेट (Farmtrac 60)',
    '2WD',
    450, 450, 290,
    'घंटा',
    ARRAY['डबल एक्सल हाइड्रोलिक लिफ्ट ट्रॉली'],
    'मेरठ (पश्चिमी यूपी)',
    true, true,
    'images/dhulai-tractor.jpg',
    '42-45 HP',
    'सभी फसलें व मंडी ढुलाई',
    'मंडी ढुलाई (एक लीवर से तुरंत खाली होना)',
    'dhulai'
),
(
    '22222222-2222-2222-2222-000000000008',
    '11111111-1111-1111-1111-111111111111',
    'ऑर्चर्ड ब्लोअर-स्प्रेयर ट्रैक्टर',
    '4WD',
    350, 350, 220,
    'घंटा',
    ARRAY['600 लीटर ब्लोअर स्प्रेयर', 'मल्चर'],
    'मेरठ (पश्चिमी यूपी)',
    true, true,
    'images/bagwani-tractor.jpg',
    '20-25 HP 4WD',
    'आम, अमरूद, किन्नू, सब्जियां',
    'कीटनाशक व खाद का तेज ब्लोअर स्प्रे',
    'bagwani'
),
(
    '22222222-2222-2222-2222-000000000009',
    '11111111-1111-1111-1111-111111111111',
    'मल्टी-क्रॉप कंबाइन हार्वेस्टर',
    '4WD',
    1400, 1400, 950,
    'एकड़',
    ARRAY['14 फीट कटर बार', 'ग्रेन क्लीनर टैंक'],
    'मेरठ (पश्चिमी यूपी)',
    true, true,
    'images/combine-harvester.jpg',
    '75-100 HP',
    'धान, गेहूं, सोयाबीन',
    'खड़ी फसल की कटाई, मड़ाई और दाना अलग करना',
    'dhan'
)
ON CONFLICT (id) DO UPDATE SET
    brand_model = EXCLUDED.brand_model,
    rate_per_hour = EXCLUDED.rate_per_hour,
    rate_with_diesel = EXCLUDED.rate_with_diesel,
    rate_without_diesel = EXCLUDED.rate_without_diesel,
    active = EXCLUDED.active;

-- ====================================================================
-- PHASE 2: OWNER AUTHENTICATION, OWNER ACTIONS & ADMIN FUNCTIONS
-- ====================================================================

-- 1. Set default PIN '1234' for verified demo partner
UPDATE public.owners 
SET pin_hash = '1234' 
WHERE mobile = '9876543210';

-- 2. Owner Registration (Mobile + 4-Digit PIN)
CREATE OR REPLACE FUNCTION public.owner_register(
    p_name TEXT,
    p_mobile TEXT,
    p_pin TEXT,
    p_village TEXT,
    p_dl TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_clean_mobile TEXT;
    v_existing_id UUID;
    v_new_id UUID;
BEGIN
    v_clean_mobile := RIGHT(REGEXP_REPLACE(p_mobile, '[^0-9]', '', 'g'), 10);
    IF LENGTH(v_clean_mobile) <> 10 THEN
        RETURN jsonb_build_object('success', false, 'message', 'कृपया 10 अंकों का सही मोबाइल नंबर दर्ज करें');
    END IF;

    IF LENGTH(p_pin) < 4 THEN
        RETURN jsonb_build_object('success', false, 'message', 'पिन कम से कम 4 अंकों का होना चाहिए');
    END IF;

    SELECT id INTO v_existing_id FROM public.owners WHERE mobile = v_clean_mobile;
    IF v_existing_id IS NOT NULL THEN
        RETURN jsonb_build_object('success', false, 'message', 'यह मोबाइल नंबर पहले से पंजीकृत है। कृपया लॉगिन करें।');
    END IF;

    INSERT INTO public.owners (name, mobile, pin_hash, village_district, dl_number, approved)
    VALUES (p_name, v_clean_mobile, p_pin, p_village, p_dl, false)
    RETURNING id INTO v_new_id;

    RETURN jsonb_build_object(
        'success', true,
        'id', v_new_id,
        'name', p_name,
        'mobile', v_clean_mobile,
        'village', p_village,
        'approved', false,
        'message', 'खाता सफलतापूर्वक बन गया है! एडमिन द्वारा अप्रूव होने के बाद आपको बुकिंग्स दिखेंगी।'
    );
END;
$$;

-- 3. Owner Login (Mobile + 4-Digit PIN)
CREATE OR REPLACE FUNCTION public.owner_login(
    p_mobile TEXT,
    p_pin TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_clean_mobile TEXT;
    v_owner RECORD;
BEGIN
    v_clean_mobile := RIGHT(REGEXP_REPLACE(p_mobile, '[^0-9]', '', 'g'), 10);

    SELECT id, name, mobile, pin_hash, village_district, approved
    INTO v_owner
    FROM public.owners
    WHERE mobile = v_clean_mobile;

    IF v_owner.id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'message', 'यह मोबाइल नंबर पंजीकृत नहीं है। कृपया पहले नया खाता बनाएं।');
    END IF;

    IF v_owner.pin_hash <> p_pin THEN
        RETURN jsonb_build_object('success', false, 'message', 'गलत 4-अंकों का पिन। कृपया सही पिन डालें।');
    END IF;

    RETURN jsonb_build_object(
        'success', true,
        'id', v_owner.id,
        'name', v_owner.name,
        'mobile', v_owner.mobile,
        'village', v_owner.village_district,
        'approved', v_owner.approved
    );
END;
$$;

-- 4. Owner Get Bookings (Only for Approved Owners & Their Vehicles)
CREATE OR REPLACE FUNCTION public.owner_get_bookings(
    p_owner_id UUID,
    p_pin TEXT
)
RETURNS SETOF jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_approved BOOLEAN;
    v_valid_pin BOOLEAN;
BEGIN
    SELECT (pin_hash = p_pin), approved
    INTO v_valid_pin, v_approved
    FROM public.owners
    WHERE id = p_owner_id;

    IF v_valid_pin IS NOT TRUE THEN
        RAISE EXCEPTION 'Unauthorized: Invalid PIN';
    END IF;

    IF v_approved IS NOT TRUE THEN
        RETURN;
    END IF;

    RETURN QUERY
    SELECT jsonb_build_object(
        'id', b.id,
        'booking_code', b.booking_code,
        'vehicle_id', b.vehicle_id,
        'vehicle_brand', COALESCE(v.brand_model, 'ट्रैक्टर सेवा'),
        'vehicle_image', COALESCE(v.image_url, 'images/dhan-tractor.jpg'),
        'farmer_name', b.farmer_name,
        'farmer_mobile', b.farmer_mobile,
        'village_location', b.village_location,
        'crop', b.crop,
        'booking_date', b.booking_date,
        'time_slot', b.time_slot,
        'hours', b.hours,
        'fuel_option', b.fuel_option,
        'base_amount', b.base_amount,
        'total_amount', b.total_amount,
        'status', b.status,
        'gps_link', b.gps_link,
        'created_at', b.created_at
    )
    FROM public.bookings b
    LEFT JOIN public.vehicles v ON b.vehicle_id = v.id
    WHERE v.owner_id = p_owner_id
       OR b.vehicle_id IS NULL
    ORDER BY b.created_at DESC;
END;
$$;

-- 5. Owner Update Booking Status (Accept / Reject / Reached / Done)
CREATE OR REPLACE FUNCTION public.owner_update_booking_status(
    p_owner_id UUID,
    p_pin TEXT,
    p_booking_code TEXT,
    p_new_status TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_approved BOOLEAN;
    v_valid_pin BOOLEAN;
    v_booking_id UUID;
BEGIN
    SELECT (pin_hash = p_pin), approved
    INTO v_valid_pin, v_approved
    FROM public.owners
    WHERE id = p_owner_id;

    IF v_valid_pin IS NOT TRUE OR v_approved IS NOT TRUE THEN
        RETURN jsonb_build_object('success', false, 'message', 'अनधिकृत: आपका खाता स्वीकृत नहीं है या पिन गलत है');
    END IF;

    IF p_new_status NOT IN ('accepted', 'assigned', 'reached', 'done', 'cancelled') THEN
        RETURN jsonb_build_object('success', false, 'message', 'अमान्य स्थिति (Invalid status)');
    END IF;

    UPDATE public.bookings
    SET status = p_new_status
    WHERE UPPER(TRIM(booking_code)) = UPPER(TRIM(p_booking_code))
    RETURNING id INTO v_booking_id;

    IF v_booking_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'message', 'बुकिंग नहीं मिली');
    END IF;

    RETURN jsonb_build_object('success', true, 'status', p_new_status, 'message', 'स्थिति सफलतापूर्वक अपडेट हो गई');
END;
$$;

-- 6. Owner Add Vehicle
CREATE OR REPLACE FUNCTION public.owner_add_vehicle(
    p_owner_id UUID,
    p_pin TEXT,
    p_brand TEXT,
    p_drive TEXT,
    p_rc TEXT,
    p_rate NUMERIC,
    p_village TEXT,
    p_implements TEXT[] DEFAULT '{}'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_valid_pin BOOLEAN;
    v_new_id UUID;
BEGIN
    SELECT (pin_hash = p_pin) INTO v_valid_pin
    FROM public.owners
    WHERE id = p_owner_id;

    IF v_valid_pin IS NOT TRUE THEN
        RETURN jsonb_build_object('success', false, 'message', 'अनधिकृत: अमान्य पिन');
    END IF;

    INSERT INTO public.vehicles (
        owner_id, brand_model, drive_type, rc_number, rate_per_hour,
        rate_with_diesel, rate_without_diesel, implements, village, verified, active
    ) VALUES (
        p_owner_id, p_brand, p_drive, p_rc, p_rate,
        p_rate, GREATEST(p_rate - 200, 200), p_implements, p_village, false, true
    )
    RETURNING id INTO v_new_id;

    RETURN jsonb_build_object(
        'success', true,
        'id', v_new_id,
        'message', 'ट्रैक्टर सफलतापूर्वक लिस्ट हो गया (सत्यापन लंबित)'
    );
END;
$$;

-- 7. Admin: Get Overview (All Owners, Bookings, Vehicles)
CREATE OR REPLACE FUNCTION public.admin_get_overview()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_owners JSONB;
    v_bookings JSONB;
    v_vehicles JSONB;
BEGIN
    SELECT COALESCE(jsonb_agg(to_jsonb(o)), '[]'::jsonb)
    INTO v_owners
    FROM (SELECT id, name, mobile, village_district, dl_number, approved, created_at FROM public.owners ORDER BY created_at DESC) o;

    SELECT COALESCE(jsonb_agg(to_jsonb(b)), '[]'::jsonb)
    INTO v_bookings
    FROM (
        SELECT b.*, v.brand_model as vehicle_brand, o.name as owner_name, o.mobile as owner_mobile
        FROM public.bookings b
        LEFT JOIN public.vehicles v ON b.vehicle_id = v.id
        LEFT JOIN public.owners o ON v.owner_id = o.id
        ORDER BY b.created_at DESC
    ) b;

    SELECT COALESCE(jsonb_agg(to_jsonb(v)), '[]'::jsonb)
    INTO v_vehicles
    FROM (
        SELECT v.*, o.name as owner_name, o.mobile as owner_mobile
        FROM public.vehicles v
        LEFT JOIN public.owners o ON v.owner_id = o.id
        ORDER BY v.created_at DESC
    ) v;

    RETURN jsonb_build_object(
        'owners', v_owners,
        'bookings', v_bookings,
        'vehicles', v_vehicles
    );
END;
$$;

-- 8. Admin: Toggle Owner Approval
CREATE OR REPLACE FUNCTION public.admin_toggle_owner_approval(p_owner_id UUID, p_approved BOOLEAN)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    UPDATE public.owners
    SET approved = p_approved
    WHERE id = p_owner_id;
    RETURN FOUND;
END;
$$;

-- 9. Admin: Toggle Vehicle Verification
CREATE OR REPLACE FUNCTION public.admin_toggle_vehicle_verification(p_vehicle_id UUID, p_verified BOOLEAN)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    UPDATE public.vehicles
    SET verified = p_verified
    WHERE id = p_vehicle_id;
    RETURN FOUND;
END;
$$;

-- 10. Admin: Assign Vehicle to Booking
CREATE OR REPLACE FUNCTION public.admin_assign_vehicle(p_booking_code TEXT, p_vehicle_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    UPDATE public.bookings
    SET vehicle_id = p_vehicle_id,
        status = CASE WHEN status = 'requested' THEN 'accepted' ELSE status END
    WHERE UPPER(TRIM(booking_code)) = UPPER(TRIM(p_booking_code));
    RETURN FOUND;
END;
$$;

-- 11. Admin Authentication & Verification Setup
UPDATE auth.users 
SET email_confirmed_at = now() 
WHERE email = 'ayushkushwaha2312@gmail.com';

INSERT INTO public.admins (id, email, role)
SELECT id, email, 'admin'
FROM auth.users
WHERE email = 'ayushkushwaha2312@gmail.com'
ON CONFLICT (id) DO NOTHING;

CREATE OR REPLACE FUNCTION public.admin_login(p_email TEXT, p_password TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, extensions
AS $$
DECLARE
    v_user RECORD;
    v_is_admin BOOLEAN;
BEGIN
    SELECT u.id, u.email, u.encrypted_password
    INTO v_user
    FROM auth.users u
    WHERE LOWER(TRIM(u.email)) = LOWER(TRIM(p_email));

    IF v_user.id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'message', 'यह ईमेल एडमिन के रूप में पंजीकृत नहीं है');
    END IF;

    -- Verify password with crypt
    IF v_user.encrypted_password <> extensions.crypt(p_password, v_user.encrypted_password) THEN
        RETURN jsonb_build_object('success', false, 'message', 'गलत एडमिन पासवर्ड');
    END IF;

    -- Verify admin whitelist
    SELECT EXISTS (
        SELECT 1 FROM public.admins WHERE id = v_user.id OR LOWER(email) = LOWER(v_user.email)
    ) INTO v_is_admin;

    IF NOT v_is_admin AND LOWER(v_user.email) <> 'ayushkushwaha2312@gmail.com' THEN
        RETURN jsonb_build_object('success', false, 'message', 'यह खाता एडमिन के रूप में अधिकृत नहीं है');
    END IF;

    RETURN jsonb_build_object(
        'success', true,
        'id', v_user.id,
        'email', v_user.email,
        'role', 'admin',
        'message', 'एडमिन लॉगिन सफल'
    );
END;
$$;


