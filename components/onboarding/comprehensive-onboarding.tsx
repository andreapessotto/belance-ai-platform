'use client';

import React, { useState, useEffect } from 'react';
import { User, Globe, MessageCircle, ChevronLeft, Video, Mic, MicOff, Camera, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { VideoCall } from '@/components/video/video-call';
import { LifeWheelPie } from '@/components/ui/life-wheel-pie';
import { LifeWheelScores } from '@/lib/types';

interface ComprehensiveOnboardingProps {
  onComplete: (data: any) => void;
}

interface UserData {
  firstName: string;
  country: string;
  language: string;
  ageRange: string;
  interests: string[];
  communicationStyle: string;
  challenges: string[];
  lifeWheelScores: LifeWheelScores;
}

const LocationLanguage = ({ userData, setUserData, setCurrentStep, totalSteps }: {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  totalSteps: number;
}) => {
  const handleCountryChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData(prev => ({ ...prev, country: e.target.value }));
  }, [setUserData]);

  const handleLanguageSelect = React.useCallback((lang: string) => {
    setUserData(prev => ({ ...prev, language: lang }));
  }, [setUserData]);

  // ✅ MODIFIED: Back button now goes to landing page instead of step 0
  const handleBack = () => {
    // Go back to landing page since we skip account creation
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="ghost"
            onClick={handleBack}
            className="text-white hover:text-gray-300"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex space-x-2">
            {[...Array(totalSteps)].map((_, i) => (
              <div key={i} className={`w-8 h-1 rounded ${i <= 0 ? 'bg-purple-500' : 'bg-gray-700'}`} />
            ))}
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Tell us about yourself</h1>
          <p className="text-gray-400">Help us personalize your experience</p>
        </div>

        <div className="space-y-6">
          <div>
            <Label className="block text-white text-sm font-medium mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4" /> Where do you live?
            </Label>
            <Input
              type="text"
              placeholder="Enter your country or region"
              value={userData.country}
              onChange={handleCountryChange}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
              autoComplete="country"
            />
          </div>

          <div>
            <Label className="block text-white text-sm font-medium mb-3 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> Preferred Language
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {['English', 'Español', 'Français', 'Deutsch', 'Italiano', 'Português'].map((lang) => (
                <Button
                  key={lang}
                  variant="outline"
                  onClick={() => handleLanguageSelect(lang)}
                  className={`p-4 rounded-lg border transition-all ${
                    userData.language === lang 
                      ? 'bg-purple-500 border-purple-400 text-white' 
                      : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                  }`}
                >
                  {lang}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Button
          onClick={() => setCurrentStep(2)}
          className="w-full mt-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
        >
          Continue →
        </Button>
      </div>
    </div>
  );
};

const AgeInterests = ({ userData, setUserData, setCurrentStep, totalSteps }: {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  totalSteps: number;
}) => {
  const interests = [
    { id: 'reading', emoji: '📚', label: 'Reading' },
    { id: 'gaming', emoji: '🎮', label: 'Gaming' },
    { id: 'cooking', emoji: '🍳', label: 'Cooking' },
    { id: 'meditation', emoji: '🧘', label: 'Meditation' },
    { id: 'technology', emoji: '💻', label: 'Technology' },
    { id: 'fitness', emoji: '🏋️', label: 'Fitness' },
    { id: 'photography', emoji: '📷', label: 'Photography' },
    { id: 'movies', emoji: '🎬', label: 'Movies' },
    { id: 'music', emoji: '🎵', label: 'Music' },
    { id: 'art', emoji: '🎨', label: 'Art' },
    { id: 'travel', emoji: '🌍', label: 'Travel' },
    { id: 'learning', emoji: '🎓', label: 'Learning' }
  ];

  const handleAgeRangeSelect = React.useCallback((range: string) => {
    setUserData(prev => ({ ...prev, ageRange: range }));
  }, [setUserData]);

  const toggleInterest = React.useCallback((interestId: string) => {
    setUserData(prev => {
      const current = prev.interests;
      if (current.includes(interestId)) {
        return { ...prev, interests: current.filter(i => i !== interestId) };
      } else {
        return { ...prev, interests: [...current, interestId] };
      }
    });
  }, [setUserData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-sm mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost"
            onClick={() => setCurrentStep(1)}
            className="text-white hover:text-gray-300 p-2"
            size="sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="flex space-x-1">
            {[...Array(totalSteps)].map((_, i) => (
              <div key={i} className={`w-6 h-1 rounded ${i <= 1 ? 'bg-purple-500' : 'bg-gray-700'}`} />
            ))}
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2 leading-tight">
            💝 Your Interests
          </h1>
          <p className="text-gray-400 text-sm mb-1">
            Let's get to know you better
          </p>
          <p className="text-gray-500 text-xs">
            Select at least 3 interests
          </p>
        </div>

        <div className="mb-6">
          <Label className="block text-white text-sm font-medium mb-3">📅 Age Range</Label>
          <div className="grid grid-cols-2 gap-2">
            {['18-25', '26-35', '36-45', '46+'].map((range) => (
              <Button
                key={range}
                variant="outline"
                onClick={() => handleAgeRangeSelect(range)}
                className={`p-3 rounded-xl border transition-all text-sm ${
                  userData.ageRange === range 
                    ? 'bg-purple-500 border-purple-400 text-white shadow-lg' 
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                }`}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <Label className="block text-white text-sm font-medium mb-3">💝 Your Interests</Label>
          <div className="max-h-64 overflow-y-auto scrollbar-hide">
            <div className="grid grid-cols-2 gap-2 pr-2">
              {interests.map((interest) => (
                <Button
                  key={interest.id}
                  variant="outline"
                  onClick={() => toggleInterest(interest.id)}
                  className={`p-3 rounded-xl border transition-all min-h-[70px] ${
                    userData.interests.includes(interest.id)
                      ? 'bg-purple-500 border-purple-400 text-white shadow-lg' 
                      : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-lg mb-1">{interest.emoji}</div>
                    <div className="font-medium text-xs leading-tight">
                      {interest.label}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-sm text-gray-500">
            Selected: <span className={userData.interests.length >= 3 ? 'text-green-400' : 'text-gray-400'}>
              {userData.interests.length}/3
            </span> minimum
          </p>
        </div>

        <Button
          onClick={() => setCurrentStep(3)}
          disabled={userData.interests.length < 3}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue →
        </Button>
      </div>
    </div>
  );
};

const CommunicationStyle = ({ userData, setUserData, setCurrentStep, totalSteps }: {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  totalSteps: number;
}) => {
  const styles = [
    { name: 'Supportive', emoji: '🤗', description: 'Encouraging and understanding' },
    { name: 'Direct', emoji: '🎯', description: 'Straightforward and honest' },
    { name: 'Humorous', emoji: '😄', description: 'Light-hearted and fun' },
    { name: 'Analytical', emoji: '🧠', description: 'Logical and data-driven' },
    { name: 'Empathetic', emoji: '💝', description: 'Emotionally aware and caring' },
    { name: 'Motivational', emoji: '⚡', description: 'Inspiring and energizing' }
  ];

  const handleStyleSelect = React.useCallback((styleName: string) => {
    setUserData(prev => ({ ...prev, communicationStyle: styleName }));
  }, [setUserData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="ghost"
            onClick={() => setCurrentStep(2)}
            className="text-white hover:text-gray-300"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex space-x-2">
            {[...Array(totalSteps)].map((_, i) => (
              <div key={i} className={`w-8 h-1 rounded ${i <= 2 ? 'bg-purple-500' : 'bg-gray-700'}`} />
            ))}
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Communication Style</h1>
          <p className="text-gray-400">How do you prefer to interact?</p>
        </div>

        <div className="space-y-4">
          {styles.map((style) => (
            <Button
              key={style.name}
              variant="outline"
              onClick={() => handleStyleSelect(style.name)}
              className={`
                w-full h-20 p-4 rounded-lg border transition-all
                flex items-center justify-start
                ${userData.communicationStyle === style.name
                  ? 'bg-purple-500 border-purple-400 text-white' 
                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                }
              `}
            >
              <div className="flex items-center gap-4 w-full">
                <div className="flex items-center justify-center w-12 h-12 text-3xl flex-shrink-0">
                  {style.emoji}
                </div>
                <div className="flex flex-col items-start justify-center flex-1">
                  <h3 className="font-semibold text-lg leading-tight">{style.name}</h3>
                  <p className="text-sm opacity-80 leading-tight">{style.description}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>

        <Button
          onClick={() => setCurrentStep(4)}
          disabled={!userData.communicationStyle}
          className="w-full mt-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue →
        </Button>
      </div>
    </div>
  );
};

const CurrentChallenges = ({ userData, setUserData, setCurrentStep, totalSteps }: {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  totalSteps: number;
}) => {
  const challenges = [
    '😰 Stress Management', '💪 Motivation', '😔 Loneliness', '🎯 Goal Setting',
    '😨 Social Anxiety', '⏰ Time Management', '😴 Sleep Issues', '💕 Relationships',
    '📈 Career Growth', '💰 Financial Planning', '🏋️ Health & Fitness', '🎨 Creativity',
    '📚 Learning New Skills', '🧘 Mindfulness', '💡 Self-Confidence'
  ];

  const toggleChallenge = React.useCallback((challenge: string) => {
    setUserData(prev => {
      const current = prev.challenges;
      if (current.includes(challenge)) {
        return { ...prev, challenges: current.filter(c => c !== challenge) };
      } else {
        return { ...prev, challenges: [...current, challenge] };
      }
    });
  }, [setUserData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="ghost"
            onClick={() => setCurrentStep(3)}
            className="text-white hover:text-gray-300"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex space-x-2">
            {[...Array(totalSteps)].map((_, i) => (
              <div key={i} className={`w-8 h-1 rounded ${i <= 3 ? 'bg-purple-500' : 'bg-gray-700'}`} />
            ))}
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Current Challenges</h1>
          <p className="text-gray-400">What areas would you like support with?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {challenges.map((challenge) => (
            <Button
              key={challenge}
              variant="outline"
              onClick={() => toggleChallenge(challenge)}
              className={`p-4 rounded-lg border transition-all text-left ${
                userData.challenges.includes(challenge)
                  ? 'bg-purple-500 border-purple-400 text-white' 
                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
              }`}
            >
              {challenge}
            </Button>
          ))}
        </div>

        <Button
          onClick={() => setCurrentStep(5)}
          className="w-full mt-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
        >
          Continue →
        </Button>
      </div>
    </div>
  );
};

const LifeWheelAssessment = ({ userData, setUserData, setCurrentStep, totalSteps, onComplete }: {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  totalSteps: number;
  onComplete: (data: UserData) => void;
}) => {
  const lifeAreas = [
    { name: 'mental_health', displayName: 'Mental Health', color: '#8B5CF6', icon: '🧠' },
    { name: 'relationships', displayName: 'Relationships & Love', color: '#EC4899', icon: '💕' },
    { name: 'career', displayName: 'Career & Purpose', color: '#3B82F6', icon: '💼' },
    { name: 'health', displayName: 'Health & Wellness', color: '#10B981', icon: '💪' },
    { name: 'finance', displayName: 'Financial Wellbeing', color: '#F59E0B', icon: '💰' },
    { name: 'creativity', displayName: 'Fun & Recreation', color: '#06B6D4', icon: '🎉' }
  ] as const;

  const updateScore = React.useCallback((area: keyof LifeWheelScores, score: number) => {
    setUserData(prev => ({
      ...prev,
      lifeWheelScores: {
        ...prev.lifeWheelScores,
        [area]: score
      }
    }));
  }, [setUserData]);

  const averageScore = Object.values(userData.lifeWheelScores).reduce((a, b) => a + b, 0) / Object.keys(userData.lifeWheelScores).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="flex justify-between items-center p-4 mb-4">
        <Button 
          variant="ghost"
          onClick={() => setCurrentStep(4)}
          className="text-white hover:text-gray-300"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex space-x-2">
          {[...Array(totalSteps)].map((_, i) => (
            <div key={i} className={`w-8 h-1 rounded ${i <= 4 ? 'bg-purple-500' : 'bg-gray-700'}`} />
          ))}
        </div>
      </div>

      <div className="text-center mb-6 px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Where Are You Today?</h1>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
          Every transformation starts with truth. Rate each area honestly - this becomes your personal roadmap to the life you want.
        </p>
      </div>

      <div className="flex justify-center mb-8 px-4">
        <LifeWheelPie
          scores={userData.lifeWheelScores}
          size={600}
          darkMode={true}
          className="mb-4"
        />
      </div>

      <div className="px-4 pb-8">
        <div className="max-w-md mx-auto">
          <h3 className="text-white font-semibold mb-2 text-center">Show us your starting point</h3>
          <p className="text-gray-400 text-sm mb-6 text-center">Be honest - this is just between you and your Circle</p>
          
          <div className="space-y-4">
            {lifeAreas.map((area) => (
              <div key={area.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white text-sm font-medium">{area.displayName}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-xs">0</span>
                    <span className="text-white text-sm font-bold min-w-[20px] text-center">
                      {userData.lifeWheelScores[area.name]}
                    </span>
                    <span className="text-gray-400 text-xs">10</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={userData.lifeWheelScores[area.name]}
                  onChange={(e) => updateScore(area.name, parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, ${area.color} 0%, ${area.color} ${userData.lifeWheelScores[area.name] * 10}%, #374151 ${userData.lifeWheelScores[area.name] * 10}%, #374151 100%)`
                  }}
                />
              </div>
            ))}
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mt-6 mb-6">
            <h3 className="text-white font-semibold mb-2 text-center">Your Starting Point</h3>
            <div className="text-2xl font-bold text-purple-400 mb-2 text-center">{averageScore.toFixed(1)}/10</div>
            <p className="text-gray-400 text-sm text-center">Every journey begins with a single step. You're already taking yours.</p>
          </div>

          <Button
            onClick={() => onComplete(userData)}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
          >
            Meet Your Circle →
          </Button>
        </div>
      </div>
    </div>
  );
};

export function ComprehensiveOnboarding({ onComplete }: ComprehensiveOnboardingProps) {
  // ✅ MODIFIED: Start from step 1 instead of 0 to skip account creation
  const [currentStep, setCurrentStep] = useState(1);
  
  const [userData, setUserData] = useState<UserData>({
    firstName: 'BELANCE User', // Default name since we skip signup
    country: '',
    language: '',
    ageRange: '',
    interests: [] as string[],
    communicationStyle: '',
    challenges: [] as string[],
    lifeWheelScores: {
      mental_health: 5,
      relationships: 5,
      career: 5,
      health: 5,
      finance: 5,
      creativity: 5
    }
  });

  const totalSteps = 5; // ✅ REDUCED: Now 5 steps instead of 6 (removed account creation)

  const renderStep = () => {
    switch(currentStep) {
      case 1: 
        return <LocationLanguage 
          userData={userData} 
          setUserData={setUserData} 
          setCurrentStep={setCurrentStep} 
          totalSteps={totalSteps} 
        />;
      case 2: 
        return <AgeInterests 
          userData={userData} 
          setUserData={setUserData} 
          setCurrentStep={setCurrentStep} 
          totalSteps={totalSteps} 
        />;
      case 3: 
        return <CommunicationStyle 
          userData={userData} 
          setUserData={setUserData} 
          setCurrentStep={setCurrentStep} 
          totalSteps={totalSteps} 
        />;
      case 4: 
        return <CurrentChallenges 
          userData={userData} 
          setUserData={setUserData} 
          setCurrentStep={setCurrentStep} 
          totalSteps={totalSteps} 
        />;
      case 5: 
        return <LifeWheelAssessment 
          userData={userData} 
          setUserData={setUserData} 
          setCurrentStep={setCurrentStep}
          totalSteps={totalSteps} 
          onComplete={onComplete} 
        />;
      default: 
        return <LocationLanguage 
          userData={userData} 
          setUserData={setUserData} 
          setCurrentStep={setCurrentStep} 
          totalSteps={totalSteps} 
        />;
    }
  };

  return (
    <div className="font-sans">
      {renderStep()}
    </div>
  );
}

export function VideoCallInterface({ onEndCall }: { onEndCall: () => void }) {
  return (
    <VideoCall 
      companionName="SAGE"
      companionSpecialty="Mental Health & Personal Growth"
      onEndCall={onEndCall}
      useTavus={true}
    />
  );
}