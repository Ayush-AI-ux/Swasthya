import { organSystems } from "../data/organSystems";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Swasthya Logo" className="h-12 w-auto" />
              <div>
                <span className="text-xl font-bold text-gray-800 block">Swasthya</span>
                <span className="text-xs text-gray-600">Health Made Simple</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-lg border border-cyan-200">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800">{userName}</p>
                  <p className="text-xs text-cyan-600">Member</p>
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
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl p-8 mb-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-2">
              Welcome back, {userName}! 👋
            </h2>
            <p className="text-cyan-50 text-lg">
              Explore comprehensive health information and learn about various diseases
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Diseases</p>
                <p className="text-3xl font-bold text-gray-900">{totalDiseases}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium">Organ Systems</p>
                <p className="text-3xl font-bold text-gray-900">{organSystems.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search organ systems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              />
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-teal-600 transition shadow-md">
              Search
            </button>
          </div>
        </div>

        {/* Organ Systems Grid */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 mb-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-1">Explore Organ Systems</h3>
            <p className="text-gray-600 text-sm">Select a system to view related diseases and information</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
            </div>
          ) : filteredSystems.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="font-medium">No organ systems found</p>
              <p className="text-sm mt-2">Try adjusting your search</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSystems.map((sys) => (
                <div
                  key={sys.id}
                  onClick={() => navigate(`/diseases/${sys.id}`)}
                  className="group bg-gradient-to-br from-white to-cyan-50/50 rounded-xl p-6 border border-gray-200 hover:border-cyan-300 hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-xl flex items-center justify-center text-4xl group-hover:scale-110 transition shadow-md">
                      {sys.icon}
                    </div>
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-700 text-xs font-bold rounded-full">
                      {diseaseCount[sys.id] || 0} diseases
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition">
                    {sys.name}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Explore diseases, symptoms, and treatments for this system
                  </p>
                  <div className="flex items-center text-cyan-600 text-sm font-semibold group-hover:gap-2 transition-all">
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

        {/* Medical Facts - Show 3 Random Facts + See All Button */}
        <div className="relative bg-gradient-to-br from-cyan-50 to-teal-50 rounded-3xl shadow-2xl overflow-hidden border border-cyan-200 mb-10">
          {/* Subtle Medical Background Pattern */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none">
              <path d="M0 300 L200 300 L240 200 L280 400 L320 300 L1200 300" stroke="#0891b2" strokeWidth="4" opacity="0.6"/>
              <path d="M0 320 L200 320 L240 420 L280 220 L320 320 L1200 320" stroke="#06b6d4" strokeWidth="3" opacity="0.4"/>
              <g opacity="0.3">
                <path d="M150 150 L150 250 M100 200 L200 200" stroke="#06b6d4" strokeWidth="8"/>
                <circle cx="600" cy="200" r="50" stroke="#0891b2" strokeWidth="6" fill="none"/>
                <path d="M600 150 L600 250 M550 200 L650 200" stroke="#0891b2" strokeWidth="6"/>
                <path d="M900 350 Q950 300 1000 350 Q950 400 900 350" stroke="#06b6d4" strokeWidth="10" fill="none"/>
                <path d="M300 400 L350 450 L450 350 L400 300" stroke="#0891b2" strokeWidth="8" fill="none"/>
              </g>
            </svg>
          </div>

          <div className="relative p-10">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-3xl font-bold text-gray-900">Medical Facts</h3>
              <button
                onClick={() => navigate("/medical-facts")}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-semibold rounded-xl hover:from-cyan-700 hover:to-teal-700 transition shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                See All Facts
              </button>
            </div>

            {factsLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-300 border-t-cyan-600"></div>
              </div>
            ) : facts.length === 0 ? (
              <div className="text-center py-20 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl border-2 border-teal-200">
                <div className="w-32 h-32 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-16 h-16 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-gray-800">No medical facts added yet</p>
                <p className="text-lg text-gray-600 mt-2">Check back soon for health insights!</p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Show only 3 random facts */}
                {[...facts]
                  .sort(() => 0.5 - Math.random())
                  .slice(0, 3)
                  .map((fact, index) => (
                    <div
                      key={fact._id}
                      className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-cyan-100 shadow-xl hover:shadow-2xl transition transform hover:scale-[1.02]"
                    >
                      <div className="flex items-start gap-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-2xl font-bold text-gray-900 mb-4">{fact.title}</h4>
                          <p className="text-gray-700 text-lg leading-relaxed">{fact.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                {/* Show message if more facts exist */}
                {facts.length > 3 && (
                  <div className="text-center pt-6">
                    <p className="text-gray-600 font-medium text-lg">
                      ... and {facts.length - 3} more interesting facts available!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-2">Health Tip</h4>
                <p className="text-blue-50 text-sm">
                  Prevention is better than cure. Stay informed to maintain good health.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-500 to-green-500 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-2">Need Help?</h4>
                <p className="text-teal-50 text-sm">
                  Contact support for any questions about health information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add animations */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-bounce {
          animation: bounce 4s infinite ease-in-out;
        }
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-1000 { animation-delay: 1s; }
        .delay-1500 { animation-delay: 1.5s; }
        .delay-2000 { animation-delay: 2s; }
        .delay-2500 { animation-delay: 2.5s; }
      `}</style>
    </div>
  );
};

export default UserDashboard;