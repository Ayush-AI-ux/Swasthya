import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const FactsStyles = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.id = "mf-styles";
    style.textContent = `
      .mf-root { min-height: 100vh; font-family: 'Plus Jakarta Sans', sans-serif; background: #f8faf9; color: #0f1f18; }

      /* NAV */
      .mf-nav { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.93); backdrop-filter: blur(20px); border-bottom: 1px solid #e2ece7; box-shadow: 0 1px 30px rgba(6,78,59,0.06); }
      .mf-nav-inner { max-width: 1160px; margin: 0 auto; padding: 0 32px; height: 68px; display: flex; align-items: center; justify-content: space-between; }
      .mf-nav-left { display: flex; align-items: center; gap: 12px; }
      .mf-logo-wrap { width: 42px; height: 42px; border-radius: 11px; background: white; border: 1px solid #e2ece7; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(6,78,59,0.10); }
      .mf-logo-wrap img { height: 28px; width: auto; object-fit: contain; }
      .mf-brand-name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #064e3b; line-height: 1.1; }
      .mf-brand-tag  { font-family: 'Space Mono', monospace; font-size: 9px; color: #6b7c74; letter-spacing: 0.16em; text-transform: uppercase; }
      .mf-back-btn { display: flex; align-items: center; gap: 8px; padding: 9px 20px; border-radius: 9px; background: transparent; border: 1.5px solid #e2ece7; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600; color: #6b7c74; cursor: pointer; transition: all 0.25s; }
      .mf-back-btn:hover { border-color: #059669; color: #059669; background: rgba(16,185,129,0.04); }

      /* HERO */
      .mf-hero { background: linear-gradient(160deg, #064e3b 0%, #065f46 55%, #047857 100%); padding: 72px 32px 80px; position: relative; overflow: hidden; }
      .mf-hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px); background-size: 32px 32px; pointer-events: none; }
      .mf-hero-blob-a { position: absolute; top: -80px; right: -80px; width: 300px; height: 300px; border-radius: 50%; background: rgba(255,255,255,0.04); pointer-events: none; }
      .mf-hero-blob-b { position: absolute; bottom: -60px; left: 10%; width: 240px; height: 240px; border-radius: 50%; background: rgba(249,115,22,0.09); filter: blur(40px); pointer-events: none; }
      .mf-hero-inner { max-width: 860px; margin: 0 auto; text-align: center; position: relative; z-index: 1; }
      .mf-hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 20px; border-radius: 999px; margin-bottom: 22px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.20); font-family: 'Space Mono', monospace; font-size: 10px; color: rgba(255,255,255,0.88); letter-spacing: 0.14em; text-transform: uppercase; }
      .mf-hero-h1 { font-family: 'Playfair Display', serif; font-size: clamp(2.4rem,5vw,3.8rem); font-weight: 800; color: white; letter-spacing: -0.025em; margin-bottom: 16px; line-height: 1.08; }
      .mf-hero-sub { font-size: 17px; color: rgba(255,255,255,0.65); line-height: 1.7; max-width: 540px; margin: 0 auto; }

      /* CONTENT */
      .mf-content { max-width: 860px; margin: 0 auto; padding: 44px 32px 80px; }

      /* STATS BAR */
      .mf-stats-bar { background: white; border-radius: 16px; padding: 22px 28px; margin-bottom: 28px; border: 1px solid #e2ece7; box-shadow: 0 4px 20px rgba(6,78,59,0.05); display: flex; align-items: center; justify-content: space-between; }
      .mf-stats-left { display: flex; align-items: center; gap: 16px; }
      .mf-stats-ico { width: 50px; height: 50px; border-radius: 13px; background: linear-gradient(135deg,#064e3b,#059669); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(6,78,59,0.22); }
      .mf-stats-label { font-size: 12px; color: #6b7c74; font-weight: 500; margin-bottom: 2px; }
      .mf-stats-num { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 700; color: #0f1f18; line-height: 1; }
      .mf-updated-pill { display: inline-flex; align-items: center; gap: 6px; padding: 6px 16px; border-radius: 999px; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.20); font-family: 'Space Mono', monospace; font-size: 10px; color: #059669; letter-spacing: 0.08em; text-transform: uppercase; }
      .mf-updated-dot { width: 6px; height: 6px; border-radius: 50%; background: #10b981; box-shadow: 0 0 6px #10b981; animation: mfPulse 2.5s ease-in-out infinite; }
      @keyframes mfPulse { 0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,0.4)} 50%{box-shadow:0 0 0 5px rgba(16,185,129,0)} }

      /* LOADING / EMPTY */
      .mf-loader { display: flex; flex-direction: column; align-items: center; padding: 64px 20px; }
      .mf-spin { width: 44px; height: 44px; border-radius: 50%; border: 3px solid rgba(16,185,129,0.15); border-top-color: #059669; animation: mfSpin 0.8s linear infinite; margin-bottom: 16px; }
      @keyframes mfSpin { to { transform: rotate(360deg); } }
      .mf-spin-label { font-size: 14px; color: #6b7c74; font-weight: 500; }
      .mf-empty { background: white; border-radius: 20px; padding: 64px 20px; text-align: center; border: 1px solid #e2ece7; box-shadow: 0 4px 20px rgba(6,78,59,0.05); }
      .mf-empty-ico { width: 80px; height: 80px; border-radius: 50%; background: rgba(16,185,129,0.07); display: flex; align-items: center; justify-content: center; margin: 0 auto 18px; }
      .mf-empty-h3 { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #0f1f18; margin-bottom: 8px; }
      .mf-empty-p  { font-size: 14px; color: #6b7c74; }

      /* FACT CARDS */
      .mf-fact-list { display: flex; flex-direction: column; gap: 16px; margin-bottom: 28px; }
      .mf-fact-card { background: white; border-radius: 18px; padding: 28px 28px; border: 1.5px solid #e2ece7; box-shadow: 0 4px 20px rgba(6,78,59,0.04); transition: all 0.35s cubic-bezier(0.23,1,0.32,1); display: flex; gap: 20px; align-items: flex-start; }
      .mf-fact-card:hover { transform: translateY(-5px); box-shadow: 0 20px 44px rgba(6,78,59,0.10); border-color: rgba(16,185,129,0.25); }
      .mf-fact-num { width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg,#064e3b,#059669); display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: white; flex-shrink: 0; box-shadow: 0 4px 14px rgba(6,78,59,0.22); transition: transform 0.3s; }
      .mf-fact-card:hover .mf-fact-num { transform: scale(1.08); }
      .mf-fact-body { flex: 1; }
      .mf-fact-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 10px; }
      .mf-fact-title { font-family: 'Playfair Display', serif; font-size: 19px; font-weight: 700; color: #0f1f18; letter-spacing: -0.01em; transition: color 0.2s; }
      .mf-fact-card:hover .mf-fact-title { color: #059669; }
      .mf-fact-badge { display: inline-flex; align-items: center; gap: 5px; padding: 4px 12px; border-radius: 999px; background: rgba(16,185,129,0.07); border: 1px solid rgba(16,185,129,0.16); font-family: 'Space Mono', monospace; font-size: 9px; color: #059669; letter-spacing: 0.08em; white-space: nowrap; flex-shrink: 0; }
      .mf-fact-desc { font-size: 15px; color: #4b5563; line-height: 1.78; margin-bottom: 16px; }
      .mf-fact-footer { display: flex; align-items: center; gap: 7px; padding-top: 14px; border-top: 1px solid #f1f5f2; font-size: 12px; color: #9cad9c; font-weight: 500; }

      /* INFO NOTE */
      .mf-note { background: white; border-radius: 18px; padding: 28px 28px; border: 1px solid #e2ece7; border-left: 4px solid #059669; box-shadow: 0 4px 20px rgba(6,78,59,0.05); display: flex; align-items: flex-start; gap: 14px; }
      .mf-note-ico { width: 42px; height: 42px; border-radius: 11px; background: rgba(16,185,129,0.08); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .mf-note-h4 { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: #0f1f18; margin-bottom: 8px; }
      .mf-note-p  { font-size: 14px; color: #4b5563; line-height: 1.75; }

      .mf-footer { background: #0f1f18; padding: 36px 32px; text-align: center; }
      .mf-footer p { font-family: 'Space Mono', monospace; font-size: 11px; color: rgba(148,163,160,0.5); letter-spacing: 0.06em; }

      @media (max-width: 640px) {
        .mf-content { padding: 32px 16px 60px; }
        .mf-hero { padding: 56px 20px 64px; }
        .mf-fact-card { padding: 22px 18px; }
        .mf-stats-bar { flex-direction: column; gap: 14px; align-items: flex-start; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(link);
      const s = document.getElementById("mf-styles");
      if (s) document.head.removeChild(s);
    };
  }, []);
  return null;
};

const MedicalFacts = () => {
  const navigate = useNavigate();
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/medical-facts`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setFacts(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchFacts();
  }, []);

  return (
    <div className="mf-root">
      <FactsStyles />

      {/* NAV */}
      <nav className="mf-nav">
        <div className="mf-nav-inner">
          <div className="mf-nav-left">
            <div className="mf-logo-wrap"><img src="/logo.png" alt="Swasthya" /></div>
            <div>
              <div className="mf-brand-name">Swasthya</div>
              <div className="mf-brand-tag">Health Made Simple</div>
            </div>
          </div>
          <button className="mf-back-btn" onClick={() => navigate(-1)}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Back to Dashboard
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="mf-hero">
        <div className="mf-hero-grid" />
        <div className="mf-hero-blob-a" />
        <div className="mf-hero-blob-b" />
        <div className="mf-hero-inner">
          <div className="mf-hero-badge">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
            Knowledge Base
          </div>
          <h1 className="mf-hero-h1">Medical Facts Library</h1>
          <p className="mf-hero-sub">Discover evidence-based medical information and health facts curated by healthcare professionals</p>
        </div>
      </section>

      {/* CONTENT */}
      <div className="mf-content">

        {/* STATS BAR */}
        {!loading && (
          <div className="mf-stats-bar">
            <div className="mf-stats-left">
              <div className="mf-stats-ico">
                <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
              </div>
              <div>
                <div className="mf-stats-label">Total Medical Facts</div>
                <div className="mf-stats-num">{facts.length}</div>
              </div>
            </div>
            <div className="mf-updated-pill">
              <span className="mf-updated-dot" />
              Updated Daily
            </div>
          </div>
        )}

        {/* MAIN CONTENT */}
        {loading ? (
          <div className="mf-loader">
            <div className="mf-spin" />
            <span className="mf-spin-label">Loading medical facts...</span>
          </div>
        ) : facts.length === 0 ? (
          <div className="mf-empty">
            <div className="mf-empty-ico">
              <svg width="32" height="32" fill="none" stroke="#059669" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
            </div>
            <h3 className="mf-empty-h3">No Medical Facts Available</h3>
            <p className="mf-empty-p">Check back later for new health information!</p>
          </div>
        ) : (
          <>
            <div className="mf-fact-list">
              {facts.map((fact, index) => (
                <div key={fact._id} className="mf-fact-card">
                  <div className="mf-fact-num">{index + 1}</div>
                  <div className="mf-fact-body">
                    <div className="mf-fact-header">
                      <h3 className="mf-fact-title">{fact.title}</h3>
                      <span className="mf-fact-badge">Medical Fact</span>
                    </div>
                    <p className="mf-fact-desc">{fact.description}</p>
                    <div className="mf-fact-footer">
                      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      Verified by medical professionals
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mf-note">
              <div className="mf-note-ico">
                <svg width="20" height="20" fill="none" stroke="#059669" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div>
                <div className="mf-note-h4">Important Note</div>
                <p className="mf-note-p">This information is for educational purposes only and is carefully sourced from trusted and verified medical references. We take great care to ensure the facts shared are accurate and reliable, with the goal of empowering you with credible health knowledge.</p>
              </div>
            </div>
          </>
        )}
      </div>

      <footer className="mf-footer">
        <p>© 2025 SWASTHYA. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
};

export default MedicalFacts;