import { useNavigate } from "react-router-dom";
import VisitorCounter from "../components/VisitorCounter";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="Swasthya Logo" 
                className="h-12 w-auto"
              />
              <div>
                <span className="text-xl font-bold text-gray-800 block">Swasthya</span>
                <span className="text-xs text-gray-600">Health Made Simple</span>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2 text-cyan-600 font-semibold hover:text-cyan-700 transition"
              >
                Log In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-teal-600 transition transform hover:scale-105 shadow-md"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 space-y-6">
            <div className="inline-block">
              <span className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold">
                🏥 Your Health Companion
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Access Trusted <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-600">Health Information</span> Anytime
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Explore comprehensive disease information, symptoms, treatments, and preventive measures. Your go-to platform for reliable health resources.
            </p>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => navigate("/signup")}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-teal-600 transition transform hover:scale-105 shadow-lg"
              >
                Get Started Free
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-cyan-500 hover:text-cyan-600 transition"
                onClick={() => navigate("/learn-more")}>
                Learn More
              </button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="flex-1 relative">
            <div className="relative w-full h-96 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-3xl p-8 shadow-2xl">
              {/* Floating Cards */}
              <div className="absolute top-8 left-8 bg-white p-4 rounded-xl shadow-lg transform -rotate-6 hover:rotate-0 transition">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Various</p>
                    <p className="text-xs text-gray-500">Diseases Covered</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-12 right-8 bg-white p-4 rounded-xl shadow-lg transform rotate-6 hover:rotate-0 transition">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Verified</p>
                    <p className="text-xs text-gray-500">Medical Data</p>
                  </div>
                </div>
              </div>

              {/* Center Icon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center">
                  <svg className="w-12 h-12 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Professional Section */}
      <section className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="md:flex">
              {/* Left Side - Profile Image Area */}
              <div className="md:w-2/5 bg-gradient-to-br from-cyan-500 to-teal-500 p-12 flex items-center justify-center relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                
                <div className="relative z-10 text-center">
                  <div className="w-48 h-48 mx-auto mb-6 bg-white rounded-full shadow-2xl flex items-center justify-center border-8 border-white/20 overflow-hidden">
                    <img
                      src="/doctor.png"   // 👈 put your image path here
                      alt="Doctor"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Verified Medical Professional
                  </div>
                </div>
              </div>

              {/* Right Side - Information */}
              <div className="md:w-3/5 p-12">
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold mb-4">
                    👨‍⚕️ Platform Administrator
                  </span>
                  <h2 className="text-4xl font-bold text-gray-900 mb-2">
                    Akansh Mittal
                  </h2>
                  <div className="flex flex-col gap-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span className="font-semibold">3rd Year MBBS Student</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>PDUMC Government Medical College</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-8">
                  As a dedicated medical student and enthusiastic learner, I created Swasthya to bridge the gap between complex medical information and accessible health education. Our platform ensures that everyone has access to verified, comprehensive disease information to make informed health decisions.
                </p>

                {/* Social Links */}
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/in/dr-akansh-mittal-00604421b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition transform hover:scale-105 shadow-md"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </a>
                  
                  <a
                    href="https://www.youtube.com/@MBBS-THELIFE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition transform hover:scale-105 shadow-md"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    YouTube
                  </a>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
                  <div className="text-center flex flex-col items-center gap-2">
                    <svg
                      className="w-10 h-10 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {/* Circle */}
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      {/* Tick */}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M9 12l2 2 4-4"
                      />
                    </svg>

                    <p className="text-sm text-gray-600">Medical Facts</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-indigo-600">100%</p>
                    <p className="text-sm text-gray-600">Verified Data</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-indigo-600">24/7</p>
                    <p className="text-sm text-gray-600">Platform Access</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Swasthya?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to stay informed about your health
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 bg-gradient-to-br from-cyan-50 to-white rounded-2xl hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Comprehensive Database
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Access detailed information about diseases, symptoms, causes, and treatments all in one place.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-gradient-to-br from-teal-50 to-white rounded-2xl hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-teal-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Trusted Information
              </h3>
              <p className="text-gray-600 leading-relaxed">
                All medical information is verified and sourced from reliable health organizations.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Easy Access
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Search and find health information quickly with our user-friendly interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-cyan-50 mb-8">
            Join thousands of users accessing reliable health information
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-4 bg-white text-cyan-600 font-semibold rounded-xl hover:bg-gray-50 transition transform hover:scale-105 shadow-lg"
            >
              Sign Up Now
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-cyan-600 transition"
            >
              Log In
            </button>
          </div>
        </div>
      </section>

      <VisitorCounter />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/logo.png" 
                  alt="Swasthya Logo" 
                  className="h-10 w-auto"
                />
                <div>
                  <span className="text-xl font-bold block">Swasthya</span>
                  <span className="text-xs text-gray-400">Health Made Simple</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted source for medical information and health resources.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <button
                    onClick={() => navigate("/learn-more")}
                    className="hover:text-cyan-400 transition"
                  >
                    About Us
                  </button>
                </li>
                <li><a href="https://www.linkedin.com/in/dr-akansh-mittal-00604421b/" className="hover:text-cyan-400 transition">LinkedIn</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <button
                    onClick={() => navigate("/contact-us")}
                    className="hover:text-cyan-400 transition"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/privacy-policy")}
                    className="hover:text-cyan-400 transition"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/terms-of-service")}
                    className="hover:text-cyan-400 transition"
                  >
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-semibold mb-4">Stay Updated</h3>
              <p className="text-gray-400 text-sm mb-4">
                Get the latest health tips and updates.
              </p>
              <button
                onClick={() => window.open("https://www.youtube.com/@MBBS-THELIFE", "_blank")}
                className="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition"
              >
                Subscribe
              </button>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Swasthya. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;