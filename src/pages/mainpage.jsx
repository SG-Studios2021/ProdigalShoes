import { useEffect, useRef, useState } from "react";
import { SHOES } from "../data/shoes";
import "../style/mainpage.css";

const formatPHP = (amount) => `₱${Number(amount).toLocaleString("en-PH")}`;

const MainPage = () => {
    const trailRef = useRef([]);
    const [activeFilter, setActiveFilter] = useState("All");

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

    // Automatically builds filter tabs from whatever categories you put in src/data/shoes.js
    const categories = ["All", ...new Set(SHOES.map((shoe) => shoe.category))];

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
                    <a href="#drops">On-Hand Pairs</a>
                    <a href="#how-to-buy">How to Buy</a>
                    <a href="#lookbook">Showcase</a>
                </div>

                <a
                    href="https://www.facebook.com/marketplace/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cart-trigger"
                >
                    FB Marketplace ↗
                </a>
            </nav>

            {/* HERO SECTION (LOGO ONLY ON RIGHT) */}
            <section className="hero" id="home">
                <div className="hero-content">
                    <p className="small-title">DAVAO CITY • CURATED SNEAKER RESELLER</p>

                    <h1>
                        Authentic Pairs.
                        <span> Prodigal$.</span>
                    </h1>

                    <p className="hero-description">
                        100% legit-checked, on-hand sneakers ready for same-day
                        Davao meetup or nationwide shipping. Browse available
                        sizes below and message us directly on Facebook
                        Marketplace to lock in your pair.
                    </p>

                    <div className="hero-buttons">
                        <a href="#drops" className="primary-btn">
                            Browse On-Hand Pairs →
                        </a>

                        <a href="#how-to-buy" className="secondary-btn">
                            How to Order
                        </a>
                    </div>
                </div>

                {/* HERO LOGO SHOWCASE */}
                <div className="hero-profiles hero-logo-only">
                    <div className="hero-logo-orb">
                        <img
                            src="/images/logoprodigal.png"
                            alt="Prodigal$ Official Logo"
                        />
                    </div>
                    <div className="circle-decoration"></div>
                </div>
            </section>

            {/* ON-HAND SHOES */}
            <section className="section" id="drops">
                <div className="section-heading">
                    <p>01 — ON-HAND INVENTORY</p>
                    <h2>
                        Legit checked.
                        <br />
                        Ready to ship.
                    </h2>
                </div>

                <div className="filter-bar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            className={`filter-pill ${
                                activeFilter === cat ? "active" : ""
                            }`}
                            onClick={() => setActiveFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="about-grid">
                    {visibleShoes.map((shoe, idx) => (
                        <div
                            key={shoe.id}
                            className={`person-card ${idx % 2 === 1 ? "reverse" : ""}`}
                        >
                            <div className="person-image">
                                <span className="price-badge">
                                    {formatPHP(shoe.price)}
                                </span>
                                <img src={shoe.image} alt={shoe.name} />
                            </div>

                            <div className="person-info">
                                <span>
                                    {String(idx + 1).padStart(2, "0")} •{" "}
                                    {shoe.category.toUpperCase()}
                                </span>

                                <h3>{shoe.name}</h3>

                                <p className="role">
                                    {formatPHP(shoe.price)} • {shoe.condition}
                                </p>

                                <p>{shoe.description}</p>

                                <div className="facts">
                                    <div>
                                        <strong>Size Available</strong>
                                        <span className="size-highlight">
                                            {shoe.sizeAvailable}
                                        </span>
                                    </div>

                                    <div>
                                        <strong>Colorway</strong>
                                        <span>{shoe.colorway}</span>
                                    </div>

                                    <div>
                                        <strong>Condition</strong>
                                        <span>{shoe.condition}</span>
                                    </div>
                                </div>

                                <div className="shop-actions">
                                    <a
                                        href={shoe.fbMarketplaceUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="primary-btn"
                                    >
                                        Buy Now on Facebook Marketplace ↗
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* HOW TO BUY */}
            <section className="journey section" id="how-to-buy">
                <div className="section-heading center">
                    <p>02 — HOW TO ORDER</p>
                    <h2>
                        Fast, legit,
                        <br />
                        and hassle-free.
                    </h2>
                </div>

                <div className="timeline">
                    <div className="timeline-item">
                        <div className="timeline-number">01</div>
                        <div>
                            <span>CHECK ON-HAND STOCK</span>
                            <h3>Pick Your Pair & Verify Size</h3>
                            <p>
                                Since we operate as a curated reseller, each
                                listing shows the exact on-hand size and
                                condition available.
                            </p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-number">02</div>
                        <div>
                            <span>MESSAGE ON FACEBOOK</span>
                            <h3>Tap “Buy Now” to Open Marketplace</h3>
                            <p>
                                Clicking Buy Now takes you straight to that
                                pair’s Facebook Marketplace listing where you can
                                request detailed photos, legit-check tags, or
                                reserve the item.
                            </p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-number">03</div>
                        <div>
                            <span>MEETUP OR SHIPPING</span>
                            <h3>Davao Meetup or Nationwide Courier</h3>
                            <p>
                                Pay via GCash, Maya, Bank Transfer, or Cash on
                                Meetup around Davao City. Nationwide orders ship
                                double-boxed via LBC or J&T.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SHOWCASE VIDEO */}
            <section className="section media-section" id="lookbook">
                <div className="section-heading">
                    <p>03 — CLOSER LOOK</p>
                    <h2>
                        Prodigal$
                        <br />
                        pair check.
                    </h2>
                </div>

                <div className="video-container">
                    <iframe
                        src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
                            "https://www.facebook.com/reel/1169239329405209"
                        )}&show_text=false&t=0`}
                        title="Prodigal$ Facebook Video Showcase"
                        style={{
                            width: "100%",
                            height: "100%",
                            border: "none",
                            overflow: "hidden",
                        }}
                        scrolling="no"
                        frameBorder="0"
                        allowFullScreen={true}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    />

                    <div className="video-label">
                        <span>●</span> FILM SHOECASING THE SHOES IN OUR INVENTORY!
                    </div>
                </div>
            </section>

            {/* STORE GUARANTEES */}
            <section className="facts-section section">
                <div className="section-heading center">
                    <p>04 — WHY BUY FROM PRODIGAL$</p>
                    <h2>
                        Trusted local
                        <br />
                        sneaker plug.
                    </h2>
                </div>

                <div className="fact-grid">
                    <div className="fact-card">
                        <span>01</span>
                        <h3>100% Authentic</h3>
                        <p>
                            Every pair undergoes multi-point legit checking
                            before it ever hits our inventory.
                        </p>
                    </div>

                    <div className="fact-card">
                        <span>02</span>
                        <h3>On-Hand Pairs</h3>
                        <p>
                            No long pre-order waits—if it’s listed with a size,
                            it’s physically on hand and ready.
                        </p>
                    </div>

                    <div className="fact-card">
                        <span>03</span>
                        <h3>Davao Meetups</h3>
                        <p>
                            Inspect the pair in person at convenient Davao City
                            meetup spots or book instant rider delivery.
                        </p>
                    </div>

                    <div className="fact-card">
                        <span>04</span>
                        <h3>Nationwide Shipping</h3>
                        <p>
                            Bubble-wrapped and double-boxed shipping anywhere in
                            the Philippines with tracking.
                        </p>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer>
                <div className="footer-title">
                    <p>LOCK IN YOUR PAIR</p>
                    <h2>
                        Step with
                        <span> Prodigal$.</span>
                    </h2>
                </div>

                <div className="footer-bottom">
                    <span>© 2026 Prodigal$ Sneaker Resell PH.</span>
                    <span>Davao City • Philippines</span>
                </div>
            </footer>
        </div>
    );
};

export default MainPage;