import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PageStyles = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.id = "ty-styles";
    style.textContent = `
      .ty-root { min-height: 100vh; font-family: 'Plus Jakarta Sans', sans-serif; background: #f8faf9; color: #0f1f18; display: flex; flex-direction: column; }
      .ty-nav { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.93); backdrop-filter: blur(20px); border-bottom: 1px solid #e2ece7; box-shadow: 0 1px 30px rgba(6,78,59,0.06); }
      .ty-nav-inner { max-width: 1160px; margin: 0 auto; padding: 0 32px; height: 68px; display: flex; align-items: center; justify-content: space-between; }
      .ty-nav-brand { display: flex; align-items: center; gap: 12px; cursor: pointer; }
      .ty-logo-wrap { width: 42px; height: 42px; border-radius: 11px; background: white; border: 1px solid #e2ece7; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(6,78,59,0.10); }
      .ty-logo-wrap img { height: 28px; width: auto; object-fit: contain; }
      .ty-brand-name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #064e3b; line-height: 1.1; }
      .ty-brand-tag  { font-family: 'Space Mono', monospace; font-size: 9px; color: #6b7c74; letter-spacing: 0.16em; text-transform: uppercase; }
      .ty-back-btn { display: flex; align-items: center; gap: 8px; padding: 9px 20px; border-radius: 9px; background: transparent; border: 1.5px solid #e2ece7; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600; color: #6b7c74; cursor: pointer; transition: all 0.25s; }
      .ty-back-btn:hover { border-color: #059669; color: #059669; background: rgba(16,185,129,0.04); }

      .ty-main { flex: 1; display: flex; align-items: center; justify-content: center; padding: 60px 32px; position: relative; overflow: hidden; }
      .ty-main-bg {
        position: absolute; inset: 0;
        background:
          radial-gradient(ellipse 60% 50% at 30% 40%, rgba(16,185,129,0.09) 0%, transparent 70%),
          radial-gradient(ellipse 40% 60% at 80% 70%, rgba(6,78,59,0.05) 0%, transparent 70%),
          radial-gradient(ellipse 50% 40% at 10% 80%, rgba(249,115,22,0.04) 0%, transparent 70%),
          #f8faf9;
      }
      .ty-main-grid {
        position: absolute; inset: 0;
        background-image: linear-gradient(rgba(6,78,59,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,78,59,0.04) 1px, transparent 1px);
        background-size: 44px 44px;
        mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
      }

      .ty-card { background: white; border-radius: 28px; padding: 64px 56px; max-width: 620px; width: 100%; text-align: center; position: relative; z-index: 1; border: 1px solid #e2ece7; box-shadow: 0 40px 80px rgba(6,78,59,0.10), 0 1px 0 rgba(255,255,255,1) inset; animation: tyFadeUp 0.65s cubic-bezier(0.23,1,0.32,1) both; }
      @keyframes tyFadeUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }

      .ty-icon-wrap { width: 96px; height: 96px; border-radius: 50%; background: linear-gradient(135deg, rgba(16,185,129,0.12), rgba(6,78,59,0.06)); border: 2px solid rgba(16,185,129,0.20); display: flex; align-items: center; justify-content: center; margin: 0 auto 32px; position: relative; }
      .ty-icon-wrap::before { content: ''; position: absolute; inset: -8px; border-radius: 50%; border: 1px solid rgba(16,185,129,0.12); animation: tyRipple 2.5s ease-out infinite; }
      .ty-icon-wrap::after  { content: ''; position: absolute; inset: -16px; border-radius: 50%; border: 1px solid rgba(16,185,129,0.07); animation: tyRipple 2.5s ease-out 1.25s infinite; }
      @keyframes tyRipple { 0%{opacity:1;transform:scale(1)} 100%{opacity:0;transform:scale(1.5)} }
      .ty-icon-inner { width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #064e3b, #059669); display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 24px rgba(6,78,59,0.30), inset 0 2px 0 rgba(255,255,255,0.18); }

      .ty-tag { display: inline-flex; align-items: center; gap: 7px; padding: 6px 16px; border-radius: 999px; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.20); font-family: 'Space Mono', monospace; font-size: 10px; color: #059669; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 18px; }
      .ty-tag-dot { width: 6px; height: 6px; border-radius: 50%; background: #10b981; animation: tyPulse 2.5s ease-in-out infinite; }
      @keyframes tyPulse { 0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,0.4)} 50%{box-shadow:0 0 0 5px rgba(16,185,129,0)} }

      .ty-h1 { font-family: 'Playfair Display', serif; font-size: clamp(1.9rem, 4vw, 2.7rem); font-weight: 800; color: #0f1f18; letter-spacing: -0.025em; margin-bottom: 14px; line-height: 1.1; }
      .ty-em { background: linear-gradient(135deg, #064e3b, #059669); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .ty-sub { font-size: 16px; color: #6b7c74; line-height: 1.75; max-width: 420px; margin: 0 auto 32px; }
      .ty-sub strong { color: #059669; font-weight: 700; }

      .ty-info-row { display: flex; align-items: center; gap: 12px; padding: 16px 20px; border-radius: 12px; background: rgba(16,185,129,0.05); border: 1px solid rgba(16,185,129,0.12); margin-bottom: 32px; text-align: left; }
      .ty-info-ico { width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg,#064e3b,#059669); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .ty-info-text { font-size: 14px; color: #4b5563; line-height: 1.55; }

      .ty-cta { display: inline-flex; align-items: center; gap: 9px; padding: 14px 36px; border-radius: 12px; border: none; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; font-weight: 700; color: white; background: linear-gradient(135deg, #064e3b 0%, #065f46 100%); box-shadow: 0 8px 24px rgba(6,78,59,0.28), inset 0 1px 0 rgba(255,255,255,0.12); transition: all 0.3s cubic-bezier(0.23,1,0.32,1); position: relative; overflow: hidden; }
      .ty-cta::after { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent); transition: left 0.5s; }
      .ty-cta:hover { transform: translateY(-3px); box-shadow: 0 16px 36px rgba(6,78,59,0.35), inset 0 1px 0 rgba(255,255,255,0.12); }
      .ty-cta:hover::after { left: 100%; }

      .ty-footer { background: #0f1f18; padding: 36px 32px; text-align: center; }
      .ty-footer p { font-family: 'Space Mono', monospace; font-size: 11px; color: rgba(148,163,160,0.5); letter-spacing: 0.06em; }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(link);
      const s = document.getElementById("ty-styles");
      if (s) document.head.removeChild(s);
    };
  }, []);
  return null;
};

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="ty-root">
      <PageStyles />

      {/* NAV */}
      <nav className="ty-nav">
        <div className="ty-nav-inner">
          <div className="ty-nav-brand" onClick={() => navigate("/")}>
            <div className="ty-logo-wrap"><img src="/logo.png" alt="Swasthya" /></div>
            <div>
              <div className="ty-brand-name">Swasthya</div>
              <div className="ty-brand-tag">Health Made Simple</div>
            </div>
          </div>
          <button className="ty-back-btn" onClick={() => navigate("/")}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Back to Home
          </button>
        </div>
      </nav>

      {/* MAIN */}
      <main className="ty-main">
        <div className="ty-main-bg" />
        <div className="ty-main-grid" />

        <div className="ty-card">
          {/* Animated check icon */}
          <div className="ty-icon-wrap">
            <div className="ty-icon-inner">
              <svg width="32" height="32" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7"/>
              </svg>
            </div>
          </div>

          <div className="ty-tag">
            <span className="ty-tag-dot" />
            Message Sent
          </div>

          <h1 className="ty-h1">
            Thanks for <span className="ty-em">Reaching Out!</span>
          </h1>

          <p className="ty-sub">
            Your message has been successfully sent. Our support team will review it and get back to you within <strong>24–48 hours</strong>.
          </p>

          <div className="ty-info-row">
            <div className="ty-info-ico">
              <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <p className="ty-info-text">You'll receive a confirmation email shortly at the address you provided.</p>
          </div>

          <button className="ty-cta" onClick={() => navigate("/")}>
            Return to Home
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="ty-footer">
        <p>© 2025 SWASTHYA. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
};

export default ThankYou;