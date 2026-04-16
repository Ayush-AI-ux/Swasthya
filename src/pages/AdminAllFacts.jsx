import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AddFactModal from "../components/AddFactModal";

const AdminFactsStyles = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.id = "aaf-styles";
    style.textContent = `
      .aaf-root { min-height: 100vh; font-family: 'Plus Jakarta Sans', sans-serif; background: #f8faf9; color: #0f1f18; }
      .aaf-nav { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.93); backdrop-filter: blur(20px); border-bottom: 1px solid #e2ece7; box-shadow: 0 1px 30px rgba(6,78,59,0.06); }
      .aaf-nav-inner { max-width: 1160px; margin: 0 auto; padding: 0 32px; height: 68px; display: flex; align-items: center; justify-content: space-between; }
      .aaf-nav-left { display: flex; align-items: center; gap: 12px; }
      .aaf-nav-mark { width: 42px; height: 42px; border-radius: 11px; background: linear-gradient(135deg,#064e3b,#059669); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(6,78,59,0.25); }
      .aaf-brand-name { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #064e3b; line-height: 1.1; }
      .aaf-brand-tag  { font-family: 'Space Mono', monospace; font-size: 9px; color: #6b7c74; letter-spacing: 0.16em; text-transform: uppercase; }
      .aaf-back-btn { display: flex; align-items: center; gap: 8px; padding: 9px 20px; border-radius: 9px; background: transparent; border: 1.5px solid #e2ece7; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600; color: #6b7c74; cursor: pointer; transition: all 0.25s; }
      .aaf-back-btn:hover { border-color: #059669; color: #059669; background: rgba(16,185,129,0.04); }

      .aaf-hero { background: linear-gradient(160deg,#064e3b 0%,#065f46 55%,#047857 100%); padding: 68px 32px 76px; position: relative; overflow: hidden; }
      .aaf-hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px); background-size: 32px 32px; pointer-events: none; }
      .aaf-hero-blob-a { position: absolute; top: -80px; right: -80px; width: 300px; height: 300px; border-radius: 50%; background: rgba(255,255,255,0.04); pointer-events: none; }
      .aaf-hero-blob-b { position: absolute; bottom: -60px; left: 10%; width: 240px; height: 240px; border-radius: 50%; background: rgba(249,115,22,0.09); filter: blur(40px); pointer-events: none; }
      .aaf-hero-inner { max-width: 1160px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 24px; position: relative; z-index: 1; flex-wrap: wrap; }
      .aaf-hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 7px 18px; border-radius: 999px; margin-bottom: 16px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.20); font-family: 'Space Mono', monospace; font-size: 10px; color: rgba(255,255,255,0.88); letter-spacing: 0.14em; text-transform: uppercase; }
      .aaf-hero-h1 { font-family: 'Playfair Display', serif; font-size: clamp(2rem,4vw,3rem); font-weight: 800; color: white; letter-spacing: -0.025em; margin-bottom: 10px; line-height: 1.1; }
      .aaf-hero-sub { font-size: 15px; color: rgba(255,255,255,0.65); line-height: 1.7; max-width: 400px; }
      .aaf-hero-stat { background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.18); border-radius: 16px; padding: 20px 28px; text-align: center; flex-shrink: 0; }
      .aaf-hero-stat-num { font-family: 'Playfair Display', serif; font-size: 2.4rem; font-weight: 800; color: white; line-height: 1; }
      .aaf-hero-stat-label { font-size: 12px; color: rgba(255,255,255,0.60); margin-top: 4px; font-weight: 500; }

      .aaf-content { max-width: 1160px; margin: 0 auto; padding: 40px 32px 80px; }
      .aaf-card { background: white; border-radius: 20px; padding: 32px; border: 1px solid #e2ece7; box-shadow: 0 4px 24px rgba(6,78,59,0.05); }
      .aaf-card-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; flex-wrap: wrap; gap: 14px; }
      .aaf-card-label { font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #059669; display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
      .aaf-card-label::before { content: ''; display: block; width: 24px; height: 2px; background: #059669; border-radius: 2px; }
      .aaf-card-h3 { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; color: #0f1f18; margin-bottom: 4px; }
      .aaf-card-sub { font-size: 13px; color: #6b7c74; }
      .aaf-add-btn { display: flex; align-items: center; gap: 8px; padding: 12px 24px; border-radius: 11px; background: linear-gradient(135deg,#064e3b,#065f46); color: white; border: none; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600; box-shadow: 0 4px 14px rgba(6,78,59,0.22); transition: all 0.25s; white-space: nowrap; }
      .aaf-add-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(6,78,59,0.32); }

      .aaf-loader { display: flex; flex-direction: column; align-items: center; padding: 64px 20px; }
      .aaf-spin { width: 44px; height: 44px; border-radius: 50%; border: 3px solid rgba(16,185,129,0.15); border-top-color: #059669; animation: aafSpin 0.8s linear infinite; margin-bottom: 16px; }
      @keyframes aafSpin { to { transform: rotate(360deg); } }
      .aaf-spin-label { font-size: 14px; color: #6b7c74; font-weight: 500; }

      .aaf-empty { text-align: center; padding: 56px 20px; }
      .aaf-empty-ico { width: 80px; height: 80px; border-radius: 50%; background: rgba(16,185,129,0.07); display: flex; align-items: center; justify-content: center; margin: 0 auto 18px; }
      .aaf-empty-h4 { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #0f1f18; margin-bottom: 8px; }
      .aaf-empty-p  { font-size: 14px; color: #6b7c74; margin-bottom: 20px; }
      .aaf-empty-btn { padding: 11px 24px; border-radius: 10px; background: linear-gradient(135deg,#064e3b,#059669); color: white; border: none; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600; box-shadow: 0 4px 14px rgba(6,78,59,0.22); transition: all 0.25s; }
      .aaf-empty-btn:hover { transform: translateY(-2px); }

      .aaf-facts-list { display: flex; flex-direction: column; gap: 16px; }
      .aaf-fact-card { border-radius: 16px; padding: 24px 26px; border: 1.5px solid #e2ece7; background: white; transition: all 0.35s cubic-bezier(0.23,1,0.32,1); display: flex; gap: 18px; align-items: flex-start; }
      .aaf-fact-card:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(6,78,59,0.10); border-color: rgba(16,185,129,0.25); }
      .aaf-fact-num { width: 50px; height: 50px; border-radius: 13px; background: linear-gradient(135deg,#064e3b,#059669); display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: white; flex-shrink: 0; box-shadow: 0 4px 14px rgba(6,78,59,0.22); transition: transform 0.3s; }
      .aaf-fact-card:hover .aaf-fact-num { transform: scale(1.08); }
      .aaf-fact-body { flex: 1; }
      .aaf-fact-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 8px; }
      .aaf-fact-title { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #0f1f18; letter-spacing: -0.01em; transition: color 0.2s; }
      .aaf-fact-card:hover .aaf-fact-title { color: #059669; }
      .aaf-fact-badge { display: inline-flex; padding: 3px 12px; border-radius: 999px; background: rgba(16,185,129,0.07); border: 1px solid rgba(16,185,129,0.16); font-family: 'Space Mono', monospace; font-size: 9px; color: #059669; letter-spacing: 0.08em; white-space: nowrap; flex-shrink: 0; }
      .aaf-fact-desc { font-size: 14px; color: #4b5563; line-height: 1.75; margin-bottom: 16px; }
      .aaf-fact-actions { display: flex; gap: 10px; flex-wrap: wrap; padding-top: 14px; border-top: 1px solid #f1f5f2; }
      .aaf-edit-btn { display: flex; align-items: center; gap: 7px; padding: 9px 20px; border-radius: 9px; background: linear-gradient(135deg,#7c3aed,#a78bfa); color: white; border: none; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 600; box-shadow: 0 3px 10px rgba(124,58,237,0.22); transition: all 0.25s; }
      .aaf-edit-btn:hover { transform: translateY(-2px); box-shadow: 0 7px 18px rgba(124,58,237,0.32); }
      .aaf-del-btn  { display: flex; align-items: center; gap: 7px; padding: 9px 20px; border-radius: 9px; background: linear-gradient(135deg,#ef4444,#f87171); color: white; border: none; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 600; box-shadow: 0 3px 10px rgba(239,68,68,0.20); transition: all 0.25s; }
      .aaf-del-btn:hover { transform: translateY(-2px); box-shadow: 0 7px 18px rgba(239,68,68,0.30); }

      /* INFO CARDS */
      .aaf-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 20px; }
      .aaf-info-card { background: white; border-radius: 16px; padding: 22px 22px; border: 1px solid #e2ece7; display: flex; align-items: flex-start; gap: 14px; box-shadow: 0 2px 12px rgba(6,78,59,0.04); }
      .aaf-info-ico { width: 42px; height: 42px; border-radius: 11px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .aaf-info-h4 { font-size: 14px; font-weight: 700; color: #0f1f18; margin-bottom: 4px; }
      .aaf-info-p  { font-size: 13px; color: #6b7c74; line-height: 1.55; }

      .aaf-footer { background: #0f1f18; padding: 36px 32px; text-align: center; }
      .aaf-footer p { font-family: 'Space Mono', monospace; font-size: 11px; color: rgba(148,163,160,0.5); letter-spacing: 0.06em; }

      @media (max-width: 640px) {
        .aaf-content { padding: 28px 16px 60px; }
        .aaf-card { padding: 22px 18px; }
        .aaf-info-grid { grid-template-columns: 1fr; }
        .aaf-hero { padding: 52px 20px 60px; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(link);
      const s = document.getElementById("aaf-styles");
      if (s) document.head.removeChild(s);
    };
  }, []);
  return null;
};

const AdminAllFacts = () => {
  const navigate = useNavigate();
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddFact, setShowAddFact] = useState(false);
  const [showEditFact, setShowEditFact] = useState(false);
  const [factToEdit, setFactToEdit] = useState(null);

  useEffect(() => {
    fetchFacts();
  }, []);

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

  const deleteFact = async (factId) => {
    if (!window.confirm("Delete this fact?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/medical-facts/${factId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setFacts(facts.filter(f => f._id !== factId));
      alert("Fact deleted!");
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleEdit = (fact) => {
    setFactToEdit(fact);
    setShowEditFact(true);
  };

  return (
    <div className="aaf-root">
      <AdminFactsStyles />

      {/* NAV */}
      <nav className="aaf-nav">
        <div className="aaf-nav-inner">
          <div className="aaf-nav-left">
            <div className="aaf-nav-mark">
              <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <div>
              <div className="aaf-brand-name">Swasthya Admin</div>
              <div className="aaf-brand-tag">Management Portal</div>
            </div>
          </div>
          <button className="aaf-back-btn" onClick={() => navigate(-1)}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Back to Dashboard
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="aaf-hero">
        <div className="aaf-hero-grid" />
        <div className="aaf-hero-blob-a" />
        <div className="aaf-hero-blob-b" />
        <div className="aaf-hero-inner">
          <div>
            <div className="aaf-hero-badge">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
              Knowledge Base
            </div>
            <h1 className="aaf-hero-h1">Medical Facts Library</h1>
            <p className="aaf-hero-sub">Manage educational content and health facts for your users</p>
          </div>
          {!loading && (
            <div className="aaf-hero-stat">
              <div className="aaf-hero-stat-num">{facts.length}</div>
              <div className="aaf-hero-stat-label">Total Facts</div>
            </div>
          )}
        </div>
      </section>

      {/* CONTENT */}
      <div className="aaf-content">
        <div className="aaf-card">
          <div className="aaf-card-head">
            <div>
              <div className="aaf-card-label">Manage</div>
              <h3 className="aaf-card-h3">All Medical Facts</h3>
              <p className="aaf-card-sub">{facts.length} {facts.length === 1 ? "fact" : "facts"} available</p>
            </div>
            <button className="aaf-add-btn" onClick={() => setShowAddFact(true)}>
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
              Add New Fact
            </button>
          </div>

          {loading ? (
            <div className="aaf-loader"><div className="aaf-spin" /><span className="aaf-spin-label">Loading medical facts...</span></div>
          ) : facts.length === 0 ? (
            <div className="aaf-empty">
              <div className="aaf-empty-ico">
                <svg width="30" height="30" fill="none" stroke="#059669" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
              </div>
              <h4 className="aaf-empty-h4">No Facts Yet</h4>
              <p className="aaf-empty-p">Start building your knowledge base by adding medical facts</p>
              <button className="aaf-empty-btn" onClick={() => setShowAddFact(true)}>Add Your First Fact</button>
            </div>
          ) : (
            <div className="aaf-facts-list">
              {facts.map((fact, index) => (
                <div key={fact._id} className="aaf-fact-card">
                  <div className="aaf-fact-num">{index + 1}</div>
                  <div className="aaf-fact-body">
                    <div className="aaf-fact-header">
                      <h3 className="aaf-fact-title">{fact.title}</h3>
                      <span className="aaf-fact-badge">Medical Fact</span>
                    </div>
                    <p className="aaf-fact-desc">{fact.description}</p>
                    <div className="aaf-fact-actions">
                      <button className="aaf-edit-btn" onClick={() => handleEdit(fact)}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        Edit
                      </button>
                      <button className="aaf-del-btn" onClick={() => deleteFact(fact._id)}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* INFO CARDS */}
        <div className="aaf-info-grid">
          <div className="aaf-info-card">
            <div className="aaf-info-ico" style={{ background: "rgba(16,185,129,0.08)" }}>
              <svg width="20" height="20" fill="none" stroke="#059669" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div>
              <div className="aaf-info-h4">Quick Tip</div>
              <p className="aaf-info-p">Keep facts concise and scientifically accurate. Facts are displayed to users on their dashboard.</p>
            </div>
          </div>
          <div className="aaf-info-card">
            <div className="aaf-info-ico" style={{ background: "rgba(249,115,22,0.08)" }}>
              <svg width="20" height="20" fill="none" stroke="#f97316" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div>
              <div className="aaf-info-h4">Best Practice</div>
              <p className="aaf-info-p">Update facts regularly to ensure users have access to the latest medical information.</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="aaf-footer">
        <p>© 2025 SWASTHYA. ALL RIGHTS RESERVED.</p>
      </footer>

      {/* Modals */}
      {showAddFact && (
        <AddFactModal onClose={() => setShowAddFact(false)} onSuccess={fetchFacts} />
      )}
      {showEditFact && (
        <AddFactModal
          factToEdit={factToEdit}
          onClose={() => { setShowEditFact(false); setFactToEdit(null); }}
          onSuccess={fetchFacts}
        />
      )}
    </div>
  );
};

export default AdminAllFacts;