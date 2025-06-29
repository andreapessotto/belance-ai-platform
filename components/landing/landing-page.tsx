'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Video, Globe, TrendingUp, Target, ArrowRight, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Ensure we start at the top
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    setIsVisible(true);
  }, []);

  const handleGetStarted = () => {
    // Scroll to top before calling the callback
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    onGetStarted();
  };

  const features = [
    {
      icon: Video,
      title: 'Always the perfect conversation',
      description: 'Video chats that adapt to exactly what you need',
      emoji: '💬',
      delay: 0
    },
    {
      icon: Globe,
      title: '6 specialists, 1 mission: YOU',
      description: 'Career, relationships, wellness, finance, creativity, mindfulness',
      emoji: '🧠',
      delay: 200
    },
    {
      icon: TrendingUp,
      title: 'See your growth happen',
      description: 'Life balance improvements you can actually measure',
      emoji: '📊',
      delay: 400
    },
    {
      icon: Target,
      title: 'Safe space to practice anything',
      description: 'Try difficult conversations before the real thing',
      emoji: '🎪',
      delay: 600
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex flex-col">
      {/* Animated Background Elements - Ottimizzati per mobile */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-8 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-12 w-1 h-1 bg-purple-400/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-24 left-12 w-1 h-1 bg-pink-400/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-48 left-1/3 w-0.5 h-0.5 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-32 right-1/4 w-1.5 h-1.5 bg-purple-300/20 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 text-center py-8">
        {/* Header Section - BELANCE + Tagline */}
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl">
            <div className="text-white font-bold text-xl">BE</div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            BELANCE
          </h1>
          
          <p className="text-gray-300 text-lg font-medium">
            Conversations that change YOU.
          </p>
        </div>

        {/* Main Headline - Più grande e impattante */}
        <div className={`mb-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            You're <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              30 Seconds Away
            </span><br />
            From Support
          </h2>
        </div>

        {/* Description - Ultra-simple */}
        <div className={`mb-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-gray-300 text-lg leading-relaxed max-w-md mx-auto">
            What if you always had the right person to talk to? Someone who truly gets you, whenever you need them most.
          </p>
        </div>

        {/* Features List - Benefit-focused con emoji */}
        <div className="mb-8 space-y-4 w-full max-w-md">
          {features.map((feature, index) => {
            return (
              <div
                key={index}
                className={`flex items-start space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 transition-all duration-1000 hover:bg-white/10 text-left ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
                style={{ transitionDelay: `${700 + feature.delay}ms` }}
              >
                <div className="text-2xl flex-shrink-0 mt-1">
                  {feature.emoji}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-base mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button - Nuovo copy */}
        <div className={`mb-6 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Button
            onClick={handleGetStarted}
            className="w-full max-w-sm h-14 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white font-semibold text-lg rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-purple-500/25 group"
          >
            <span className="flex items-center space-x-2">
              <span>Meet Your Circle Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </div>

        {/* Bottom Text - Testimonial */}
        <div className={`transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-gray-400 text-sm italic">
            "I wish I'd found this years ago." - Sarah, Marketing Manager
          </p>
        </div>

        {/* Floating Elements - Ridotti per mobile */}
        <div className="absolute top-1/4 left-6 opacity-20">
          <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
        </div>
        <div className="absolute bottom-1/4 right-6 opacity-20">
          <Sparkles className="w-3 h-3 text-pink-400 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      {/* Safe area per iPhone */}
      <div className="h-safe-area-inset-bottom bg-transparent"></div>
    </div>
  );
};