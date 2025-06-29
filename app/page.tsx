export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BELANCE
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-8">
              🏆 World's Largest Hackathon 2025
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Find Your Life
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              Balance
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
            Transform urban loneliness into personal growth through your 
            <span className="font-semibold text-blue-600"> AI companion council</span>. 
            Get expert guidance available 24/7 for peak performance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Start Free Trial
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all duration-300">
              Watch Demo Video
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-3xl">🧠</span>
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">6 AI Companion Council</h3>
            <p className="text-gray-600 leading-relaxed">
              Specialized AI companions for career, relationships, health, finance, creativity, and personal growth.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Life Balance Wheel</h3>
            <p className="text-gray-600 leading-relaxed">
              Track your progress across all life dimensions with beautiful visualizations and AI insights.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Proactive Care</h3>
            <p className="text-gray-600 leading-relaxed">
              Your companions remember everything and proactively check in when you need support most.
            </p>
          </div>
        </div>

        {/* Demo Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white mb-20">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Life Balance?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users already improving their life quality with BELANCE.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold">10,000+</div>
              <div className="text-sm opacity-80">Active Users</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold">40%</div>
              <div className="text-sm opacity-80">Better Decision Making</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm opacity-80">AI Support Available</div>
            </div>
          </div>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Start Your Journey
          </button>
        </div>

        {/* Technology Stack */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">Built with Cutting-Edge Technology</h3>
          <div className="flex flex-wrap justify-center gap-6 opacity-60">
            <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">Next.js 14</span>
            <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">AI Video Calls</span>
            <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">Real-time Analytics</span>
            <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">Voice AI</span>
            <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">Multilingual</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              BELANCE
            </h2>
          </div>
          <p className="text-gray-400 mb-4">
            &copy; 2025 BELANCE. Built with ❤️ for the World's Largest Hackathon.
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-gray-800 rounded-full">
            <span className="text-sm text-gray-300">Powered by</span>
            <a href="https://bolt.new" target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-400 hover:text-blue-300">
              Bolt.new
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
