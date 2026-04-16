import { useNavigate } from "react-router-dom";
import VisitorCounter from "../components/VisitorCounter";
import { useEffect, useState } from "react";

const GlobalStyles = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      :root {
        --emerald:     #064e3b;
        --emerald-mid: #065f46;
        --emerald-lt:  #059669;
        --emerald-glow:#10b981;
        --coral:       #f97316;
        --coral-lt:    #fb923c;
        --white:       #ffffff;
        --offwhite:    #f8faf9;
        --text:        #0f1f18;
        --muted:       #6b7c74;
        --border:      #e2ece7;
      }

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body {
        background: var(--white);
        color: var(--text);
        font-family: 'Plus Jakarta Sans', sans-serif;
        overflow-x: hidden;
        line-height: 1.6;
      }
      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: #f1f5f2; }
      ::-webkit-scrollbar-thumb { background: var(--emerald-lt); border-radius: 10px; }

      .f-display { font-family: 'Playfair Display', serif; }
      .f-mono    { font-family: 'Space Mono', monospace; }

      .em-text {
        background: linear-gradient(135deg, var(--emerald) 0%, var(--emerald-lt) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      /* NAV */
      .nav-bar {
        position: sticky; top: 0; z-index: 100;
        background: rgba(255,255,255,0.93);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--border);
        transition: box-shadow 0.3s;
      }
      .nav-bar.scrolled { box-shadow: 0 4px 30px rgba(6,78,59,0.08); }

      /* BUTTONS */
      .btn-em {
        background: linear-gradient(135deg, var(--emerald) 0%, var(--emerald-mid) 100%);
        color: white; border: none; cursor: pointer;
        font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600;
        transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
        position: relative; overflow: hidden;
      }
      .btn-em::after {
        content: '';
        position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
        transition: left 0.5s;
      }
      .btn-em:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(6,78,59,0.28); }
      .btn-em:hover::after { left: 100%; }

      .btn-outline-em {
        background: transparent; color: var(--emerald);
        border: 1.5px solid var(--emerald); cursor: pointer;
        font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600;
        transition: all 0.3s;
      }
      .btn-outline-em:hover {
        background: var(--emerald); color: white;
        transform: translateY(-2px);
        box-shadow: 0 12px 30px rgba(6,78,59,0.20);
      }

      .btn-ghost {
        background: transparent; color: var(--muted);
        border: 1.5px solid var(--border); cursor: pointer;
        font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 500;
        transition: all 0.3s;
      }
      .btn-ghost:hover { border-color: var(--emerald-lt); color: var(--emerald); }

      .pill {
        display: inline-flex; align-items: center; gap: 6px;
        padding: 6px 16px; border-radius: 999px;
        font-size: 12px; font-weight: 600; letter-spacing: 0.04em;
      }

      /* CARDS */
      .card-hover { transition: all 0.4s cubic-bezier(0.23,1,0.32,1); cursor: default; }
      .card-hover:hover { transform: translateY(-10px); box-shadow: 0 32px 64px rgba(6,78,59,0.12); }

      /* ANIMATIONS */
      @keyframes floatA {
        0%,100% { transform: translateY(0) rotate(-3deg); }
        50%      { transform: translateY(-14px) rotate(-3deg); }
      }
      @keyframes floatB {
        0%,100% { transform: translateY(0) rotate(3deg); }
        50%      { transform: translateY(-10px) rotate(3deg); }
      }
      @keyframes floatC {
        0%,100% { transform: translateY(0); }
        50%      { transform: translateY(-18px); }
      }
      @keyframes spinSlow { to { transform: rotate(360deg); } }
      @keyframes pulse2 {
        0%,100% { opacity: 1; transform: scale(1); }
        50%      { opacity: 0.6; transform: scale(1.05); }
      }
      @keyframes fadeSlideUp {
        from { opacity: 0; transform: translateY(28px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes ripple {
        0%   { transform: scale(0.8); opacity: 0.7; }
        100% { transform: scale(2.5); opacity: 0; }
      }
      @keyframes blob {
        0%,100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        50%      { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
      }
      @keyframes gridFade {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes orbPulse {
        0%,100% { box-shadow: 0 20px 60px rgba(6,78,59,0.15), inset 0 2px 4px rgba(255,255,255,0.8), 0 0 0 0 rgba(16,185,129,0.15); }
        50%      { box-shadow: 0 20px 60px rgba(6,78,59,0.20), inset 0 2px 4px rgba(255,255,255,0.8), 0 0 0 18px rgba(16,185,129,0); }
      }
      @keyframes statCountUp {
        from { opacity: 0; transform: translateY(12px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      .fa { animation: floatA 5s ease-in-out infinite; }
      .fb { animation: floatB 6.5s ease-in-out infinite; }
      .fc { animation: floatC 4.5s ease-in-out infinite; }
      .spin-slow { animation: spinSlow 25s linear infinite; }
      .pulse-soft { animation: pulse2 3s ease-in-out infinite; }
      .orb-pulse  { animation: orbPulse 4s ease-in-out infinite; }

      .reveal { opacity: 0; animation: fadeSlideUp 0.75s ease forwards; }
      .d1 { animation-delay: 0.10s; }
      .d2 { animation-delay: 0.25s; }
      .d3 { animation-delay: 0.40s; }
      .d4 { animation-delay: 0.55s; }
      .d5 { animation-delay: 0.70s; }

      .section-label {
        font-family: 'Space Mono', monospace;
        font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
        color: var(--emerald-lt);
        display: flex; align-items: center; gap: 10px; margin-bottom: 18px;
      }
      .section-label::before {
        content: ''; display: block; width: 28px; height: 2px;
        background: var(--emerald-lt); border-radius: 2px;
      }

      .blob { animation: blob 8s ease-in-out infinite; pointer-events: none; }

      .ripple-ring {
        position: absolute; inset: -20px;
        border: 1px solid rgba(16,185,129,0.25); border-radius: 50%;
        animation: ripple 3s ease-out infinite;
      }
      .ripple-ring-2 {
        position: absolute; inset: -20px;
        border: 1px solid rgba(16,185,129,0.12); border-radius: 50%;
        animation: ripple 3s ease-out 1.5s infinite;
      }

      .h-line { height: 1px; background: linear-gradient(to right, transparent, var(--border), transparent); }
      .profile-glow {
        box-shadow:
          0 0 0 1px var(--border),
          0 40px 80px rgba(6,78,59,0.10),
          0 4px 20px rgba(6,78,59,0.06);
      }

      .cta-wave {
        position: relative; overflow: hidden;
        background: linear-gradient(135deg, var(--emerald) 0%, var(--emerald-mid) 50%, #047857 100%);
      }
      .cta-wave::before {
        content: ''; position: absolute; bottom: -40%; left: -10%;
        width: 120%; height: 80%;
        background: radial-gradient(ellipse, rgba(16,185,129,0.2) 0%, transparent 70%);
        pointer-events: none;
      }
      .cta-wave::after {
        content: ''; position: absolute; top: -30%; right: -10%;
        width: 60%; height: 100%;
        background: radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%);
        pointer-events: none;
      }

      /* UPGRADED: richer hero mesh with dot grid */
      .hero-mesh {
        background:
          radial-gradient(ellipse 60% 50% at 70% 60%, rgba(16,185,129,0.09) 0%, transparent 100%),
          radial-gradient(ellipse 40% 40% at 20% 30%, rgba(6,78,59,0.04) 0%, transparent 100%),
          radial-gradient(ellipse 50% 60% at 90% 10%, rgba(249,115,22,0.04) 0%, transparent 100%),
          #ffffff;
      }
      .dot-bg {
        background-image: radial-gradient(circle, rgba(6,78,59,0.07) 1px, transparent 1px);
        background-size: 28px 28px;
      }
      /* NEW: fine grid overlay for depth */
      .grid-bg {
        background-image:
          linear-gradient(rgba(6,78,59,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6,78,59,0.04) 1px, transparent 1px);
        background-size: 44px 44px;
        animation: gridFade 1.2s ease forwards;
      }

      .footer-link {
        color: #94a3a0; font-size: 14px; text-decoration: none;
        transition: color 0.2s; background: none; border: none;
        cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif;
        text-align: left; padding: 0;
      }
      .footer-link:hover { color: var(--emerald-glow); }

      /* UPGRADED: feature card inner shimmer line */
      .feat-card-inner {
        position: absolute; top: 0; left: 0; right: 0; height: 3px;
        border-radius: 20px 20px 0 0;
        opacity: 0; transition: opacity 0.4s;
      }
      .card-hover:hover .feat-card-inner { opacity: 1; }

      /* UPGRADED: profile left subtle grid */
      .profile-left-grid {
        position: absolute; inset: 0;
        background-image:
          linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
        background-size: 32px 32px;
        pointer-events: none;
      }

      /* UPGRADED: stat row hover */
      .stat-hover-row {
        transition: background 0.2s;
        border-radius: 6px;
        padding: 10px 8px;
        margin: 0 -8px;
        border-bottom: 1px solid rgba(255,255,255,0.08);
      }
      .stat-hover-row:hover { background: rgba(255,255,255,0.06); }
      .stat-hover-row:last-child { border-bottom: none; }

      /* UPGRADED: nav link underline effect */
      .nav-link-item {
        position: relative;
        font-size: 14px; font-weight: 500; color: var(--muted);
        cursor: pointer; transition: color 0.2s; user-select: none;
        padding-bottom: 2px;
      }
      .nav-link-item::after {
        content: ''; position: absolute;
        bottom: -2px; left: 0; width: 0; height: 1.5px;
        background: var(--emerald-lt); border-radius: 2px;
        transition: width 0.25s ease;
      }
      .nav-link-item:hover { color: var(--emerald); }
      .nav-link-item:hover::after { width: 100%; }

      /* UPGRADED: social btn */
      .social-btn {
        display: flex; align-items: center; gap: 9px;
        padding: 11px 22px; border-radius: 10px;
        font-size: 14px; font-weight: 600;
        text-decoration: none; transition: all 0.25s;
      }

      /* UPGRADED: tag badge */
      .tag-badge {
        display: inline-flex; align-items: center; gap: 6px;
        padding: 5px 14px; border-radius: 999px;
        font-size: 11px; font-weight: 700; letter-spacing: 0.05em;
      }

      /* UPGRADED: CTA deco accent dots */
      .cta-accent-dot {
        position: absolute; border-radius: 50%; pointer-events: none;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);
  return null;
};

const IcoArrow = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const Home = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: "var(--white)" }}>
      <GlobalStyles />

      {/* ═══════ NAVBAR ═══════ */}
      <nav className={`nav-bar${scrolled ? " scrolled" : ""}`}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(6,78,59,0.18), 0 0 0 1px rgba(6,78,59,0.08)" }}>
              <img src="/logo.png" alt="Swasthya" style={{ height: 28, width: "auto", objectFit: "contain" }} />
            </div>
            <div>
              <div className="f-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--emerald)", lineHeight: 1.1 }}>Swasthya</div>
              <div className="f-mono" style={{ fontSize: 9, color: "var(--muted)", letterSpacing: "0.16em", textTransform: "uppercase" }}>Health Made Simple</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {["Platform","About","Research","Contact"].map(n => (
              <span key={n} className="nav-link-item">{n}</span>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button onClick={() => navigate("/login")} className="btn-ghost" style={{ padding: "9px 22px", borderRadius: 8, fontSize: 14 }}>Log In</button>
            <button onClick={() => navigate("/signup")} className="btn-em" style={{ padding: "9px 22px", borderRadius: 8, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
              Get Started <IcoArrow />
            </button>
          </div>
        </div>
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section className="hero-mesh" style={{ minHeight: "90vh", display: "flex", alignItems: "center", padding: "80px 28px", position: "relative", overflow: "hidden" }}>
        {/* Grid overlay */}
        <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.5, maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)" }} />
        {/* Dot pattern */}
        <div className="dot-bg" style={{ position: "absolute", inset: 0, opacity: 0.35 }} />
        {/* Blob A */}
        <div className="blob" style={{ position: "absolute", top: -100, right: -60, width: 500, height: 500, background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, rgba(6,78,59,0.04) 60%, transparent 100%)", borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%", filter: "blur(40px)" }} />
        {/* Blob B */}
        <div className="blob" style={{ position: "absolute", bottom: -80, left: -40, width: 380, height: 380, background: "radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)", borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%", filter: "blur(50px)", animationDelay: "4s" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", gap: 72, position: "relative", zIndex: 1 }}>
          {/* LEFT */}
          <div style={{ flex: 1, minWidth: 320 }}>
            <div className="reveal d1" style={{ marginBottom: 24 }}>
              <span className="pill" style={{ background: "rgba(16,185,129,0.10)", color: "var(--emerald-lt)", border: "1px solid rgba(16,185,129,0.20)" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--emerald-glow)", display: "inline-block" }} className="pulse-soft" />
                Your Health Companion
              </span>
            </div>

            <h1 className="f-display reveal d2" style={{ fontSize: "clamp(2.8rem,5.5vw,4.4rem)", fontWeight: 800, lineHeight: 1.07, letterSpacing: "-0.025em", marginBottom: 22, color: "var(--text)" }}>
              Access Trusted{" "}
              <span className="em-text">Health Information</span>{" "}
              <span style={{ position: "relative", display: "inline-block" }}>
                Anytime
                <svg style={{ position: "absolute", bottom: -4, left: 0, width: "100%" }} viewBox="0 0 220 12" preserveAspectRatio="none">
                  <path d="M2 9 Q55 2 110 9 Q165 16 218 9" stroke="var(--coral)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p className="reveal d3" style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.8, maxWidth: 500, marginBottom: 36 }}>
              Explore comprehensive disease information, symptoms, treatments, and preventive measures — your go-to platform for reliable health resources.
            </p>

            <div className="reveal d4" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 52 }}>
              <button onClick={() => navigate("/signup")} className="btn-em" style={{ padding: "14px 32px", borderRadius: 10, fontSize: 15, display: "flex", alignItems: "center", gap: 10, boxShadow: "0 8px 24px rgba(6,78,59,0.28), inset 0 1px 0 rgba(255,255,255,0.12)" }}>
                Get Started Free <IcoArrow />
              </button>
              <button onClick={() => navigate("/learn-more")} className="btn-outline-em" style={{ padding: "14px 32px", borderRadius: 10, fontSize: 15 }}>
                Learn More
              </button>
            </div>

            <div className="reveal d5" style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
              {[["Various","Diseases Covered"],["100%","Verified Data"],["24/7","Available"]].map(([n, l], i) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 28 }}>
                  <div style={{ animation: `statCountUp 0.6s ease ${0.7 + i * 0.12}s both` }}>
                    <div className="f-display em-text" style={{ fontSize: 28, fontWeight: 700, lineHeight: 1 }}>{n}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4, fontWeight: 500 }}>{l}</div>
                  </div>
                  {i < 2 && <div style={{ width: 1, height: 40, background: "var(--border)" }} />}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — 3D floating */}
          <div style={{ flex: "0 0 440px", height: 500, position: "relative" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 260, height: 260 }}>
              {/* Outer dashed ring */}
              <svg className="spin-slow" style={{ position: "absolute", inset: -50, width: 360, height: 360 }} viewBox="0 0 360 360">
                <circle cx="180" cy="180" r="172" fill="none" stroke="rgba(16,185,129,0.18)" strokeWidth="1.5" strokeDasharray="6 14"/>
              </svg>
              {/* Inner ring */}
              <svg style={{ position: "absolute", inset: -25, width: 310, height: 310 }} viewBox="0 0 310 310">
                <circle cx="155" cy="155" r="148" fill="none" stroke="rgba(6,78,59,0.07)" strokeWidth="1"/>
              </svg>
              {/* Orb body */}
              <div className="orb-pulse" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "linear-gradient(145deg,#f0fdf4,#dcfce7,#ecfdf5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className="ripple-ring" />
                <div className="ripple-ring-2" />
                {/* Core icon */}
                <div style={{ width: 88, height: 88, borderRadius: "50%", background: "linear-gradient(135deg,var(--emerald),var(--emerald-lt))", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 40px rgba(6,78,59,0.35), inset 0 2px 0 rgba(255,255,255,0.18)", zIndex: 2 }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Floating card A */}
            <div className="fa" style={{ position: "absolute", top: 30, left: 0, background: "white", borderRadius: 16, padding: "16px 20px", boxShadow: "0 20px 48px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,1) inset", border: "1px solid rgba(226,236,231,0.9)", display: "flex", alignItems: "center", gap: 14, minWidth: 185 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg,var(--emerald),var(--emerald-lt))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 12px rgba(6,78,59,0.25)" }}>
                <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>Various</div>
                <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500 }}>Diseases Covered</div>
              </div>
            </div>

            {/* Floating card B */}
            <div className="fb" style={{ position: "absolute", bottom: 50, right: -10, background: "white", borderRadius: 16, padding: "16px 20px", boxShadow: "0 20px 48px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,1) inset", border: "1px solid rgba(226,236,231,0.9)", display: "flex", alignItems: "center", gap: 14, minWidth: 185 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg,var(--coral),var(--coral-lt))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 12px rgba(249,115,22,0.25)" }}>
                <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>Verified</div>
                <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500 }}>Medical Data</div>
              </div>
            </div>

            {/* Tag top-right */}
            <div className="fc" style={{ position: "absolute", top: 70, right: 10, background: "linear-gradient(135deg,var(--emerald),var(--emerald-lt))", borderRadius: 12, padding: "12px 18px", boxShadow: "0 8px 24px rgba(6,78,59,0.28), inset 0 1px 0 rgba(255,255,255,0.15)" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "white", letterSpacing: "0.05em" }}>🏥 Health Platform</div>
            </div>

            {/* Status tag bottom-left */}
            <div className="fa" style={{ position: "absolute", bottom: 30, left: 10, background: "white", borderRadius: 12, padding: "12px 18px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8, animationDelay: "2s" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--emerald-glow)", boxShadow: "0 0 8px var(--emerald-glow)" }} className="pulse-soft" />
              <div style={{ fontSize: 11, fontWeight: 600, color: "var(--emerald)" }}>24/7 Online</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FEATURES ═══════ */}
      <section style={{ background: "#f8faf9", padding: "100px 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 60, textAlign: "center" }}>
            <div className="section-label" style={{ justifyContent: "center" }}>Why Choose Swasthya</div>
            <h2 className="f-display" style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: 14 }}>
              Everything You Need to Stay <span className="em-text">Informed</span>
            </h2>
            <p style={{ color: "var(--muted)", fontSize: 16, maxWidth: 500, margin: "0 auto" }}>
              A precision-crafted platform built for reliable medical education and accessible health knowledge.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {[
              {
                svg: <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>,
                bg: "linear-gradient(135deg,var(--emerald),var(--emerald-lt))",
                shimmer: "linear-gradient(90deg, var(--emerald), var(--emerald-glow))",
                tint: "rgba(16,185,129,0.06)",
                bdr: "rgba(16,185,129,0.14)",
                linkColor: "var(--emerald-lt)",
                title: "Comprehensive Database",
                desc: "Access detailed information about diseases, symptoms, causes, and treatments — all unified in one seamless platform.",
                num: "01"
              },
              {
                svg: <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>,
                bg: "linear-gradient(135deg,var(--coral),var(--coral-lt))",
                shimmer: "linear-gradient(90deg, var(--coral), var(--coral-lt))",
                tint: "rgba(249,115,22,0.05)",
                bdr: "rgba(249,115,22,0.14)",
                linkColor: "#ea580c",
                title: "Trusted Information",
                desc: "All medical content is verified and sourced from reliable health organizations and peer-reviewed references.",
                num: "02"
              },
              {
                svg: <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
                bg: "linear-gradient(135deg,#7c3aed,#a78bfa)",
                shimmer: "linear-gradient(90deg, #7c3aed, #a78bfa)",
                tint: "rgba(124,58,237,0.04)",
                bdr: "rgba(124,58,237,0.12)",
                linkColor: "#7c3aed",
                title: "Easy Access",
                desc: "Find health information instantly with our intelligently designed, user-friendly interface.",
                num: "03"
              },
            ].map(({ svg, bg, shimmer, tint, bdr, linkColor, title, desc, num }) => (
              <div key={num} className="card-hover" style={{ background: `linear-gradient(145deg,white 60%,${tint})`, borderRadius: 20, padding: "36px 32px", border: `1px solid ${bdr}`, position: "relative", overflow: "hidden" }}>
                {/* Top shimmer line on hover */}
                <div className="feat-card-inner" style={{ background: shimmer }} />
                <div className="f-mono" style={{ position: "absolute", top: 20, right: 24, fontSize: 48, fontWeight: 700, color: "rgba(0,0,0,0.04)", lineHeight: 1, userSelect: "none" }}>{num}</div>
                <div style={{ width: 54, height: 54, borderRadius: 16, background: bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, boxShadow: "0 8px 20px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.18)" }}>{svg}</div>
                <h3 className="f-display" style={{ fontSize: 21, fontWeight: 700, color: "var(--text)", marginBottom: 12, letterSpacing: "-0.01em" }}>{title}</h3>
                <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.75, marginBottom: 24 }}>{desc}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: linkColor, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                  Learn more <IcoArrow />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ ADMIN PROFILE ═══════ */}
      <section style={{ background: "white", padding: "100px 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-label" style={{ marginBottom: 48 }}>Platform Administrator</div>

          <div className="profile-glow" style={{ borderRadius: 24, overflow: "hidden", display: "flex", flexWrap: "wrap" }}>
            {/* Left — emerald */}
            <div style={{ flex: "0 0 340px", background: "linear-gradient(160deg,var(--emerald) 0%,#065f46 60%,#047857 100%)", padding: "60px 44px", display: "flex", flexDirection: "column", alignItems: "center", gap: 22, position: "relative", overflow: "hidden" }}>
              {/* Grid overlay */}
              <div className="profile-left-grid" />
              {/* Deco circles */}
              <div style={{ position: "absolute", top: -80, right: -80, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
              <div style={{ position: "absolute", bottom: -60, left: -60, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ width: 148, height: 148, borderRadius: "50%", padding: 3, background: "linear-gradient(135deg,rgba(255,255,255,0.5),rgba(255,255,255,0.15))", boxShadow: "0 12px 32px rgba(0,0,0,0.20)" }}>
                  <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", background: "var(--emerald-mid)" }}>
                    <img src="/doctor.png" alt="Doctor" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                </div>
                <div style={{ position: "absolute", bottom: 6, right: 6, width: 20, height: 20, borderRadius: "50%", background: "#4ade80", border: "3px solid var(--emerald)", boxShadow: "0 0 12px rgba(74,222,128,0.65)" }} />
              </div>

              <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                <div className="f-display" style={{ fontSize: 24, fontWeight: 700, color: "white", marginBottom: 4 }}>Akansh Mittal</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>3rd Year MBBS Student</div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 18px", borderRadius: 30, background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.20)", position: "relative", zIndex: 1 }}>
                <svg width="14" height="14" fill="#4ade80" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.9)", fontWeight: 600, letterSpacing: "0.06em" }}>VERIFIED PROFESSIONAL</span>
              </div>

              <div style={{ width: "100%", position: "relative", zIndex: 1, marginTop: 8 }}>
                {[["Verified Data","100%"],["Platform Access","24/7"],["Role","Admin"]].map(([l,v]) => (
                  <div key={l} className="stat-hover-row" style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{l}</span>
                    <span className="f-mono" style={{ fontSize: 12, color: "#4ade80", fontWeight: 700 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — white */}
            <div style={{ flex: 1, padding: "60px 52px", minWidth: 280, background: "white" }}>
              <span className="pill" style={{ background: "rgba(16,185,129,0.08)", color: "var(--emerald-lt)", border: "1px solid rgba(16,185,129,0.15)", marginBottom: 20, fontSize: 11, display: "inline-flex" }}>
                👨‍⚕️ Platform Administrator
              </span>

              <h2 className="f-display" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: 8 }}>Akansh Mittal</h2>

              <div style={{ marginBottom: 20 }}>
                {[["📖","3rd Year MBBS Student"],["🏛️","PDUMC Government Medical College"]].map(([ic,t]) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 6 }}>
                    <span>{ic}</span>
                    <span style={{ fontSize: 14, color: "var(--muted)", fontWeight: 500 }}>{t}</span>
                  </div>
                ))}
              </div>

              <div className="h-line" style={{ marginBottom: 24 }} />

              <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.85, marginBottom: 36, maxWidth: 500 }}>
                As a dedicated medical student and enthusiastic learner, I created Swasthya to bridge the gap between complex medical information and accessible health education. Our platform ensures that everyone has access to verified, comprehensive disease information to make informed health decisions.
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="https://www.linkedin.com/in/dr-akansh-mittal-00604421b/" target="_blank" rel="noopener noreferrer"
                  className="social-btn"
                  style={{ background: "#eff6ff", border: "1px solid #bfdbfe", color: "#2563eb" }}
                  onMouseEnter={e => { e.currentTarget.style.background="#2563eb"; e.currentTarget.style.color="white"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 20px rgba(37,99,235,0.22)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="#eff6ff"; e.currentTarget.style.color="#2563eb"; e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
                  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  LinkedIn
                </a>
                <a href="https://www.youtube.com/@MBBS-THELIFE" target="_blank" rel="noopener noreferrer"
                  className="social-btn"
                  style={{ background: "#fff7ed", border: "1px solid #fed7aa", color: "#ea580c" }}
                  onMouseEnter={e => { e.currentTarget.style.background="#ea580c"; e.currentTarget.style.color="white"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 20px rgba(234,88,12,0.22)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="#fff7ed"; e.currentTarget.style.color="#ea580c"; e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
                  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section style={{ padding: "80px 28px 100px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="cta-wave" style={{ borderRadius: 28, padding: "80px 60px", textAlign: "center", position: "relative" }}>
            {/* Accent dots */}
            <div className="cta-accent-dot" style={{ top: -60, right: 60, width: 200, height: 200, background: "rgba(249,115,22,0.15)", filter: "blur(60px)" }} />
            <div className="cta-accent-dot" style={{ bottom: -40, left: 40, width: 160, height: 160, background: "rgba(16,185,129,0.12)", filter: "blur(50px)" }} />
            <div className="section-label" style={{ justifyContent: "center", color: "rgba(255,255,255,0.5)", marginBottom: 20 }}>Get Started Today</div>
            <h2 className="f-display" style={{ fontSize: "clamp(2.2rem,4.5vw,3.5rem)", fontWeight: 700, color: "white", letterSpacing: "-0.025em", marginBottom: 14, position: "relative", zIndex: 1 }}>
              Ready to Begin?
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.65)", maxWidth: 460, margin: "0 auto 44px", lineHeight: 1.75, position: "relative", zIndex: 1 }}>
              Join thousands of users accessing reliable health information from trusted medical sources.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
              <button onClick={() => navigate("/signup")}
                style={{ padding: "15px 40px", borderRadius: 10, fontSize: 15, fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif", background: "white", color: "var(--emerald)", border: "none", cursor: "pointer", transition: "all 0.3s", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 18px rgba(0,0,0,0.12)" }}
                onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 16px 40px rgba(0,0,0,0.20)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 4px 18px rgba(0,0,0,0.12)"; }}>
                Sign Up Now <IcoArrow />
              </button>
              <button onClick={() => navigate("/login")}
                style={{ padding: "15px 40px", borderRadius: 10, fontSize: 15, fontWeight: 600, fontFamily: "'Plus Jakarta Sans',sans-serif", background: "transparent", color: "white", border: "1.5px solid rgba(255,255,255,0.35)", cursor: "pointer", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.12)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.6)"; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor="rgba(255,255,255,0.35)"; e.currentTarget.style.transform=""; }}>
                Log In
              </button>
            </div>
          </div>
        </div>
      </section>

      <VisitorCounter />

      {/* ═══════ FOOTER ═══════ */}
      <footer style={{ background: "var(--text)", padding: "64px 28px 36px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.2fr", gap: 48, marginBottom: 52 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: "linear-gradient(135deg,var(--emerald-lt),var(--emerald-glow))", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(16,185,129,0.30)" }}>
                  <img src="/logo.png" alt="Swasthya" style={{ height: 22, width: "auto", objectFit: "contain" }} />
                </div>
                <div>
                  <div className="f-display" style={{ fontSize: 18, fontWeight: 700, color: "white" }}>Swasthya</div>
                  <div className="f-mono" style={{ fontSize: 9, color: "var(--emerald-glow)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Health Made Simple</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: "#94a3a0", lineHeight: 1.75, maxWidth: 240 }}>
                Your trusted source for medical information and health resources, built by medical professionals.
              </p>
            </div>

            <div>
              <div className="f-mono" style={{ fontSize: 10, color: "var(--emerald-glow)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 18 }}>Platform</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button onClick={() => navigate("/learn-more")} className="footer-link">About Us</button>
                <a href="https://www.linkedin.com/in/dr-akansh-mittal-00604421b/" className="footer-link" style={{ color: "#94a3a0", textDecoration: "none" }}>LinkedIn</a>
              </div>
            </div>

            <div>
              <div className="f-mono" style={{ fontSize: 10, color: "var(--emerald-glow)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 18 }}>Support</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[["Contact Us","/contact-us"],["Privacy Policy","/privacy-policy"],["Terms of Service","/terms-of-service"]].map(([l,p]) => (
                  <button key={l} onClick={() => navigate(p)} className="footer-link">{l}</button>
                ))}
              </div>
            </div>

            <div>
              <div className="f-mono" style={{ fontSize: 10, color: "var(--emerald-glow)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 18 }}>Stay Updated</div>
              <p style={{ fontSize: 13, color: "#94a3a0", lineHeight: 1.7, marginBottom: 16 }}>Get the latest health tips and updates from our channel.</p>
              <button onClick={() => window.open("https://www.youtube.com/@MBBS-THELIFE","_blank")} className="btn-em"
                style={{ width: "100%", padding: "10px", borderRadius: 8, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <svg width="14" height="14" fill="white" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                Subscribe on YouTube
              </button>
            </div>
          </div>

          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 28 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p className="f-mono" style={{ fontSize: 11, color: "rgba(148,163,160,0.5)", letterSpacing: "0.05em" }}>© 2025 SWASTHYA. ALL RIGHTS RESERVED.</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--emerald-glow)", boxShadow: "0 0 8px var(--emerald-glow)" }} className="pulse-soft" />
              <span className="f-mono" style={{ fontSize: 10, color: "#94a3a0", letterSpacing: "0.1em" }}>SYSTEMS OPERATIONAL</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;