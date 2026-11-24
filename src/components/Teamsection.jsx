import { useEffect, useRef, useState } from "react";

/* Photos live in public/images. Change a name or ID here if needed. */
const TEAM = [
    { name: "Cris Lourence Vale", id: "20241779", img: "/images/cris.png" },
    { name: "Nilrex Urquiza", id: "20241930", img: "/images/nilrex.png" },
    { name: "Edrian Caburnay", id: "20242008", img: "/images/edrian.png" },
    { name: "Niel Bryan Nana", id: "20230525", img: "/images/neil.png" },
];

const initials = (name) =>
    name.split(" ").filter(Boolean).map((w) => w[0]).slice(0, 2).join("");

const MemberCard = ({ m, i }) => {
    const [broken, setBroken] = useState(false);
    const ref = useRef(null);

    /* spotlight follows the cursor and the card tilts slightly toward it */
    const onMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
        el.style.setProperty("--ry", `${((x - 0.5) * 10).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${((0.5 - y) * 10).toFixed(2)}deg`);
    };
    const onLeave = () => {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
    };

    return (
        <article
            className="gv-member"
            ref={ref}
            style={{ "--d": `${i * 110}ms` }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
        >
            <div className="gv-member-photo">
                {broken ? (
                    <div className="gv-member-fallback" aria-hidden="true">{initials(m.name)}</div>
                ) : (
                    <img
                        src={m.img}
                        alt={`Photo of ${m.name}`}
                        loading="lazy"
                        onError={() => setBroken(true)}
                    />
                )}
                <span className="gv-member-glow" aria-hidden="true" />
                <span className="gv-member-no" aria-hidden="true">0{i + 1}</span>
            </div>
            <div className="gv-member-info">
                <h3>{m.name}</h3>
                <p className="gv-member-id">
                    <span>STUDENT ID</span> {m.id}
                </p>
            </div>
        </article>
    );
};

const TeamSection = () => {
    const ref = useRef(null);
    const [shown, setShown] = useState(false);

    /* cards rise in when the section scrolls into view */
    useEffect(() => {
        const el = ref.current;
        if (!el || typeof IntersectionObserver === "undefined") { setShown(true); return; }
        const io = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setShown(true); io.disconnect(); } },
            { threshold: 0.15 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <section className={`gv-section gv-alt gv-team${shown ? " in" : ""}`} id="team" ref={ref}>
            <div className="gv-heading">
                <p>04 — THE TEAM</p>
                <h2>
                    The people
                    <br />
                    behind GradeView.
                </h2>
            </div>
            <p className="gv-team-sub">
                Built by four students of St. John Paul II College of Davao.
            </p>
            <div className="gv-team-grid">
                {TEAM.map((m, i) => (
                    <MemberCard m={m} i={i} key={m.id} />
                ))}
            </div>
        </section>
    );
};

export default TeamSection;