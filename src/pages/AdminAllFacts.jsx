import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AddFactModal from "../components/AddFactModal";

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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm text-teal-600 hover:text-teal-700 font-bold rounded-xl shadow-md hover:shadow-lg transition group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>

        {/* Header Section */}
        <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-3xl p-10 mb-8 shadow-2xl relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Knowledge Base
              </div>
              <h2 className="text-5xl font-black text-white mb-2">
                Medical Facts Library
              </h2>
              <p className="text-cyan-100 text-lg">
                Manage educational content and health facts for your users
              </p>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                <p className="text-4xl font-black text-white">{facts.length}</p>
                <p className="text-cyan-100 text-sm font-semibold">Total Facts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-teal-200">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-3xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                All Medical Facts
              </h3>
              <p className="text-gray-600 font-medium">
                {facts.length} {facts.length === 1 ? 'fact' : 'facts'} available
              </p>
            </div>
            <button
              onClick={() => setShowAddFact(true)}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold rounded-2xl hover:from-teal-600 hover:to-cyan-700 hover:shadow-2xl transition transform hover:scale-105 shadow-xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Fact
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-200 border-t-teal-600 mb-4"></div>
              <p className="text-gray-600 font-semibold">Loading medical facts...</p>
            </div>
          ) : facts.length === 0 ? (
            <div className="text-center py-20 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border-2 border-teal-200">
              <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-2">No Facts Yet</h4>
              <p className="text-gray-600 mb-6">Start building your knowledge base by adding medical facts</p>
              <button
                onClick={() => setShowAddFact(true)}
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold rounded-xl hover:shadow-lg transition"
              >
                Add Your First Fact
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {facts.map((fact, index) => (
                <div
                  key={fact._id}
                  className="group bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 rounded-2xl p-8 border-2 border-teal-300 hover:border-teal-400 hover:shadow-2xl transition-all "
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex gap-6">
                    {/* Number Badge */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <span className="text-white font-black text-2xl">{index + 1}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl font-black text-gray-900 group-hover:text-teal-600 transition">
                          {fact.title}
                        </h3>
                        <span className="px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-xs font-bold">
                          Medical Fact
                        </span>
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed text-lg mb-6 font-medium">
                        {fact.description}
                      </p>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleEdit(fact)}
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition font-bold shadow-md hover:shadow-xl"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => deleteFact(fact._id)}
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:from-red-600 hover:to-pink-700 transition font-bold shadow-md hover:shadow-xl"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-200 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Quick Tip</h4>
                <p className="text-gray-600 text-sm">
                  Keep facts concise and scientifically accurate. Facts are displayed to users on their dashboard.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-teal-200 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Best Practice</h4>
                <p className="text-gray-600 text-sm">
                  Update facts regularly to ensure users have access to the latest medical information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddFact && (
        <AddFactModal
          onClose={() => setShowAddFact(false)}
          onSuccess={fetchFacts}
        />
      )}

      {showEditFact && (
        <AddFactModal
          factToEdit={factToEdit}
          onClose={() => {
            setShowEditFact(false);
            setFactToEdit(null);
          }}
          onSuccess={fetchFacts}
        />
      )}

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default AdminAllFacts;