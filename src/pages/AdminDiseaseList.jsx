import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
    name: "",
    description: "",
    etiology: "",
    pathophysiology: "",
    clinicalFeatures: "",
    diagnosis: "",
    treatment: "",
    complications: "",
    prognosis: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ================= FETCH DISEASES ================= */
  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/diseases/organ/${organ}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
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
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
      name: disease.name || "",
      description: disease.description || "",
      etiology: disease.etiology || "",
      pathophysiology: disease.pathophysiology || "",
      clinicalFeatures: disease.clinicalFeatures || "",
      diagnosis: disease.diagnosis || "",
      treatment: disease.treatment || "",
      complications: disease.complications || "",
      prognosis: disease.prognosis || "",
    });
    setIsEditModalOpen(true);
  };

  /* ================= ✅ NEW: CLOSE EDIT MODAL ================= */
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingDisease(null);
    setEditFormData({
      name: "",
      description: "",
      etiology: "",
      pathophysiology: "",
      clinicalFeatures: "",
      diagnosis: "",
      treatment: "",
      complications: "",
      prognosis: "",
    });
  };

  /* ================= ✅ NEW: HANDLE INPUT CHANGE ================= */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= ✅ NEW: SUBMIT EDIT ================= */
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/diseases/${editingDisease._id}`,
        editFormData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update the disease in the list
      setDiseases((prev) =>
        prev.map((d) => (d._id === editingDisease._id ? res.data : d))
      );

      alert("Disease updated successfully!");
      handleCloseModal();
    } catch (error) {
      alert("Failed to update disease. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Filter diseases based on search
  const filteredDiseases = diseases.filter((disease) =>
    disease.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading diseases...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header Section */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold mb-4 transition group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 capitalize">
                {organ} Diseases
              </h1>
              <p className="text-gray-600">
                Manage and edit diseases in the {organ} system
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-lg">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-bold text-2xl text-indigo-600">{diseases.length}</span>
              <span className="text-gray-600 text-sm">Total</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 border border-gray-100">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search diseases by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Disease List */}
        {filteredDiseases.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Diseases Found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery ? "Try adjusting your search" : "No diseases have been added to this system yet"}
            </p>
            {!searchQuery && (
              <button
                onClick={() => navigate("/admin")}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Add New Disease
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDiseases.map((disease, index) => (
              <div
                key={disease._id}
                className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* ===== HEADER ===== */}
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => toggleExpand(disease._id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-bold text-gray-900">{disease.name}</h2>
                        {expandedId === disease._id ? (
                          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </div>
                      <p className="text-gray-600 leading-relaxed line-clamp-2">
                        {disease.description || "No description available"}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(disease);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition shadow-md"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(disease._id);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                {/* ===== EXPANDED MEDICAL DETAILS ===== */}
                {expandedId === disease._id && (
                  <div className="border-t border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Section icon="📋" title="Overview" value={disease.description} color="blue" />
                      <Section icon="🔬" title="Etiology" value={disease.etiology} color="purple" />
                      <Section icon="🧬" title="Pathophysiology" value={disease.pathophysiology} color="pink" />
                      <Section icon="🩺" title="Clinical Features" value={disease.clinicalFeatures} color="teal" />
                      <Section icon="🔍" title="Diagnosis" value={disease.diagnosis} color="cyan" />
                      <Section icon="💊" title="Treatment" value={disease.treatment} color="green" />
                      <Section icon="⚠️" title="Complications" value={disease.complications} color="orange" />
                      <Section icon="📊" title="Prognosis" value={disease.prognosis} color="indigo" />
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
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={handleCloseModal}
          ></div>

          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Edit Disease</h2>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Body - Scrollable */}
              <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-6">
                <div className="space-y-6">
                  {/* Disease Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Disease Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                      placeholder="Enter disease name"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={editFormData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                      placeholder="Brief overview of the disease"
                    />
                  </div>

                  {/* Grid Layout for Other Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Etiology */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Etiology
                      </label>
                      <textarea
                        name="etiology"
                        value={editFormData.etiology}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                        placeholder="Causes and origin"
                      />
                    </div>

                    {/* Pathophysiology */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Pathophysiology
                      </label>
                      <textarea
                        name="pathophysiology"
                        value={editFormData.pathophysiology}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                        placeholder="Disease mechanism"
                      />
                    </div>

                    {/* Clinical Features */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Clinical Features
                      </label>
                      <textarea
                        name="clinicalFeatures"
                        value={editFormData.clinicalFeatures}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                        placeholder="Signs and symptoms"
                      />
                    </div>

                    {/* Diagnosis */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Diagnosis
                      </label>
                      <textarea
                        name="diagnosis"
                        value={editFormData.diagnosis}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                        placeholder="Diagnostic methods"
                      />
                    </div>

                    {/* Treatment */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Treatment
                      </label>
                      <textarea
                        name="treatment"
                        value={editFormData.treatment}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                        placeholder="Treatment options"
                      />
                    </div>

                    {/* Complications */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Complications
                      </label>
                      <textarea
                        name="complications"
                        value={editFormData.complications}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                        placeholder="Potential complications"
                      />
                    </div>
                  </div>

                  {/* Prognosis - Full Width */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Prognosis
                    </label>
                    <textarea
                      name="prognosis"
                      value={editFormData.prognosis}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                      placeholder="Expected outcome"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition font-semibold disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSubmit}
                  disabled={isSubmitting || !editFormData.name.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Update Disease
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ===== REUSABLE SECTION COMPONENT ===== */
const Section = ({ icon, title, value, color }) => {
  const colorClasses = {
    blue: "border-blue-500 bg-blue-50",
    purple: "border-purple-500 bg-purple-50",
    pink: "border-pink-500 bg-pink-50",
    teal: "border-teal-500 bg-teal-50",
    cyan: "border-cyan-500 bg-cyan-50",
    green: "border-green-500 bg-green-50",
    orange: "border-orange-500 bg-orange-50",
    indigo: "border-indigo-500 bg-indigo-50",
  };

  return (
    <div className={`${colorClasses[color]} border-l-4 rounded-lg p-4 shadow-sm`}>
      <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-2">
        <span className="text-xl">{icon}</span>
        {title}
      </h3>
      <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
        {value || "No information available"}
      </p>
    </div>
  );
};

export default AdminDiseaseList;