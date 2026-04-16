import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PageStyles = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.id = "tos-styles";
    style.textContent = `
      .tos-root {
        min-height: 100vh;
        font-family: 'Plus Jakarta Sans', sans-serif;
        background: #f8faf9;
        color: #0f1f18;
      }
      .tos-nav {
        position: sticky; top: 0; z-index: 100;
        background: rgba(255,255,255,0.93);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid #e2ece7;
        box-shadow: 0 1px 30px rgba(6,78,59,0.06);
      }
      .tos-nav-inner {
        max-width: 1160px; margin: 0 auto;
        padding: 0 32px; height: 68px;
        display: flex; align-items: center; justify-content: space-between;
      }
      .tos-nav-brand { display: flex; align-items: center; gap: 12px; cursor: pointer; }
      .tos-logo-wrap {
        width: 42px; height: 42px; border-radius: 11px;
        background: white; border: 1px solid #e2ece7;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 2px 10px rgba(6,78,59,0.10);
      }
      .tos-logo-wrap img { height: 28px; width: auto; object-fit: contain; }
      .tos-brand-name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #064e3b; line-height: 1.1; }
      .tos-brand-tag  { font-family: 'Space Mono', monospace; font-size: 9px; color: #6b7c74; letter-spacing: 0.16em; text-transform: uppercase; }
      .tos-back-btn {
        display: flex; align-items: center; gap: 8px;
        padding: 9px 20px; border-radius: 9px;
        background: transparent; border: 1.5px solid #e2ece7;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 14px; font-weight: 600; color: #6b7c74;
        cursor: pointer; transition: all 0.25s;
      }
      .tos-back-btn:hover { border-color: #059669; color: #059669; background: rgba(16,185,129,0.04); }

      /* HERO */
      .tos-hero {
        background: linear-gradient(160deg, #064e3b 0%, #065f46 55%, #047857 100%);
        padding: 72px 32px 80px; position: relative; overflow: hidden;
      }
      .tos-hero-grid {
        position: absolute; inset: 0;
        background-image:
          linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
        background-size: 32px 32px; pointer-events: none;
      }
      .tos-hero-blob-a { position: absolute; top: -80px; right: -80px; width: 300px; height: 300px; border-radius: 50%; background: rgba(255,255,255,0.04); pointer-events: none; }
      .tos-hero-blob-b { position: absolute; bottom: -60px; left: 10%; width: 240px; height: 240px; border-radius: 50%; background: rgba(249,115,22,0.09); filter: blur(40px); pointer-events: none; }
      .tos-hero-inner { max-width: 860px; margin: 0 auto; text-align: center; position: relative; z-index: 1; }
      .tos-hero-badge {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 8px 20px; border-radius: 999px; margin-bottom: 22px;
        background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.20);
        font-family: 'Space Mono', monospace; font-size: 10px; color: rgba(255,255,255,0.88); letter-spacing: 0.14em; text-transform: uppercase;
      }
      .tos-hero-h1 { font-family: 'Playfair Display', serif; font-size: clamp(2.4rem, 5vw, 3.8rem); font-weight: 800; color: white; letter-spacing: -0.025em; margin-bottom: 16px; line-height: 1.08; }
      .tos-hero-sub { font-size: 17px; color: rgba(255,255,255,0.65); line-height: 1.7; max-width: 500px; margin: 0 auto; }

      /* CONTENT */
      .tos-content { max-width: 860px; margin: 0 auto; padding: 48px 32px 80px; }

      .tos-date-card {
        background: white; border-radius: 16px; padding: 22px 28px;
        border: 1px solid #e2ece7; margin-bottom: 28px;
        display: flex; align-items: center; justify-content: space-between;
        box-shadow: 0 4px 20px rgba(6,78,59,0.06);
        border-left: 4px solid #059669;
      }
      .tos-date-left { display: flex; align-items: center; gap: 14px; }
      .tos-date-icon { width: 46px; height: 46px; border-radius: 12px; background: rgba(16,185,129,0.08); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .tos-date-label { font-size: 13px; font-weight: 700; color: #0f1f18; margin-bottom: 2px; }
      .tos-date-val   { font-size: 13px; color: #6b7c74; }
      .tos-status-pill {
        display: inline-flex; align-items: center; gap: 6px;
        padding: 6px 16px; border-radius: 999px;
        background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.20);
        font-size: 12px; font-weight: 700; color: #059669;
        font-family: 'Space Mono', monospace; letter-spacing: 0.05em;
      }
      .tos-status-dot { width: 6px; height: 6px; border-radius: 50%; background: #10b981; box-shadow: 0 0 6px #10b981; }

      /* CARDS */
      .tos-card {
        background: white; border-radius: 20px; padding: 40px 36px;
        border: 1px solid #e2ece7; margin-bottom: 24px;
        box-shadow: 0 4px 24px rgba(6,78,59,0.05);
        transition: box-shadow 0.3s;
      }
      .tos-card:hover { box-shadow: 0 12px 40px rgba(6,78,59,0.09); }
      .tos-card-head { display: flex; align-items: center; gap: 14px; margin-bottom: 24px; }
      .tos-card-icon { width: 50px; height: 50px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4px 14px rgba(0,0,0,0.10); }
      .tos-card-h2 { font-family: 'Playfair Display', serif; font-size: 1.55rem; font-weight: 700; color: #0f1f18; letter-spacing: -0.015em; }
      .tos-body { font-size: 15px; color: #4b5563; line-height: 1.82; }
      .tos-em { color: #059669; font-weight: 700; }
      .tos-section-label {
        font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #059669;
        display: flex; align-items: center; gap: 8px; margin-bottom: 14px;
      }
      .tos-section-label::before { content: ''; display: block; width: 24px; height: 2px; background: #059669; border-radius: 2px; }

      /* DISCLAIMER BOX */
      .tos-disclaimer {
        border-left: 4px solid #f97316; border-radius: 0 14px 14px 0;
        background: rgba(249,115,22,0.04); padding: 22px 24px; margin-bottom: 20px;
        display: flex; align-items: flex-start; gap: 14px;
      }
      .tos-disclaimer-ico { flex-shrink: 0; margin-top: 2px; }
      .tos-disclaimer-h3 { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: #0f1f18; margin-bottom: 8px; }

      .tos-border-item { border-left: 3px solid; padding-left: 20px; margin-bottom: 20px; }
      .tos-border-item:last-child { margin-bottom: 0; }
      .tos-border-em  { border-color: #059669; }
      .tos-border-cor { border-color: #f97316; }
      .tos-border-blu { border-color: #3b82f6; }
      .tos-item-h3 { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: #0f1f18; margin-bottom: 8px; }

      /* RESPONSIBILITY GRID */
      .tos-resp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
      .tos-resp-item { padding: 18px 20px; border-radius: 14px; display: flex; align-items: flex-start; gap: 12px; border: 1px solid; transition: transform 0.2s; }
      .tos-resp-item:hover { transform: translateY(-2px); }
      .tos-resp-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .tos-resp-h4 { font-size: 14px; font-weight: 700; color: #0f1f18; margin-bottom: 4px; }
      .tos-resp-p  { font-size: 12px; color: #6b7c74; line-height: 1.55; }

      /* LIABILITY */
      .tos-liability {
        border-left: 4px solid #ef4444; border-radius: 0 14px 14px 0;
        background: rgba(239,68,68,0.04); padding: 22px 24px;
      }
      .tos-liability-list { list-style: none; padding: 0; margin: 12px 0 0; }
      .tos-liability-list li { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #4b5563; margin-bottom: 8px; }
      .tos-liability-list li:last-child { margin-bottom: 0; }
      .tos-x-ico { width: 18px; height: 18px; border-radius: 50%; background: rgba(239,68,68,0.12); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

      /* CONTACT */
      .tos-contact-card {
        background: linear-gradient(135deg, #064e3b 0%, #065f46 55%, #047857 100%);
        border-radius: 20px; padding: 44px 40px;
        position: relative; overflow: hidden;
      }
      .tos-contact-card::before { content: ''; position: absolute; top: -60px; right: -60px; width: 220px; height: 220px; border-radius: 50%; background: rgba(255,255,255,0.04); pointer-events: none; }
      .tos-contact-card::after  { content: ''; position: absolute; bottom: -40px; left: -40px; width: 180px; height: 180px; border-radius: 50%; background: rgba(249,115,22,0.10); filter: blur(30px); pointer-events: none; }
      .tos-contact-h2 { font-family: 'Playfair Display', serif; font-size: 1.7rem; font-weight: 700; color: white; margin-bottom: 10px; position: relative; z-index: 1; }
      .tos-contact-sub { font-size: 15px; color: rgba(255,255,255,0.65); margin-bottom: 24px; position: relative; z-index: 1; }
      .tos-contact-row { display: flex; align-items: center; gap: 12px; font-size: 14px; color: rgba(255,255,255,0.80); margin-bottom: 10px; position: relative; z-index: 1; }
      .tos-contact-row:last-child { margin-bottom: 0; }
      .tos-contact-ico { width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0; background: rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; }

      .tos-footer { background: #0f1f18; padding: 36px 32px; text-align: center; }
      .tos-footer p { font-family: 'Space Mono', monospace; font-size: 11px; color: rgba(148,163,160,0.5); letter-spacing: 0.06em; }

      @media (max-width: 640px) {
        .tos-content { padding: 32px 20px 60px; }
        .tos-card { padding: 28px 22px; }
        .tos-resp-grid { grid-template-columns: 1fr; }
        .tos-hero { padding: 56px 20px 64px; }
        .tos-contact-card { padding: 32px 24px; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(link);
      const s = document.getElementById("tos-styles");
      if (s) document.head.removeChild(s);
    };
  }, []);
  return null;
};

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="tos-root">
      <PageStyles />

      {/* NAV */}
      <nav className="tos-nav">
        <div className="tos-nav-inner">
          <div className="tos-nav-brand" onClick={() => navigate("/")}>
            <div className="tos-logo-wrap"><img src="/logo.png" alt="Swasthya" /></div>
            <div>
              <div className="tos-brand-name">Swasthya</div>
              <div className="tos-brand-tag">Health Made Simple</div>
            </div>
          </div>
          <button className="tos-back-btn" onClick={() => navigate("/")}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Back to Home
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="tos-hero">
        <div className="tos-hero-grid" />
        <div className="tos-hero-blob-a" />
        <div className="tos-hero-blob-b" />
        <div className="tos-hero-inner">
          <div className="tos-hero-badge">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            Legal Agreement
          </div>
          <h1 className="tos-hero-h1">Terms of Service</h1>
          <p className="tos-hero-sub">Please read these terms carefully before using our platform</p>
        </div>
      </section>

      {/* CONTENT */}
      <div className="tos-content">

        {/* Date */}
        <div className="tos-date-card">
          <div className="tos-date-left">
            <div className="tos-date-icon">
              <svg width="22" height="22" fill="none" stroke="#059669" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
            <div>
              <div className="tos-date-label">Effective Date</div>
              <div className="tos-date-val">December 29, 2025</div>
            </div>
          </div>
          <div className="tos-status-pill">
            <span className="tos-status-dot" />
            Current Version
          </div>
        </div>

        {/* Agreement */}
        <div className="tos-card">
          <div className="tos-section-label">Introduction</div>
          <h2 className="tos-card-h2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.55rem", fontWeight: 700, color: "#0f1f18", marginBottom: 16 }}>Agreement to Terms</h2>
          <p className="tos-body">Welcome to <span className="tos-em">Swasthya</span>. By accessing or using our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with these terms, please discontinue use of our services immediately.</p>
        </div>

        {/* Educational Purpose */}
        <div className="tos-card">
          <div className="tos-card-head">
            <div className="tos-card-icon" style={{ background: "linear-gradient(135deg,#064e3b,#059669)" }}>
              <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
            </div>
            <h2 className="tos-card-h2">Educational Purpose Only</h2>
          </div>

          <div className="tos-disclaimer">
            <div className="tos-disclaimer-ico">
              <svg width="22" height="22" fill="none" stroke="#f97316" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            </div>
            <div>
              <div className="tos-disclaimer-h3">Important Disclaimer</div>
              <p className="tos-body">All content, information, and materials provided on the Swasthya platform are intended for <strong>educational and informational purposes only</strong>. This content does not constitute, and should not be construed as, professional medical advice, diagnosis, treatment, or any form of healthcare recommendation.</p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              ["Not a Substitute for Professional Care", "The information provided on our platform is not intended to replace consultation with qualified healthcare professionals. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition."],
              ["No Medical Relationship", "Use of this platform does not create a doctor-patient relationship between you and Swasthya or any healthcare professional associated with the platform."],
              ["Emergency Situations", "Never disregard professional medical advice or delay in seeking it because of information you have read on this platform. If you think you may have a medical emergency, call your doctor or emergency services immediately."],
            ].map(([title, text]) => (
              <p key={title} className="tos-body"><strong style={{ color: "#0f1f18" }}>{title}:</strong> {text}</p>
            ))}
          </div>
        </div>

        {/* User Responsibilities */}
        <div className="tos-card">
          <div className="tos-card-head">
            <div className="tos-card-icon" style={{ background: "linear-gradient(135deg,#7c3aed,#a78bfa)" }}>
              <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            </div>
            <h2 className="tos-card-h2">User Responsibilities</h2>
          </div>
          <p className="tos-body" style={{ marginBottom: 20 }}>As a user of the Swasthya platform, you agree to the following responsibilities:</p>
          <div className="tos-resp-grid">
            {[
              { bg: "rgba(16,185,129,0.06)", bdr: "rgba(16,185,129,0.16)", ico: "linear-gradient(135deg,#064e3b,#059669)", title: "Informed Decision-Making", desc: "Exercise independent judgment when evaluating information and consulting healthcare professionals before making health decisions" },
              { bg: "rgba(249,115,22,0.05)", bdr: "rgba(249,115,22,0.16)", ico: "linear-gradient(135deg,#f97316,#fb923c)", title: "Account Security", desc: "Maintain the confidentiality of your account credentials and notify us immediately of any unauthorized access" },
              { bg: "rgba(59,130,246,0.05)", bdr: "rgba(59,130,246,0.16)", ico: "linear-gradient(135deg,#3b82f6,#60a5fa)", title: "Lawful Use", desc: "Use the platform only for lawful purposes and in accordance with these Terms of Service" },
              { bg: "rgba(124,58,237,0.04)", bdr: "rgba(124,58,237,0.14)", ico: "linear-gradient(135deg,#7c3aed,#a78bfa)", title: "Accurate Information", desc: "Provide accurate, current, and complete information when creating an account or using our services" },
            ].map(({ bg, bdr, ico, title, desc }) => (
              <div key={title} className="tos-resp-item" style={{ background: bg, borderColor: bdr }}>
                <div className="tos-resp-icon" style={{ background: ico }}>
                  <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div>
                  <div className="tos-resp-h4">{title}</div>
                  <div className="tos-resp-p">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Rights */}
        <div className="tos-card">
          <div className="tos-card-head">
            <div className="tos-card-icon" style={{ background: "linear-gradient(135deg,#059669,#34d399)" }}>
              <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </div>
            <h2 className="tos-card-h2">Platform Rights & Modifications</h2>
          </div>
          <div className="tos-border-item tos-border-em">
            <h3 className="tos-item-h3">Content Management</h3>
            <p className="tos-body">Swasthya reserves the right to update, modify, remove, or add content on the platform at any time without prior notice. These modifications may be made to ensure accuracy, improve quality, reflect current medical knowledge, or enhance user experience.</p>
          </div>
          <div className="tos-border-item tos-border-cor" style={{ marginTop: 20 }}>
            <h3 className="tos-item-h3">Service Modifications</h3>
            <p className="tos-body">We reserve the right to modify, suspend, or discontinue any aspect of our services, temporarily or permanently, with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the service.</p>
          </div>
          <div className="tos-border-item tos-border-blu" style={{ marginTop: 20 }}>
            <h3 className="tos-item-h3">Terms Updates</h3>
            <p className="tos-body">These Terms of Service may be updated periodically to reflect changes in our practices, legal requirements, or service offerings. Continued use of the platform after such modifications constitutes your acceptance of the updated terms.</p>
          </div>
        </div>

        {/* Intellectual Property */}
        <div className="tos-card">
          <div className="tos-card-head">
            <div className="tos-card-icon" style={{ background: "linear-gradient(135deg,#4f46e5,#818cf8)" }}>
              <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </div>
            <h2 className="tos-card-h2">Intellectual Property Rights</h2>
          </div>
          <p className="tos-body" style={{ marginBottom: 20 }}>All content on the Swasthya platform, including but not limited to text, graphics, logos, images, audio clips, video clips, data compilations, and software, is the property of Swasthya or its content suppliers and is protected by international copyright, trademark, and other intellectual property laws.</p>
          {[
            { ico: <svg width="20" height="20" fill="none" stroke="#4f46e5" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>, title: "Restricted Use", desc: "You may not reproduce, distribute, modify, transmit, or use any content from this platform for commercial purposes without express written permission", bg: "rgba(79,70,229,0.04)", bdr: "rgba(79,70,229,0.12)" },
            { ico: <svg width="20" height="20" fill="none" stroke="#4f46e5" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>, title: "Personal Use", desc: "Content may be viewed and used for personal, non-commercial educational purposes only", bg: "rgba(79,70,229,0.04)", bdr: "rgba(79,70,229,0.12)" },
          ].map(({ ico, title, desc, bg, bdr }) => (
            <div key={title} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "18px 20px", borderRadius: 14, background: bg, border: `1px solid ${bdr}`, marginBottom: 12 }}>
              <div style={{ flexShrink: 0, marginTop: 2 }}>{ico}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f1f18", marginBottom: 3 }}>{title}</div>
                <div style={{ fontSize: 13, color: "#6b7c74", lineHeight: 1.55 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Limitation of Liability */}
        <div className="tos-card">
          <div className="tos-card-head">
            <div className="tos-card-icon" style={{ background: "linear-gradient(135deg,#ef4444,#f87171)" }}>
              <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            </div>
            <h2 className="tos-card-h2">Limitation of Liability</h2>
          </div>
          <div className="tos-liability">
            <p className="tos-body" style={{ marginBottom: 12 }}>To the fullest extent permitted by applicable law, Swasthya and its affiliates, officers, directors, employees, agents, and licensors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:</p>
            <ul className="tos-liability-list">
              {["Loss of profits, data, or use","Personal injury or property damage","Costs of substitute services","Any other damages arising from your use of the platform"].map(t => (
                <li key={t}>
                  <span className="tos-x-ico">
                    <svg width="10" height="10" fill="none" stroke="#ef4444" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div className="tos-contact-card">
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14, position: "relative", zIndex: 1 }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h2 className="tos-contact-h2" style={{ margin: 0 }}>Questions About These Terms?</h2>
          </div>
          <p className="tos-contact-sub">If you have any questions or concerns about these Terms of Service, please don't hesitate to contact us.</p>
          <div className="tos-contact-row">
            <div className="tos-contact-ico"><svg width="15" height="15" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg></div>
            Support: swasthya.medical.akansh@gmail.com
          </div>
          <div className="tos-contact-row">
            <div className="tos-contact-ico"><svg width="15" height="15" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg></div>
            Platform: Swasthya Health Information Portal
          </div>
        </div>
      </div>

      <footer className="tos-footer">
        <p>© 2025 SWASTHYA. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
};

export default TermsOfService;