import { useEffect, useRef, useState } from "react";

/* ---------- small helpers ---------- */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const maskEmail = (email) => {
    const [user = "", domain = ""] = String(email).split("@");
    return `${user.slice(0, 2)}${"*".repeat(Math.max(user.length - 2, 3))}@${domain}`;
};

/* 0 to 4 */
const strengthOf = (pw) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
    if (/\d/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw) || pw.length >= 12) s++;
    return s;
};
const STRENGTH = ["Too short", "Weak", "Fair", "Good", "Strong"];

export const PasswordField = ({ id, label, value, onChange, autoComplete }) => {
    const [show, setShow] = useState(false);
    return (
        <div className="gv-field">
            <label htmlFor={id}>{label}</label>
            <div className="gv-pw">
                <input
                    id={id}
                    type={show ? "text" : "password"}
                    value={value}
                    autoComplete={autoComplete}
                    onChange={(e) => onChange(e.target.value)}
                />
                <button type="button" onClick={() => setShow((v) => !v)} aria-label={show ? "Hide password" : "Show password"}>
                    {show ? "Hide" : "Show"}
                </button>
            </div>
        </div>
    );
};

export const StrengthMeter = ({ value }) => {
    const score = strengthOf(value);
    return (
        <div className="gv-meter" aria-hidden={!value}>
            {[1, 2, 3, 4].map((n) => (
                <i key={n} className={value && score >= n ? `on s${score}` : ""} />
            ))}
            <span>{value ? STRENGTH[score] : ""}</span>
        </div>
    );
};

/* ---------- Account page: change password + email ---------- */
export const AccountPanel = ({ account, onSaveEmail, onRemoveEmail, onOpenVerify, onChangePassword }) => {
    /* change password */
    const [cur, setCur] = useState("");
    const [next, setNext] = useState("");
    const [again, setAgain] = useState("");
    const [pwMsg, setPwMsg] = useState(null); // {type, text}

    /* email */
    const [email, setEmail] = useState("");
    const [emailMsg, setEmailMsg] = useState(null);
    const [editing, setEditing] = useState(!account.email);

    const submitPassword = (e) => {
        e.preventDefault();
        if (!cur || !next || !again) return setPwMsg({ type: "bad", text: "Please fill in all three fields." });
        if (next.length < 8) return setPwMsg({ type: "bad", text: "New password must be at least 8 characters." });
        if (next === cur) return setPwMsg({ type: "bad", text: "New password must be different from the current one." });
        if (next !== again) return setPwMsg({ type: "bad", text: "New password and confirmation do not match." });
        const result = onChangePassword(cur, next);
        if (!result.ok) return setPwMsg({ type: "bad", text: result.error });
        setCur(""); setNext(""); setAgain("");
        setPwMsg({ type: "ok", text: "Password updated. Use your new password the next time you log in." });
    };

    const submitEmail = (e) => {
        e.preventDefault();
        const v = email.trim();
        if (!EMAIL_RE.test(v)) return setEmailMsg({ type: "bad", text: "Enter a valid email address." });
        onSaveEmail(v);
        setEmail(""); setEditing(false);
        setEmailMsg({ type: "ok", text: "Email saved. We'll ask you to verify it the next time you log in." });
    };

    return (
        <div className="gv-account">
            {/* CHANGE PASSWORD */}
            <form className="gv-acard" onSubmit={submitPassword} noValidate>
                <span className="gv-acard-ico" aria-hidden="true">🔒</span>
                <h4>Change password</h4>
                <p className="gv-acard-sub">Use at least 8 characters. Mix upper and lower case letters, numbers, and symbols.</p>

                <PasswordField id="pw-cur" label="Current password" value={cur} onChange={setCur} autoComplete="current-password" />
                <PasswordField id="pw-new" label="New password" value={next} onChange={setNext} autoComplete="new-password" />

                <StrengthMeter value={next} />

                <PasswordField id="pw-again" label="Confirm new password" value={again} onChange={setAgain} autoComplete="new-password" />

                <div role="status" aria-live="polite">
                    {pwMsg && <div className={`gv-msg ${pwMsg.type}`}>{pwMsg.text}</div>}
                </div>
                <button type="submit" className="gv-primary gv-full">Update password</button>
            </form>

            {/* EMAIL */}
            <div className="gv-acard">
                <span className="gv-acard-ico" aria-hidden="true">✉️</span>
                <h4>Email address</h4>
                <p className="gv-acard-sub">Add an email for account recovery. We send a verification code to it.</p>

                {account.email && !editing ? (
                    <div className="gv-email-saved">
                        <div className="gv-email-row">
                            <strong>{account.email}</strong>
                            <span className={`gv-badge ${account.verified ? "ok" : "pending"}`}>
                                {account.verified ? "✓ Verified" : "Pending verification"}
                            </span>
                        </div>
                        {!account.verified && (
                            <p className="gv-acard-sub">
                                A verification code will be sent to <b>{maskEmail(account.email)}</b> when you next log in.
                            </p>
                        )}
                        <div className="gv-email-actions">
                            {!account.verified && (
                                <button type="button" className="gv-primary" onClick={onOpenVerify}>Verify now</button>
                            )}
                            <button type="button" className="gv-secondary" onClick={() => { setEditing(true); setEmailMsg(null); }}>Change email</button>
                            <button type="button" className="gv-secondary" onClick={() => { onRemoveEmail(); setEditing(true); setEmailMsg(null); }}>Remove</button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={submitEmail} noValidate>
                        <div className="gv-field">
                            <label htmlFor="em">Email</label>
                            <input id="em" type="email" autoComplete="email" placeholder="you@example.com"
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="gv-email-actions">
                            <button type="submit" className="gv-primary">Save email</button>
                            {account.email && (
                                <button type="button" className="gv-secondary" onClick={() => { setEditing(false); setEmail(""); setEmailMsg(null); }}>Cancel</button>
                            )}
                        </div>
                    </form>
                )}
                <div role="status" aria-live="polite">
                    {emailMsg && <div className={`gv-msg ${emailMsg.type}`}>{emailMsg.text}</div>}
                </div>
            </div>
        </div>
    );
};

/* ---------- "We sent a verification code" pop-up ---------- */
export const VerifyEmailModal = ({
    target,                       // already-masked text, e.g. cr*****@gmail.com
    title = "Check your email",
    closeLabel = "Skip for now",
    doneTitle = "Email verified",
    doneText = "Your email is now verified.",
    onVerified,
    onClose,
}) => {
    const [digits, setDigits] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [done, setDone] = useState(false);
    const [wait, setWait] = useState(30);
    const [resent, setResent] = useState(false);
    const refs = useRef([]);

    useEffect(() => { refs.current[0]?.focus(); }, []);
    useEffect(() => {
        if (wait <= 0) return;
        const t = setTimeout(() => setWait((w) => w - 1), 1000);
        return () => clearTimeout(t);
    }, [wait]);
    useEffect(() => {                       /* Esc closes */
        const onKey = (e) => { if (e.key === "Escape" && !done) onClose(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [done, onClose]);

    const setAt = (i, v) => setDigits((d) => d.map((x, k) => (k === i ? v : x)));
    const onChange = (i, e) => {
        const v = e.target.value.replace(/\D/g, "").slice(-1);
        setAt(i, v); setError("");
        if (v && i < 5) refs.current[i + 1]?.focus();
    };
    const onKeyDown = (i, e) => {
        if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
        if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
        if (e.key === "ArrowRight" && i < 5) refs.current[i + 1]?.focus();
    };
    const onPaste = (e) => {
        const t = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        if (!t) return;
        e.preventDefault();
        setDigits(Array.from({ length: 6 }, (_, k) => t[k] || ""));
        refs.current[Math.min(t.length, 5)]?.focus();
    };

    /* Design only: any 6-digit code is accepted. */
    const submit = (e) => {
        e.preventDefault();
        if (digits.join("").length < 6) return setError("Enter the 6-digit code we sent you.");
        setDone(true);
        setTimeout(onVerified, 1400);
    };
    const resend = () => { setWait(30); setResent(true); setDigits(["", "", "", "", "", ""]); refs.current[0]?.focus(); };

    return (
        <div className="gv-modal" onMouseDown={(e) => { if (e.target === e.currentTarget && !done) onClose(); }}>
            <div className="gv-modal-card" role="dialog" aria-modal="true" aria-labelledby="vm-title">
                {done ? (
                    <div className="gv-modal-done">
                        <svg viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24" /><path d="M14 27l8 8 16-17" /></svg>
                        <h3 id="vm-title">{doneTitle}</h3>
                        <p>{doneText}</p>
                    </div>
                ) : (
                    <form onSubmit={submit} noValidate>
                        <span className="gv-modal-ico" aria-hidden="true">✉️</span>
                        <h3 id="vm-title">{title}</h3>
                        <p className="gv-modal-sub">
                            We sent a verification code to <b>{target}</b>. Enter the 6-digit code below.
                        </p>

                        <div className="gv-code" onPaste={onPaste}>
                            {digits.map((d, i) => (
                                <input
                                    key={i}
                                    ref={(el) => (refs.current[i] = el)}
                                    value={d}
                                    inputMode="numeric"
                                    autoComplete={i === 0 ? "one-time-code" : "off"}
                                    maxLength={1}
                                    aria-label={`Digit ${i + 1}`}
                                    onChange={(e) => onChange(i, e)}
                                    onKeyDown={(e) => onKeyDown(i, e)}
                                    onFocus={(e) => e.target.select()}
                                />
                            ))}
                        </div>

                        <div role="alert" className="gv-modal-error">{error}</div>
                        <button type="submit" className="gv-primary gv-full">Verify code</button>

                        <p className="gv-modal-foot">
                            {wait > 0 ? (
                                <span>{resent ? "New code sent. " : ""}Resend code in {wait}s</span>
                            ) : (
                                <button type="button" className="gv-link" onClick={resend}>Resend code</button>
                            )}
                            <span> · </span>
                            <button type="button" className="gv-link" onClick={onClose}>{closeLabel}</button>
                        </p>
                        <p className="gv-modal-demo">Demo: any 6-digit number works.</p>
                    </form>
                )}
            </div>
        </div>
    );
};

/* ---------- Forgot password: ID -> fake code -> new password ---------- */
export const ForgotPassword = ({ lookupEmail, onBack, onReset }) => {
    const [step, setStep] = useState("id");     // "id" | "code" | "new"
    const [id, setId] = useState("");
    const [error, setError] = useState("");
    const [next, setNext] = useState("");
    const [again, setAgain] = useState("");

    const sendCode = (e) => {
        e.preventDefault();
        if (!id.trim()) return setError("Enter your student ID.");
        setError(""); setStep("code");
    };
    const saveNew = (e) => {
        e.preventDefault();
        if (next.length < 8) return setError("New password must be at least 8 characters.");
        if (next !== again) return setError("New password and confirmation do not match.");
        onReset(id.trim(), next);
    };

    /* same wording whether or not the ID exists, so the form never reveals which IDs are real */
    const email = lookupEmail(id.trim());
    const target = email ? maskEmail(email) : "your registered email";

    return (
        <>
            {step !== "new" ? (
                <form className="gv-login" onSubmit={sendCode} noValidate>
                    <span className="gv-modal-ico" aria-hidden="true">🔑</span>
                    <h3>Forgot password?</h3>
                    <p>Enter your student ID and we will send a verification code to your email.</p>
                    <label htmlFor="fp-id">Student ID</label>
                    <input id="fp-id" type="text" autoComplete="username" placeholder="e.g. 2026-00123"
                        value={id} onChange={(e) => { setId(e.target.value); setError(""); }} />
                    {error && <div className="gv-error" role="alert">{error}</div>}
                    <button type="submit" className="gv-primary gv-full">Send code</button>
                    <button type="button" className="gv-link gv-back" onClick={onBack}>← Back to log-in</button>
                </form>
            ) : (
                <form className="gv-login" onSubmit={saveNew} noValidate>
                    <span className="gv-modal-ico" aria-hidden="true">🔒</span>
                    <h3>Set a new password</h3>
                    <p>Choose a new password for student ID {id.trim()}.</p>
                    <div className="gv-left">
                        <PasswordField id="fp-new" label="New password" value={next} onChange={(v) => { setNext(v); setError(""); }} autoComplete="new-password" />
                        <StrengthMeter value={next} />
                        <PasswordField id="fp-again" label="Confirm new password" value={again} onChange={(v) => { setAgain(v); setError(""); }} autoComplete="new-password" />
                    </div>
                    {error && <div className="gv-error" role="alert">{error}</div>}
                    <button type="submit" className="gv-primary gv-full">Reset password</button>
                    <button type="button" className="gv-link gv-back" onClick={onBack}>← Back to log-in</button>
                </form>
            )}

            {step === "code" && (
                <VerifyEmailModal
                    target={target}
                    title="Enter the code"
                    closeLabel="Cancel"
                    doneTitle="Code accepted"
                    doneText="Now choose a new password."
                    onVerified={() => setStep("new")}
                    onClose={() => setStep("id")}
                />
            )}
        </>
    );
};