import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
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

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Filter diseases based on search
  const filteredDiseases = diseases.filter((disease) =>
    disease.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading diseases...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">
      {/* Header Section */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate("/user")}
            className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold mb-4 transition group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 capitalize">
                {organ} System Diseases
              </h1>
              <p className="text-gray-600">
                Explore comprehensive information about {organ} system diseases
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-cyan-100 rounded-lg">
              <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-bold text-2xl text-cyan-600">{diseases.length}</span>
              <span className="text-gray-600 text-sm">Available</span>
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
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl p-6 mb-6 text-white shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">Health Information</h3>
              <p className="text-cyan-50 text-sm">
                Click on any disease card to view detailed medical information including symptoms, diagnosis, and treatment options.
              </p>
            </div>
          </div>
        </div>

        {/* Disease List */}
        {filteredDiseases.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-gray-100">
            <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Diseases Found</h3>
            <p className="text-gray-600">
              {searchQuery ? "Try adjusting your search query" : "No diseases available for this organ system yet"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDiseases.map((disease, index) => (
              <div
                key={disease._id}
                className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Card Header */}
                <div
                  onClick={() => toggleExpand(disease._id)}
                  className="p-6 cursor-pointer hover:bg-gradient-to-r hover:from-cyan-50 hover:to-teal-50 transition group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-cyan-600 transition">
                          {disease.name}
                        </h2>
                        {expandedId === disease._id ? (
                          <svg className="w-5 h-5 text-cyan-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-cyan-600 flex-shrink-0 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </div>
                      <p className="text-gray-600 leading-relaxed line-clamp-2">
                        {disease.description || "Click to view more details about this disease"}
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 transition text-sm font-semibold flex-shrink-0">
                      Learn More
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedId === disease._id && (
                  <div className="border-t border-gray-200 bg-gradient-to-br from-gray-50 to-cyan-50/30 p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Detail icon="📋" title="Overview" value={disease.description} color="blue" />
                      <Detail icon="🔬" title="Etiology" value={disease.etiology} color="purple" />
                      <Detail icon="🧬" title="Pathophysiology" value={disease.pathophysiology} color="pink" />
                      <Detail icon="🩺" title="Clinical Features" value={disease.clinicalFeatures} color="teal" />
                      <Detail icon="🔍" title="Diagnosis" value={disease.diagnosis} color="cyan" />
                      <Detail icon="💊" title="Treatment" value={disease.treatment} color="green" />
                      <Detail icon="⚠️" title="Complications" value={disease.complications} color="orange" />
                      <Detail icon="📊" title="Prognosis" value={disease.prognosis} color="indigo" />
                    </div>

                    {/* Disclaimer */}
                    <div className="mt-6 bg-amber-50 border-l-4 border-amber-500 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="text-sm text-gray-700">
                          <strong className="font-semibold">Medical Disclaimer:</strong> This information is for educational purposes only. Consult a healthcare professional for medical advice.
                        </p>
                      </div>
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

/* ===== REUSABLE DETAIL COMPONENT ===== */
const Detail = ({ icon, title, value, color }) => {
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

export default UserDiseaseList;