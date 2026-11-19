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
let fleetData = [
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
        drawerVerifiedBadge: "किसान प्रोफाइल",
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

        // GPS & Booking Status (Real Tracking)
        btnDetectGPS: "GPS से खेत खोजें",
        locDetecting: "⏳ जीपीएस लोकेशन खोजी जा रही है...",
        locSuccess: "खेत की लोकेशन सेट हो गई: {loc}",
        locErr: "⚠️ लोकेशन नहीं मिल सकी। कृपया गांव का नाम टाइप करें।",
        gpsFieldLabel: "खेत का GPS मैप:",
        btnTrackTractor: "📍 स्टेटस देखें",
        statusModalTitle: "बुकिंग स्टेटस (Booking Status)",
        statusModalSub: "रियल-टाइम बुकिंग प्रगति",
        stepRequested: "अनुरोध भेजा",
        stepAccepted: "स्वीकृत",
        stepDriverAssigned: "ड्राइवर असाइन",
        stepReached: "खेत पर आगमन",
        stepWorkDone: "काम पूरा हुआ",
        statusMsgRequested: "📢 स्थिति: अनुरोध भेज दिया गया है। टीम व ट्रैक्टर मालिक जल्द आपको कॉल करेंगे।",
        statusMsgAccepted: "✅ ट्रैक्टर मालिक ने बुकिंग स्वीकार कर ली है! ड्राइवर जल्द खेत के लिए निकलेगा।",
        statusMsgCancelled: "❌ यह बुकिंग रद्द कर दी गई है।",
        statusMsgRejected: "⚠️ इस समय ट्रैक्टर मालिक उपलब्ध नहीं हैं। कृपया दूसरा वाहन बुक करें या सहायता पर कॉल करें।",
        btnCancelBookingAction: "❌ बुकिंग रद्द करें",
        btnCallSupportAction: "📞 सहायता कॉल करें",
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
        labelBookingDate: "तारीख चुनें (किस दिन चाहिए?) *",
        helperDateRange: "आज से अगले 30 दिन तक बुक कर सकते हैं",
        labelBookingSlot: "समय स्लॉट चुनें *",
        slotMorning: "🌅 सुबह (06:00 AM - 10:00 AM)",
        slotDay: "☀️ दोपहर (10:00 AM - 02:00 PM)",
        slotAfternoon: "🌤️ दोपहर बाद (02:00 PM - 06:00 PM)",
        slotCustom: "⏰ सटीक / सुविधानुसार समय",
        labelFarmerName: "किसान का नाम *",
        placeholderFarmerName: "जैसे: रमेश कुमार",
        labelFarmerPhone: "मोबाइल नंबर *",
        placeholderFarmerPhone: "10 अंकों का मोबाइल नंबर",
        labelFarmerVillage: "गांव / खेत का स्थान व जिला *",
        placeholderFarmerVillage: "जैसे: रामपुर, मेरठ (या GPS बटन दबाएं)",
        labelWorkDuration: "कितने घंटे / बीघा चाहिए? *",
        labelWorkDurationHours: "कितने घंटे चाहिए? (काम का समय) *",
        helperDurationHours: "सटीक हिसाब के लिए सिर्फ घंटों में दर्ज करें",
        labelWorkCrop: "किस फसल के लिए काम करवाना है?",
        placeholderWorkCrop: "जैसे: धान का कीचड़, गेहूं बोवाई",
        breakdownTitle: "📊 किराए का पूरा विवरण (Final Rate Breakdown)",
        breakdownBaseLabel: "मूल किराया (Base Rate):",
        breakdownDieselLabel: "डीजल विकल्प (Fuel):",
        breakdownTravelLabel: "दूरी / ट्रैवल चार्ज (5 किमी तक):",
        breakdownTravelFree: "₹0 (बिल्कुल मुफ्त)",
        breakdownTotalLabel: "कुल अंतिम राशि (Total Amount):",
        noHiddenChargesNote: "✅ यही फाइनल रेट है, बाद में कोई छुपा चार्ज नहीं",
        btnSpeakEstimate: "बोल कर सुनें",
        btnConfirmBooking: "बुकिंग पक्की करें",
        btnSendWhatsApp: "व्हाट्सएप पर बुकिंग भेजें",

        // Receipt Modal
        receiptTitle: "आपका अनुरोध मिल गया, टीम जल्द कॉल करेगी",
        receiptSub: "ट्रैक्टर मालिक द्वारा स्वीकार करने के बाद बुकिंग पक्की होगी। हमारी टीम जल्द आपसे संपर्क करेगी।",
        receiptCloseBtn: "ठीक है (Close)",
        receiptTrackStatusBtn: "बुकिंग स्टेटस देखें",
        btnSpeakReceipt: "रसीद बोल कर सुनें",
        btnSpeakStatus: "सुनें",
        btnTrackStatusSearch: "स्टेटस देखें",
        lookupErrNotFound: "बुकिंग नहीं मिली! कृपया अपना बुकिंग कोड (उदा. TRAC-0001) और वही 10 अंकों का मोबाइल नंबर दर्ज करें जो बुकिंग के समय दिया था।",
        lookupLoading: "⏳ डेटाबेस से लाइव स्टेटस जांच रहे हैं...",
        bookingSubmitting: "⏳ अनुरोध भेजा जा रहा है...",
        bookingNetworkError: "⚠️ सर्वर से संपर्क नहीं हो पाया। चिंता न करें! नीचे दिए गए व्हाट्सएप बटन पर क्लिक करके सीधे अपनी बुकिंग भेजें।",
        receiptOrderId: "ऑर्डर नंबर:",
        receiptBookingDate: "चुनी गई तारीख:",
        receiptBookingSlot: "समय स्लॉट:",
        receiptFarmer: "किसान का नाम:",
        receiptPhone: "मोबाइल नंबर:",
        receiptVillage: "स्थान / गांव:",
        receiptMachine: "चुनी गई मशीन:",
        receiptDuration: "समय / अवधि:",
        receiptTotal: "अनुमानित कुल बिल:",
        errInvalidDate: "कृपया आज या अगले 30 दिनों में से सही तारीख चुनें।",
        errInvalidPhone: "कृपया 10 अंकों का सही मोबाइल नंबर दर्ज करें।",

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
        regModalSubtitle: "अपने खाली ट्रैक्टर को किराये पर देकर अतिरिक्त कमाई करें।",
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
        drawerVerifiedBadge: "Farmer Profile",
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

        // GPS & Booking Status (Real Tracking)
        btnDetectGPS: "Auto-Detect GPS",
        locDetecting: "⏳ Detecting GPS location...",
        locSuccess: "Farm GPS set: {loc}",
        locErr: "⚠️ Location could not be detected. Please type village name.",
        gpsFieldLabel: "Field GPS Location:",
        btnTrackTractor: "📍 View Status",
        statusModalTitle: "Booking Status",
        statusModalSub: "Real-time Booking Progress",
        stepRequested: "Requested",
        stepAccepted: "Accepted",
        stepDriverAssigned: "Driver Assigned",
        stepReached: "Reached Field",
        stepWorkDone: "Work Done",
        statusMsgRequested: "📢 Status: Booking requested. Our team & tractor owner will call you shortly.",
        statusMsgAccepted: "✅ Tractor owner has accepted the booking! Driver will depart for your farm soon.",
        statusMsgCancelled: "❌ This booking has been cancelled.",
        statusMsgRejected: "⚠️ Tractor owner is currently unavailable. Please choose another machine or call support.",
        btnCancelBookingAction: "❌ Cancel Booking",
        btnCallSupportAction: "📞 Call Support",
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
        labelBookingDate: "Select Date (When needed?) *",
        helperDateRange: "Book for today or up to 30 days ahead",
        labelBookingSlot: "Select Time Slot *",
        slotMorning: "🌅 Morning (06:00 AM - 10:00 AM)",
        slotDay: "☀️ Day (10:00 AM - 02:00 PM)",
        slotAfternoon: "🌤️ Afternoon (02:00 PM - 06:00 PM)",
        slotCustom: "⏰ Custom / Exact Time",
        labelFarmerName: "Farmer Name *",
        placeholderFarmerName: "e.g. Ramesh Kumar",
        labelFarmerPhone: "Mobile Number *",
        placeholderFarmerPhone: "10-digit mobile number",
        labelFarmerVillage: "Village / Field Location & District *",
        placeholderFarmerVillage: "e.g. Rampur, Meerut (or tap GPS button)",
        labelWorkDuration: "Hours or Acres Required? *",
        labelWorkDurationHours: "How many hours needed? (Work Duration) *",
        helperDurationHours: "Enter duration strictly in hours for accurate billing",
        labelWorkCrop: "Crop or Work Purpose:",
        placeholderWorkCrop: "e.g. Paddy Puddling, Wheat Sowing",
        breakdownTitle: "📊 Final Rate Breakdown",
        breakdownBaseLabel: "Base Rental Rate:",
        breakdownDieselLabel: "Fuel Option:",
        breakdownTravelLabel: "Travel Charge (up to 5 km):",
        breakdownTravelFree: "₹0 (Free of cost)",
        breakdownTotalLabel: "Total Amount:",
        noHiddenChargesNote: "✅ This is the final rate, no hidden charges later",
        btnSpeakEstimate: "Listen Audio",
        btnConfirmBooking: "Confirm Booking",
        btnSendWhatsApp: "Send Booking via WhatsApp",

        // Receipt Modal
        receiptTitle: "Request Received, Team Will Call Soon",
        receiptSub: "Booking will be confirmed once an owner accepts. Our team will contact you shortly.",
        receiptCloseBtn: "Close Receipt",
        receiptTrackStatusBtn: "View Booking Status",
        btnSpeakReceipt: "Listen Receipt",
        btnSpeakStatus: "Listen",
        btnTrackStatusSearch: "Track Status",
        lookupErrNotFound: "Booking not found! Please check your booking code (e.g. TRAC-0001) and the exact 10-digit mobile number entered during booking.",
        lookupLoading: "⏳ Fetching live status from database...",
        bookingSubmitting: "⏳ Submitting request...",
        bookingNetworkError: "⚠️ Server connection error. Don't worry! Click the WhatsApp button below to send your booking directly.",
        receiptOrderId: "Order ID:",
        receiptBookingDate: "Booking Date:",
        receiptBookingSlot: "Time Slot:",
        receiptFarmer: "Farmer Name:",
        receiptPhone: "Mobile No:",
        receiptVillage: "Location / Village:",
        receiptMachine: "Selected Machine:",
        receiptDuration: "Duration:",
        receiptTotal: "Estimated Total Bill:",
        errInvalidDate: "Please select a valid date between today and next 30 days.",
        errInvalidPhone: "Please enter a valid 10-digit mobile number.",

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
        regModalSubtitle: "Earn extra income by renting your idle tractor to local farmers.",
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
    const tractorDrive = document.getElementById('tractorDrive').value || '2WD';
    const tractorRC = document.getElementById('tractorRC').value.trim();
    const tractorRate = parseInt(document.getElementById('tractorRate').value) || 550;

    if (!ownerName || !ownerPhone || !ownerVillage || !tractorRC) {
        alert(t.errFillFields);
        return;
    }

    const cleanMobile = ownerPhone.replace(/[^0-9]/g, '').slice(-10);
    if (cleanMobile.length !== 10) {
        alert(t.errPhoneInvalid || 'कृपया 10 अंकों का सही मोबाइल नंबर दर्ज करें');
        return;
    }

    // Pick a real photo based on chosen brand
    const photoUrl = brandRealPhotos[tractorBrand] || "images/dhan-tractor.jpg";

    // Add newly registered tractor to fleet with verified = false (pending approval)
    const newId = 'custom-' + Date.now();
    fleetData.unshift({
        id: newId,
        categories: tractorDrive === '4WD' ? ['dhan', 'gehu'] : ['gehu', 'ganna', 'dhulai'],
        image: photoUrl,
        rate: tractorRate,
        fuelDiscount: 180,
        rateUnit: { hi: "घंटा", en: "Hour" },
        verified: false, // Pending verification by admin!
        badge: { hi: `⏳ ${ownerVillage} (सत्यापन लंबित)`, en: `⏳ ${ownerVillage} (Pending)` },
        name: { hi: `${tractorBrand} (${ownerName})`, en: `${tractorBrand} (${ownerName})` },
        subtitle: { hi: `मालिक: ${ownerName} | संपर्क: ${ownerPhone}`, en: `Owner: ${ownerName} | Contact: ${ownerPhone}` },
        suitableCrops: { hi: "स्थानीय फसलें व जुताई", en: "Local Crops & Tillage" },
        suitableWork: { hi: "कस्टम किराए पर उपलब्ध", en: "Available for Custom Rent" },
        tool: { hi: "रोटावेटर / कल्टीवेटर अटैच्ड", en: "Rotavator / Cultivator Attached" },
        power: tractorBrand.includes('HP') ? tractorBrand.split('(')[1].replace(')', '') : "50 HP",
        rating: null,
        reviewsCount: 0
    });

    // Sync to Supabase via Phase 2 owner RPCs
    if (sbClient) {
        (async () => {
            try {
                // Register owner with default PIN 1234 if not exists
                const regRes = await sbClient.rpc('owner_register', {
                    p_name: ownerName,
                    p_mobile: cleanMobile,
                    p_pin: '1234',
                    p_village: ownerVillage,
                    p_dl: tractorRC
                });
                let ownerId = regRes && regRes.data ? regRes.data.id : null;

                // If owner already exists, log in to get owner ID
                if (!ownerId) {
                    const loginRes = await sbClient.rpc('owner_login', {
                        p_mobile: cleanMobile,
                        p_pin: '1234'
                    });
                    if (loginRes && loginRes.data) ownerId = loginRes.data.id;
                }

                if (ownerId) {
                    await sbClient.rpc('owner_add_vehicle', {
                        p_owner_id: ownerId,
                        p_pin: '1234',
                        p_brand: tractorBrand,
                        p_drive: tractorDrive,
                        p_rc: tractorRC,
                        p_rate: tractorRate,
                        p_village: ownerVillage,
                        p_implements: ['रोटावेटर', 'कल्टीवेटर']
                    });
                }
            } catch (e) {
                console.warn('Supabase tractor registration sync error:', e);
            }
        })();
    }

    closeTractorRegModal();
    renderFleetCards(currentFilter);

    const alertMsg = currentLang === 'hi'
        ? `धन्यवाद ${ownerName} जी! आपका ट्रैक्टर '${tractorBrand}' पोर्टल पर दर्ज हो गया है। एडमिन द्वारा सत्यापन (Verification) के बाद यह 'सत्यापित' बैज के साथ दिखेगा।`
        : `Thank you ${ownerName}! Your tractor '${tractorBrand}' has been listed. It will be verified by the admin shortly.`;
    alert(alertMsg);
}

// ==========================================
// 4.5. Load Active Vehicles from Supabase Database
// ==========================================
async function loadVehiclesFromDatabase() {
    if (!sbClient) {
        console.log('ℹ️ Supabase client not active; using demo catalog with clear demo flag');
        fleetData.forEach(m => m.isDemo = true);
        renderFleetCards(currentFilter);
        return;
    }

    try {
        const { data, error } = await sbClient
            .from('vehicles')
            .select('*')
            .eq('active', true)
            .order('created_at', { ascending: true });

        if (!error && Array.isArray(data) && data.length > 0) {
            fleetData = data.map(v => {
                const is4WD = (v.drive_type || '').includes('4WD');
                const catArray = (v.category && v.category !== 'all')
                    ? [v.category, 'all']
                    : (is4WD ? ['dhan', 'gehu', 'all'] : ['gehu', 'ganna', 'dhulai', 'all']);

                const implementsList = Array.isArray(v.implements) && v.implements.length > 0
                    ? v.implements.join(' + ')
                    : 'रोटावेटर / कल्टीवेटर';

                return {
                    id: v.id,
                    categories: catArray,
                    image: v.image_url || 'images/dhan-tractor.jpg',
                    rate: Number(v.rate_per_hour),
                    rateWithDiesel: Number(v.rate_with_diesel || v.rate_per_hour),
                    rateWithoutDiesel: Number(v.rate_without_diesel || Math.max(v.rate_per_hour - 200, 200)),
                    fuelDiscount: Number(v.rate_with_diesel && v.rate_without_diesel ? (v.rate_with_diesel - v.rate_without_diesel) : 200),
                    rateUnit: { hi: v.rate_unit || 'घंटा', en: v.rate_unit === 'एकड़' ? 'Acre' : 'Hour' },
                    badge: { 
                        hi: v.drive_type ? `${v.drive_type} स्पेशल` : 'सत्यापित ट्रैक्टर', 
                        en: v.drive_type ? `${v.drive_type} Special` : 'Verified Tractor' 
                    },
                    name: { hi: v.brand_model, en: v.brand_model },
                    subtitle: { hi: `गांव / क्षेत्र: ${v.village}`, en: `Village: ${v.village}` },
                    suitableCrops: { hi: v.suitable_crops || 'धान, गेहूं, गन्ना', en: v.suitable_crops || 'Paddy, Wheat, Sugarcane' },
                    suitableWork: { hi: v.suitable_work || 'खेत जुताई व कृषि कार्य', en: v.suitable_work || 'Farm tillage and operations' },
                    tool: { hi: implementsList, en: implementsList },
                    power: v.power || (is4WD ? '45-50 HP (4WD)' : '50 HP'),
                    village: v.village,
                    verified: v.verified === true, // Only true if verified = true in DB
                    rating: 4.9,
                    reviewsCount: 35,
                    isDemo: false
                };
            });
            console.log(`✅ Loaded ${fleetData.length} active vehicles from Supabase`);
        } else {
            console.log('ℹ️ No active vehicles in DB yet; using demo catalog with clear demo flag');
            fleetData.forEach(m => m.isDemo = true);
        }
    } catch (err) {
        console.warn('loadVehiclesFromDatabase fallback error:', err);
        fleetData.forEach(m => m.isDemo = true);
    }

    renderFleetCards(currentFilter);
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

        // Demo badge if loaded as unverified demo catalog
        const demoBadge = machine.isDemo === true
            ? `<span class="demo-catalog-badge">${currentLang === 'hi' ? 'डेमो' : 'Demo'}</span>`
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
                    <h4 class="machine-title">${title} ${demoBadge}</h4>
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
                        <div class="card-footer-actions">
                            <button type="button" class="btn-card-speak" onclick="speakMachineCard('${machine.id}', event)" title="${t.btnSpeakEstimate || 'बोल कर सुनें'}">
                                🔊 <span class="speak-btn-text">${t.btnSpeakStatus || 'सुनें'}</span>
                            </button>
                            <button type="button" class="btn-book-card" onclick="openBookingModal('${machine.id}')">
                                ${t.cardBookBtn}
                            </button>
                        </div>
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

// ==========================================
// 6.2 Live Farm Weather Engine (Open-Meteo Free API)
// ==========================================
let currentWeatherData = null;

function interpretWmoWeather(code, isHi = true) {
    if (code === 0) {
        return {
            icon: '☀️',
            cond: isHi ? 'धूप खिली है' : 'Sunny & Clear',
            advisory: isHi 
                ? 'मौसम पूरी तरह साफ और शुष्क है। गेहूं व सरसों की बोवाई, खेत की गहरी जुताई और कंबाइन से धान कटाई के लिए आज का दिन सर्वोत्तम है।' 
                : 'Weather is completely clear and dry. Optimal condition for wheat/mustard sowing, deep ploughing, and combine harvesting.',
            badge: isHi ? '✅ जुताई व कटाई के लिए सर्वोत्तम' : '✅ Best for Farming'
        };
    } else if (code === 1 || code === 2) {
        return {
            icon: '🌤️',
            cond: isHi ? 'हल्की धूप-छांव' : 'Partly Cloudy',
            advisory: isHi 
                ? 'मौसम सामान्य और कृषि कार्यों के अनुकूल है। ट्रैक्टर से जुताई व बुवाई का काम सामान्य रूप से जारी रख सकते हैं।' 
                : 'Fair weather conditions. Suitable for tractor operations and sowing.',
            badge: isHi ? '✅ जुताई के लिए अनुकूल' : '✅ Good for Farming'
        };
    } else if (code === 3) {
        return {
            icon: '☁️',
            cond: isHi ? 'घने बादल' : 'Overcast',
            advisory: isHi 
                ? 'आसमान में घने बादल हैं। जुताई कर सकते हैं, परंतु कीटनाशक छिड़काव करने से पहले बारिश की स्थिति अवश्य देखें।' 
                : 'Overcast skies. Ploughing can proceed, but check before spraying pesticides.',
            badge: isHi ? '⚠️ सामान्य सतर्कता' : '⚠️ Moderate Caution'
        };
    } else if (code === 45 || code === 48) {
        return {
            icon: '🌫️',
            cond: isHi ? 'कोहरा / धुंध' : 'Foggy',
            advisory: isHi 
                ? 'खेतों में कोहरा छाया है। सुबह के समय ट्रैक्टर और कंबाइन चलाते समय हेडलाइट जलाएं और गति धीमी रखें।' 
                : 'Dense fog observed. Exercise extra caution and use headlights while driving farm equipment.',
            badge: isHi ? '⚠️ कोहरा अलर्ट' : '⚠️ Fog Alert'
        };
    } else if (code >= 51 && code <= 57) {
        return {
            icon: '🌦️',
            cond: isHi ? 'हल्की बूंदाबांदी' : 'Light Drizzle',
            advisory: isHi 
                ? 'हल्की बूंदाबांदी हो रही है। खुले में रखा अनाज सुरक्षित स्थान पर ढकें और किसी भी प्रकार का स्प्रे अभी न करें।' 
                : 'Light drizzle expected. Cover open grains and postpone any pesticide spraying.',
            badge: isHi ? '⚠️ स्प्रे टालें' : '⚠️ Postpone Spray'
        };
    } else if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
        return {
            icon: '🌧️',
            cond: isHi ? 'बारिश का अलर्ट' : 'Rain Alert',
            advisory: isHi 
                ? 'खेत में बारिश की संभावना है। भारी ट्रैक्टर से गहरी जुताई व मिट्टी पलटने का काम कुछ समय के लिए टालें।' 
                : 'Rainfall expected. Delay deep ploughing and harvesting to prevent soil damage.',
            badge: isHi ? '🚨 बारिश अलर्ट — जुताई टालें' : '🚨 Rain Alert — Delay Ploughing'
        };
    } else if (code >= 95 && code <= 99) {
        return {
            icon: '⛈️',
            cond: isHi ? 'आंधी-तूफ़ान चेतावनी' : 'Thunderstorm Alert',
            advisory: isHi 
                ? 'बिजली व तेज़ आंधी-तूफ़ान की चेतावनी। खुले खेत में ट्रैक्टर न चलाएं और तुरंत सुरक्षित पक्के स्थान पर जाएं।' 
                : 'Thunderstorm and high winds alert. Halt field operations immediately and seek shelter.',
            badge: isHi ? '🚨 तूफ़ान अलर्ट — काम रोकें' : '🚨 Thunderstorm Alert'
        };
    }
    return {
        icon: '⛅',
        cond: isHi ? 'सामान्य मौसम' : 'Normal Weather',
        advisory: isHi 
            ? 'मौसम सामान्य है। खेती के काम सुचारू रूप से किए जा सकते हैं।' 
            : 'Normal weather. Farm operations can proceed as scheduled.',
        badge: isHi ? '✅ काम के लिए अनुकूल' : '✅ Good for Farming'
    };
}

async function fetchLiveFarmWeather(lat, lng, locationName, bypassCache = false) {
    if (!lat || !lng) {
        lat = 28.98;
        lng = 77.70;
        locationName = locationName || 'मेरठ, उत्तर प्रदेश (पश्चिमी क्षेत्र)';
    }

    const cacheKey = 'kisan_weather_cache';
    if (!bypassCache) {
        try {
            const cached = sessionStorage.getItem(cacheKey);
            if (cached) {
                const parsed = JSON.parse(cached);
                if (Date.now() - parsed.timestamp < 15 * 60 * 1000 && Math.abs(parsed.lat - lat) < 0.1 && Math.abs(parsed.lng - lng) < 0.1) {
                    currentWeatherData = parsed.data;
                    renderFarmWeather(currentWeatherData);
                    return currentWeatherData;
                }
            }
        } catch (e) {}
    }

    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Weather API HTTP ' + res.status);
        const data = await res.json();

        const current = data.current || {};
        const daily = data.daily || {};

        const weatherPayload = {
            temp: Math.round(current.temperature_2m !== undefined ? current.temperature_2m : 26),
            humidity: Math.round(current.relative_humidity_2m !== undefined ? current.relative_humidity_2m : 50),
            wind: Math.round(current.wind_speed_10m !== undefined ? current.wind_speed_10m : 7),
            code: current.weather_code !== undefined ? current.weather_code : 0,
            rainProb: (daily.precipitation_probability_max && daily.precipitation_probability_max[0] !== undefined) ? daily.precipitation_probability_max[0] : 0,
            locationName: locationName || 'आपका क्षेत्र',
            lat: lat,
            lng: lng,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        currentWeatherData = weatherPayload;
        try {
            sessionStorage.setItem(cacheKey, JSON.stringify({
                timestamp: Date.now(),
                lat,
                lng,
                data: weatherPayload
            }));
        } catch (e) {}

        renderFarmWeather(weatherPayload);
        return weatherPayload;
    } catch (err) {
        console.warn('Open-Meteo live weather fetch fallback:', err);
        const fallback = {
            temp: 24,
            humidity: 48,
            wind: 8,
            code: 0,
            rainProb: 0,
            locationName: locationName || 'मेरठ, उत्तर प्रदेश (पश्चिमी क्षेत्र)',
            lat: lat,
            lng: lng,
            time: 'आज'
        };
        currentWeatherData = fallback;
        renderFarmWeather(fallback);
        return fallback;
    }
}

function renderFarmWeather(data) {
    if (!data) return;
    const isHi = (currentLang || 'hi') === 'hi';
    const info = interpretWmoWeather(data.code, isHi);

    const iconEl = document.getElementById('liveWeatherIcon');
    const tempEl = document.getElementById('liveWeatherTemp');
    const condEl = document.getElementById('liveWeatherCondition');
    const humEl = document.getElementById('liveWeatherHumidity');
    const windEl = document.getElementById('liveWeatherWind');
    const rainEl = document.getElementById('liveWeatherRain');
    const cityEl = document.getElementById('liveWeatherCity');
    const advTextEl = document.getElementById('liveWeatherAdvisoryText');
    const badgeEl = document.getElementById('liveWeatherBadge');
    const timeEl = document.getElementById('liveWeatherTime');

    if (iconEl) iconEl.textContent = info.icon;
    if (tempEl) tempEl.textContent = `${data.temp}°C`;
    if (condEl) condEl.textContent = `${info.cond} ${info.icon}`;
    if (humEl) humEl.textContent = isHi ? `💧 नमी: ${data.humidity}%` : `💧 Humidity: ${data.humidity}%`;
    if (windEl) windEl.textContent = isHi ? `💨 हवा: ${data.wind} km/h` : `💨 Wind: ${data.wind} km/h`;
    if (rainEl) rainEl.textContent = isHi ? `🌧️ बारिश: ${data.rainProb}%` : `🌧️ Rain: ${data.rainProb}%`;
    if (cityEl) cityEl.textContent = data.locationName;
    if (advTextEl) advTextEl.textContent = info.advisory;
    if (badgeEl) badgeEl.textContent = info.badge;
    if (timeEl) timeEl.textContent = isHi ? `ताजा अपडेट (${data.time})` : `Updated (${data.time})`;

    // Update in Booking modal if open
    const bookingAlert = document.getElementById('farmerWeatherAlert');
    if (bookingAlert) {
        bookingAlert.style.display = 'flex';
        bookingAlert.innerHTML = `<span>${info.icon} <strong>${data.temp}°C</strong> • ${isHi ? 'बारिश' : 'Rain'}: ${data.rainProb}%</span> <span class="badge-optimum" style="margin-left: 8px;">${info.badge}</span>`;
    }
}

function refreshFarmWeather(force = false) {
    const lat = currentWeatherData ? currentWeatherData.lat : 28.98;
    const lng = currentWeatherData ? currentWeatherData.lng : 77.70;
    const name = currentWeatherData ? currentWeatherData.locationName : 'मेरठ, उत्तर प्रदेश (पश्चिमी क्षेत्र)';
    fetchLiveFarmWeather(lat, lng, name, force);
}

function detectWeatherByGPS() {
    const cityEl = document.getElementById('liveWeatherCity');
    if (cityEl) cityEl.textContent = '⏳ GPS से मौसम खोज रहे हैं...';

    getUniversalLocation(
        null,
        (loc) => {
            fetchLiveFarmWeather(loc.lat, loc.lng, loc.name, true);
        },
        () => {
            fetchLiveFarmWeather(28.98, 77.70, 'मेरठ, उत्तर प्रदेश (पश्चिमी क्षेत्र)', false);
        }
    );
}

function initLiveFarmWeather() {
    fetchLiveFarmWeather(28.98, 77.70, 'मेरठ, उत्तर प्रदेश (पश्चिमी क्षेत्र)', false);
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

            // Also fetch and update live farm weather for farmer's field
            if (loc.lat && loc.lng) {
                fetchLiveFarmWeather(loc.lat, loc.lng, loc.name, true);
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
function getFormattedDateString(dateObj) {
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

function validateBookingDate() {
    const dateInput = document.getElementById('bookingDate');
    if (!dateInput) return;
    const t = translations[currentLang] || translations.hi;
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);
    const minStr = getFormattedDateString(today);
    const maxStr = getFormattedDateString(maxDate);

    if (dateInput.value < minStr || dateInput.value > maxStr) {
        alert(t.errInvalidDate || 'कृपया आज या अगले 30 दिनों में से सही तारीख चुनें।');
        dateInput.value = minStr;
    }
}

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

    // Advance Booking Date & Time Slot initialization
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        const today = new Date();
        const maxDate = new Date();
        maxDate.setDate(today.getDate() + 30);
        const minStr = getFormattedDateString(today);
        const maxStr = getFormattedDateString(maxDate);

        dateInput.min = minStr;
        dateInput.max = maxStr;
        if (!dateInput.value || dateInput.value < minStr || dateInput.value > maxStr) {
            dateInput.value = minStr;
        }
    }

    const slotSelect = document.getElementById('bookingSlot');
    if (slotSelect && !slotSelect.value) {
        slotSelect.value = 'day';
    }

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

    // Initialize Weather Alert in Booking modal if current weather available
    const bookingWeatherAlert = document.getElementById('farmerWeatherAlert');
    if (bookingWeatherAlert && currentWeatherData) {
        const isHi = (currentLang || 'hi') === 'hi';
        const info = interpretWmoWeather(currentWeatherData.code, isHi);
        bookingWeatherAlert.style.display = 'flex';
        bookingWeatherAlert.innerHTML = `<span>${info.icon} <strong>${currentWeatherData.temp}°C</strong> • ${isHi ? 'बारिश' : 'Rain'}: ${currentWeatherData.rainProb}%</span> <span class="badge-optimum" style="margin-left: 8px;">${info.badge}</span>`;
    } else if (bookingWeatherAlert) {
        bookingWeatherAlert.style.display = 'none';
    }

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

    // Default duration in hours
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

    // Live Breakdown Elements Update
    const breakdownBaseRateEl = document.getElementById('breakdownBaseRateText');
    if (breakdownBaseRateEl) {
        const hrText = currentLang === 'hi' ? 'घंटे' : 'Hours';
        breakdownBaseRateEl.textContent = `₹${appliedRate} x ${duration} ${hrText} = ₹${total.toLocaleString('en-IN')}`;
    }

    const breakdownFuelEl = document.getElementById('breakdownFuelText');
    if (breakdownFuelEl) {
        if (selectedFuelOption === 'with-fuel') {
            breakdownFuelEl.textContent = currentLang === 'hi' ? 'डीजल व ड्राइवर सहित' : 'With Fuel & Driver';
            breakdownFuelEl.className = 'badge-text-green';
        } else {
            breakdownFuelEl.textContent = currentLang === 'hi' ? 'डीजल किसान का (छूट लागू)' : 'Without Fuel (Discount applied)';
            breakdownFuelEl.className = 'badge-text-orange';
        }
    }

    const totalEl = document.getElementById('modalTotalEstimate');
    if (totalEl) {
        totalEl.textContent = `₹${total.toLocaleString('en-IN')}`;
    }
}

let lastBookedOrderId = null;
let lastBookedMobile = null;

// ==========================================
// 7. Real Booking Submission (Supabase + LocalStorage Device History)
// ==========================================
async function handleTractorBookingSubmit(event) {
    event.preventDefault();
    const t = translations[currentLang] || translations.hi;

    const farmerName = document.getElementById('farmerName').value.trim();
    const farmerPhone = document.getElementById('farmerPhone').value.trim();
    const farmerVillage = document.getElementById('farmerVillage').value.trim();
    const duration = document.getElementById('workDuration').value;
    const gpsLink = document.getElementById('farmerGpsLink') ? document.getElementById('farmerGpsLink').value : '';

    const bookingDateInput = document.getElementById('bookingDate');
    const bookingDateVal = bookingDateInput ? bookingDateInput.value : '';

    const slotSelect = document.getElementById('bookingSlot');
    const bookingSlotVal = slotSelect ? slotSelect.value : 'day';
    const bookingSlotText = slotSelect && slotSelect.selectedOptions[0]
        ? slotSelect.selectedOptions[0].textContent.trim()
        : 'दोपहर (10:00 AM - 02:00 PM)';

    if (!farmerName || !farmerPhone || !farmerVillage) {
        alert(t.errFillFields);
        return;
    }

    // Phone validation (10 digits)
    const phoneClean = farmerPhone.replace(/\D/g, '');
    if (phoneClean.length !== 10) {
        alert(t.errInvalidPhone || 'कृपया 10 अंकों का सही मोबाइल नंबर दर्ज करें।');
        return;
    }

    // Date validation
    if (!bookingDateVal) {
        alert(t.errInvalidDate || 'कृपया तारीख चुनें।');
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
    const fuelText = selectedFuelOption === 'with-fuel' ? t.fuelWithShort : t.fuelWithoutShort;

    // Show loading state on submit button
    const submitBtn = document.querySelector('.btn-confirm-booking');
    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `⏳ ${t.bookingSubmitting || 'अनुरोध भेजा जा रहा है...'}`;
    }

    // Generate clean readable booking code (e.g. TRAC-5421)
    let realBookingCode = 'TRAC-' + Math.floor(1000 + Math.random() * 9000);

    // Save to Supabase Cloud Database with status 'requested'
    if (sbClient) {
        try {
            const insertPayload = {
                booking_code: realBookingCode,
                vehicle_id: (selectedMachine.id && selectedMachine.id.length > 20) ? selectedMachine.id : null,
                farmer_name: farmerName,
                farmer_mobile: phoneClean,
                village_location: farmerVillage,
                crop: (selectedMachine.categories && selectedMachine.categories.length) ? selectedMachine.categories[0] : 'all',
                booking_date: bookingDateVal,
                time_slot: bookingSlotText,
                hours: parseFloat(duration) || 1,
                fuel_option: selectedFuelOption,
                base_amount: appliedRate * parseFloat(duration),
                travel_charge: 0,
                total_amount: totalNum,
                status: 'requested',
                gps_link: gpsLink || `https://maps.google.com/?q=${encodeURIComponent(farmerVillage)}`
            };

            const { error } = await sbClient
                .from('bookings')
                .insert([insertPayload]);

            if (error) {
                console.warn('Supabase booking insert notice:', error);
                alert(`⚠️ सूचना: आपका अनुरोध सर्वर पर दर्ज नहीं हो सका (${error.message || 'Connecting'})\n\nचिंता न करें! आप नीचे दिए गए व्हाट्सएप बटन से सीधे अपनी बुकिंग भेज सकते हैं।`);
            } else {
                console.log('✅ Real booking stored in Supabase with code:', realBookingCode);
            }
        } catch (err) {
            console.warn('Booking submit network error:', err);
            alert(t.bookingNetworkError || '⚠️ नेटवर्क समस्या: सर्ver से संपर्क नहीं हो पाया। चिंता न करें! नीचे दिए गए व्हाट्सएप बटन पर क्लिक करके सीधे अपनी बुकिंग भेजें।');
        }
    }

    // Restore submit button
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
    }

    // Fallback readable booking code if DB not yet migrated or offline
    if (!realBookingCode) {
        realBookingCode = 'TRAC-' + Math.floor(1000 + Math.random() * 9000);
    }

    lastBookedOrderId = realBookingCode;
    lastBookedMobile = phoneClean;

    // Store in Device Booking History (localStorage)
    const myHistory = JSON.parse(localStorage.getItem('myBookingHistory') || '[]');
    const existingIdx = myHistory.findIndex(h => h.code === realBookingCode);
    const historyItem = {
        code: realBookingCode,
        mobile: phoneClean,
        farmerName,
        village: farmerVillage,
        machineTitle,
        machinePhoto: selectedMachine.image || "images/dhan-tractor.jpg",
        duration: `${duration} ${rateUnit}`,
        total: totalStr,
        totalNum,
        date: bookingDateVal,
        slot: bookingSlotText,
        status: 'requested',
        gpsLink: gpsLink || `https://maps.google.com/?q=${encodeURIComponent(farmerVillage)}`,
        fuelText,
        createdAt: new Date().toISOString()
    };

    if (existingIdx >= 0) {
        myHistory[existingIdx] = historyItem;
    } else {
        myHistory.unshift(historyItem);
    }
    localStorage.setItem('myBookingHistory', JSON.stringify(myHistory));

    // Keep legacy tractorBookings array synchronized for backward compatibility
    const legacyBookings = getBookings();
    legacyBookings.unshift({
        orderId: realBookingCode,
        machineId: selectedMachine.id,
        machineTitle,
        machinePhoto: selectedMachine.image || "images/dhan-tractor.jpg",
        farmerName,
        farmerPhone: phoneClean,
        farmerVillage,
        gpsLink: historyItem.gpsLink,
        bookingDate: bookingDateVal,
        bookingSlot: bookingSlotVal,
        bookingSlotText,
        duration: `${duration} ${rateUnit}`,
        fuelOption: selectedFuelOption,
        fuelText,
        appliedRate,
        total: totalStr,
        date: bookingDateVal,
        status: 'requested'
    });
    localStorage.setItem('tractorBookings', JSON.stringify(legacyBookings));

    // Trigger instant cross-tab live synchronization
    try {
        localStorage.setItem('kisan_live_sync_trigger', JSON.stringify({
            action: 'new_booking',
            code: realBookingCode,
            timestamp: Date.now()
        }));
    } catch (e) {}

    updateBookingBadges();
    closeBookingModal();

    // Show confirmation receipt modal with real booking code
    showReceiptModal({
        orderId: realBookingCode,
        farmerName,
        farmerPhone: phoneClean,
        farmerVillage,
        gpsLink: historyItem.gpsLink,
        bookingDate: bookingDateVal,
        bookingSlotText,
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

    const dateRow = data.bookingDate ? `
        <div class="receipt-row">
            <span>${t.receiptBookingDate || 'तारीख:'}</span>
            <strong>${data.bookingDate}</strong>
        </div>
    ` : '';

    const slotRow = data.bookingSlotText ? `
        <div class="receipt-row">
            <span>${t.receiptBookingSlot || 'समय स्लॉट:'}</span>
            <span>${data.bookingSlotText}</span>
        </div>
    ` : '';

    content.innerHTML = `
        <div class="receipt-row">
            <span>${t.receiptOrderId}</span>
            <strong style="color: #1f5130; font-size: 16px;">${data.orderId}</strong>
        </div>
        ${dateRow}
        ${slotRow}
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

function trackFromReceipt() {
    closeReceiptModal();
    if (lastBookedOrderId) {
        openLiveTrackingModal(lastBookedOrderId, lastBookedMobile);
    } else {
        const myHistory = JSON.parse(localStorage.getItem('myBookingHistory') || '[]');
        if (myHistory.length > 0) {
            openLiveTrackingModal(myHistory[0].code, myHistory[0].mobile);
        } else {
            openLiveTrackingModal();
        }
    }
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
}

async function syncBookingsFromSupabase() {
    if (!sbClient) return;
    try {
        const localHistory = JSON.parse(localStorage.getItem('myBookingHistory') || '[]');
        const codes = localHistory.map(h => h.code).filter(Boolean);
        if (codes.length === 0) return;

        const defaultMobile = localHistory[0] ? localHistory[0].mobile : '';
        const { data, error } = await sbClient.rpc('lookup_device_bookings', {
            p_codes: codes,
            p_mobile: defaultMobile
        });

        if (!error && Array.isArray(data) && data.length > 0) {
            data.forEach(dbRow => {
                const target = localHistory.find(h => h.code === dbRow.booking_code);
                if (target) {
                    target.status = dbRow.status;
                    target.total = Number(dbRow.total_amount).toLocaleString('en-IN');
                    target.date = dbRow.booking_date;
                    target.slot = dbRow.time_slot;
                }
            });
            localStorage.setItem('myBookingHistory', JSON.stringify(localHistory));
            updateBookingBadges();
            if (document.getElementById('myBookingsList')) {
                renderMyBookings();
            }
        }
    } catch (e) {
        console.warn('syncBookingsFromSupabase fallback:', e);
    }
}

function updateBookingBadges() {
    const myHistory = JSON.parse(localStorage.getItem('myBookingHistory') || '[]');
    const activeBookings = myHistory.filter(b => b.status !== 'cancelled');
    const count = activeBookings.length;
    const t = translations[currentLang] || translations.hi;

    const drawerBadge = document.getElementById('drawerBookingCount');
    if (drawerBadge) {
        drawerBadge.textContent = `${count} ${t.badgeBookingCountText || 'बुकिंग'}`;
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

async function renderMyBookings() {
    const container = document.getElementById('myBookingsList');
    if (!container) return;
    const t = translations[currentLang] || translations.hi;

    let localHistory = JSON.parse(localStorage.getItem('myBookingHistory') || '[]');
    if (localHistory.length === 0) {
        // Fallback to legacy
        const legacy = getBookings();
        if (legacy.length > 0) {
            localHistory = legacy.map(b => ({
                code: b.orderId,
                mobile: b.farmerPhone,
                farmerName: b.farmerName,
                village: b.farmerVillage,
                machineTitle: b.machineTitle,
                total: b.total,
                date: b.bookingDate || b.date,
                slot: b.bookingSlotText,
                status: b.status || 'requested'
            }));
            localStorage.setItem('myBookingHistory', JSON.stringify(localHistory));
        }
    }

    if (localHistory.length === 0) {
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

    // Try fetching live status from database for device codes
    const codes = localHistory.map(h => h.code).filter(Boolean);
    if (sbClient && codes.length > 0) {
        try {
            const { data, error } = await sbClient.rpc('lookup_device_bookings', {
                p_codes: codes,
                p_mobile: localHistory[0] ? localHistory[0].mobile : ''
            });

            if (!error && Array.isArray(data) && data.length > 0) {
                data.forEach(dbRow => {
                    const target = localHistory.find(h => h.code === dbRow.booking_code);
                    if (target) {
                        target.status = dbRow.status;
                        target.total = Number(dbRow.total_amount).toLocaleString('en-IN');
                        target.date = dbRow.booking_date;
                        target.slot = dbRow.time_slot;
                    }
                });
                localStorage.setItem('myBookingHistory', JSON.stringify(localHistory));
            }
        } catch (e) {
            console.warn('renderMyBookings RPC fallback:', e);
        }
    }

    container.innerHTML = localHistory.map(b => {
        const status = (b.status || 'requested').toLowerCase();
        const isCancelled = status === 'cancelled';
        const isDone = status === 'done' || status === 'completed';
        const isReached = status === 'reached';
        const isAssigned = status === 'assigned';
        const isAccepted = status === 'accepted';

        let statusBadge = `<span class="booking-status-tag" style="background:#fef3c7; color:#92400e; border:1px solid #fde68a;">🟡 अनुरोध भेजा (लंबित)</span>`;
        if (isCancelled) {
            statusBadge = `<span class="booking-status-tag cancelled">❌ रद्द किया गया</span>`;
        } else if (isDone) {
            statusBadge = `<span class="booking-status-tag confirmed" style="background:#def7ec; color:#03543f;">✅ काम पूरा हुआ</span>`;
        } else if (isReached) {
            statusBadge = `<span class="booking-status-tag" style="background:#e1effe; color:#1e429f;">📍 खेत पर मौजूद</span>`;
        } else if (isAssigned) {
            statusBadge = `<span class="booking-status-tag" style="background:#e1effe; color:#1e429f;">🚜 ड्राइवर रवाना</span>`;
        } else if (isAccepted) {
            statusBadge = `<span class="booking-status-tag confirmed">🟢 मालिक द्वारा स्वीकृत</span>`;
        }

        const dateSlotText = b.date ? `${b.date} • ${b.slot || ''}` : '';

        return `
            <div class="booking-record-card ${isCancelled ? 'cancelled-card' : ''}">
                <div class="record-top">
                    <div class="record-main-info">
                        <img src="${b.machinePhoto || 'images/dhan-tractor.jpg'}" alt="${b.machineTitle}" class="record-thumb">
                        <div>
                            <h4 class="record-title">${b.machineTitle}</h4>
                            <span class="record-order-id">#${b.code} • ${dateSlotText}</span>
                        </div>
                    </div>
                    ${statusBadge}
                </div>
                <div class="record-grid">
                    <div><strong>${t.receiptBookingDate || 'तारीख'}:</strong> ${b.date || 'आज'}</div>
                    <div><strong>${t.receiptBookingSlot || 'समय स्लॉट'}:</strong> ${b.slot || 'दिन (Day)'}</div>
                    <div><strong>${t.receiptFarmer}:</strong> ${b.farmerName || 'किसान'} (${b.mobile || ''})</div>
                    <div><strong>${t.receiptVillage}:</strong> ${b.village || ''}</div>
                    <div><strong>${t.receiptDuration}:</strong> ${b.duration || '2 घंटा'}</div>
                    <div><strong>${t.fuelOptionLabel}:</strong> ${b.fuelText || 'डीजल सहित'}</div>
                </div>
                <div class="record-bottom">
                    <div class="record-price">
                        <span>${t.receiptTotal}</span>
                        <strong>₹${b.total}</strong>
                    </div>
                    <div class="record-actions">
                        <button type="button" class="btn-track-booking" onclick="openLiveTrackingModal('${b.code}', '${b.mobile}')">
                            📍 ${t.receiptTrackStatusBtn || 'स्टेटस देखें'}
                        </button>
                        <button type="button" class="btn-receipt-view" onclick="viewPastReceipt('${b.code}')">
                            ${t.btnViewReceipt || 'रसीद देखें'}
                        </button>
                        ${(!isCancelled && !isDone) ? `
                            <button type="button" class="btn-booking-cancel" onclick="cancelBooking('${b.code}', '${b.mobile}')">
                                ${t.btnCancelBooking || 'बुकिंग रद्द करें'}
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

async function cancelBooking(code, mobile) {
    const t = translations[currentLang] || translations.hi;
    if (!confirm(t.cancelConfirm || 'क्या आप वाकई इस ट्रैक्टर बुकिंग को रद्द करना चाहते हैं?')) return;

    if (sbClient) {
        try {
            const { data, error } = await sbClient.rpc('cancel_farmer_booking', {
                p_code: code,
                p_mobile: mobile || ''
            });
            if (error) {
                console.warn('cancel_farmer_booking notice:', error);
            }
        } catch (e) {
            console.warn('cancelBooking RPC error:', e);
        }
    }

    // Update local cache
    const myHistory = JSON.parse(localStorage.getItem('myBookingHistory') || '[]');
    const target = myHistory.find(h => h.code === code);
    if (target) {
        target.status = 'cancelled';
        localStorage.setItem('myBookingHistory', JSON.stringify(myHistory));
    }

    const legacy = getBookings();
    const lTarget = legacy.find(b => b.orderId === code);
    if (lTarget) {
        lTarget.status = 'cancelled';
        localStorage.setItem('tractorBookings', JSON.stringify(legacy));
    }

    updateBookingBadges();
    renderMyBookings();
    alert('✅ आपकी बुकिंग रद्द कर दी गई है।');
}

function viewPastReceipt(orderId) {
    const myHistory = JSON.parse(localStorage.getItem('myBookingHistory') || '[]');
    const b = myHistory.find(item => item.code === orderId) || getBookings().find(item => item.orderId === orderId);
    if (!b) return;
    closeMyBookingsModal();
    showReceiptModal({
        orderId: b.code || b.orderId,
        farmerName: b.farmerName,
        farmerPhone: b.mobile || b.farmerPhone,
        farmerVillage: b.village || b.farmerVillage,
        gpsLink: b.gpsLink,
        machineTitle: b.machineTitle,
        duration: b.duration,
        total: `₹${b.total}`
    });
}

// ==========================================
// 9. Real Booking Status & Tracking (Lookup by Code + Mobile)
// ==========================================
let currentTrackingCode = null;
let currentTrackingMobile = null;
let liveTrackingPollInterval = null;
let lastKnownStatus = null;
let liveRealtimeChannel = null;

function playStatusChime(type = 'success') {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'success') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
            osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
            gain.gain.setValueAtTime(0.18, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
            osc.start();
            osc.stop(ctx.currentTime + 0.35);
        } else if (type === 'alert') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(523.25, ctx.currentTime);
            osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.12);
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
            osc.start();
            osc.stop(ctx.currentTime + 0.35);
        }
    } catch (e) {}
}

function handleStatusTransition(oldStatus, newStatus, booking) {
    if (!oldStatus || oldStatus === newStatus) return;

    playStatusChime('success');

    const statusTitles = {
        'accepted': 'स्वीकृत (Booking Accepted)',
        'assigned': 'ड्राइवर रवाना (Driver Assigned)',
        'reached': 'खेत पर आगमन (Reached Field)',
        'done': 'काम पूरा हुआ (Work Completed)',
        'completed': 'काम पूरा हुआ (Work Completed)',
        'cancelled': 'रद्द (Cancelled)'
    };
    const friendlyTitle = statusTitles[newStatus] || newStatus;

    const toast = document.getElementById('statusChangeToast');
    if (toast) {
        toast.innerHTML = `🔔 <strong>ताजा अपडेट!</strong> आपकी बुकिंग स्थिति अब <u>${friendlyTitle}</u> हो गई है!`;
        toast.style.display = 'block';
        setTimeout(() => {
            if (toast) toast.style.display = 'none';
        }, 5000);
    }

    // Sync to local history
    try {
        const myHistory = JSON.parse(localStorage.getItem('myBookingHistory') || '[]');
        const idx = myHistory.findIndex(h => h.code && h.code.toUpperCase() === booking.booking_code.toUpperCase());
        if (idx !== -1) {
            myHistory[idx].status = newStatus;
            localStorage.setItem('myBookingHistory', JSON.stringify(myHistory));
        }
    } catch (e) {}

    // Announce update via Speech
    try {
        const synth = window.speechSynthesis;
        if (synth && !synth.speaking) {
            const utterance = new SpeechSynthesisUtterance(`ताजा अपडेट! आपकी बुकिंग स्थिति अब ${friendlyTitle} हो गई है`);
            utterance.lang = 'hi-IN';
            synth.speak(utterance);
        }
    } catch (e) {}
}

function startLiveStatusPolling(code, mobile) {
    stopLiveStatusPolling();

    // 1. Setup polling every 3 seconds for fast reliable sync
    liveTrackingPollInterval = setInterval(async () => {
        if (!currentTrackingCode || !currentTrackingMobile) return;
        if (sbClient) {
            try {
                const { data, error } = await sbClient.rpc('lookup_farmer_booking', {
                    p_code: currentTrackingCode.toUpperCase(),
                    p_mobile: currentTrackingMobile
                });

                if (!error && Array.isArray(data) && data.length > 0) {
                    const row = data[0];
                    renderStatusDetails(row);
                }
            } catch (e) {}
        }
    }, 3000);

    // 2. Setup Supabase Realtime channel subscription if supported
    if (sbClient && typeof sbClient.channel === 'function') {
        try {
            liveRealtimeChannel = sbClient.channel('booking-live-' + code.toUpperCase())
                .on('postgres_changes', {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'bookings',
                    filter: 'booking_code=eq.' + code.toUpperCase()
                }, async (payload) => {
                    if (currentTrackingCode && currentTrackingMobile) {
                        try {
                            const { data } = await sbClient.rpc('lookup_farmer_booking', {
                                p_code: currentTrackingCode.toUpperCase(),
                                p_mobile: currentTrackingMobile
                            });
                            if (data && data[0]) renderStatusDetails(data[0]);
                        } catch (e) {}
                    }
                })
                .subscribe();
        } catch (e) {
            console.warn('Realtime subscription warning:', e);
        }
    }
}

function stopLiveStatusPolling() {
    if (liveTrackingPollInterval) {
        clearInterval(liveTrackingPollInterval);
        liveTrackingPollInterval = null;
    }
    if (liveRealtimeChannel && sbClient && typeof sbClient.removeChannel === 'function') {
        try {
            sbClient.removeChannel(liveRealtimeChannel);
        } catch (e) {}
        liveRealtimeChannel = null;
    }
}

// Window storage listener for instant cross-tab sync between Farmer and Owner dashboard
window.addEventListener('storage', (e) => {
    if ((e.key === 'myBookingHistory' || e.key === 'tractorBookings' || e.key === 'kisan_live_sync_trigger') && currentTrackingCode && currentTrackingMobile) {
        const modal = document.getElementById('liveTrackingModal');
        if (modal && modal.style.display !== 'none') {
            fetchBookingStatus(currentTrackingCode, currentTrackingMobile, true);
        }
    }
});

function openLiveTrackingModal(orderCode, mobile, isAutoUpdate) {
    if (!isAutoUpdate) {
        closeMyBookingsModal();
        lastKnownStatus = null;
    }
    const modal = document.getElementById('liveTrackingModal');
    if (!modal) return;

    modal.style.display = 'flex';

    const inputCode = document.getElementById('trackInputCode');
    const inputMobile = document.getElementById('trackInputMobile');
    const feedbackEl = document.getElementById('trackLookupFeedback');

    if (feedbackEl) feedbackEl.style.display = 'none';

    // If orderCode provided, fill input
    if (orderCode && inputCode) {
        inputCode.value = orderCode;
    }

    // If mobile provided, fill input; otherwise search local history for this code
    if (mobile && inputMobile) {
        inputMobile.value = mobile;
    } else if (orderCode && inputMobile) {
        const myHistory = JSON.parse(localStorage.getItem('myBookingHistory') || '[]');
        const match = myHistory.find(h => h.code.toUpperCase() === orderCode.toUpperCase());
        if (match && match.mobile) {
            inputMobile.value = match.mobile;
            mobile = match.mobile;
        }
    }

    const codeToTrack = inputCode ? inputCode.value.trim() : (orderCode || '');
    const mobileToTrack = inputMobile ? inputMobile.value.trim() : (mobile || '');

    if (codeToTrack && mobileToTrack) {
        fetchBookingStatus(codeToTrack, mobileToTrack, isAutoUpdate);
    } else {
        // Clear order detail fields to avoid showing stale or hardcoded sample data
        resetStatusDetailsBlank();
    }
}

function handleManualStatusLookup() {
    const inputCode = document.getElementById('trackInputCode');
    const inputMobile = document.getElementById('trackInputMobile');
    const feedbackEl = document.getElementById('trackLookupFeedback');

    const code = inputCode ? inputCode.value.trim() : '';
    const mobile = inputMobile ? inputMobile.value.trim() : '';

    if (!code) {
        if (feedbackEl) {
            feedbackEl.className = 'track-lookup-msg msg-error';
            feedbackEl.textContent = '⚠️ कृपया बुकिंग कोड दर्ज करें (उदा. TRAC-0001)';
            feedbackEl.style.display = 'block';
        }
        return;
    }

    const phoneClean = mobile.replace(/\D/g, '');
    if (phoneClean.length !== 10) {
        if (feedbackEl) {
            feedbackEl.className = 'track-lookup-msg msg-error';
            feedbackEl.textContent = '⚠️ कृपया वही 10 अंकों का मोबाइल नंबर दर्ज करें जो बुकिंग में दिया था';
            feedbackEl.style.display = 'block';
        }
        return;
    }

    fetchBookingStatus(code, phoneClean, false);
}

async function fetchBookingStatus(code, mobile, isAutoUpdate) {
    const feedbackEl = document.getElementById('trackLookupFeedback');
    const searchBtn = document.getElementById('btnLookupBooking');
    const t = translations[currentLang] || translations.hi;

    currentTrackingCode = code;
    currentTrackingMobile = mobile;

    if (!isAutoUpdate) {
        if (searchBtn) searchBtn.disabled = true;
        if (feedbackEl) {
            feedbackEl.className = 'track-lookup-msg msg-loading';
            feedbackEl.textContent = t.lookupLoading || '⏳ डेटाबेस से लाइव स्टेटस जांच रहे हैं...';
            feedbackEl.style.display = 'block';
        }
    }

    let foundBooking = null;

    // 1. Query Supabase using secure RPC with BOTH Code AND Mobile
    if (sbClient) {
        try {
            const { data, error } = await sbClient.rpc('lookup_farmer_booking', {
                p_code: code.toUpperCase(),
                p_mobile: mobile
            });

            if (!error && Array.isArray(data) && data.length > 0) {
                foundBooking = data[0];
            } else if (error) {
                console.warn('lookup_farmer_booking RPC error:', error);
            }
        } catch (err) {
            console.warn('fetchBookingStatus network fallback:', err);
        }
    }

    // 2. Local history fallback if offline or table pending
    if (!foundBooking) {
        const myHistory = JSON.parse(localStorage.getItem('myBookingHistory') || '[]');
        const localMatch = myHistory.find(h =>
            h.code.toUpperCase() === code.toUpperCase() &&
            h.mobile.replace(/\D/g, '') === mobile.replace(/\D/g, '')
        );

        if (localMatch) {
            foundBooking = {
                booking_code: localMatch.code,
                crop: localMatch.machineTitle,
                booking_date: localMatch.date,
                time_slot: localMatch.slot,
                village_location: localMatch.village,
                total_amount: String(localMatch.total).replace(/[^\d.]/g, ''),
                status: localMatch.status || 'requested'
            };
        }
    }

    if (searchBtn) searchBtn.disabled = false;

    if (!foundBooking) {
        resetStatusDetailsBlank();
        if (feedbackEl) {
            feedbackEl.className = 'track-lookup-msg msg-error';
            feedbackEl.innerHTML = `❌ ${t.lookupErrNotFound || 'बुकिंग कोड या मोबाइल नंबर सही नहीं है। कृपया जांच कर दोबारा प्रयास करें।'}`;
            feedbackEl.style.display = 'block';
        }
        stopLiveStatusPolling();
        return;
    }

    if (feedbackEl) feedbackEl.style.display = 'none';

    renderStatusDetails(foundBooking);
    startLiveStatusPolling(code, mobile);
}

function renderStatusDetails(booking) {
    const t = translations[currentLang] || translations.hi;

    const subtitleEl = document.getElementById('trackingOrderSubtitle');
    if (subtitleEl) {
        subtitleEl.textContent = `ऑर्डर #${booking.booking_code} • ${booking.village_location}`;
    }

    const statusOrderIdEl = document.getElementById('statusOrderId');
    const statusMachineTitleEl = document.getElementById('statusMachineTitle');
    const statusBookingDateEl = document.getElementById('statusBookingDate');
    const statusBookingSlotEl = document.getElementById('statusBookingSlot');
    const statusFarmerVillageEl = document.getElementById('statusFarmerVillage');
    const statusTotalAmountEl = document.getElementById('statusTotalAmount');

    if (statusOrderIdEl) statusOrderIdEl.textContent = booking.booking_code;
    if (statusMachineTitleEl) statusMachineTitleEl.textContent = booking.crop ? `${booking.crop} (ट्रैक्टर सेवा)` : 'ट्रैक्टर सेवा';
    if (statusBookingDateEl) statusBookingDateEl.textContent = booking.booking_date;
    if (statusBookingSlotEl) statusBookingSlotEl.textContent = booking.time_slot;
    if (statusFarmerVillageEl) statusFarmerVillageEl.textContent = booking.village_location;
    if (statusTotalAmountEl) statusTotalAmountEl.textContent = `₹${Number(booking.total_amount).toLocaleString('en-IN')}`;

    // Stepper Nodes
    const step1 = document.getElementById('stepNode1');
    const step2 = document.getElementById('stepNode2');
    const step3 = document.getElementById('stepNode3');
    const step4 = document.getElementById('stepNode4');
    const step5 = document.getElementById('stepNode5');

    const conn1 = document.getElementById('stepConnector1');
    const conn2 = document.getElementById('stepConnector2');
    const conn3 = document.getElementById('stepConnector3');
    const conn4 = document.getElementById('stepConnector4');

    const allSteps = [step1, step2, step3, step4, step5];
    const allConns = [conn1, conn2, conn3, conn4];

    allSteps.forEach(s => s && s.classList.remove('active', 'completed', 'cancelled'));
    allConns.forEach(c => c && c.classList.remove('active', 'completed', 'cancelled'));

    const bannerEl = document.getElementById('statusLiveBanner');
    const msgEl = document.getElementById('statusLiveMessage');
    const cancelBtn = document.getElementById('btnCancelFromStatus');

    const status = (booking.status || 'requested').toLowerCase();

    // Trigger instant realtime chime & toast when status updates
    if (lastKnownStatus && lastKnownStatus !== status) {
        handleStatusTransition(lastKnownStatus, status, booking);
    }
    lastKnownStatus = status;

    const isCancelled = status === 'cancelled';
    const isRejected = status === 'rejected';
    const isAccepted = status === 'accepted' || status === 'confirmed';
    const isDriverAssigned = status === 'assigned';
    const isReached = status === 'reached';
    const isDone = status === 'completed' || status === 'done';

    if (isCancelled) {
        if (step1) step1.classList.add('cancelled');
        if (bannerEl) bannerEl.className = 'status-live-banner banner-cancelled';
        if (msgEl) msgEl.textContent = t.statusMsgCancelled || '❌ यह बुकिंग रद्द कर दी गई है।';
        if (cancelBtn) cancelBtn.style.display = 'none';
    } else if (isRejected) {
        if (step1) step1.classList.add('cancelled');
        if (bannerEl) bannerEl.className = 'status-live-banner banner-rejected';
        if (msgEl) msgEl.textContent = t.statusMsgRejected || '⚠️ ट्रैक्टर मालिक अभी उपलब्ध नहीं हैं। कृपया दूसरी मशीन चुनें।';
        if (cancelBtn) cancelBtn.style.display = 'none';
    } else if (isDone) {
        allSteps.forEach(s => s && s.classList.add('completed'));
        allConns.forEach(c => c && c.classList.add('completed'));
        if (bannerEl) bannerEl.className = 'status-live-banner banner-done';
        if (msgEl) msgEl.textContent = '✅ काम पूरा हो चुका है व पेमेंट प्राप्त। किसान भाइयों का धन्यवाद!';
        if (cancelBtn) cancelBtn.style.display = 'none';
    } else if (isReached) {
        [step1, step2, step3].forEach(s => s && s.classList.add('completed'));
        [conn1, conn2, conn3].forEach(c => c && c.classList.add('completed'));
        if (step4) step4.classList.add('active');
        if (bannerEl) bannerEl.className = 'status-live-banner banner-active';
        if (msgEl) msgEl.textContent = '📍 ट्रैक्टर खेत पर पहुँच चुका है।';
        if (cancelBtn) cancelBtn.style.display = 'none';
    } else if (isDriverAssigned) {
        [step1, step2].forEach(s => s && s.classList.add('completed'));
        [conn1, conn2].forEach(c => c && c.classList.add('completed'));
        if (step3) step3.classList.add('active');
        if (bannerEl) bannerEl.className = 'status-live-banner banner-active';
        if (msgEl) msgEl.textContent = '🚜 ट्रैक्टर मालिक ने ड्राइवर को खेत के लिए रवाना कर दिया है!';
        if (cancelBtn) cancelBtn.style.display = 'inline-flex';
    } else if (isAccepted) {
        if (step1) step1.classList.add('completed');
        if (conn1) conn1.classList.add('completed');
        if (step2) step2.classList.add('active');
        if (bannerEl) bannerEl.className = 'status-live-banner banner-active';
        if (msgEl) msgEl.textContent = t.statusMsgAccepted || '✅ ट्रैक्टर मालिक ने बुकिंग स्वीकार कर ली है! ड्राइवर जल्द रवाना होगा।';
        if (cancelBtn) cancelBtn.style.display = 'inline-flex';
    } else {
        // Pending / Requested (Default Initial State)
        if (step1) step1.classList.add('active');
        if (bannerEl) bannerEl.className = 'status-live-banner banner-pending';
        if (msgEl) msgEl.textContent = t.statusMsgRequested || '📢 स्थिति: अनुरोध भेज दिया गया है। टीम व ट्रैक्टर मालिक जल्द आपको कॉल करेंगे।';
        if (cancelBtn) cancelBtn.style.display = 'inline-flex';
    }
}

function resetStatusDetailsBlank() {
    const statusOrderIdEl = document.getElementById('statusOrderId');
    const statusMachineTitleEl = document.getElementById('statusMachineTitle');
    const statusBookingDateEl = document.getElementById('statusBookingDate');
    const statusBookingSlotEl = document.getElementById('statusBookingSlot');
    const statusFarmerVillageEl = document.getElementById('statusFarmerVillage');
    const statusTotalAmountEl = document.getElementById('statusTotalAmount');
    const subtitleEl = document.getElementById('trackingOrderSubtitle');
    const bannerEl = document.getElementById('statusLiveBanner');
    const msgEl = document.getElementById('statusLiveMessage');
    const cancelBtn = document.getElementById('btnCancelFromStatus');

    if (statusOrderIdEl) statusOrderIdEl.textContent = '—';
    if (statusMachineTitleEl) statusMachineTitleEl.textContent = '—';
    if (statusBookingDateEl) statusBookingDateEl.textContent = '—';
    if (statusBookingSlotEl) statusBookingSlotEl.textContent = '—';
    if (statusFarmerVillageEl) statusFarmerVillageEl.textContent = '—';
    if (statusTotalAmountEl) statusTotalAmountEl.textContent = '—';
    if (subtitleEl) subtitleEl.textContent = 'अपना बुकिंग कोड व मोबाइल नंबर दर्ज करें';

    const step1 = document.getElementById('stepNode1');
    const step2 = document.getElementById('stepNode2');
    const step3 = document.getElementById('stepNode3');
    const step4 = document.getElementById('stepNode4');
    const step5 = document.getElementById('stepNode5');

    const conn1 = document.getElementById('stepConnector1');
    const conn2 = document.getElementById('stepConnector2');
    const conn3 = document.getElementById('stepConnector3');
    const conn4 = document.getElementById('stepConnector4');

    [step1, step2, step3, step4, step5].forEach(s => s && s.classList.remove('active', 'completed', 'cancelled'));
    [conn1, conn2, conn3, conn4].forEach(c => c && c.classList.remove('active', 'completed', 'cancelled'));

    if (bannerEl) bannerEl.className = 'status-live-banner banner-pending';
    if (msgEl) msgEl.textContent = '📢 कृपया ऊपर अपना बुकिंग कोड व 10 अंकों का मोबाइल नंबर डालकर "स्टेटस देखें" दबाएं।';
    if (cancelBtn) cancelBtn.style.display = 'none';
}

function closeLiveTrackingModal() {
    stopLiveStatusPolling();
    const modal = document.getElementById('liveTrackingModal');
    if (modal) modal.style.display = 'none';
}

async function handleCancelFromStatusModal() {
    if (!currentTrackingCode || !currentTrackingMobile) return;
    const t = translations[currentLang] || translations.hi;
    if (!confirm(t.cancelConfirm || 'क्या आप वाकई इस ट्रैक्टर बुकिंग को रद्द करना चाहते हैं?')) return;

    if (sbClient) {
        try {
            const { data, error } = await sbClient.rpc('cancel_farmer_booking', {
                p_code: currentTrackingCode.toUpperCase(),
                p_mobile: currentTrackingMobile
            });
            if (error) {
                console.warn('cancel_farmer_booking RPC error:', error);
            }
        } catch (e) {
            console.warn('cancel RPC exception:', e);
        }
    }

    // Update local storage
    const myHistory = JSON.parse(localStorage.getItem('myBookingHistory') || '[]');
    const target = myHistory.find(h => h.code.toUpperCase() === currentTrackingCode.toUpperCase());
    if (target) {
        target.status = 'cancelled';
        localStorage.setItem('myBookingHistory', JSON.stringify(myHistory));
    }

    const legacy = getBookings();
    const lTarget = legacy.find(b => b.orderId === currentTrackingCode);
    if (lTarget) {
        lTarget.status = 'cancelled';
        localStorage.setItem('tractorBookings', JSON.stringify(legacy));
    }

    updateBookingBadges();
    renderMyBookings();
    fetchBookingStatus(currentTrackingCode, currentTrackingMobile, true);
    alert('✅ आपकी बुकिंग सफलतापूर्वक रद्द कर दी गई है।');
}

// ==========================================
// Voice Speech Assistant (High-Fidelity Studio Hindi Audio)
// ==========================================
let currentPlayingAudio = null;
let availableVoices = [];

// Local Studio MP3 files for instant, clear, offline-ready native Hindi speech
const MACHINE_AUDIO_MAP = {
    'dhan-4wd': 'audio/card-dhan-4wd.mp3',
    'gehu-super-seeder': 'audio/card-super-seeder.mp3',
    'gehu-laser-leveler': 'audio/card-laser-leveler.mp3',
    'ganna-heavy-hauler': 'audio/card-heavy-duty.mp3',
    'straw-reaper': 'audio/card-straw-reaper.mp3',
    'sabzi-mini-tractor': 'audio/card-chhota-champion.mp3',
    'dhulai-trolley-tractor': 'audio/card-trolley.mp3',
    'bagwani-sprayer-mini': 'audio/card-bagwani-sprayer.mp3',
    'combine-harvester': 'audio/card-combine-harvester.mp3'
};

const STATUS_AUDIO_MAP = {
    'pending': 'audio/status-requested.mp3',
    'requested': 'audio/status-requested.mp3',
    'accepted': 'audio/status-accepted.mp3',
    'assigned': 'audio/status-on-way.mp3',
    'on_way': 'audio/status-on-way.mp3',
    'in_transit': 'audio/status-on-way.mp3',
    'completed': 'audio/status-completed.mp3',
    'done': 'audio/status-completed.mp3'
};

function initVoiceAssistant() {
    if (!('speechSynthesis' in window)) return;
    const updateVoices = () => {
        availableVoices = window.speechSynthesis.getVoices() || [];
    };
    updateVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = updateVoices;
    }
}
initVoiceAssistant();

// Converts numbers to clean spoken Hindi words (prevents robotic "one two zero zero")
function numberToHindiSpeech(numStr) {
    const n = parseInt(String(numStr).replace(/[^\d]/g, ''), 10);
    if (isNaN(n)) return numStr;
    const lookup = {
        200: 'दो सौ', 300: 'तीन सौ', 350: 'साढ़े तीन सौ', 400: 'चार सौ',
        450: 'साढ़े चार सौ', 500: 'पांच सौ', 550: 'साढ़े पांच सौ', 600: 'छह सौ',
        650: 'साढ़े छह सौ', 700: 'सात सौ', 800: 'आठ सौ', 900: 'नौ सौ',
        1000: 'एक हजार', 1100: 'ग्यारह सौ', 1200: 'बारह सौ', 1300: 'तेरह सौ',
        1400: 'चौदह सौ', 1500: 'पंद्रह सौ', 1600: 'सोलह सौ', 1700: 'सत्रह सौ',
        1800: 'अठारह सौ', 2000: 'दो हजार', 2400: 'चौबीस सौ', 2500: 'पच्चीस सौ'
    };
    return lookup[n] || `${n}`;
}

function stopAnySpeech() {
    if (currentPlayingAudio) {
        try {
            currentPlayingAudio.pause();
            currentPlayingAudio.currentTime = 0;
        } catch (e) {}
        currentPlayingAudio = null;
    }
    if ('speechSynthesis' in window) {
        try { window.speechSynthesis.cancel(); } catch (e) {}
    }
    document.querySelectorAll('.btn-card-speak, .btn-voice-speak, .btn-receipt-voice, .btn-voice-mini').forEach(b => b.classList.remove('audio-playing'));
}

function playVoiceMessage(hindiAudioPath, triggerBtn, fallbackHiText, englishText) {
    stopAnySpeech();

    // 1. If English mode is selected, speak in natural English
    if (currentLang === 'en') {
        speakEnglishText(englishText, triggerBtn);
        return;
    }

    // 2. In Hindi mode, play studio-quality native Hindi MP3
    playLocalHindiAudio(hindiAudioPath, triggerBtn, fallbackHiText);
}

function playLocalHindiAudio(audioPath, triggerBtn, fallbackHiText) {
    if (currentPlayingAudio && currentPlayingAudio._audioSrc === audioPath && !currentPlayingAudio.paused) {
        stopAnySpeech();
        return;
    }

    stopAnySpeech();

    if (triggerBtn) {
        triggerBtn.classList.add('audio-playing');
    }

    const audio = new Audio(audioPath);
    audio._audioSrc = audioPath;
    currentPlayingAudio = audio;

    audio.onended = () => {
        if (triggerBtn) triggerBtn.classList.remove('audio-playing');
        document.querySelectorAll('.btn-card-speak, .btn-voice-speak, .btn-receipt-voice, .btn-voice-mini').forEach(b => b.classList.remove('audio-playing'));
        currentPlayingAudio = null;
    };

    audio.onerror = () => {
        if (triggerBtn) triggerBtn.classList.remove('audio-playing');
        currentPlayingAudio = null;
        if (fallbackHiText) {
            fallbackBrowserTTS(fallbackHiText, true);
        }
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            if (triggerBtn) triggerBtn.classList.remove('audio-playing');
            currentPlayingAudio = null;
            if (fallbackHiText) {
                fallbackBrowserTTS(fallbackHiText, true);
            }
        });
    }
}

function speakEnglishText(text, triggerBtn) {
    stopAnySpeech();

    if (triggerBtn) triggerBtn.classList.add('audio-playing');

    if (!('speechSynthesis' in window)) {
        if (triggerBtn) triggerBtn.classList.remove('audio-playing');
        return;
    }

    if (!availableVoices.length) {
        availableVoices = window.speechSynthesis.getVoices() || [];
    }

    const indianVoice = availableVoices.find(v => 
        (v.lang && (v.lang === 'en-IN' || v.lang === 'en_IN')) ||
        (v.name && (v.name.includes('India') || v.name.includes('Indian') || v.name.includes('Ravi') || v.name.includes('Heera')))
    );
    const anyEnglish = availableVoices.find(v => v.lang && v.lang.toLowerCase().startsWith('en'));

    const utterance = new SpeechSynthesisUtterance(text);
    if (indianVoice) {
        utterance.voice = indianVoice;
        utterance.lang = 'en-IN';
    } else if (anyEnglish) {
        utterance.voice = anyEnglish;
        utterance.lang = 'en-US';
    } else {
        utterance.lang = 'en-IN';
    }

    utterance.rate = 0.90;
    utterance.pitch = 1.0;

    utterance.onend = () => {
        if (triggerBtn) triggerBtn.classList.remove('audio-playing');
        document.querySelectorAll('.btn-card-speak, .btn-voice-speak, .btn-receipt-voice, .btn-voice-mini').forEach(b => b.classList.remove('audio-playing'));
    };

    utterance.onerror = () => {
        if (triggerBtn) triggerBtn.classList.remove('audio-playing');
        document.querySelectorAll('.btn-card-speak, .btn-voice-speak, .btn-receipt-voice, .btn-voice-mini').forEach(b => b.classList.remove('audio-playing'));
    };

    window.speechSynthesis.speak(utterance);
}

function fallbackBrowserTTS(text, isHindi) {
    if (!('speechSynthesis' in window)) return;
    if (!availableVoices.length) {
        availableVoices = window.speechSynthesis.getVoices() || [];
    }

    const hindiVoice = availableVoices.find(v => 
        (v.lang && (v.lang === 'hi-IN' || v.lang === 'hi_IN' || v.lang.toLowerCase().startsWith('hi'))) ||
        (v.name && (v.name.includes('Hindi') || v.name.includes('हिन्दी') || v.name.includes('Kalpana') || v.name.includes('Hemant')))
    );

    const indianVoice = availableVoices.find(v => 
        (v.lang && (v.lang === 'en-IN' || v.lang === 'en_IN')) ||
        (v.name && (v.name.includes('India') || v.name.includes('Indian') || v.name.includes('Ravi') || v.name.includes('Heera')))
    );

    const utterance = new SpeechSynthesisUtterance(text);
    if (isHindi && hindiVoice) {
        utterance.voice = hindiVoice;
        utterance.lang = 'hi-IN';
    } else if (indianVoice) {
        utterance.voice = indianVoice;
        utterance.lang = 'en-IN';
    } else {
        utterance.lang = isHindi ? 'hi-IN' : 'en-IN';
    }

    utterance.rate = 0.85;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
}

function speakMachineCard(machineId, event) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    const btn = event && event.currentTarget ? event.currentTarget : (event && event.target ? event.target.closest('.btn-card-speak') : null);
    const audioPath = MACHINE_AUDIO_MAP[machineId] || 'audio/card-dhan-4wd.mp3';

    const machine = fleetData.find(m => m.id === machineId);
    let fallbackHi = 'ट्रैक्टर बुकिंग सेवा';
    let enText = 'Tractor rental service';

    if (machine) {
        const rateHindiWord = numberToHindiSpeech(machine.rate);
        const rateUnit = (machine.rateUnit && machine.rateUnit.hi) || 'घंटा';
        const work = (machine.suitableWork && machine.suitableWork.hi) || (machine.subtitle && machine.subtitle.hi) || 'खेत की जुताई';
        const tool = (machine.tool && machine.tool.hi) || '';
        const toolPhrase = tool ? ` ${tool} सहित।` : '';
        fallbackHi = `${work} के लिए।${toolPhrase} किराया ${rateHindiWord} रुपये प्रति ${rateUnit}।`;

        const titleEn = (machine.name && machine.name.en) || machine.name.hi;
        const workEn = (machine.suitableWork && machine.suitableWork.en) || (machine.subtitle && machine.subtitle.en) || 'field operations';
        const cropEn = (machine.suitableCrops && machine.suitableCrops.en) || 'crops';
        const toolEn = (machine.tool && machine.tool.en) || '';
        const toolPhraseEn = toolEn ? ` Equipped with ${toolEn}.` : '.';
        const rateUnitEn = (machine.rateUnit && machine.rateUnit.en) || 'hour';
        const fuelEn = selectedFuelOption === 'with-fuel' ? 'including fuel and driver' : 'fuel provided by farmer';
        enText = `${titleEn}. Designed for ${workEn} in ${cropEn}${toolPhraseEn} Rental rate is ₹${machine.rate} per ${rateUnitEn}, ${fuelEn}.`;
    }

    playVoiceMessage(audioPath, btn, fallbackHi, enText);
}

function speakFinalRate() {
    const btn = document.querySelector('.btn-voice-speak');
    const audioPath = 'audio/final-rate-guarantee.mp3';
    const durationInput = document.getElementById('workDuration');
    const duration = durationInput ? durationInput.value : '2';
    const totalEl = document.getElementById('modalTotalEstimate');
    const totalRaw = totalEl ? totalEl.textContent.replace(/[^\d]/g, '') : '1200';
    const fuelEn = selectedFuelOption === 'with-fuel' ? 'including fuel and driver' : 'fuel by farmer';
    const enText = `Final rate guarantee. Total estimated rent for ${duration} hours is ₹${totalRaw}, ${fuelEn}. No hidden charges later.`;

    playVoiceMessage(audioPath, btn, 'ट्रैक्टर बुकिंग फाइनल रेट गारंटी। बाद में कोई छुपा चार्ज नहीं।', enText);
}

function speakReceipt() {
    const btn = document.querySelector('.btn-receipt-voice');
    const audioPath = 'audio/booking-confirmed.mp3';
    const totalEl = document.getElementById('receiptDetailsContent');
    let totalRaw = '1200';
    if (totalEl) {
        const strongs = totalEl.querySelectorAll('strong');
        if (strongs.length > 0) totalRaw = strongs[strongs.length - 1].textContent.replace(/[^\d]/g, '');
    }
    const enText = `Congratulations! Tractor booking confirmed. Estimated total bill is ₹${totalRaw}. Our nearest driver team will contact you shortly and arrive at your farm.`;

    playVoiceMessage(audioPath, btn, 'बधाई हो किसान भाई! आपकी ट्रैक्टर बुकिंग पक्की हो गई है। हमारी टीम जल्द आपके खेत पर पहुंचेगी।', enText);
}

function speakBookingStatus() {
    const btn = document.querySelector('.btn-voice-mini');
    const bookings = getBookings();
    const booking = (currentTrackingOrderId ? bookings.find(b => b.orderId === currentTrackingOrderId) : null) || bookings[0];
    const st = booking && booking.status ? booking.status.toLowerCase() : 'requested';
    const audioPath = STATUS_AUDIO_MAP[st] || 'audio/status-requested.mp3';

    const msgEl = document.getElementById('statusLiveMessage');
    const msg = msgEl ? msgEl.textContent : '';
    const cleanMsg = msg.replace(/^[^\w\s\u0900-\u097F]+/, '').trim();
    const enText = `Booking status update: ${cleanMsg}`;

    playVoiceMessage(audioPath, btn, `बुकिंग स्थिति: ${cleanMsg}`, enText);
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

async function submitCallbackRequest() {
    const t = translations[currentLang] || translations.hi;
    const phoneInput = document.getElementById('callbackPhone');
    const phone = phoneInput ? phoneInput.value.trim() : '';

    if (!phone || phone.length < 10) {
        alert(t.callbackErr || 'कृपया 10 अंकों का सही मोबाइल नंबर दर्ज करें।');
        return;
    }

    // Fetch logged in farmer profile if any
    let farmerName = 'किसान भाई';
    let village = 'किसान सहायता केंद्र';
    try {
        const profile = JSON.parse(localStorage.getItem('tractorUserProfile') || '{}');
        if (profile.fullName) farmerName = profile.fullName;
        if (profile.village) village = profile.village;
    } catch (e) {}

    const newReq = {
        id: 'cb-' + Date.now(),
        phone: phone,
        farmer_name: farmerName,
        village: village,
        status: 'pending',
        created_at: new Date().toISOString()
    };

    // 1. Save to LocalStorage with 24-hour auto-clean
    try {
        const existing = JSON.parse(localStorage.getItem('tractorCallbackRequests') || '[]');
        const cutoff = Date.now() - 24 * 60 * 60 * 1000;
        const fresh = existing.filter(r => new Date(r.created_at || r.requested_at).getTime() > cutoff);
        fresh.unshift(newReq);
        localStorage.setItem('tractorCallbackRequests', JSON.stringify(fresh));
    } catch (e) {}

    // 2. Save to Supabase Cloud Database & clean up >24h old requests
    if (sbClient) {
        try {
            await sbClient.from('callback_requests').insert([newReq]);
            const cutoffISO = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
            sbClient.from('callback_requests').delete().lt('created_at', cutoffISO).then();
        } catch (err) {
            console.warn('Supabase callback save error:', err);
        }
    }

    alert(t.callbackSuccess ? t.callbackSuccess.replace('{phone}', phone) : `धन्यवाद! आपका कॉल बैक अनुरोध मिल गया है (${phone})। हमारी टीम 5-10 मिनट में संपर्क करेगी।`);
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

    const dateVal = document.getElementById('bookingDate') ? document.getElementById('bookingDate').value : '';
    const slotSelect = document.getElementById('bookingSlot');
    const slotText = slotSelect && slotSelect.selectedOptions[0] ? slotSelect.selectedOptions[0].textContent.trim() : 'दोपहर (Day)';

    const discount = selectedMachine.fuelDiscount || 200;
    const appliedRate = selectedFuelOption === 'with-fuel'
        ? selectedMachine.rate
        : (selectedMachine.rate - discount);
    const total = (parseFloat(duration) * appliedRate);
    const fuelText = selectedFuelOption === 'with-fuel' ? t.fuelWithShort : t.fuelWithoutShort;

    const gpsLine = gpsLink ? `📍 *Khet Ka Google Maps Link:* ${gpsLink}\n` : '';
    const dateLine = dateVal ? `📅 *Tarikh (Date):* ${dateVal}\n` : '';
    const slotLine = slotText ? `⏰ *Samay Slot:* ${slotText}\n` : '';

    const message = `🚜 *PROJECT TRACTOR - ADVANCE BOOKING* 🚜\n\n` +
        `👤 *Kisan Ka Naam:* ${farmerName}\n` +
        `📱 *Mobile Number:* ${farmerPhone}\n` +
        `📍 *Gaon / Khet Location:* ${farmerVillage}\n` +
        dateLine +
        slotLine +
        gpsLine +
        `🌾 *Fasal / Kaam:* ${cropName}\n` +
        `🚜 *Chuni Gayi Gaadi:* ${machineTitle}\n` +
        `⛽ *Diesel Option:* ${fuelText}\n` +
        `⏱️ *Samay / Avadhi:* ${duration} ${rateUnit}\n` +
        `💰 *Final Rate (Bina Chupa Charge):* ₹${total.toLocaleString('en-IN')}\n\n` +
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
    if (currentWeatherData) {
        renderFarmWeather(currentWeatherData);
    }

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

    const cleanMobile = phone.replace(/[^0-9]/g, '').slice(-10);
    if (cleanMobile.length !== 10) {
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

    // ========================================================
    // TRACTOR OWNER REGISTRATION (Phase 2 RPC to public.owners)
    // ========================================================
    if (role === 'owner') {
        if (sbClient) {
            try {
                const { data: regRes, error: regErr } = await sbClient.rpc('owner_register', {
                    p_name: fullName,
                    p_mobile: cleanMobile,
                    p_pin: password,
                    p_village: village
                });

                if (regErr || !regRes || !regRes.success) {
                    const errMsg = (regRes && regRes.message) || (regErr && regErr.message) || 'मालिक खाता बनाने में त्रुटि।';
                    showRegisterMessage(errMsg, 'error');
                    return;
                }

                // Save Owner Session
                const ownerSession = {
                    id: regRes.id,
                    name: regRes.name,
                    mobile: regRes.mobile,
                    village: regRes.village,
                    approved: regRes.approved || false,
                    pin: password
                };
                localStorage.setItem('tractorOwnerSession', JSON.stringify(ownerSession));
                localStorage.setItem('tractorUser', regRes.name);
                localStorage.setItem('tractorUserProfile', JSON.stringify({
                    fullName: regRes.name,
                    phone: regRes.mobile,
                    role: 'owner',
                    village: regRes.village
                }));

                showRegisterMessage(regRes.message, 'success');
                setTimeout(() => {
                    window.location.replace('owner.html');
                }, 1200);
                return;
            } catch (e) {
                console.warn('Supabase owner register error:', e);
            }
        }
    }

    // ========================================================
    // FARMER REGISTRATION
    // ========================================================
    // 1. Check Supabase for existing user
    if (sbClient) {
        try {
            const { data: existingUser } = await sbClient
                .from('users_profile')
                .select('phone')
                .eq('phone', cleanMobile)
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
    const existing = users.find(u => u.phone === cleanMobile);
    if (existing) {
        showRegisterMessage(t.errPhoneExists, 'error');
        return;
    }

    const newUser = {
        id: 'user-' + Date.now(),
        full_name: fullName,
        phone: cleanMobile,
        role: role,
        village: village,
        password: password,
        created_at: new Date().toISOString()
    };

    // 2. Insert into Supabase Cloud Table & Supabase Authentication
    if (sbClient) {
        try {
            const { error: insertError } = await sbClient
                .from('users_profile')
                .insert([newUser]);
            if (insertError) {
                console.warn('Supabase insert warning:', insertError.message);
            } else {
                console.log('✅ User registered in Supabase users_profile table!');
            }

            if (sbClient.auth) {
                const syntheticEmail = `${cleanMobile}@kisan.app`;
                await sbClient.auth.signUp({
                    email: syntheticEmail,
                    password: password,
                    options: {
                        data: {
                            full_name: fullName,
                            phone: cleanMobile,
                            village: village,
                            role: role
                        }
                    }
                });
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
        phone: cleanMobile,
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

    // PASSWORD LOGIN MODE (secure — requires registered password / PIN)
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

    const cleanMobile = username.replace(/[^0-9]/g, '').slice(-10);

    // ========================================================
    // 1. OWNER LOGIN CHECK (Phase 2 RPC to public.owners)
    // ========================================================
    if (cleanMobile.length === 10 && sbClient) {
        try {
            const { data: ownerRes, error: ownerErr } = await sbClient.rpc('owner_login', {
                p_mobile: cleanMobile,
                p_pin: password
            });

            if (!ownerErr && ownerRes && ownerRes.success) {
                const ownerSession = {
                    id: ownerRes.id,
                    name: ownerRes.name,
                    mobile: ownerRes.mobile,
                    village: ownerRes.village,
                    approved: ownerRes.approved,
                    pin: password
                };
                localStorage.setItem('tractorOwnerSession', JSON.stringify(ownerSession));
                localStorage.setItem('tractorUser', ownerRes.name);
                localStorage.setItem('tractorUserProfile', JSON.stringify({
                    fullName: ownerRes.name,
                    phone: ownerRes.mobile,
                    role: 'owner',
                    village: ownerRes.village
                }));

                showMessage('✅ मालिक लॉगिन सफल! डैशबोर्ड पर ले जाया जा रहा है...', 'success');
                setTimeout(() => {
                    window.location.replace('owner.html');
                }, 800);
                return;
            } else if (ownerRes && ownerRes.success === false && ownerRes.message && ownerRes.message.includes('गलत 4-अंकों का पिन')) {
                // Owner exists but PIN was wrong
                showMessage(ownerRes.message, 'error');
                return;
            }
        } catch (e) {
            console.warn('Owner login check error:', e);
        }
    }

    // ========================================================
    // 2. FARMER / REGULAR USER LOGIN CHECK
    // ========================================================
    let foundUser = null;

    // Check Supabase cloud database first
    if (sbClient) {
        try {
            const { data, error } = await sbClient
                .from('users_profile')
                .select('*')
                .or(`phone.eq.${username},phone.eq.${cleanMobile},full_name.ilike.${username}`)
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
        foundUser = users.find(u => u.phone === username || u.phone === cleanMobile || (u.fullName && u.fullName.toLowerCase() === username.toLowerCase()));
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
    loadVehiclesFromDatabase();
    updateBookingBadges();
    syncBookingsFromSupabase();
    initLiveFarmWeather();
});
