export interface FleetItem {
  id: string;
  categories: string[];
  image: string;
  rate: number;
  fuelDiscount: number;
  rateUnit: { hi: string; en: string };
  badge: { hi: string; en: string };
  name: { hi: string; en: string };
  subtitle: { hi: string; en: string };
  suitableCrops: { hi: string; en: string };
  suitableWork: { hi: string; en: string };
  tool: { hi: string; en: string };
  power: string;
  rating: number;
  reviewsCount: number;
  distanceKm: number;
  location: { hi: string; en: string };
}

export const initialFleetData: FleetItem[] = [
  {
    id: "dhan-4wd",
    categories: ["dhan", "all"],
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
    reviewsCount: 68,
    distanceKm: 2.1,
    location: { hi: "दौराला, मेरठ", en: "Daurala, Meerut" }
  },
  {
    id: "gehu-super-seeder",
    categories: ["gehu", "all"],
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
    reviewsCount: 52,
    distanceKm: 3.4,
    location: { hi: "सरधना, मेरठ", en: "Sardhana, Meerut" }
  },
  {
    id: "gehu-laser-leveler",
    categories: ["gehu", "dhan", "ganna", "all"],
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
    reviewsCount: 54,
    distanceKm: 4.2,
    location: { hi: "जानी, मेरठ", en: "Jani, Meerut" }
  },
  {
    id: "ganna-heavy-hauler",
    categories: ["ganna", "all"],
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
    reviewsCount: 45,
    distanceKm: 1.8,
    location: { hi: "मोहिउद्दीनपुर, मेरठ", en: "Mohiuddinpur, Meerut" }
  },
  {
    id: "straw-reaper",
    categories: ["gehu", "dhulai", "all"],
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
    reviewsCount: 41,
    distanceKm: 5.0,
    location: { hi: "हस्तिनापुर, मेरठ", en: "Hastinapur, Meerut" }
  },
  {
    id: "sabzi-mini-tractor",
    categories: ["sabzi", "bagwani", "all"],
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
    reviewsCount: 39,
    distanceKm: 2.7,
    location: { hi: "हापुड़ रोड, मेरठ", en: "Hapur Road, Meerut" }
  },
  {
    id: "dhulai-trolley-tractor",
    categories: ["dhulai", "all"],
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
    reviewsCount: 61,
    distanceKm: 1.5,
    location: { hi: "मेरठ कैंट", en: "Meerut Cantt" }
  },
  {
    id: "bagwani-sprayer-mini",
    categories: ["bagwani", "all"],
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
    reviewsCount: 29,
    distanceKm: 3.8,
    location: { hi: "मवाना, मेरठ", en: "Mawana, Meerut" }
  },
  {
    id: "combine-harvester",
    categories: ["dhan", "gehu", "all"],
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
    reviewsCount: 83,
    distanceKm: 6.2,
    location: { hi: "रोहटा, मेरठ", en: "Rohta, Meerut" }
  }
];

export const mandiRatesList = [
  { item: "🌾 गेहूं (Wheat)", rate: "₹2,425 / क्विं", change: "+₹25" },
  { item: "🌾 धान 1121 (Basmati)", rate: "₹3,850 / क्विं", change: "+₹40" },
  { item: "🟡 सरसों (Mustard)", rate: "₹5,680 / क्विं", change: "+₹60" },
  { item: "🥔 आलू (Potato)", rate: "₹1,350 / क्विं", change: "-₹10" },
  { item: "🎋 गन्ना (Sugarcane SAP)", rate: "₹370 / क्विं", change: "स्थिर" },
  { item: "🌽 मक्का (Maize)", rate: "₹2,150 / क्विं", change: "+₹15" }
];
