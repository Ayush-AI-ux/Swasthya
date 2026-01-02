import { useNavigate } from "react-router-dom";

const Plans = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
              <img src="/logo.png" alt="Swasthya Logo" className="h-12 w-auto" />
              <div>
                <span className="text-xl font-bold text-gray-800 block">Swasthya</span>
                <span className="text-xs text-gray-600">Health Made Simple</span>
              </div>
            </div>

            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-500 to-teal-500 py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold mb-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Unlock Premium Features
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">Choose Your Plan</h1>
          <p className="text-xl text-cyan-50 max-w-3xl mx-auto">
            Get full access to exclusive Medical Facts, in-depth health insights, priority support, and ad-free experience.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 7-Day Trial */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl hover:border-cyan-300 transition transform hover:-translate-y-2">
            <div className="text-center mb-8">
              <p className="text-sm font-semibold text-cyan-600 uppercase tracking-wide">Trial</p>
              <div className="mt-4">
                <span className="text-5xl font-bold text-gray-900">₹39</span>
                <span className="text-gray-600">/7 days</span>
              </div>
            </div>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Full access for 7 days</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">All Medical Facts unlocked</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Cancel anytime</span>
              </li>
            </ul>
            <button className="w-full py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-teal-600 transition shadow-lg">
              Start 7-Day Trial
            </button>
          </div>

          {/* Monthly */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl hover:border-cyan-300 transition transform hover:-translate-y-2">
            <div className="text-center mb-8">
              <p className="text-sm font-semibold text-cyan-600 uppercase tracking-wide">Monthly</p>
              <div className="mt-4">
                <span className="text-5xl font-bold text-gray-900">₹99</span>
                <span className="text-gray-600">/month</span>
              </div>
            </div>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Unlimited Medical Facts</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">In-depth health insights</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Priority support</span>
              </li>
            </ul>
            <button className="w-full py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-teal-600 transition shadow-lg">
              Subscribe Monthly
            </button>
          </div>

          {/* Yearly - Best Value */}
            <div className="relative bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl shadow-2xl p-8 text-white transform scale-105 z-10 overflow-visible">
            {/* Best Value Badge - Fixed Positioning */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-bold text-lg shadow-2xl flex items-center gap-2 whitespace-nowrap">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                BEST VALUE
                </div>
            </div>

            <div className="text-center mb-8 pt-8"> {/* Added pt-8 to give space for badge */}
                <p className="text-sm font-semibold uppercase tracking-wide opacity-90">Yearly</p>
                <div className="mt-4">
                <span className="text-6xl font-bold">₹948</span>
                <span className="block text-cyan-100 mt-2 text-lg">₹79/month • Save 20%</span>
                </div>
            </div>

            <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Everything in Monthly</span>
                </li>
                <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Biggest savings</span>
                </li>
                <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Full year access</span>
                </li>
            </ul>

            <button className="w-full py-4 bg-white text-cyan-600 font-bold rounded-xl hover:bg-cyan-50 transition shadow-lg">
                Get Yearly Plan
            </button>
            </div>

          {/* Lifetime */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-300 hover:shadow-2xl hover:border-purple-400 transition transform hover:-translate-y-2">
            <div className="text-center mb-8">
              <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide">Lifetime</p>
              <div className="mt-4">
                <span className="text-5xl font-bold text-gray-900">₹1999</span>
                <span className="block text-purple-600 font-semibold mt-2">One-time payment</span>
              </div>
            </div>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-semibold">Lifetime access</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">All premium features forever</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">No recurring payments</span>
              </li>
            </ul>
            <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition shadow-lg">
              Buy Lifetime Access
            </button>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-16">
          <p className="text-gray-600">
            🔒 Secure payment • Cancel anytime • 7-day money-back guarantee
          </p>
        </div>
      </div>
    </div>
  );
};

export default Plans;

