export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            BELANCE
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            AI Life Balance Council
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Transform your life balance with specialized AI companions. 
            Your personal council for growth, wellness, and success.
          </p>
          
          <div className="mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors">
              Start Your Journey
            </button>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">SAGE</h3>
              <p className="text-gray-600">Mental Health & Personal Development</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">MAYA</h3>
              <p className="text-gray-600">Relationship & Love Specialist</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">ALEX</h3>
              <p className="text-gray-600">Career & Professional Growth</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
