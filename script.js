// Project Tractor - Complete Bilingual, Crop-Based Fleet with Real Photos, Drawer, Registration, My Bookings, Search/Filter, Diesel Option, Mandi Rates & Live GPS Tracking

// ==========================================
// 0. Supabase Cloud Database Client
// ==========================================
const SUPABASE_URL = 'https://dtyimtqwvdlhqipsmnpi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0eWltdHF3dmRsaHFpcHNtbnBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQxOTYzNzQsImV4cCI6MjEwOTc3MjM3NH0.FA1mEc44H431jJMv39QfTDkKEbe3gotqwKqKawYH_Ek';

let sbClient = null;
try {
    if (window.supabase && typeof window.supabase.createClient === 'function') {
        sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('✅ Supabase connected to Kisan Portal');
    }
} catch (err) {
    console.warn('Supabase initialization warning:', err);
}

// Real photo mappings for tractor brands
const brandRealPhotos = {
    "Mahindra 575 DI (45 HP)": "images/dhan-tractor.jpg",
    "Swaraj 855 FE (52 HP)": "images/gehu-tractor.jpg",
    "John Deere 5310 (55 HP)": "images/ganna-tractor.jpg",
    "Sonalika DI 745 (50 HP)": "images/ganna-tractor.jpg",
    "Massey Ferguson 241 (42 HP)": "images/dhan-tractor.jpg",
    "Farmtrac 60 (50 HP)": "images/dhulai-tractor.jpg",
    "Chhota Mini Tractor (24 HP)": "images/compact-tractor.jpg"
};

// 1. Tractor & Machine Catalog with REAL Agricultural Photographs, Fuel Discount & Farmer Ratings
const fleetData = [
    {
        id: "dhan-4wd",
        categories: ["dhan"],
        image: "images/dhan-tractor.jpg",
        rate: 600,
        fuelDiscount: 220,
        rateUnit: { hi: "घंटा", en: "Hour" },
        badge: { hi: "🌾 धान कड़वा स्पेशल", en: "🌾 Paddy Puddling Special" },
        name: { hi: "धान 4WD मड-मास्टर ट्रैक्टर", en: "Paddy 4WD Mud-Master Tractor" },
        subtitle: { hi: "कीचड़ में न फंसने वाला 4-व्हील ड्राइव ट्रैक्टर", en: "Non-stuck 4-Wheel Drive Tractor for Wet Mud" },
        suitableCrops: { hi: "धान / चावल (Paddy)", en: "Paddy / Rice" },
        suitableWork: { hi: "कड़वा जुताई (Puddling), कीचड़ तैयार करना", en: "Wet Land Puddling & Slurry Prep" },
        tool: { hi: "केज व्हील + 6 फीट वेट रोटावेटर", en: "Cage Wheels + 6ft Wet Rotavator" },
        power: "45-50 HP (4WD)",
        rating: 4.9,
        reviewsCount: 68
    },
    {
        id: "gehu-super-seeder",
        categories: ["gehu"],
        image: "images/gehu-tractor.jpg",
        rate: 550,
        fuelDiscount: 200,
        rateUnit: { hi: "घंटा", en: "Hour" },
        badge: { hi: "🌱 गेहूं व सरसों बोवाई स्पेशल", en: "🌱 Wheat & Sowing Special" },
        name: { hi: "सुपर-सीडर व रोटावेटर ट्रैक्टर", en: "Super Seeder & Rotavator Tractor" },
        subtitle: { hi: "पराली प्रबंधन और एक ही बार में सीधी बोवाई", en: "Stubble Management & Direct Sowing in One Go" },
        suitableCrops: { hi: "गेहूं, सरसों, चना, मटर", en: "Wheat, Mustard, Gram, Peas" },
        suitableWork: { hi: "बारीक जुताई व सटीक बीज/खाद बोवाई", en: "Fine Tilth Ploughing & Precise Sowing" },
        tool: { hi: "7 फीट सुपर सीडर + मल्टी-क्रॉप ड्रिल", en: "7ft Super Seeder + Multi-Crop Drill" },
        power: "50-55 HP",
        rating: 4.8,
        reviewsCount: 52
    },
    {
        id: "gehu-laser-leveler",
        categories: ["gehu", "dhan", "ganna"],
        image: "images/gehu-tractor.jpg",
        rate: 750,
        fuelDiscount: 250,
        rateUnit: { hi: "घंटा", en: "Hour" },
        badge: { hi: "📐 30% पानी व खाद बचत", en: "📐 30% Water & Fertilizer Saving" },
        name: { hi: "लेज़र लैंड लेवलर ट्रैक्टर", en: "Laser Land Leveler Tractor" },
        subtitle: { hi: "खेत को 100% समतल करने के लिए लेज़र तकनीक", en: "High-precision laser field leveling unit" },
        suitableCrops: { hi: "धान, गेहूं, गन्ना, सभी फसलें", en: "Paddy, Wheat, Sugarcane, All Crops" },
        suitableWork: { hi: "खेत को एक समान समतल करना, पानी का समान फैलाव", en: "Zero slope levelling, even water spread across field" },
        tool: { hi: "ट्रांसमीटर पोल + लेज़र रिसीवर बकेट (7 फीट)", en: "Transmitter Mast + Laser Receiver Bucket (7ft)" },
        power: "55-60 HP",
        rating: 4.9,
        reviewsCount: 54
    },
    {
        id: "ganna-heavy-hauler",
        categories: ["ganna"],
        image: "images/ganna-tractor.jpg",
        rate: 700,
        fuelDiscount: 250,
        rateUnit: { hi: "घंटा", en: "Hour" },
        badge: { hi: "🎋 गन्ना व भारी जुताई स्पेशल", en: "🎋 Heavy Sugarcane Hauler" },
        name: { hi: "हाई-टॉर्क हैवी ड्यूटी ट्रैक्टर", en: "High-Torque Heavy Duty Tractor" },
        subtitle: { hi: "गहरी जुताई, खाई (ट्रेन्च) बनाने और भारी ढुलाई के लिए", en: "For Deep Ploughing, Trenching & Heavy Haulage" },
        suitableCrops: { hi: "गन्ना, कपास, मक्का", en: "Sugarcane, Cotton, Maize" },
        suitableWork: { hi: "गहरी एमबी जुताई, 15 टन गन्ना ट्रॉली खींचना", en: "Deep MB Ploughing & 15-Ton Trolley Hauling" },
        tool: { hi: "3-बॉटम एमबी हल / ट्रेन्चर / हैवी ट्रॉली", en: "3-Bottom MB Plough / Trencher / Heavy Trolley" },
        power: "55-65 HP",
        rating: 4.9,
        reviewsCount: 45
    },
    {
        id: "straw-reaper",
        categories: ["gehu", "dhulai"],
        image: "images/combine-harvester.jpg",
        rate: 1100,
        fuelDiscount: 350,
        rateUnit: { hi: "एकड़", en: "Acre" },
        badge: { hi: "🌾 उत्तम भूसा मेकर", en: "🌾 Premium Straw & Bhusa Maker" },
        name: { hi: "सुपर स्ट्रा रीपर व भूसा मशीन", en: "Super Straw Reaper (Bhusa Maker)" },
        subtitle: { hi: "गेहूं के डंठल काटकर बारीक भूसा बनाकर सीधे ट्रॉली में लोड करता है", en: "Cuts stubble into fine animal fodder & loads into trolley" },
        suitableCrops: { hi: "गेहूं, जौ (कटाई के बाद)", en: "Wheat, Barley (Post-harvest)" },
        suitableWork: { hi: "पराली का 100% उपयोग व पशुओं के लिए पौष्टिक भूसा", en: "Stubble recovery & fine straw production" },
        tool: { hi: "डबल कटर बार + हैवी ब्लोअर पाइप + ट्रॉली अटैचमेंट", en: "Double Cutter Bar + Heavy Blower + Trolley Hook" },
        power: "50-60 HP",
        rating: 4.8,
        reviewsCount: 41
    },
    {
        id: "sabzi-mini-tractor",
        categories: ["sabzi", "bagwani"],
        image: "images/compact-tractor.jpg",
        rate: 380,
        fuelDiscount: 140,
        rateUnit: { hi: "घंटा", en: "Hour" },
        badge: { hi: "🥔 आलू व सब्जी स्पेशल", en: "🥔 Potato & Veggies Special" },
        name: { hi: "छोटा चैंपियन नैरो ट्रैक्टर", en: "Chhota Champion Compact Tractor" },
        subtitle: { hi: "छोटी क्यारियों और मेड़ों के बीच आसानी से चलने वाला", en: "Fits narrow ridges, beds & greenhouse lanes" },
        suitableCrops: { hi: "आलू, प्याज, टमाटर, गोभी, लहसुन", en: "Potato, Onion, Tomato, Garlic & Veggies" },
        suitableWork: { hi: "बेड बनाना, आलू खुदाई (Digger), संकरी जुताई", en: "Bed Making, Potato Digging & Row Tillage" },
        tool: { hi: "पोटैटो डिगर / 4 फीट मिनी रोटावेटर", en: "Potato Digger / 4ft Mini Rotavator" },
        power: "24-28 HP (Narrow Width)",
        rating: 4.7,
        reviewsCount: 39
    },
    {
        id: "dhulai-trolley-tractor",
        categories: ["dhulai"],
        image: "images/dhulai-tractor.jpg",
        rate: 450,
        fuelDiscount: 160,
        rateUnit: { hi: "घंटा", en: "Hour" },
        badge: { hi: "🚛 मंडी व माल ढुलाई", en: "🚛 Mandi & Haulage Transport" },
        name: { hi: "हाइड्रोलिक ट्रॉली ट्रैक्टर सेट", en: "Hydraulic Trolley Tractor Set" },
        subtitle: { hi: "मंडी तक अनाज, भूसा, खाद और मिट्टी पहुंचाने के लिए", en: "Fast transport for crops, straw, manure & soil" },
        suitableCrops: { hi: "सभी फसलें (मंडी ले जाने हेतु)", en: "All Crops (Mandi Transport)" },
        suitableWork: { hi: "मंडी ढुलाई, एक लीवर से तुरंत खाली होना", en: "Grain transport & single-lever hydraulic dumping" },
        tool: { hi: "डबल एक्सल हाइड्रोलिक लिफ्ट ट्रॉली", en: "Double Axle Hydraulic Lift Trolley" },
        power: "42-45 HP",
        rating: 4.8,
        reviewsCount: 61
    },
    {
        id: "bagwani-sprayer-mini",
        categories: ["bagwani"],
        image: "images/bagwani-tractor.jpg",
        rate: 350,
        fuelDiscount: 130,
        rateUnit: { hi: "घंटा", en: "Hour" },
        badge: { hi: "🍎 बागवानी व स्प्रे स्पेशल", en: "🍎 Orchard & Spraying Special" },
        name: { hi: "ऑर्चर्ड ब्लोअर-स्प्रेयर ट्रैक्टर", en: "Orchard Blower-Sprayer Tractor" },
        subtitle: { hi: "पेड़ों के नीचे आसानी से निकलने वाला कॉम्पैक्ट ट्रैक्टर", en: "Low-height compact tractor for fruit gardens" },
        suitableCrops: { hi: "आम, किन्नू, सेब, अमरूद, अंगूर", en: "Mango, Citrus, Apple, Guava, Grapes" },
        suitableWork: { hi: "कीटनाशक स्प्रे, बागों के बीच जुताई व घास कटाई", en: "Insecticide Blower Spraying & Orchard Tillage" },
        tool: { hi: "600 लीटर ब्लोअर स्प्रेयर + म्यूटर", en: "600L Blower Sprayer + Mulcher" },
        power: "20-25 HP 4WD",
        rating: 4.9,
        reviewsCount: 29
    },
    {
        id: "combine-harvester",
        categories: ["dhan", "gehu"],
        image: "images/combine-harvester.jpg",
        rate: 1400,
        fuelDiscount: 450,
        rateUnit: { hi: "एकड़", en: "Acre" },
        badge: { hi: "⚡ धान व गेहूं सीधी कटाई", en: "⚡ Direct Harvesting & Threshing" },
        name: { hi: "मल्टी-क्रॉप कंबाइन हार्वेस्टर", en: "Multi-Crop Combine Harvester" },
        subtitle: { hi: "खेत में खड़ी फसल की कटाई, मढ़ाई और दाना अलग करना", en: "Cuts, threshes and cleans grain straight into trolley" },
        suitableCrops: { hi: "धान, गेहूं, सोयाबीन, चना", en: "Paddy, Wheat, Soybean, Gram" },
        suitableWork: { hi: "समय और मजदूरी की भारी बचत, 1 घंटे में कटाई", en: "Huge time and labor savings, cuts 1 acre/hour" },
        tool: { hi: "14 फीट कटर बार + ग्रेन क्लीनर", en: "14ft Cutter Bar + High Flow Grain Tank" },
        power: "100+ HP Turbo Engine",
        rating: 5.0,
        reviewsCount: 83
    }
];

// 2. Full Language Dictionary
const translations = {
    hi: {
        modalTitle: "अपनी भाषा चुनें / Choose Language",
        modalSubtitle: "कृपया अपनी पसंदीदा भाषा चुनें / Please select your preferred language",
        brandName: "प्रोजेक्ट ट्रैक्टर",
        brandSubtitle: "किसान भाइयों का अपना ट्रैक्टर पोर्टल",

        // Drawer Menu & Badges
        drawerVerifiedBadge: "सत्यापित किसान",
        menuHome: "होम / डैशबोर्ड",
        menuMyBookings: "मेरी बुकिंग्स (My Bookings)",
        navMyBookings: "मेरी बुकिंग्स",
        badgeBookingCountText: "बुकिंग",
        menuRegTractor: "अपना ट्रैक्टर जोड़ें",
        menuRegTractorSub: "किराये पर देकर कमाई करें",
        navOwnerPortal: "मालिक डैशबोर्ड",
        menuOwnerPortal: "ट्रैक्टर मालिक डैशबोर्ड",
        menuOwnerPortalSub: "बुकिंग स्वीकारें व खेत का रास्ता देखें",
        menuLanguage: "भाषा बदलें (हिंदी / English)",
        menuTerms: "नियम व नीतियां (Terms & Policy)",
        menuHelpline: "किसान सहायता केंद्र (Call & WhatsApp)",
        drawerFooterTag: "किसान भाइयों का सच्चा साथी",
        navAttachBtn: "ट्रैक्टर जोड़ें",

        // Mandi Ticker
        mandiLiveTag: "📊 आज के मंडी भाव (Agmarknet Live)",
        mandiTickerItem1: "🌾 गेहूं (Wheat): ₹2,425/क्विं",
        mandiTickerItem2: "🌾 धान 1121 (Basmati): ₹3,850/क्विं",
        mandiTickerItem3: "🟡 सरसों (Mustard): ₹5,680/क्विं",
        mandiTickerItem4: "🥔 आलू (Potato): ₹1,350/क्विं",
        mandiTickerItem5: "🌽 मक्का (Maize): ₹2,150/क्विं",
        mandiTickerItem6: "🌱 चना (Gram): ₹5,800/क्विं",

        // Weather & Advisory
        weatherCity: "मेरठ, उत्तर प्रदेश (पश्चिमी क्षेत्र)",
        weatherCondition: "धूप खिली है ☀️",
        weatherHumidity: "💧 नमी: 42%",
        weatherWind: "💨 हवा: 8 km/h",
        weatherRain: "🌧️ बारिश: 0%",
        advisoryTag: "आज की कृषि सलाह (Daily Farm Advisory)",
        advisoryText: "मौसम पूरी तरह साफ और शुष्क है। गेहूं व सरसों की बोवाई, खेत की गहरी जुताई और कंबाइन से धान कटाई के लिए आज का दिन सर्वोत्तम है।",
        advisoryTime: "आज का अपडेट",

        // GPS & Live Location
        btnDetectGPS: "GPS से खेत खोजें",
        locDetecting: "⏳ जीपीएस लोकेशन खोजी जा रही है...",
        locSuccess: "खेत की लोकेशन सेट हो गई: {loc}",
        locErr: "⚠️ लोकेशन नहीं मिल सकी। कृपया गांव का नाम टाइप करें।",
        gpsFieldLabel: "खेत का GPS मैप:",
        btnTrackTractor: "🗺️ ट्रैक्टर ट्रैक करें",
        trackingTitle: "ट्रैक्टर लाइव ट्रैकिंग (Live Tracker)",
        trackingDistance: "खेत से दूरी",
        trackingETA: "पहुंचने का समय",
        trackingSpeed: "ट्रैक्टर की गति",
        stepConfirmed: "बुकिंग स्वीकृत",
        stepAssigned: "ड्राइवर असाइन",
        stepOnWay: "खेत की ओर रवाना",
        stepArrived: "खेत पर आगमन",
        btnCallDriver: "कॉल सहायता",
        btnGoogleMaps: "Google Maps पर देखें",
        driverCalledAlert: "ड्राइवर से संपर्क किया जा रहा है... (सहायता केंद्र 24x7)",

        // Search & Sort Bar
        searchPlaceholder: "मशीन, औजार या काम खोजें (उदा: रोटावेटर, कंबाइन, 4WD, लेवलर)...",
        labelSortBy: "क्रमबद्ध करें:",
        sortDefault: "अनुशंसित (Recommended)",
        sortPriceLow: "किराया: कम से ज्यादा (₹ ⬆)",
        sortPriceHigh: "किराया: ज्यादा से कम (₹ ⬇)",
        sortRating: "उच्चतम रेटिंग (⭐️ 4.8+)",
        noMatchTitle: "कोई मशीन नहीं मिली",
        noMatchDesc: "आपके खोजे गए शब्द से कोई मशीन मेल नहीं खाती। कृपया अन्य औजार या फसल का नाम डालकर देखें।",
        btnResetSearch: "सभी मशीनें देखें",

        // Login Page
        labelUsername: "मोबाइल नंबर या यूजरनेम",
        placeholderUsername: "जैसे: 9876543210 या kisan123",
        labelPassword: "पासवर्ड",
        placeholderPassword: "अपना पासवर्ड दर्ज करें",
        rememberMe: "याद रखें",
        forgotPassword: "पासवर्ड भूल गए?",
        loginBtn: "🚜 लॉगिन करें",
        dividerOr: "या",
        guestBtn: "🌾 गेस्ट के रूप में देखें",
        newFarmerText: "नए किसान हैं?",
        createAccountLink: "नया अकाउंट बनाएं",

        // Hero Banner (Direct & Honest)
        heroLeadLine: "फसल के टाइम पर गाड़ी, बिना एक्स्ट्रा पैसे",
        btnHeroBookVehicle: "🚜 गाड़ी बुक करो",
        heroHelpBtn: "कॉल / WhatsApp सहायता",
        dailyInfoTitle: "आज की जानकारी (मंडी भाव, मौसम व सलाह)",
        dailyInfoToggle: "देखने के लिए टैप करें ▾",

        // Filter Pills
        cropFilterTitle: "🌾 आपका काम क्या है?",
        cropFilterSubtitle: "नीचे अपनी फसल या काम चुनें, उपयुक्त ट्रैक्टर व औजार तुरंत दिखेंगे:",
        filterAll: "सभी गाड़ियां (All)",
        filterDhan: "धान / चावल (Paddy)",
        filterGehu: "गेहूं व सरसों (Wheat)",
        filterGanna: "गन्ना व भारी जुताई (Sugarcane)",
        filterSabzi: "आलू व सब्जियां (Veggies)",
        filterDhulai: "मंडी व माल ढुलाई (Haulage)",
        filterBagwani: "बागवानी व स्प्रे (Orchard)",

        // Fleet Header & Cards
        fleetTitle: "अनुशंसित गाड़ियां और मशीनें",
        fleetCountSuffix: "गाड़ियां उपलब्ध",
        cardBestFor: "सटीक काम:",
        cardCrops: "सटीक फसल:",
        cardTool: "साथ में औजार:",
        cardPower: "पावर:",
        cardPriceTitle: "किराया दर",
        cardBookBtn: "🚜 बुक करें",
        cardVerified: "100% जांची गई मशीन",
        cardBookingsSuffix: "बुकिंग्स",

        // Fuel Choice
        fuelChoiceTitle: "⛽ डीजल का चुनाव करें (Fuel Option) *",
        fuelWithTitle: "डीजल व ड्राइवर सहित",
        fuelWithDesc: "डीजल और ड्राइवर का खर्च मालिक का",
        fuelWithoutTitle: "डीजल किसान का (सस्ता रेट)",
        fuelWithoutDesc: "डीजल आप देंगे, सिर्फ मशीन व ड्राइवर",
        fuelWithShort: "डीजल सहित",
        fuelWithoutShort: "बिना डीजल",
        fuelOptionLabel: "डीजल प्रकार:",

        // Help Callout & Support
        calloutTitle: "फोन या व्हाट्सएप पर सीधे सहायता पाएं",
        calloutDesc: "अगर फॉर्म भरने में परेशानी हो, तो हमें कॉल या व्हाट्सएप करें — हमारी टीम तुरंत आपके खेत पर ट्रैक्टर भेजने में मदद करेगी।",
        btnCallNow: "कॉल सहायता (Call Support)",
        btnWhatsAppNow: "व्हाट्सएप सहायता",

        // Call Support Modal
        callModalTitle: "किसान सहायता केंद्र (Kisan Support)",
        callModalSub: "ट्रैक्टर बुकिंग या किसी भी जानकारी के लिए कॉल या व्हाट्सएप सहायता प्राप्त करें।",
        callbackTitle: "📞 कॉल बैक का अनुरोध करें (Request Call Back)",
        callbackDesc: "अपना 10 अंकों का मोबाइल नंबर डालें, हमारी टीम 5-10 मिनट में आपको कॉल करेगी:",
        btnRequestCallback: "कॉल बैक मंगाएं",
        callbackSuccess: "धन्यवाद! आपकी कॉल बैक रिक्वेस्ट मिल गई है ({phone})। हमारी सपोर्ट टीम 5-10 मिनट में आपको कॉल करेगी।",
        callbackErr: "कृपया अपना 10 अंकों का सही मोबाइल नंबर दर्ज करें।",

        // Booking Modal
        modalRateLabel: "किराया दर:",
        modalEstimatedLabel: "कुल अनुमानित खर्च:",
        labelFarmerName: "किसान का नाम *",
        placeholderFarmerName: "जैसे: रमेश कुमार",
        labelFarmerPhone: "मोबाइल नंबर *",
        placeholderFarmerPhone: "10 अंकों का मोबाइल नंबर",
        labelFarmerVillage: "गांव / खेत का स्थान व जिला *",
        placeholderFarmerVillage: "जैसे: रामपुर, मेरठ (या GPS बटन दबाएं)",
        labelWorkDuration: "कितने घंटे / बीघा चाहिए? *",
        labelWorkCrop: "किस फसल के लिए काम करवाना है?",
        placeholderWorkCrop: "जैसे: धान का कीचड़, गेहूं बोवाई",
        btnConfirmBooking: "बुकिंग पक्की करें",
        btnSendWhatsApp: "व्हाट्सएप पर बुकिंग भेजें",

        // Receipt Modal
        receiptTitle: "बुकिंग पक्की हो गई!",
        receiptSub: "हमारी टीम आपके गांव के नजदीकी ड्राइवर से संपर्क करके जल्द पहुंचेगी।",
        receiptCloseBtn: "ठीक है (Close)",
        receiptOrderId: "ऑर्डर नंबर:",
        receiptFarmer: "किसान का नाम:",
        receiptPhone: "मोबाइल नंबर:",
        receiptVillage: "स्थान / गांव:",
        receiptMachine: "चुनी गई मशीन:",
        receiptDuration: "समय / अवधि:",
        receiptTotal: "अनुमानित कुल बिल:",

        // My Bookings Modal
        myBookingsTitle: "मेरी बुकिंग्स (My Bookings)",
        myBookingsSub: "आपके द्वारा बुक किए गए सभी ट्रैक्टरों और मशीनों की सूची",
        noBookingsTitle: "अभी कोई बुकिंग नहीं है",
        noBookingsDesc: "आपने अभी तक कोई ट्रैक्टर बुक नहीं किया है। अपनी फसल के लिए उपयुक्त मशीन चुनें और तुरंत बुक करें।",
        btnBookNow: "🚜 मशीनें देखें व बुक करें",
        statusConfirmed: "🟢 बुकिंग स्वीकृत (Confirmed)",
        statusPending: "⏳ स्वीकृति की प्रतीक्षा (Pending)",
        statusRejected: "🔴 मालिक द्वारा अस्वीकृत (Rejected)",
        statusCancelled: "🔴 रद्द किया गया (Cancelled)",
        btnViewReceipt: "📄 रसीद देखें",
        btnCancelBooking: "बुकिंग रद्द करें",
        cancelConfirm: "क्या आप वाकई इस ट्रैक्टर बुकिंग को रद्द करना चाहते हैं?",

        // Tractor Registration Modal
        regModalTitle: "अपना ट्रैक्टर जोड़ें — रोज कमाई करें",
        regModalSubtitle: "अपने खाली ट्रैक्टर को किराये पर देकर हर महीने ₹20,000 - ₹50,000 तक कमाएं।",
        regHeadingOwner: "1. मालिक व ड्राइवर की जानकारी",
        regOwnerName: "मालिक का नाम *",
        regPlaceholderOwner: "जैसे: सुरेश सिंह",
        regOwnerPhone: "मोबाइल नंबर (WhatsApp) *",
        regOwnerLocation: "गांव / कस्बा व जिला *",
        regOwnerDL: "ड्राइविंग लाइसेंस (DL) नंबर",
        regPlaceholderDL: "DL नंबर दर्ज करें",
        regHeadingTractor: "2. ट्रैक्टर की जानकारी",
        regTractorBrand: "ट्रैक्टर ब्रांड व मॉडल *",
        regTractorDrive: "ड्राइव प्रकार *",
        regTractorRC: "ट्रैक्टर नंबर (RC Plate) *",
        regPlaceholderRC: "जैसे: UP 15 AB 1234",
        regTractorRate: "आपका किराया रेट (₹/घंटा) *",
        regHeadingTools: "3. आपके पास कौनसे औजार उपलब्ध हैं?",
        regAgreeText: "मैं प्रोजेक्ट ट्रैक्टर के सभी",
        regTermsLink: "नियम व नीतियों (Terms)",
        regAgreeSuffix: "से सहमत हूँ।",
        regSubmitBtn: "🚜 ट्रैक्टर सफलतापूर्वक जोड़ें",
        regSuccessAlert: "बधाई हो {owner}! आपका ट्रैक्टर ({tractor}) सफलतापूर्वक जुड़ गया है। अब आपको अपने गांव के नजदीकी किसानों से बुकिंग ऑर्डर्स मिलेंगे।",

        // Terms & Policy Modal
        termsHeading: "प्रोजेक्ट ट्रैक्टर — नियम व नीतियां (Terms & Policy)",
        termsSub: "किसान भाई और ट्रैक्टर मालिक दोनों के सुरक्षित और निष्पक्ष काम के लिए नियम",
        term1Title: "डीजल नीति (Fuel Policy) ⛽",
        term1Desc: "किराये के रेट में डीजल और ड्राइवर शामिल माना जाएगा जब तक कि बुकिंग के समय अलग से बात तय न हुई हो।",
        term2Title: "न्यूनतम बुकिंग व समय नियम (Minimum Booking) ⏱️",
        term2Desc: "कम से कम 1 या 2 घंटे की बुकिंग मान्य होगी ताकि ट्रैक्टर के आने-जाने का नुकसान न हो। 5 किमी से अधिक दूरी पर सामान्य ट्रेवल चार्ज लागू हो सकता है।",
        term3Title: "टूट-फूट व खराबी नियम (Breakdown Policy) 🛠️",
        term3Desc: "खेत में काम के दौरान अगर मशीन खराब होती है, तो मरम्मत का खर्च ट्रैक्टर मालिक का होगा। किसान से केवल उतने ही समय का पैसा लिया जाएगा जितना काम सही हुआ है।",
        term4Title: "समय की पाबंदी व अनुशासन (Discipline Policy) ❌",
        term4Desc: "बुकिंग कन्फर्म होने के बाद ट्रैक्टर समय पर खेत पर पहुँचना अनिवार्य है। शराब पीकर ड्राइविंग करना या गैर-जिम्मेदाराना व्यवहार करने पर खाता रद्द कर दिया जाएगा।",
        term5Title: "भुगतान व 0% कमीशन नीति (Payment Policy) 💰",
        term5Desc: "काम पूरा होते ही किसान सीधे नकद या यूपीआई (UPI) से मालिक को भुगतान करेगा। प्रोजेक्ट ट्रैक्टर वर्तमान में 100% मुफ्त (0% कमीशन) सुविधा प्रदान कर रहा है।",

        // Nav and dynamic alerts
        navGreetingGuest: "नमस्ते, किसान भाई 🙏",
        navGreetingUser: "नमस्ते, {user} 🙏",
        navLogin: "लॉगिन",
        navLogout: "लॉगआउट",
        guestUser: "मेहमान किसान",
        loginSuccess: "लॉगिन सफल रहा! कृपया प्रतीक्षा करें...",
        errFillFields: "कृपया सभी जरूरी जानकारी भरें।",
        errPasswordLength: "पासवर्ड कम से कम 4 अक्षरों का होना चाहिए।",
        forgotAlert: "पासवर्ड रीसेट करने के लिए किसान सहायता केंद्र से संपर्क करें।",
        signupAlert: "नया रजिस्ट्रेशन जल्द शुरू होगा! अभी आप सीधे लॉगिन कर सकते हैं।",
        langTag: "हिंदी",

        // Create Account & Tab Auth
        tabLogin: "लॉगिन करें",
        tabRegister: "नया खाता बनाएं",
        labelFullName: "पूरा नाम / Farmer Name *",
        placeholderFullName: "जैसे: रामप्रसाद यादव",
        labelPhone: "मोबाइल नंबर (10 अंक) *",
        placeholderPhone: "जैसे: 9876543210",
        labelRole: "आपकी भूमिका / Your Role *",
        roleFarmerTitle: "किसान भाई",
        roleFarmerDesc: "ट्रैक्टर किराये पर चाहिए",
        roleOwnerTitle: "ट्रैक्टर मालिक",
        roleOwnerDesc: "ट्रैक्टर किराये पर देना है",
        labelVillage: "गांव और जिला *",
        placeholderVillage: "जैसे: मवाना, मेरठ (उत्तर प्रदेश)",
        btnGpsInline: "GPS से खोजें",
        labelNewPassword: "पासवर्ड बनाएं *",
        placeholderNewPassword: "कम से कम 4 अंक",
        labelConfirmPassword: "पासवर्ड दोबारा डालें *",
        placeholderConfirmPassword: "वही पासवर्ड दोबारा डालें",
        regBtn: "✅ खाता बनाएं और शुरू करें",
        alreadyAccountText: "पहले से खाता है?",
        loginLink: "लॉगिन करें",
        errPhoneInvalid: "कृपया 10 अंकों का मान्य भारतीय मोबाइल नंबर दर्ज करें।",
        errPasswordMismatch: "दोनों पासवर्ड आपस में मेल नहीं खा रहे हैं।",
        errPhoneExists: "इस मोबाइल नंबर से पहले ही खाता बना हुआ है। कृपया लॉगिन करें।",
        errWrongPassword: "पासवर्ड गलत है। कृपया पुनः प्रयास करें।",
        errUserNotFound: "यह नंबर/नाम रजिस्टर नहीं है। पहले नया खाता बनाएं।",
        regSuccess: "🎉 बधाई हो! आपका खाता सफलतापूर्वक बन गया है। कृपया प्रतीक्षा करें...",

        // Forgot Password
        forgotTitle: "पासवर्ड रीसेट करें",
        forgotSubtitle: "अपनी पहचान सत्यापित करने के लिए रजिस्ट्रेशन में दी गई जानकारी दर्ज करें",
        forgotLabelName: "पूरा नाम (रजिस्ट्रेशन वाला) *",
        forgotLabelVillage: "गांव / जिला (रजिस्ट्रेशन वाला) *",
        forgotBtnVerify: "🔍 पहचान सत्यापित करें",
        forgotVerified: "पहचान सत्यापित! अब नया पासवर्ड बनाएं",
        forgotBtnReset: "🔐 नया पासवर्ड सेट करें",
        forgotBackToLogin: "← लॉगिन पर वापस जाएं",
        forgotNameMismatch: "❌ नाम मेल नहीं खा रहा। रजिस्ट्रेशन में दिया गया नाम डालें।",
        forgotVillageMismatch: "❌ गांव/जिला मेल नहीं खा रहा। रजिस्ट्रेशन में दिया गया गांव डालें।",
        forgotResetSuccess: "✅ पासवर्ड सफलतापूर्वक बदल दिया गया! अब लॉगिन करें।",

        btnLoginWithPassword: "🚜 लॉगिन करें"
    },
    en: {
        modalTitle: "Choose Language / अपनी भाषा चुनें",
        modalSubtitle: "Please select your preferred language / कृपया भाषा चुनें",
        brandName: "Project Tractor",
        brandSubtitle: "The Trusted Tractor Portal for Farmers",

        // Drawer Menu & Badges
        drawerVerifiedBadge: "Verified Farmer",
        menuHome: "Home / Dashboard",
        menuMyBookings: "My Bookings",
        navMyBookings: "My Bookings",
        badgeBookingCountText: "bookings",
        menuRegTractor: "Register Your Tractor",
        menuRegTractorSub: "Earn daily by renting",
        navOwnerPortal: "Owner Portal",
        menuOwnerPortal: "Tractor Owner Dashboard",
        menuOwnerPortalSub: "Accept bookings & view farm route",
        menuLanguage: "Change Language (हिंदी / English)",
        menuTerms: "Terms & Policies",
        menuHelpline: "Farmer Support Center (Call & WhatsApp)",
        drawerFooterTag: "Trusted Companion of Farmers",
        navAttachBtn: "Attach Tractor",

        // Mandi Ticker
        mandiLiveTag: "📊 Live Mandi Rates (Agmarknet Live)",
        mandiTickerItem1: "🌾 Wheat: ₹2,425/Qtl",
        mandiTickerItem2: "🌾 Paddy (Basmati 1121): ₹3,850/Qtl",
        mandiTickerItem3: "🟡 Mustard: ₹5,680/Qtl",
        mandiTickerItem4: "🥔 Potato: ₹1,350/Qtl",
        mandiTickerItem5: "🌽 Maize: ₹2,150/Qtl",
        mandiTickerItem6: "🌱 Gram (Chana): ₹5,800/Qtl",

        // Weather & Advisory
        weatherCity: "Meerut, Uttar Pradesh (Western Region)",
        weatherCondition: "Sunny & Clear ☀️",
        weatherHumidity: "💧 Humidity: 42%",
        weatherWind: "💨 Wind: 8 km/h",
        weatherRain: "🌧️ Rain Chance: 0%",
        advisoryTag: "Daily Farm Advisory",
        advisoryText: "The weather is completely clear and dry. Optimal condition for wheat/mustard sowing, deep ploughing, and combine harvesting.",
        advisoryTime: "Today's Update",

        // GPS & Live Location
        btnDetectGPS: "Auto-Detect GPS",
        locDetecting: "⏳ Detecting GPS location...",
        locSuccess: "Farm GPS set: {loc}",
        locErr: "⚠️ Location could not be detected. Please type village name.",
        gpsFieldLabel: "Field GPS Location:",
        btnTrackTractor: "🗺️ Track Tractor",
        trackingTitle: "Live Tractor Tracker",
        trackingDistance: "Distance from Field",
        trackingETA: "Estimated Time",
        trackingSpeed: "Tractor Speed",
        stepConfirmed: "Booking Confirmed",
        stepAssigned: "Driver Assigned",
        stepOnWay: "On the Way to Field",
        stepArrived: "Arrived at Field",
        btnCallDriver: "Call Support",
        btnGoogleMaps: "View on Google Maps",
        driverCalledAlert: "Connecting to driver / farmer support center...",

        // Search & Sort Bar
        searchPlaceholder: "Search machines, tools or crops (e.g. Rotavator, Combine, 4WD, Leveler)...",
        labelSortBy: "Sort By:",
        sortDefault: "Recommended",
        sortPriceLow: "Price: Low to High (₹ ⬆)",
        sortPriceHigh: "Price: High to Low (₹ ⬇)",
        sortRating: "Highest Rating (⭐️ 4.8+)",
        noMatchTitle: "No Machines Found",
        noMatchDesc: "No tractors or machines match your search keyword. Please try a different implement or crop name.",
        btnResetSearch: "View All Machines",

        // Login Page
        labelUsername: "Mobile Number or Username",
        placeholderUsername: "e.g. 9876543210 or kisan123",
        labelPassword: "Password",
        placeholderPassword: "Enter your password",
        rememberMe: "Remember me",
        forgotPassword: "Forgot Password?",
        loginBtn: "🚜 Log In",
        dividerOr: "OR",
        guestBtn: "🌾 Continue as Guest",
        newFarmerText: "New farmer?",
        createAccountLink: "Create New Account",

        // Hero Banner (Direct & Honest)
        heroLeadLine: "Vehicles on time during harvest, no extra charges",
        btnHeroBookVehicle: "🚜 Book a Vehicle",
        heroHelpBtn: "Call / WhatsApp Support",
        dailyInfoTitle: "Today's Farm Info (Mandi Rates, Weather & Advisory)",
        dailyInfoToggle: "Tap to view ▾",

        // Filter Pills
        cropFilterTitle: "🌾 What is your farming work?",
        cropFilterSubtitle: "Select your crop or work below, ideal tractors & implements appear instantly:",
        filterAll: "All Machines",
        filterDhan: "Paddy / Rice",
        filterGehu: "Wheat & Mustard",
        filterGanna: "Sugarcane & Heavy",
        filterSabzi: "Potato & Veggies",
        filterDhulai: "Haulage & Transport",
        filterBagwani: "Orchard & Spray",

        // Fleet Header & Cards
        fleetTitle: "Recommended Machines & Implements",
        fleetCountSuffix: "Machines Available",
        cardBestFor: "Best For:",
        cardCrops: "Target Crops:",
        cardTool: "Attachment:",
        cardPower: "Power:",
        cardPriceTitle: "Rental Rate",
        cardBookBtn: "🚜 Book Now",
        cardVerified: "100% Verified Machine",
        cardBookingsSuffix: "bookings",

        // Fuel Choice
        fuelChoiceTitle: "⛽ Choose Fuel Option *",
        fuelWithTitle: "With Fuel & Driver",
        fuelWithDesc: "Fuel & operator included by tractor owner",
        fuelWithoutTitle: "Without Fuel (Discounted)",
        fuelWithoutDesc: "You provide fuel on field, pay machine + driver",
        fuelWithShort: "With Fuel",
        fuelWithoutShort: "Without Fuel",
        fuelOptionLabel: "Fuel Mode:",

        // Help Callout & Support
        calloutTitle: "Get Support via Call or WhatsApp",
        calloutDesc: "If you need assistance with booking, contact our team via phone or WhatsApp for prompt deployment to your farm.",
        btnCallNow: "Call Support",
        btnWhatsAppNow: "WhatsApp Support",

        // Call Support Modal
        callModalTitle: "Farmer Support Center",
        callModalSub: "Get direct assistance for tractor booking or inquiries via Call or WhatsApp.",
        callbackTitle: "📞 Request a Call Back",
        callbackDesc: "Enter your 10-digit mobile number, and our team will call you back within 5-10 minutes:",
        btnRequestCallback: "Request Call Back",
        callbackSuccess: "Thank you! Your call back request is received ({phone}). Our support team will call you within 5-10 minutes.",
        callbackErr: "Please enter a valid 10-digit mobile number.",

        // Booking Modal
        modalRateLabel: "Rental Rate:",
        modalEstimatedLabel: "Estimated Total Cost:",
        labelFarmerName: "Farmer Name *",
        placeholderFarmerName: "e.g. Ramesh Kumar",
        labelFarmerPhone: "Mobile Number *",
        placeholderFarmerPhone: "10-digit mobile number",
        labelFarmerVillage: "Village / Field Location & District *",
        placeholderFarmerVillage: "e.g. Rampur, Meerut (or tap GPS button)",
        labelWorkDuration: "Hours or Acres Required? *",
        labelWorkCrop: "Crop or Work Purpose:",
        placeholderWorkCrop: "e.g. Paddy Puddling, Wheat Sowing",
        btnConfirmBooking: "Confirm Booking",
        btnSendWhatsApp: "Send Booking via WhatsApp",

        // Receipt Modal
        receiptTitle: "Booking Confirmed!",
        receiptSub: "Our team is contacting the nearest operator in your village and will arrive shortly.",
        receiptCloseBtn: "Close Receipt",
        receiptOrderId: "Order ID:",
        receiptFarmer: "Farmer Name:",
        receiptPhone: "Mobile No:",
        receiptVillage: "Location / Village:",
        receiptMachine: "Selected Machine:",
        receiptDuration: "Duration:",
        receiptTotal: "Estimated Total Bill:",

        // My Bookings Modal
        myBookingsTitle: "My Bookings",
        myBookingsSub: "List of all your active and previous tractor bookings",
        noBookingsTitle: "No Bookings Yet",
        noBookingsDesc: "You haven't booked any machines yet. Pick the right tractor for your crop and book instantly.",
        btnBookNow: "🚜 Browse Machines & Book",
        statusConfirmed: "🟢 Booking Confirmed",
        statusPending: "⏳ Pending Confirmation",
        statusRejected: "🔴 Rejected by Owner",
        statusCancelled: "🔴 Cancelled",
        btnViewReceipt: "📄 View Receipt",
        btnCancelBooking: "Cancel Booking",
        cancelConfirm: "Are you sure you want to cancel this tractor booking?",

        // Tractor Registration Modal
        regModalTitle: "Register Your Tractor — Earn Everyday",
        regModalSubtitle: "Earn ₹20,000 - ₹50,000 every month by renting your idle tractor to local farmers.",
        regHeadingOwner: "1. Owner & Driver Information",
        regOwnerName: "Owner Name *",
        regPlaceholderOwner: "e.g. Suresh Singh",
        regOwnerPhone: "Mobile Number (WhatsApp) *",
        regOwnerLocation: "Village / Town & District *",
        regOwnerDL: "Driving License (DL) Number",
        regPlaceholderDL: "Enter DL number",
        regHeadingTractor: "2. Tractor Details",
        regTractorBrand: "Tractor Brand & Model *",
        regTractorDrive: "Drive Type *",
        regTractorRC: "Tractor Registration (RC Plate) *",
        regPlaceholderRC: "e.g. UP 15 AB 1234",
        regTractorRate: "Your Hourly Rent Rate (₹/hr) *",
        regHeadingTools: "3. What implements do you have?",
        regAgreeText: "I agree to all Project Tractor",
        regTermsLink: "Terms & Policies",
        regAgreeSuffix: ".",
        regSubmitBtn: "🚜 Register Tractor Successfully",
        regSuccessAlert: "Congratulations {owner}! Your tractor ({tractor}) has been attached to Project Tractor. You will now receive rental orders from nearby farmers.",

        // Terms & Policy Modal
        termsHeading: "Project Tractor — Terms & Policy",
        termsSub: "Fair, transparent and safe operating terms for farmers and tractor owners",
        term1Title: "Fuel (Diesel) Policy ⛽",
        term1Desc: "Rental charges include diesel and driver unless agreed otherwise prior to booking.",
        term2Title: "Minimum Booking & Travel Rule ⏱️",
        term2Desc: "A minimum of 1 or 2 hours booking applies to protect operating costs. Nominal travel charges apply for fields beyond 5 km.",
        term3Title: "Breakdown & Repair Policy 🛠️",
        term3Desc: "If a tractor or implement suffers mechanical failure on the field, repair costs are borne by the tractor owner. The farmer is billed strictly for actual completed work.",
        term4Title: "Punctuality & Discipline ❌",
        term4Desc: "Once confirmed, the tractor must arrive on time. Operating under intoxication or unruly behavior will lead to permanent account suspension.",
        term5Title: "Payment & 0% Commission Policy 💰",
        term5Desc: "Upon completion, the farmer pays the owner directly via Cash or UPI. Project Tractor currently charges 0% commission.",

        // Nav and dynamic alerts
        navGreetingGuest: "Welcome, Farmer Friend 🙏",
        navGreetingUser: "Welcome, {user} 🙏",
        navLogin: "Login",
        navLogout: "Logout",
        guestUser: "Guest Farmer",
        loginSuccess: "Login successful! Please wait...",
        errFillFields: "Please fill all required fields.",
        errPasswordLength: "Password must be at least 4 characters long.",
        forgotAlert: "Please contact farmer support to reset your password.",
        signupAlert: "New registration starting soon! You can login directly now.",
        langTag: "English",

        // Create Account & Tab Auth
        tabLogin: "Login",
        tabRegister: "Create Account",
        labelFullName: "Full Name / Farmer Name *",
        placeholderFullName: "e.g. Ramprasad Yadav",
        labelPhone: "Mobile Number (10 digits) *",
        placeholderPhone: "e.g. 9876543210",
        labelRole: "Your Role / Identity *",
        roleFarmerTitle: "Farmer Friend",
        roleFarmerDesc: "Need tractor on rent",
        roleOwnerTitle: "Tractor Owner",
        roleOwnerDesc: "Rent out & earn income",
        labelVillage: "Village & District *",
        placeholderVillage: "e.g. Mawana, Meerut (UP)",
        btnGpsInline: "Detect via GPS",
        labelNewPassword: "Create Password *",
        placeholderNewPassword: "At least 4 characters",
        labelConfirmPassword: "Confirm Password *",
        placeholderConfirmPassword: "Re-enter your password",
        regBtn: "✅ Create Account & Get Started",
        alreadyAccountText: "Already have an account?",
        loginLink: "Login here",
        errPhoneInvalid: "Please enter a valid 10-digit mobile number.",
        errPasswordMismatch: "Passwords do not match.",
        errPhoneExists: "An account with this mobile number already exists. Please login.",
        errWrongPassword: "Incorrect password. Please try again.",
        errUserNotFound: "This number/name is not registered. Please create an account first.",
        regSuccess: "🎉 Congratulations! Your account has been created. Redirecting...",

        // Forgot Password
        forgotTitle: "Reset Password",
        forgotSubtitle: "Enter the details you provided during registration to verify your identity",
        forgotLabelName: "Full Name (as registered) *",
        forgotLabelVillage: "Village / District (as registered) *",
        forgotBtnVerify: "🔍 Verify Identity",
        forgotVerified: "Identity verified! Now set a new password",
        forgotBtnReset: "🔐 Set New Password",
        forgotBackToLogin: "← Back to Login",
        forgotNameMismatch: "❌ Name does not match. Enter the name used during registration.",
        forgotVillageMismatch: "❌ Village/District does not match. Enter the village used during registration.",
        forgotResetSuccess: "✅ Password changed successfully! Please login now.",

        btnLoginWithPassword: "🚜 Login"
    }
};

let currentLang = 'hi';
let currentFilter = 'all';
let currentSearchQuery = '';
let currentSortMode = 'default';
let selectedMachine = null;
let selectedFuelOption = 'with-fuel';

// ==========================================
// 3. Side Drawer (Hamburger Menu)
// ==========================================
function openDrawer() {
    const drawer = document.getElementById('sideDrawer');
    const overlay = document.getElementById('drawerOverlay');
    if (drawer && overlay) {
        drawer.classList.add('open');
        overlay.classList.add('open');
    }
}

function closeDrawer() {
    const drawer = document.getElementById('sideDrawer');
    const overlay = document.getElementById('drawerOverlay');
    if (drawer && overlay) {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
    }
}

function handleDrawerAuth() {
    const user = localStorage.getItem('tractorUser');
    closeDrawer();
    if (user) {
        logout();
    } else {
        window.location.href = 'login.html';
    }
}

// ==========================================
// 4. Tractor Registration & Terms Modals
// ==========================================
function openTractorRegModal() {
    closeDrawer();
    const modal = document.getElementById('tractorRegModal');
    if (modal) modal.style.display = 'flex';
}

function closeTractorRegModal() {
    const modal = document.getElementById('tractorRegModal');
    if (modal) modal.style.display = 'none';
}

function openTermsModal(event) {
    if (event) event.preventDefault();
    closeDrawer();
    const modal = document.getElementById('termsPolicyModal');
    if (modal) modal.style.display = 'flex';
}

function closeTermsModal() {
    const modal = document.getElementById('termsPolicyModal');
    if (modal) modal.style.display = 'none';
}

function handleTractorRegistration(event) {
    event.preventDefault();
    const t = translations[currentLang] || translations.hi;

    const ownerName = document.getElementById('ownerName').value.trim();
    const ownerPhone = document.getElementById('ownerPhone').value.trim();
    const ownerVillage = document.getElementById('ownerVillage').value.trim();
    const tractorBrand = document.getElementById('tractorBrand').value;
    const tractorDrive = document.getElementById('tractorDrive').value;
    const tractorRC = document.getElementById('tractorRC').value.trim();
    const tractorRate = parseInt(document.getElementById('tractorRate').value) || 550;

    if (!ownerName || !ownerPhone || !ownerVillage || !tractorRC) {
        alert(t.errFillFields);
        return;
    }

    // Pick a real photo based on chosen brand
    const photoUrl = brandRealPhotos[tractorBrand] || "images/dhan-tractor.jpg";

    // Add newly registered tractor to active fleet
    const newId = 'custom-' + Date.now();
    fleetData.unshift({
        id: newId,
        categories: tractorDrive === '4WD' ? ['dhan', 'gehu'] : ['gehu', 'ganna', 'dhulai'],
        image: photoUrl,
        rate: tractorRate,
        fuelDiscount: 180,
        rateUnit: { hi: "घंटा", en: "Hour" },
        badge: { hi: `⭐ ${ownerVillage} स्पेशल`, en: `⭐ ${ownerVillage} Local` },
        name: { hi: `${tractorBrand} (${ownerName})`, en: `${tractorBrand} (${ownerName})` },
        subtitle: { hi: `मालिक: ${ownerName} | संपर्क: ${ownerPhone}`, en: `Owner: ${ownerName} | Contact: ${ownerPhone}` },
        suitableCrops: { hi: "स्थानीय फसलें व जुताई", en: "Local Crops & Tillage" },
        suitableWork: { hi: "कस्टम किराए पर उपलब्ध", en: "Available for Custom Rent" },
        tool: { hi: "रोटावेटर / कल्टीवेटर अटैच्ड", en: "Rotavator / Cultivator Attached" },
        power: tractorBrand.includes('HP') ? tractorBrand.split('(')[1].replace(')', '') : "50 HP",
        rating: 5.0,
        reviewsCount: 1
    });

    // Sync tractor to Supabase
    if (sbClient) {
        sbClient.from('custom_tractors').insert([{
            id: newId,
            owner_name: ownerName,
            owner_phone: ownerPhone,
            village: ownerVillage,
            tractor_brand: tractorBrand,
            daily_rent: tractorRate,
            status: 'verified',
            created_at: new Date().toISOString()
        }]).then();
    }

    closeTractorRegModal();
    renderFleetCards(currentFilter);

    alert(t.regSuccessAlert.replace('{owner}', ownerName).replace('{tractor}', tractorBrand));
}

// ==========================================
// 5. Render Fleet Cards with Real Photos, Search, Sort & Ratings
// ==========================================
function renderFleetCards(category = 'all') {
    const grid = document.getElementById('fleetGrid');
    if (!grid) return;

    currentFilter = category;
    const t = translations[currentLang] || translations.hi;

    // 1. Filter by crop category
    let filtered = category === 'all'
        ? [...fleetData]
        : fleetData.filter(item => item.categories.includes(category));

    // 2. Filter by search query
    if (currentSearchQuery) {
        filtered = filtered.filter(item => {
            const nameHi = item.name.hi.toLowerCase();
            const nameEn = item.name.en.toLowerCase();
            const subHi = item.subtitle.hi.toLowerCase();
            const subEn = item.subtitle.en.toLowerCase();
            const cropsHi = item.suitableCrops.hi.toLowerCase();
            const cropsEn = item.suitableCrops.en.toLowerCase();
            const workHi = item.suitableWork.hi.toLowerCase();
            const workEn = item.suitableWork.en.toLowerCase();
            const toolHi = item.tool.hi.toLowerCase();
            const toolEn = item.tool.en.toLowerCase();
            const power = item.power.toLowerCase();

            return nameHi.includes(currentSearchQuery) ||
                nameEn.includes(currentSearchQuery) ||
                subHi.includes(currentSearchQuery) ||
                subEn.includes(currentSearchQuery) ||
                cropsHi.includes(currentSearchQuery) ||
                cropsEn.includes(currentSearchQuery) ||
                workHi.includes(currentSearchQuery) ||
                workEn.includes(currentSearchQuery) ||
                toolHi.includes(currentSearchQuery) ||
                toolEn.includes(currentSearchQuery) ||
                power.includes(currentSearchQuery);
        });
    }

    // 3. Sort
    if (currentSortMode === 'price-low') {
        filtered.sort((a, b) => a.rate - b.rate);
    } else if (currentSortMode === 'price-high') {
        filtered.sort((a, b) => b.rate - a.rate);
    } else if (currentSortMode === 'rating') {
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    // Update fleet count badge
    const countBadge = document.getElementById('fleetCountBadge');
    if (countBadge) {
        countBadge.textContent = `${filtered.length} ${t.fleetCountSuffix}`;
    }

    // If no matching machines
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="no-machines-card">
                <div class="no-machines-icon">🚜</div>
                <h4>${t.noMatchTitle}</h4>
                <p>${t.noMatchDesc}</p>
                <button type="button" class="btn btn-primary" onclick="clearSearch()">${t.btnResetSearch}</button>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(machine => {
        const title = machine.name[currentLang] || machine.name.hi;
        const sub = machine.subtitle[currentLang] || machine.subtitle.hi;
        const rateUnit = machine.rateUnit[currentLang] || machine.rateUnit.hi;
        const imgUrl = machine.image || "images/dhan-tractor.jpg";
        const dieselLabel = selectedFuelOption === 'with-fuel'
            ? (t.fuelWithShort || "डीजल सहित")
            : (t.fuelWithoutShort || "डीजल किसान का");

        // Verified badge ONLY if vehicle data has verified = true
        const verifiedBadge = machine.verified === true
            ? `<span class="card-verified-badge">✓ ${currentLang === 'hi' ? 'सत्यापित' : 'Verified'}</span>`
            : '';

        // Village and distance ONLY if exist in data
        const villageInfo = machine.village
            ? `<span class="card-meta-tag">📍 ${machine.village}</span>`
            : '';
        const distanceInfo = machine.distance
            ? `<span class="card-meta-tag">📏 ${machine.distance}</span>`
            : '';

        // Rating badge only if rating exists
        const ratingBadge = machine.rating
            ? `<div class="card-rating-pill">⭐ ${machine.rating}</div>`
            : '';

        return `
            <div class="machine-card">
                ${verifiedBadge}
                <div class="machine-card-image">
                    <img src="${imgUrl}" alt="${title}" class="machine-real-photo" loading="lazy" onerror="this.onerror=null; this.src='images/dhan-tractor.jpg'">
                    ${ratingBadge}
                </div>
                <div class="machine-card-body">
                    <h4 class="machine-title">${title}</h4>
                    <p class="machine-subtitle">${sub}</p>
                    
                    <div class="card-quick-meta">
                        <span class="card-diesel-badge">⛽ ${dieselLabel}</span>
                        ${villageInfo}
                        ${distanceInfo}
                    </div>

                    <div class="machine-card-footer">
                        <div class="price-box">
                            <span class="price-title">${t.cardPriceTitle}</span>
                            <span class="price-val">₹${machine.rate} <span class="price-unit">/ ${rateUnit}</span></span>
                        </div>
                        <button type="button" class="btn-book-card" onclick="openBookingModal('${machine.id}')">
                            ${t.cardBookBtn}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Crop Filter Tab Click Handler
function filterByCrop(category, buttonEl) {
    document.querySelectorAll('.crop-pill').forEach(btn => btn.classList.remove('active'));
    if (buttonEl) buttonEl.classList.add('active');
    renderFleetCards(category);
}

// Search & Sort Handlers
function handleSearchAndSort() {
    const searchInput = document.getElementById('machineSearchInput');
    const clearBtn = document.getElementById('clearSearchBtn');
    const sortSelect = document.getElementById('fleetSortSelect');

    currentSearchQuery = searchInput ? searchInput.value.trim().toLowerCase() : '';
    currentSortMode = sortSelect ? sortSelect.value : 'default';

    if (clearBtn) {
        clearBtn.style.display = currentSearchQuery ? 'block' : 'none';
    }

    renderFleetCards(currentFilter);
}

function clearSearch() {
    const searchInput = document.getElementById('machineSearchInput');
    const clearBtn = document.getElementById('clearSearchBtn');
    if (searchInput) searchInput.value = '';
    if (clearBtn) clearBtn.style.display = 'none';
    currentSearchQuery = '';
    renderFleetCards(currentFilter);
}

// ==========================================
// 6. GPS Location Auto-Detection
// ==========================================
// 6. Universal Multi-Tier GPS & Reverse Geocoding
// ==========================================
async function fetchReverseGeocode(lat, lng, lang = 'hi') {
    // 1. Try BigDataCloud (Free, client-side, fast, Native Hindi/English support)
    try {
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=${lang}`);
        if (res.ok) {
            const data = await res.json();
            const locality = data.locality || data.city || '';
            const adminLevel5 = data.localityInfo?.administrative?.find(a => a.adminLevel === 5)?.name || '';
            const district = adminLevel5 || data.city || '';
            const state = data.principalSubdivision || '';
            const parts = Array.from(new Set([locality, district, state].filter(Boolean)));
            if (parts.length > 0) {
                return {
                    name: parts.join(', '),
                    lat: data.latitude || lat,
                    lng: data.longitude || lng
                };
            }
        }
    } catch (e) {
        console.warn('BigDataCloud error, trying Nominatim fallback:', e);
    }

    // 2. Fallback to OpenStreetMap Nominatim
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=${lang},en`);
        if (res.ok) {
            const data = await res.json();
            const addr = data.address || {};
            const village = addr.village || addr.suburb || addr.town || addr.hamlet || addr.county || addr.city_district || '';
            const district = addr.state_district || addr.district || addr.county || addr.city || '';
            const state = addr.state || '';
            const parts = Array.from(new Set([village, district, state].filter(Boolean)));
            if (parts.length > 0) {
                return {
                    name: parts.join(', '),
                    lat,
                    lng
                };
            }
        }
    } catch (e) {
        console.warn('Nominatim fallback error:', e);
    }

    return {
        name: `GPS (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
        lat,
        lng
    };
}

// IP-based fallback when browser hardware GPS is unavailable or blocked on PC/laptop
async function fetchIpLocation(lang = 'hi') {
    try {
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=${lang}`);
        if (res.ok) {
            const data = await res.json();
            const city = data.city || data.locality || '';
            const state = data.principalSubdivision || '';
            const parts = Array.from(new Set([city, state].filter(Boolean)));
            if (parts.length > 0) {
                return {
                    name: parts.join(', '),
                    lat: data.latitude,
                    lng: data.longitude,
                    isIpFallback: true
                };
            }
        }
    } catch (e) {
        console.warn('IP fallback error:', e);
    }
    return null;
}

function getUniversalLocation(onStart, onSuccess, onError) {
    if (typeof onStart === 'function') onStart();
    const lang = currentLang || 'hi';

    const tryIpFallback = async (reason) => {
        const ipLoc = await fetchIpLocation(lang);
        if (ipLoc && ipLoc.name) {
            onSuccess({
                ...ipLoc,
                mapsUrl: `https://www.google.com/maps?q=${ipLoc.lat},${ipLoc.lng}`
            });
        } else {
            onError(reason);
        }
    };

    if (!navigator.geolocation) {
        tryIpFallback('No Geolocation API');
        return;
    }

    // Try standard browser geolocation (relaxed timeout, fallback on timeout or error)
    navigator.geolocation.getCurrentPosition(
        async (pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            const accuracy = Math.round(pos.coords.accuracy || 0);

            const result = await fetchReverseGeocode(lat, lng, lang);
            onSuccess({
                ...result,
                accuracy,
                mapsUrl: `https://www.google.com/maps?q=${lat},${lng}`
            });
        },
        async (err) => {
            console.warn('Hardware GPS error/timeout, using IP network location:', err);
            await tryIpFallback(err.message || 'GPS hardware timeout');
        },
        { enableHighAccuracy: false, timeout: 8000, maximumAge: 120000 }
    );
}

function detectFarmerLocation() {
    const statusPill = document.getElementById('farmerGpsStatus');
    const villageInput = document.getElementById('farmerVillage');
    const gpsInput = document.getElementById('farmerGpsLink');
    const t = translations[currentLang] || translations.hi;

    getUniversalLocation(
        () => {
            if (statusPill) {
                statusPill.style.display = 'block';
                statusPill.textContent = t.locDetecting;
                statusPill.className = 'gps-status-pill loading';
            }
        },
        (loc) => {
            if (villageInput) villageInput.value = loc.name;
            const mapsUrl = loc.mapsUrl || `https://www.google.com/maps?q=${loc.lat},${loc.lng}`;
            if (gpsInput) gpsInput.value = mapsUrl;

            if (statusPill) {
                statusPill.className = 'gps-status-pill success';
                statusPill.innerHTML = `✅ ${t.locSuccess.replace('{loc}', loc.name)} <a href="${mapsUrl}" target="_blank" class="gps-preview-link">🗺️ मैप देखें</a>`;
            }
        },
        () => {
            if (statusPill) {
                statusPill.textContent = t.locErr;
                statusPill.className = 'gps-status-pill error';
            }
            alert(t.locErr);
        }
    );
}

function detectOwnerLocation() {
    const statusPill = document.getElementById('ownerGpsStatus');
    const villageInput = document.getElementById('ownerVillage');
    const t = translations[currentLang] || translations.hi;

    getUniversalLocation(
        () => {
            if (statusPill) {
                statusPill.style.display = 'block';
                statusPill.textContent = t.locDetecting;
                statusPill.className = 'gps-status-pill loading';
            }
        },
        (loc) => {
            if (villageInput) villageInput.value = loc.name;
            if (statusPill) {
                statusPill.textContent = `✅ लोकेशन सेट: ${loc.name}`;
                statusPill.className = 'gps-status-pill success';
            }
        },
        () => {
            if (statusPill) {
                statusPill.textContent = t.locErr;
                statusPill.className = 'gps-status-pill error';
            }
        }
    );
}

// ==========================================
// 7. Booking Modal Handlers & Fuel Selection
// ==========================================
function openBookingModal(machineId) {
    selectedMachine = fleetData.find(m => m.id === machineId) || fleetData[0];
    const modal = document.getElementById('bookingModal');
    if (!modal) return;

    const t = translations[currentLang] || translations.hi;
    const title = selectedMachine.name[currentLang] || selectedMachine.name.hi;
    const sub = selectedMachine.subtitle[currentLang] || selectedMachine.subtitle.hi;
    const badge = selectedMachine.badge[currentLang] || selectedMachine.badge.hi;
    const rateUnit = selectedMachine.rateUnit[currentLang] || selectedMachine.rateUnit.hi;
    const imgUrl = selectedMachine.image || "images/dhan-tractor.jpg";

    document.getElementById('modalMachineTitle').textContent = title;
    document.getElementById('modalMachineSubtitle').textContent = sub;
    document.getElementById('modalMachineCategory').textContent = badge;

    // Reset Fuel Option to With Fuel
    selectedFuelOption = 'with-fuel';
    const withRadio = document.getElementById('fuelOptionWith');
    const withoutRadio = document.getElementById('fuelOptionWithout');
    const withCard = document.getElementById('fuelOptionWithCard');
    const withoutCard = document.getElementById('fuelOptionWithoutCard');

    if (withRadio) withRadio.checked = true;
    if (withoutRadio) withoutRadio.checked = false;
    if (withCard) withCard.classList.add('active');
    if (withoutCard) withoutCard.classList.remove('active');

    // Update fuel option rate badges
    const discount = selectedMachine.fuelDiscount || 200;
    const rateWith = selectedMachine.rate;
    const rateWithout = selectedMachine.rate - discount;

    const rateWithEl = document.getElementById('fuelRateWith');
    const rateWithoutEl = document.getElementById('fuelRateWithout');
    if (rateWithEl) rateWithEl.textContent = `₹${rateWith}/${rateUnit}`;
    if (rateWithoutEl) rateWithoutEl.textContent = `₹${rateWithout}/${rateUnit}`;

    // Set real photo in booking modal
    const modalPhoto = document.getElementById('modalMachinePhoto');
    if (modalPhoto) {
        modalPhoto.src = imgUrl;
        modalPhoto.alt = title;
    }

    // Reset GPS status badge
    const gpsStatus = document.getElementById('farmerGpsStatus');
    const gpsInput = document.getElementById('farmerGpsLink');
    if (gpsStatus) {
        gpsStatus.style.display = 'none';
        gpsStatus.innerHTML = '';
    }
    if (gpsInput) gpsInput.value = '';

    // Pre-fill user name and profile if logged in
    const savedUser = localStorage.getItem('tractorUser');
    const farmerNameInput = document.getElementById('farmerName');
    if (farmerNameInput && savedUser && savedUser !== t.guestUser) {
        farmerNameInput.value = savedUser;
    }

    const profileStr = localStorage.getItem('tractorUserProfile');
    if (profileStr) {
        try {
            const profile = JSON.parse(profileStr);
            const phoneInput = document.getElementById('farmerPhone');
            const villageInput = document.getElementById('farmerVillage');
            if (phoneInput && profile.phone && !phoneInput.value) {
                phoneInput.value = profile.phone;
            }
            if (villageInput && profile.village && !villageInput.value) {
                villageInput.value = profile.village;
            }
        } catch (e) {}
    }

    // Default duration
    document.getElementById('workDuration').value = 2;
    calculateEstimate();

    modal.style.display = 'flex';
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) modal.style.display = 'none';
}

function handleFuelOptionChange(option) {
    selectedFuelOption = option;
    const withCard = document.getElementById('fuelOptionWithCard');
    const withoutCard = document.getElementById('fuelOptionWithoutCard');
    const withRadio = document.getElementById('fuelOptionWith');
    const withoutRadio = document.getElementById('fuelOptionWithout');

    if (option === 'with-fuel') {
        if (withCard) withCard.classList.add('active');
        if (withoutCard) withoutCard.classList.remove('active');
        if (withRadio) withRadio.checked = true;
    } else {
        if (withCard) withCard.classList.remove('active');
        if (withoutCard) withoutCard.classList.add('active');
        if (withoutRadio) withoutRadio.checked = true;
    }

    calculateEstimate();
}

// Live Cost Calculator inside Booking Modal
function calculateEstimate() {
    if (!selectedMachine) return;
    const t = translations[currentLang] || translations.hi;
    const durationInput = document.getElementById('workDuration');
    const duration = parseFloat(durationInput ? durationInput.value : 1) || 1;
    const rateUnit = selectedMachine.rateUnit[currentLang] || selectedMachine.rateUnit.hi;

    const discount = selectedMachine.fuelDiscount || 200;
    const appliedRate = selectedFuelOption === 'with-fuel'
        ? selectedMachine.rate
        : (selectedMachine.rate - discount);

    const total = duration * appliedRate;

    const rateEl = document.getElementById('modalMachineRate');
    if (rateEl) {
        const fuelNote = selectedFuelOption === 'without-fuel' ? ` (${t.fuelWithoutShort})` : '';
        rateEl.textContent = `₹${appliedRate} / ${rateUnit}${fuelNote}`;
    }

    const totalEl = document.getElementById('modalTotalEstimate');
    if (totalEl) {
        totalEl.textContent = `₹${total.toLocaleString('en-IN')}`;
    }
}

// Handle Booking Form Submit & LocalStorage Persistence
function handleTractorBookingSubmit(event) {
    event.preventDefault();
    const t = translations[currentLang] || translations.hi;

    const farmerName = document.getElementById('farmerName').value.trim();
    const farmerPhone = document.getElementById('farmerPhone').value.trim();
    const farmerVillage = document.getElementById('farmerVillage').value.trim();
    const duration = document.getElementById('workDuration').value;
    const gpsLink = document.getElementById('farmerGpsLink') ? document.getElementById('farmerGpsLink').value : '';

    if (!farmerName || !farmerPhone || !farmerVillage) {
        alert(t.errFillFields);
        return;
    }

    const machineTitle = selectedMachine.name[currentLang] || selectedMachine.name.hi;
    const rateUnit = selectedMachine.rateUnit[currentLang] || selectedMachine.rateUnit.hi;
    const discount = selectedMachine.fuelDiscount || 200;
    const appliedRate = selectedFuelOption === 'with-fuel'
        ? selectedMachine.rate
        : (selectedMachine.rate - discount);
    const totalNum = parseFloat(duration) * appliedRate;
    const totalStr = totalNum.toLocaleString('en-IN');
    const orderId = 'TRAC-' + Math.floor(100000 + Math.random() * 900000);
    const fuelText = selectedFuelOption === 'with-fuel' ? t.fuelWithShort : t.fuelWithoutShort;

    const bookingRecord = {
        orderId,
        machineId: selectedMachine.id,
        machineTitle,
        machinePhoto: selectedMachine.image || "images/dhan-tractor.jpg",
        farmerName,
        farmerPhone,
        farmerVillage,
        gpsLink: gpsLink || `https://maps.google.com/?q=${encodeURIComponent(farmerVillage)}`,
        duration: `${duration} ${rateUnit}`,
        fuelOption: selectedFuelOption,
        fuelText,
        appliedRate,
        total: totalStr,
        date: new Date().toLocaleDateString(currentLang === 'hi' ? 'hi-IN' : 'en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }),
        status: 'confirmed'
    };

    saveBooking(bookingRecord);
    closeBookingModal();

    showReceiptModal({
        orderId,
        farmerName,
        farmerPhone,
        farmerVillage,
        gpsLink: bookingRecord.gpsLink,
        machineTitle: `${machineTitle} (${fuelText})`,
        duration: `${duration} ${rateUnit}`,
        total: `₹${totalStr}`
    });
}

function showReceiptModal(data) {
    const modal = document.getElementById('receiptModal');
    const content = document.getElementById('receiptDetailsContent');
    const t = translations[currentLang] || translations.hi;
    if (!modal || !content) return;

    const gpsRow = data.gpsLink ? `
        <div class="receipt-row">
            <span>${t.gpsFieldLabel}</span>
            <a href="${data.gpsLink}" target="_blank" class="receipt-map-link">📍 Google Maps पर लोकेशन देखें</a>
        </div>
    ` : '';

    content.innerHTML = `
        <div class="receipt-row">
            <span>${t.receiptOrderId}</span>
            <strong>${data.orderId}</strong>
        </div>
        <div class="receipt-row">
            <span>${t.receiptFarmer}</span>
            <span>${data.farmerName}</span>
        </div>
        <div class="receipt-row">
            <span>${t.receiptPhone}</span>
            <span>${data.farmerPhone}</span>
        </div>
        <div class="receipt-row">
            <span>${t.receiptVillage}</span>
            <span>${data.farmerVillage}</span>
        </div>
        ${gpsRow}
        <div class="receipt-row">
            <span>${t.receiptMachine}</span>
            <span>${data.machineTitle}</span>
        </div>
        <div class="receipt-row">
            <span>${t.receiptDuration}</span>
            <span>${data.duration}</span>
        </div>
        <div class="receipt-row">
            <span>${t.receiptTotal}</span>
            <strong>${data.total}</strong>
        </div>
    `;

    modal.style.display = 'flex';
}

function closeReceiptModal() {
    const modal = document.getElementById('receiptModal');
    if (modal) modal.style.display = 'none';
}

// ==========================================
// 8. Persistent Bookings (My Bookings) System
// ==========================================
function getBookings() {
    try {
        return JSON.parse(localStorage.getItem('tractorBookings') || '[]');
    } catch (e) {
        return [];
    }
}

function saveBooking(booking) {
    const bookings = getBookings();
    bookings.unshift(booking);
    localStorage.setItem('tractorBookings', JSON.stringify(bookings));
    updateBookingBadges();

    // Sync to Supabase Cloud Database
    if (sbClient) {
        sbClient.from('bookings').insert([{
            id: booking.orderId,
            machine_id: booking.machineId,
            machine_name: booking.machineTitle,
            farmer_name: booking.farmerName,
            farmer_phone: booking.farmerPhone,
            village: booking.farmerVillage,
            gps_link: booking.gpsLink,
            booking_date: booking.date,
            work_duration: parseFloat(booking.duration) || 1,
            rate_unit: booking.duration ? booking.duration.split(' ')[1] : 'Hour',
            fuel_option: booking.fuelOption,
            estimated_cost: parseFloat(String(booking.total).replace(/,/g, '')) || 0,
            status: booking.status || 'pending',
            created_at: new Date().toISOString()
        }]).then(({ error }) => {
            if (error) console.warn('Supabase booking sync notice:', error.message);
            else console.log('✅ Booking successfully stored in Supabase!');
        }).catch(e => console.warn('Supabase booking error:', e));
    }
}

async function syncBookingsFromSupabase() {
    if (!sbClient) return;
    try {
        const { data, error } = await sbClient
            .from('bookings')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && Array.isArray(data) && data.length > 0) {
            const mapped = data.map(b => ({
                orderId: b.id,
                machineId: b.machine_id,
                machineTitle: b.machine_name,
                machinePhoto: "images/dhan-tractor.jpg",
                farmerName: b.farmer_name,
                farmerPhone: b.farmer_phone,
                farmerVillage: b.village,
                gpsLink: b.gps_link,
                duration: `${b.work_duration} ${b.rate_unit || 'घंटा'}`,
                fuelOption: b.fuel_option,
                fuelText: b.fuel_option === 'with-fuel' ? 'डीजल सहित' : 'डीजल किसान का',
                appliedRate: 0,
                total: Number(b.estimated_cost).toLocaleString('en-IN'),
                date: b.booking_date || new Date(b.created_at).toLocaleDateString('hi-IN'),
                status: b.status || 'confirmed'
            }));

            const local = getBookings();
            const map = new Map();
            local.forEach(item => map.set(item.orderId, item));
            mapped.forEach(item => map.set(item.orderId, item));
            const merged = Array.from(map.values());

            localStorage.setItem('tractorBookings', JSON.stringify(merged));
            updateBookingBadges();
            if (document.getElementById('myBookingsList')) {
                renderMyBookings();
            }
        }
    } catch (e) {
        console.warn('Supabase syncBookings fallback:', e);
    }
}

function updateBookingBadges() {
    const bookings = getBookings().filter(b => b.status !== 'cancelled');
    const count = bookings.length;
    const t = translations[currentLang] || translations.hi;

    const drawerBadge = document.getElementById('drawerBookingCount');
    if (drawerBadge) {
        drawerBadge.textContent = `${count} ${t.badgeBookingCountText}`;
    }

    const navBadge = document.getElementById('navBookingBadge');
    if (navBadge) {
        if (count > 0) {
            navBadge.textContent = count;
            navBadge.style.display = 'inline-flex';
        } else {
            navBadge.style.display = 'none';
        }
    }
}

function openMyBookingsModal() {
    closeDrawer();
    renderMyBookings();
    const modal = document.getElementById('myBookingsModal');
    if (modal) modal.style.display = 'flex';
}

function closeMyBookingsModal() {
    const modal = document.getElementById('myBookingsModal');
    if (modal) modal.style.display = 'none';
}

function renderMyBookings() {
    const container = document.getElementById('myBookingsList');
    if (!container) return;
    const bookings = getBookings();
    const t = translations[currentLang] || translations.hi;

    if (bookings.length === 0) {
        container.innerHTML = `
            <div class="empty-bookings-box">
                <div class="empty-icon">🚜</div>
                <h4>${t.noBookingsTitle}</h4>
                <p>${t.noBookingsDesc}</p>
                <button type="button" class="btn btn-primary" onclick="closeMyBookingsModal()">${t.btnBookNow}</button>
            </div>
        `;
        return;
    }

    container.innerHTML = bookings.map(b => {
        const isCancelled = b.status === 'cancelled';
        const isRejected = b.status === 'rejected';
        const isPending = b.status === 'pending';

        let statusBadge = `<span class="booking-status-tag confirmed">${t.statusConfirmed}</span>`;
        if (isCancelled) {
            statusBadge = `<span class="booking-status-tag cancelled">${t.statusCancelled}</span>`;
        } else if (isRejected) {
            statusBadge = `<span class="booking-status-tag cancelled" style="background:#fee2e2; color:#991b1b; border:1px solid #fecaca;">${t.statusRejected}</span>`;
        } else if (isPending) {
            statusBadge = `<span class="booking-status-tag" style="background:#fef3c7; color:#92400e; border:1px solid #fde68a;">${t.statusPending}</span>`;
        }

        return `
            <div class="booking-record-card ${isCancelled || isRejected ? 'cancelled-card' : ''}">
                <div class="record-top">
                    <div class="record-main-info">
                        <img src="${b.machinePhoto || 'images/dhan-tractor.jpg'}" alt="${b.machineTitle}" class="record-thumb">
                        <div>
                            <h4 class="record-title">${b.machineTitle}</h4>
                            <span class="record-order-id">#${b.orderId} • ${b.date}</span>
                        </div>
                    </div>
                    ${statusBadge}
                </div>
                <div class="record-grid">
                    <div><strong>${t.receiptFarmer}:</strong> ${b.farmerName} (${b.farmerPhone})</div>
                    <div><strong>${t.receiptVillage}:</strong> ${b.farmerVillage}</div>
                    <div><strong>${t.receiptDuration}:</strong> ${b.duration}</div>
                    <div><strong>${t.fuelOptionLabel}:</strong> ${b.fuelText || t.fuelWithShort}</div>
                </div>
                <div class="record-bottom">
                    <div class="record-price">
                        <span>${t.receiptTotal}</span>
                        <strong>₹${b.total}</strong>
                    </div>
                    <div class="record-actions">
                        ${!isCancelled ? `<button type="button" class="btn-track-booking" onclick="openLiveTrackingModal('${b.orderId}')">${t.btnTrackTractor}</button>` : ''}
                        <button type="button" class="btn-receipt-view" onclick="viewPastReceipt('${b.orderId}')">${t.btnViewReceipt}</button>
                        ${!isCancelled ? `<button type="button" class="btn-booking-cancel" onclick="cancelBooking('${b.orderId}')">${t.btnCancelBooking}</button>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function cancelBooking(orderId) {
    const t = translations[currentLang] || translations.hi;
    if (!confirm(t.cancelConfirm)) return;

    const bookings = getBookings();
    const target = bookings.find(b => b.orderId === orderId);
    if (target) {
        target.status = 'cancelled';
        localStorage.setItem('tractorBookings', JSON.stringify(bookings));
        updateBookingBadges();
        renderMyBookings();

        if (sbClient) {
            sbClient.from('bookings').update({ status: 'cancelled' }).eq('id', orderId).then();
        }
    }
}

function viewPastReceipt(orderId) {
    const bookings = getBookings();
    const b = bookings.find(item => item.orderId === orderId);
    if (!b) return;
    closeMyBookingsModal();
    showReceiptModal({
        orderId: b.orderId,
        farmerName: b.farmerName,
        farmerPhone: b.farmerPhone,
        farmerVillage: b.farmerVillage,
        gpsLink: b.gpsLink,
        machineTitle: `${b.machineTitle} (${b.fuelText || ''})`,
        duration: b.duration,
        total: `₹${b.total}`
    });
}

// ==========================================
// 9. Live Tractor Tracking Modal
// ==========================================
function openLiveTrackingModal(orderId) {
    closeMyBookingsModal();
    const bookings = getBookings();
    const booking = bookings.find(b => b.orderId === orderId) || bookings[0];
    const modal = document.getElementById('liveTrackingModal');
    if (!modal) return;

    const subtitleEl = document.getElementById('trackingOrderSubtitle');
    const machinePhoto = document.getElementById('trackingMachinePhoto');
    const driverNameEl = document.getElementById('trackingDriverName');
    const machineDetailsEl = document.getElementById('trackingMachineDetails');
    const mapsBtn = document.getElementById('btnOpenGoogleMaps');

    if (booking) {
        if (subtitleEl) subtitleEl.textContent = `ऑर्डर #${booking.orderId} • ${booking.farmerVillage}`;
        if (machinePhoto) machinePhoto.src = booking.machinePhoto || 'images/dhan-tractor.jpg';
        if (machineDetailsEl) machineDetailsEl.textContent = `${booking.machineTitle} • UP 15 AB 4589`;
        if (mapsBtn) mapsBtn.href = booking.gpsLink || 'https://maps.google.com';
    }

    // Dynamic realistic ETA simulation
    const dist = (1.5 + Math.random() * 1.5).toFixed(1);
    const eta = Math.round(dist * 5 + 2);
    const speed = Math.round(20 + Math.random() * 5);

    const distEl = document.getElementById('trackDistance');
    const etaEl = document.getElementById('trackETA');
    const speedEl = document.getElementById('trackSpeed');

    if (distEl) distEl.textContent = `${dist} किमी`;
    if (etaEl) etaEl.textContent = `${eta} मिनट`;
    if (speedEl) speedEl.textContent = `${speed} किमी/घं`;

    modal.style.display = 'flex';
}

function closeLiveTrackingModal() {
    const modal = document.getElementById('liveTrackingModal');
    if (modal) modal.style.display = 'none';
}

function handleCallDriver() {
    handleCallSupport();
}

// ==========================================
// 10. Mandi Ticker
// ==========================================
function renderMandiTicker() {
    const ticker = document.getElementById('mandiTickerContent');
    if (!ticker) return;
    const t = translations[currentLang] || translations.hi;
    ticker.innerHTML = `
        <span class="mandi-item">${t.mandiTickerItem1}</span>
        <span class="mandi-divider">•</span>
        <span class="mandi-item">${t.mandiTickerItem2}</span>
        <span class="mandi-divider">•</span>
        <span class="mandi-item">${t.mandiTickerItem3}</span>
        <span class="mandi-divider">•</span>
        <span class="mandi-item">${t.mandiTickerItem4}</span>
        <span class="mandi-divider">•</span>
        <span class="mandi-item">${t.mandiTickerItem5}</span>
        <span class="mandi-divider">•</span>
        <span class="mandi-item">${t.mandiTickerItem6}</span>
    `;
}

// ==========================================
// 11. Call & WhatsApp Support Dispatchers (No Hardcoded Numbers)
// ==========================================
function handleCallSupport() {
    const modal = document.getElementById('callSupportModal');
    if (modal) modal.style.display = 'flex';
}

function closeCallSupportModal() {
    const modal = document.getElementById('callSupportModal');
    if (modal) modal.style.display = 'none';
}

function submitCallbackRequest() {
    const t = translations[currentLang] || translations.hi;
    const phoneInput = document.getElementById('callbackPhone');
    const phone = phoneInput ? phoneInput.value.trim() : '';

    if (!phone || phone.length < 10) {
        alert(t.callbackErr);
        return;
    }

    alert(t.callbackSuccess.replace('{phone}', phone));
    if (phoneInput) phoneInput.value = '';
    closeCallSupportModal();
}

// Universal WhatsApp Share Dispatcher with GPS Field Location Pin
function sendBookingViaWhatsApp() {
    if (!selectedMachine) return;
    const t = translations[currentLang] || translations.hi;
    const farmerName = document.getElementById('farmerName').value.trim() || 'Kisan';
    const farmerPhone = document.getElementById('farmerPhone').value.trim() || 'Not Provided';
    const farmerVillage = document.getElementById('farmerVillage').value.trim() || 'Village';
    const gpsLink = document.getElementById('farmerGpsLink') ? document.getElementById('farmerGpsLink').value : '';
    const duration = document.getElementById('workDuration').value || 1;
    const cropName = document.getElementById('workCropName').value.trim() || 'Kheti';
    const machineTitle = selectedMachine.name[currentLang] || selectedMachine.name.hi;
    const rateUnit = selectedMachine.rateUnit[currentLang] || selectedMachine.rateUnit.hi;

    const discount = selectedMachine.fuelDiscount || 200;
    const appliedRate = selectedFuelOption === 'with-fuel'
        ? selectedMachine.rate
        : (selectedMachine.rate - discount);
    const total = (parseFloat(duration) * appliedRate);
    const fuelText = selectedFuelOption === 'with-fuel' ? t.fuelWithShort : t.fuelWithoutShort;

    const gpsLine = gpsLink ? `📍 *Khet Ka Google Maps Link:* ${gpsLink}\n` : '';

    const message = `🚜 *PROJECT TRACTOR - BOOKING ORDER* 🚜\n\n` +
        `👤 *Kisan Ka Naam:* ${farmerName}\n` +
        `📱 *Mobile Number:* ${farmerPhone}\n` +
        `📍 *Gaon / Khet Location:* ${farmerVillage}\n` +
        gpsLine +
        `🌾 *Fasal / Kaam:* ${cropName}\n` +
        `🚜 *Chuni Gayi Gaadi:* ${machineTitle}\n` +
        `⛽ *Diesel Option:* ${fuelText}\n` +
        `⏱️ *Samay / Avadhi:* ${duration} ${rateUnit}\n` +
        `💰 *Anumanit Bill:* ₹${total.toLocaleString('en-IN')}\n\n` +
        `Kripya jaldi se tractor bhejane ki pushti karein. Shukriya!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
}

function openDirectWhatsApp() {
    const msg = encodeURIComponent("Namaste! Mujhe Project Tractor se kheti ke liye tractor / machine kiraye par chahiye. Kripya jankari dein.");
    window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
}

// ==========================================
// 12. Language Switch Logic
// ==========================================
function applyLanguage(lang) {
    if (!translations[lang]) lang = 'hi';
    currentLang = lang;
    localStorage.setItem('tractorLang', lang);

    const t = translations[lang];

    // Highlight active language button
    const btnHi = document.getElementById('langBtnHi');
    const btnEn = document.getElementById('langBtnEn');
    if (btnHi) btnHi.classList.toggle('active-lang', lang === 'hi');
    if (btnEn) btnEn.classList.toggle('active-lang', lang === 'en');

    // Update text
    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.textContent = t[key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) {
            el.placeholder = t[key];
        }
    });

    // Update current lang indicators
    document.querySelectorAll('#currentLangTag').forEach((el) => {
        el.textContent = t.langTag;
    });

    // Update Page Title
    const isLoginPage = document.body.classList.contains('login-body');
    if (isLoginPage) {
        document.title = (lang === 'hi') ? 'लॉगिन - प्रोजेक्ट ट्रैक्टर' : 'Login - Project Tractor';
    } else {
        document.title = (lang === 'hi') ? 'प्रोजेक्ट ट्रैक्टर - किसान पोर्टल' : 'Project Tractor - Farmer Portal';
    }

    // Re-render fleet and ticker in chosen language
    renderFleetCards(currentFilter);
    renderMandiTicker();
    updateBookingBadges();

    // Update navbar session state
    updateNavSession();
}

function selectLanguage(lang) {
    applyLanguage(lang);
    sessionStorage.setItem('tractorLangPromptShown', 'true');
    closeLanguageModal();
}

function openLanguageModal() {
    const modal = document.getElementById('languageModal');
    if (modal) modal.style.display = 'flex';
}

function closeLanguageModal() {
    const modal = document.getElementById('languageModal');
    if (modal) modal.style.display = 'none';
}

// Close modals when clicking overlay outside the card
window.addEventListener('click', (e) => {
    const langModal = document.getElementById('languageModal');
    const bookModal = document.getElementById('bookingModal');
    const receiptModal = document.getElementById('receiptModal');
    const regModal = document.getElementById('tractorRegModal');
    const termsModal = document.getElementById('termsPolicyModal');
    const callModal = document.getElementById('callSupportModal');
    const myBookingsModal = document.getElementById('myBookingsModal');
    const liveTrackingModal = document.getElementById('liveTrackingModal');

    if (e.target === langModal && localStorage.getItem('tractorLang')) {
        closeLanguageModal();
    }
    if (e.target === bookModal) {
        closeBookingModal();
    }
    if (e.target === receiptModal) {
        closeReceiptModal();
    }
    if (e.target === regModal) {
        closeTractorRegModal();
    }
    if (e.target === termsModal) {
        closeTermsModal();
    }
    if (e.target === callModal) {
        closeCallSupportModal();
    }
    if (e.target === myBookingsModal) {
        closeMyBookingsModal();
    }
    if (e.target === liveTrackingModal) {
        closeLiveTrackingModal();
    }
});

// ==========================================
// 13. Auth & Navbar Session
// ==========================================
function updateNavSession() {
    const drawerUserName = document.getElementById('drawerUserName');
    const drawerAuthText = document.getElementById('drawerAuthText');
    const t = translations[currentLang] || translations.hi;

    const user = localStorage.getItem('tractorUser');
    if (user) {
        if (drawerUserName) drawerUserName.textContent = t.navGreetingUser.replace('{user}', user);
        if (drawerAuthText) drawerAuthText.textContent = t.navLogout;
    } else {
        if (drawerUserName) drawerUserName.textContent = t.navGreetingGuest;
        if (drawerAuthText) drawerAuthText.textContent = t.navLogin;
    }
}

function switchAuthTab(tab) {
    const tabLoginBtn = document.getElementById('tabLoginBtn');
    const tabRegisterBtn = document.getElementById('tabRegisterBtn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginSectionFooter = document.getElementById('loginSectionFooter');
    const loginMessage = document.getElementById('loginMessage');
    const registerMessage = document.getElementById('registerMessage');

    if (loginMessage) loginMessage.style.display = 'none';
    if (registerMessage) registerMessage.style.display = 'none';

    if (tab === 'register') {
        if (tabRegisterBtn) tabRegisterBtn.classList.add('active');
        if (tabLoginBtn) tabLoginBtn.classList.remove('active');
        if (loginForm) loginForm.style.display = 'none';
        if (loginSectionFooter) loginSectionFooter.style.display = 'none';
        if (registerForm) registerForm.style.display = 'block';
    } else {
        if (tabLoginBtn) tabLoginBtn.classList.add('active');
        if (tabRegisterBtn) tabRegisterBtn.classList.remove('active');
        if (loginForm) loginForm.style.display = 'block';
        if (loginSectionFooter) loginSectionFooter.style.display = 'block';
        if (registerForm) registerForm.style.display = 'none';
    }
}

function handleRoleChange(radio) {
    document.querySelectorAll('.role-card').forEach(card => card.classList.remove('selected'));
    const parentCard = radio.closest('.role-card');
    if (parentCard) parentCard.classList.add('selected');
}

function detectRegisterLocation() {
    const statusDiv = document.getElementById('regGpsStatus');
    const villageInput = document.getElementById('regVillage');
    const btn = document.getElementById('btnRegGps');

    getUniversalLocation(
        () => {
            if (statusDiv) {
                statusDiv.style.display = 'inline-block';
                statusDiv.className = 'gps-status-pill loading';
                statusDiv.innerHTML = '⏳ GPS व नेटवर्क से स्थान खोजा जा रहा है...';
            }
            if (btn) btn.disabled = true;
        },
        (loc) => {
            if (btn) btn.disabled = false;
            if (villageInput) villageInput.value = loc.name;
            if (statusDiv) {
                statusDiv.className = 'gps-status-pill success';
                statusDiv.innerHTML = `✅ स्थान प्राप्त हुआ: <strong>${loc.name}</strong>`;
            }
        },
        () => {
            if (btn) btn.disabled = false;
            if (statusDiv) {
                statusDiv.className = 'gps-status-pill error';
                statusDiv.innerHTML = '⚠️ स्थान नहीं मिल सका। कृपया गांव का नाम हाथ से दर्ज करें।';
            }
        }
    );
}

function getRegisteredUsers() {
    try {
        const raw = localStorage.getItem('tractorRegisteredUsers');
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

function saveRegisteredUsers(users) {
    localStorage.setItem('tractorRegisteredUsers', JSON.stringify(users));
}

// ==========================================
// 13. Password-Only Auth System (OTP removed for security — simulated OTP was insecure)
// ==========================================
let currentLoginMode = 'password'; // Always password mode now

// OTP functions removed — simulated OTP was a security risk
// (OTP showed on same screen, anyone could login as anyone)
// Real SMS OTP will be added when Fast2SMS/Twilio is integrated
function switchLoginMode() { /* no-op — password only now */ }
function showOtpToast() { /* removed */ }
function closeOtpToast() { /* removed */ }
function autoFillOtp() { /* removed */ }
function startOtpCountdown() { /* removed */ }
function sendLoginOtp() { /* removed */ }
function sendRegisterOtp() { /* removed */ }

async function handleRegister(event) {
    event.preventDefault();
    const t = translations[currentLang] || translations.hi;

    const fullNameInput = document.getElementById('regFullName');
    const phoneInput = document.getElementById('regPhone');
    const roleRadio = document.querySelector('input[name="regRole"]:checked');
    const villageInput = document.getElementById('regVillage');
    const passwordInput = document.getElementById('regPassword');
    const confirmPasswordInput = document.getElementById('regConfirmPassword');

    const fullName = fullNameInput ? fullNameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const role = roleRadio ? roleRadio.value : 'farmer';
    const village = villageInput ? villageInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value : '';
    const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';

    if (!fullName || !phone || !village || !password || !confirmPassword) {
        showRegisterMessage(t.errFillFields, 'error');
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        showRegisterMessage(t.errPhoneInvalid, 'error');
        return;
    }

    if (password.length < 4) {
        showRegisterMessage(t.errPasswordLength, 'error');
        return;
    }

    if (password !== confirmPassword) {
        showRegisterMessage(t.errPasswordMismatch, 'error');
        return;
    }

    showRegisterMessage('⏳ खाता बनाया जा रहा है...', 'info');

    // 1. Check Supabase for existing user
    if (sbClient) {
        try {
            const { data: existingUser } = await sbClient
                .from('users_profile')
                .select('phone')
                .eq('phone', phone)
                .maybeSingle();

            if (existingUser) {
                showRegisterMessage(t.errPhoneExists, 'error');
                return;
            }
        } catch (e) {
            console.warn('Supabase check fallback:', e);
        }
    }

    // Local check fallback
    const users = getRegisteredUsers();
    const existing = users.find(u => u.phone === phone);
    if (existing) {
        showRegisterMessage(t.errPhoneExists, 'error');
        return;
    }

    const newUser = {
        id: 'user-' + Date.now(),
        full_name: fullName,
        phone: phone,
        role: role,
        village: village,
        password: password,
        created_at: new Date().toISOString()
    };

    // 2. Insert into Supabase Cloud
    if (sbClient) {
        try {
            const { error: insertError } = await sbClient
                .from('users_profile')
                .insert([newUser]);
            if (insertError) {
                console.warn('Supabase insert warning:', insertError.message);
            } else {
                console.log('✅ User registered in Supabase cloud!');
            }
        } catch (e) {
            console.warn('Supabase insert exception:', e);
        }
    }

    // 3. Always save to LocalStorage (offline backup)
    users.push({
        id: newUser.id,
        fullName: newUser.full_name,
        phone: newUser.phone,
        role: newUser.role,
        village: newUser.village,
        password: newUser.password,
        createdAt: newUser.created_at
    });
    saveRegisteredUsers(users);

    // Auto-login registered user
    localStorage.setItem('tractorUser', fullName);
    localStorage.setItem('tractorUserProfile', JSON.stringify({
        fullName,
        phone,
        role,
        village
    }));

    showRegisterMessage(t.regSuccess, 'success');

    setTimeout(() => {
        if (role === 'owner') {
            window.location.replace('owner.html');
        } else {
            window.location.replace('index.html');
        }
    }, 900);
}

function showRegisterMessage(text, type) {
    const box = document.getElementById('registerMessage');
    if (!box) return;
    box.textContent = text;
    box.className = 'message-box ' + type;
    box.style.display = 'block';
}

async function handleLogin(event) {
    event.preventDefault();
    const t = translations[currentLang] || translations.hi;

    // PASSWORD LOGIN MODE (secure — requires registered password)
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const username = usernameInput ? usernameInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value.trim() : '';

    if (!username || !password) {
        showMessage(t.errFillFields, 'error');
        return;
    }

    if (password.length < 4) {
        showMessage(t.errPasswordLength, 'error');
        return;
    }

    showMessage('⏳ लॉगिन की पुष्टि हो रही है...', 'info');

    let foundUser = null;

    // Check Supabase cloud database first
    if (sbClient) {
        try {
            const { data, error } = await sbClient
                .from('users_profile')
                .select('*')
                .or(`phone.eq.${username},full_name.ilike.${username}`)
                .maybeSingle();

            if (!error && data) {
                foundUser = {
                    id: data.id,
                    fullName: data.full_name,
                    phone: data.phone,
                    role: data.role,
                    village: data.village,
                    password: data.password
                };
            }
        } catch (e) {
            console.warn('Supabase login check fallback:', e);
        }
    }

    // Check local storage fallback (offline)
    if (!foundUser) {
        const users = getRegisteredUsers();
        foundUser = users.find(u => u.phone === username || (u.fullName && u.fullName.toLowerCase() === username.toLowerCase()));
    }

    if (!foundUser) {
        showMessage(t.errUserNotFound || 'यह नंबर/नाम रजिस्टर नहीं है। पहले नया खाता बनाएं।', 'error');
        return;
    }

    if (foundUser.password !== password) {
        showMessage(t.errWrongPassword, 'error');
        return;
    }

    localStorage.setItem('tractorUser', foundUser.fullName || foundUser.full_name);
    localStorage.setItem('tractorUserProfile', JSON.stringify(foundUser));

    showMessage(t.loginSuccess, 'success');

    setTimeout(() => {
        if (foundUser && foundUser.role === 'owner') {
            window.location.replace('owner.html');
        } else {
            window.location.replace('index.html');
        }
    }, 800);
}

function guestLogin() {
    const t = translations[currentLang] || translations.hi;
    localStorage.setItem('tractorUser', t.guestUser);
    window.location.replace('index.html');
}

// ==========================================
// Forgot Password — 3-Step Verification Reset
// ==========================================
let resetVerifiedUser = null; // Stores verified user for password reset

function forgotPassword(event) {
    event.preventDefault();
    // Hide login & register forms, show forgot form
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const forgotForm = document.getElementById('forgotForm');
    const loginFooter = document.getElementById('loginSectionFooter');
    const authTabs = document.querySelector('.auth-tabs');

    if (loginForm) loginForm.style.display = 'none';
    if (registerForm) registerForm.style.display = 'none';
    if (loginFooter) loginFooter.style.display = 'none';
    if (authTabs) authTabs.style.display = 'none';
    if (forgotForm) forgotForm.style.display = 'block';

    // Reset form state
    resetVerifiedUser = null;
    const step1 = document.getElementById('resetStep1');
    const step2 = document.getElementById('resetStep2');
    if (step1) step1.style.display = 'block';
    if (step2) step2.style.display = 'none';
    showForgotMessage('', '');
}

function cancelForgotPassword() {
    const loginForm = document.getElementById('loginForm');
    const forgotForm = document.getElementById('forgotForm');
    const loginFooter = document.getElementById('loginSectionFooter');
    const authTabs = document.querySelector('.auth-tabs');

    if (forgotForm) forgotForm.style.display = 'none';
    if (loginForm) loginForm.style.display = 'block';
    if (loginFooter) loginFooter.style.display = 'block';
    if (authTabs) authTabs.style.display = 'flex';

    resetVerifiedUser = null;
}

async function verifyResetIdentity() {
    const t = translations[currentLang] || translations.hi;
    const phone = (document.getElementById('resetPhone')?.value || '').trim();
    const name = (document.getElementById('resetName')?.value || '').trim();
    const village = (document.getElementById('resetVillage')?.value || '').trim();

    if (!phone || !name || !village) {
        showForgotMessage(t.errFillFields, 'error');
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        showForgotMessage(t.errPhoneInvalid, 'error');
        return;
    }

    showForgotMessage('⏳ पहचान सत्यापित हो रही है...', 'info');

    let foundUser = null;

    // Check Supabase first
    if (sbClient) {
        try {
            const { data } = await sbClient
                .from('users_profile')
                .select('*')
                .eq('phone', phone)
                .maybeSingle();

            if (data) {
                foundUser = {
                    id: data.id,
                    fullName: data.full_name,
                    phone: data.phone,
                    role: data.role,
                    village: data.village,
                    password: data.password
                };
            }
        } catch (e) {
            console.warn('Supabase reset check fallback:', e);
        }
    }

    // localStorage fallback
    if (!foundUser) {
        const users = getRegisteredUsers();
        foundUser = users.find(u => u.phone === phone);
    }

    if (!foundUser) {
        showForgotMessage(t.errUserNotFound || 'यह नंबर रजिस्टर नहीं है।', 'error');
        return;
    }

    // Verify Name (case-insensitive, trim spaces)
    const regName = (foundUser.fullName || foundUser.full_name || '').trim().toLowerCase();
    const enteredName = name.trim().toLowerCase();

    // Verify Village (partial match — user might not type exact village)
    const regVillage = (foundUser.village || '').trim().toLowerCase();
    const enteredVillage = village.trim().toLowerCase();

    if (regName !== enteredName) {
        showForgotMessage(t.forgotNameMismatch || '❌ नाम मेल नहीं खा रहा। रजिस्ट्रेशन में दिया गया नाम डालें।', 'error');
        return;
    }

    // Check if entered village is contained in registered village or vice versa
    if (!regVillage.includes(enteredVillage) && !enteredVillage.includes(regVillage)) {
        showForgotMessage(t.forgotVillageMismatch || '❌ गांव/जिला मेल नहीं खा रहा। रजिस्ट्रेशन में दिया गया गांव डालें।', 'error');
        return;
    }

    // ✅ Verification passed!
    resetVerifiedUser = foundUser;
    const step1 = document.getElementById('resetStep1');
    const step2 = document.getElementById('resetStep2');
    if (step1) step1.style.display = 'none';
    if (step2) step2.style.display = 'block';
    showForgotMessage('', '');
}

async function handleResetPassword(event) {
    event.preventDefault();
    const t = translations[currentLang] || translations.hi;

    if (!resetVerifiedUser) {
        showResetMessage('❌ पहचान सत्यापित नहीं हुई।', 'error');
        return;
    }

    const newPass = (document.getElementById('resetNewPassword')?.value || '');
    const confirmPass = (document.getElementById('resetConfirmPassword')?.value || '');

    if (!newPass || !confirmPass) {
        showResetMessage(t.errFillFields, 'error');
        return;
    }

    if (newPass.length < 4) {
        showResetMessage(t.errPasswordLength, 'error');
        return;
    }

    if (newPass !== confirmPass) {
        showResetMessage(t.errPasswordMismatch, 'error');
        return;
    }

    showResetMessage('⏳ पासवर्ड अपडेट हो रहा है...', 'info');

    // Update in Supabase
    if (sbClient) {
        try {
            const { error } = await sbClient
                .from('users_profile')
                .update({ password: newPass })
                .eq('phone', resetVerifiedUser.phone);

            if (error) {
                console.warn('Supabase password update warning:', error.message);
            } else {
                console.log('✅ Password updated in Supabase!');
            }
        } catch (e) {
            console.warn('Supabase update fallback:', e);
        }
    }

    // Update in localStorage
    const users = getRegisteredUsers();
    const idx = users.findIndex(u => u.phone === resetVerifiedUser.phone);
    if (idx !== -1) {
        users[idx].password = newPass;
        saveRegisteredUsers(users);
    }

    showResetMessage(t.forgotResetSuccess || '✅ पासवर्ड सफलतापूर्वक बदल दिया गया! अब लॉगिन करें।', 'success');

    resetVerifiedUser = null;

    // Go back to login after 2 seconds
    setTimeout(() => {
        cancelForgotPassword();
    }, 2000);
}

function showForgotMessage(text, type) {
    const box = document.getElementById('forgotMessage');
    if (!box) return;
    if (!text) { box.style.display = 'none'; return; }
    box.textContent = text;
    box.className = 'message-box ' + type;
    box.style.display = 'block';
}

function showResetMessage(text, type) {
    const box = document.getElementById('resetMessage');
    if (!box) return;
    if (!text) { box.style.display = 'none'; return; }
    box.textContent = text;
    box.className = 'message-box ' + type;
    box.style.display = 'block';
}

function showSignUpNotice(event) {
    event.preventDefault();
    switchAuthTab('register');
}

function showMessage(text, type) {
    const box = document.getElementById('loginMessage');
    if (!box) return;
    box.textContent = text;
    box.className = 'message-box ' + type;
    box.style.display = 'block';
}

function logout() {
    localStorage.removeItem('tractorUser');
    localStorage.removeItem('tractorUserProfile');
    window.location.replace('login.html');
}

// ==========================================
// 14. Page Initialization
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('tractorLang');
    const sessionSeen = sessionStorage.getItem('tractorLangPromptShown');

    if (!savedLang || !sessionSeen) {
        openLanguageModal();
        applyLanguage(savedLang || 'hi');
    } else {
        applyLanguage(savedLang);
    }

    renderMandiTicker();
    updateBookingBadges();
    syncBookingsFromSupabase();
});
