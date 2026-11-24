import { useMemo, useState } from "react";
import "../style/Gradepage.css";
import CursorTrail from "../components/cursortrail";
import TeamSection from "../components/teamsection";
import { AccountPanel, ForgotPassword, VerifyEmailModal, maskEmail } from "../components/accountsecurity";

/* ---------- SAMPLE DATA (replace with real data later) ---------- */
/* Every student takes the same subjects, but each has their own scores. */
const SUBJECTS = {
    "1st Semester": [
        ["IT101", "Introduction to Computing", 3],
        ["CC102", "Computer Programming 1", 3],
        ["MATH101", "Discrete Mathematics", 3],
        ["NSTP1", "National Service Training", 3],
        ["GE101", "Mathematics in the Modern World", 3],
    ],
    "2nd Semester": [
        ["CC103", "Computer Programming 2", 3],
        ["CC104", "Data Structures and Algorithms", 3],
        ["IT105", "Web Systems and Technologies", 3],
        ["PE102", "Physical Education 2", 2],
        ["GE104", "Understanding the Self", 3],
    ],
};

/* scores are [attendance, midterm, final], in the same order as SUBJECTS */
const makeGrades = (scores) =>
    Object.fromEntries(
        Object.entries(SUBJECTS).map(([sem, list]) => [
            sem,
            list.map(([code, name, units], i) => ({
                code, name, units,
                att: scores[sem][i][0], mid: scores[sem][i][1], fin: scores[sem][i][2],
            })),
        ])
    );

const STUDENTS = {
    /* 1 failed subject (GE101) */
    "20241779": {
        photo: "/images/cris.png",
        name: "Cris Lourence Vale",
        grades: makeGrades({
            "1st Semester": [[98, 90, 92], [95, 88, 91], [90, 82, 85], [100, 94, 96], [80, 68, 66]],
            "2nd Semester": [[96, 91, 93], [94, 86, 89], [100, 95, 97], [92, 82, 84], [85, 80, 82]],
        }),
    },
    /* 3 failed subjects (IT101, MATH101, CC104) */
    "20241930": {
        photo: "/images/nilrex.png",
        name: "Nilrex Urquiza",
        grades: makeGrades({
            "1st Semester": [[88, 72, 74], [84, 76, 79], [75, 65, 68], [95, 88, 90], [86, 78, 80]],
            "2nd Semester": [[82, 74, 77], [78, 66, 69], [90, 82, 85], [88, 80, 82], [84, 77, 79]],
        }),
    },
    /* 2 failed subjects (CC102, GE104) */
    "20242008": {
        photo: "/images/edrian.png",
        name: "Edrian Caburnay",
        grades: makeGrades({
            "1st Semester": [[92, 85, 88], [85, 70, 72], [88, 79, 81], [98, 90, 93], [84, 80, 82]],
            "2nd Semester": [[90, 83, 85], [80, 76, 78], [93, 86, 88], [85, 78, 80], [78, 68, 70]],
        }),
    },
    /* 1 failed subject (CC104) */
    "20230525": {
        photo: "/images/neil.png",
        name: "Niel Bryan Nana",
        grades: makeGrades({
            "1st Semester": [[90, 82, 85], [88, 80, 83], [85, 78, 80], [96, 88, 90], [92, 84, 86]],
            "2nd Semester": [[86, 79, 81], [82, 72, 74], [95, 88, 90], [90, 80, 83], [88, 81, 84]],
        }),
    },
};

/* Demo only. A real system checks a hashed password on the server. */
const DEMO_PASSWORD = "12345678";

/* Saved email is remembered in this browser (design demo, nothing is really sent) */
const loadAccount = (id) => {
    try { return JSON.parse(localStorage.getItem(`gv-account-${id}`)) || {}; } catch { return {}; }
};
const storeAccount = (id, data) => {
    try { localStorage.setItem(`gv-account-${id}`, JSON.stringify(data)); } catch { /* storage unavailable */ }
};

/* Sample computation only. Confirm your school's grading policy. */
const average = (s) => Math.round((s.att * 0.1 + s.mid * 0.4 + s.fin * 0.5) * 10) / 10;
const points = (avg) => (avg >= 90 ? 4.0 : avg >= 85 ? 3.5 : avg >= 80 ? 3.0 : avg >= 75 ? 2.0 : 0);
const passed = (s) => average(s) >= 75;

const gpaOf = (list) => {
    const units = list.reduce((a, s) => a + s.units, 0);
    if (!units) return 0;
    return list.reduce((a, s) => a + points(average(s)) * s.units, 0) / units;
};

const FEATURES = [
    { n: "01", t: "Secure Log-in", d: "Students sign in with their student ID and password. No valid credentials, no access." },
    { n: "02", t: "Grades Per Subject", d: "Attendance, midterm, final exam, and overall average for every subject, per semester." },
    { n: "03", t: "GPA & Credits", d: "Cumulative GPA and total completed credits, all in one dashboard." },
    { n: "04", t: "Own Records Only", d: "A student can only ever see his or her own grades. Nobody else's." },
];

const STEPS = [
    { t: "Log in", d: "Enter your student ID and password on the student portal." },
    { t: "Pick a semester", d: "Switch between semesters with a single click." },
    { t: "View your grades", d: "See your subject grades, GPA, and credits instantly, anytime and anywhere." },
];

/* Logo shown inside a fixed-size frame so it never grows past the frame */
const LogoFrame = ({ size = "sm" }) => (
    <span className={`gv-logo-frame ${size}`}>
        <img src="/images/logo.png" alt="St. John Paul II College of Davao seal" />
    </span>
);

/* Round photo of the signed-in student; shows initials if the image is missing */
const Avatar = ({ name, src }) => {
    const [broken, setBroken] = useState(false);
    const initials = name.split(" ").filter(Boolean).map((w) => w[0]).slice(0, 2).join("");
    return (
        <span className="gv-avatar">
            {broken ? (
                <b aria-hidden="true">{initials}</b>
            ) : (
                <img src={src} alt={`Photo of ${name}`} onError={() => setBroken(true)} />
            )}
        </span>
    );
};

const GradePage = () => {
    const [user, setUser] = useState(null);
    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [semester, setSemester] = useState("1st Semester");
    const [view, setView] = useState("grades"); // "grades" | "overview" | "account"
    const [passwords, setPasswords] = useState({}); // changed passwords, kept for this page session only
    const [account, setAccount] = useState({});    // { email, verified }
    const [showVerify, setShowVerify] = useState(false);
    const [authView, setAuthView] = useState("login"); // "login" | "forgot"
    const [pendingLogin, setPendingLogin] = useState(null); // { id, acc } while the login code is asked
    const [notice, setNotice] = useState("");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const handleLogin = (e) => {
        e.preventDefault();
        if (!studentId.trim() || !password.trim()) {
            setError("Please enter your student ID and password.");
            return;
        }
        const id = studentId.trim();
        /* one generic message so the form never reveals which part was wrong */
        if (!STUDENTS[id] || password !== (passwords[id] ?? DEMO_PASSWORD)) {
            setError("Incorrect student ID or password.");
            return;
        }
        const acc = loadAccount(id);
        setError("");
        setNotice("");
        if (acc.email) {
            setPendingLogin({ id, acc }); // password was right: ask for the emailed code before signing in
            return;
        }
        finishLogin(id, acc);
    };

    const finishLogin = (id, acc) => {
        setUser(id);
        setPassword("");
        setAccount(acc);
        setShowVerify(false);
        setPendingLogin(null);
    };

    const loginCodeAccepted = () => {
        const acc = { ...pendingLogin.acc, verified: true }; // entering the code also verifies the email
        storeAccount(pendingLogin.id, acc);
        finishLogin(pendingLogin.id, acc);
    };

    const lookupEmail = (id) => (STUDENTS[id] ? loadAccount(id).email : undefined);

    const resetPassword = (id, next) => {
        if (STUDENTS[id]) setPasswords((p) => ({ ...p, [id]: next }));
        setStudentId(STUDENTS[id] ? id : "");
        setPassword("");
        setError("");
        setNotice("Password reset. Log in with your new password.");
        setAuthView("login");
    };

    const saveEmail = (email) => {
        const acc = { email, verified: false };
        setAccount(acc); storeAccount(user, acc);
    };
    const removeEmail = () => { setAccount({}); storeAccount(user, {}); };
    const markVerified = () => {
        const acc = { ...account, verified: true };
        setAccount(acc); storeAccount(user, acc); setShowVerify(false);
    };
    const changePassword = (current, next) => {
        if (current !== (passwords[user] ?? DEMO_PASSWORD)) return { ok: false, error: "Current password is incorrect." };
        setPasswords((p) => ({ ...p, [user]: next }));
        return { ok: true };
    };

    const handleLogout = () => {
        setUser(null);
        setStudentId("");
        setSemester("1st Semester");
        setView("grades");
        setSearch("");
        setFilter("All");
        setAccount({});
        setShowVerify(false);
    };

    const student = user ? STUDENTS[user] : null;
    const grades = student ? student.grades : {};
    const subjects = grades[semester] || [];
    const all = Object.values(grades).flat();

    const visible = useMemo(() => {
        const term = search.trim().toLowerCase();
        return subjects.filter((s) => {
            const matchesSearch =
                s.code.toLowerCase().includes(term) || s.name.toLowerCase().includes(term);
            const matchesFilter =
                filter === "All" ||
                (filter === "Passed" && passed(s)) ||
                (filter === "Failed" && !passed(s));
            return matchesSearch && matchesFilter;
        });
    }, [subjects, search, filter]);

    const semGpa = gpaOf(subjects);
    const cumGpa = gpaOf(all);
    const credits = all.filter(passed).reduce((a, s) => a + s.units, 0);
    const passedCount = all.filter(passed).length;
    const failedCount = all.length - passedCount;

    const exportCSV = () => {
        const q = (v) => `"${String(v).replace(/"/g, '""')}"`;
        const rows = [
            ["Subject Code", "Subject Name", "Units", "Attendance", "Midterm", "Final", "Average", "Status"],
            ...visible.map((s) => [
                s.code, s.name, s.units, `${s.att}%`, s.mid, s.fin, average(s),
                passed(s) ? "Passed" : "Failed",
            ]),
        ];
        const csv = rows.map((r) => r.map(q).join(",")).join("\r\n");
        const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `GradeView-${user}-${semester.replaceAll(" ", "-")}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="gv">
            <CursorTrail />

            {/* NAVBAR */}
            <nav className="gv-nav">
                <div className="gv-logo">
                    <LogoFrame size="sm" />
                    <span>
                        GRADE<em className="gv-logo-accent">VIEW.</em>
                    </span>
                </div>
                <div className="gv-links">
                    <a href="#home">Home</a>
                    <a href="#features">Features</a>
                    <a href="#portal">Portal</a>
                    <a href="#how">How It Works</a>
                <a href="#team">Team</a>
                </div>
            </nav>

            {/* HERO */}
            <section className="gv-hero" id="home">
                <div className="gv-hero-text">
                    <p className="gv-small">ST. JOHN PAUL II COLLEGE OF DAVAO</p>
                    <h1>
                        Your grades,
                        <span> one log-in away.</span>
                    </h1>
                    <p className="gv-desc">
                        The Online Grade Viewing System lets students check their
                        grades securely, anytime and anywhere. No long lines at the
                        registrar. No lost printed copies.
                    </p>
                    <div className="gv-buttons">
                        <a href="#portal" className="gv-primary">Open Student Portal →</a>
                        <a href="#features" className="gv-secondary">See Features</a>
                    </div>
                </div>

                <div className="gv-hero-visual">
                    <div className="gv-circle" />
                    <div className="gv-seal-wrap">
                        <LogoFrame size="xl" />
                    </div>
                    <div className="gv-glass gv-card-a">
                        <span>Sample GPA</span>
                        <strong>3.50</strong>
                    </div>
                    <div className="gv-glass gv-card-b">
                        <span>Sample Credits</span>
                        <strong>24</strong>
                    </div>
                    <div className="gv-glass gv-card-c">
                        <span>IT105 · Web Systems</span>
                        <div className="gv-bar"><i style={{ width: "96%" }} /></div>
                        <strong>96.2</strong>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="gv-section" id="features">
                <div className="gv-heading">
                    <p>01 — FEATURES</p>
                    <h2>
                        Only what matters.
                        <br />
                        Grade viewing.
                    </h2>
                </div>
                <div className="gv-grid">
                    {FEATURES.map((f) => (
                        <div className="gv-feature" key={f.n}>
                            <span>{f.n}</span>
                            <h3>{f.t}</h3>
                            <p>{f.d}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* PORTAL DEMO */}
            <section className="gv-section gv-alt" id="portal">
                <div className="gv-heading gv-center">
                    <p>02 — STUDENT PORTAL (DEMO)</p>
                    <h2>
                        Try it.
                        <br />
                        Log in below.
                    </h2>
                </div>

                <div className="gv-portal">
                    {!user ? (
                        authView === "forgot" ? (
                            <ForgotPassword
                                lookupEmail={lookupEmail}
                                onBack={() => setAuthView("login")}
                                onReset={resetPassword}
                            />
                        ) : (
                        <>
                        <form className="gv-login" onSubmit={handleLogin}>
                            <LogoFrame size="md" />
                            <h3>Student Log-in</h3>
                            <p>Demo only: use a student ID from the team section below. The password for everyone is 12345678.</p>

                            <label htmlFor="sid">Student ID</label>
                            <input
                                id="sid"
                                type="text"
                                autoComplete="username"
                                placeholder="e.g. 2026-00123"
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                            />

                            <label htmlFor="pw">Password</label>
                            <input
                                id="pw"
                                type="password"
                                autoComplete="current-password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button type="button" className="gv-link gv-forgot" onClick={() => { setAuthView("forgot"); setError(""); setNotice(""); }}>
                                Forgot password?
                            </button>

                            {notice && <div className="gv-notice" role="status">{notice}</div>}
                            {error && <div className="gv-error" role="alert">{error}</div>}

                            <button type="submit" className="gv-primary gv-full">
                                Log In
                            </button>
                        </form>
                        {pendingLogin && (
                            <VerifyEmailModal
                                target={maskEmail(pendingLogin.acc.email)}
                                title="Verify it's you"
                                closeLabel="Cancel"
                                doneTitle="Verified"
                                doneText="Signing you in..."
                                onVerified={loginCodeAccepted}
                                onClose={() => { setPendingLogin(null); setPassword(""); }}
                            />
                        )}
                        </>
                        )
                    ) : (
                        <div className="gv-dash">
                            <div className="gv-dash-top">
                                <div className="gv-dash-id">
                                    <LogoFrame size="md" />
                                    <Avatar name={student.name} src={student.photo} />
                                    <div className="gv-profile">
                                        <h4>{student.name}</h4>
                                        <p className="gv-small">STUDENT ID: {user}</p>
                                        <div className="gv-chips">
                                            <span className="gv-chip ok"><b>{passedCount}</b> Passed</span>
                                            <span className="gv-chip bad"><b>{failedCount}</b> Failed</span>
                                            <button type="button" className={`gv-chip gv-chip-mail${account.verified ? " ok" : ""}`} onClick={() => setView("account")}>
                                                {account.email ? (account.verified ? "✓ Email verified" : "✉ Email pending") : "+ Add email"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button className="gv-secondary" onClick={handleLogout}>
                                    Log Out
                                </button>
                            </div>

                            <h3 className="gv-view-title">
                                {view === "grades" ? "Academic Grades" : view === "overview" ? "Academic Overview" : "Account Settings"}
                            </h3>

                            {/* PAGE SWITCH */}
                            <div className="gv-pages" role="group" aria-label="Portal pages">
                                <button
                                    className={view === "grades" ? "active" : ""}
                                    aria-pressed={view === "grades"}
                                    onClick={() => setView("grades")}
                                >
                                    Academic Grades
                                </button>
                                <button
                                    className={view === "overview" ? "active" : ""}
                                    aria-pressed={view === "overview"}
                                    onClick={() => setView("overview")}
                                >
                                    Academic Overview
                                </button>
                                <button
                                    className={view === "account" ? "active" : ""}
                                    aria-pressed={view === "account"}
                                    onClick={() => setView("account")}
                                >
                                    Account
                                </button>
                            </div>

                            {view === "grades" ? (
                                <>
                                    <div className="gv-tabs">
                                        {Object.keys(grades).map((sem) => (
                                            <button
                                                key={sem}
                                                className={sem === semester ? "active" : ""}
                                                aria-pressed={sem === semester}
                                                onClick={() => setSemester(sem)}
                                            >
                                                {sem}
                                            </button>
                                        ))}
                                    </div>

                                    {/* SEARCH + FILTER + EXPORT */}
                                    <div className="gv-controls">
                                        <div className="gv-search">
                                            <span aria-hidden="true">⌕</span>
                                            <input
                                                type="search"
                                                aria-label="Search subjects"
                                                placeholder="Search subject code or name..."
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                        </div>
                                        <select
                                            aria-label="Filter by status"
                                            value={filter}
                                            onChange={(e) => setFilter(e.target.value)}
                                        >
                                            <option value="All">All statuses</option>
                                            <option value="Passed">Passed</option>
                                            <option value="Failed">Failed</option>
                                        </select>
                                        <button className="gv-secondary gv-export" onClick={exportCSV}>
                                            ↓ Export CSV
                                        </button>
                                    </div>

                                    <div className="gv-table-wrap">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Subject</th>
                                                    <th>Units</th>
                                                    <th>Attendance</th>
                                                    <th>Midterm</th>
                                                    <th>Final</th>
                                                    <th>Average</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {visible.map((s) => (
                                                    <tr key={s.code}>
                                                        <td>
                                                            <b>{s.code}</b>
                                                            <small>{s.name}</small>
                                                        </td>
                                                        <td>{s.units}</td>
                                                        <td>{s.att}%</td>
                                                        <td>{s.mid}</td>
                                                        <td>{s.fin}</td>
                                                        <td className="gv-avg">{average(s).toFixed(1)}</td>
                                                        <td>
                                                            <em className={passed(s) ? "ok" : "bad"}>
                                                                {passed(s) ? "Passed" : "Failed"}
                                                            </em>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {visible.length === 0 && (
                                                    <tr>
                                                        <td colSpan="7" className="gv-empty">
                                                            <strong>No subjects found</strong>
                                                            <small>Try another search or change the status filter.</small>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    <p className="gv-count">
                                        Showing {visible.length} of {subjects.length} subjects
                                    </p>

                                    <div className="gv-summary">
                                        <div><span>Semester GPA</span><strong>{semGpa.toFixed(2)}</strong></div>
                                        <div><span>Cumulative GPA</span><strong>{cumGpa.toFixed(2)}</strong></div>
                                        <div><span>Completed Credits</span><strong>{credits}</strong></div>
                                    </div>
                                </>
                            ) : view === "account" ? (
                                <AccountPanel
                                    account={account}
                                    onSaveEmail={saveEmail}
                                    onRemoveEmail={removeEmail}
                                    onOpenVerify={() => setShowVerify(true)}
                                    onChangePassword={changePassword}
                                />
                            ) : (
                                <>
                                    <div className="gv-summary gv-summary-4">
                                        <div><span>Total Subjects</span><strong>{all.length}</strong></div>
                                        <div><span>Passed</span><strong>{passedCount}</strong></div>
                                        <div><span>Failed</span><strong>{failedCount}</strong></div>
                                        <div><span>Cumulative GPA</span><strong>{cumGpa.toFixed(2)}</strong></div>
                                    </div>

                                    <div className="gv-table-wrap gv-overview-table">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Semester</th>
                                                    <th>Subjects</th>
                                                    <th>Units passed</th>
                                                    <th>Average</th>
                                                    <th>GPA</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.entries(grades).map(([sem, list]) => (
                                                    <tr key={sem}>
                                                        <td><b>{sem}</b></td>
                                                        <td>{list.length}</td>
                                                        <td>{list.filter(passed).reduce((a, s) => a + s.units, 0)}</td>
                                                        <td className="gv-avg">
                                                            {(list.reduce((a, s) => a + average(s), 0) / list.length).toFixed(1)}
                                                        </td>
                                                        <td className="gv-avg">{gpaOf(list).toFixed(2)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <button className="gv-primary gv-overview-btn" onClick={() => setView("grades")}>
                                        View Subject Grades →
                                    </button>
                                </>
                            )}

                            {showVerify && account.email && (
                                <VerifyEmailModal
                                    email={account.email}
                                    onVerified={markVerified}
                                    onClose={() => setShowVerify(false)}
                                />
                            )}

                            <p className="gv-disclaimer">
                                Demo data only. Grades and GPA are illustrative and must be
                                verified against official school grading policies.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="gv-section" id="how">
                <div className="gv-heading">
                    <p>03 — HOW IT WORKS</p>
                    <h2>
                        Three steps.
                        <br />
                        That's it.
                    </h2>
                </div>
                <div className="gv-steps">
                    {STEPS.map((s, i) => (
                        <div className="gv-step" key={s.t}>
                            <div className="gv-num">0{i + 1}</div>
                            <div>
                                <h3>{s.t}</h3>
                                <p>{s.d}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* TEAM */}
            <TeamSection />

            {/* FOOTER */}
            <footer className="gv-footer">
                <p className="gv-small">ONLINE GRADE VIEWING SYSTEM</p>
                <h2>
                    Faster. Safer.
                    <span> Clearer.</span>
                </h2>
                <div className="gv-bottom">
                    <span>© 2026 Vale, Caburnay, Nana & Urquiza</span>
                    <span>St. John Paul II College of Davao</span>
                </div>
            </footer>
        </div>
    );
};

export default GradePage;