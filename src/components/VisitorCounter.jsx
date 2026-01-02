// import { useEffect, useState } from "react";
// import axios from "axios";

// const VisitorCounter = () => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     const trackVisitor = async () => {
//       try {
//         let visitorId = localStorage.getItem("visitorId");

//         if (!visitorId) {
//           visitorId = crypto.randomUUID();
//           localStorage.setItem("visitorId", visitorId);
//         }

//         const res = await axios.post(
//           `${import.meta.env.VITE_API_URL}/api/visitors/visit`,
//           { visitorId }
//         );

//         setCount(res.data.totalVisitors);
//       } catch (error) {
//         console.error("Visitor count error", error);
//       }
//     };

//     trackVisitor();
//   }, []);

//   return (
//     <div className="py-10 text-center">
//       <div className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-2xl shadow-lg">
//         <span className="text-2xl">👥</span>
//         <span className="text-lg font-semibold text-gray-800">
//           {count.toLocaleString()} Visitors
//         </span>
//       </div>
//     </div>
//   );
// };

// export default VisitorCounter;

import { useEffect, useState } from "react";
import axios from "axios";

const VisitorCounter = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/visitors`
        );

        setCount(res.data.count);
        setLoading(false);
      } catch (error) {
        console.error("Visitor count error", error);
        setLoading(false);
      }
    };

    trackVisitor();
  }, []);

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Website Visitors
        </h2>

        <div className="inline-block">
          <div className="bg-white rounded-3xl shadow-2xl p-10 min-w-80 transform transition hover:scale-105">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-4xl">👥</span>
              </div>
            </div>

            <div className="space-y-3">
              {loading ? (
                <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-600 animate-pulse">
                  Loading...
                </div>
              ) : (
                <>
                  <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-600">
                    {count.toLocaleString()}
                  </div>
                  <p className="text-xl font-semibold text-gray-700">
                    Total Visitors
                  </p>
                </>
              )}

              <p className="text-sm text-gray-500 mt-4">
                Thank you for being part of the Swasthya community ❤️
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitorCounter;

