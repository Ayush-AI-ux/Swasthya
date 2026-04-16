import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DiseaseStyles = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.id = "udl-styles";
    style.textContent = `
      .udl-root { min-height: 100vh; font-family: 'Plus Jakarta Sans', sans-serif; background: #f8faf9; color: #0f1f18; }

      /* HEADER */
      .udl-header { background: white; border-bottom: 1px solid #e2ece7; box-shadow: 0 1px 20px rgba(6,78,59,0.06); padding: 0; position: sticky; top: 0; z-index: 100; }
      .udl-header-inner { max-width: 1280px; margin: 0 auto; padding: 20px 32px 24px; }
      .udl-back-btn { display: inline-flex; align-items: center; gap: 8px; padding: 8px 18px; border-radius: 9px; background: transparent; border: 1.5px solid #e2ece7; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600; color: #6b7c74; cursor: pointer; transition: all 0.25s; margin-bottom: 18px; }
      .udl-back-btn:hover { border-color: #059669; color: #059669; background: rgba(16,185,129,0.04); }
      .udl-header-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
      .udl-header-h1 { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem,3.5vw,2.6rem); font-weight: 800; color: #0f1f18; letter-spacing: -0.02em; margin-bottom: 6px; text-transform: capitalize; }
      .udl-header-sub { font-size: 15px; color: #6b7c74; }
      .udl-count-badge { display: flex; align-items: center; gap: 10px; padding: 12px 20px; border-radius: 14px; background: rgba(16,185,129,0.06); border: 1.5px solid rgba(16,185,129,0.18); flex-shrink: 0; }
      .udl-count-num { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 700; color: #059669; line-height: 1; }
      .udl-count-label { font-size: 12px; color: #6b7c74; font-weight: 500; }

      /* CONTENT */
      .udl-content { max-width: 1280px; margin: 0 auto; padding: 32px 32px 72px; }

      /* SEARCH */
      .udl-search-wrap { background: white; border-radius: 14px; padding: 16px 20px; margin-bottom: 20px; border: 1px solid #e2ece7; box-shadow: 0 4px 16px rgba(6,78,59,0.04); position: relative; }
      .udl-search-icon { position: absolute; left: 34px; top: 50%; transform: translateY(-50%); color: #9cad9c; pointer-events: none; }
      .udl-search-input { width: 100%; padding: 12px 16px 12px 46px; border: 1.5px solid #e2ece7; border-radius: 11px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; color: #0f1f18; background: #f8faf9; outline: none; transition: all 0.25s; }
      .udl-search-input::placeholder { color: #9cad9c; }
      .udl-search-input:focus { border-color: #059669; background: white; box-shadow: 0 0 0 4px rgba(16,185,129,0.10); }

      /* INFO BANNER */
      .udl-info-banner { background: linear-gradient(135deg,#064e3b,#065f46); border-radius: 14px; padding: 20px 24px; margin-bottom: 24px; display: flex; align-items: flex-start; gap: 14px; position: relative; overflow: hidden; }
      .udl-info-banner::after { content: ''; position: absolute; top: -40px; right: -40px; width: 120px; height: 120px; border-radius: 50%; background: rgba(255,255,255,0.04); pointer-events: none; }
      .udl-info-ico { width: 42px; height: 42px; border-radius: 11px; background: rgba(255,255,255,0.14); display: flex; align-items: center; justify-content: center; flex-shrink: 0; position: relative; z-index: 1; }
      .udl-info-h3 { font-size: 14px; font-weight: 700; color: white; margin-bottom: 4px; position: relative; z-index: 1; }
      .udl-info-p  { font-size: 13px; color: rgba(255,255,255,0.65); line-height: 1.55; position: relative; z-index: 1; }

      /* LOADING / EMPTY */
      .udl-loader { display: flex; flex-direction: column; align-items: center; padding: 64px 20px; }
      .udl-spin { width: 44px; height: 44px; border-radius: 50%; border: 3px solid rgba(16,185,129,0.15); border-top-color: #059669; animation: udlSpin 0.8s linear infinite; margin-bottom: 16px; }
      @keyframes udlSpin { to { transform: rotate(360deg); } }
      .udl-spin-label { font-size: 14px; color: #6b7c74; font-weight: 500; }
      .udl-empty { background: white; border-radius: 18px; padding: 56px 20px; text-align: center; border: 1px solid #e2ece7; box-shadow: 0 4px 20px rgba(6,78,59,0.05); }
      .udl-empty-ico { width: 72px; height: 72px; border-radius: 50%; background: rgba(16,185,129,0.07); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
      .udl-empty-h3 { font-family: 'Playfair Display', serif; font-size: 19px; font-weight: 700; color: #0f1f18; margin-bottom: 6px; }
      .udl-empty-p { font-size: 14px; color: #6b7c74; }

      /* DISEASE LIST */
      .udl-list { display: flex; flex-direction: column; gap: 14px; }
      .udl-disease-card { background: white; border-radius: 16px; border: 1.5px solid #e2ece7; overflow: hidden; box-shadow: 0 2px 12px rgba(6,78,59,0.04); transition: box-shadow 0.3s; }
      .udl-disease-card:hover { box-shadow: 0 12px 36px rgba(6,78,59,0.09); }

      .udl-card-head { padding: 22px 24px; cursor: pointer; transition: background 0.2s; display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
      .udl-card-head:hover { background: rgba(16,185,129,0.03); }
      .udl-card-left { flex: 1; display: flex; align-items: flex-start; gap: 14px; }
      .udl-card-ico { width: 42px; height: 42px; border-radius: 11px; background: linear-gradient(135deg,#064e3b,#059669); display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 3px 10px rgba(6,78,59,0.18); }
      .udl-card-title { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #0f1f18; margin-bottom: 5px; transition: color 0.2s; }
      .udl-card-head:hover .udl-card-title { color: #059669; }
      .udl-card-desc { font-size: 13px; color: #6b7c74; line-height: 1.55; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      .udl-chevron { width: 32px; height: 32px; border-radius: 8px; background: rgba(16,185,129,0.07); border: 1px solid rgba(16,185,129,0.14); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.2s; margin-top: 2px; }
      .udl-card-head:hover .udl-chevron { background: rgba(16,185,129,0.14); }
      .udl-learn-btn { padding: 8px 18px; border-radius: 9px; background: rgba(16,185,129,0.07); border: 1px solid rgba(16,185,129,0.18); font-size: 13px; font-weight: 600; color: #059669; cursor: pointer; flex-shrink: 0; transition: all 0.2s; }
      .udl-learn-btn:hover { background: #059669; color: white; }

      /* EXPANDED */
      .udl-expanded { border-top: 1.5px solid #e2ece7; background: #f8faf9; padding: 28px 24px; }
      .udl-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; }
      .udl-detail-item { border-radius: 12px; padding: 16px 18px; border-left: 3px solid; }
      .udl-detail-h3 { font-size: 13px; font-weight: 700; color: #0f1f18; margin-bottom: 7px; display: flex; align-items: center; gap: 7px; }
      .udl-detail-p  { font-size: 13px; color: #4b5563; line-height: 1.65; white-space: pre-line; }
      .udl-disclaimer { background: rgba(249,115,22,0.05); border-left: 3px solid #f97316; border-radius: 0 12px 12px 0; padding: 14px 18px; display: flex; align-items: flex-start; gap: 10px; margin-top: 4px; }
      .udl-disclaimer-p { font-size: 13px; color: #4b5563; line-height: 1.6; }
      .udl-disclaimer-p strong { color: #0f1f18; font-weight: 700; }

      @media (max-width: 768px) {
        .udl-content { padding: 24px 16px 60px; }
        .udl-header-inner { padding: 16px 20px 20px; }
        .udl-detail-grid { grid-template-columns: 1fr; }
        .udl-count-badge { display: none; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(link);
      const s = document.getElementById("udl-styles");
      if (s) document.head.removeChild(s);
    };
  }, []);
  return null;
};

const DETAIL_COLORS = {
  blue:   { bg: "rgba(59,130,246,0.05)",  border: "#3b82f6" },
  purple: { bg: "rgba(124,58,237,0.05)",  border: "#7c3aed" },
  pink:   { bg: "rgba(236,72,153,0.05)",  border: "#ec4899" },
  teal:   { bg: "rgba(16,185,129,0.05)",  border: "#059669" },
  cyan:   { bg: "rgba(6,182,212,0.05)",   border: "#06b6d4" },
  green:  { bg: "rgba(34,197,94,0.05)",   border: "#22c55e" },
  orange: { bg: "rgba(249,115,22,0.05)",  border: "#f97316" },
  indigo: { bg: "rgba(99,102,241,0.05)",  border: "#6366f1" },
};

const Detail = ({ icon, title, value, color }) => {
  const c = DETAIL_COLORS[color] || DETAIL_COLORS.teal;
  return (
    <div className="udl-detail-item" style={{ background: c.bg, borderColor: c.border }}>
      <div className="udl-detail-h3">
        <span style={{ fontSize: 17 }}>{icon}</span>
        {title}
      </div>
      <p className="udl-detail-p">{value || "No information available"}</p>
    </div>
  );
};

const UserDiseaseList = () => {
  const { organ } = useParams();
  const navigate = useNavigate();
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/diseases/organ/${organ}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setDiseases(res.data);
      } catch (err) {
        alert("Failed to fetch diseases");
      } finally {
        setLoading(false);
      }
    };
    fetchDiseases();
  }, [organ]);

  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id);

  const filteredDiseases = diseases.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8faf9", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <DiseaseStyles />
        <div className="udl-loader">
          <div className="udl-spin" />
          <span className="udl-spin-label">Loading diseases...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="udl-root">
      <DiseaseStyles />

      {/* HEADER */}
      <div className="udl-header">
        <div className="udl-header-inner">
          <button className="udl-back-btn" onClick={() => navigate("/user")}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Back to Dashboard
          </button>
          <div className="udl-header-row">
            <div>
              <h1 className="udl-header-h1">{organ} System Diseases</h1>
              <p className="udl-header-sub">Explore comprehensive information about {organ} system diseases</p>
            </div>
            <div className="udl-count-badge">
              <div>
                <div className="udl-count-num">{diseases.length}</div>
                <div className="udl-count-label">Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="udl-content">
        {/* SEARCH */}
        <div className="udl-search-wrap">
          <span className="udl-search-icon">
            <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </span>
          <input
            type="text" placeholder="Search diseases by name..."
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="udl-search-input"
          />
        </div>

        {/* INFO BANNER */}
        <div className="udl-info-banner">
          <div className="udl-info-ico">
            <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <div>
            <div className="udl-info-h3">Health Information</div>
            <p className="udl-info-p">Click on any disease card to view detailed medical information including symptoms, diagnosis, and treatment options.</p>
          </div>
        </div>

        {/* DISEASE LIST */}
        {filteredDiseases.length === 0 ? (
          <div className="udl-empty">
            <div className="udl-empty-ico">
              <svg width="28" height="28" fill="none" stroke="#059669" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </div>
            <h3 className="udl-empty-h3">No Diseases Found</h3>
            <p className="udl-empty-p">{searchQuery ? "Try adjusting your search query" : "No diseases available for this organ system yet"}</p>
          </div>
        ) : (
          <div className="udl-list">
            {filteredDiseases.map((disease) => (
              <div key={disease._id} className="udl-disease-card">
                <div className="udl-card-head" onClick={() => toggleExpand(disease._id)}>
                  <div className="udl-card-left">
                    <div className="udl-card-ico">
                      <svg width="19" height="19" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    </div>
                    <div>
                      <div className="udl-card-title">{disease.name}</div>
                      <div className="udl-card-desc">{disease.description || "Click to view more details about this disease"}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                    <button className="udl-learn-btn" onClick={(e) => { e.stopPropagation(); toggleExpand(disease._id); }}>
                      {expandedId === disease._id ? "Close" : "Learn More"}
                    </button>
                    <div className="udl-chevron">
                      {expandedId === disease._id
                        ? <svg width="14" height="14" fill="none" stroke="#059669" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"/></svg>
                        : <svg width="14" height="14" fill="none" stroke="#9cad9c" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                      }
                    </div>
                  </div>
                </div>

                {expandedId === disease._id && (
                  <div className="udl-expanded">
                    <div className="udl-detail-grid">
                      <Detail icon="📋" title="Overview"         value={disease.description}     color="blue"   />
                      <Detail icon="🔬" title="Etiology"         value={disease.etiology}        color="purple" />
                      <Detail icon="🧬" title="Pathophysiology"  value={disease.pathophysiology} color="pink"   />
                      <Detail icon="🩺" title="Clinical Features" value={disease.clinicalFeatures} color="teal" />
                      <Detail icon="🔍" title="Diagnosis"        value={disease.diagnosis}       color="cyan"   />
                      <Detail icon="💊" title="Treatment"        value={disease.treatment}       color="green"  />
                      <Detail icon="⚠️" title="Complications"    value={disease.complications}   color="orange" />
                      <Detail icon="📊" title="Prognosis"        value={disease.prognosis}       color="indigo" />
                    </div>
                    <div className="udl-disclaimer">
                      <svg width="16" height="16" fill="none" stroke="#f97316" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2 }}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                      <p className="udl-disclaimer-p"><strong>Medical Disclaimer:</strong> This information is for educational purposes only. Consult a healthcare professional for medical advice.</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDiseaseList;