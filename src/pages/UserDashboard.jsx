import { organSystems } from "../data/organSystems";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const DashStyles = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.id = "ud-styles";
    style.textContent = `
      .ud-root { min-height: 100vh; font-family: 'Plus Jakarta Sans', sans-serif; background: #f8faf9; color: #0f1f18; }

      /* NAV */
      .ud-nav { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.93); backdrop-filter: blur(20px); border-bottom: 1px solid #e2ece7; box-shadow: 0 1px 30px rgba(6,78,59,0.06); }
      .ud-nav-inner { max-width: 1280px; margin: 0 auto; padding: 0 32px; height: 68px; display: flex; align-items: center; justify-content: space-between; }
      .ud-nav-left { display: flex; align-items: center; gap: 12px; }
      .ud-logo-wrap { width: 42px; height: 42px; border-radius: 11px; background: white; border: 1px solid #e2ece7; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(6,78,59,0.10); }
      .ud-logo-wrap img { height: 28px; width: auto; object-fit: contain; }
      .ud-brand-name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #064e3b; line-height: 1.1; }
      .ud-brand-tag  { font-family: 'Space Mono', monospace; font-size: 9px; color: #6b7c74; letter-spacing: 0.16em; text-transform: uppercase; }
      .ud-nav-right { display: flex; align-items: center; gap: 12px; }
      .ud-user-pill { display: flex; align-items: center; gap: 10px; padding: 8px 16px; border-radius: 12px; background: rgba(16,185,129,0.06); border: 1px solid rgba(16,185,129,0.16); }
      .ud-user-avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg,#064e3b,#059669); display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(6,78,59,0.22); }
      .ud-user-avatar span { color: white; font-weight: 700; font-size: 14px; }
      .ud-user-name { font-size: 14px; font-weight: 600; color: #0f1f18; }
      .ud-user-role { font-family: 'Space Mono', monospace; font-size: 9px; color: #059669; letter-spacing: 0.10em; text-transform: uppercase; }
      .ud-logout-btn { display: flex; align-items: center; gap: 8px; padding: 9px 20px; border-radius: 10px; background: linear-gradient(135deg,#ef4444,#f87171); color: white; border: none; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600; box-shadow: 0 4px 14px rgba(239,68,68,0.22); transition: all 0.25s; }
      .ud-logout-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(239,68,68,0.30); }

      /* CONTENT */
      .ud-content { max-width: 1280px; margin: 0 auto; padding: 36px 32px 72px; }

      /* WELCOME BANNER */
      .ud-banner {
        background: linear-gradient(160deg, #064e3b 0%, #065f46 55%, #047857 100%);
        border-radius: 22px; padding: 48px 52px; margin-bottom: 28px;
        position: relative; overflow: hidden;
        box-shadow: 0 12px 40px rgba(6,78,59,0.20);
      }
      .ud-banner-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px); background-size: 32px 32px; pointer-events: none; }
      .ud-banner-blob-a { position: absolute; top: -80px; right: -80px; width: 260px; height: 260px; border-radius: 50%; background: rgba(255,255,255,0.04); pointer-events: none; }
      .ud-banner-blob-b { position: absolute; bottom: -50px; left: -40px; width: 200px; height: 200px; border-radius: 50%; background: rgba(249,115,22,0.08); filter: blur(30px); pointer-events: none; }
      .ud-banner-content { position: relative; z-index: 1; }
      .ud-banner-tag { display: inline-flex; align-items: center; gap: 7px; padding: 5px 14px; border-radius: 999px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.20); font-family: 'Space Mono', monospace; font-size: 10px; color: rgba(255,255,255,0.85); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 14px; }
      .ud-banner-dot { width: 6px; height: 6px; border-radius: 50%; background: #10b981; box-shadow: 0 0 6px #10b981; animation: udPulse 2.5s ease-in-out infinite; }
      @keyframes udPulse { 0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,0.4)} 50%{box-shadow:0 0 0 5px rgba(16,185,129,0)} }
      .ud-banner-h1 { font-family: 'Playfair Display', serif; font-size: clamp(1.7rem,3vw,2.4rem); font-weight: 800; color: white; letter-spacing: -0.02em; margin-bottom: 10px; }
      .ud-banner-sub { font-size: 15px; color: rgba(255,255,255,0.65); line-height: 1.7; max-width: 520px; }

      /* STAT CARDS */
      .ud-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
      .ud-stat-card { background: white; border-radius: 16px; padding: 24px 26px; border: 1px solid #e2ece7; box-shadow: 0 4px 20px rgba(6,78,59,0.05); display: flex; align-items: center; gap: 18px; transition: all 0.3s; }
      .ud-stat-card:hover { transform: translateY(-4px); box-shadow: 0 16px 36px rgba(6,78,59,0.10); }
      .ud-stat-ico { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4px 14px rgba(0,0,0,0.12); }
      .ud-stat-label { font-size: 13px; color: #6b7c74; font-weight: 500; margin-bottom: 3px; }
      .ud-stat-val { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 700; color: #0f1f18; line-height: 1; }

      /* SEARCH */
      .ud-search-wrap { background: white; border-radius: 16px; padding: 20px 24px; margin-bottom: 24px; border: 1px solid #e2ece7; box-shadow: 0 4px 20px rgba(6,78,59,0.05); display: flex; gap: 12px; }
      .ud-search-inner { flex: 1; position: relative; }
      .ud-search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #9cad9c; pointer-events: none; }
      .ud-search-input { width: 100%; padding: 12px 16px 12px 44px; border: 1.5px solid #e2ece7; border-radius: 11px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; color: #0f1f18; background: #f8faf9; outline: none; transition: all 0.25s; }
      .ud-search-input::placeholder { color: #9cad9c; }
      .ud-search-input:focus { border-color: #059669; background: white; box-shadow: 0 0 0 4px rgba(16,185,129,0.10); }
      .ud-search-btn { padding: 12px 24px; border-radius: 11px; background: linear-gradient(135deg,#064e3b,#065f46); color: white; border: none; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600; box-shadow: 0 4px 14px rgba(6,78,59,0.22); transition: all 0.25s; white-space: nowrap; }
      .ud-search-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(6,78,59,0.30); }

      /* ORGAN SYSTEMS */
      .ud-systems-card { background: white; border-radius: 20px; padding: 32px; border: 1px solid #e2ece7; box-shadow: 0 4px 24px rgba(6,78,59,0.05); margin-bottom: 24px; }
      .ud-systems-head { margin-bottom: 24px; }
      .ud-systems-label { font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #059669; display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
      .ud-systems-label::before { content: ''; display: block; width: 24px; height: 2px; background: #059669; border-radius: 2px; }
      .ud-systems-h2 { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; color: #0f1f18; margin-bottom: 4px; }
      .ud-systems-sub { font-size: 13px; color: #6b7c74; }

      .ud-systems-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
      .ud-sys-card { border-radius: 16px; padding: 22px 20px; border: 1.5px solid #e2ece7; background: white; cursor: pointer; transition: all 0.35s cubic-bezier(0.23,1,0.32,1); }
      .ud-sys-card:hover { border-color: rgba(16,185,129,0.35); box-shadow: 0 20px 40px rgba(6,78,59,0.10); transform: translateY(-6px); }
      .ud-sys-card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 14px; }
      .ud-sys-ico { width: 58px; height: 58px; border-radius: 14px; background: rgba(16,185,129,0.07); border: 1px solid rgba(16,185,129,0.14); display: flex; align-items: center; justify-content: center; font-size: 28px; transition: transform 0.3s; }
      .ud-sys-card:hover .ud-sys-ico { transform: scale(1.10); }
      .ud-sys-count { font-family: 'Space Mono', monospace; font-size: 10px; font-weight: 700; color: #059669; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.18); padding: 4px 10px; border-radius: 999px; white-space: nowrap; }
      .ud-sys-name { font-size: 15px; font-weight: 700; color: #0f1f18; margin-bottom: 5px; transition: color 0.2s; }
      .ud-sys-card:hover .ud-sys-name { color: #059669; }
      .ud-sys-desc { font-size: 12px; color: #9cad9c; line-height: 1.5; margin-bottom: 14px; }
      .ud-sys-link { display: flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 600; color: #059669; transition: gap 0.2s; }
      .ud-sys-card:hover .ud-sys-link { gap: 8px; }

      /* LOADING / EMPTY */
      .ud-spinner { display: flex; justify-content: center; padding: 48px; }
      .ud-spin { width: 44px; height: 44px; border-radius: 50%; border: 3px solid rgba(16,185,129,0.15); border-top-color: #059669; animation: udSpin 0.8s linear infinite; }
      @keyframes udSpin { to { transform: rotate(360deg); } }
      .ud-empty { text-align: center; padding: 48px 20px; }
      .ud-empty p { font-size: 15px; color: #6b7c74; }

      /* MEDICAL FACTS */
      .ud-facts-card { border-radius: 22px; overflow: hidden; border: 1px solid #e2ece7; box-shadow: 0 4px 24px rgba(6,78,59,0.05); margin-bottom: 24px; position: relative; }
      .ud-facts-bg { position: absolute; inset: 0; background: linear-gradient(160deg,#064e3b 0%,#065f46 55%,#047857 100%); }
      .ud-facts-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px); background-size: 32px 32px; pointer-events: none; }
      .ud-facts-blob { position: absolute; top: -60px; right: -60px; width: 220px; height: 220px; border-radius: 50%; background: rgba(249,115,22,0.10); filter: blur(40px); pointer-events: none; }
      .ud-facts-inner { position: relative; z-index: 1; padding: 40px 40px 44px; }
      .ud-facts-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
      .ud-facts-h3 { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 700; color: white; }
      .ud-see-all-btn { display: flex; align-items: center; gap: 8px; padding: 10px 22px; border-radius: 10px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.22); color: white; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.25s; }
      .ud-see-all-btn:hover { background: rgba(255,255,255,0.20); }

      .ud-fact-item { background: rgba(255,255,255,0.08); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 24px 26px; margin-bottom: 14px; display: flex; gap: 18px; align-items: flex-start; transition: background 0.25s; }
      .ud-fact-item:last-child { margin-bottom: 0; }
      .ud-fact-item:hover { background: rgba(255,255,255,0.13); }
      .ud-fact-num { width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg,rgba(16,185,129,0.3),rgba(6,78,59,0.5)); border: 1px solid rgba(16,185,129,0.35); display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #10b981; flex-shrink: 0; }
      .ud-fact-title { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: white; margin-bottom: 8px; }
      .ud-fact-desc  { font-size: 14px; color: rgba(255,255,255,0.70); line-height: 1.7; }
      .ud-facts-more { text-align: center; margin-top: 20px; font-size: 14px; color: rgba(255,255,255,0.55); font-style: italic; }

      .ud-facts-spinner { display: flex; justify-content: center; padding: 40px; }
      .ud-facts-spin { width: 40px; height: 40px; border-radius: 50%; border: 3px solid rgba(255,255,255,0.15); border-top-color: rgba(255,255,255,0.8); animation: udSpin 0.8s linear infinite; }

      .ud-facts-empty { text-align: center; padding: 48px 20px; }
      .ud-facts-empty-ico { width: 72px; height: 72px; border-radius: 50%; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.14); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
      .ud-facts-empty p { font-size: 15px; color: rgba(255,255,255,0.60); }

      /* INFO CARDS */
      .ud-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      .ud-info-card { border-radius: 16px; padding: 24px 22px; display: flex; align-items: flex-start; gap: 14px; }
      .ud-info-ico { width: 44px; height: 44px; border-radius: 12px; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .ud-info-h4 { font-size: 15px; font-weight: 700; color: white; margin-bottom: 5px; }
      .ud-info-p  { font-size: 13px; color: rgba(255,255,255,0.70); line-height: 1.55; }

      @media (max-width: 900px) {
        .ud-systems-grid { grid-template-columns: 1fr 1fr; }
        .ud-info-grid { grid-template-columns: 1fr; }
      }
      @media (max-width: 640px) {
        .ud-content { padding: 24px 16px 60px; }
        .ud-banner { padding: 36px 28px; }
        .ud-stats { grid-template-columns: 1fr; }
        .ud-systems-grid { grid-template-columns: 1fr; }
        .ud-facts-inner { padding: 28px 24px 32px; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(link);
      const s = document.getElementById("ud-styles");
      if (s) document.head.removeChild(s);
    };
  }, []);
  return null;
};

const UserDashboard = () => {
  const navigate = useNavigate();

  // States
  const [diseaseCount, setDiseaseCount] = useState({});
  const [totalDiseases, setTotalDiseases] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Medical Facts State
  const [facts, setFacts] = useState([]);
  const [factsLoading, setFactsLoading] = useState(true);

  // Get user name
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.name || "User";

  // Fetch diseases for organ system counts
  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/diseases`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const counts = {};
        res.data.forEach((d) => {
          counts[d.organSystem] = (counts[d.organSystem] || 0) + 1;
        });
        setDiseaseCount(counts);
        setTotalDiseases(res.data.length);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch diseases", error);
        setIsLoading(false);
      }
    };
    fetchDiseases();
  }, []);

  // Fetch medical facts (now fully accessible)
  useEffect(() => {
    const fetchFacts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/medical-facts`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setFacts(res.data);
        setFactsLoading(false);
      } catch (error) {
        console.error("Failed to fetch medical facts", error);
        setFactsLoading(false);
      }
    };
    fetchFacts();
  }, []);

  // Filter organ systems
  const filteredSystems = organSystems.filter((sys) =>
    sys.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="ud-root">
      <DashStyles />

      {/* NAV */}
      <nav className="ud-nav">
        <div className="ud-nav-inner">
          <div className="ud-nav-left">
            <div className="ud-logo-wrap"><img src="/logo.png" alt="Swasthya" /></div>
            <div>
              <div className="ud-brand-name">Swasthya</div>
              <div className="ud-brand-tag">Health Made Simple</div>
            </div>
          </div>
          <div className="ud-nav-right">
            <div className="ud-user-pill">
              <div className="ud-user-avatar">
                <span>{userName.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <div className="ud-user-name">{userName}</div>
                <div className="ud-user-role">Member</div>
              </div>
            </div>
            <button className="ud-logout-btn" onClick={() => { logout(); navigate("/"); }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="ud-content">

        {/* WELCOME BANNER */}
        <div className="ud-banner">
          <div className="ud-banner-grid" />
          <div className="ud-banner-blob-a" />
          <div className="ud-banner-blob-b" />
          <div className="ud-banner-content">
            <div className="ud-banner-tag">
              <span className="ud-banner-dot" />
              Health Dashboard
            </div>
            <h2 className="ud-banner-h1">Welcome back, {userName}!</h2>
            <p className="ud-banner-sub">Explore comprehensive health information and learn about various diseases across all organ systems.</p>
          </div>
        </div>

        {/* STATS */}
        <div className="ud-stats">
          <div className="ud-stat-card">
            <div className="ud-stat-ico" style={{ background: "linear-gradient(135deg,#064e3b,#059669)" }}>
              <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </div>
            <div>
              <div className="ud-stat-label">Total Diseases</div>
              <div className="ud-stat-val">{totalDiseases}</div>
            </div>
          </div>
          <div className="ud-stat-card">
            <div className="ud-stat-ico" style={{ background: "linear-gradient(135deg,#f97316,#fb923c)" }}>
              <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
            </div>
            <div>
              <div className="ud-stat-label">Organ Systems</div>
              <div className="ud-stat-val">{organSystems.length}</div>
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <div className="ud-search-wrap">
          <div className="ud-search-inner">
            <span className="ud-search-icon">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </span>
            <input
              type="text"
              placeholder="Search organ systems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ud-search-input"
            />
          </div>
          <button className="ud-search-btn">Search</button>
        </div>

        {/* ORGAN SYSTEMS */}
        <div className="ud-systems-card">
          <div className="ud-systems-head">
            <div className="ud-systems-label">Browse</div>
            <h3 className="ud-systems-h2">Explore Organ Systems</h3>
            <p className="ud-systems-sub">Select a system to view related diseases and information</p>
          </div>

          {isLoading ? (
            <div className="ud-spinner"><div className="ud-spin" /></div>
          ) : filteredSystems.length === 0 ? (
            <div className="ud-empty">
              <p style={{ fontWeight: 600, color: "#0f1f18", marginBottom: 4 }}>No organ systems found</p>
              <p>Try adjusting your search</p>
            </div>
          ) : (
            <div className="ud-systems-grid">
              {filteredSystems.map((sys) => (
                <div key={sys.id} className="ud-sys-card" onClick={() => navigate(`/diseases/${sys.id}`)}>
                  <div className="ud-sys-card-top">
                    <div className="ud-sys-ico">{sys.icon}</div>
                    <span className="ud-sys-count">{diseaseCount[sys.id] || 0} diseases</span>
                  </div>
                  <div className="ud-sys-name">{sys.name}</div>
                  <div className="ud-sys-desc">Explore diseases, symptoms, and treatments for this system</div>
                  <div className="ud-sys-link">
                    View Details
                    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MEDICAL FACTS */}
        <div className="ud-facts-card">
          <div className="ud-facts-bg" />
          <div className="ud-facts-grid" />
          <div className="ud-facts-blob" />
          <div className="ud-facts-inner">
            <div className="ud-facts-header">
              <h3 className="ud-facts-h3">Medical Facts</h3>
              <button className="ud-see-all-btn" onClick={() => navigate("/medical-facts")}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
                See All Facts
              </button>
            </div>

            {factsLoading ? (
              <div className="ud-facts-spinner"><div className="ud-facts-spin" /></div>
            ) : facts.length === 0 ? (
              <div className="ud-facts-empty">
                <div className="ud-facts-empty-ico">
                  <svg width="28" height="28" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                </div>
                <p>No medical facts added yet. Check back soon for health insights!</p>
              </div>
            ) : (
              <>
                {[...facts].sort(() => 0.5 - Math.random()).slice(0, 3).map((fact, index) => (
                  <div key={fact._id} className="ud-fact-item">
                    <div className="ud-fact-num">{index + 1}</div>
                    <div>
                      <div className="ud-fact-title">{fact.title}</div>
                      <div className="ud-fact-desc">{fact.description}</div>
                    </div>
                  </div>
                ))}
                {facts.length > 3 && (
                  <div className="ud-facts-more">... and {facts.length - 3} more interesting facts available!</div>
                )}
              </>
            )}
          </div>
        </div>

        {/* INFO CARDS */}
        <div className="ud-info-grid">
          <div className="ud-info-card" style={{ background: "linear-gradient(135deg,#064e3b,#059669)" }}>
            <div className="ud-info-ico">
              <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
            </div>
            <div>
              <div className="ud-info-h4">Health Tip</div>
              <div className="ud-info-p">Prevention is better than cure. Stay informed to maintain good health.</div>
            </div>
          </div>
          <div className="ud-info-card" style={{ background: "linear-gradient(135deg,#f97316,#fb923c)" }}>
            <div className="ud-info-ico">
              <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
            </div>
            <div>
              <div className="ud-info-h4">Need Help?</div>
              <div className="ud-info-p">Contact support for any questions about health information.</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;