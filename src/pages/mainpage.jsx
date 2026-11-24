import { useEffect, useRef } from "react";
import "../style/mainpage.css";


const MainPage = () => {
    const trailRef = useRef([]);

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

                trailRef.current = trailRef.current.filter(
                    (item) => item !== particle
                );
            }, 600);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);

            trailRef.current.forEach((particle) => {
                particle.remove();
            });
        };
    }, []);

    return (
        <div className="portfolio">

            {/* NAVBAR */}
            <nav className="navbar">
                <div className="logo">
                    ABOUT<span>US.</span>
                </div>

                <div className="nav-links">
                    <a href="#home">Home</a>
                    <a href="#about">About Us</a>
                    <a href="#journey">Journey</a>
                    <a href="#media">Media</a>
                </div>
            </nav>


            {/* HERO SECTION */}
            <section className="hero" id="home">

                <div className="hero-content">

                    <p className="small-title">
                        WELCOME TO OUR PROFILE
                    </p>

                    <h1>
                        Hello, We're
                        <span> The Four of Us.</span>
                    </h1>

                    <p className="hero-description">
                        Four students from Davao City with different
                        personalities, experiences, and stories,
                        brought together through friendship, school,
                        and this class activity.
                    </p>

                    <div className="hero-buttons">
                        <a href="#about" className="primary-btn">
                            Explore Us →
                        </a>

                        <a href="#media" className="secondary-btn">
                            Watch Video
                        </a>
                    </div>

                </div>


                {/* PROFILE PHOTOS */}
                <div className="hero-profiles">

                    <div className="profile-photo photo-one">
                        <img
                            src="/images/cris.png"
                            alt="Cris Lourence Vale"
                        />
                    </div>

                    <div className="profile-photo photo-two">
                        <img
                            src="/images/edrian.png"
                            alt="Edrian Caburnay"
                        />
                    </div>

                    <div className="profile-photo photo-three">
                        <img
                            src="/images/neil.png"
                            alt="Neil Bryan Emmanuel A. Nana"
                        />
                    </div>

                    <div className="profile-photo photo-four">
                        <img
                            src="/images/nilrex.png"
                            alt="Nilrex P. Urquiza"
                        />
                    </div>

                    <div className="circle-decoration"></div>

                </div>

            </section>


            {/* ABOUT US */}
            <section className="section" id="about">

                <div className="section-heading">

                    <p>01 — ABOUT US</p>

                    <h2>
                        Four people.
                        <br />
                        Four stories.
                    </h2>

                </div>


                <div className="about-grid">

                    {/* CRIS */}
                    <div className="person-card">

                        <div className="person-image">

                            <img
                                src="/images/cris.png"
                                alt="Cris Lourence Vale"
                            />

                        </div>


                        <div className="person-info">

                            <span>01</span>

                            <h3>Cris Lourence Vale</h3>

                            <p className="role">
                                Student • 19 Years Old
                            </p>

                            <p>
                                Hi! I'm Cris Lourence Vale, a 19-year-old
                                student from Davao City. I am currently
                                studying at St. John Paul II College of
                                Davao. I enjoy learning new things,
                                exploring my interests, working on
                                creative projects, and creating meaningful
                                memories with the people around me.
                            </p>


                            <div className="facts">

                                <div>
                                    <strong>Age</strong>
                                    <span>19 Years Old</span>
                                </div>

                                <div>
                                    <strong>Location</strong>
                                    <span>Davao City</span>
                                </div>

                                <div>
                                    <strong>School</strong>
                                    <span>St. John Paul II College</span>
                                </div>

                            </div>

                        </div>

                    </div>


                    {/* EDRIAN */}
                    <div className="person-card reverse">

                        <div className="person-image">

                            <img
                                src="/images/edrian.png"
                                alt="Edrian Caburnay"
                            />

                        </div>


                        <div className="person-info">

                            <span>02</span>

                            <h3>Edrian Caburnay</h3>

                            <p className="role">
                                Student • 21 Years Old
                            </p>

                            <p>
                                Hi! I'm Edrian Caburnay, a 21-year-old
                                student from Davao City. I am currently
                                studying at St. John Paul II College of
                                Davao. I enjoy spending time with friends,
                                learning through new experiences, and
                                developing myself as I continue my
                                journey as a student.
                            </p>


                            <div className="facts">

                                <div>
                                    <strong>Age</strong>
                                    <span>21 Years Old</span>
                                </div>

                                <div>
                                    <strong>Location</strong>
                                    <span>Davao City</span>
                                </div>

                                <div>
                                    <strong>School</strong>
                                    <span>St. John Paul II College</span>
                                </div>

                            </div>

                        </div>

                    </div>


                    {/* NEIL */}
                    <div className="person-card">

                        <div className="person-image">

                            <img
                                src="/images/neil.png"
                                alt="Neil Bryan Emmanuel A. Nana"
                            />

                        </div>


                        <div className="person-info">

                            <span>03</span>

                            <h3>Neil Bryan Emmanuel A. Nana</h3>

                            <p className="role">
                                Student • 22 Years Old
                            </p>

                            <p>
                                Hi! I'm Neil Bryan Emmanuel A. Nana, a
                                22-year-old student from Davao City. I am
                                currently studying at St. John Paul II
                                College of Davao. I'm interested in
                                systems and figuring out how things work
                                under the hood, and I try to keep our
                                group on schedule.
                            </p>


                            <div className="facts">

                                <div>
                                    <strong>Age</strong>
                                    <span>22 Years Old</span>
                                </div>

                                <div>
                                    <strong>Location</strong>
                                    <span>Davao City</span>
                                </div>

                                <div>
                                    <strong>School</strong>
                                    <span>St. John Paul II College</span>
                                </div>

                            </div>

                        </div>

                    </div>


                    {/* NILREX */}
                    <div className="person-card reverse">

                        <div className="person-image">

                            <img
                                src="/images/nilrex.png"
                                alt="Nilrex P. Urquiza"
                            />

                        </div>


                        <div className="person-info">

                            <span>04</span>

                            <h3>Nilrex P. Urquiza</h3>

                            <p className="role">
                                Student • 21 Years Old
                            </p>

                            <p>
                                Hi! I'm Nilrex P. Urquiza, a 21-year-old
                                student from Davao City. I am currently
                                studying at St. John Paul II College of
                                Davao. I enjoy putting ideas into motion
                                and making sure everyone's work comes
                                together into one finished thing.
                            </p>


                            <div className="facts">

                                <div>
                                    <strong>Age</strong>
                                    <span>21 Years Old</span>
                                </div>

                                <div>
                                    <strong>Location</strong>
                                    <span>Davao City</span>
                                </div>

                                <div>
                                    <strong>School</strong>
                                    <span>St. John Paul II College</span>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* OUR JOURNEY */}
            <section className="journey section" id="journey">

                <div className="section-heading center">

                    <p>02 — OUR JOURNEY</p>

                    <h2>
                        Our story,
                        <br />
                        our experiences.
                    </h2>

                </div>


                <div className="timeline">

                    <div className="timeline-item">

                        <div className="timeline-number">
                            01
                        </div>

                        <div>

                            <span>THE BEGINNING</span>

                            <h3>
                                Meeting & Getting to Know Each Other
                            </h3>

                            <p>
                                As students, we met and gradually became
                                familiar with each other through school,
                                activities, and shared experiences.
                            </p>

                        </div>

                    </div>


                    <div className="timeline-item">

                        <div className="timeline-number">
                            02
                        </div>

                        <div>

                            <span>THE EXPERIENCE</span>

                            <h3>
                                Learning & Growing
                            </h3>

                            <p>
                                School gave us different challenges and
                                experiences that helped us become more
                                responsible, confident, and mature.
                            </p>

                        </div>

                    </div>


                    <div className="timeline-item">

                        <div className="timeline-number">
                            03
                        </div>

                        <div>

                            <span>TODAY</span>

                            <h3>
                                Continuing the Journey
                            </h3>

                            <p>
                                Today, we continue learning, improving
                                ourselves, building friendships, and
                                working toward our future goals.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* VIDEO SECTION */}
            <section className="section media-section" id="media">

                <div className="section-heading">

                    <p>03 — OUR STORY IN MOTION</p>

                    <h2>
                        Meet us
                        <br />
                        through video.
                    </h2>

                </div>


                <div className="video-container">

                    <video
                        controls
                        preload="metadata"
                        poster="/images/edrian.png"
                    >

                        <source
                            src="/videos/about-us2.mp4"
                            type="video/mp4"
                        />

                        Your browser does not support the video tag.

                    </video>


                  

                </div>

            </section>


            {/* FUN FACTS */}
            <section className="facts-section section">

                <div className="section-heading center">

                    <p>04 — GET TO KNOW US</p>

                    <h2>
                        More than just
                        <br />
                        students.
                    </h2>

                </div>


                <div className="fact-grid">

                    <div className="fact-card">

                        <span>01</span>

                        <h3>
                            Location
                        </h3>

                        <p>
                            We are all from Davao City,
                            Philippines.
                        </p>

                    </div>


                    <div className="fact-card">

                        <span>02</span>

                        <h3>
                            School
                        </h3>

                        <p>
                            We are all students of
                            St. John Paul II College of Davao.
                        </p>

                    </div>


                    <div className="fact-card">

                        <span>03</span>

                        <h3>
                            Friendship
                        </h3>

                        <p>
                            Different personalities and experiences
                            can create meaningful friendships.
                        </p>

                    </div>


                    <div className="fact-card">

                        <span>04</span>

                        <h3>
                            Our Goal
                        </h3>

                        <p>
                            To continue learning, growing, and
                            building a successful future.
                        </p>

                    </div>

                </div>

            </section>


            {/* FOOTER */}
            <footer>

                <div className="footer-title">

                    <p>
                        THANK YOU FOR VISITING
                    </p>

                    <h2>
                        This is
                        <span> our story.</span>
                    </h2>

                </div>


                <div className="footer-bottom">

                    <span>
                        © 2026 Vale, Caburnay, Nana & Urquiza
                    </span>

                    <span>
                        St. John Paul II College of Davao
                    </span>

                </div>

            </footer>

        </div>
    );
};

export default MainPage;