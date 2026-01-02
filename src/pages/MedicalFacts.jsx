// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const MedicalFacts = () => {
//   const navigate = useNavigate();
//   const [facts, setFacts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFacts = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/medical-facts`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });
//         setFacts(res.data);
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setLoading(false);
//       }
//     };
//     fetchFacts();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <button
//           onClick={() => navigate(-1)}
//           className="mb-8 flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold text-lg"
//         >
//           ← Back to Dashboard
//         </button>

//         <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
//           <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">All Medical Facts</h1>

//           {loading ? (
//             <div className="text-center py-20">
//               <div className="animate-spin rounded-full h-16 w-16 border-6 border-cyan-300 border-t-cyan-600 mx-auto"></div>
//             </div>
//           ) : facts.length === 0 ? (
//             <div className="text-center py-32 text-gray-500">
//               <p className="text-2xl font-medium">No medical facts available yet</p>
//               <p className="mt-4">Check back later!</p>
//             </div>
//           ) : (
//             <div className="space-y-8">
//               {facts.map((fact, index) => (
//                 <div
//                   key={fact._id}
//                   className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl p-8 border border-cyan-200 shadow-lg hover:shadow-xl transition"
//                 >
//                   <div className="flex items-start gap-6">
//                     <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-teal-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-md">
//                       {index + 1}
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="text-2xl font-bold text-gray-900 mb-4">{fact.title}</h3>
//                       <p className="text-gray-700 text-lg leading-relaxed">{fact.description}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicalFacts;

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const MedicalFacts = () => {
  const navigate = useNavigate();
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchFacts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 px-6 py-3 bg-cyan-200 text-cyan-600 hover:text-cyan-700 font-bold rounded-2xl shadow-md hover:shadow-lg transition border border-gray-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>

        {/* Header Section */}
        <div className="bg-gradient-to-br from-cyan-600 via-teal-600 to-blue-600 rounded-3xl p-12 mb-10 shadow-2xl relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-bold mb-5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Knowledge Base
            </div>
            <h1 className="text-5xl font-black text-white mb-4">
              Medical Facts Library
            </h1>
            <p className="text-cyan-100 text-xl max-w-2xl">
              Discover evidence-based medical information and health facts curated by healthcare professionals
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        {!loading && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-md">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Total Medical Facts</p>
                  <p className="text-3xl font-bold text-gray-900">{facts.length}</p>
                </div>
              </div>
              <span className="px-5 py-2 bg-green-100 text-green-700 text-sm font-bold rounded-full">
                Updated Daily
              </span>
            </div>
          </div>
        )}

        {/* Main Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-200 border-t-cyan-600 mb-6"></div>
            <p className="text-gray-600 font-semibold text-lg">Loading medical facts...</p>
          </div>
        ) : facts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-lg border border-gray-100">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Medical Facts Available</h3>
            <p className="text-gray-600 text-lg">Check back later for new health information!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {facts.map((fact, index) => (
              <div
                key={fact._id}
                className="group bg-white rounded-3xl p-8 border border-gray-100 hover:border-cyan-200 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  {/* Number Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-black text-2xl">{index + 1}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">
                        {fact.title}
                      </h3>
                      <span className="px-4 py-1.5 bg-cyan-50 text-cyan-700 rounded-full text-xs font-bold border border-cyan-200">
                        Medical Fact
                      </span>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {fact.description}
                    </p>

                    {/* Decorative Line */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">Verified by medical professionals</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Section */}
        {!loading && facts.length > 0 && (
          <div className="mt-12 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Important Note</h4>
                <p className="text-gray-700 leading-relaxed">
                  This information is for educational purposes only and is carefully sourced from trusted and verified medical references. We take great care to ensure the facts shared are accurate and reliable, with the goal of empowering you with credible health knowledge. 
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

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

export default MedicalFacts;