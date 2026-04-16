import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminListStyles = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.id = "adl-styles";
    style.textContent = `
      .adl-root { min-height: 100vh; font-family: 'Plus Jakarta Sans', sans-serif; background: #f8faf9; color: #0f1f18; }
      .adl-header { background: white; border-bottom: 1px solid #e2ece7; box-shadow: 0 1px 20px rgba(6,78,59,0.06); position: sticky; top: 0; z-index: 100; }
      .adl-header-inner { max-width: 1280px; margin: 0 auto; padding: 20px 32px 24px; }
      .adl-back-btn { display: inline-flex; align-items: center; gap: 8px; padding: 8px 18px; border-radius: 9px; background: transparent; border: 1.5px solid #e2ece7; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600; color: #6b7c74; cursor: pointer; transition: all 0.25s; margin-bottom: 18px; }
      .adl-back-btn:hover { border-color: #059669; color: #059669; background: rgba(16,185,129,0.04); }
      .adl-header-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
      .adl-header-h1 { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem,3.5vw,2.6rem); font-weight: 800; color: #0f1f18; letter-spacing: -0.02em; margin-bottom: 6px; text-transform: capitalize; }
      .adl-header-sub { font-size: 14px; color: #6b7c74; }
      .adl-count-badge { display: flex; align-items: center; gap: 10px; padding: 12px 20px; border-radius: 14px; background: rgba(16,185,129,0.06); border: 1.5px solid rgba(16,185,129,0.18); flex-shrink: 0; }
      .adl-count-num { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 700; color: #059669; line-height: 1; }
      .adl-count-label { font-size: 12px; color: #6b7c74; font-weight: 500; }
      .adl-content { max-width: 1280px; margin: 0 auto; padding: 32px 32px 72px; }
      .adl-search-wrap { background: white; border-radius: 14px; padding: 16px 20px; margin-bottom: 20px; border: 1px solid #e2ece7; box-shadow: 0 4px 16px rgba(6,78,59,0.04); position: relative; }
      .adl-search-icon { position: absolute; left: 34px; top: 50%; transform: translateY(-50%); color: #9cad9c; pointer-events: none; }
      .adl-search-input { width: 100%; padding: 12px 16px 12px 46px; border: 1.5px solid #e2ece7; border-radius: 11px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; color: #0f1f18; background: #f8faf9; outline: none; transition: all 0.25s; }
      .adl-search-input::placeholder { color: #9cad9c; }
      .adl-search-input:focus { border-color: #059669; background: white; box-shadow: 0 0 0 4px rgba(16,185,129,0.10); }
      .adl-empty { background: white; border-radius: 18px; padding: 56px 20px; text-align: center; border: 1px solid #e2ece7; box-shadow: 0 4px 20px rgba(6,78,59,0.05); }
      .adl-empty-ico { width: 72px; height: 72px; border-radius: 50%; background: rgba(16,185,129,0.07); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
      .adl-empty-h3 { font-family: 'Playfair Display', serif; font-size: 19px; font-weight: 700; color: #0f1f18; margin-bottom: 6px; }
      .adl-empty-p { font-size: 14px; color: #6b7c74; margin-bottom: 20px; }
      .adl-add-btn { padding: 11px 28px; border-radius: 10px; background: linear-gradient(135deg,#064e3b,#059669); color: white; border: none; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600; box-shadow: 0 4px 14px rgba(6,78,59,0.22); transition: all 0.25s; }
      .adl-add-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(6,78,59,0.30); }
      .adl-list { display: flex; flex-direction: column; gap: 14px; }
      .adl-disease-card { background: white; border-radius: 16px; border: 1.5px solid #e2ece7; overflow: hidden; box-shadow: 0 2px 12px rgba(6,78,59,0.04); transition: box-shadow 0.3s; }
      .adl-disease-card:hover { box-shadow: 0 12px 36px rgba(6,78,59,0.09); }
      .adl-card-head { padding: 22px 24px; cursor: pointer; transition: background 0.2s; display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
      .adl-card-head:hover { background: rgba(16,185,129,0.03); }
      .adl-card-left { flex: 1; }
      .adl-card-title-row { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
      .adl-card-title { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #0f1f18; transition: color 0.2s; }
      .adl-card-head:hover .adl-card-title { color: #059669; }
      .adl-card-desc { font-size: 13px; color: #6b7c74; line-height: 1.55; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      .adl-card-actions { display: flex; gap: 8px; flex-shrink: 0; }
      .adl-edit-btn { display: flex; align-items: center; gap: 7px; padding: 9px 18px; border-radius: 9px; background: linear-gradient(135deg,#f59e0b,#fbbf24); color: white; border: none; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 600; box-shadow: 0 3px 10px rgba(245,158,11,0.22); transition: all 0.25s; }
      .adl-edit-btn:hover { transform: translateY(-2px); box-shadow: 0 7px 18px rgba(245,158,11,0.30); }
      .adl-del-btn  { display: flex; align-items: center; gap: 7px; padding: 9px 18px; border-radius: 9px; background: linear-gradient(135deg,#ef4444,#f87171); color: white; border: none; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 600; box-shadow: 0 3px 10px rgba(239,68,68,0.20); transition: all 0.25s; }
      .adl-del-btn:hover { transform: translateY(-2px); box-shadow: 0 7px 18px rgba(239,68,68,0.30); }
      .adl-chevron { width: 30px; height: 30px; border-radius: 8px; background: rgba(16,185,129,0.07); border: 1px solid rgba(16,185,129,0.14); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .adl-expanded { border-top: 1.5px solid #e2ece7; background: #f8faf9; padding: 28px 24px; }
      .adl-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
      .adl-detail-item { border-radius: 12px; padding: 16px 18px; border-left: 3px solid; }
      .adl-detail-h3 { font-size: 13px; font-weight: 700; color: #0f1f18; margin-bottom: 7px; display: flex; align-items: center; gap: 7px; }
      .adl-detail-p  { font-size: 13px; color: #4b5563; line-height: 1.65; white-space: pre-line; }
      .adl-loader { display: flex; flex-direction: column; align-items: center; padding: 64px 20px; }
      .adl-spin { width: 44px; height: 44px; border-radius: 50%; border: 3px solid rgba(16,185,129,0.15); border-top-color: #059669; animation: adlSpin 0.8s linear infinite; margin-bottom: 16px; }
      @keyframes adlSpin { to { transform: rotate(360deg); } }

      /* MODAL */
      .adl-modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; }
      .adl-modal { background: white; border-radius: 22px; width: 100%; max-width: 860px; max-height: 90vh; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 40px 80px rgba(0,0,0,0.20); animation: adlModalIn 0.35s cubic-bezier(0.23,1,0.32,1); }
      @keyframes adlModalIn { from { opacity:0; transform: scale(0.95) translateY(16px); } to { opacity:1; transform: scale(1) translateY(0); } }
      .adl-modal-header { background: linear-gradient(135deg,#064e3b,#065f46); padding: 22px 28px; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
      .adl-modal-header-left { display: flex; align-items: center; gap: 12px; }
      .adl-modal-header-ico { width: 38px; height: 38px; border-radius: 10px; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; }
      .adl-modal-h2 { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: white; }
      .adl-modal-close { width: 36px; height: 36px; border-radius: 9px; background: rgba(255,255,255,0.12); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
      .adl-modal-close:hover { background: rgba(255,255,255,0.22); }
      .adl-modal-body { overflow-y: auto; flex: 1; padding: 28px; }
      .adl-modal-field { margin-bottom: 18px; }
      .adl-modal-label { display: block; font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 600; color: #0f1f18; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 7px; }
      .adl-modal-req { color: #ef4444; margin-left: 2px; }
      .adl-modal-input, .adl-modal-textarea { width: 100%; padding: 12px 16px; border: 1.5px solid #e2ece7; border-radius: 11px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; color: #0f1f18; background: #f8faf9; outline: none; transition: all 0.25s; }
      .adl-modal-input::placeholder, .adl-modal-textarea::placeholder { color: #9cad9c; }
      .adl-modal-input:focus, .adl-modal-textarea:focus { border-color: #059669; background: white; box-shadow: 0 0 0 4px rgba(16,185,129,0.10); }
      .adl-modal-textarea { resize: none; }
      .adl-modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
      .adl-modal-footer { background: #f8faf9; border-top: 1px solid #e2ece7; padding: 18px 28px; display: flex; align-items: center; justify-content: flex-end; gap: 10px; flex-shrink: 0; }
      .adl-modal-cancel { padding: 11px 24px; border-radius: 10px; border: 1.5px solid #e2ece7; background: white; color: #6b7c74; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
      .adl-modal-cancel:hover { border-color: #9cad9c; color: #0f1f18; }
      .adl-modal-cancel:disabled { opacity: 0.5; }
      .adl-modal-submit { padding: 11px 28px; border-radius: 10px; background: linear-gradient(135deg,#064e3b,#065f46); color: white; border: none; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 700; box-shadow: 0 4px 14px rgba(6,78,59,0.22); transition: all 0.25s; display: flex; align-items: center; gap: 8px; }
      .adl-modal-submit:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(6,78,59,0.30); }
      .adl-modal-submit:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
      @keyframes adlModalSpin { to { transform: rotate(360deg); } }
      .adl-modal-spinner { width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; animation: adlModalSpin 0.7s linear infinite; }

      @media (max-width: 768px) {
        .adl-content { padding: 24px 16px 60px; }
        .adl-header-inner { padding: 16px 20px 20px; }
        .adl-detail-grid { grid-template-columns: 1fr; }
        .adl-modal-grid { grid-template-columns: 1fr; }
        .adl-card-actions { flex-direction: column; }
        .adl-count-badge { display: none; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(link);
      const s = document.getElementById("adl-styles");
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

const Section = ({ icon, title, value, color }) => {
  const c = DETAIL_COLORS[color] || DETAIL_COLORS.teal;
  return (
    <div className="adl-detail-item" style={{ background: c.bg, borderLeftColor: c.border }}>
      <div className="adl-detail-h3"><span style={{ fontSize: 16 }}>{icon}</span>{title}</div>
      <p className="adl-detail-p">{value || "No information available"}</p>
    </div>
  );
};

const AdminDiseaseList = () => {
  const { organ } = useParams();
  const navigate = useNavigate();

  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ NEW: Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDisease, setEditingDisease] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "", description: "", etiology: "", pathophysiology: "",
    clinicalFeatures: "", diagnosis: "", treatment: "", complications: "", prognosis: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ================= FETCH DISEASES ================= */
  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/diseases/organ/${organ}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setDiseases(res.data);
      } catch (error) {
        alert("Failed to fetch diseases");
      } finally {
        setLoading(false);
      }
    };
    fetchDiseases();
  }, [organ]);

  /* ================= DELETE DISEASE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this disease? This action cannot be undone.")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/diseases/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setDiseases((prev) => prev.filter((d) => d._id !== id));
      alert("Disease deleted successfully");
    } catch (error) {
      alert("Failed to delete disease");
    }
  };

  /* ================= ✅ NEW: OPEN EDIT MODAL ================= */
  const handleEditClick = (disease) => {
    setEditingDisease(disease);
    setEditFormData({
      name: disease.name || "", description: disease.description || "",
      etiology: disease.etiology || "", pathophysiology: disease.pathophysiology || "",
      clinicalFeatures: disease.clinicalFeatures || "", diagnosis: disease.diagnosis || "",
      treatment: disease.treatment || "", complications: disease.complications || "",
      prognosis: disease.prognosis || "",
    });
    setIsEditModalOpen(true);
  };

  /* ================= ✅ NEW: CLOSE EDIT MODAL ================= */
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingDisease(null);
    setEditFormData({ name:"",description:"",etiology:"",pathophysiology:"",clinicalFeatures:"",diagnosis:"",treatment:"",complications:"",prognosis:"" });
  };

  /* ================= ✅ NEW: HANDLE INPUT CHANGE ================= */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= ✅ NEW: SUBMIT EDIT ================= */
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/diseases/${editingDisease._id}`,
        editFormData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setDiseases((prev) => prev.map((d) => (d._id === editingDisease._id ? res.data : d)));
      alert("Disease updated successfully!");
      handleCloseModal();
    } catch (error) {
      alert("Failed to update disease. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id);
  const filteredDiseases = diseases.filter((d) => d.name.toLowerCase().includes(searchQuery.toLowerCase()));

  if (loading) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#f8faf9", fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
        <AdminListStyles />
        <div className="adl-loader"><div className="adl-spin" /><span style={{ fontSize:14, color:"#6b7c74", fontWeight:500 }}>Loading diseases...</span></div>
      </div>
    );
  }

  const FIELDS = [
    { name: "etiology", label: "Etiology", placeholder: "Causes and origin" },
    { name: "pathophysiology", label: "Pathophysiology", placeholder: "Disease mechanism" },
    { name: "clinicalFeatures", label: "Clinical Features", placeholder: "Signs and symptoms" },
    { name: "diagnosis", label: "Diagnosis", placeholder: "Diagnostic methods" },
    { name: "treatment", label: "Treatment", placeholder: "Treatment options" },
    { name: "complications", label: "Complications", placeholder: "Potential complications" },
  ];

  return (
    <div className="adl-root">
      <AdminListStyles />

      {/* HEADER */}
      <div className="adl-header">
        <div className="adl-header-inner">
          <button className="adl-back-btn" onClick={() => navigate("/admin")}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Back to Dashboard
          </button>
          <div className="adl-header-row">
            <div>
              <h1 className="adl-header-h1">{organ} Diseases</h1>
              <p className="adl-header-sub">Manage and edit diseases in the {organ} system</p>
            </div>
            <div className="adl-count-badge">
              <div>
                <div className="adl-count-num">{diseases.length}</div>
                <div className="adl-count-label">Total</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="adl-content">
        <div className="adl-search-wrap">
          <span className="adl-search-icon">
            <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </span>
          <input type="text" placeholder="Search diseases by name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="adl-search-input" />
        </div>

        {filteredDiseases.length === 0 ? (
          <div className="adl-empty">
            <div className="adl-empty-ico"><svg width="28" height="28" fill="none" stroke="#059669" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg></div>
            <h3 className="adl-empty-h3">No Diseases Found</h3>
            <p className="adl-empty-p">{searchQuery ? "Try adjusting your search" : "No diseases have been added to this system yet"}</p>
            {!searchQuery && <button className="adl-add-btn" onClick={() => navigate("/admin")}>Add New Disease</button>}
          </div>
        ) : (
          <div className="adl-list">
            {filteredDiseases.map((disease) => (
              <div key={disease._id} className="adl-disease-card">
                <div className="adl-card-head" onClick={() => toggleExpand(disease._id)}>
                  <div className="adl-card-left">
                    <div className="adl-card-title-row">
                      <span className="adl-card-title">{disease.name}</span>
                      <div className="adl-chevron">
                        {expandedId === disease._id
                          ? <svg width="13" height="13" fill="none" stroke="#059669" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"/></svg>
                          : <svg width="13" height="13" fill="none" stroke="#9cad9c" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                        }
                      </div>
                    </div>
                    <p className="adl-card-desc">{disease.description || "No description available"}</p>
                  </div>
                  <div className="adl-card-actions" onClick={(e) => e.stopPropagation()}>
                    <button className="adl-edit-btn" onClick={() => handleEditClick(disease)}>
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                      Edit
                    </button>
                    <button className="adl-del-btn" onClick={() => handleDelete(disease._id)}>
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      Delete
                    </button>
                  </div>
                </div>
                {expandedId === disease._id && (
                  <div className="adl-expanded">
                    <div className="adl-detail-grid">
                      <Section icon="📋" title="Overview"          value={disease.description}     color="blue"   />
                      <Section icon="🔬" title="Etiology"          value={disease.etiology}        color="purple" />
                      <Section icon="🧬" title="Pathophysiology"   value={disease.pathophysiology} color="pink"   />
                      <Section icon="🩺" title="Clinical Features" value={disease.clinicalFeatures} color="teal"  />
                      <Section icon="🔍" title="Diagnosis"         value={disease.diagnosis}       color="cyan"   />
                      <Section icon="💊" title="Treatment"         value={disease.treatment}       color="green"  />
                      <Section icon="⚠️" title="Complications"     value={disease.complications}   color="orange" />
                      <Section icon="📊" title="Prognosis"         value={disease.prognosis}       color="indigo" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= ✅ NEW: EDIT MODAL ================= */}
      {isEditModalOpen && (
        <div className="adl-modal-backdrop" onClick={handleCloseModal}>
          <div className="adl-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adl-modal-header">
              <div className="adl-modal-header-left">
                <div className="adl-modal-header-ico">
                  <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                </div>
                <h2 className="adl-modal-h2">Edit Disease</h2>
              </div>
              <button className="adl-modal-close" onClick={handleCloseModal}>
                <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            <div className="adl-modal-body">
              <div className="adl-modal-field">
                <label className="adl-modal-label">Disease Name <span className="adl-modal-req">*</span></label>
                <input type="text" name="name" value={editFormData.name} onChange={handleInputChange} required className="adl-modal-input" placeholder="Enter disease name" />
              </div>
              <div className="adl-modal-field">
                <label className="adl-modal-label">Description</label>
                <textarea name="description" value={editFormData.description} onChange={handleInputChange} rows={4} className="adl-modal-textarea" placeholder="Brief overview of the disease" />
              </div>
              <div className="adl-modal-grid">
                {FIELDS.map(({ name, label, placeholder }) => (
                  <div key={name} className="adl-modal-field">
                    <label className="adl-modal-label">{label}</label>
                    <textarea name={name} value={editFormData[name]} onChange={handleInputChange} rows={4} className="adl-modal-textarea" placeholder={placeholder} />
                  </div>
                ))}
              </div>
              <div className="adl-modal-field" style={{ marginBottom: 0 }}>
                <label className="adl-modal-label">Prognosis</label>
                <textarea name="prognosis" value={editFormData.prognosis} onChange={handleInputChange} rows={4} className="adl-modal-textarea" placeholder="Expected outcome" />
              </div>
            </div>

            <div className="adl-modal-footer">
              <button type="button" onClick={handleCloseModal} disabled={isSubmitting} className="adl-modal-cancel">Cancel</button>
              <button onClick={handleEditSubmit} disabled={isSubmitting || !editFormData.name.trim()} className="adl-modal-submit">
                {isSubmitting ? (
                  <><div className="adl-modal-spinner" />Updating...</>
                ) : (
                  <><svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>Update Disease</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDiseaseList;