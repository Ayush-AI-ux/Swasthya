// import { useState } from "react";
// import axios from "axios";

// const AddFactModal = ({ onClose, onSuccess }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await axios.post(
//         "http://localhost:5000/api/medical-facts",
//         { title, description },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       alert("Medical fact added ✅");
//       onSuccess();
//       onClose();
//     } catch (err) {
//       alert("Failed to add fact ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-xl w-full max-w-md">
//         <h2 className="text-xl font-bold mb-4">Add Medical Fact</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Fact Title"
//             className="w-full border p-2 rounded"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />

//           <textarea
//             placeholder="Fact Description"
//             className="w-full border p-2 rounded"
//             rows="4"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />

//           <div className="flex justify-end gap-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-300 rounded"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={loading}
//               className="px-4 py-2 bg-indigo-600 text-white rounded"
//             >
//               {loading ? "Saving..." : "Add Fact"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddFactModal;


import { useState, useEffect } from "react";
import axios from "axios";

const AddFactModal = ({ onClose, onSuccess, factToEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const isEditMode = !!factToEdit;

  // Pre-fill form when editing
  useEffect(() => {
    if (factToEdit) {
      setTitle(factToEdit.title || "");
      setDescription(factToEdit.description || "");
    }
  }, [factToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill in both title and description.");
      return;
    }

    setLoading(true);

    try {
      if (isEditMode) {
        // UPDATE existing fact
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/medical-facts/${factToEdit._id}`,
          { title, description },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        alert("Medical fact updated successfully! ✅");
      } else {
        // ADD new fact
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/medical-facts`,
          { title, description },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        alert("Medical fact added successfully! ✅");
      }

      onSuccess(); // Triggers reload in AdminDashboard
    } catch (err) {
      console.error("Error saving fact:", err);
      alert("Failed to save fact. Please try again. ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 py-6 rounded-t-2xl">
          <h2 className="text-2xl font-bold">
            {isEditMode ? "Edit Medical Fact" : "Add New Medical Fact"}
          </h2>
        </div>

        {/* Body */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Drinking water improves digestion"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide a detailed and educational explanation..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition resize-none"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-cyan-700 transition shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>{isEditMode ? "Update Fact" : "Add Fact"}</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFactModal;