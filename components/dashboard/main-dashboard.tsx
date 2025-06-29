'use client';

import React, { useState } from 'react';
import { MessageCircle, Target, BarChart3, Calendar, User, ArrowUp, ArrowDown, Minus, Trophy, Lock, Crown, Star, Zap, Rocket, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface MainDashboardProps {
  userProfile?: any;
  onStartChat?: (companionId: string) => void;
  onAreaClick?: (area: string) => void;
  onTabChange?: (tab: string) => void;
}

export const MainDashboard: React.FC<MainDashboardProps> = ({
  userProfile,
  onStartChat,
  onAreaClick,
  onTabChange
}) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const router = useRouter();

  // Get first name from user profile
  const firstName = userProfile?.full_name?.split(' ')[0] || 'Friend';
  
  // Get user subscription tier
  const userTier = userProfile?.subscription_tier || 'free';

  // UPDATED: Only 3 mood options as requested
  const moodOptions = [
    { id: 'support', emoji: '😔', label: 'Need Support' },
    { id: 'neutral', emoji: '😐', label: 'Feeling Neutral' },
    { id: 'good', emoji: '😊', label: 'Good Energy' }
  ];

  // ✅ FIXED: Only background color changed for Hackathon Demo card, text stays white
  const quickActions = [
    {
      id: 'chat',
      title: 'Start Quick Chat',
      subtitle: 'Talk with SAGE now',
      icon: MessageCircle,
      iconColor: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      id: 'demo',
      title: 'Hackathon Demo',
      subtitle: 'See our revolution',
      icon: Trophy,
      iconColor: 'text-white', // ✅ FIXED: Keep icon white
      bgColor: 'bg-yellow-500/20', // ✅ FIXED: Warm yellow background
      borderColor: 'border-yellow-400/30', // ✅ FIXED: Matching yellow border
      isSpecial: true
    },
    {
      id: 'progress',
      title: 'View Progress',
      subtitle: 'Track your growth',
      icon: BarChart3,
      iconColor: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      id: 'schedule',
      title: 'Schedule Session',
      subtitle: 'Book your breakthrough',
      icon: Calendar,
      iconColor: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    }
  ];

  // ✅ FIXED: Shorter, clearer category names that fit properly
  const lifeAreas = [
    {
      id: 'mental_health',
      name: 'Inner Peace',
      score: userProfile?.life_wheel_scores?.mental_health || 3,
      change: -0.5,
      icon: '🧠',
      color: 'from-pink-500 to-purple-500',
      isUnlocked: true,
      requiredTier: 'free',
      companion: 'SAGE',
      rating: 4.9,
      description: 'Your guide to mental wellness and emotional balance'
    },
    {
      id: 'relationships',
      name: 'Love & Connection',
      score: userProfile?.life_wheel_scores?.relationships || 4,
      change: 0.2,
      icon: '💝',
      color: 'from-red-500 to-pink-500',
      isUnlocked: userTier === 'premium' || userTier === 'premium_plus',
      requiredTier: 'premium',
      companion: 'MAYA',
      rating: 4.8,
      description: 'Navigate relationships with wisdom and empathy'
    },
    {
      id: 'career',
      name: 'Career Success',
      score: userProfile?.life_wheel_scores?.career || 6,
      change: 0.8,
      icon: '💼',
      color: 'from-blue-500 to-cyan-500',
      isUnlocked: userTier === 'premium' || userTier === 'premium_plus',
      requiredTier: 'premium',
      companion: 'ALEX',
      rating: 4.9,
      description: 'Accelerate your career and find your calling'
    },
    {
      id: 'health',
      name: 'Health & Energy',
      score: userProfile?.life_wheel_scores?.health || 5,
      change: 0.3,
      icon: '💪',
      color: 'from-green-500 to-emerald-500',
      isUnlocked: userTier === 'premium_plus',
      requiredTier: 'premium_plus',
      companion: 'VITA',
      rating: 4.7,
      description: 'Transform your health and boost your energy'
    },
    {
      id: 'finance',
      name: 'Financial Wealth',
      score: userProfile?.life_wheel_scores?.finance || 4,
      change: -0.1,
      icon: '💰',
      color: 'from-yellow-500 to-orange-500',
      isUnlocked: userTier === 'premium_plus',
      requiredTier: 'premium_plus',
      companion: 'FELIX',
      rating: 4.6,
      description: 'Master money management and build financial freedom'
    },
    {
      id: 'creativity',
      name: 'Creative Joy',
      score: userProfile?.life_wheel_scores?.creativity || 5,
      change: 0.4,
      icon: '🎨',
      color: 'from-cyan-500 to-blue-500',
      isUnlocked: userTier === 'premium_plus',
      requiredTier: 'premium_plus',
      companion: 'LUNA',
      rating: 4.8,
      description: 'Unlock creativity and design a life you love'
    }
  ];

  // OPTIMIZED COMPANIONS with new descriptions
  const companions = [
    { 
      name: 'SAGE', 
      specialty: 'Inner peace & mental clarity',
      avatar: '🧘',
      rating: 4.9,
      available: true,
      description: 'Your guide to mental wellness and emotional balance'
    },
    { 
      name: 'MAYA', 
      specialty: 'Love & relationship wisdom',
      avatar: '💕',
      rating: 4.8,
      available: userTier === 'premium' || userTier === 'premium_plus',
      description: 'Navigate relationships with wisdom and empathy'
    },
    { 
      name: 'ALEX', 
      specialty: 'Career growth & success',
      avatar: '💼',
      rating: 4.9,
      available: userTier === 'premium' || userTier === 'premium_plus',
      description: 'Accelerate your career and find your calling'
    }
  ];

  // Calcola overall score solo dalle aree sbloccate
  const unlockedAreas = lifeAreas.filter(area => area.isUnlocked);
  const overallScore = unlockedAreas.length > 0 
    ? unlockedAreas.reduce((sum, area) => sum + area.score, 0) / unlockedAreas.length
    : 0;

  const handleActionClick = (actionId: string) => {
    switch (actionId) {
      case 'chat':
        onStartChat?.('sage');
        break;
      case 'progress':
        onTabChange?.('progress');
        break;
      case 'demo':
        // Demo button will be handled by Link component
        break;
      default:
        break;
    }
  };

  const handleAreaClick = (area: any) => {
    if (area.isUnlocked) {
      onAreaClick?.(area.id);
    } else {
      // Mostra upgrade modal o messaggio
      onTabChange?.('profile'); // Porta al profilo per upgrade
    }
  };

  const getTierDisplayName = (tier: string) => {
    switch (tier) {
      case 'premium': return 'Circle of Trust';
      case 'premium_plus': return 'Circle of Trust';
      default: return 'Premium';
    }
  };

  const handleProfileClick = () => {
    router.push('/profile');
  };

  return (
    <div className="space-y-8">
      {/* ✅ FIXED: Removed mt-8 to ensure consistent spacing */}
      <section>
        <h2 className="text-white text-xl font-semibold mb-6">
          What's your energy like right now?
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {moodOptions.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(mood.id)}
              className={`
                flex flex-col items-center justify-center p-4 rounded-2xl
                transition-all duration-300 ease-out
                ${selectedMood === mood.id
                  ? 'bg-[#FF9500]/20 border-2 border-[#FF9500] scale-105'
                  : 'bg-slate-800/50 border-2 border-transparent hover:bg-slate-700/50'
                }
              `}
            >
              <span className="text-3xl mb-2">{mood.emoji}</span>
              <span className={`text-sm font-medium ${
                selectedMood === mood.id ? 'text-[#FF9500]' : 'text-gray-400'
              }`}>
                {mood.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ✅ UPDATED: Removed hover animations from quick action boxes */}
      <section className="mb-8">
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            const content = (
              <div
                className={`
                  rounded-2xl border transition-all duration-300
                  ${action.bgColor} ${action.borderColor}
                  group cursor-pointer
                  flex flex-col relative
                `}
                style={{
                  height: '160px',
                  padding: '16px',
                  minHeight: '160px',
                  maxHeight: '160px'
                }}
              >
                {/* ✅ NEW: Lightbulb icon for Hackathon Demo card */}
                {action.id === 'demo' && (
                  <div className="absolute top-2 right-2">
                    <Lightbulb 
                      className="w-4 h-4 text-white/90 drop-shadow-sm" 
                      style={{
                        filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))'
                      }}
                    />
                  </div>
                )}

                <div className="flex flex-col h-full">
                  {/* Icon at top */}
                  <div className={`
                    p-2 rounded-xl flex-shrink-0 mb-3 self-start
                    ${action.bgColor} ${action.iconColor}
                  `}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  
                  {/* Text content - centered vertically in remaining space */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-white font-bold text-sm group-hover:text-white/90 leading-tight mb-2">
                      {action.title}
                    </h3>
                    <p className="text-gray-300 text-xs group-hover:text-gray-200 leading-tight">
                      {action.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            );

            // Wrap demo button with Link
            if (action.id === 'demo') {
              return (
                <Link key={action.id} href="/demo">
                  {content}
                </Link>
              );
            }

            return (
              <div key={action.id} onClick={() => handleActionClick(action.id)}>
                {content}
              </div>
            );
          })}
        </div>
      </section>

      {/* ✅ FIXED: Life Balance - Taller cards with clear visual hierarchy */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-[#FF9500]" />
            <h2 className="text-white text-xl font-semibold">Your Circle of Trust</h2>
          </div>
          <div className="bg-slate-800/50 px-3 py-1 rounded-full">
            <span className="text-gray-300 text-sm font-medium">
              Overall: {overallScore.toFixed(1)}/10
            </span>
          </div>
        </div>

        {/* ✅ FIXED: Taller cards with better text layout */}
        <div className="grid grid-cols-2 gap-3">
          {lifeAreas.map((area) => (
            <div
              key={area.id}
              onClick={() => handleAreaClick(area)}
              className={`
                bg-slate-800/30 border border-slate-700/50 rounded-2xl p-4 
                transition-all duration-300 cursor-pointer relative
                min-h-[120px] flex flex-col justify-between
                ${area.isUnlocked 
                  ? 'hover:bg-slate-800/50' 
                  : 'opacity-60 hover:opacity-80'
                }
              `}
            >
              {/* Lock Overlay per aree bloccate */}
              {!area.isUnlocked && (
                <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center z-10">
                  <div className="text-center">
                    <Lock className="w-6 h-6 text-white/80 mx-auto mb-2" />
                    <div className="text-xs text-white/80 font-medium">
                      {getTierDisplayName(area.requiredTier)}
                    </div>
                  </div>
                </div>
              )}

              {/* ✅ FIXED: Clear visual hierarchy */}
              <div className="flex flex-col space-y-3 h-full">
                {/* Top section: Icon and category name */}
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${area.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-lg">{area.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    {/* ✅ FIXED: Category name on top line (larger text) */}
                    <h3 className="text-white font-semibold text-sm leading-tight mb-1">
                      {area.name}
                    </h3>
                    {/* ✅ FIXED: Companion name on second line (smaller text) */}
                    <p className="text-gray-400 text-xs">
                      {area.companion} ⭐ {area.rating}
                    </p>
                  </div>
                </div>
                
                {/* Middle section: Score and change */}
                <div className="flex items-center justify-between">
                  <span className="text-white text-xl font-bold">
                    {area.isUnlocked ? `${area.score}/10` : '?/10'}
                  </span>
                  {area.isUnlocked && (
                    <span className={`text-xs flex items-center ${
                      area.change >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {area.change >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                      {Math.abs(area.change)}
                    </span>
                  )}
                </div>
                
                {/* Bottom section: Progress bar */}
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${area.color} transition-all duration-1000`}
                    style={{ 
                      width: area.isUnlocked ? `${(area.score / 10) * 100}%` : '0%' 
                    }}
                  />
                </div>

                {/* ✅ FIXED: Lock/unlock status clearly visible */}
                <div className="text-xs">
                  {area.isUnlocked ? (
                    <span className="text-green-400">✓ Available</span>
                  ) : (
                    <span className="text-gray-500">🔒 Locked</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ FIXED: Consistent terminology - "Circle of Trust" */}
        {userTier === 'free' && (
          <div className="mt-4 bg-gradient-to-r from-[#FF9500]/20 to-pink-500/20 rounded-2xl p-4 border border-[#FF9500]/30">
            <div className="text-center">
              <h3 className="text-white font-semibold mb-2">Complete Your Circle of Trust</h3>
              <p className="text-gray-300 text-sm mb-3">
                Meet all 6 specialized companions who understand exactly what you need. Every conversation designed to elevate your life.
              </p>
              <button 
                onClick={() => onTabChange?.('profile')}
                className="bg-gradient-to-r from-[#FF9500] to-pink-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:from-[#FF6B00] hover:to-pink-600 transition-all"
              >
                Meet Your Full Circle →
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Available Companions - OPTIMIZED COPY */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white font-semibold">Your Circle</h2>
          <button 
            onClick={() => onTabChange?.('companions')}
            className="text-[#FF9500] text-sm hover:text-[#FF9500]/80"
          >
            View All
          </button>
        </div>
        
        <div className="space-y-3">
          {companions.map((companion) => (
            <div key={companion.name} className="bg-slate-800/30 border border-slate-700/50 p-4 rounded-2xl hover:bg-slate-800/50 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-700/50 rounded-full flex items-center justify-center text-2xl">
                  {companion.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-medium">{companion.name}</h3>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-sm">⭐</span>
                      <span className="text-gray-400 text-sm">{companion.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">{companion.specialty}</p>
                </div>
                <div className="flex items-center gap-2">
                  {companion.available ? (
                    <>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-green-400 text-sm">Available now</span>
                    </>
                  ) : (
                    <span className="text-gray-500 text-sm">🔒 Join Circle to unlock</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inspirational Quote - BELANCE ALIGNED */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-6 rounded-2xl border border-purple-500/20">
          <div className="text-center">
            <div className="text-3xl mb-3">💫</div>
            <h3 className="text-[#FF9500] font-semibold text-sm mb-3">Today's Wisdom</h3>
            <blockquote className="text-white text-base font-medium mb-3 leading-relaxed">
              "Every conversation is a chance to grow. Every growth moment is a chance to transform. Every transformation is a chance to become who you're meant to be."
            </blockquote>
            <cite className="text-purple-300 text-sm">- Your BELANCE Circle</cite>
          </div>
        </div>
      </section>
    </div>
  );
};