import { organSystems } from "../data/organSystems";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AddDiseaseModal from "../components/AddDiseaseModal";
import AddFactModal from "../components/AddFactModal";
import axios from "axios";

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
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const counts = {};
        res.data.forEach((d) => {
          counts[d.organSystem] = (counts[d.organSystem] || 0) + 1;
        });

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
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
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
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">Swasthya Admin</h1>
                <p className="text-xs text-gray-500">Management Portal</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {adminName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800">{adminName}</p>
                  <p className="text-xs text-indigo-600">Administrator</p>
                </div>
              </div>

              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition font-semibold shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {adminName}! 👋
          </h2>
          <p className="text-gray-600">
            Manage your medical database and monitor system health
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                Active
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Diseases</h3>
            <p className="text-3xl font-bold text-gray-900">{totalDiseases}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Systems
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Organ Systems</h3>
            <p className="text-3xl font-bold text-gray-900">{organSystems.length}</p>
          </div>

          <div
            className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white hover:shadow-2xl transition transform hover:scale-105 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
            <h3 className="text-white/90 text-sm font-medium mb-1">Quick Action</h3>
            <p className="text-2xl font-bold mb-2">Add Disease</p>
            <p className="text-white/80 text-sm">Click to add new entry</p>
          </div>
        </div>

        {/* Organ Systems Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Organ Systems</h3>
              <p className="text-gray-600 text-sm">Browse and manage diseases by organ system</p>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Disease
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {organSystems.map((sys) => (
                <div
                  key={sys.id}
                  onClick={() => navigate(`/admin/diseases/${sys.id}`)}
                  className="group bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:border-indigo-300 hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition">
                      {sys.icon}
                    </div>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">
                      {diseaseCount[sys.id] || 0} diseases
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition">
                    {sys.name}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    View and manage all diseases related to this system
                  </p>
                  <div className="flex items-center text-indigo-600 text-sm font-semibold group-hover:gap-2 transition-all">
                    View Details
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Medical Facts Section - Shows Only 3 Random Facts */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border-2 border-teal-200 mb-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-3xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                Medical Facts
              </h3>
              <p className="text-gray-600 font-medium">Manage educational medical facts for users</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowAddFact(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold rounded-xl hover:from-teal-600 hover:to-cyan-700 transition shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Fact
              </button>

              <button
                onClick={() => navigate("/admin/medical-facts")}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                See All Facts
              </button>
            </div>
          </div>

          {factsLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-200 border-t-teal-600"></div>
            </div>
          ) : facts.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border-2 border-teal-200">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="text-xl font-bold text-gray-800">No medical facts added yet</p>
              <p className="text-sm mt-2 text-gray-600">Click "Add New Fact" to get started</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Show only 3 random facts */}
              {[...facts].sort(() => 0.5 - Math.random()).slice(0, 3).map((fact, index) => (
                <div
                  key={fact._id}
                  className="bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-teal-300 hover:shadow-xl transition hover:scale-[1.02]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-xl shadow-md">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-black text-gray-900 mb-2">{fact.title}</h4>
                      <p className="text-gray-700 leading-relaxed font-medium line-clamp-3">{fact.description}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Show message if more facts exist */}
              {facts.length > 3 && (
                <div className="text-center pt-4">
                  <p className="text-gray-600 font-medium">
                    ... and {facts.length - 3} more facts
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MODALS */}
        {open && (
          <AddDiseaseModal
            onClose={() => setOpen(false)}
            onSuccess={() => window.location.reload()}
          />
        )}

        {showAddFact && (
          <AddFactModal
            onClose={() => setShowAddFact(false)}
            onSuccess={() => {
              setShowAddFact(false);
              window.location.reload();
            }}
          />
        )}

        {/* Edit Fact Modal */}
        {showEditFact && (
          <AddFactModal
            factToEdit={factToEdit}
            onClose={() => {
              setShowEditFact(false);
              setFactToEdit(null);
            }}
            onSuccess={() => {
              setShowEditFact(false);
              setFactToEdit(null);
              window.location.reload();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

