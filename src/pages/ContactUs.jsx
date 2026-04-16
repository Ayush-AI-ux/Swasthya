import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PageStyles = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.id = "cu-styles";
    style.textContent = `
      .cu-root { min-height: 100vh; font-family: 'Plus Jakarta Sans', sans-serif; background: #f8faf9; color: #0f1f18; }

      /* NAV */
      .cu-nav { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.93); backdrop-filter: blur(20px); border-bottom: 1px solid #e2ece7; box-shadow: 0 1px 30px rgba(6,78,59,0.06); }
      .cu-nav-inner { max-width: 1160px; margin: 0 auto; padding: 0 32px; height: 68px; display: flex; align-items: center; justify-content: space-between; }
      .cu-nav-brand { display: flex; align-items: center; gap: 12px; cursor: pointer; }
      .cu-logo-wrap { width: 42px; height: 42px; border-radius: 11px; background: white; border: 1px solid #e2ece7; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(6,78,59,0.10); }
      .cu-logo-wrap img { height: 28px; width: auto; object-fit: contain; }
      .cu-brand-name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #064e3b; line-height: 1.1; }
      .cu-brand-tag  { font-family: 'Space Mono', monospace; font-size: 9px; color: #6b7c74; letter-spacing: 0.16em; text-transform: uppercase; }
      .cu-back-btn { display: flex; align-items: center; gap: 8px; padding: 9px 20px; border-radius: 9px; background: transparent; border: 1.5px solid #e2ece7; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600; color: #6b7c74; cursor: pointer; transition: all 0.25s; }
      .cu-back-btn:hover { border-color: #059669; color: #059669; background: rgba(16,185,129,0.04); }

      /* HERO */
      .cu-hero { background: linear-gradient(160deg, #064e3b 0%, #065f46 55%, #047857 100%); padding: 72px 32px 80px; position: relative; overflow: hidden; }
      .cu-hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px); background-size: 32px 32px; pointer-events: none; }
      .cu-hero-blob-a { position: absolute; top: -80px; right: -80px; width: 300px; height: 300px; border-radius: 50%; background: rgba(255,255,255,0.04); pointer-events: none; }
      .cu-hero-blob-b { position: absolute; bottom: -60px; left: 10%; width: 240px; height: 240px; border-radius: 50%; background: rgba(249,115,22,0.09); filter: blur(40px); pointer-events: none; }
      .cu-hero-inner { max-width: 860px; margin: 0 auto; text-align: center; position: relative; z-index: 1; }
      .cu-hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 20px; border-radius: 999px; margin-bottom: 22px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.20); font-family: 'Space Mono', monospace; font-size: 10px; color: rgba(255,255,255,0.88); letter-spacing: 0.14em; text-transform: uppercase; }
      .cu-hero-h1 { font-family: 'Playfair Display', serif; font-size: clamp(2.4rem,5vw,3.8rem); font-weight: 800; color: white; letter-spacing: -0.025em; margin-bottom: 16px; line-height: 1.08; }
      .cu-hero-sub { font-size: 17px; color: rgba(255,255,255,0.65); line-height: 1.7; max-width: 500px; margin: 0 auto; }

      /* CONTENT */
      .cu-content { max-width: 1060px; margin: 0 auto; padding: 52px 32px 80px; }
      .cu-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 24px; align-items: start; }

      /* INFO COLUMN */
      .cu-card { background: white; border-radius: 20px; padding: 32px 30px; border: 1px solid #e2ece7; box-shadow: 0 4px 24px rgba(6,78,59,0.05); margin-bottom: 20px; transition: box-shadow 0.3s; }
      .cu-card:hover { box-shadow: 0 12px 40px rgba(6,78,59,0.09); }
      .cu-card:last-child { margin-bottom: 0; }
      .cu-card-head { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; }
      .cu-card-ico { width: 46px; height: 46px; border-radius: 13px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.10); }
      .cu-card-h2 { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #0f1f18; }
      .cu-card-p { font-size: 14px; color: #6b7c74; line-height: 1.7; margin-bottom: 14px; }
      .cu-email-link { display: inline-flex; align-items: center; gap: 7px; font-size: 14px; font-weight: 600; color: #059669; text-decoration: none; transition: color 0.2s; }
      .cu-email-link:hover { color: #064e3b; }
      .cu-email-link svg { transition: transform 0.2s; }
      .cu-email-link:hover svg { transform: translateX(3px); }

      /* QUICK INFO PAIR */
      .cu-quick-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; }
      .cu-quick-card { background: white; border-radius: 16px; padding: 22px 20px; border: 1px solid #e2ece7; box-shadow: 0 2px 12px rgba(6,78,59,0.04); }
      .cu-quick-ico { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.08); }
      .cu-quick-label { font-size: 13px; font-weight: 700; color: #0f1f18; margin-bottom: 3px; }
      .cu-quick-val   { font-size: 12px; color: #6b7c74; }

      /* DISCLAIMER */
      .cu-disclaimer { background: white; border-radius: 20px; padding: 28px 28px; border: 1px solid #e2ece7; border-left: 4px solid #f97316; box-shadow: 0 4px 24px rgba(6,78,59,0.05); }
      .cu-disclaimer-head { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 10px; }
      .cu-disclaimer-ico { width: 42px; height: 42px; border-radius: 12px; background: rgba(249,115,22,0.10); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .cu-disclaimer-h3 { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: #0f1f18; margin-bottom: 3px; padding-top: 2px; }
      .cu-disclaimer-p { font-size: 13px; color: #6b7c74; line-height: 1.7; }

      /* FORM CARD */
      .cu-form-card { background: white; border-radius: 20px; padding: 36px 32px; border: 1px solid #e2ece7; box-shadow: 0 4px 24px rgba(6,78,59,0.05); }
      .cu-form-head { display: flex; align-items: center; gap: 14px; margin-bottom: 28px; }
      .cu-form-ico { width: 46px; height: 46px; border-radius: 13px; background: linear-gradient(135deg,#7c3aed,#a78bfa); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(124,58,237,0.22); }
      .cu-form-h2 { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #0f1f18; }

      /* FORM FIELDS */
      .cu-field { margin-bottom: 18px; }
      .cu-field-label { display: block; font-size: 12px; font-weight: 600; color: #0f1f18; letter-spacing: 0.04em; margin-bottom: 7px; text-transform: uppercase; font-family: 'Space Mono', monospace; }
      .cu-field-req { color: #ef4444; margin-left: 2px; }
      .cu-input-wrap { position: relative; }
      .cu-input-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #9cad9c; pointer-events: none; display: flex; align-items: center; transition: color 0.2s; }
      .cu-textarea-icon { position: absolute; left: 14px; top: 14px; color: #9cad9c; pointer-events: none; transition: color 0.2s; }
      .cu-input {
        width: 100%; padding: 13px 16px 13px 44px;
        border: 1.5px solid #e2ece7; border-radius: 12px;
        font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px;
        color: #0f1f18; background: #f8faf9; outline: none; transition: all 0.25s;
      }
      .cu-input::placeholder { color: #9cad9c; }
      .cu-input:focus { border-color: #059669; background: white; box-shadow: 0 0 0 4px rgba(16,185,129,0.10); }
      .cu-input-wrap:focus-within .cu-input-icon,
      .cu-input-wrap:focus-within .cu-textarea-icon { color: #059669; }
      .cu-textarea { width: 100%; padding: 13px 16px 13px 44px; border: 1.5px solid #e2ece7; border-radius: 12px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; color: #0f1f18; background: #f8faf9; outline: none; transition: all 0.25s; resize: none; }
      .cu-textarea::placeholder { color: #9cad9c; }
      .cu-textarea:focus { border-color: #059669; background: white; box-shadow: 0 0 0 4px rgba(16,185,129,0.10); }

      /* SUBMIT */
      .cu-submit {
        width: 100%; padding: 14px; border-radius: 12px; border: none; cursor: pointer;
        font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; font-weight: 700; color: white;
        background: linear-gradient(135deg, #064e3b 0%, #065f46 100%);
        display: flex; align-items: center; justify-content: center; gap: 9px;
        box-shadow: 0 8px 24px rgba(6,78,59,0.28), inset 0 1px 0 rgba(255,255,255,0.12);
        transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
        position: relative; overflow: hidden;
      }
      .cu-submit::after { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent); transition: left 0.5s; }
      .cu-submit:hover { transform: translateY(-2px); box-shadow: 0 16px 36px rgba(6,78,59,0.35), inset 0 1px 0 rgba(255,255,255,0.12); }
      .cu-submit:hover::after { left: 100%; }
      .cu-submit:active { transform: translateY(0); }
      .cu-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
      @keyframes cuSpin { to { transform: rotate(360deg); } }
      .cu-spinner { animation: cuSpin 0.9s linear infinite; }

      /* FOOTER */
      .cu-footer { background: #0f1f18; padding: 36px 32px; text-align: center; }
      .cu-footer p { font-family: 'Space Mono', monospace; font-size: 11px; color: rgba(148,163,160,0.5); letter-spacing: 0.06em; }

      @media (max-width: 768px) {
        .cu-grid { grid-template-columns: 1fr; }
        .cu-content { padding: 36px 20px 60px; }
        .cu-hero { padding: 56px 20px 64px; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(link);
      const s = document.getElementById("cu-styles");
      if (s) document.head.removeChild(s);
    };
  }, []);
  return null;
};

const ContactUs = () => {
  // ✅ STATE
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ SUBMIT HANDLER WITH REAL API CALL
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/contact/send-query`, {
        name,
        email,
        message,
      });

      // Clear form
      setName("");
      setEmail("");
      setMessage("");

      // Redirect to thank you page
      navigate("/thanks-for-reaching-us");
    } catch (error) {
      console.error("Error sending query:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cu-root">
      <PageStyles />

      {/* NAV */}
      <nav className="cu-nav">
        <div className="cu-nav-inner">
          <div className="cu-nav-brand" onClick={() => navigate("/")}>
            <div className="cu-logo-wrap"><img src="/logo.png" alt="Swasthya" /></div>
            <div>
              <div className="cu-brand-name">Swasthya</div>
              <div className="cu-brand-tag">Health Made Simple</div>
            </div>
          </div>
          <button className="cu-back-btn" onClick={() => window.history.back()}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Back to Home
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="cu-hero">
        <div className="cu-hero-grid" />
        <div className="cu-hero-blob-a" />
        <div className="cu-hero-blob-b" />
        <div className="cu-hero-inner">
          <div className="cu-hero-badge">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            Get In Touch
          </div>
          <h1 className="cu-hero-h1">Contact Us</h1>
          <p className="cu-hero-sub">We'd love to hear from you. Reach out for questions, feedback, or collaboration.</p>
        </div>
      </section>

      {/* CONTENT */}
      <div className="cu-content">
        <div className="cu-grid">

          {/* LEFT — info */}
          <div>
            {/* Email */}
            <div className="cu-card">
              <div className="cu-card-head">
                <div className="cu-card-ico" style={{ background: "linear-gradient(135deg,#064e3b,#059669)" }}>
                  <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <h2 className="cu-card-h2">Email Us</h2>
              </div>
              <p className="cu-card-p">Send us an email and we'll get back to you as soon as possible.</p>
              <a href="mailto:swasthya.medical.akansh@gmail.com" className="cu-email-link">
                <span>swasthya.medical.akansh@gmail.com</span>
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
              </a>
            </div>

            {/* Quick info */}
            <div className="cu-quick-pair">
              <div className="cu-quick-card">
                <div className="cu-quick-ico" style={{ background: "linear-gradient(135deg,#3b82f6,#60a5fa)" }}>
                  <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div className="cu-quick-label">Response Time</div>
                <div className="cu-quick-val">Within 24–48 hours</div>
              </div>
              <div className="cu-quick-card">
                <div className="cu-quick-ico" style={{ background: "linear-gradient(135deg,#f97316,#fb923c)" }}>
                  <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/></svg>
                </div>
                <div className="cu-quick-label">Support</div>
                <div className="cu-quick-val">7 days a week</div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="cu-disclaimer">
              <div className="cu-disclaimer-head">
                <div className="cu-disclaimer-ico">
                  <svg width="20" height="20" fill="none" stroke="#f97316" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                </div>
                <div>
                  <div className="cu-disclaimer-h3">Important Disclaimer</div>
                </div>
              </div>
              <p className="cu-disclaimer-p">This information is for educational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>
            </div>
          </div>

          {/* RIGHT — form */}
          <div>
            <div className="cu-form-card">
              <div className="cu-form-head">
                <div className="cu-form-ico">
                  <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                </div>
                <h2 className="cu-form-h2">Send Us a Message</h2>
              </div>

              {/* 🔹 FORM WITH onSubmit */}
              <form onSubmit={handleSubmit}>
                <div className="cu-field">
                  <label className="cu-field-label">Your Name <span className="cu-field-req">*</span></label>
                  <div className="cu-input-wrap">
                    <input
                      type="text" required value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="cu-input"
                    />
                    <span className="cu-input-icon">
                      <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                    </span>
                  </div>
                </div>

                <div className="cu-field">
                  <label className="cu-field-label">Your Email <span className="cu-field-req">*</span></label>
                  <div className="cu-input-wrap">
                    <input
                      type="email" required value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="cu-input"
                    />
                    <span className="cu-input-icon">
                      <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </span>
                  </div>
                </div>

                <div className="cu-field" style={{ marginBottom: 24 }}>
                  <label className="cu-field-label">Your Query <span className="cu-field-req">*</span></label>
                  <div className="cu-input-wrap">
                    <textarea
                      rows={5} required value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us how we can help you..."
                      className="cu-textarea"
                    />
                    <span className="cu-textarea-icon">
                      <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
                    </span>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="cu-submit">
                  {loading ? (
                    <>
                      <svg className="cu-spinner" width="18" height="18" fill="none" viewBox="0 0 24 24">
                        <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Submit Query
                      <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="cu-footer">
        <p>© 2025 SWASTHYA. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
};

export default ContactUs;