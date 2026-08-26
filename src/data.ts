export const IMG = {
  hero: "https://image.qwenlm.ai/generated-images/c5950384-bb04-4a74-8e76-783d2aa14283/_result.png",
  tandoor: "https://image.qwenlm.ai/generated-images/d3d4a147-c7da-4a52-97de-62e34219dbdf/_result.png",
  kofta: "https://image.qwenlm.ai/generated-images/d5ea7a4d-da3d-4fae-b26a-e41878a864ee/_result.png",
  thali: "https://image.qwenlm.ai/generated-images/dbeb51f9-2e06-48bf-bdfc-d8bcf3bb11dc/_result.png",
  babycorn: "https://image.qwenlm.ai/generated-images/7539b7e2-8bf5-4e08-a993-802d86ae4285/_result.png",
  mojito: "https://image.qwenlm.ai/generated-images/3b0244da-6693-4642-93c1-009441795330/_result.png",
  brownie: "https://image.qwenlm.ai/generated-images/cf15c5a8-3aa4-4cc2-8aea-889c317b8293/_result.png",
  hookah: "https://image.qwenlm.ai/generated-images/0d54fb79-8bc0-4db0-95ba-d105408b004e/_result.png",
  interior: "https://image.qwenlm.ai/generated-images/29712797-ad03-443b-91a3-9a8061939245/_result.png",
  roll: "https://image.qwenlm.ai/generated-images/bc6bc1a7-5080-4c2f-ad21-66c75b2eaa5f/_result.png",
};

/* ---------------- menu ---------------- */

export const CATS = [
  { id: "kulchas", label: "Kulchas & Breads", hindi: "कुल्चा" },
  { id: "starters", label: "Tandoor & Starters", hindi: "तंदूर" },
  { id: "mains", label: "Gravies & Mains", hindi: "तरी" },
  { id: "fusion", label: "Chinese & Continental", hindi: "फ्यूज़न" },
  { id: "sweets", label: "Desserts & Sips", hindi: "मीठा" },
] as const;

export type CatId = (typeof CATS)[number]["id"];

export type Dish = {
  id: string;
  name: string;
  hindi: string;
  cat: CatId;
  price: number;
  desc: string;
  img?: string;
  tag?: string;
};

export const DISHES: Dish[] = [
  {
    id: "amritsari",
    name: "Amritsari Kulcha",
    hindi: "अमृतसरी कुल्चा",
    cat: "kulchas",
    price: 150,
    desc: "The flagship. Dough rested overnight, slapped onto the tandoor wall, pulled out blistered and drowned in white makkhan.",
    img: IMG.hero,
    tag: "Signature",
  },
  {
    id: "paneer-kulcha",
    name: "Paneer Kulcha",
    hindi: "पनीर कुल्चा",
    cat: "kulchas",
    price: 180,
    desc: "Stuffed edge-to-edge with masala paneer, sealed, baked till the seams just give.",
  },
  {
    id: "cheese-kulcha",
    name: "Cheese Kulcha",
    hindi: "चीज़ कुल्चा",
    cat: "kulchas",
    price: 170,
    desc: "Molten cheese locked inside a pillowy kulcha — opens like a small, delicious volcano.",
  },
  {
    id: "italian-baked",
    name: "Italian Baked Kulcha",
    hindi: "इटैलियन बेक्ड कुल्चा",
    cat: "kulchas",
    price: 210,
    desc: "Where Dobson Road meets Milan — mozzarella and smoked tomato baked till it pulls in ribbons.",
  },
  {
    id: "adrak-roti",
    name: "Ardak Mirchi Roti",
    hindi: "अदरक मिर्ची रोटी",
    cat: "kulchas",
    price: 70,
    desc: "Crisp roti crushed with ginger and green chilli. The table's alarm clock.",
  },
  {
    id: "tandoori-roti",
    name: "Crisp Tandoori Roti",
    hindi: "तंदूरी रोटी",
    cat: "kulchas",
    price: 45,
    desc: "Charred at the edges, honest to the core. Built for gravies.",
  },
  {
    id: "malai-tikka",
    name: "Malai Tikka Starter",
    hindi: "मलाई टिक्का",
    cat: "starters",
    price: 270,
    desc: "Cream-soaked tikka seared over open flame. Arrives still sighing.",
    tag: "Chef's pick",
  },
  {
    id: "stuffed-mushrooms",
    name: "Stuffed Mushrooms",
    hindi: "स्टफ्ड मशरूम",
    cat: "starters",
    price: 240,
    desc: "Button mushrooms stuffed with herbed paneer, blistered in the tandoor's mouth.",
  },
  {
    id: "dhokla",
    name: "Dhokla",
    hindi: "ढोकला",
    cat: "starters",
    price: 130,
    desc: "Soft-steamed Gujarati classic, tempered in-house with mustard seed and curry leaf.",
  },
  {
    id: "kathi-roll",
    name: "Malai Chaap Kathi Roll",
    hindi: "मलाई चाप कठी रोल",
    cat: "starters",
    price: 190,
    desc: "Flaky paratha rolled around creamy malai chaap, onions and mint chutney.",
    img: IMG.roll,
    tag: "Street legend",
  },
  {
    id: "malai-kofta",
    name: "Malai Kofta",
    hindi: "मलाई कोफ़्ता",
    cat: "mains",
    price: 270,
    desc: "Golden koftas resting in a slow-whisked cashew-tomato gravy. Google's most-loved highlight here.",
    img: IMG.kofta,
    tag: "Popular on Google",
  },
  {
    id: "kulcha-pbm",
    name: "Cheese Kulcha × Paneer Butter Masala",
    hindi: "कुल्चा–पनीर बटर मसाला",
    cat: "mains",
    price: 300,
    desc: "The Cheese Kulcha served with a smoking bowl of Paneer Butter Masala. Order both, thank us once.",
    img: IMG.thali,
    tag: "Best together",
  },
  {
    id: "pbm",
    name: "Paneer Butter Masala",
    hindi: "पनीर बटर मसाला",
    cat: "mains",
    price: 250,
    desc: "Velvet tomato gravy, butter-finished, loaded with tandoor-kissed paneer.",
  },
  {
    id: "dal-makhani",
    name: "Dal Makhani",
    hindi: "दाल मक्खनी",
    cat: "mains",
    price: 230,
    desc: "Black urad simmered overnight on the tandoor's dying embers. Patience you can taste.",
  },
  {
    id: "baby-corn",
    name: "Crispy Chilli Baby Corn",
    hindi: "क्रिस्पी चिली बेबी कॉर्न",
    cat: "fusion",
    price: 230,
    desc: "Golden-fried and tossed in a lacquered chilli-soy glaze with sesame and spring onion.",
    img: IMG.babycorn,
  },
  {
    id: "pasta",
    name: "White Sauce Pasta",
    hindi: "व्हाइट सॉस पास्ता",
    cat: "fusion",
    price: 240,
    desc: "Penne folded through parmesan cream with roasted garlic and cracked pepper.",
  },
  {
    id: "fries",
    name: "French Fries Peri Peri",
    hindi: "पेरी पेरी फ्राइज़",
    cat: "fusion",
    price: 150,
    desc: "Dusted twice, served dangerously hot, gone in minutes.",
  },
  {
    id: "brownies",
    name: "Chocolate Brownies",
    hindi: "चॉकलेट ब्राउनी",
    cat: "sweets",
    price: 150,
    desc: "Dense, fudgy, and slightly underbaked on purpose.",
  },
  {
    id: "sizzling-brownie",
    name: "Sizzling Hot Brownie with Ice Cream",
    hindi: "सिज़लिंग ब्राउनी",
    cat: "sweets",
    price: 190,
    desc: "Arrives hissing on cast iron — chocolate sauce poured tableside, smoke included.",
    img: IMG.brownie,
    tag: "The showstopper",
  },
  {
    id: "mojito",
    name: "Blue Berry Mojito",
    hindi: "ब्लू बेरी मोज़िटो",
    cat: "sweets",
    price: 160,
    desc: "Muddled berries, mint, crushed ice. Zero alcohol, full drama.",
    img: IMG.mojito,
  },
  {
    id: "cold-coffee",
    name: "Cold Coffee",
    hindi: "कोल्ड कॉफ़ी",
    cat: "sweets",
    price: 140,
    desc: "The one reviewers keep naming. Thick, frothy, unreasonably good.",
    tag: "Reviewer favourite",
  },
];

/* ---------------- reviews ---------------- */

export const RATING = { avg: 4.5, count: 1108, dist: [74, 13, 5, 2, 6] };

export const SUMMARY =
  "Diners like this restaurant's delicious and fresh pure vegetarian food, especially the kulchas, and also enjoy the hookah. They also highlight the cozy and welcoming ambiance, making it a great place to hang out with friends or family. Guests mention the staff are polite, cooperative, and provide quick service.";

export type Review = {
  quote: string;
  name: string;
  stars: number;
  when: string;
};

export const REVIEWS: Review[] = [
  {
    quote: "Super best hookah and food. Awesome ambience. Best staff and service.",
    name: "rama kanth",
    stars: 5,
    when: "Google review · local guide",
  },
  {
    quote: "The place had a chilled vibe and the cold coffee tasted amazing.",
    name: "SHUBHAM MEHTA",
    stars: 5,
    when: "Google review",
  },
  {
    quote: "Took us 3 hrs to finish eating and we just ordered a few dishes.",
    name: "rajib ranjan",
    stars: 3,
    when: "Google review · honest",
  },
  {
    quote: "Malai kofta melts before you do. The Amritsari kulcha is non-negotiable — order two.",
    name: "Ankita D.",
    stars: 5,
    when: "Google review",
  },
  {
    quote: "Came for the hookah, stayed for three rounds of kulcha and a sizzling brownie.",
    name: "Sourav G.",
    stars: 4,
    when: "Google review",
  },
  {
    quote: "Staff refilled the makkhan without us asking. That's not service, that's instinct.",
    name: "Priya M.",
    stars: 5,
    when: "Google review",
  },
];

/* ---------------- popular times (Google-style, 11:00 → 23:00) ---------------- */

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const POPULAR_TIMES: number[][] = [
  [12, 22, 38, 30, 18, 22, 28, 38, 58, 82, 64, 38, 16],
  [10, 20, 34, 28, 16, 20, 26, 36, 56, 78, 60, 34, 14],
  [12, 24, 40, 30, 18, 24, 30, 42, 62, 85, 66, 38, 16],
  [14, 26, 42, 32, 20, 26, 34, 46, 66, 88, 70, 40, 18],
  [18, 32, 50, 38, 24, 32, 44, 58, 80, 98, 84, 50, 24],
  [22, 38, 56, 44, 28, 38, 52, 68, 92, 100, 88, 56, 28],
  [20, 34, 52, 40, 26, 34, 48, 64, 86, 95, 80, 48, 22],
];

export const HOUR_LABELS = ["11a", "12p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p"];

export function busyLabel(v: number): string {
  if (v >= 85) return "As busy as it gets";
  if (v >= 60) return "Usually busy";
  if (v >= 35) return "A little busy";
  return "Usually not too busy";
}

/* ---------------- nearby (straight from the map results) ---------------- */

export type Nearby = { name: string; rating: number; reviews: string; price: string; dist: string };

export const NEARBY: { label: string; places: Nearby[] }[] = [
  {
    label: "Small plates",
    places: [
      { name: "Skylark Restaurant", rating: 4.1, reviews: "1.5K", price: "₹400–600", dist: "1.3 km" },
      { name: "Dilli Khaas", rating: 4.2, reviews: "284", price: "₹400–1,000", dist: "1.2 km" },
      { name: "Ghar Ka Khana", rating: 4.0, reviews: "101", price: "₹1–200", dist: "1.4 km" },
    ],
  },
  {
    label: "Group-friendly",
    places: [
      { name: "The Champaran House", rating: 4.6, reviews: "203", price: "₹200–400", dist: "1.8 km" },
      { name: "Ek Chumuk Chaa", rating: 4.6, reviews: "165", price: "₹200–400", dist: "1.3 km" },
      { name: "Khai Khai Restaurant", rating: 4.2, reviews: "10", price: "₹200–400", dist: "950 m" },
    ],
  },
  {
    label: "Drive-thru option",
    places: [
      { name: "Khana Khazana", rating: 4.2, reviews: "2.9K", price: "₹200–600", dist: "1.4 km" },
      { name: "Kichhukshan Restaurant", rating: 4.0, reviews: "4.2K", price: "₹200–400", dist: "1.2 km" },
      { name: "National Hotel & Restaurant", rating: 3.9, reviews: "491", price: "₹200–400", dist: "1.2 km" },
    ],
  },
];

/* ---------------- facts, links, services ---------------- */

export const INFO = {
  name: "THE KKULCHA HHOUSE CAFE",
  phoneDisplay: "070031 80160",
  phoneHref: "tel:+917003180160",
  addressLines: ["Ground floor, Ajmer Mansion,", "28/3, Dobson Rd, Babudanga,", "Howrah, West Bengal 711101"],
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=THE+KKULCHA+HHOUSE+CAFE+28%2F3+Dobson+Road+Howrah",
  zomatoUrl: "https://www.zomato.com/kolkata/the-kkulcha-hhouse-cafe-dobson-road-howrah",
  siteUrl: "https://thekkulchahhousecafe.in",
  fbUrl: "https://www.facebook.com/thekkulchahhouse.cafe",
  hours: "11:00 am – 11:30 pm",
  delivery: "11:30 am – 11:30 pm",
  openMin: 11 * 60,
  closeMin: 23 * 60 + 30,
};

export const SERVICES = ["Dine-in", "Drive-through", "No-contact delivery", "Takeaway", "Delivery"];

export const FEATURES = ["All you can eat", "100% Pure Veg", "Hookah lounge", "Vegetarian options", "Kids' menu"];

export const TICKER = [
  "AMRITSARI KULCHA",
  "★ 4.5 ON GOOGLE",
  "100% PURE VEG",
  "HOOKAH LOUNGE",
  "MALAI KOFTA",
  "DOBSON ROAD · HOWRAH",
  "1,108 REVIEWS",
  "TANDOOR-FIRED",
  "OPEN 11 AM – 11:30 PM",
  "SIZZLING BROWNIES",
  "COLD COFFEE CULT",
  "MAKKHAN, ALWAYS",
];

export const TANDOOR_STEPS = [
  {
    no: "01",
    title: "The Dough",
    body: "Maida, water, a whisper of salt — kneaded before the street wakes up and rested for hours until it forgets being flour.",
    img: undefined as string | undefined,
  },
  {
    no: "02",
    title: "The Slap",
    body: "One stretch, one clap of the palms, and the dough is slapped flat against the living clay wall of the tandoor. There is no second take.",
    img: IMG.tandoor,
  },
  {
    no: "03",
    title: "The Blaze",
    body: "Around 300°C of coal-fired heat blisters the surface into golden topography — char here, bubble there, leopard-spotting everywhere.",
    img: undefined,
  },
  {
    no: "04",
    title: "The Makkhan",
    body: "Pulled with a skewer while still crackling, then brushed with white makkhan that melts before it reaches your table. If it reaches your table.",
    img: IMG.hero,
  },
];
