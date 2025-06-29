'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ExternalLink, Crown, Sparkles, ArrowLeft } from 'lucide-react';
import { TopNavigation } from '@/components/ui/top-navigation';
import Link from 'next/link';

interface DemoStep {
  id: string;
  title: string;
  description: string;
  duration: number;
  component: React.ReactNode;
  bgColor: string;
  highlight: string;
}

const DemoExperience: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const demoSteps: DemoStep[] = [
    {
      id: 'intro',
      title: 'Meet Sarah, a busy marketing manager',
      description: 'Like millions of people, Sarah struggles with work-life balance and feels isolated despite being constantly connected.',
      duration: 8000,
      bgColor: 'from-slate-900 to-purple-900',
      highlight: 'The Problem',
      component: (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
          <div className="w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl">👩‍💼</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Sarah, 28</h3>
          <p className="text-gray-300 leading-relaxed max-w-sm mb-6">
            Marketing Manager in Milan. Works 60+ hours per week. 
            Feels lonely despite 1,000+ social media connections.
          </p>
          <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
            <div className="bg-red-500/20 rounded-lg p-2 text-center">
              <div className="text-red-400 font-bold text-sm">2/10</div>
              <div className="text-xs text-gray-400">Work Stress</div>
            </div>
            <div className="bg-yellow-500/20 rounded-lg p-2 text-center">
              <div className="text-yellow-400 font-bold text-sm">3/10</div>
              <div className="text-xs text-gray-400">Relationships</div>
            </div>
            <div className="bg-orange-500/20 rounded-lg p-2 text-center">
              <div className="text-orange-400 font-bold text-sm">4/10</div>
              <div className="text-xs text-gray-400">Mental Health</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'onboarding',
      title: 'Sarah discovers BELANCE',
      description: 'Quick 2-minute onboarding creates her personalized Circle of Trust with AI companions.',
      duration: 7000,
      bgColor: 'from-purple-900 to-blue-900',
      highlight: 'The Solution',
      component: (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
          <div className="w-full max-w-sm bg-slate-800/50 rounded-2xl p-4 border border-purple-500/30">
            <div className="text-center mb-4">
              <h4 className="text-white font-bold mb-1">Your Circle of Trust</h4>
              <p className="text-gray-400 text-xs">Based on your Life Wheel assessment</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'SAGE', specialty: 'Mental Health', emoji: '🧘‍♂️', available: true },
                { name: 'MAYA', specialty: 'Relationships', emoji: '💝', available: true },
                { name: 'ALEX', specialty: 'Career', emoji: '💼', available: false },
                { name: 'VITA', specialty: 'Wellness', emoji: '💪', available: false }
              ].map((companion) => (
                <div key={companion.name} className={`p-2 rounded-xl border ${
                  companion.available 
                    ? 'bg-[#FF9500]/20 border-[#FF9500]' 
                    : 'bg-gray-700/30 border-gray-600'
                }`}>
                  <div className="text-center">
                    <div className="text-lg mb-1">{companion.emoji}</div>
                    <div className={`font-medium text-xs ${
                      companion.available ? 'text-[#FF9500]' : 'text-gray-500'
                    }`}>
                      {companion.name}
                    </div>
                    <div className="text-xs text-gray-400">{companion.specialty}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'daily_use',
      title: 'Tuesday: Sarah talks to Maya about presentation anxiety',
      description: 'Natural conversation about upcoming challenges, building relationship and context.',
      duration: 8000,
      bgColor: 'from-blue-900 to-cyan-900',
      highlight: 'Building Context',
      component: (
        <div className="flex flex-col min-h-[400px] p-6">
          <div className="flex-1 space-y-3">
            <div className="bg-slate-800/50 rounded-xl p-3 border-l-4 border-pink-400">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-sm">💝</span>
                </div>
                <div>
                  <div className="text-white font-medium text-sm">MAYA</div>
                  <div className="text-gray-400 text-xs">Relationship Specialist</div>
                </div>
              </div>
              <p className="text-gray-300 text-xs leading-relaxed">
                "I notice you seem stressed about Friday's presentation. Want to talk about it?"
              </p>
            </div>
            
            <div className="bg-[#FF9500]/10 rounded-xl p-3 border-l-4 border-[#FF9500]">
              <p className="text-gray-300 text-xs leading-relaxed">
                "Yeah, it's the quarterly review with my boss. I've been thinking about asking for a promotion, but I'm terrified of the conversation."
              </p>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="bg-purple-500/20 rounded-lg p-2 border border-purple-500/30">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span className="text-purple-400 text-xs font-medium">Memory Stored</span>
              </div>
              <p className="text-gray-300 text-xs mt-1">Promotion anxiety + Boss meeting Friday</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'wow_moment',
      title: 'Friday 2:47 PM - The Magic Happens',
      description: 'BELANCE proactively detects the meeting and Maya reaches out with perfect timing.',
      duration: 12000,
      bgColor: 'from-cyan-900 to-emerald-900',
      highlight: '🎯 WOW MOMENT',
      component: (
        <div className="flex flex-col min-h-[400px] p-6 space-y-4">
          {/* Calendar Integration Visual */}
          <div className="bg-slate-800/50 rounded-lg p-3 border border-emerald-500/30">
            <div className="flex items-center justify-between mb-1">
              <span className="text-emerald-400 font-medium text-sm">📅 Calendar Sync</span>
              <span className="text-gray-400 text-xs">2:47 PM</span>
            </div>
            <div className="text-white text-sm">⏰ Boss Meeting - Promotion Discussion</div>
            <div className="text-gray-400 text-xs">Starts in 17 minutes</div>
          </div>

          {/* Proactive Notification */}
          <div className="bg-gradient-to-r from-[#FF9500]/20 to-pink-500/20 rounded-xl p-3 border-2 border-[#FF9500] animate-pulse">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-lg">💝</span>
              </div>
              <div>
                <div className="text-white font-bold text-sm">MAYA interrupts</div>
                <div className="text-[#FF9500] text-xs font-medium">Proactive Care Activated</div>
              </div>
            </div>
            <p className="text-white text-sm leading-relaxed mb-3">
              "Hey Sarah! So sorry to interrupt, but I noticed you have that presentation with your boss in 17 minutes. Are you feeling ready?"
            </p>
            
            <div className="bg-black/30 rounded-lg p-2">
              <div className="flex items-center space-x-1 mb-1">
                <Crown className="w-3 h-3 text-yellow-400" />
                <span className="text-yellow-400 text-xs font-medium">Cross-Companion Intelligence</span>
              </div>
              <p className="text-gray-300 text-xs">
                "Alex and I were discussing your career goals yesterday. He thinks you're totally ready!"
              </p>
            </div>
          </div>

          {/* Impact Visualization */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-emerald-500/20 rounded-lg p-2 text-center">
              <div className="text-emerald-400 font-bold text-xs">Perfect Timing</div>
              <div className="text-xs text-gray-400">Calendar AI</div>
            </div>
            <div className="bg-purple-500/20 rounded-lg p-2 text-center">
              <div className="text-purple-400 font-bold text-xs">Context Memory</div>
              <div className="text-xs text-gray-400">3 days ago</div>
            </div>
            <div className="bg-yellow-500/20 rounded-lg p-2 text-center">
              <div className="text-yellow-400 font-bold text-xs">Team Collaboration</div>
              <div className="text-xs text-gray-400">Maya + Alex</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'success',
      title: 'The Result: Sarah gets the promotion!',
      description: 'BELANCE transforms loneliness into confidence, isolation into support, anxiety into success.',
      duration: 8000,
      bgColor: 'from-emerald-900 to-green-900',
      highlight: 'The Impact',
      component: (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
          <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
            <span className="text-3xl">🎉</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Promotion Approved!</h3>
          <p className="text-gray-300 leading-relaxed max-w-sm mb-6">
            "For the first time in years, I felt truly supported. BELANCE became my team."
          </p>
          
          {/* Updated Life Wheel */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
            <div className="bg-green-500/20 rounded-lg p-2 text-center">
              <div className="text-green-400 font-bold text-sm">7/10</div>
              <div className="text-xs text-gray-400">Career ↗+5</div>
            </div>
            <div className="bg-blue-500/20 rounded-lg p-2 text-center">
              <div className="text-blue-400 font-bold text-sm">6/10</div>
              <div className="text-xs text-gray-400">Confidence ↗+3</div>
            </div>
            <div className="bg-purple-500/20 rounded-lg p-2 text-center">
              <div className="text-purple-400 font-bold text-sm">8/10</div>
              <div className="text-xs text-gray-400">Support ↗+4</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'vision',
      title: 'BELANCE: Transforming 1 billion lives',
      description: 'From urban loneliness to AI-powered human connection. The future of mental wellness is here.',
      duration: 10000,
      bgColor: 'from-purple-900 via-pink-900 to-orange-900',
      highlight: 'The Future',
      component: (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
          <div className="text-4xl mb-4 animate-pulse">🌍</div>
          <h3 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-[#FF9500] to-pink-500 bg-clip-text text-transparent">
            1 Billion Lives
          </h3>
          <p className="text-gray-300 leading-relaxed max-w-sm mb-6">
            Join the revolution against global loneliness. Your Circle of Trust is waiting.
          </p>
          
          <div className="space-y-3 w-full max-w-sm">
            <button className="w-full bg-gradient-to-r from-[#FF9500] to-pink-500 rounded-xl p-3 text-white">
              <div className="font-bold">Start Your Journey</div>
              <div className="text-sm opacity-90">Transform your life balance today</div>
            </button>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-800/50 rounded-lg p-2 text-center">
                <div className="text-white font-medium text-sm">Free Forever</div>
                <div className="text-gray-400 text-xs">SAGE companion</div>
              </div>
              <Link 
                href={{ pathname: '/', query: { openModal: 'pricing' } }}
                passHref
              >
                <div 
                  className="bg-slate-800/50 rounded-lg p-2 text-center cursor-pointer hover:bg-slate-700/50 transition-colors"
                  role="button"
                  tabIndex={0}
                >
                  <div className="text-white font-medium text-sm">Go Premium</div>
                  <div className="text-gray-400 text-xs">Full Circle of Trust</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Auto-advance demo steps
  useEffect(() => {
    if (!isPlaying) return;

    const currentDuration = demoSteps[currentStep].duration;
    const interval: number = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentStep < demoSteps.length - 1) {
            setCurrentStep(currentStep + 1);
            return 0;
          } else {
            setIsCompleted(true);
            setIsPlaying(false);
            return 100;
          }
        }
        return prev + (100 / (currentDuration / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, currentStep, demoSteps]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsCompleted(false);
    setIsPlaying(true);
  };

  const jumpToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setProgress(0);
    setIsPlaying(false);
  };

  const currentStepData = demoSteps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 overflow-auto">
      {/* ✅ CONSISTENT TOP NAVIGATION */}
      <TopNavigation 
        title="Demo Experience"
        subtitle="Interactive showcase for World's Largest Hackathon"
        showProfileIcon={false}
      />

      {/* Demo Controls - MOBILE OPTIMIZED */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/5 sticky top-[72px] z-40">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePlayPause}
                className="flex items-center space-x-2 bg-[#FF9500] hover:bg-[#FF6B00] px-3 py-2 rounded-lg transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-white" />
                ) : (
                  <Play className="w-4 h-4 text-white" />
                )}
                <span className="text-white font-medium text-sm">
                  {isPlaying ? 'Pause' : isCompleted ? 'Replay' : 'Play'}
                </span>
              </button>
              
              <button
                onClick={handleRestart}
                className="flex items-center space-x-1 bg-slate-700/50 hover:bg-slate-600/50 px-3 py-2 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-gray-300" />
                <span className="text-gray-300 text-sm">Restart</span>
              </button>
            </div>

            <div className="text-right">
              <div className="text-white font-medium text-sm">{currentStepData.highlight}</div>
              <div className="text-gray-400 text-xs">Step {currentStep + 1} of {demoSteps.length}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#FF9500] to-pink-500 transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Demo Content - SCROLLABLE */}
      <main className="relative">
        <div 
          className={`bg-gradient-to-br ${currentStepData.bgColor} transition-all duration-1000 min-h-screen`}
        >
          {/* Step Navigation Dots */}
          <div className="absolute top-4 left-4 z-10">
            <div className="flex space-x-1">
              {demoSteps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => jumpToStep(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentStep 
                      ? 'bg-[#FF9500] scale-125' 
                      : index < currentStep 
                        ? 'bg-white/60' 
                        : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="pt-12 pb-20">
            {currentStepData.component}
            
            {/* Step Info */}
            <div className="bg-black/40 backdrop-blur-sm mx-4 rounded-xl p-4 border border-white/10 mt-6">
              <h2 className="text-white text-lg font-bold mb-2">{currentStepData.title}</h2>
              <p className="text-gray-300 text-sm leading-relaxed">{currentStepData.description}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DemoExperience;