import { useState, useEffect } from "react";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const LoginStyles = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.id = "login-styles";
    style.textContent = `
      .login-root {
        min-height: 100vh;
        display: flex; align-items: center; justify-content: center;
        font-family: 'Plus Jakarta Sans', sans-serif;
        background:
          radial-gradient(ellipse 60% 50% at 30% 40%, rgba(16,185,129,0.09) 0%, transparent 70%),
          radial-gradient(ellipse 40% 60% at 80% 70%, rgba(6,78,59,0.05) 0%, transparent 70%),
          radial-gradient(ellipse 50% 40% at 10% 80%, rgba(249,115,22,0.04) 0%, transparent 70%),
          #f8faf9;
        padding: 24px;
        position: relative; overflow: hidden;
      }
      .login-root::before {
        content: '';
        position: absolute; inset: 0;
        background-image:
          linear-gradient(rgba(6,78,59,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6,78,59,0.04) 1px, transparent 1px);
        background-size: 44px 44px;
        mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
      }
      .login-card {
        width: 100%; max-width: 980px;
        background: white;
        border-radius: 28px;
        overflow: hidden;
        display: flex;
        box-shadow: 0 40px 80px rgba(6,78,59,0.12), 0 1px 0 rgba(255,255,255,1) inset, 0 0 0 1px rgba(6,78,59,0.06);
        position: relative; z-index: 1;
        animation: loginFadeUp 0.6s cubic-bezier(0.23,1,0.32,1) both;
      }
      @keyframes loginFadeUp {
        from { opacity: 0; transform: translateY(32px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      /* LEFT PANEL */
      .login-left {
        flex: 0 0 420px;
        background: linear-gradient(160deg, #064e3b 0%, #065f46 55%, #047857 100%);
        padding: 60px 48px;
        display: flex; flex-direction: column; justify-content: center;
        position: relative; overflow: hidden;
      }
      .login-left-grid {
        position: absolute; inset: 0;
        background-image:
          linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
        background-size: 32px 32px;
        pointer-events: none;
      }
      .login-left-blob-a {
        position: absolute; top: -80px; right: -80px;
        width: 260px; height: 260px; border-radius: 50%;
        background: rgba(255,255,255,0.04); pointer-events: none;
      }
      .login-left-blob-b {
        position: absolute; bottom: -60px; left: -60px;
        width: 200px; height: 200px; border-radius: 50%;
        background: rgba(249,115,22,0.08); pointer-events: none;
        filter: blur(30px);
      }
      .login-left-glow {
        position: absolute; top: 40%; right: -20px;
        width: 180px; height: 180px; border-radius: 50%;
        background: radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%);
        pointer-events: none;
      }

      .login-brand { display: flex; align-items: center; gap: 12px; margin-bottom: 48px; position: relative; z-index: 1; }
      .login-brand-mark {
        width: 44px; height: 44px; border-radius: 12px;
        background: white;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 4px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.9);
      }
      .login-brand-mark img { height: 28px; width: auto; object-fit: contain; }
      .login-brand-name { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: white; line-height: 1.1; }
      .login-brand-tag  { font-family: 'Space Mono', monospace; font-size: 9px; color: rgba(255,255,255,0.55); letter-spacing: 0.16em; text-transform: uppercase; }

      .login-left-h1 {
        font-family: 'Playfair Display', serif;
        font-size: 2.4rem; font-weight: 800; line-height: 1.12;
        color: white; margin-bottom: 14px; letter-spacing: -0.02em;
        position: relative; z-index: 1;
      }
      .login-left-sub {
        font-size: 15px; color: rgba(255,255,255,0.65); line-height: 1.7;
        margin-bottom: 40px; position: relative; z-index: 1;
      }

      .login-pills { display: flex; flex-direction: column; gap: 10px; position: relative; z-index: 1; }
      .login-pill {
        display: flex; align-items: center; gap: 10px;
        padding: 10px 18px; border-radius: 999px; width: fit-content;
        background: rgba(255,255,255,0.10);
        border: 1px solid rgba(255,255,255,0.15);
        backdrop-filter: blur(8px);
        transition: background 0.2s;
      }
      .login-pill:hover { background: rgba(255,255,255,0.15); }
      .login-pill-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
      .login-pill-text { font-size: 13px; color: rgba(255,255,255,0.88); font-weight: 500; }

      /* Floating deco icons */
      .login-deco {
        position: absolute; border-radius: 50%;
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.12);
        display: flex; align-items: center; justify-content: center;
      }
      .login-deco-a { width: 56px; height: 56px; top: 48px; right: 48px; animation: floatA 5s ease-in-out infinite; }
      .login-deco-b { width: 42px; height: 42px; bottom: 120px; right: 60px; animation: floatB 6.5s ease-in-out infinite; }
      .login-deco-c { width: 36px; height: 36px; bottom: 80px; left: 48px; animation: floatC 4.5s ease-in-out infinite; }
      @keyframes floatA { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-12px) rotate(-2deg)} }
      @keyframes floatB { 0%,100%{transform:translateY(0) rotate(2deg)} 50%{transform:translateY(-9px) rotate(2deg)} }
      @keyframes floatC { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }

      /* RIGHT PANEL */
      .login-right {
        flex: 1; padding: 60px 52px;
        display: flex; flex-direction: column; justify-content: center;
      }
      .login-right-tag {
        display: inline-flex; align-items: center; gap: 6px;
        padding: 5px 14px; border-radius: 999px;
        background: rgba(16,185,129,0.08);
        border: 1px solid rgba(16,185,129,0.18);
        font-family: 'Space Mono', monospace;
        font-size: 10px; color: #059669; letter-spacing: 0.12em; text-transform: uppercase;
        margin-bottom: 20px;
      }
      .login-right-tag-dot {
        width: 6px; height: 6px; border-radius: 50%; background: #10b981;
        animation: pulseGreen 2.5s ease-in-out infinite;
      }
      @keyframes pulseGreen {
        0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.4); }
        50%      { box-shadow: 0 0 0 5px rgba(16,185,129,0); }
      }

      .login-right-h2 {
        font-family: 'Playfair Display', serif;
        font-size: 2rem; font-weight: 700; color: #0f1f18;
        letter-spacing: -0.02em; margin-bottom: 8px;
      }
      .login-right-sub { font-size: 15px; color: #6b7c74; margin-bottom: 36px; }

      /* INPUTS */
      .login-field { margin-bottom: 16px; }
      .login-field-label {
        display: block; font-size: 12px; font-weight: 600;
        color: #0f1f18; letter-spacing: 0.04em; margin-bottom: 7px;
        text-transform: uppercase; font-family: 'Space Mono', monospace;
      }
      .login-input-wrap { position: relative; }
      .login-input-icon {
        position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
        color: #9cad9c; pointer-events: none;
        display: flex; align-items: center;
        transition: color 0.2s;
      }
      .login-input {
        width: 100%; padding: 13px 16px 13px 44px;
        border: 1.5px solid #e2ece7; border-radius: 12px;
        font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px;
        color: #0f1f18; background: #f8faf9;
        outline: none; transition: all 0.25s;
      }
      .login-input::placeholder { color: #9cad9c; }
      .login-input:focus {
        border-color: #059669; background: white;
        box-shadow: 0 0 0 4px rgba(16,185,129,0.10);
      }
      .login-input:focus + .login-input-icon,
      .login-input-wrap:focus-within .login-input-icon { color: #059669; }

      .login-forgot {
        display: flex; justify-content: flex-end; margin-bottom: 24px; margin-top: -4px;
      }
      .login-forgot a {
        font-size: 13px; color: #059669; font-weight: 600;
        text-decoration: none; transition: color 0.2s;
      }
      .login-forgot a:hover { color: #064e3b; text-decoration: underline; }

      /* SUBMIT BUTTON */
      .login-submit {
        width: 100%; padding: 14px;
        border-radius: 12px; border: none; cursor: pointer;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 15px; font-weight: 700; color: white;
        background: linear-gradient(135deg, #064e3b 0%, #065f46 100%);
        display: flex; align-items: center; justify-content: center; gap: 9px;
        box-shadow: 0 8px 24px rgba(6,78,59,0.28), inset 0 1px 0 rgba(255,255,255,0.12);
        transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
        position: relative; overflow: hidden;
        margin-bottom: 24px;
      }
      .login-submit::after {
        content: ''; position: absolute;
        top: 0; left: -100%; width: 100%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent);
        transition: left 0.5s;
      }
      .login-submit:hover { transform: translateY(-2px); box-shadow: 0 16px 36px rgba(6,78,59,0.35), inset 0 1px 0 rgba(255,255,255,0.12); }
      .login-submit:hover::after { left: 100%; }
      .login-submit:active { transform: translateY(0); }

      .login-divider {
        display: flex; align-items: center; gap: 14px; margin-bottom: 20px;
      }
      .login-divider-line { flex: 1; height: 1px; background: #e2ece7; }
      .login-divider-text { font-size: 12px; color: #9cad9c; font-weight: 500; white-space: nowrap; }

      .login-signup-row {
        text-align: center; font-size: 14px; color: #6b7c74;
      }
      .login-signup-btn {
        background: none; border: none; cursor: pointer;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 14px; font-weight: 700; color: #059669;
        transition: color 0.2s; padding: 0;
      }
      .login-signup-btn:hover { color: #064e3b; text-decoration: underline; }

      /* security badge */
      .login-security {
        display: flex; align-items: center; gap: 8px;
        padding: 10px 16px; border-radius: 10px;
        background: rgba(16,185,129,0.05); border: 1px solid rgba(16,185,129,0.12);
        margin-bottom: 28px;
      }
      .login-security-text { font-size: 12px; color: #059669; font-weight: 500; }

      @media (max-width: 768px) {
        .login-left { display: none; }
        .login-right { padding: 48px 36px; }
        .login-card { max-width: 480px; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(link);
      const s = document.getElementById("login-styles");
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

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="login-root">
      <LoginStyles />
      <div className="login-card">

        {/* ── LEFT PANEL ── */}
        <div className="login-left">
          <div className="login-left-grid" />
          <div className="login-left-blob-a" />
          <div className="login-left-blob-b" />
          <div className="login-left-glow" />

          {/* Floating deco icons */}
          <div className="login-deco login-deco-a">
            <svg width="22" height="22" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </div>
          <div className="login-deco login-deco-b">
            <svg width="17" height="17" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
          <div className="login-deco login-deco-c">
            <svg width="15" height="15" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>

          {/* Brand */}
          <div className="login-brand">
            <div className="login-brand-mark">
              <img src="/logo.png" alt="Swasthya" />
            </div>
            <div>
              <div className="login-brand-name">Swasthya</div>
              <div className="login-brand-tag">Health Made Simple</div>
            </div>
          </div>

          <h1 className="login-left-h1">Welcome<br/>Back!</h1>
          <p className="login-left-sub">Log in to access your Swasthya dashboard and trusted health resources.</p>

          <div className="login-pills">
            {[
              ["#10b981","Secure & Private Login"],
              ["#34d399","Quick Dashboard Access"],
              ["#f97316","Your Health Data"],
            ].map(([color, label]) => (
              <div className="login-pill" key={label}>
                <span className="login-pill-dot" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
                <span className="login-pill-text">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="login-right">
          <div>
            <span className="login-right-tag">
              <span className="login-right-tag-dot" />
              Secure Access
            </span>
          </div>
          <h2 className="login-right-h2">Login to Swasthya</h2>
          <p className="login-right-sub">Enter your credentials to continue</p>

          {/* Security note */}
          <div className="login-security">
            <svg width="14" height="14" fill="none" stroke="#059669" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
            <span className="login-security-text">Your data is encrypted and secure</span>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="login-field">
              <label className="login-field-label">Email Address</label>
              <div className="login-input-wrap">
                <input
                  type="email" name="email" placeholder="you@example.com"
                  value={form.email} onChange={handleChange} required
                  className="login-input"
                />
                <span className="login-input-icon">
                  <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </span>
              </div>
            </div>

            {/* Password */}
            <div className="login-field">
              <label className="login-field-label">Password</label>
              <div className="login-input-wrap">
                <input
                  type="password" name="password" placeholder="••••••••"
                  value={form.password} onChange={handleChange} required
                  className="login-input"
                />
                <span className="login-input-icon">
                  <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </span>
              </div>
            </div>

            {/* Forgot */}
            <div className="login-forgot">
              <a href="#">Forgot Password?</a>
            </div>

            {/* Submit */}
            <button type="submit" className="login-submit">
              Login to Dashboard <IcoArrow />
            </button>

            {/* Divider */}
            <div className="login-divider">
              <span className="login-divider-line" />
              <span className="login-divider-text">New to Swasthya?</span>
              <span className="login-divider-line" />
            </div>

            {/* Signup */}
            <div className="login-signup-row">
              Don't have an account?{" "}
              <button type="button" className="login-signup-btn" onClick={() => navigate("/signup")}>
                Create Account
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;