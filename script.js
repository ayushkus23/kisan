// Project Tractor - Complete Bilingual, Crop-Based Fleet with Real Photos, Drawer & Registration Logic

// Real photo mappings for tractor brands
const brandRealPhotos = {
    "Mahindra 575 DI (45 HP)": "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80",
    "Swaraj 855 FE (52 HP)": "https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=800&q=80",
    "John Deere 5310 (55 HP)": "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80",
    "Sonalika DI 745 (50 HP)": "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=800&q=80",
    "Massey Ferguson 241 (42 HP)": "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80",
    "Farmtrac 60 (50 HP)": "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80",
    "Chhota Mini Tractor (24 HP)": "https://images.unsplash.com/photo-1589923188651-268a9f65e320?auto=format&fit=crop&w=800&q=80"
};

// 1. Tractor & Machine Catalog with REAL Agricultural Photographs
const fleetData = [
    {
        id: "dhan-4wd",
        categories: ["dhan"],
        image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80",
        rate: 600,
        rateUnit: { hi: "घंटा", en: "Hour" },
        badge: { hi: "🌾 धान कड़वा स्पेशल", en: "🌾 Paddy Puddling Special" },
        name: { hi: "धान 4WD मड-मास्टर ट्रैक्टर", en: "Paddy 4WD Mud-Master Tractor" },
        subtitle: { hi: "कीचड़ में न फंसने वाला 4-व्हील ड्राइव ट्रैक्टर", en: "Non-stuck 4-Wheel Drive Tractor for Wet Mud" },
        suitableCrops: { hi: "धान / चावल (Paddy)", en: "Paddy / Rice" },
        suitableWork: { hi: "कड़वा जुताई (Puddling), कीचड़ तैयार करना", en: "Wet Land Puddling & Slurry Prep" },
        tool: { hi: "केज व्हील + 6 फीट वेट रोटावेटर", en: "Cage Wheels + 6ft Wet Rotavator" },
        power: "45-50 HP (4WD)"
    },
    {
        id: "gehu-super-seeder",
        categories: ["gehu"],
        image: "https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=800&q=80",
        rate: 550,
        rateUnit: { hi: "घंटा", en: "Hour" },
        badge: { hi: "🌱 गेहूं व सरसों बोवाई स्पेशल", en: "🌱 Wheat & Sowing Special" },
        name: { hi: "सुपर-सीडर व रोटावेटर ट्रैक्टर", en: "Super Seeder & Rotavator Tractor" },
        subtitle: { hi: "पराली प्रबंधन और एक ही बार में सीधी बोवाई", en: "Stubble Management & Direct Sowing in One Go" },
        suitableCrops: { hi: "गेहूं, सरसों, चना, मटर", en: "Wheat, Mustard, Gram, Peas" },
        suitableWork: { hi: "बारीक जुताई व सटीक बीज/खाद बोवाई", en: "Fine Tilth Ploughing & Precise Sowing" },
        tool: { hi: "7 फीट सुपर सीडर + मल्टी-क्रॉप ड्रिल", en: "7ft Super Seeder + Multi-Crop Drill" },
        power: "50-55 HP"
    },
    {
        id: "ganna-heavy-hauler",
        categories: ["ganna"],
        image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=800&q=80",
        rate: 700,
        rateUnit: { hi: "घंटा", en: "Hour" },
        badge: { hi: "🎋 गन्ना व भारी जुताई स्पेशल", en: "🎋 Heavy Sugarcane Hauler" },
        name: { hi: "हाई-टॉर्क हैवी ड्यूटी ट्रैक्टर", en: "High-Torque Heavy Duty Tractor" },
        subtitle: { hi: "गहरी जुताई, खाई (ट्रेन्च) बनाने और भारी ढुलाई के लिए", en: "For Deep Ploughing, Trenching & Heavy Haulage" },
        suitableCrops: { hi: "गन्ना, कपास, मक्का", en: "Sugarcane, Cotton, Maize" },
        suitableWork: { hi: "गहरी एमबी जुताई, 15 टन गन्ना ट्रॉली खींचना", en: "Deep MB Ploughing & 15-Ton Trolley Hauling" },
        tool: { hi: "3-बॉटम एमबी हल / ट्रेन्चर / हैवी ट्रॉली", en: "3-Bottom MB Plough / Trencher / Heavy Trolley" },
        power: "55-65 HP"
    },
    {
        id: "sabzi-mini-tractor",
        categories: ["sabzi", "bagwani"],
        image: "https://images.unsplash.com/photo-1589923188651-268a9f65e320?auto=format&fit=crop&w=800&q=80",
        rate: 380,
        rateUnit: { hi: "घंटा", en: "Hour" },
        badge: { hi: "🥔 आलू व सब्जी स्पेशल", en: "🥔 Potato & Veggies Special" },
        name: { hi: "छोटा चैंपियन नैरो ट्रैक्टर", en: "Chhota Champion Compact Tractor" },
        subtitle: { hi: "छोटी क्यारियों और मेड़ों के बीच आसानी से चलने वाला", en: "Fits narrow ridges, beds & greenhouse lanes" },
        suitableCrops: { hi: "आलू, प्याज, टमाटर, गोभी, लहसुन", en: "Potato, Onion, Tomato, Garlic & Veggies" },
        suitableWork: { hi: "बेड बनाना, आलू खुदाई (Digger), संकरी जुताई", en: "Bed Making, Potato Digging & Row Tillage" },
        tool: { hi: "पोटैटो डिगर / 4 फीट मिनी रोटावेटर", en: "Potato Digger / 4ft Mini Rotavator" },
        power: "24-28 HP (Narrow Width)"
    },
    {
        id: "dhulai-trolley-tractor",
        categories: ["dhulai"],
        image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80",
        rate: 450,
        rateUnit: { hi: "घंटा", en: "Hour" },
        badge: { hi: "🚛 मंडी व माल ढुलाई", en: "🚛 Mandi & Haulage Transport" },
        name: { hi: "हाइड्रोलिक ट्रॉली ट्रैक्टर सेट", en: "Hydraulic Trolley Tractor Set" },
        subtitle: { hi: "मंडी तक अनाज, भूसा, खाद और मिट्टी पहुंचाने के लिए", en: "Fast transport for crops, straw, manure & soil" },
        suitableCrops: { hi: "सभी फसलें (मंडी ले जाने हेतु)", en: "All Crops (Mandi Transport)" },
        suitableWork: { hi: "मंडी ढुलाई, एक लीवर से तुरंत खाली होना", en: "Grain transport & single-lever hydraulic dumping" },
        tool: { hi: "डबल एक्सल हाइड्रोलिक लिफ्ट ट्रॉली", en: "Double Axle Hydraulic Lift Trolley" },
        power: "42-45 HP"
    },
    {
        id: "bagwani-sprayer-mini",
        categories: ["bagwani"],
        image: "https://images.unsplash.com/photo-1594771804886-a933bb2d609b?auto=format&fit=crop&w=800&q=80",
        rate: 350,
        rateUnit: { hi: "घंटा", en: "Hour" },
        badge: { hi: "🍎 बागवानी व स्प्रे स्पेशल", en: "🍎 Orchard & Spraying Special" },
        name: { hi: "ऑर्चर्ड ब्लोअर-स्प्रेयर ट्रैक्टर", en: "Orchard Blower-Sprayer Tractor" },
        subtitle: { hi: "पेड़ों के नीचे आसानी से निकलने वाला कॉम्पैक्ट ट्रैक्टर", en: "Low-height compact tractor for fruit gardens" },
        suitableCrops: { hi: "आम, किन्नू, सेब, अमरूद, अंगूर", en: "Mango, Citrus, Apple, Guava, Grapes" },
        suitableWork: { hi: "कीटनाशक स्प्रे, बागों के बीच जुताई व घास कटाई", en: "Insecticide Blower Spraying & Orchard Tillage" },
        tool: { hi: "600 लीटर ब्लोअर स्प्रेयर + म्यूटर", en: "600L Blower Sprayer + Mulcher" },
        power: "20-25 HP 4WD"
    },
    {
        id: "combine-harvester",
        categories: ["dhan", "gehu"],
        image: "https://images.unsplash.com/photo-1585499193151-0f50d54c4e54?auto=format&fit=crop&w=800&q=80",
        rate: 1400,
        rateUnit: { hi: "एकड़", en: "Acre" },
        badge: { hi: "⚡ धान व गेहूं सीधी कटाई", en: "⚡ Direct Harvesting & Threshing" },
        name: { hi: "मल्टी-क्रॉप कंबाइन हार्वेस्टर", en: "Multi-Crop Combine Harvester" },
        subtitle: { hi: "खेत में खड़ी फसल की कटाई, मढ़ाई और दाना अलग करना", en: "Cuts, threshes and cleans grain straight into trolley" },
        suitableCrops: { hi: "धान, गेहूं, सोयाबीन, चना", en: "Paddy, Wheat, Soybean, Gram" },
        suitableWork: { hi: "समय और मजदूरी की भारी बचत, 1 घंटे में कटाई", en: "Huge time and labor savings, cuts 1 acre/hour" },
        tool: { hi: "14 फीट कटर बार + ग्रेन क्लीनर", en: "14ft Cutter Bar + High Flow Grain Tank" },
        power: "100+ HP Turbo Engine"
    }
];

// 2. Full Language Dictionary
const translations = {
    hi: {
        modalTitle: "अपनी भाषा चुनें / Choose Language",
        modalSubtitle: "कृपया अपनी पसंदीदा भाषा चुनें / Please select your preferred language",
        brandName: "प्रोजेक्ट ट्रैक्टर",
        brandSubtitle: "किसान भाइयों का अपना ट्रैक्टर पोर्टल",

        // Drawer Menu
        drawerVerifiedBadge: "सत्यापित किसान",
        menuHome: "होम / डैशबोर्ड",
        menuRegTractor: "अपना ट्रैक्टर जोड़ें",
        menuRegTractorSub: "किराये पर देकर कमाई करें",
        menuLanguage: "भाषा बदलें (हिंदी / English)",
        menuTerms: "नियम व नीतियां (Terms & Policy)",
        menuHelpline: "किसान सहायता केंद्र (24x7)",
        drawerFooterTag: "किसान भाइयों का सच्चा साथी",
        navAttachBtn: "ट्रैक्टर जोड़ें",

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

        // Hero Banner
        heroBadge: "🌾 किसान की जरूरत, सही मशीन",
        heroTitle: "अपनी फसल और काम के अनुसार सही ट्रैक्टर चुनें",
        heroTagline: "ब्रांड नहीं, अपनी फसल की जरूरत देखें — धान, गेहूं, गन्ना, आलू या ढुलाई के लिए सबसे उपयुक्त मशीन और औजार किराये पर लें।",
        statGuaranteed: "काम की गारंटी",
        statSupport: "किसान सहायता",
        statNoAdvance: "बिना एडवांस बुकिंग",

        // Filter Pills
        cropFilterTitle: "🌾 आपकी फसल या काम क्या है?",
        cropFilterSubtitle: "नीचे अपनी फसल या काम पर क्लिक करें, सिस्टम आपको सबसे सही ट्रैक्टर और औजार दिखाएगा:",
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

        // Help Callout
        calloutTitle: "फोन या व्हाट्सएप पर सीधे ट्रैक्टर मंगाएं",
        calloutDesc: "अगर फॉर्म भरने में परेशानी हो, तो हमारे किसान नंबर पर कॉल या व्हाट्सएप करें — हमारी टीम तुरंत आपके खेत पर ट्रैक्टर भेजेगी।",
        btnCallNow: "1800-123-4567 (टोल फ्री)",
        btnWhatsAppNow: "व्हाट्सएप पर बात करें",

        // Booking Modal
        modalRateLabel: "किराया दर:",
        modalEstimatedLabel: "कुल अनुमानित खर्च:",
        labelFarmerName: "किसान का नाम *",
        placeholderFarmerName: "जैसे: रमेश कुमार",
        labelFarmerPhone: "मोबाइल नंबर *",
        placeholderFarmerPhone: "10 अंकों का मोबाइल नंबर",
        labelFarmerVillage: "गांव / कस्बा व जिला *",
        placeholderFarmerVillage: "जैसे: रामपुर, मेरठ",
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
        forgotAlert: "पासवर्ड रीसेट हेल्पलाइन: 1800-123-4567 पर कॉल करें।",
        signupAlert: "नया रजिस्ट्रेशन जल्द शुरू होगा! अभी आप सीधे लॉगिन कर सकते हैं।",
        langTag: "हिंदी"
    },
    en: {
        modalTitle: "Choose Language / अपनी भाषा चुनें",
        modalSubtitle: "Please select your preferred language / कृपया भाषा चुनें",
        brandName: "Project Tractor",
        brandSubtitle: "The Trusted Tractor Portal for Farmers",

        // Drawer Menu
        drawerVerifiedBadge: "Verified Farmer",
        menuHome: "Home / Dashboard",
        menuRegTractor: "Register Your Tractor",
        menuRegTractorSub: "Earn daily by renting",
        menuLanguage: "Change Language (हिंदी / English)",
        menuTerms: "Terms & Policies",
        menuHelpline: "Farmer Helpline (24x7)",
        drawerFooterTag: "Trusted Companion of Farmers",
        navAttachBtn: "Attach Tractor",

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

        // Hero Banner
        heroBadge: "🌾 Farmer Needs, Perfect Machine",
        heroTitle: "Pick the Right Tractor Based on Your Crop & Work",
        heroTagline: "Focus on your crop needs, not tractor brands — rent the ideal machine and attachments for Paddy, Wheat, Sugarcane, Vegetables or Haulage.",
        statGuaranteed: "Work Guaranteed",
        statSupport: "24x7 Helpline",
        statNoAdvance: "Zero Advance Booking",

        // Filter Pills
        cropFilterTitle: "🌾 What is your Crop or Work Requirement?",
        cropFilterSubtitle: "Click your crop or task below, and the system will recommend the most suitable tractor and implements:",
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

        // Help Callout
        calloutTitle: "Order a Tractor Directly via Phone or WhatsApp",
        calloutDesc: "If you find it difficult to fill forms, simply call or WhatsApp our helpline — our local team will deploy a tractor to your farm immediately.",
        btnCallNow: "1800-123-4567 (Toll Free)",
        btnWhatsAppNow: "Chat on WhatsApp",

        // Booking Modal
        modalRateLabel: "Rental Rate:",
        modalEstimatedLabel: "Estimated Total Cost:",
        labelFarmerName: "Farmer Name *",
        placeholderFarmerName: "e.g. Ramesh Kumar",
        labelFarmerPhone: "Mobile Number *",
        placeholderFarmerPhone: "10-digit mobile number",
        labelFarmerVillage: "Village / Town & District *",
        placeholderFarmerVillage: "e.g. Rampur, Meerut",
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
        forgotAlert: "Please call helpline 1800-123-4567 to reset your password.",
        signupAlert: "New registration starting soon! You can login directly now.",
        langTag: "English"
    }
};

let currentLang = 'hi';
let currentFilter = 'all';
let selectedMachine = null;

// ==========================================
// 3. 3-Line Side Drawer (Hamburger Menu)
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
    const photoUrl = brandRealPhotos[tractorBrand] || "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80";

    // Add newly registered tractor to active fleet
    const newId = 'custom-' + Date.now();
    fleetData.unshift({
        id: newId,
        categories: tractorDrive === '4WD' ? ['dhan', 'gehu'] : ['gehu', 'ganna', 'dhulai'],
        image: photoUrl,
        rate: tractorRate,
        rateUnit: { hi: "घंटा", en: "Hour" },
        badge: { hi: `⭐ ${ownerVillage} स्पेशल`, en: `⭐ ${ownerVillage} Local` },
        name: { hi: `${tractorBrand} (${ownerName})`, en: `${tractorBrand} (${ownerName})` },
        subtitle: { hi: `मालिक: ${ownerName} | संपर्क: ${ownerPhone}`, en: `Owner: ${ownerName} | Contact: ${ownerPhone}` },
        suitableCrops: { hi: "स्थानीय फसलें व जुताई", en: "Local Crops & Tillage" },
        suitableWork: { hi: "कस्टम किराए पर उपलब्ध", en: "Available for Custom Rent" },
        tool: { hi: "रोटावेटर / कल्टीवेटर अटैच्ड", en: "Rotavator / Cultivator Attached" },
        power: tractorBrand.includes('HP') ? tractorBrand.split('(')[1].replace(')', '') : "50 HP"
    });

    closeTractorRegModal();
    renderFleetCards(currentFilter);

    alert(t.regSuccessAlert.replace('{owner}', ownerName).replace('{tractor}', tractorBrand));
}

// ==========================================
// 5. Render Fleet Cards with Real Photos
// ==========================================
function renderFleetCards(category = 'all') {
    const grid = document.getElementById('fleetGrid');
    if (!grid) return;

    currentFilter = category;
    const t = translations[currentLang] || translations.hi;

    const filtered = category === 'all'
        ? fleetData
        : fleetData.filter(item => item.categories.includes(category));

    // Update fleet count
    const countBadge = document.getElementById('fleetCountBadge');
    if (countBadge) {
        countBadge.textContent = `${filtered.length} ${t.fleetCountSuffix}`;
    }

    grid.innerHTML = filtered.map(machine => {
        const title = machine.name[currentLang] || machine.name.hi;
        const sub = machine.subtitle[currentLang] || machine.subtitle.hi;
        const badge = machine.badge[currentLang] || machine.badge.hi;
        const crops = machine.suitableCrops[currentLang] || machine.suitableCrops.hi;
        const work = machine.suitableWork[currentLang] || machine.suitableWork.hi;
        const tool = machine.tool[currentLang] || machine.tool.hi;
        const rateUnit = machine.rateUnit[currentLang] || machine.rateUnit.hi;
        const imgUrl = machine.image || "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80";

        return `
            <div class="machine-card">
                <span class="card-top-badge">${badge}</span>
                <div class="machine-card-image">
                    <img src="${imgUrl}" alt="${title}" class="machine-real-photo" loading="lazy">
                </div>
                <div class="machine-card-body">
                    <h4 class="machine-title">${title}</h4>
                    <p class="machine-subtitle">${sub}</p>
                    
                    <div class="specs-list">
                        <div class="spec-item">
                            <span>🌾</span>
                            <span><strong>${t.cardCrops}</strong> ${crops}</span>
                        </div>
                        <div class="spec-item">
                            <span>⚙️</span>
                            <span><strong>${t.cardBestFor}</strong> ${work}</span>
                        </div>
                        <div class="spec-item">
                            <span>🛠️</span>
                            <span><strong>${t.cardTool}</strong> ${tool}</span>
                        </div>
                        <div class="spec-item">
                            <span>⚡</span>
                            <span><strong>${t.cardPower}</strong> ${machine.power}</span>
                        </div>
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

// ==========================================
// 6. Booking Modal Handlers with Photo Preview
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
    const imgUrl = selectedMachine.image || "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80";

    document.getElementById('modalMachineTitle').textContent = title;
    document.getElementById('modalMachineSubtitle').textContent = sub;
    document.getElementById('modalMachineCategory').textContent = badge;
    document.getElementById('modalMachineRate').textContent = `₹${selectedMachine.rate} / ${rateUnit}`;

    // Set real photo in booking modal
    const modalPhoto = document.getElementById('modalMachinePhoto');
    if (modalPhoto) {
        modalPhoto.src = imgUrl;
        modalPhoto.alt = title;
    }

    // Pre-fill user name if logged in
    const savedUser = localStorage.getItem('tractorUser');
    const farmerNameInput = document.getElementById('farmerName');
    if (farmerNameInput && savedUser && savedUser !== t.guestUser) {
        farmerNameInput.value = savedUser;
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

// Live Cost Calculator inside Booking Modal
function calculateEstimate() {
    if (!selectedMachine) return;
    const durationInput = document.getElementById('workDuration');
    const duration = parseFloat(durationInput ? durationInput.value : 1) || 1;
    const total = duration * selectedMachine.rate;
    const totalEl = document.getElementById('modalTotalEstimate');
    if (totalEl) {
        totalEl.textContent = `₹${total.toLocaleString('en-IN')}`;
    }
}

// Handle Booking Form Submit
function handleTractorBookingSubmit(event) {
    event.preventDefault();
    const t = translations[currentLang] || translations.hi;

    const farmerName = document.getElementById('farmerName').value.trim();
    const farmerPhone = document.getElementById('farmerPhone').value.trim();
    const farmerVillage = document.getElementById('farmerVillage').value.trim();
    const duration = document.getElementById('workDuration').value;

    if (!farmerName || !farmerPhone || !farmerVillage) {
        alert(t.errFillFields);
        return;
    }

    const machineTitle = selectedMachine.name[currentLang] || selectedMachine.name.hi;
    const rateUnit = selectedMachine.rateUnit[currentLang] || selectedMachine.rateUnit.hi;
    const total = (parseFloat(duration) * selectedMachine.rate).toLocaleString('en-IN');
    const orderId = 'TRAC-' + Math.floor(100000 + Math.random() * 900000);

    closeBookingModal();
    showReceiptModal({
        orderId,
        farmerName,
        farmerPhone,
        farmerVillage,
        machineTitle,
        duration: `${duration} ${rateUnit}`,
        total: `₹${total}`
    });
}

function showReceiptModal(data) {
    const modal = document.getElementById('receiptModal');
    const content = document.getElementById('receiptDetailsContent');
    const t = translations[currentLang] || translations.hi;
    if (!modal || !content) return;

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
// 7. WhatsApp Booking Dispatcher
// ==========================================
function sendBookingViaWhatsApp() {
    if (!selectedMachine) return;
    const farmerName = document.getElementById('farmerName').value.trim() || 'Kisan';
    const farmerPhone = document.getElementById('farmerPhone').value.trim() || 'Not Provided';
    const farmerVillage = document.getElementById('farmerVillage').value.trim() || 'Village';
    const duration = document.getElementById('workDuration').value || 1;
    const cropName = document.getElementById('workCropName').value.trim() || 'Kheti';
    const machineTitle = selectedMachine.name[currentLang] || selectedMachine.name.hi;
    const rateUnit = selectedMachine.rateUnit[currentLang] || selectedMachine.rateUnit.hi;
    const total = (parseFloat(duration) * selectedMachine.rate);

    const message = `🚜 *PROJECT TRACTOR - BOOKING ORDER* 🚜\n\n` +
        `👤 *Kisan Ka Naam:* ${farmerName}\n` +
        `📱 *Mobile Number:* ${farmerPhone}\n` +
        `📍 *Gaon / District:* ${farmerVillage}\n` +
        `🌾 *Fasal / Kaam:* ${cropName}\n` +
        `🚜 *Chuni Gayi Gaadi:* ${machineTitle}\n` +
        `⏱️ *Samay / Avadhi:* ${duration} ${rateUnit}\n` +
        `💰 *Anumanit Bill:* ₹${total}\n\n` +
        `Kripya jaldi se tractor bhejane ki pushti karein. Shukriya!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919876543210?text=${encoded}`, '_blank');
}

function openDirectWhatsApp() {
    const msg = encodeURIComponent("Namaste! Mujhe kheti ke liye tractor aur machine kiraye par chahiye. Kripya jankari dein.");
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
}

// ==========================================
// 8. Language Switch Logic
// ==========================================
function applyLanguage(lang) {
    if (!translations[lang]) lang = 'hi';
    currentLang = lang;
    localStorage.setItem('tractorLang', lang);

    const t = translations[lang];

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

    // Re-render fleet in chosen language
    renderFleetCards(currentFilter);

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
});

// ==========================================
// 9. Auth & Navbar Session
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

function handleLogin(event) {
    event.preventDefault();
    const t = translations[currentLang] || translations.hi;
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

    showMessage(t.loginSuccess, 'success');
    localStorage.setItem('tractorUser', username);

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 800);
}

function guestLogin() {
    const t = translations[currentLang] || translations.hi;
    localStorage.setItem('tractorUser', t.guestUser);
    window.location.href = 'index.html';
}

function forgotPassword(event) {
    event.preventDefault();
    const t = translations[currentLang] || translations.hi;
    alert(t.forgotAlert);
}

function showSignUpNotice(event) {
    event.preventDefault();
    const t = translations[currentLang] || translations.hi;
    alert(t.signupAlert);
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
    window.location.href = 'login.html';
}

// ==========================================
// 10. Page Initialization
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

    renderFleetCards('all');
});
