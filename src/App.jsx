import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";

import AdminDiseaseList from "./pages/AdminDiseaseList";
import DiseaseDetail from "./pages/DiseaseDetail";
import UserDiseaseList from "./pages/UserDiseaseList";

import LearnMore from "./pages/LearnMore";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ThankYou from "./pages/ThankYou";
// import Plans from "./pages/Plans"; // ✅ NEW
import AdminAllFacts from "./pages/AdminAllFacts";
import MedicalFacts from "./pages/MedicalFacts";

function App() {
  return (
    <Routes>
      {/* ---------- Public Routes ---------- */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/learn-more" element={<LearnMore />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/thanks-for-reaching-us" element={<ThankYou />} />
      {/* <Route path="/plans" element={<Plans />} /> ✅ NEW */}
      <Route path="/admin/medical-facts" element={<AdminAllFacts />} />
      <Route path="/medical-facts" element={<MedicalFacts />} />
      {/* ---------- User Routes ---------- */}
      <Route
        path="/user"
        element={
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/diseases/:organ"
        element={
          <PrivateRoute>
            <UserDiseaseList />
          </PrivateRoute>
        }
      />

      <Route
        path="/diseases/:organ/:id"
        element={
          <PrivateRoute>
            <DiseaseDetail />
          </PrivateRoute>
        }
      />

      {/* ---------- Admin Routes ---------- */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/diseases/:organ"
        element={
          <AdminRoute>
            <AdminDiseaseList />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default App;
