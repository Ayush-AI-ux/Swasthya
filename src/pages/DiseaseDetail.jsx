import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
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
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Disease deleted successfully");
      navigate(-1);
    } catch (error) {
      alert("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading disease information...</p>
        </div>
      </div>
    );
  }

  if (!disease) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Disease Not Found</h2>
          <p className="text-gray-600 mb-6">The disease you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const sections = [
    { key: "description", icon: "📋", label: "Description", value: disease.description },
    { key: "etiology", icon: "🔬", label: "Etiology", value: disease.etiology },
    { key: "pathophysiology", icon: "🧬", label: "Pathophysiology", value: disease.pathophysiology },
    { key: "clinicalFeatures", icon: "🩺", label: "Clinical Features", value: disease.clinicalFeatures },
    { key: "diagnosis", icon: "🔍", label: "Diagnosis", value: disease.diagnosis },
    { key: "treatment", icon: "💊", label: "Treatment", value: disease.treatment },
    { key: "complications", icon: "⚠️", label: "Complications", value: disease.complications },
    { key: "prognosis", icon: "📊", label: "Prognosis", value: disease.prognosis },
  ].filter(section => section.value);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold mb-4 transition group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{disease.name}</h1>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  {disease.organSystem}
                </span>
              </div>
            </div>

            {isAdmin && (
              <div className="flex gap-3">
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Disease
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                📚
              </div>
              <div>
                <p className="text-gray-600 text-sm">Information Sections</p>
                <p className="text-2xl font-bold text-gray-900">{sections.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-2xl">
                🏥
              </div>
              <div>
                <p className="text-gray-600 text-sm">System Category</p>
                <p className="text-lg font-bold text-gray-900 capitalize">{disease.organSystem}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl p-6 shadow-lg text-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-2xl">
                ✅
              </div>
              <div>
                <p className="text-cyan-50 text-sm">Status</p>
                <p className="text-lg font-bold">Verified Info</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-t-2xl shadow-md border-b border-gray-200">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-4 font-semibold transition border-b-2 whitespace-nowrap ${
                activeTab === "overview"
                  ? "border-cyan-600 text-cyan-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              📋 Overview
            </button>
            <button
              onClick={() => setActiveTab("medical")}
              className={`px-6 py-4 font-semibold transition border-b-2 whitespace-nowrap ${
                activeTab === "medical"
                  ? "border-cyan-600 text-cyan-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              🔬 Medical Details
            </button>
            <button
              onClick={() => setActiveTab("clinical")}
              className={`px-6 py-4 font-semibold transition border-b-2 whitespace-nowrap ${
                activeTab === "clinical"
                  ? "border-cyan-600 text-cyan-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              💊 Treatment & Care
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-b-2xl shadow-md p-8">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {sections.filter(s => ["description", "etiology"].includes(s.key)).map((section) => (
                <div key={section.key} className="border-l-4 border-cyan-500 pl-6 py-2">
                  <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-3">
                    <span className="text-2xl">{section.icon}</span>
                    {section.label}
                  </h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{section.value}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "medical" && (
            <div className="space-y-6">
              {sections.filter(s => ["pathophysiology", "clinicalFeatures", "diagnosis"].includes(s.key)).map((section) => (
                <div key={section.key} className="border-l-4 border-purple-500 pl-6 py-2">
                  <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-3">
                    <span className="text-2xl">{section.icon}</span>
                    {section.label}
                  </h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{section.value}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "clinical" && (
            <div className="space-y-6">
              {sections.filter(s => ["treatment", "complications", "prognosis"].includes(s.key)).map((section) => (
                <div key={section.key} className="border-l-4 border-teal-500 pl-6 py-2">
                  <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-3">
                    <span className="text-2xl">{section.icon}</span>
                    {section.label}
                  </h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{section.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Important Notice */}
        <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-lg p-6 shadow-md">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Medical Disclaimer</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                This information is for educational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetail;