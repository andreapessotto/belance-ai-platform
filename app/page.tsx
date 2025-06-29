'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LandingPage } from '@/components/landing/landing-page';
import { ComprehensiveOnboarding, VideoCallInterface } from '@/components/onboarding/comprehensive-onboarding';
import { CompanionsView } from '@/components/dashboard/companions-view';
import { ProgressView } from '@/components/dashboard/progress-view';
import { MainDashboard } from '@/components/dashboard/main-dashboard';
import { BottomNav } from '@/components/navigation/bottom-nav';
import { TopNavigation } from '@/components/ui/top-navigation';
import { LifeAreaDetailModal } from '@/components/ui/life-area-detail-modal';
import { PricingModal } from '@/components/subscription/pricing-modal';
import { BoltBadge } from '@/components/layout/bolt-badge';
import { AICompanion, LifeWheelScores, UserProfile, LifeAreaDetail, LIFE_AREAS } from '@/lib/types';
import { STORAGE_KEYS, saveToStorage, getFromStorage, clearAllUserData } from '@/lib/storage';
import { Loader2 } from 'lucide-react';

type AppState = 'loading' | 'landing' | 'onboarding' | 'dashboard' | 'video-call';

// Mock data for companions
const mockCompanions: AICompanion[] = [
  {
    id: 'sage',
    name: 'SAGE',
    specialty: 'Mental Health & Personal Development',
    description: 'Your wise and grounding companion for mindfulness, anxiety management, and emotional regulation.',
    tier_requirement: 'free',
    personality_traits: {
      traits: ['calm', 'philosophical', 'grounding', 'wise'],
      approach: 'mindful',
      communication_style: 'gentle_guidance'
    },
    avatar_config: {
      age_range: '35-40',
      gender: 'neutral',
      style: 'zen-modern',
      voice_tone: 'calm_deep'
    },
    sort_order: 1
  },
  {
    id: 'maya',
    name: 'MAYA',
    specialty: 'Relationship & Love Specialist',
    description: 'Your empathetic guide for navigating romantic relationships, family dynamics, and friendship conflicts.',
    tier_requirement: 'premium',
    personality_traits: {
      traits: ['empathetic', 'warm', 'intuitive', 'nurturing'],
      approach: 'heart-centered',
      communication_style: 'supportive_listening'
    },
    avatar_config: {
      age_range: '28-32',
      gender: 'woman',
      style: 'casual-chic',
      voice_tone: 'warm_caring'
    },
    sort_order: 2
  },
  {
    id: 'alex',
    name: 'ALEX',
    specialty: 'Career & Professional Growth',
    description: 'Your strategic partner for leadership development, networking mastery, and workplace success.',
    tier_requirement: 'premium',
    personality_traits: {
      traits: ['ambitious', 'strategic', 'encouraging', 'results-oriented'],
      approach: 'goal-focused',
      communication_style: 'motivational_coaching'
    },
    avatar_config: {
      age_range: '30-35',
      gender: 'man',
      style: 'business-casual',
      voice_tone: 'confident_encouraging'
    },
    sort_order: 3
  }
];

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [appState, setAppState] = useState<AppState>('loading');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [companions, setCompanions] = useState<AICompanion[]>([]);
  const [showPricing, setShowPricing] = useState(false);
  const [showAreaDetail, setShowAreaDetail] = useState(false);
  const [selectedAreaDetail, setSelectedAreaDetail] = useState<LifeAreaDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Scroll to top on state changes
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [appState, activeTab]);

  useEffect(() => {
    initializeApp();
  }, []);

  // Handle tab parameter and openModal parameter from URL
  useEffect(() => {
    if (appState === 'dashboard' && searchParams) {
      const tabParam = searchParams.get('tab');
      const openModalParam = searchParams.get('openModal');
      
      if (tabParam && ['dashboard', 'companions', 'progress'].includes(tabParam)) {
        console.log(`🔄 Setting active tab from URL parameter: ${tabParam}`);
        setActiveTab(tabParam);
      }
      
      // Handle openModal parameter for pricing modal
      if (openModalParam === 'pricing') {
        console.log('🔄 Opening pricing modal from URL parameter');
        setShowPricing(true);
      }
      
      // Clean up the URL by removing the parameters
      if (tabParam || openModalParam) {
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
      }
    }
  }, [appState, searchParams]);

  // ✅ SIMPLIFIED: Initialize app with localStorage only
  const initializeApp = async () => {
    try {
      // Always scroll to top on app initialization
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // ✅ CHECK if user profile exists in localStorage
      const savedUserProfile = getFromStorage(STORAGE_KEYS.USER_PROFILE);

      console.log('🔍 Checking for existing user profile...', { savedUserProfile });

      if (savedUserProfile) {
        // ✅ USER PROFILE EXISTS - Go to dashboard
        console.log('✅ User profile found, going to dashboard...');
        
        setUserProfile(savedUserProfile);
        setCompanions(mockCompanions);
        
        // Simulation of loading for UX
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Go directly to dashboard
        setAppState('dashboard');
      } else {
        // ✅ NO USER PROFILE - Show landing page
        console.log('❌ No user profile found, showing landing page...');
        
        // Simulation of loading
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show landing page
        setAppState('landing');
        setCompanions(mockCompanions);
      }
    } catch (error) {
      console.error('Error initializing app:', error);
      // In case of error, always show landing page
      setAppState('landing');
      setCompanions(mockCompanions);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetStarted = () => {
    // Scroll to top before changing state
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setAppState('onboarding');
  };

  // ✅ SIMPLIFIED: Handle onboarding complete with localStorage only
  const handleOnboardingComplete = async (data: any) => {
    try {
      setIsLoading(true);
      
      // Scroll to top
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // ✅ SIMPLIFIED: Create user profile without authentication
      const profileData: UserProfile = {
        id: `user_${Date.now()}`,
        email: 'demo@belance.ai', // Default email since we skip signup
        full_name: data.firstName || 'BELANCE User',
        subscription_tier: 'free',
        onboarding_completed: true,
        life_wheel_scores: {
          mental_health: data.lifeWheelScores['mental_health'] || 5,
          relationships: data.lifeWheelScores['relationships'] || 5,
          career: data.lifeWheelScores['career'] || 5,
          health: data.lifeWheelScores['health'] || 5,
          finance: data.lifeWheelScores['finance'] || 5,
          creativity: data.lifeWheelScores['creativity'] || 5
        },
        preferences: {
          country: data.country,
          language: data.language,
          age: data.ageRange,
          interests: data.interests,
          communicationStyle: [data.communicationStyle],
          challenges: data.challenges
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setUserProfile(profileData);

      // ✅ SAVE to localStorage only
      console.log('💾 Saving user profile to localStorage...');
      saveToStorage(STORAGE_KEYS.USER_PROFILE, profileData);

      console.log('✅ User profile saved successfully!');

      // ✅ REDIRECT TO COMPLETION PAGE
      router.push('/onboarding/complete');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartChat = (companionId: string) => {
    // Scroll to top before changing state
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setAppState('video-call');
  };

  const handleEndCall = () => {
    // Scroll to top before changing state
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setAppState('dashboard');
  };

  const handleUpgrade = () => {
    setShowPricing(true);
  };

  const handleSelectTier = async (tier: 'free' | 'premium' | 'premium_plus') => {
    try {
      // Update subscription tier
      const updatedProfile = { ...userProfile, subscription_tier: tier } as UserProfile;
      setUserProfile(updatedProfile);
      
      // ✅ UPDATE localStorage with new subscription tier
      saveToStorage(STORAGE_KEYS.USER_PROFILE, updatedProfile);
      
      setShowPricing(false);
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  };

  // ✅ SIMPLIFIED: Handle logout with localStorage cleanup only
  const handleLogout = async () => {
    try {
      console.log('🚪 Logging out user...');
      
      // Clear all user state
      setUserProfile(null);
      
      // ✅ CLEAR ALL localStorage data
      console.log('🗑️ Clearing all user data from localStorage...');
      clearAllUserData();
      
      // Scroll to top before changing state
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Return to landing page
      setAppState('landing');
      
      console.log('✅ Logout completed successfully!');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Handle tab changes with profile routing
  const handleTabChange = (tab: string) => {
    if (tab === 'profile') {
      // Navigate to the new unified profile page
      router.push('/profile');
    } else {
      setActiveTab(tab);
    }
  };

  const handleAreaClick = (area: string) => {
    const scores = userProfile?.life_wheel_scores || {
      mental_health: 4,
      relationships: 4,
      career: 4,
      health: 4,
      finance: 4,
      creativity: 4
    };

    const areaDetail: LifeAreaDetail = {
      area,
      currentScore: scores[area as keyof LifeWheelScores] || 4,
      previousScore: (scores[area as keyof LifeWheelScores] || 4) - 0.2,
      trend: Math.random() > 0.5 ? 'up' : 'down',
      recommendations: [
        `Focus on daily ${area} practices`,
        `Set specific ${area} goals`,
        `Track your ${area} progress weekly`
      ],
      relatedCompanion: LIFE_AREAS[area as keyof typeof LIFE_AREAS]?.companion || 'SAGE',
      weeklyProgress: [3, 3.2, 3.5, 3.8, 4.0, 4.1, scores[area as keyof LifeWheelScores] || 4],
      insights: `Your ${area} has shown steady improvement over the past month.`,
      changeAmount: 0.3
    };

    setSelectedAreaDetail(areaDetail);
    setShowAreaDetail(true);
  };

  // Get page title and subtitle based on active tab
  const getPageTitle = () => {
    switch (activeTab) {
      case 'companions': return 'Your AI Companions';
      case 'progress': return 'Your Progress';
      case 'profile': return 'Profile';
      default: return 'Good morning!';
    }
  };

  const getPageSubtitle = () => {
    switch (activeTab) {
      case 'companions': return 'Choose a companion to start your conversation';
      case 'dashboard': return 'Conversations that change YOU.';
      default: return undefined;
    }
  };

  // Get first name from user profile
  const getFirstName = (): string | undefined => {
    return userProfile?.full_name?.split(' ')[0] || undefined;
  };

  const renderTabContent = () => {
    if (!userProfile) return null;

    switch (activeTab) {
      case 'dashboard':
        return (
          <MainDashboard
            userProfile={userProfile}
            onStartChat={handleStartChat}
            onAreaClick={handleAreaClick}
            onTabChange={handleTabChange}
          />
        );
      case 'companions':
        return (
          <CompanionsView
            companions={companions}
            userTier={userProfile.subscription_tier}
            onStartChat={handleStartChat}
            onUpgrade={handleUpgrade}
          />
        );
      case 'progress':
        return (
          <ProgressView
            lifeWheelScores={userProfile.life_wheel_scores || {
              mental_health: 4,
              relationships: 4,
              career: 4,
              health: 4,
              finance: 4,
              creativity: 4
            }}
            onStartChat={handleStartChat}
          />
        );
      default:
        return (
          <MainDashboard
            userProfile={userProfile}
            onStartChat={handleStartChat}
            onAreaClick={handleAreaClick}
            onTabChange={handleTabChange}
          />
        );
    }
  };

  // ✅ LOADING SCREEN
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F0F23] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#FF9500]" />
          <p className="text-white/60">Loading your BELANCE experience...</p>
        </div>
      </div>
    );
  }

  if (appState === 'landing') {
    return (
      <>
        <LandingPage onGetStarted={handleGetStarted} />
        <BoltBadge fixedPosition={true} />
      </>
    );
  }

  if (appState === 'onboarding') {
    return (
      <>
        <ComprehensiveOnboarding onComplete={handleOnboardingComplete} />
        <BoltBadge fixedPosition={true} />
      </>
    );
  }

  if (appState === 'video-call') {
    return <VideoCallInterface onEndCall={handleEndCall} />;
  }

  if (appState === 'dashboard') {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {/* Header with consistent dark background */}
          <TopNavigation 
            title={getPageTitle()}
            subtitle={getPageSubtitle()}
            firstName={getFirstName()}
            isSticky={false}
            bgColor="bg-[#0F0F23]"
          />
          
          {/* Main Content */}
          <main className="pb-40 pt-8">
            <div className="dashboard-container px-4">
              {renderTabContent()}
            </div>
          </main>
          
          {/* Bottom Navigation */}
          <BottomNav
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />

          <PricingModal
            isOpen={showPricing}
            onClose={() => setShowPricing(false)}
            currentTier={userProfile?.subscription_tier || 'free'}
            onSelectTier={handleSelectTier}
          />

          <LifeAreaDetailModal
            isOpen={showAreaDetail}
            onClose={() => setShowAreaDetail(false)}
            areaDetail={selectedAreaDetail}
            onStartChat={handleStartChat}
          />
        </div>
        
        {/* Fixed positioned Bolt Badge for dashboard */}
        <BoltBadge fixedPosition={true} />
      </>
    );
  }

  return null;
}