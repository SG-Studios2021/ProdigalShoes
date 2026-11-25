const makePlaceholder = (label, bg1, bg2, accent) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
        <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="${bg1}"/>
                <stop offset="100%" stop-color="${bg2}"/>
            </linearGradient>
        </defs>
        <rect width="800" height="800" fill="url(#g)"/>
        <circle cx="400" cy="360" r="210" fill="${accent}" fill-opacity="0.14"/>
        <path d="M180 440 C240 440, 290 360, 355 345 L430 385 C495 395, 565 390, 625 425 C645 438, 640 475, 605 480 L195 480 C168 480, 160 445, 180 440 Z" fill="${accent}" fill-opacity="0.85"/>
        <rect x="175" y="482" width="445" height="26" rx="13" fill="#ffffff" fill-opacity="0.9"/>
        <text x="400" y="110" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#ffffff" fill-opacity="0.55" text-anchor="middle" letter-spacing="6">PRODIGAL$ ARCHIVE</text>
        <text x="400" y="610" font-family="Arial, sans-serif" font-size="30" font-weight="800" fill="#ffffff" text-anchor="middle">${label}</text>
        <text x="400" y="655" font-family="Arial, sans-serif" font-size="18" fill="#ffffff" fill-opacity="0.65" text-anchor="middle">ON-HAND PAIR • PHOTO PREVIEW</text>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const SHOES = [
    {
        id: "ps-01",
        name: "Nike Kobe AD NXT 'All-Star Patches'",
        category: "Basketball",
        price: 3500,
        sizeAvailable: "EU 41–42",
        condition: "Pre-loved • No Issues",
        colorway: "Sail / Multi-Patch",
        description:
            "Eye-catching high-cut Kobe AD NXT silhouette featuring custom chenille All-Star city patches (2016 Toronto, 2017 New Orleans, 2018 L.A.), crown emblem, and graphic midsole wrap.",
        image: makePlaceholder("KOBE AD NXT PATCHES", "#161922", "#0b0d12", "#3b82f6"),
        fbMarketplaceUrl: "https://www.facebook.com/share/p/1CVGWoPFzk/",
    },
    {
        id: "ps-02",
        name: "Peak High-Top 'South Beach Teal'",
        category: "Basketball",
        price: 2200,
        sizeAvailable: "EU 44–45",
        condition: "Pre-loved • No Issues",
        colorway: "Cream / Teal / Hot Pink",
        description:
            "Breathable engineered mesh mid-top basketball pair highlighted by speckled teal toe caps, sculpted white cushion pods, and hot-pink heel accents.",
        image: makePlaceholder("PEAK SOUTH BEACH TEAL", "#0f2229", "#091116", "#06b6d4"),
        fbMarketplaceUrl: "https://www.facebook.com/share/p/1CVGWoPFzk/",
    },
    {
        id: "ps-03",
        name: "Nike Metcon Trainer 'Camo Blaze'",
        category: "Training",
        price: 2500,
        sizeAvailable: "EU 40–41",
        condition: "Pre-loved • No Issues",
        colorway: "Black / Woodland Camo / Total Orange",
        description:
            "Flat-heeled cross-training runner built for stability and grip, combining stealth black forefoot mesh with woodland camo collars, vibrant orange Swooshes, and a gum outsole.",
        image: makePlaceholder("NIKE METCON CAMO BLAZE", "#1f1712", "#0d0b0a", "#f97316"),
        fbMarketplaceUrl: "https://www.facebook.com/share/p/1CVGWoPFzk/",
    },
    {
        id: "ps-04",
        name: "Air Jordan 1 Low 'Smoke Grey'",
        category: "Streetwear",
        price: 2800,
        sizeAvailable: "EU 35–36",
        condition: "Pre-loved • No Issues",
        colorway: "White / Light Smoke Grey / Black",
        description:
            "Classic low-profile Jordan 1 colorway pairing crisp white leather toe boxes with soft grey suede overlays, black Swooshes, and vintage cream midsoles.",
        image: makePlaceholder("AIR JORDAN 1 SMOKE GREY", "#1e2024", "#101114", "#9ca3af"),
        fbMarketplaceUrl: "https://www.facebook.com/share/p/1CVGWoPFzk/",
    },
    {
        id: "ps-05",
        name: "Peak Lou Williams 'Streetball Master'",
        category: "Basketball",
        price: 2400,
        sizeAvailable: "EU 41–42",
        condition: "Pre-loved • No Issues",
        colorway: "Sand / Black / Polka-Dot",
        description:
            "Signature Lou Williams court sneaker loaded with textured sand overlays, dotted midfoot cages, rope laces, and a gold-rimmed 'LW' heel badge.",
        image: makePlaceholder("PEAK LOU WILLIAMS", "#241f16", "#110f0b", "#eab308"),
        fbMarketplaceUrl: "https://www.facebook.com/share/p/1CVGWoPFzk/",
    },
    {
        id: "ps-06",
        name: "New Balance 574 'Oatmeal Suede'",
        category: "Lifestyle",
        price: 1800,
        sizeAvailable: "EU 37–38",
        condition: "Pre-loved • Minor Cracks",
        colorway: "Oatmeal / Off-White / Teal",
        description:
            "Everyday heritage runner crafted in soft oatmeal suede and breathable mesh with classic 'N' branding and subtle teal heel collar detailing.",
        image: makePlaceholder("NEW BALANCE 574 OATMEAL", "#23201c", "#12100e", "#d6c7b2"),
        fbMarketplaceUrl: "https://www.facebook.com/share/p/1CVGWoPFzk/",
    },
    {
        id: "ps-07",
        name: "ANTA Dial-Fit Runner 'Magma Flame'",
        category: "Running",
        price: 2300,
        sizeAvailable: "EU 38–39",
        condition: "Pre-loved • No Issues",
        colorway: "Jet Black / Fiery Orange",
        description:
            "Quick-lacing dial-lock performance runner wrapped in black mesh with bold flame graphics along the midsole and a responsive cushioned sole.",
        image: makePlaceholder("ANTA MAGMA FLAME", "#26120e", "#0e0908", "#ef4444"),
        fbMarketplaceUrl: "https://www.facebook.com/share/p/1CVGWoPFzk/",
    },
    {
        id: "ps-08",
        name: "ASICS Gel-Runner 'Blush Sakura'",
        category: "Lifestyle",
        price: 2100,
        sizeAvailable: "EU 36–37",
        condition: "Pre-loved • No Issues",
        colorway: "Blush Pink / Cream White",
        description:
            "Chunky-soled retro-futuristic runner featuring translucent mesh cutouts, toggle-lock pastel pink laces, and a sculpted cushioned midsole.",
        image: makePlaceholder("ASICS BLUSH SAKURA", "#281920", "#120c0f", "#f472b6"),
        fbMarketplaceUrl: "https://www.facebook.com/share/p/1CVGWoPFzk/",
    },
    {
        id: "ps-09",
        name: "Li-Ning Classic Low 'Electric Berry'",
        category: "Lifestyle",
        price: 1700,
        sizeAvailable: "EU 36–37",
        condition: "Pre-loved • No Issues",
        colorway: "Royal Blue / Magenta Pink",
        description:
            "Lightweight retro court sneaker pairing a vivid royal-blue upper with contrasting hot-pink laces and plush inner lining.",
        image: makePlaceholder("LI-NING ELECTRIC BERRY", "#121c33", "#090d18", "#2563eb"),
        fbMarketplaceUrl: "https://www.facebook.com/share/p/1CVGWoPFzk/",
    },
    {
        id: "ps-10",
        name: "Alexander McQueen Oversized Sneaker",
        category: "Luxury",
        price: 3200,
        sizeAvailable: "EU 36–37",
        condition: "Pre-loved • No Issues",
        colorway: "Crisp White / Black Heel Tab",
        description:
            "Iconic luxury platform court silhouette in smooth white leather with wide flat laces, perforated side vents, and a contrasting black suede heel counter.",
        image: makePlaceholder("ALEXANDER MCQUEEN WHITE", "#1d1f24", "#0c0d10", "#f8fafc"),
        fbMarketplaceUrl: "https://www.facebook.com/share/p/1CVGWoPFzk/",
    },
    {
        id: "ps-11",
        name: "Classic 3-Stripe Court Low 'White Black'",
        category: "Lifestyle",
        price: 1200,
        sizeAvailable: "EU 36–37",
        condition: "Pre-loved • Lace Stain",
        colorway: "Crisp White / Jet Black",
        description:
            "Clean everyday court sneaker featuring bold triple-black side stripes, gold foil side lettering, and a contrast black heel tab.",
        image: makePlaceholder("3-STRIPE COURT LOW", "#1b1d21", "#0c0d0f", "#e5e7eb"),
        fbMarketplaceUrl: "https://www.facebook.com/share/p/1CVGWoPFzk/",
    },
    {
        id: "ps-12",
        name: "Platform Canvas Low 'Monochrome Ribbed'",
        category: "Streetwear",
        price: 1400,
        sizeAvailable: "EU 36–37",
        condition: "Pre-loved • No Issues",
        colorway: "Charcoal Black / Chalk White",
        description:
            "Chunky platform canvas low-top crafted with contrast white piping, ribbed rubber toe caps, and woven side label detailing.",
        image: makePlaceholder("PLATFORM CANVAS LOW", "#18181b", "#09090b", "#a1a1aa"),
        fbMarketplaceUrl: "https://www.facebook.com/share/p/1CVGWoPFzk/",
    },
    {
        id: "ps-13",
        name: "Wave-Sole Chunky Runner 'Sand & Onyx'",
        category: "Streetwear",
        price: 1600,
        sizeAvailable: "EU 34–35",
        condition: "Pre-loved • No Issues",
        colorway: "Cream Sand / Matte Black",
        description:
            "Sculpted stacked-wave midsole sneaker layering soft cream suede panels over black mesh with a rugged lugged outsole.",
        image: makePlaceholder("WAVE-SOLE SAND & ONYX", "#221e19", "#0f0d0b", "#e7d8c5"),
        fbMarketplaceUrl: "https://www.facebook.com/share/p/1CVGWoPFzk/",
    },
    {
        id: "ps-14",
        name: "Warrior Strap Runner 'Monochrome'",
        category: "Lifestyle",
        price: 1300,
        sizeAvailable: "EU 34–35",
        condition: "Pre-loved • No Issues",
        colorway: "Off-White / Black / Cool Grey",
        description:
            "Lightweight retro-sport trainer topped with a signature 'WARRIOR' Velcro forefoot strap over black mesh and cushioned grey collars.",
        image: makePlaceholder("WARRIOR STRAP RUNNER", "#1c1e22", "#0c0d10", "#cbd5e1"),
        fbMarketplaceUrl: "https://www.facebook.com/share/p/1CVGWoPFzk/",
    },
    {
        id: "ps-15",
        name: "Converse Chuck Taylor All Star High 'Sunflower'",
        category: "Streetwear",
        price: 1900,
        sizeAvailable: "EU 37–38",
        condition: "Pre-loved • No Issues",
        colorway: "Sunflower Yellow / Egret White",
        description:
            "Timeless high-top canvas icon in vibrant mustard-sunflower yellow with classic ankle patch, silver eyelets, and black foxing pinstripe.",
        image: makePlaceholder("CONVERSE SUNFLOWER HIGH", "#28210f", "#120f07", "#facc15"),
        fbMarketplaceUrl: "https://www.facebook.com/share/p/1CVGWoPFzk/",
    },
    {
        id: "ps-16",
        name: "Alexander McQueen Oversized 'Rainbow Lace'",
        category: "Luxury",
        price: 3400,
        sizeAvailable: "EU 36–37",
        condition: "Pre-loved • No Issues",
        colorway: "Pure White / Multi-Color Ribbon",
        description:
            "Statement white leather platform sneaker elevated with wide rainbow-gradient ribbon laces and signature chunky rubber sole.",
        image: makePlaceholder("AMQ RAINBOW LACE", "#1e1b29", "#0c0b12", "#a855f7"),
        fbMarketplaceUrl: "https://www.facebook.com/share/p/1CVGWoPFzk/",
    },
    {
        id: "ps-17",
        name: "Nike Blazer Low Suede 'Ash Grey'",
        category: "Streetwear",
        price: 2200,
        sizeAvailable: "EU 36–37",
        condition: "Pre-loved • No Issues",
        colorway: "Ash Grey / Sail White",
        description:
            "Supple grey suede low-top accented with oversized sail-white Swoosh panels, tonal laces, and durable vulcanized rubber tooling.",
        image: makePlaceholder("NIKE BLAZER ASH GREY", "#1f2124", "#0e0f11", "#94a3b8"),
        fbMarketplaceUrl: "https://www.facebook.com/share/p/1CVGWoPFzk/",
    },
    {
        id: "ps-18",
        name: "Classic Canvas High-Top 'Crimson Red'",
        category: "Streetwear",
        price: 1300,
        sizeAvailable: "EU 36–37",
        condition: "Pre-loved • No Issues",
        colorway: "Crimson Red / White",
        description:
            "Bold red high-top canvas sneaker finished with contrast white stitching, bright white laces, and a star ankle emblem.",
        image: makePlaceholder("CANVAS HIGH CRIMSON", "#2a1114", "#120709", "#dc2626"),
        fbMarketplaceUrl: "https://www.facebook.com/share/p/1CVGWoPFzk/",
    },
    {
        id: "ps-19",
        name: "Contrast-Stitch Canvas Low 'Black & Olive'",
        category: "Lifestyle",
        price: 1250,
        sizeAvailable: "EU 34–35",
        condition: "Pre-loved • Minor Color Scuff",
        colorway: "Jet Black / Olive Brown / White",
        description:
            "Two-tone canvas low-top highlighted by decorative white zigzag stitching, rubber toe cap, and star side emblem.",
        image: makePlaceholder("STITCH CANVAS OLIVE", "#1c1e16", "#0c0d09", "#84cc16"),
        fbMarketplaceUrl: "https://www.facebook.com/share/p/1CVGWoPFzk/",
    },
    {
        id: "ps-20",
        name: "Retro Gum-Sole Trainer 'Obsidian & Cream'",
        category: "Lifestyle",
        price: 1650,
        sizeAvailable: "EU 36–37",
        condition: "Pre-loved • No Issues",
        colorway: "Obsidian Black / Cream / Gum",
        description:
            "Sleek T-toe suede and leather terrace sneaker featuring twin cream side stripes and a classic dark-gum rubber cupsole.",
        image: makePlaceholder("RETRO GUM TRAINER", "#1d1a16", "#0c0b09", "#d97706"),
        fbMarketplaceUrl: "https://www.facebook.com/share/p/1CVGWoPFzk/",
    },
    {
        id: "ps-21",
        name: "Li-Ning Wade Court Low 'Glacier Ice & Rose'",
        category: "Basketball",
        price: 2400,
        sizeAvailable: "EU 41–42",
        condition: "Pre-loved • No Issues",
        colorway: "Glacier Blue / Dusty Rose",
        description:
            "Lightweight low-top court sneaker featuring breathable ice-blue mesh, translucent forefoot overlays, and metallic rose tongue medallions.",
        image: makePlaceholder("LI-NING GLACIER ICE", "#13222b", "#091015", "#38bdf8"),
        fbMarketplaceUrl: "https://www.facebook.com/share/p/1CVGWoPFzk/",
    },
    {
        id: "ps-22",
        name: "Classic Matte Penny Loafer 'Jet Black'",
        category: "Formal",
        price: 1100,
        sizeAvailable: "EU 36–37",
        condition: "Pre-loved • No Issues",
        colorway: "Matte Black",
        description:
            "Clean slip-on platform penny loafer built with a durable lugged sole and classic vamp strap—ideal for school or smart-casual daily wear.",
        image: makePlaceholder("MATTE PENNY LOAFER", "#161618", "#08080a", "#64748b"),
        fbMarketplaceUrl: "https://www.facebook.com/share/p/1CVGWoPFzk/",
    },
    {
        id: "ps-23",
        name: "Adidas D Rose 773 'Triple Black & Gold'",
        category: "Basketball",
        price: 2500,
        sizeAvailable: "EU 41–42",
        condition: "Pre-loved • Minor Cracks",
        colorway: "Core Black / Metallic Gold",
        description:
            "High-collar Derrick Rose signature basketball sneaker wrapped in ribbed stealth-black mesh with gold rose tongue emblems and responsive Bounce cushioning.",
        image: makePlaceholder("ADIDAS D ROSE 773", "#1d1a12", "#0b0a07", "#eab308"),
        fbMarketplaceUrl: "https://www.facebook.com/share/p/1CVGWoPFzk/",
    },
    {
        id: "ps-24",
        name: "ANTA Street-Graffiti Runner 'Sunset & Violet'",
        category: "Running",
        price: 2200,
        sizeAvailable: "EU 37–38",
        condition: "Pre-loved • No Issues",
        colorway: "White / Tangerine / Violet / Cyan",
        description:
            "Bold multi-color toggle-lace runner accented with script side graphics, bright yellow collars, cyan toe hits, and a sculpted purple heel pod.",
        image: makePlaceholder("ANTA STREET GRAFFITI", "#21162b", "#0e0914", "#c084fc"),
        fbMarketplaceUrl: "https://www.facebook.com/share/p/1CVGWoPFzk/",
    },
    {
        id: "ps-25",
        name: "Monochrome Lug-Sole Runner 'Soft Cream'",
        category: "Lifestyle",
        price: 1500,
        sizeAvailable: "EU 36–37",
        condition: "Pre-loved • No Issues",
        colorway: "Soft Cream / Off-White",
        description:
            "Tonal cream leather and mesh trainer anchored by a heavily textured waffle-lugged outsole that wraps up the sidewall for extra grip.",
        image: makePlaceholder("LUG-SOLE SOFT CREAM", "#24211c", "#110f0d", "#f3e8d2"),
        fbMarketplaceUrl: "https://www.facebook.com/share/p/1CVGWoPFzk/",
    },
    {
        id: "ps-26",
        name: "Kappa Retro Court Trainer 'Sand & Crimson'",
        category: "Lifestyle",
        price: 1700,
        sizeAvailable: "EU 35–36",
        condition: "Pre-loved • No Issues",
        colorway: "Warm Sand / Crimson Red / Gum",
        description:
            "Vintage-inspired low-profile runner combining sand suede overlays, airy white mesh, a bold crimson side sweep, and a classic gum rubber sole.",
        image: makePlaceholder("KAPPA SAND & CRIMSON", "#261918", "#110b0a", "#ef4444"),
        fbMarketplaceUrl: "https://www.facebook.com/share/p/1CVGWoPFzk/",
    },
];