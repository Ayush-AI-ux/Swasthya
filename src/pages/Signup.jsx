import { useState, useEffect } from "react";
import { signupUser } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";

const SignupStyles = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.id = "signup-styles";
    style.textContent = `
      .signup-root {
        min-height: 100vh;
        display: flex; align-items: center; justify-content: center;
        font-family: 'Plus Jakarta Sans', sans-serif;
        background:
          radial-gradient(ellipse 60% 50% at 70% 40%, rgba(16,185,129,0.09) 0%, transparent 70%),
          radial-gradient(ellipse 40% 60% at 20% 70%, rgba(6,78,59,0.05) 0%, transparent 70%),
          radial-gradient(ellipse 50% 40% at 90% 90%, rgba(249,115,22,0.04) 0%, transparent 70%),
          #f8faf9;
        padding: 24px;
        position: relative; overflow: hidden;
      }
      .signup-root::before {
        content: '';
        position: absolute; inset: 0;
        background-image:
          linear-gradient(rgba(6,78,59,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6,78,59,0.04) 1px, transparent 1px);
        background-size: 44px 44px;
        mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
      }

      .signup-card {
        width: 100%; max-width: 980px;
        background: white;
        border-radius: 28px;
        overflow: hidden;
        display: flex;
        box-shadow: 0 40px 80px rgba(6,78,59,0.12), 0 1px 0 rgba(255,255,255,1) inset, 0 0 0 1px rgba(6,78,59,0.06);
        position: relative; z-index: 1;
        animation: signupFadeUp 0.6s cubic-bezier(0.23,1,0.32,1) both;
      }
      @keyframes signupFadeUp {
        from { opacity: 0; transform: translateY(32px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      /* LEFT PANEL */
      .signup-left {
        flex: 0 0 420px;
        background: linear-gradient(160deg, #064e3b 0%, #065f46 55%, #047857 100%);
        padding: 56px 48px;
        display: flex; flex-direction: column; justify-content: center;
        position: relative; overflow: hidden;
      }
      .signup-left-grid {
        position: absolute; inset: 0;
        background-image:
          linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
        background-size: 32px 32px; pointer-events: none;
      }
      .signup-left-blob-a {
        position: absolute; top: -80px; left: -80px;
        width: 260px; height: 260px; border-radius: 50%;
        background: rgba(255,255,255,0.04); pointer-events: none;
      }
      .signup-left-blob-b {
        position: absolute; bottom: -60px; right: -40px;
        width: 220px; height: 220px; border-radius: 50%;
        background: rgba(249,115,22,0.08); pointer-events: none;
        filter: blur(30px);
      }
      .signup-left-glow {
        position: absolute; top: 35%; left: -20px;
        width: 180px; height: 180px; border-radius: 50%;
        background: radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%);
        pointer-events: none;
      }

      .signup-brand { display: flex; align-items: center; gap: 12px; margin-bottom: 44px; position: relative; z-index: 1; }
      .signup-brand-mark {
        width: 44px; height: 44px; border-radius: 12px;
        background: white;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 4px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.9);
      }
      .signup-brand-mark img { height: 28px; width: auto; object-fit: contain; }
      .signup-brand-name { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: white; line-height: 1.1; }
      .signup-brand-tag  { font-family: 'Space Mono', monospace; font-size: 9px; color: rgba(255,255,255,0.55); letter-spacing: 0.16em; text-transform: uppercase; }

      .signup-left-h1 {
        font-family: 'Playfair Display', serif;
        font-size: 2.3rem; font-weight: 800; line-height: 1.12;
        color: white; margin-bottom: 14px; letter-spacing: -0.02em;
        position: relative; z-index: 1;
      }
      .signup-left-sub {
        font-size: 15px; color: rgba(255,255,255,0.65); line-height: 1.7;
        margin-bottom: 36px; position: relative; z-index: 1;
      }

      .signup-pills { display: flex; flex-direction: column; gap: 10px; position: relative; z-index: 1; }
      .signup-pill {
        display: flex; align-items: center; gap: 10px;
        padding: 10px 18px; border-radius: 999px; width: fit-content;
        background: rgba(255,255,255,0.10);
        border: 1px solid rgba(255,255,255,0.15);
        transition: background 0.2s;
      }
      .signup-pill:hover { background: rgba(255,255,255,0.15); }
      .signup-pill-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
      .signup-pill-text { font-size: 13px; color: rgba(255,255,255,0.88); font-weight: 500; }

      /* Floating deco */
      .signup-deco {
        position: absolute; border-radius: 50%;
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.12);
        display: flex; align-items: center; justify-content: center;
      }
      .signup-deco-a { width: 52px; height: 52px; top: 52px; right: 44px; animation: sfloatA 5s ease-in-out infinite; }
      .signup-deco-b { width: 40px; height: 40px; bottom: 140px; right: 56px; animation: sfloatB 6.5s ease-in-out infinite; }
      .signup-deco-c { width: 34px; height: 34px; bottom: 72px; left: 52px; animation: sfloatC 4.5s ease-in-out infinite; }
      @keyframes sfloatA { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-12px) rotate(-2deg)} }
      @keyframes sfloatB { 0%,100%{transform:translateY(0) rotate(2deg)} 50%{transform:translateY(-9px) rotate(2deg)} }
      @keyframes sfloatC { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }

      /* Steps indicator on left */
      .signup-steps {
        display: flex; align-items: center; gap: 8px;
        position: relative; z-index: 1; margin-top: 36px;
      }
      .signup-step-dot {
        width: 28px; height: 5px; border-radius: 999px;
        background: rgba(255,255,255,0.22); transition: all 0.3s;
      }
      .signup-step-dot.active { background: #10b981; width: 44px; }

      /* RIGHT PANEL */
      .signup-right {
        flex: 1; padding: 52px 52px;
        display: flex; flex-direction: column; justify-content: center;
        overflow-y: auto;
      }
      .signup-right-tag {
        display: inline-flex; align-items: center; gap: 6px;
        padding: 5px 14px; border-radius: 999px;
        background: rgba(16,185,129,0.08);
        border: 1px solid rgba(16,185,129,0.18);
        font-family: 'Space Mono', monospace;
        font-size: 10px; color: #059669; letter-spacing: 0.12em; text-transform: uppercase;
        margin-bottom: 18px;
      }
      .signup-right-tag-dot {
        width: 6px; height: 6px; border-radius: 50%; background: #10b981;
        animation: spulseGreen 2.5s ease-in-out infinite;
      }
      @keyframes spulseGreen {
        0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.4); }
        50%      { box-shadow: 0 0 0 5px rgba(16,185,129,0); }
      }
      .signup-right-h2 {
        font-family: 'Playfair Display', serif;
        font-size: 1.9rem; font-weight: 700; color: #0f1f18;
        letter-spacing: -0.02em; margin-bottom: 6px;
      }
      .signup-right-sub { font-size: 15px; color: #6b7c74; margin-bottom: 28px; }

      /* INPUTS */
      .signup-field { margin-bottom: 14px; }
      .signup-field-label {
        display: block; font-size: 12px; font-weight: 600;
        color: #0f1f18; letter-spacing: 0.04em; margin-bottom: 7px;
        text-transform: uppercase; font-family: 'Space Mono', monospace;
      }
      .signup-input-wrap { position: relative; }
      .signup-input-icon {
        position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
        color: #9cad9c; pointer-events: none;
        display: flex; align-items: center;
        transition: color 0.2s;
      }
      .signup-input {
        width: 100%; padding: 13px 16px 13px 44px;
        border: 1.5px solid #e2ece7; border-radius: 12px;
        font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px;
        color: #0f1f18; background: #f8faf9;
        outline: none; transition: all 0.25s;
      }
      .signup-input::placeholder { color: #9cad9c; }
      .signup-input:focus {
        border-color: #059669; background: white;
        box-shadow: 0 0 0 4px rgba(16,185,129,0.10);
      }
      .signup-input-wrap:focus-within .signup-input-icon { color: #059669; }

      /* TERMS */
      .signup-terms {
        display: flex; align-items: flex-start; gap: 10px;
        margin-bottom: 20px; margin-top: 4px;
      }
      .signup-checkbox {
        width: 18px; height: 18px; border-radius: 5px;
        border: 1.5px solid #e2ece7; background: #f8faf9;
        cursor: pointer; flex-shrink: 0; margin-top: 2px;
        accent-color: #059669;
        transition: border-color 0.2s;
      }
      .signup-checkbox:checked { border-color: #059669; }
      .signup-terms-label { font-size: 13px; color: #6b7c74; line-height: 1.55; }
      .signup-terms-link { color: #059669; font-weight: 600; text-decoration: none; }
      .signup-terms-link:hover { text-decoration: underline; color: #064e3b; }

      /* SUBMIT */
      .signup-submit {
        width: 100%; padding: 14px;
        border-radius: 12px; border: none; cursor: pointer;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 15px; font-weight: 700; color: white;
        background: linear-gradient(135deg, #064e3b 0%, #065f46 100%);
        display: flex; align-items: center; justify-content: center; gap: 9px;
        box-shadow: 0 8px 24px rgba(6,78,59,0.28), inset 0 1px 0 rgba(255,255,255,0.12);
        transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
        position: relative; overflow: hidden;
        margin-bottom: 20px;
      }
      .signup-submit::after {
        content: ''; position: absolute;
        top: 0; left: -100%; width: 100%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent);
        transition: left 0.5s;
      }
      .signup-submit:hover { transform: translateY(-2px); box-shadow: 0 16px 36px rgba(6,78,59,0.35), inset 0 1px 0 rgba(255,255,255,0.12); }
      .signup-submit:hover::after { left: 100%; }
      .signup-submit:active { transform: translateY(0); }

      .signup-divider {
        display: flex; align-items: center; gap: 14px; margin-bottom: 18px;
      }
      .signup-divider-line { flex: 1; height: 1px; background: #e2ece7; }
      .signup-divider-text { font-size: 12px; color: #9cad9c; font-weight: 500; white-space: nowrap; }

      .signup-login-row { text-align: center; font-size: 14px; color: #6b7c74; }
      .signup-login-btn {
        background: none; border: none; cursor: pointer;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 14px; font-weight: 700; color: #059669;
        transition: color 0.2s; padding: 0;
      }
      .signup-login-btn:hover { color: #064e3b; text-decoration: underline; }

      @media (max-width: 768px) {
        .signup-left { display: none; }
        .signup-right { padding: 48px 36px; }
        .signup-card { max-width: 480px; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(link);
      const s = document.getElementById("signup-styles");
      if (s) document.head.removeChild(s);
    };
  }, []);
  return null;
};

const IcoArrow = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert("Please agree to the Terms & Conditions and Privacy Policy");
      return;
    }
    try {
      await signupUser(form);
      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="signup-root">
      <SignupStyles />
      <div className="signup-card">

        {/* ── LEFT PANEL ── */}
        <div className="signup-left">
          <div className="signup-left-grid" />
          <div className="signup-left-blob-a" />
          <div className="signup-left-blob-b" />
          <div className="signup-left-glow" />

          {/* Floating deco icons */}
          <div className="signup-deco signup-deco-a">
            <svg width="20" height="20" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </div>
          <div className="signup-deco signup-deco-b">
            <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
          </div>
          <div className="signup-deco signup-deco-c">
            <svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>

          {/* Brand */}
          <div className="signup-brand">
            <div className="signup-brand-mark">
              <img src="/logo.png" alt="Swasthya" />
            </div>
            <div>
              <div className="signup-brand-name">Swasthya</div>
              <div className="signup-brand-tag">Health Made Simple</div>
            </div>
          </div>

          <h1 className="signup-left-h1">Join Our<br/>Community</h1>
          <p className="signup-left-sub">Create your free account and access India's most trusted health information platform.</p>

          <div className="signup-pills">
            {[
              ["#10b981","Disease Information"],
              ["#34d399","Verified Health Resources"],
              ["#f97316","Easy Access Anytime"],
            ].map(([color, label]) => (
              <div className="signup-pill" key={label}>
                <span className="signup-pill-dot" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
                <span className="signup-pill-text">{label}</span>
              </div>
            ))}
          </div>

          {/* Step indicators */}
          <div className="signup-steps">
            <div className="signup-step-dot active" />
            <div className="signup-step-dot" />
            <div className="signup-step-dot" />
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="signup-right">
          <div>
            <span className="signup-right-tag">
              <span className="signup-right-tag-dot" />
              Free Account
            </span>
          </div>
          <h2 className="signup-right-h2">Create Your Account</h2>
          <p className="signup-right-sub">Fill in your details to get started</p>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="signup-field">
              <label className="signup-field-label">Full Name</label>
              <div className="signup-input-wrap">
                <input
                  type="text" name="name" placeholder="Dr. John Smith"
                  value={form.name} onChange={handleChange} required
                  className="signup-input"
                />
                <span className="signup-input-icon">
                  <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="signup-field">
              <label className="signup-field-label">Email Address</label>
              <div className="signup-input-wrap">
                <input
                  type="email" name="email" placeholder="you@example.com"
                  value={form.email} onChange={handleChange} required
                  className="signup-input"
                />
                <span className="signup-input-icon">
                  <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </span>
              </div>
            </div>

            {/* Password */}
            <div className="signup-field">
              <label className="signup-field-label">Password</label>
              <div className="signup-input-wrap">
                <input
                  type="password" name="password" placeholder="••••••••"
                  value={form.password} onChange={handleChange} required
                  className="signup-input"
                />
                <span className="signup-input-icon">
                  <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </span>
              </div>
            </div>

            {/* Terms */}
            <div className="signup-terms">
              <input
                type="checkbox" id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="signup-checkbox"
              />
              <label htmlFor="terms" className="signup-terms-label">
                I agree to the{" "}
                <Link to="/terms-of-service" className="signup-terms-link">Terms & Conditions</Link>
                {" "}and{" "}
                <Link to="/privacy-policy" className="signup-terms-link">Privacy Policy</Link>
              </label>
            </div>

            {/* Submit */}
            <button type="submit" className="signup-submit">
              Create My Account <IcoArrow />
            </button>

            {/* Divider */}
            <div className="signup-divider">
              <span className="signup-divider-line" />
              <span className="signup-divider-text">Already a member?</span>
              <span className="signup-divider-line" />
            </div>

            {/* Login */}
            <div className="signup-login-row">
              Already have an account?{" "}
              <button type="button" className="signup-login-btn" onClick={() => navigate("/login")}>
                Log In
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Signup;