import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DetailStyles = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.id = "dd-styles";
    style.textContent = `
      .dd-root { min-height: 100vh; font-family: 'Plus Jakarta Sans', sans-serif; background: #f8faf9; color: #0f1f18; }
      .dd-header { background: white; border-bottom: 1px solid #e2ece7; box-shadow: 0 1px 20px rgba(6,78,59,0.06); position: sticky; top: 0; z-index: 100; }
      .dd-header-inner { max-width: 1280px; margin: 0 auto; padding: 20px 32px 24px; }
      .dd-back-btn { display: inline-flex; align-items: center; gap: 8px; padding: 8px 18px; border-radius: 9px; background: transparent; border: 1.5px solid #e2ece7; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600; color: #6b7c74; cursor: pointer; transition: all 0.25s; margin-bottom: 18px; }
      .dd-back-btn:hover { border-color: #059669; color: #059669; background: rgba(16,185,129,0.04); }
      .dd-header-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
      .dd-header-h1 { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem,3.5vw,2.8rem); font-weight: 800; color: #0f1f18; letter-spacing: -0.02em; margin-bottom: 10px; }
      .dd-system-badge { display: inline-flex; align-items: center; gap: 8px; padding: 7px 18px; border-radius: 999px; background: rgba(16,185,129,0.07); border: 1.5px solid rgba(16,185,129,0.20); font-size: 13px; font-weight: 600; color: #059669; }
      .dd-delete-btn { display: flex; align-items: center; gap: 8px; padding: 11px 22px; border-radius: 10px; background: linear-gradient(135deg,#ef4444,#f87171); color: white; border: none; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600; box-shadow: 0 4px 14px rgba(239,68,68,0.22); transition: all 0.25s; flex-shrink: 0; }
      .dd-delete-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(239,68,68,0.30); }
      .dd-content { max-width: 1280px; margin: 0 auto; padding: 32px 32px 72px; }
      .dd-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 28px; }
      .dd-stat-card { background: white; border-radius: 16px; padding: 22px 24px; border: 1px solid #e2ece7; box-shadow: 0 4px 18px rgba(6,78,59,0.05); display: flex; align-items: center; gap: 16px; transition: all 0.3s; }
      .dd-stat-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(6,78,59,0.10); }
      .dd-stat-ico { width: 48px; height: 48px; border-radius: 13px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
      .dd-stat-label { font-size: 12px; color: #6b7c74; font-weight: 500; margin-bottom: 2px; }
      .dd-stat-val { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; color: #0f1f18; line-height: 1; text-transform: capitalize; }
      .dd-verified-card { background: linear-gradient(135deg,#064e3b,#059669); border-radius: 16px; padding: 22px 24px; box-shadow: 0 8px 24px rgba(6,78,59,0.22); display: flex; align-items: center; gap: 16px; }
      .dd-verified-ico { width: 48px; height: 48px; border-radius: 13px; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
      .dd-verified-label { font-size: 12px; color: rgba(255,255,255,0.65); font-weight: 500; margin-bottom: 2px; }
      .dd-verified-val   { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 700; color: white; }
      .dd-tabs-wrap { background: white; border-radius: 16px 16px 0 0; border: 1px solid #e2ece7; border-bottom: none; overflow: hidden; }
      .dd-tabs { display: flex; overflow-x: auto; }
      .dd-tab { padding: 16px 26px; font-size: 14px; font-weight: 600; cursor: pointer; border-bottom: 2.5px solid transparent; color: #6b7c74; background: none; border-top: none; border-left: none; border-right: none; font-family: 'Plus Jakarta Sans', sans-serif; transition: all 0.2s; white-space: nowrap; }
      .dd-tab:hover { color: #0f1f18; }
      .dd-tab.active { color: #059669; background: rgba(16,185,129,0.04); }
      .dd-tab-content { background: white; border-radius: 0 0 16px 16px; border: 1px solid #e2ece7; border-top: none; padding: 32px; margin-bottom: 24px; box-shadow: 0 4px 20px rgba(6,78,59,0.04); }
      .dd-section { border-left: 3px solid; padding-left: 22px; padding-top: 4px; padding-bottom: 4px; margin-bottom: 24px; }
      .dd-section:last-child { margin-bottom: 0; }
      .dd-section-h3 { display: flex; align-items: center; gap: 9px; font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #0f1f18; margin-bottom: 10px; }
      .dd-section-p { font-size: 15px; color: #4b5563; line-height: 1.8; white-space: pre-line; }
      .dd-disclaimer { background: rgba(249,115,22,0.05); border-left: 4px solid #f97316; border-radius: 0 14px 14px 0; padding: 22px 24px; display: flex; align-items: flex-start; gap: 14px; }
      .dd-disclaimer-ico { width: 42px; height: 42px; border-radius: 11px; background: rgba(249,115,22,0.10); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .dd-disclaimer-h4 { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: #0f1f18; margin-bottom: 6px; }
      .dd-disclaimer-p  { font-size: 13px; color: #4b5563; line-height: 1.7; }
      .dd-center { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f8faf9; font-family: 'Plus Jakarta Sans', sans-serif; }
      .dd-spin { width: 48px; height: 48px; border-radius: 50%; border: 3px solid rgba(16,185,129,0.15); border-top-color: #059669; animation: ddSpin 0.8s linear infinite; margin: 0 auto 16px; }
      @keyframes ddSpin { to { transform: rotate(360deg); } }
      .dd-not-found { text-align: center; padding: 40px; background: white; border-radius: 20px; border: 1px solid #e2ece7; box-shadow: 0 8px 32px rgba(6,78,59,0.06); max-width: 400px; width: 90%; }
      .dd-not-found-ico { width: 72px; height: 72px; border-radius: 50%; background: rgba(239,68,68,0.08); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
      .dd-not-found h2 { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #0f1f18; margin-bottom: 8px; }
      .dd-not-found p  { font-size: 14px; color: #6b7c74; margin-bottom: 20px; }
      .dd-not-found-btn { padding: 11px 28px; border-radius: 10px; background: linear-gradient(135deg,#064e3b,#059669); color: white; border: none; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600; box-shadow: 0 4px 14px rgba(6,78,59,0.22); transition: all 0.25s; }
      .dd-not-found-btn:hover { transform: translateY(-2px); }
      @media (max-width: 768px) {
        .dd-content { padding: 24px 16px 60px; }
        .dd-header-inner { padding: 16px 20px 20px; }
        .dd-stats { grid-template-columns: 1fr; }
        .dd-tab-content { padding: 22px 18px; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(link);
      const s = document.getElementById("dd-styles");
      if (s) document.head.removeChild(s);
    };
  }, []);
  return null;
};

const DiseaseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [disease, setDisease] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const fetchDisease = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/diseases/${id}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setDisease(res.data);
      } catch (error) {
        alert("Failed to load disease");
      } finally {
        setLoading(false);
      }
    };
    fetchDisease();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this disease? This action cannot be undone.")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/diseases/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Disease deleted successfully");
      navigate(-1);
    } catch (error) {
      alert("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="dd-center">
        <DetailStyles />
        <div style={{ textAlign: "center" }}>
          <div className="dd-spin" />
          <p style={{ fontSize: 14, color: "#6b7c74", fontWeight: 500, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Loading disease information...</p>
        </div>
      </div>
    );
  }

  if (!disease) {
    return (
      <div className="dd-center">
        <DetailStyles />
        <div className="dd-not-found">
          <div className="dd-not-found-ico">
            <svg width="32" height="32" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <h2>Disease Not Found</h2>
          <p>The disease you're looking for doesn't exist.</p>
          <button className="dd-not-found-btn" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    );
  }

  const sections = [
    { key: "description",      icon: "📋", label: "Description",       value: disease.description },
    { key: "etiology",         icon: "🔬", label: "Etiology",          value: disease.etiology },
    { key: "pathophysiology",  icon: "🧬", label: "Pathophysiology",   value: disease.pathophysiology },
    { key: "clinicalFeatures", icon: "🩺", label: "Clinical Features", value: disease.clinicalFeatures },
    { key: "diagnosis",        icon: "🔍", label: "Diagnosis",         value: disease.diagnosis },
    { key: "treatment",        icon: "💊", label: "Treatment",         value: disease.treatment },
    { key: "complications",    icon: "⚠️", label: "Complications",     value: disease.complications },
    { key: "prognosis",        icon: "📊", label: "Prognosis",         value: disease.prognosis },
  ].filter(s => s.value);

  const SECTION_COLORS = {
    description: "#059669", etiology: "#3b82f6",
    pathophysiology: "#7c3aed", clinicalFeatures: "#f97316",
    diagnosis: "#06b6d4", treatment: "#22c55e",
    complications: "#ef4444", prognosis: "#6366f1",
  };

  const TAB_KEYS = {
    overview: ["description", "etiology"],
    medical:  ["pathophysiology", "clinicalFeatures", "diagnosis"],
    clinical: ["treatment", "complications", "prognosis"],
  };
  const TAB_COLORS = { overview: "#059669", medical: "#7c3aed", clinical: "#f97316" };

  return (
    <div className="dd-root">
      <DetailStyles />

      <div className="dd-header">
        <div className="dd-header-inner">
          <button className="dd-back-btn" onClick={() => navigate(-1)}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Back to Dashboard
          </button>
          <div className="dd-header-row">
            <div>
              <h1 className="dd-header-h1">{disease.name}</h1>
              <span className="dd-system-badge">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                {disease.organSystem}
              </span>
            </div>
            {isAdmin && (
              <button className="dd-delete-btn" onClick={handleDelete}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                Delete Disease
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="dd-content">
        <div className="dd-stats">
          <div className="dd-stat-card">
            <div className="dd-stat-ico" style={{ background: "rgba(16,185,129,0.08)" }}>📚</div>
            <div>
              <div className="dd-stat-label">Information Sections</div>
              <div className="dd-stat-val" style={{ fontSize: "2rem" }}>{sections.length}</div>
            </div>
          </div>
          <div className="dd-stat-card">
            <div className="dd-stat-ico" style={{ background: "rgba(249,115,22,0.08)" }}>🏥</div>
            <div>
              <div className="dd-stat-label">System Category</div>
              <div className="dd-stat-val" style={{ fontSize: "1.1rem" }}>{disease.organSystem}</div>
            </div>
          </div>
          <div className="dd-verified-card">
            <div className="dd-verified-ico">✅</div>
            <div>
              <div className="dd-verified-label">Status</div>
              <div className="dd-verified-val">Verified Info</div>
            </div>
          </div>
        </div>

        <div className="dd-tabs-wrap">
          <div className="dd-tabs">
            {[
              { key: "overview", label: "📋 Overview" },
              { key: "medical",  label: "🔬 Medical Details" },
              { key: "clinical", label: "💊 Treatment & Care" },
            ].map(({ key, label }) => (
              <button
                key={key}
                className={`dd-tab${activeTab === key ? " active" : ""}`}
                style={activeTab === key ? { borderBottom: `2.5px solid ${TAB_COLORS[key]}`, color: TAB_COLORS[key] } : {}}
                onClick={() => setActiveTab(key)}
              >{label}</button>
            ))}
          </div>
        </div>

        <div className="dd-tab-content">
          {sections.filter(s => TAB_KEYS[activeTab].includes(s.key)).map(section => (
            <div key={section.key} className="dd-section" style={{ borderLeftColor: SECTION_COLORS[section.key] }}>
              <h3 className="dd-section-h3"><span style={{ fontSize: 20 }}>{section.icon}</span>{section.label}</h3>
              <p className="dd-section-p">{section.value}</p>
            </div>
          ))}
          {sections.filter(s => TAB_KEYS[activeTab].includes(s.key)).length === 0 && (
            <p style={{ color: "#9cad9c", fontSize: 14, textAlign: "center", padding: "24px 0" }}>No information available for this section.</p>
          )}
        </div>

        <div className="dd-disclaimer">
          <div className="dd-disclaimer-ico">
            <svg width="20" height="20" fill="none" stroke="#f97316" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          </div>
          <div>
            <div className="dd-disclaimer-h4">Medical Disclaimer</div>
            <p className="dd-disclaimer-p">This information is for educational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetail;