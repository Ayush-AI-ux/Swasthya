import { useState } from "react";
import axios from "axios";

const AddDiseaseModal = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    organSystem: "",
    description: "",
    etiology: "",
    pathophysiology: "",
    clinicalFeatures: "",
    diagnosis: "",
    treatment: "",
    complications: "",
    prognosis: "",
  });
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/diseases/add`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Disease added successfully! ✅");
      onClose();
      onSuccess();
    } catch (err) {
      alert("Failed to add disease ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: 1, name: "Basic Info", icon: "📋" },
    { id: 2, name: "Medical Details", icon: "🔬" },
    { id: 3, name: "Treatment", icon: "💊" },
  ];

  const canProceed = () => {
    if (activeStep === 1) {
      return form.name && form.organSystem && form.description;
    }
    return true;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-3xl font-bold mb-2">Add New Disease</h2>
          <p className="text-indigo-100">Enter comprehensive medical information</p>
        </div>

        {/* Step Indicator */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition ${
                      activeStep >= step.id
                        ? "bg-indigo-600 text-white shadow-lg scale-110"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span
                    className={`text-xs font-semibold mt-2 ${
                      activeStep >= step.id ? "text-indigo-600" : "text-gray-500"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 rounded transition ${
                      activeStep > step.id ? "bg-indigo-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Step 1: Basic Info */}
          {activeStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-lg">🏥</span>
                  Disease Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g., Myocardial Infarction"
                  required
                  value={form.name}
                  className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-lg">🫀</span>
                  Organ System *
                </label>
                <select
                  name="organSystem"
                  required
                  value={form.organSystem}
                  className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  onChange={handleChange}
                >
                  <option value="">Select Organ System</option>
                  <option value="cardiovascular">❤️ Cardiovascular</option>
                  <option value="respiratory">🫁 Respiratory</option>
                  <option value="gastrointestinal">🫃 Gastrointestinal</option>
                  <option value="nervous">🧠 Nervous</option>
                  <option value="musculoskeletal">🦴 Musculoskeletal</option>
                  <option value="endocrine">⚡ Endocrine</option>
                  <option value="renal">🫘 Renal</option>
                  <option value="immune">🛡️ Immune</option>
                  <option value="other">📦 Other Diseases</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-lg">📋</span>
                  Description *
                </label>
                <textarea
                  name="description"
                  placeholder="Provide a comprehensive overview of the disease..."
                  required
                  value={form.description}
                  className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  rows="4"
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {/* Step 2: Medical Details */}
          {activeStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <Field
                icon="🔬"
                name="etiology"
                label="Etiology"
                placeholder="Describe the causes and risk factors..."
                value={form.etiology}
                onChange={handleChange}
              />
              <Field
                icon="🧬"
                name="pathophysiology"
                label="Pathophysiology"
                placeholder="Explain the disease mechanisms..."
                value={form.pathophysiology}
                onChange={handleChange}
              />
              <Field
                icon="🩺"
                name="clinicalFeatures"
                label="Clinical Features"
                placeholder="List symptoms and signs..."
                value={form.clinicalFeatures}
                onChange={handleChange}
              />
              <Field
                icon="🔍"
                name="diagnosis"
                label="Diagnosis"
                placeholder="Describe diagnostic tests and criteria..."
                value={form.diagnosis}
                onChange={handleChange}
              />
            </div>
          )}

          {/* Step 3: Treatment */}
          {activeStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <Field
                icon="💊"
                name="treatment"
                label="Treatment"
                placeholder="Outline treatment approaches and medications..."
                value={form.treatment}
                onChange={handleChange}
              />
              <Field
                icon="⚠️"
                name="complications"
                label="Complications"
                placeholder="List potential complications..."
                value={form.complications}
                onChange={handleChange}
              />
              <Field
                icon="📊"
                name="prognosis"
                label="Prognosis"
                placeholder="Describe expected outcomes..."
                value={form.prognosis}
                onChange={handleChange}
              />
            </div>
          )}
        </form>

        {/* Footer Actions */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Step {activeStep} of {steps.length}
          </div>
          <div className="flex gap-3">
            {activeStep > 1 && (
              <button
                type="button"
                onClick={() => setActiveStep(activeStep - 1)}
                className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                ← Previous
              </button>
            )}
            
            {activeStep < 3 ? (
              <button
                type="button"
                onClick={() => setActiveStep(activeStep + 1)}
                disabled={!canProceed()}
                className={`px-6 py-2.5 rounded-lg transition font-semibold ${
                  canProceed()
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition font-semibold shadow-md ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Disease
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

const Field = ({ icon, name, label, placeholder, value, onChange }) => (
  <div>
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
      <span className="text-lg">{icon}</span>
      {label}
    </label>
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
      rows="3"
      onChange={onChange}
    />
  </div>
);

export default AddDiseaseModal;