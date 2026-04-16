import { organSystems } from "../data/organSystems";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AddDiseaseModal from "../components/AddDiseaseModal";
import AddFactModal from "../components/AddFactModal";
import axios from "axios";

const AdminStyles = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.id = "adm-styles";
    style.textContent = `
      .adm-root { min-height: 100vh; font-family: 'Plus Jakarta Sans', sans-serif; background: #f8faf9; color: #0f1f18; }
      .adm-nav { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.93); backdrop-filter: blur(20px); border-bottom: 1px solid #e2ece7; box-shadow: 0 1px 30px rgba(6,78,59,0.06); }
      .adm-nav-inner { max-width: 1280px; margin: 0 auto; padding: 0 32px; height: 68px; display: flex; align-items: center; justify-content: space-between; }
      .adm-nav-left { display: flex; align-items: center; gap: 12px; }
      .adm-nav-mark { width: 42px; height: 42px; border-radius: 11px; background: linear-gradient(135deg,#064e3b,#059669); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(6,78,59,0.25); }
      .adm-brand-name { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #064e3b; line-height: 1.1; }
      .adm-brand-tag  { font-family: 'Space Mono', monospace; font-size: 9px; color: #6b7c74; letter-spacing: 0.16em; text-transform: uppercase; }
      .adm-nav-right { display: flex; align-items: center; gap: 12px; }
      .adm-admin-pill { display: flex; align-items: center; gap: 10px; padding: 8px 16px; border-radius: 12px; background: rgba(124,58,237,0.06); border: 1px solid rgba(124,58,237,0.16); }
      .adm-admin-avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg,#7c3aed,#a78bfa); display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(124,58,237,0.25); }
      .adm-admin-avatar span { color: white; font-weight: 700; font-size: 14px; }
      .adm-admin-name { font-size: 14px; font-weight: 600; color: #0f1f18; }
      .adm-admin-role { font-family: 'Space Mono', monospace; font-size: 9px; color: #7c3aed; letter-spacing: 0.10em; text-transform: uppercase; }
      .adm-logout-btn { display: flex; align-items: center; gap: 8px; padding: 9px 20px; border-radius: 10px; background: linear-gradient(135deg,#ef4444,#f87171); color: white; border: none; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600; box-shadow: 0 4px 14px rgba(239,68,68,0.22); transition: all 0.25s; }
      .adm-logout-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(239,68,68,0.30); }

      .adm-content { max-width: 1280px; margin: 0 auto; padding: 36px 32px 72px; }

      /* WELCOME */
      .adm-welcome { background: linear-gradient(160deg,#064e3b 0%,#065f46 55%,#047857 100%); border-radius: 22px; padding: 44px 52px; margin-bottom: 28px; position: relative; overflow: hidden; box-shadow: 0 12px 40px rgba(6,78,59,0.20); }
      .adm-welcome-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px); background-size: 32px 32px; pointer-events: none; }
      .adm-welcome-blob { position: absolute; top: -60px; right: -60px; width: 220px; height: 220px; border-radius: 50%; background: rgba(255,255,255,0.04); pointer-events: none; }
      .adm-welcome-blob2 { position: absolute; bottom: -50px; left: -40px; width: 180px; height: 180px; border-radius: 50%; background: rgba(249,115,22,0.08); filter: blur(30px); pointer-events: none; }
      .adm-welcome-content { position: relative; z-index: 1; }
      .adm-welcome-tag { display: inline-flex; align-items: center; gap: 7px; padding: 5px 14px; border-radius: 999px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.20); font-family: 'Space Mono', monospace; font-size: 10px; color: rgba(255,255,255,0.85); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 12px; }
      .adm-welcome-dot { width: 6px; height: 6px; border-radius: 50%; background: #10b981; animation: admPulse 2.5s ease-in-out infinite; }
      @keyframes admPulse { 0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,0.4)} 50%{box-shadow:0 0 0 5px rgba(16,185,129,0)} }
      .adm-welcome-h2 { font-family: 'Playfair Display', serif; font-size: clamp(1.7rem,3vw,2.4rem); font-weight: 800; color: white; letter-spacing: -0.02em; margin-bottom: 8px; }
      .adm-welcome-sub { font-size: 15px; color: rgba(255,255,255,0.65); line-height: 1.7; max-width: 500px; }

      /* STATS */
      .adm-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 28px; }
      .adm-stat-card { background: white; border-radius: 18px; padding: 24px 26px; border: 1px solid #e2ece7; box-shadow: 0 4px 18px rgba(6,78,59,0.05); transition: all 0.3s; }
      .adm-stat-card:hover { transform: translateY(-4px); box-shadow: 0 16px 36px rgba(6,78,59,0.10); }
      .adm-stat-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 16px; }
      .adm-stat-ico { width: 46px; height: 46px; border-radius: 13px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.12); }
      .adm-stat-badge { display: inline-flex; align-items: center; gap: 5px; padding: 4px 12px; border-radius: 999px; font-family: 'Space Mono', monospace; font-size: 9px; font-weight: 700; letter-spacing: 0.08em; }
      .adm-stat-label { font-size: 13px; color: #6b7c74; font-weight: 500; margin-bottom: 3px; }
      .adm-stat-val { font-family: 'Playfair Display', serif; font-size: 2.2rem; font-weight: 700; color: #0f1f18; line-height: 1; }
      .adm-action-card { background: linear-gradient(135deg,#7c3aed,#a78bfa); border-radius: 18px; padding: 24px 26px; cursor: pointer; transition: all 0.3s; box-shadow: 0 8px 24px rgba(124,58,237,0.22); }
      .adm-action-card:hover { transform: translateY(-4px); box-shadow: 0 16px 36px rgba(124,58,237,0.32); }
      .adm-action-ico { width: 46px; height: 46px; border-radius: 13px; background: rgba(255,255,255,0.18); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
      .adm-action-label { font-size: 12px; color: rgba(255,255,255,0.70); font-weight: 500; margin-bottom: 4px; }
      .adm-action-val { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; color: white; margin-bottom: 4px; }
      .adm-action-hint { font-size: 12px; color: rgba(255,255,255,0.60); }

      /* SYSTEMS CARD */
      .adm-systems-card { background: white; border-radius: 20px; padding: 32px; border: 1px solid #e2ece7; box-shadow: 0 4px 24px rgba(6,78,59,0.05); margin-bottom: 24px; }
      .adm-systems-card-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; flex-wrap: wrap; gap: 14px; }
      .adm-systems-label { font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #059669; display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
      .adm-systems-label::before { content: ''; display: block; width: 24px; height: 2px; background: #059669; border-radius: 2px; }
      .adm-systems-h3 { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; color: #0f1f18; margin-bottom: 4px; }
      .adm-systems-sub { font-size: 13px; color: #6b7c74; }
      .adm-add-btn { display: flex; align-items: center; gap: 8px; padding: 12px 24px; border-radius: 11px; background: linear-gradient(135deg,#064e3b,#065f46); color: white; border: none; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600; box-shadow: 0 4px 14px rgba(6,78,59,0.22); transition: all 0.25s; white-space: nowrap; }
      .adm-add-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(6,78,59,0.32); }
      .adm-systems-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
      .adm-sys-card { border-radius: 16px; padding: 20px; border: 1.5px solid #e2ece7; background: white; cursor: pointer; transition: all 0.35s cubic-bezier(0.23,1,0.32,1); }
      .adm-sys-card:hover { border-color: rgba(124,58,237,0.35); box-shadow: 0 20px 40px rgba(124,58,237,0.10); transform: translateY(-5px); }
      .adm-sys-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px; }
      .adm-sys-ico { width: 54px; height: 54px; border-radius: 13px; background: rgba(124,58,237,0.07); border: 1px solid rgba(124,58,237,0.14); display: flex; align-items: center; justify-content: center; font-size: 26px; transition: transform 0.3s; }
      .adm-sys-card:hover .adm-sys-ico { transform: scale(1.10); }
      .adm-sys-count { font-family: 'Space Mono', monospace; font-size: 10px; font-weight: 700; color: #7c3aed; background: rgba(124,58,237,0.08); border: 1px solid rgba(124,58,237,0.18); padding: 3px 10px; border-radius: 999px; white-space: nowrap; }
      .adm-sys-name { font-size: 14px; font-weight: 700; color: #0f1f18; margin-bottom: 4px; transition: color 0.2s; }
      .adm-sys-card:hover .adm-sys-name { color: #7c3aed; }
      .adm-sys-desc { font-size: 12px; color: #9cad9c; line-height: 1.5; margin-bottom: 12px; }
      .adm-sys-link { display: flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 600; color: #7c3aed; transition: gap 0.2s; }
      .adm-sys-card:hover .adm-sys-link { gap: 8px; }

      /* FACTS SECTION */
      .adm-facts-outer { border-radius: 22px; overflow: hidden; border: 1px solid #e2ece7; margin-bottom: 24px; position: relative; }
      .adm-facts-bg { position: absolute; inset: 0; background: linear-gradient(160deg,#064e3b 0%,#065f46 55%,#047857 100%); }
      .adm-facts-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px); background-size: 32px 32px; pointer-events: none; }
      .adm-facts-blob { position: absolute; top: -60px; right: -60px; width: 220px; height: 220px; border-radius: 50%; background: rgba(249,115,22,0.10); filter: blur(40px); pointer-events: none; }
      .adm-facts-inner { position: relative; z-index: 1; padding: 36px 40px 40px; }
      .adm-facts-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; flex-wrap: wrap; gap: 14px; }
      .adm-facts-h3 { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; color: white; }
      .adm-facts-sub { font-size: 13px; color: rgba(255,255,255,0.60); margin-top: 4px; }
      .adm-facts-btns { display: flex; gap: 10px; }
      .adm-facts-add-btn { display: flex; align-items: center; gap: 7px; padding: 10px 20px; border-radius: 10px; background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.22); color: white; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.25s; }
      .adm-facts-add-btn:hover { background: rgba(255,255,255,0.22); }
      .adm-facts-all-btn { display: flex; align-items: center; gap: 7px; padding: 10px 20px; border-radius: 10px; background: rgba(124,58,237,0.30); border: 1px solid rgba(124,58,237,0.40); color: white; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.25s; }
      .adm-facts-all-btn:hover { background: rgba(124,58,237,0.45); }
      .adm-fact-item { background: rgba(255,255,255,0.08); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 20px 22px; margin-bottom: 12px; display: flex; gap: 16px; align-items: flex-start; transition: background 0.25s; }
      .adm-fact-item:last-child { margin-bottom: 0; }
      .adm-fact-item:hover { background: rgba(255,255,255,0.13); }
      .adm-fact-num { width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg,rgba(16,185,129,0.30),rgba(6,78,59,0.50)); border: 1px solid rgba(16,185,129,0.35); display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #10b981; flex-shrink: 0; }
      .adm-fact-title { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: white; margin-bottom: 6px; }
      .adm-fact-desc  { font-size: 13px; color: rgba(255,255,255,0.65); line-height: 1.65; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      .adm-facts-more { text-align: center; margin-top: 18px; font-size: 13px; color: rgba(255,255,255,0.50); font-style: italic; }
      .adm-facts-spinner { display: flex; justify-content: center; padding: 36px; }
      .adm-facts-spin { width: 36px; height: 36px; border-radius: 50%; border: 3px solid rgba(255,255,255,0.15); border-top-color: rgba(255,255,255,0.8); animation: admFactSpin 0.8s linear infinite; }
      @keyframes admFactSpin { to { transform: rotate(360deg); } }
      .adm-facts-empty { text-align: center; padding: 40px 20px; }
      .adm-facts-empty-ico { width: 64px; height: 64px; border-radius: 50%; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.14); display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; }
      .adm-facts-empty p { font-size: 14px; color: rgba(255,255,255,0.55); }

      /* SPINNER */
      .adm-spin-wrap { display: flex; justify-content: center; padding: 48px; }
      .adm-spin { width: 44px; height: 44px; border-radius: 50%; border: 3px solid rgba(16,185,129,0.15); border-top-color: #059669; animation: admSpin 0.8s linear infinite; }
      @keyframes admSpin { to { transform: rotate(360deg); } }

      @media (max-width: 900px) {
        .adm-stats { grid-template-columns: 1fr 1fr; }
        .adm-systems-grid { grid-template-columns: 1fr 1fr; }
      }
      @media (max-width: 640px) {
        .adm-content { padding: 24px 16px 60px; }
        .adm-welcome { padding: 32px 24px; }
        .adm-stats { grid-template-columns: 1fr; }
        .adm-systems-grid { grid-template-columns: 1fr; }
        .adm-facts-inner { padding: 26px 22px 30px; }
        .adm-facts-btns { flex-direction: column; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(link);
      const s = document.getElementById("adm-styles");
      if (s) document.head.removeChild(s);
    };
  }, []);
  return null;
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showAddFact, setShowAddFact] = useState(false);

  // New states for editing a fact
  const [showEditFact, setShowEditFact] = useState(false);
  const [factToEdit, setFactToEdit] = useState(null);

  const [diseaseCount, setDiseaseCount] = useState({});
  const [totalDiseases, setTotalDiseases] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [facts, setFacts] = useState([]);
  const [factsLoading, setFactsLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const adminName = user.name || "Admin";

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/diseases`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const counts = {};
        res.data.forEach((d) => { counts[d.organSystem] = (counts[d.organSystem] || 0) + 1; });
        setDiseaseCount(counts);
        setTotalDiseases(res.data.length);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch disease counts", err);
        setIsLoading(false);
      }
    };
    fetchCounts();
  }, []);

  useEffect(() => {
    const fetchFacts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/medical-facts`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setFacts(res.data);
        setFactsLoading(false);
      } catch (err) {
        console.error("Failed to fetch medical facts", err);
        setFactsLoading(false);
      }
    };
    fetchFacts();
  }, []);

  const deleteFact = async (factId) => {
    if (!window.confirm("Are you sure you want to delete this medical fact?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/medical-facts/${factId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setFacts(facts.filter((fact) => fact._id !== factId));
      alert("Fact deleted successfully!");
    } catch (err) {
      console.error("Failed to delete fact", err);
      alert("Failed to delete fact. Please try again.");
    }
  };

  // Handle Edit button click
  const handleEditFact = (fact) => {
    setFactToEdit(fact);
    setShowEditFact(true);
  };

  return (
    <div className="adm-root">
      <AdminStyles />

      {/* NAV */}
      <nav className="adm-nav">
        <div className="adm-nav-inner">
          <div className="adm-nav-left">
            <div className="adm-nav-mark">
              <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <div>
              <div className="adm-brand-name">Swasthya Admin</div>
              <div className="adm-brand-tag">Management Portal</div>
            </div>
          </div>
          <div className="adm-nav-right">
            <div className="adm-admin-pill">
              <div className="adm-admin-avatar"><span>{adminName.charAt(0).toUpperCase()}</span></div>
              <div>
                <div className="adm-admin-name">{adminName}</div>
                <div className="adm-admin-role">Administrator</div>
              </div>
            </div>
            <button className="adm-logout-btn" onClick={() => { logout(); navigate("/"); }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="adm-content">

        {/* WELCOME */}
        <div className="adm-welcome">
          <div className="adm-welcome-grid" />
          <div className="adm-welcome-blob" />
          <div className="adm-welcome-blob2" />
          <div className="adm-welcome-content">
            <div className="adm-welcome-tag"><span className="adm-welcome-dot" />Admin Panel</div>
            <h2 className="adm-welcome-h2">Welcome back, {adminName}!</h2>
            <p className="adm-welcome-sub">Manage your medical database and monitor system health from one place.</p>
          </div>
        </div>

        {/* STATS */}
        <div className="adm-stats">
          <div className="adm-stat-card">
            <div className="adm-stat-top">
              <div className="adm-stat-ico" style={{ background: "linear-gradient(135deg,#064e3b,#059669)" }}>
                <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              </div>
              <span className="adm-stat-badge" style={{ background: "rgba(16,185,129,0.08)", color: "#059669" }}>Active</span>
            </div>
            <div className="adm-stat-label">Total Diseases</div>
            <div className="adm-stat-val">{totalDiseases}</div>
          </div>

          <div className="adm-stat-card">
            <div className="adm-stat-top">
              <div className="adm-stat-ico" style={{ background: "linear-gradient(135deg,#f97316,#fb923c)" }}>
                <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
              </div>
              <span className="adm-stat-badge" style={{ background: "rgba(249,115,22,0.08)", color: "#f97316" }}>Systems</span>
            </div>
            <div className="adm-stat-label">Organ Systems</div>
            <div className="adm-stat-val">{organSystems.length}</div>
          </div>

          <div className="adm-action-card" onClick={() => setOpen(true)}>
            <div className="adm-action-ico">
              <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
            </div>
            <div className="adm-action-label">Quick Action</div>
            <div className="adm-action-val">Add Disease</div>
            <div className="adm-action-hint">Click to add new entry</div>
          </div>
        </div>

        {/* ORGAN SYSTEMS */}
        <div className="adm-systems-card">
          <div className="adm-systems-card-head">
            <div>
              <div className="adm-systems-label">Browse</div>
              <h3 className="adm-systems-h3">Organ Systems</h3>
              <p className="adm-systems-sub">Browse and manage diseases by organ system</p>
            </div>
            <button className="adm-add-btn" onClick={() => setOpen(true)}>
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
              Add New Disease
            </button>
          </div>

          {isLoading ? (
            <div className="adm-spin-wrap"><div className="adm-spin" /></div>
          ) : (
            <div className="adm-systems-grid">
              {organSystems.map((sys) => (
                <div key={sys.id} className="adm-sys-card" onClick={() => navigate(`/admin/diseases/${sys.id}`)}>
                  <div className="adm-sys-top">
                    <div className="adm-sys-ico">{sys.icon}</div>
                    <span className="adm-sys-count">{diseaseCount[sys.id] || 0} diseases</span>
                  </div>
                  <div className="adm-sys-name">{sys.name}</div>
                  <div className="adm-sys-desc">View and manage all diseases related to this system</div>
                  <div className="adm-sys-link">
                    View Details
                    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MEDICAL FACTS */}
        <div className="adm-facts-outer">
          <div className="adm-facts-bg" />
          <div className="adm-facts-grid" />
          <div className="adm-facts-blob" />
          <div className="adm-facts-inner">
            <div className="adm-facts-header">
              <div>
                <h3 className="adm-facts-h3">Medical Facts</h3>
                <p className="adm-facts-sub">Manage educational medical facts for users</p>
              </div>
              <div className="adm-facts-btns">
                <button className="adm-facts-add-btn" onClick={() => setShowAddFact(true)}>
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
                  Add New Fact
                </button>
                <button className="adm-facts-all-btn" onClick={() => navigate("/admin/medical-facts")}>
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
                  See All Facts
                </button>
              </div>
            </div>

            {factsLoading ? (
              <div className="adm-facts-spinner"><div className="adm-facts-spin" /></div>
            ) : facts.length === 0 ? (
              <div className="adm-facts-empty">
                <div className="adm-facts-empty-ico">
                  <svg width="26" height="26" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                </div>
                <p>No medical facts added yet. Click "Add New Fact" to get started.</p>
              </div>
            ) : (
              <>
                {[...facts].sort(() => 0.5 - Math.random()).slice(0, 3).map((fact, index) => (
                  <div key={fact._id} className="adm-fact-item">
                    <div className="adm-fact-num">{index + 1}</div>
                    <div>
                      <div className="adm-fact-title">{fact.title}</div>
                      <div className="adm-fact-desc">{fact.description}</div>
                    </div>
                  </div>
                ))}
                {facts.length > 3 && (
                  <div className="adm-facts-more">... and {facts.length - 3} more facts</div>
                )}
              </>
            )}
          </div>
        </div>

        {/* MODALS */}
        {open && (
          <AddDiseaseModal onClose={() => setOpen(false)} onSuccess={() => window.location.reload()} />
        )}
        {showAddFact && (
          <AddFactModal onClose={() => setShowAddFact(false)} onSuccess={() => { setShowAddFact(false); window.location.reload(); }} />
        )}
        {showEditFact && (
          <AddFactModal
            factToEdit={factToEdit}
            onClose={() => { setShowEditFact(false); setFactToEdit(null); }}
            onSuccess={() => { setShowEditFact(false); setFactToEdit(null); window.location.reload(); }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;