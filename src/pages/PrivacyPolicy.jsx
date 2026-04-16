import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PageStyles = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.id = "pp-styles";
    style.textContent = `
      .pp-root {
        min-height: 100vh;
        font-family: 'Plus Jakarta Sans', sans-serif;
        background: #f8faf9;
        color: #0f1f18;
      }

      /* NAV */
      .pp-nav {
        position: sticky; top: 0; z-index: 100;
        background: rgba(255,255,255,0.93);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid #e2ece7;
        box-shadow: 0 1px 30px rgba(6,78,59,0.06);
      }
      .pp-nav-inner {
        max-width: 1160px; margin: 0 auto;
        padding: 0 32px; height: 68px;
        display: flex; align-items: center; justify-content: space-between;
      }
      .pp-nav-brand {
        display: flex; align-items: center; gap: 12px; cursor: pointer;
        text-decoration: none;
      }
      .pp-nav-logo-wrap {
        width: 42px; height: 42px; border-radius: 11px;
        background: white; border: 1px solid #e2ece7;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 2px 10px rgba(6,78,59,0.10);
      }
      .pp-nav-logo-wrap img { height: 28px; width: auto; object-fit: contain; }
      .pp-nav-name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #064e3b; line-height: 1.1; }
      .pp-nav-tag  { font-family: 'Space Mono', monospace; font-size: 9px; color: #6b7c74; letter-spacing: 0.16em; text-transform: uppercase; }
      .pp-back-btn {
        display: flex; align-items: center; gap: 8px;
        padding: 9px 20px; border-radius: 9px;
        background: transparent; border: 1.5px solid #e2ece7;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 14px; font-weight: 600; color: #6b7c74;
        cursor: pointer; transition: all 0.25s;
        text-decoration: none;
      }
      .pp-back-btn:hover { border-color: #059669; color: #059669; background: rgba(16,185,129,0.04); }

      /* HERO */
      .pp-hero {
        background: linear-gradient(160deg, #064e3b 0%, #065f46 55%, #047857 100%);
        padding: 72px 32px 80px;
        position: relative; overflow: hidden;
      }
      .pp-hero-grid {
        position: absolute; inset: 0;
        background-image:
          linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
        background-size: 32px 32px; pointer-events: none;
      }
      .pp-hero-blob-a {
        position: absolute; top: -80px; right: -80px;
        width: 300px; height: 300px; border-radius: 50%;
        background: rgba(255,255,255,0.04); pointer-events: none;
      }
      .pp-hero-blob-b {
        position: absolute; bottom: -60px; left: 10%;
        width: 240px; height: 240px; border-radius: 50%;
        background: rgba(249,115,22,0.09); filter: blur(40px); pointer-events: none;
      }
      .pp-hero-inner { max-width: 860px; margin: 0 auto; text-align: center; position: relative; z-index: 1; }
      .pp-hero-badge {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 8px 20px; border-radius: 999px; margin-bottom: 22px;
        background: rgba(255,255,255,0.12);
        border: 1px solid rgba(255,255,255,0.20);
        font-family: 'Space Mono', monospace;
        font-size: 10px; color: rgba(255,255,255,0.88); letter-spacing: 0.14em; text-transform: uppercase;
      }
      .pp-hero-h1 {
        font-family: 'Playfair Display', serif;
        font-size: clamp(2.4rem, 5vw, 3.8rem); font-weight: 800;
        color: white; letter-spacing: -0.025em; margin-bottom: 16px; line-height: 1.08;
      }
      .pp-hero-sub { font-size: 17px; color: rgba(255,255,255,0.65); line-height: 1.7; max-width: 500px; margin: 0 auto; }

      /* CONTENT */
      .pp-content { max-width: 860px; margin: 0 auto; padding: 48px 32px 80px; }

      /* DATE BANNER */
      .pp-date-card {
        background: white; border-radius: 16px; padding: 22px 28px;
        border: 1px solid #e2ece7; margin-bottom: 28px;
        display: flex; align-items: center; justify-content: space-between;
        box-shadow: 0 4px 20px rgba(6,78,59,0.06);
        border-left: 4px solid #059669;
      }
      .pp-date-left { display: flex; align-items: center; gap: 14px; }
      .pp-date-icon {
        width: 46px; height: 46px; border-radius: 12px;
        background: rgba(16,185,129,0.08);
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      }
      .pp-date-label { font-size: 13px; font-weight: 700; color: #0f1f18; margin-bottom: 2px; }
      .pp-date-val   { font-size: 13px; color: #6b7c74; }
      .pp-status-pill {
        display: inline-flex; align-items: center; gap: 6px;
        padding: 6px 16px; border-radius: 999px;
        background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.20);
        font-size: 12px; font-weight: 700; color: #059669;
        font-family: 'Space Mono', monospace; letter-spacing: 0.05em;
      }
      .pp-status-dot {
        width: 6px; height: 6px; border-radius: 50%; background: #10b981;
        box-shadow: 0 0 6px #10b981;
      }

      /* SECTION CARDS */
      .pp-card {
        background: white; border-radius: 20px; padding: 40px 36px;
        border: 1px solid #e2ece7; margin-bottom: 24px;
        box-shadow: 0 4px 24px rgba(6,78,59,0.05);
        transition: box-shadow 0.3s;
      }
      .pp-card:hover { box-shadow: 0 12px 40px rgba(6,78,59,0.09); }
      .pp-card-head { display: flex; align-items: center; gap: 14px; margin-bottom: 24px; }
      .pp-card-icon {
        width: 50px; height: 50px; border-radius: 14px;
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        box-shadow: 0 4px 14px rgba(0,0,0,0.10);
      }
      .pp-card-h2 {
        font-family: 'Playfair Display', serif;
        font-size: 1.55rem; font-weight: 700; color: #0f1f18; letter-spacing: -0.015em;
      }
      .pp-body { font-size: 15px; color: #4b5563; line-height: 1.82; }
      .pp-body strong { color: #0f1f18; font-weight: 700; }
      .pp-em { color: #059669; font-weight: 700; }

      /* SECTION LABEL */
      .pp-section-label {
        font-family: 'Space Mono', monospace; font-size: 11px;
        letter-spacing: 0.18em; text-transform: uppercase; color: #059669;
        display: flex; align-items: center; gap: 8px; margin-bottom: 14px;
      }
      .pp-section-label::before {
        content: ''; display: block; width: 24px; height: 2px;
        background: #059669; border-radius: 2px;
      }

      /* ACCENT BORDER ITEMS */
      .pp-border-item {
        border-left: 3px solid; padding-left: 20px; margin-bottom: 20px;
      }
      .pp-border-item:last-child { margin-bottom: 0; }
      .pp-border-em  { border-color: #059669; }
      .pp-border-cor { border-color: #f97316; }
      .pp-border-blu { border-color: #3b82f6; }
      .pp-item-h3 {
        font-family: 'Playfair Display', serif;
        font-size: 17px; font-weight: 700; color: #0f1f18; margin-bottom: 8px;
      }

      /* BULLET LIST */
      .pp-list { list-style: none; padding: 0; margin: 10px 0 0; }
      .pp-list li {
        display: flex; align-items: flex-start; gap: 10px;
        font-size: 14px; color: #4b5563; margin-bottom: 8px; line-height: 1.6;
      }
      .pp-list-arrow {
        width: 18px; height: 18px; border-radius: 50%;
        background: rgba(16,185,129,0.10);
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0; margin-top: 1px;
      }

      /* USE GRID */
      .pp-use-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
      .pp-use-item {
        padding: 18px 20px; border-radius: 14px;
        display: flex; align-items: flex-start; gap: 12px;
        border: 1px solid;
        transition: transform 0.2s;
      }
      .pp-use-item:hover { transform: translateY(-2px); }
      .pp-use-icon {
        width: 36px; height: 36px; border-radius: 10px;
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      }
      .pp-use-h4 { font-size: 14px; font-weight: 700; color: #0f1f18; margin-bottom: 4px; }
      .pp-use-p  { font-size: 12px; color: #6b7c74; line-height: 1.55; }

      /* SECURITY ITEMS */
      .pp-security-item {
        display: flex; align-items: flex-start; gap: 14px;
        padding: 18px 20px; border-radius: 14px;
        background: rgba(16,185,129,0.04);
        border: 1px solid rgba(16,185,129,0.12);
        margin-bottom: 12px;
      }
      .pp-security-item:last-child { margin-bottom: 0; }
      .pp-security-h4 { font-size: 14px; font-weight: 700; color: #0f1f18; margin-bottom: 3px; }
      .pp-security-p  { font-size: 13px; color: #6b7c74; line-height: 1.55; }

      /* RIGHTS LIST */
      .pp-rights-item {
        display: flex; align-items: flex-start; gap: 12px;
        padding: 14px 0; border-bottom: 1px solid #f1f5f2;
        font-size: 15px; color: #4b5563; line-height: 1.6;
      }
      .pp-rights-item:last-child { border-bottom: none; padding-bottom: 0; }
      .pp-rights-tag {
        display: inline-block; padding: 2px 10px; border-radius: 6px;
        font-size: 11px; font-weight: 700; letter-spacing: 0.04em;
        background: rgba(16,185,129,0.08); color: #059669;
        margin-right: 6px; flex-shrink: 0; white-space: nowrap;
        font-family: 'Space Mono', monospace;
      }

      /* CONTACT BANNER */
      .pp-contact-card {
        background: linear-gradient(135deg, #064e3b 0%, #065f46 55%, #047857 100%);
        border-radius: 20px; padding: 44px 40px;
        position: relative; overflow: hidden;
      }
      .pp-contact-card::before {
        content: ''; position: absolute; top: -60px; right: -60px;
        width: 220px; height: 220px; border-radius: 50%;
        background: rgba(255,255,255,0.04); pointer-events: none;
      }
      .pp-contact-card::after {
        content: ''; position: absolute; bottom: -40px; left: -40px;
        width: 180px; height: 180px; border-radius: 50%;
        background: rgba(249,115,22,0.10); filter: blur(30px); pointer-events: none;
      }
      .pp-contact-h2 {
        font-family: 'Playfair Display', serif;
        font-size: 1.7rem; font-weight: 700; color: white; margin-bottom: 10px;
        position: relative; z-index: 1;
      }
      .pp-contact-sub { font-size: 15px; color: rgba(255,255,255,0.65); margin-bottom: 24px; position: relative; z-index: 1; }
      .pp-contact-row {
        display: flex; align-items: center; gap: 12px;
        font-size: 14px; color: rgba(255,255,255,0.80); margin-bottom: 10px;
        position: relative; z-index: 1;
      }
      .pp-contact-row:last-child { margin-bottom: 0; }
      .pp-contact-ico {
        width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
        background: rgba(255,255,255,0.12);
        display: flex; align-items: center; justify-content: center;
      }

      /* FOOTER */
      .pp-footer { background: #0f1f18; padding: 36px 32px; text-align: center; }
      .pp-footer p { font-family: 'Space Mono', monospace; font-size: 11px; color: rgba(148,163,160,0.5); letter-spacing: 0.06em; }

      @media (max-width: 640px) {
        .pp-content { padding: 32px 20px 60px; }
        .pp-card { padding: 28px 22px; }
        .pp-use-grid { grid-template-columns: 1fr; }
        .pp-hero { padding: 56px 20px 64px; }
        .pp-contact-card { padding: 32px 24px; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(link);
      const s = document.getElementById("pp-styles");
      if (s) document.head.removeChild(s);
    };
  }, []);
  return null;
};

const IcoCheck = () => (
  <svg width="11" height="11" fill="none" stroke="#059669" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
  </svg>
);

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="pp-root">
      <PageStyles />

      {/* NAV */}
      <nav className="pp-nav">
        <div className="pp-nav-inner">
          <div className="pp-nav-brand" onClick={() => navigate("/")}>
            <div className="pp-nav-logo-wrap">
              <img src="/logo.png" alt="Swasthya" />
            </div>
            <div>
              <div className="pp-nav-name">Swasthya</div>
              <div className="pp-nav-tag">Health Made Simple</div>
            </div>
          </div>
          <button className="pp-back-btn" onClick={() => navigate("/")}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Back to Home
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="pp-hero">
        <div className="pp-hero-grid" />
        <div className="pp-hero-blob-a" />
        <div className="pp-hero-blob-b" />
        <div className="pp-hero-inner">
          <div className="pp-hero-badge">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
            Legal Document
          </div>
          <h1 className="pp-hero-h1">Privacy Policy</h1>
          <p className="pp-hero-sub">Your privacy is important to us. Learn how we protect your information.</p>
        </div>
      </section>

      {/* CONTENT */}
      <div className="pp-content">

        {/* Date banner */}
        <div className="pp-date-card">
          <div className="pp-date-left">
            <div className="pp-date-icon">
              <svg width="22" height="22" fill="none" stroke="#059669" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <div>
              <div className="pp-date-label">Last Updated</div>
              <div className="pp-date-val">December 29, 2025</div>
            </div>
          </div>
          <div className="pp-status-pill">
            <span className="pp-status-dot" />
            Active
          </div>
        </div>

        {/* Introduction */}
        <div className="pp-card">
          <div className="pp-section-label">Overview</div>
          <h2 className="pp-card-h2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.55rem", fontWeight: 700, color: "#0f1f18", marginBottom: 16 }}>Introduction</h2>
          <p className="pp-body">
            Welcome to <span className="pp-em">Swasthya</span>. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our platform. Please read this privacy policy carefully.
          </p>
        </div>

        {/* Information We Collect */}
        <div className="pp-card">
          <div className="pp-card-head">
            <div className="pp-card-icon" style={{ background: "linear-gradient(135deg,#064e3b,#059669)" }}>
              <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <h2 className="pp-card-h2">Information We Collect</h2>
          </div>

          <div className="pp-border-item pp-border-em">
            <h3 className="pp-item-h3">Personal Information</h3>
            <p className="pp-body">We may collect personal information that you voluntarily provide when you register on our platform, including:</p>
            <ul className="pp-list">
              {["Name and email address","Account credentials (username and password)","Any other information you choose to provide"].map(t => (
                <li key={t}><span className="pp-list-arrow"><IcoCheck /></span>{t}</li>
              ))}
            </ul>
          </div>

          <div className="pp-border-item pp-border-cor" style={{ marginTop: 20 }}>
            <h3 className="pp-item-h3">Automatically Collected Information</h3>
            <p className="pp-body">When you access our platform, we may automatically collect certain information, including:</p>
            <ul className="pp-list">
              {["Device information (IP address, browser type)","Usage data (pages visited, time spent)","Cookies and similar tracking technologies"].map(t => (
                <li key={t}><span className="pp-list-arrow"><IcoCheck /></span>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* How We Use */}
        <div className="pp-card">
          <div className="pp-card-head">
            <div className="pp-card-icon" style={{ background: "linear-gradient(135deg,#7c3aed,#a78bfa)" }}>
              <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h2 className="pp-card-h2">How We Use Your Information</h2>
          </div>
          <p className="pp-body" style={{ marginBottom: 20 }}>We use the information we collect for the following purposes:</p>
          <div className="pp-use-grid">
            {[
              { bg: "rgba(16,185,129,0.06)", bdr: "rgba(16,185,129,0.16)", ico: "linear-gradient(135deg,#064e3b,#059669)", title: "Platform Operation", desc: "To provide, operate, and maintain our platform" },
              { bg: "rgba(249,115,22,0.05)", bdr: "rgba(249,115,22,0.16)", ico: "linear-gradient(135deg,#f97316,#fb923c)", title: "User Experience", desc: "To improve and personalize your experience" },
              { bg: "rgba(59,130,246,0.05)", bdr: "rgba(59,130,246,0.16)", ico: "linear-gradient(135deg,#3b82f6,#60a5fa)", title: "Communication", desc: "To send updates, newsletters, and respond to inquiries" },
              { bg: "rgba(124,58,237,0.04)", bdr: "rgba(124,58,237,0.14)", ico: "linear-gradient(135deg,#7c3aed,#a78bfa)", title: "Analytics", desc: "To analyze usage and improve our services" },
            ].map(({ bg, bdr, ico, title, desc }) => (
              <div key={title} className="pp-use-item" style={{ background: bg, borderColor: bdr }}>
                <div className="pp-use-icon" style={{ background: ico }}>
                  <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <div>
                  <div className="pp-use-h4">{title}</div>
                  <div className="pp-use-p">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Protection */}
        <div className="pp-card">
          <div className="pp-card-head">
            <div className="pp-card-icon" style={{ background: "linear-gradient(135deg,#059669,#34d399)" }}>
              <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h2 className="pp-card-h2">Data Protection & Security</h2>
          </div>
          <p className="pp-body" style={{ marginBottom: 20 }}>We implement appropriate technical and organizational security measures to protect your personal information:</p>
          {[
            { ico: <svg width="20" height="20" fill="none" stroke="#059669" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>, title: "Encryption", desc: "All data transmissions are encrypted using industry-standard SSL/TLS protocols" },
            { ico: <svg width="20" height="20" fill="none" stroke="#059669" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>, title: "Secure Storage", desc: "Your data is stored on secure servers with restricted access" },
            { ico: <svg width="20" height="20" fill="none" stroke="#059669" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>, title: "No Third-Party Sales", desc: "We do not sell, trade, or rent your personal information to third parties" },
          ].map(({ ico, title, desc }) => (
            <div key={title} className="pp-security-item">
              <div style={{ flexShrink: 0, marginTop: 2 }}>{ico}</div>
              <div>
                <div className="pp-security-h4">{title}</div>
                <div className="pp-security-p">{desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Your Rights */}
        <div className="pp-card">
          <div className="pp-card-head">
            <div className="pp-card-icon" style={{ background: "linear-gradient(135deg,#f97316,#fb923c)" }}>
              <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            </div>
            <h2 className="pp-card-h2">Your Privacy Rights</h2>
          </div>
          <p className="pp-body" style={{ marginBottom: 20 }}>You have the following rights regarding your personal information:</p>
          {[
            ["Access","Request a copy of your personal data"],
            ["Correction","Request correction of inaccurate information"],
            ["Deletion","Request deletion of your personal information"],
            ["Opt-out","Unsubscribe from marketing communications"],
          ].map(([tag, text]) => (
            <div key={tag} className="pp-rights-item">
              <span className="pp-rights-tag">{tag}</span>
              <span style={{ fontSize: 15, color: "#4b5563" }}>{text}</span>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="pp-contact-card">
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14, position: "relative", zIndex: 1 }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <h2 className="pp-contact-h2" style={{ margin: 0 }}>Contact Us</h2>
          </div>
          <p className="pp-contact-sub">If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:</p>
          <div className="pp-contact-row">
            <div className="pp-contact-ico">
              <svg width="15" height="15" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            Support: swasthya.medical.akansh@gmail.com
          </div>
          <div className="pp-contact-row">
            <div className="pp-contact-ico">
              <svg width="15" height="15" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
            </div>
            Platform: Swasthya Health Information Portal
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="pp-footer">
        <p>© 2025 SWASTHYA. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;