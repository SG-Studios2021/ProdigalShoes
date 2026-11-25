import { useEffect, useRef, useState } from "react";
import "../style/mainpage.css";

const SHOES = [
    {
        id: "ps-01",
        num: "01",
        name: "Prodigal$ Apex Low 'Cobalt'",
        category: "Streetwear",
        price: 185,
        colorway: "Obsidian / Electric Cobalt",
        material: "Full-Grain Italian Leather",
        edition: "Limited Drop • 300 Pairs",
        description:
            "Engineered with a sculpted dual-density midsole and hand-burnished cobalt leather overlays. Built for all-day street presence with zero break-in time.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    },
    {
        id: "ps-02",
        num: "02",
        name: "Prodigal$ Phantom Runner",
        category: "Performance",
        price: 210,
        colorway: "Stealth Black / Ice Blue",
        material: "Carbon-Weave Mesh & Pebax",
        edition: "Core Series • Restocked",
        description:
            "Ultra-lightweight carbon-plated cushioning wrapped in breathable ballistic knit. Designed to return energy on every stride from morning miles to late-night runs.",
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80",
        sizes: ["US 7.5", "US 8.5", "US 9.5", "US 10", "US 11"],
    },
    {
        id: "ps-03",
        num: "03",
        name: "Prodigal$ Monarch High '85",
        category: "Basketball",
        price: 245,
        colorway: "Midnight / Arctic White",
        material: "Tumbled Nubuck & Suede",
        edition: "Vault Release • Numbered",
        description:
            "An elevated heritage high-top featuring reinforced ankle lockdown, vintage cream foxing, and custom metal lace dubraes stamped with the Prodigal$ crest.",
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80",
        sizes: ["US 8", "US 9", "US 9.5", "US 10.5", "US 11", "US 12"],
    },
    {
        id: "ps-04",
        num: "04",
        name: "Prodigal$ Drift Court",
        category: "Luxury",
        price: 165,
        colorway: "Pure Chalk / Deep Navy",
        material: "Calfskin & Gum Rubber",
        edition: "Studio Capsule",
        description:
            "Minimalist court silhouette stripped down to clean architectural lines, memory-foam footbeds, and a high-grip translucent gum outsole.",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
    },
];

const MainPage = () => {
    const trailRef = useRef([]);
    const [selectedSizes, setSelectedSizes] = useState({
        "ps-01": "US 9",
        "ps-02": "US 9.5",
        "ps-03": "US 10.5",
        "ps-04": "US 9",
    });
    const [activeFilter, setActiveFilter] = useState("All");
    const [cart, setCart] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [checkedOut, setCheckedOut] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const particle = document.createElement("div");
            particle.className = "cursor-particle";
            particle.style.left = `${e.clientX}px`;
            particle.style.top = `${e.clientY}px`;
            document.body.appendChild(particle);
            trailRef.current.push(particle);

            setTimeout(() => {
                particle.remove();
                trailRef.current = trailRef.current.filter((item) => item !== particle);
            }, 600);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            trailRef.current.forEach((particle) => particle.remove());
        };
    }, []);

    const handleAddToCart = (shoe) => {
        const size = selectedSizes[shoe.id] || shoe.sizes[0];
        setCheckedOut(false);
        setCart((prev) => {
            const existingIndex = prev.findIndex(
                (item) => item.id === shoe.id && item.size === size
            );
            if (existingIndex > -1) {
                const updated = [...prev];
                updated[existingIndex].qty += 1;
                return updated;
            }
            return [
                ...prev,
                {
                    id: shoe.id,
                    name: shoe.name,
                    price: shoe.price,
                    image: shoe.image,
                    size,
                    qty: 1,
                },
            ];
        });
        setCartOpen(true);
    };

    const updateQty = (index, delta) => {
        setCart((prev) =>
            prev
                .map((item, i) => (i === index ? { ...item, qty: item.qty + delta } : item))
                .filter((item) => item.qty > 0)
        );
    };

    const handleCheckout = () => {
        setCheckedOut(true);
        setCart([]);
    };

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    const visibleShoes =
        activeFilter === "All"
            ? SHOES
            : SHOES.filter((shoe) => shoe.category === activeFilter);

    return (
        <div className="portfolio">
            {/* NAVBAR */}
            <nav className="navbar">
                <a href="#home" className="logo">
                    <img
                        src="/images/logoprodigal.png"
                        alt="Prodigal$ Logo"
                        className="logo-img"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    PRODIGAL<span>$.</span>
                </a>

                <div className="nav-links">
                    <a href="#home">Home</a>
                    <a href="#drops">Drops</a>
                    <a href="#craft">Craft</a>
                    <a href="#lookbook">Lookbook</a>
                </div>

                <button className="cart-trigger" onClick={() => setCartOpen(true)}>
                    Bag <span>{totalItems}</span>
                </button>
            </nav>

            {/* HERO SECTION */}
            <section className="hero" id="home">
                <div className="hero-content">
                    <p className="small-title">SEASON 2026 • LIMITED FOOTWEAR</p>

                    <h1>
                        Step Into
                        <span> Prodigal$.</span>
                    </h1>

                    <p className="hero-description">
                        Architectural silhouettes, Italian leather uppers, and
                        street-tested cushioning. Limited-batch sneakers crafted
                        for those who never blend into the pavement.
                    </p>

                    <div className="hero-buttons">
                        <a href="#drops" className="primary-btn">
                            Shop Latest Drop →
                        </a>

                        <a href="#lookbook" className="secondary-btn">
                            Watch Lookbook
                        </a>
                    </div>
                </div>

                {/* HERO SNEAKER STACK */}
                <div className="hero-profiles">
                    <div className="profile-photo photo-one">
                        <img src={SHOES[0].image} alt={SHOES[0].name} />
                    </div>

                    <div className="profile-photo photo-two">
                        <img src={SHOES[1].image} alt={SHOES[1].name} />
                    </div>

                    <div className="profile-photo photo-three">
                        <img src={SHOES[2].image} alt={SHOES[2].name} />
                    </div>

                    <div className="profile-photo photo-four">
                        <img src={SHOES[3].image} alt={SHOES[3].name} />
                    </div>

                    <div className="circle-decoration"></div>
                </div>
            </section>

            {/* FEATURED DROPS */}
            <section className="section" id="drops">
                <div className="section-heading">
                    <p>01 — FEATURED DROPS</p>
                    <h2>
                        Four silhouettes.
                        <br />
                        Zero compromises.
                    </h2>
                </div>

                <div className="filter-bar">
                    {["All", "Streetwear", "Performance", "Basketball", "Luxury"].map(
                        (cat) => (
                            <button
                                key={cat}
                                className={`filter-pill ${
                                    activeFilter === cat ? "active" : ""
                                }`}
                                onClick={() => setActiveFilter(cat)}
                            >
                                {cat}
                            </button>
                        )
                    )}
                </div>

                <div className="about-grid">
                    {visibleShoes.map((shoe, idx) => (
                        <div
                            key={shoe.id}
                            className={`person-card ${idx % 2 === 1 ? "reverse" : ""}`}
                        >
                            <div className="person-image">
                                <span className="price-badge">${shoe.price}</span>
                                <img src={shoe.image} alt={shoe.name} />
                            </div>

                            <div className="person-info">
                                <span>
                                    {shoe.num} • {shoe.category.toUpperCase()}
                                </span>

                                <h3>{shoe.name}</h3>

                                <p className="role">
                                    ${shoe.price} USD • {shoe.edition}
                                </p>

                                <p>{shoe.description}</p>

                                <div className="facts">
                                    <div>
                                        <strong>Colorway</strong>
                                        <span>{shoe.colorway}</span>
                                    </div>

                                    <div>
                                        <strong>Upper</strong>
                                        <span>{shoe.material}</span>
                                    </div>
                                </div>

                                {/* SIZE SELECTOR */}
                                <div className="size-block">
                                    <strong>Select Size</strong>
                                    <div className="size-grid">
                                        {shoe.sizes.map((size) => (
                                            <button
                                                key={size}
                                                type="button"
                                                className={`size-btn ${
                                                    selectedSizes[shoe.id] === size
                                                        ? "selected"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    setSelectedSizes((prev) => ({
                                                        ...prev,
                                                        [shoe.id]: size,
                                                    }))
                                                }
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="shop-actions">
                                    <button
                                        type="button"
                                        className="primary-btn"
                                        onClick={() => handleAddToCart(shoe)}
                                    >
                                        Add to Bag — ${shoe.price}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CRAFTSMANSHIP / DESIGN PROCESS */}
            <section className="journey section" id="craft">
                <div className="section-heading center">
                    <p>02 — HOW IT'S BUILT</p>
                    <h2>
                        Engineered from
                        <br />
                        the sole up.
                    </h2>
                </div>

                <div className="timeline">
                    <div className="timeline-item">
                        <div className="timeline-number">01</div>
                        <div>
                            <span>THE LAST & SILHOUETTE</span>
                            <h3>Sculpted Ergonomic Lasts</h3>
                            <p>
                                Every Prodigal$ sneaker begins with a custom-molded
                                anatomical last for an immediate, locked-in midfoot
                                fit without toe-box pinch.
                            </p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-number">02</div>
                        <div>
                            <span>THE MATERIALS</span>
                            <h3>Full-Grain Leathers & Carbon Plates</h3>
                            <p>
                                We source heavyweight aniline hides, hydrophobic
                                suedes, and aerospace-grade Pebax foam built to age
                                with character over thousands of miles.
                            </p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-number">03</div>
                        <div>
                            <span>THE RELEASE</span>
                            <h3>Small-Batch Numbered Drops</h3>
                            <p>
                                No mass overproduction. Every release is stitched in
                                numbered runs and shipped direct to your door in
                                collector magnetic boxes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* LOOKBOOK VIDEO */}
            <section className="section media-section" id="lookbook">
                <div className="section-heading">
                    <p>03 — CAMPAIGN FILM</p>
                    <h2>
                        Prodigal$
                        <br />
                        in motion.
                    </h2>
                </div>

                <div className="video-container">
                    <video
                        controls
                        preload="metadata"
                        poster={SHOES[0].image}
                    >
                        <source src="/videos/about-us2.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    <div className="video-label">
                        <span>●</span> SS26 STREETWEAR LOOKBOOK
                    </div>
                </div>
            </section>

            {/* STORE GUARANTEES */}
            <section className="facts-section section">
                <div className="section-heading center">
                    <p>04 — THE PRODIGAL$ STANDARD</p>
                    <h2>
                        Built for collectors
                        <br />
                        and daily wearers.
                    </h2>
                </div>

                <div className="fact-grid">
                    <div className="fact-card">
                        <span>01</span>
                        <h3>Express Shipping</h3>
                        <p>
                            Same-day dispatch on orders before 3 PM with
                            double-boxed protective transit.
                        </p>
                    </div>

                    <div className="fact-card">
                        <span>02</span>
                        <h3>100% Authentic</h3>
                        <p>
                            Every pair includes an NFC-chipped authenticity tag
                            and numbered certificate.
                        </p>
                    </div>

                    <div className="fact-card">
                        <span>03</span>
                        <h3>30-Day Size Swap</h3>
                        <p>
                            Need half a size up or down? Unworn pairs exchange
                            free of charge within 30 days.
                        </p>
                    </div>

                    <div className="fact-card">
                        <span>04</span>
                        <h3>VIP Drop Access</h3>
                        <p>
                            Members unlock 24-hour early access to limited
                            collaborations and vault restocks.
                        </p>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer>
                <div className="footer-title">
                    <p>OWN YOUR STRIDE</p>
                    <h2>
                        Walk with
                        <span> Prodigal$.</span>
                    </h2>
                </div>

                <div className="footer-bottom">
                    <span>© 2026 Prodigal$ Footwear Co. All rights reserved.</span>
                    <span>Davao City • Worldwide Shipping</span>
                </div>
            </footer>

            {/* SLIDE-OUT SHOPPING BAG */}
            {cartOpen && (
                <div className="cart-overlay" onClick={() => setCartOpen(false)}>
                    <aside
                        className="cart-drawer"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="cart-header">
                            <h3>Your Bag ({totalItems})</h3>
                            <button
                                className="close-btn"
                                onClick={() => setCartOpen(false)}
                            >
                                ✕
                            </button>
                        </div>

                        {checkedOut ? (
                            <div className="cart-empty">
                                <h4>Order Confirmed!</h4>
                                <p>
                                    Thank you for shopping with Prodigal$. Your
                                    pairs are being prepped for dispatch.
                                </p>
                                <button
                                    className="primary-btn"
                                    onClick={() => {
                                        setCheckedOut(false);
                                        setCartOpen(false);
                                    }}
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        ) : cart.length === 0 ? (
                            <div className="cart-empty">
                                <p>Your Prodigal$ bag is currently empty.</p>
                                <button
                                    className="secondary-btn"
                                    onClick={() => setCartOpen(false)}
                                >
                                    Browse Drops
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="cart-items">
                                    {cart.map((item, idx) => (
                                        <div
                                            key={`${item.id}-${item.size}`}
                                            className="cart-item"
                                        >
                                            <img src={item.image} alt={item.name} />
                                            <div className="cart-item-info">
                                                <h4>{item.name}</h4>
                                                <span>Size: {item.size}</span>
                                                <strong>
                                                    ${item.price * item.qty}
                                                </strong>
                                            </div>
                                            <div className="qty-controls">
                                                <button
                                                    onClick={() =>
                                                        updateQty(idx, -1)
                                                    }
                                                >
                                                    −
                                                </button>
                                                <span>{item.qty}</span>
                                                <button
                                                    onClick={() =>
                                                        updateQty(idx, 1)
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="cart-footer">
                                    <div className="cart-subtotal">
                                        <span>Subtotal</span>
                                        <strong>${subtotal} USD</strong>
                                    </div>
                                    <p className="cart-note">
                                        Free double-boxed express shipping included.
                                    </p>
                                    <button
                                        className="primary-btn checkout-btn"
                                        onClick={handleCheckout}
                                    >
                                        Checkout — ${subtotal}
                                    </button>
                                </div>
                            </>
                        )}
                    </aside>
                </div>
            )}
        </div>
    );
};

export default MainPage;