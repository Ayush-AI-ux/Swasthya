import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PageStyles = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.id = "lm-styles";
    style.textContent = `
      .lm-root { min-height: 100vh; font-family: 'Plus Jakarta Sans', sans-serif; background: #f8faf9; color: #0f1f18; }

      /* NAV */
      .lm-nav { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.93); backdrop-filter: blur(20px); border-bottom: 1px solid #e2ece7; box-shadow: 0 1px 30px rgba(6,78,59,0.06); }
      .lm-nav-inner { max-width: 1160px; margin: 0 auto; padding: 0 32px; height: 68px; display: flex; align-items: center; justify-content: space-between; }
      .lm-nav-brand { display: flex; align-items: center; gap: 12px; cursor: pointer; }
      .lm-logo-wrap { width: 42px; height: 42px; border-radius: 11px; background: white; border: 1px solid #e2ece7; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(6,78,59,0.10); }
      .lm-logo-wrap img { height: 28px; width: auto; object-fit: contain; }
      .lm-brand-name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #064e3b; line-height: 1.1; }
      .lm-brand-tag  { font-family: 'Space Mono', monospace; font-size: 9px; color: #6b7c74; letter-spacing: 0.16em; text-transform: uppercase; }
      .lm-back-btn { display: flex; align-items: center; gap: 8px; padding: 9px 20px; border-radius: 9px; background: transparent; border: 1.5px solid #e2ece7; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600; color: #6b7c74; cursor: pointer; transition: all 0.25s; }
      .lm-back-btn:hover { border-color: #059669; color: #059669; background: rgba(16,185,129,0.04); }

      /* HERO */
      .lm-hero { background: linear-gradient(160deg, #064e3b 0%, #065f46 55%, #047857 100%); padding: 88px 32px 96px; position: relative; overflow: hidden; }
      .lm-hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px); background-size: 32px 32px; pointer-events: none; }
      .lm-hero-blob-a { position: absolute; top: -100px; right: -80px; width: 340px; height: 340px; border-radius: 50%; background: rgba(255,255,255,0.04); pointer-events: none; }
      .lm-hero-blob-b { position: absolute; bottom: -60px; left: 5%; width: 260px; height: 260px; border-radius: 50%; background: rgba(249,115,22,0.09); filter: blur(40px); pointer-events: none; }
      .lm-hero-inner { max-width: 860px; margin: 0 auto; text-align: center; position: relative; z-index: 1; }
      .lm-hero-h1 { font-family: 'Playfair Display', serif; font-size: clamp(2.6rem, 6vw, 4.2rem); font-weight: 800; color: white; letter-spacing: -0.025em; margin-bottom: 18px; line-height: 1.08; }
      .lm-hero-sub { font-size: 18px; color: rgba(255,255,255,0.65); line-height: 1.7; max-width: 560px; margin: 0 auto; }

      /* SECTIONS */
      .lm-section { max-width: 1160px; margin: 0 auto; padding: 72px 32px; }
      .lm-section-label { font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #059669; display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
      .lm-section-label::before { content: ''; display: block; width: 24px; height: 2px; background: #059669; border-radius: 2px; }
      .lm-h2 { font-family: 'Playfair Display', serif; font-size: clamp(1.9rem, 3.5vw, 2.6rem); font-weight: 700; color: #0f1f18; letter-spacing: -0.02em; margin-bottom: 14px; }
      .lm-h2-sub { font-size: 16px; color: #6b7c74; max-width: 520px; line-height: 1.7; }

      /* MISSION CARD */
      .lm-mission-card { background: white; border-radius: 24px; padding: 64px 56px; border: 1px solid #e2ece7; box-shadow: 0 8px 40px rgba(6,78,59,0.07); }
      .lm-mission-head { text-align: center; margin-bottom: 52px; }
      .lm-mission-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 20px; border-radius: 999px; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.20); font-family: 'Space Mono', monospace; font-size: 11px; color: #059669; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 18px; }
      .lm-mission-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
      .lm-mission-item { display: flex; gap: 16px; }
      .lm-mission-ico { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4px 14px rgba(0,0,0,0.10); }
      .lm-mission-h3 { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: #0f1f18; margin-bottom: 8px; }
      .lm-mission-p { font-size: 14px; color: #6b7c74; line-height: 1.7; }

      /* OFFER SECTION */
      .lm-offer-bg { background: white; padding: 72px 32px; }
      .lm-offer-inner { max-width: 1160px; margin: 0 auto; }
      .lm-offer-head { text-align: center; margin-bottom: 52px; }
      .lm-offer-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
      .lm-offer-card { border-radius: 20px; padding: 36px 30px; border: 1px solid; transition: all 0.4s cubic-bezier(0.23,1,0.32,1); }
      .lm-offer-card:hover { transform: translateY(-10px); box-shadow: 0 32px 60px rgba(6,78,59,0.12); }
      .lm-offer-ico-wrap { width: 60px; height: 60px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 22px; font-size: 26px; box-shadow: 0 6px 18px rgba(0,0,0,0.12); }
      .lm-offer-h3 { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #0f1f18; margin-bottom: 16px; }
      .lm-offer-list { list-style: none; padding: 0; }
      .lm-offer-list li { display: flex; align-items: flex-start; gap: 9px; font-size: 14px; color: #6b7c74; margin-bottom: 9px; line-height: 1.55; }
      .lm-offer-check { width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }

      /* SYSTEMS */
      .lm-systems-bg { background: #f8faf9; padding: 72px 32px; }
      .lm-systems-inner { max-width: 1160px; margin: 0 auto; }
      .lm-systems-head { text-align: center; margin-bottom: 48px; }
      .lm-systems-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
      .lm-system-card { background: white; padding: 28px 20px; border-radius: 16px; text-align: center; border: 1.5px solid #e2ece7; transition: all 0.3s cubic-bezier(0.23,1,0.32,1); cursor: default; box-shadow: 0 2px 12px rgba(6,78,59,0.04); }
      .lm-system-card:hover { transform: translateY(-6px); border-color: rgba(16,185,129,0.30); box-shadow: 0 20px 40px rgba(6,78,59,0.10); }
      .lm-system-ico { font-size: 36px; margin-bottom: 10px; display: block; }
      .lm-system-name { font-size: 13px; font-weight: 700; color: #0f1f18; }

      /* HOW IT WORKS */
      .lm-how-bg { background: linear-gradient(160deg, #064e3b 0%, #065f46 50%, #047857 100%); padding: 80px 32px; position: relative; overflow: hidden; }
      .lm-how-grid-bg { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px); background-size: 32px 32px; pointer-events: none; }
      .lm-how-inner { max-width: 1160px; margin: 0 auto; position: relative; z-index: 1; }
      .lm-how-head { text-align: center; margin-bottom: 52px; }
      .lm-how-h2 { font-family: 'Playfair Display', serif; font-size: clamp(1.9rem,3.5vw,2.6rem); font-weight: 700; color: white; letter-spacing: -0.02em; margin-bottom: 12px; }
      .lm-how-sub { font-size: 16px; color: rgba(255,255,255,0.65); }
      .lm-how-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
      .lm-how-card { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; padding: 36px 28px; text-align: center; backdrop-filter: blur(10px); transition: background 0.3s; }
      .lm-how-card:hover { background: rgba(255,255,255,0.12); }
      .lm-how-num { width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg,rgba(16,185,129,0.3),rgba(6,78,59,0.6)); border: 2px solid rgba(16,185,129,0.40); display: flex; align-items: center; justify-content: center; margin: 0 auto 22px; font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #10b981; }
      .lm-how-h3 { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: white; margin-bottom: 12px; }
      .lm-how-p { font-size: 14px; color: rgba(255,255,255,0.65); line-height: 1.7; }

      /* CTA */
      .lm-cta { max-width: 1160px; margin: 0 auto; padding: 72px 32px 96px; }
      .lm-cta-box { background: linear-gradient(135deg, #064e3b 0%, #065f46 55%, #047857 100%); border-radius: 28px; padding: 80px 60px; text-align: center; position: relative; overflow: hidden; }
      .lm-cta-box::before { content: ''; position: absolute; bottom: -40%; left: -10%; width: 120%; height: 80%; background: radial-gradient(ellipse, rgba(16,185,129,0.20) 0%, transparent 70%); pointer-events: none; }
      .lm-cta-box::after  { content: ''; position: absolute; top: -30%; right: -10%; width: 60%; height: 100%; background: radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%); pointer-events: none; }
      .lm-cta-h2 { font-family: 'Playfair Display', serif; font-size: clamp(2rem,4vw,3rem); font-weight: 700; color: white; letter-spacing: -0.025em; margin-bottom: 14px; position: relative; z-index: 1; }
      .lm-cta-sub { font-size: 17px; color: rgba(255,255,255,0.65); max-width: 480px; margin: 0 auto 44px; line-height: 1.75; position: relative; z-index: 1; }
      .lm-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; position: relative; z-index: 1; }
      .lm-cta-btn-w { padding: 15px 40px; border-radius: 10px; font-size: 15px; font-weight: 700; font-family: 'Plus Jakarta Sans', sans-serif; background: white; color: #064e3b; border: none; cursor: pointer; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 18px rgba(0,0,0,0.12); transition: all 0.3s; }
      .lm-cta-btn-w:hover { transform: translateY(-3px); box-shadow: 0 14px 36px rgba(0,0,0,0.20); }
      .lm-cta-btn-t { padding: 15px 40px; border-radius: 10px; font-size: 15px; font-weight: 600; font-family: 'Plus Jakarta Sans', sans-serif; background: transparent; color: white; border: 1.5px solid rgba(255,255,255,0.35); cursor: pointer; transition: all 0.3s; }
      .lm-cta-btn-t:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.6); }

      /* FOOTER */
      .lm-footer { background: #0f1f18; padding: 48px 32px; }
      .lm-footer-inner { max-width: 1160px; margin: 0 auto; text-align: center; }
      .lm-footer-brand { display: flex; align-items: center; gap: 12px; justify-content: center; margin-bottom: 12px; }
      .lm-footer-logo { width: 36px; height: 36px; border-radius: 9px; background: linear-gradient(135deg,#059669,#10b981); display: flex; align-items: center; justify-content: center; }
      .lm-footer-logo img { height: 22px; width: auto; object-fit: contain; }
      .lm-footer-name { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: white; }
      .lm-footer-tag  { font-family: 'Space Mono', monospace; font-size: 9px; color: #10b981; letter-spacing: 0.14em; text-transform: uppercase; }
      .lm-footer-desc { font-size: 13px; color: #94a3a0; margin-bottom: 20px; }
      .lm-footer-copy { font-family: 'Space Mono', monospace; font-size: 11px; color: rgba(148,163,160,0.5); letter-spacing: 0.05em; }

      @media (max-width: 900px) {
        .lm-offer-grid { grid-template-columns: 1fr 1fr; }
        .lm-systems-grid { grid-template-columns: repeat(4, 1fr); }
        .lm-how-grid { grid-template-columns: 1fr; }
        .lm-mission-grid { grid-template-columns: 1fr; }
      }
      @media (max-width: 640px) {
        .lm-mission-card { padding: 40px 28px; }
        .lm-offer-grid { grid-template-columns: 1fr; }
        .lm-systems-grid { grid-template-columns: repeat(2, 1fr); }
        .lm-cta-box { padding: 52px 28px; }
        .lm-hero { padding: 64px 20px 72px; }
        .lm-section { padding: 56px 20px; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(link);
      const s = document.getElementById("lm-styles");
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

const LearnMore = () => {
  const navigate = useNavigate();

  return (
    <div className="lm-root">
      <PageStyles />

      {/* NAV */}
      <nav className="lm-nav">
        <div className="lm-nav-inner">
          <div className="lm-nav-brand" onClick={() => navigate("/")}>
            <div className="lm-logo-wrap"><img src="/logo.png" alt="Swasthya" /></div>
            <div>
              <div className="lm-brand-name">Swasthya</div>
              <div className="lm-brand-tag">Health Made Simple</div>
            </div>
          </div>
          <button className="lm-back-btn" onClick={() => navigate("/")}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Back to Home
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="lm-hero">
        <div className="lm-hero-grid" />
        <div className="lm-hero-blob-a" />
        <div className="lm-hero-blob-b" />
        <div className="lm-hero-inner">
          <h1 className="lm-hero-h1">About Swasthya</h1>
          <p className="lm-hero-sub">Your comprehensive platform for reliable medical information, disease education, and health resources</p>
        </div>
      </section>

      {/* MISSION */}
      <section className="lm-section">
        <div className="lm-mission-card">
          <div className="lm-mission-head">
            <div className="lm-mission-badge">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              Our Mission
            </div>
            <h2 className="lm-h2">Democratizing Health Information</h2>
            <p className="lm-h2-sub" style={{ margin: "0 auto" }}>Swasthya was created to bridge the gap between complex medical knowledge and everyday understanding, making quality health information accessible to everyone.</p>
          </div>
          <div className="lm-mission-grid">
            {[
              { ico: "linear-gradient(135deg,#064e3b,#059669)", svg: <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>, title: "Evidence-Based Content", desc: "All information is carefully curated and verified by medical professionals to ensure accuracy and reliability." },
              { ico: "linear-gradient(135deg,#f97316,#fb923c)", svg: <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>, title: "Easy to Understand", desc: "Complex medical terms explained in simple language that anyone can comprehend and apply." },
              { ico: "linear-gradient(135deg,#3b82f6,#60a5fa)", svg: <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>, title: "Comprehensive Coverage", desc: "Extensive database covering diseases across all major organ systems with detailed information." },
              { ico: "linear-gradient(135deg,#7c3aed,#a78bfa)", svg: <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>, title: "Community Driven", desc: "Built for the community, by medical professionals who understand the importance of health literacy." },
            ].map(({ ico, svg, title, desc }) => (
              <div key={title} className="lm-mission-item">
                <div className="lm-mission-ico" style={{ background: ico }}>{svg}</div>
                <div>
                  <div className="lm-mission-h3">{title}</div>
                  <p className="lm-mission-p">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <div className="lm-offer-bg">
        <div className="lm-offer-inner">
          <div className="lm-offer-head">
            <div className="lm-section-label" style={{ justifyContent: "center" }}>What We Offer</div>
            <h2 className="lm-h2" style={{ textAlign: "center" }}>Comprehensive Health Resources</h2>
            <p className="lm-h2-sub" style={{ textAlign: "center", margin: "0 auto" }}>Comprehensive health resources at your fingertips</p>
          </div>
          <div className="lm-offer-grid">
            {[
              { bg: "rgba(16,185,129,0.06)", bdr: "rgba(16,185,129,0.16)", icoBg: "linear-gradient(135deg,#064e3b,#059669)", ico: "🦠", checkBg: "rgba(16,185,129,0.10)", checkColor: "#059669", title: "Disease Database", items: ["Detailed disease descriptions","Causes and risk factors","Symptoms and clinical features","Pathophysiology explained"] },
              { bg: "rgba(249,115,22,0.05)", bdr: "rgba(249,115,22,0.16)", icoBg: "linear-gradient(135deg,#f97316,#fb923c)", ico: "💊", checkBg: "rgba(249,115,22,0.10)", checkColor: "#f97316", title: "Medical Guidance", items: ["Diagnostic procedures","Treatment options","Medication information","Prognosis and outcomes"] },
              { bg: "rgba(59,130,246,0.05)", bdr: "rgba(59,130,246,0.16)", icoBg: "linear-gradient(135deg,#3b82f6,#60a5fa)", ico: "🛡️", checkBg: "rgba(59,130,246,0.10)", checkColor: "#3b82f6", title: "Prevention & Care", items: ["Preventive measures","Lifestyle modifications","Complications awareness","Health management tips"] },
            ].map(({ bg, bdr, icoBg, ico, checkBg, checkColor, title, items }) => (
              <div key={title} className="lm-offer-card" style={{ background: `linear-gradient(145deg, white 60%, ${bg})`, borderColor: bdr }}>
                <div className="lm-offer-ico-wrap" style={{ background: icoBg }}>{ico}</div>
                <h3 className="lm-offer-h3">{title}</h3>
                <ul className="lm-offer-list">
                  {items.map(item => (
                    <li key={item}>
                      <span className="lm-offer-check" style={{ background: checkBg }}>
                        <svg width="10" height="10" fill="none" stroke={checkColor} strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ORGAN SYSTEMS */}
      <div className="lm-systems-bg">
        <div className="lm-systems-inner">
          <div className="lm-systems-head">
            <div className="lm-section-label" style={{ justifyContent: "center" }}>Complete Coverage</div>
            <h2 className="lm-h2" style={{ textAlign: "center" }}>Complete System Coverage</h2>
            <p className="lm-h2-sub" style={{ textAlign: "center", margin: "0 auto" }}>Comprehensive information across all major organ systems</p>
          </div>
          <div className="lm-systems-grid">
            {[
              { name: "Cardiovascular", icon: "❤️" },
              { name: "Respiratory",    icon: "🫁" },
              { name: "Gastrointestinal",icon: "🫃" },
              { name: "Nervous",        icon: "🧠" },
              { name: "Musculoskeletal",icon: "🦴" },
              { name: "Endocrine",      icon: "⚡" },
              { name: "Renal",          icon: "🫘" },
              { name: "Immune",         icon: "🛡️" },
            ].map(({ name, icon }) => (
              <div key={name} className="lm-system-card">
                <span className="lm-system-ico">{icon}</span>
                <div className="lm-system-name">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="lm-how-bg">
        <div className="lm-how-grid-bg" />
        <div className="lm-how-inner">
          <div className="lm-how-head">
            <h2 className="lm-how-h2">How Swasthya Works</h2>
            <p className="lm-how-sub">Your journey to better health understanding in three simple steps</p>
          </div>
          <div className="lm-how-grid">
            {[
              { num: "1", title: "Sign Up & Explore", desc: "Create your free account and gain immediate access to our comprehensive medical database" },
              { num: "2", title: "Search & Learn", desc: "Browse by organ system or search for specific diseases to access detailed medical information" },
              { num: "3", title: "Stay Informed", desc: "Make better health decisions with reliable, evidence-based information always at your fingertips" },
            ].map(({ num, title, desc }) => (
              <div key={num} className="lm-how-card">
                <div className="lm-how-num">{num}</div>
                <h3 className="lm-how-h3">{title}</h3>
                <p className="lm-how-p">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="lm-cta">
        <div className="lm-cta-box">
          <h2 className="lm-cta-h2">Ready to Start Your Health Journey?</h2>
          <p className="lm-cta-sub">Join Swasthya today and empower yourself with knowledge that matters</p>
          <div className="lm-cta-btns">
            <button onClick={() => navigate("/signup")} className="lm-cta-btn-w">
              Get Started Free <IcoArrow />
            </button>
            <button onClick={() => navigate("/")} className="lm-cta-btn-t">
              Back to Home
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lm-footer">
        <div className="lm-footer-inner">
          <div className="lm-footer-brand">
            <div className="lm-footer-logo"><img src="/logo.png" alt="Swasthya" /></div>
            <div>
              <div className="lm-footer-name">Swasthya</div>
              <div className="lm-footer-tag">Health Made Simple</div>
            </div>
          </div>
          <p className="lm-footer-desc">Your trusted source for medical information and health resources.</p>
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 20 }} />
          <p className="lm-footer-copy">© 2025 SWASTHYA. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
};

export default LearnMore;