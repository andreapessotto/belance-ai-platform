'use client'

import { useState } from 'react'

export default function Home() {
  const [selectedCompanion, setSelectedCompanion] = useState(null)

  const companions = [
    {
      id: 'sage',
      name: 'SAGE',
      specialty: 'Mental Health & Personal Development',
      description: 'Your wise guide for mindfulness, anxiety management, and emotional growth.',
      color: 'bg-green-500'
    },
    {
      id: 'maya',
      name: 'MAYA',
      specialty: 'Relationship & Love Specialist', 
      description: 'Empathetic support for romantic relationships and family dynamics.',
      color: 'bg-pink-500'
    },
    {
      id: 'alex',
      name: 'ALEX',
      specialty: 'Career & Professional Growth',
      description: 'Strategic guidance for leadership, networking, and workplace success.',
      color: 'bg-blue-500'
    }
  ]

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
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12">
            Transform your life balance with specialized AI companions. 
            Your personal council for growth, wellness, and success.
          </p>
          
          <div className="mb-12">
            <button 
              onClick={() => alert('🚀 BELANCE Demo Ready for Hackathon! Coming Soon: Full App Experience')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors transform hover:scale-105"
            >
              Start Your Journey
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {companions.map((companion) => (
              <div 
                key={companion.id}
                onClick={() => setSelectedCompanion(companion)}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
              >
                <div className={`w-12 h-12 ${companion.color} rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl`}>
                  {companion.name[0]}
                </div>
                <h3 className="text-xl font-semibold mb-3">{companion.name}</h3>
                <p className="text-gray-600 text-sm">{companion.specialty}</p>
              </div>
            ))}
          </div>

          {selectedCompanion && (
            <div className="mt-12 bg-white p-8 rounded-lg shadow-xl max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">{selectedCompanion.name}</h3>
                <button 
                  onClick={() => setSelectedCompanion(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-600 mb-4">{selectedCompanion.description}</p>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
                Chat with {selectedCompanion.name}
              </button>
            </div>
          )}
          
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-400">
              🚀 Built with Bolt.new for World's Largest Hackathon 2025
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
