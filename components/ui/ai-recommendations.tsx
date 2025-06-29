'use client';

import { useState } from 'react';
import { LifeWheelScores, AIRecommendation } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, TrendingUp, Lightbulb, MessageCircle, CheckCircle, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIRecommendationsProps {
  lifeWheelScores: LifeWheelScores;
  onStartChat?: (companionId: string) => void;
  onSetGoal?: (area: string) => void;
}

export function AIRecommendations({ lifeWheelScores, onStartChat, onSetGoal }: AIRecommendationsProps) {
  const [expandedRecommendation, setExpandedRecommendation] = useState<string | null>(null);

  // Generate AI recommendations based on life wheel scores
  const generateRecommendations = (): AIRecommendation[] => {
    const recommendations: AIRecommendation[] = [];
    
    // Find the lowest scoring areas for high priority recommendations
    const sortedAreas = Object.entries(lifeWheelScores).sort(([,a], [,b]) => a - b);
    
    // Mental Health recommendation (always available with SAGE)
    if (lifeWheelScores.mental_health <= 6) {
      recommendations.push({
        area: 'mental_health',
        priority: lifeWheelScores.mental_health <= 4 ? 'high' : 'medium',
        suggestion: lifeWheelScores.mental_health <= 4 
          ? 'Your mental health score needs attention. Consider focusing on this area this week.'
          : 'Great progress in mental health! Ready to explore advanced strategies?',
        actionItems: [
          'Explore advanced mindfulness practices',
          'Consider teaching or mentoring others'
        ],
        companionAdvice: 'SAGE can help you maintain momentum and explore new challenges.',
        estimatedImpact: lifeWheelScores.mental_health <= 4 
          ? 'Could improve your score by 1-2 points in 2 weeks'
          : 'Could reach 8-9 points with advanced techniques',
        icon: '🧠'
      });
    }

    // Career recommendation (ALEX - Premium required)
    if (lifeWheelScores.career <= 6) {
      recommendations.push({
        area: 'career',
        priority: lifeWheelScores.career <= 4 ? 'high' : 'medium',
        suggestion: lifeWheelScores.career <= 4 
          ? 'Your career score needs attention. Consider focusing on this area this week.'
          : 'Good career progress! Ready for the next level?',
        actionItems: [
          'Update your resume and LinkedIn profile',
          'Set clear short-term career goals'
        ],
        companionAdvice: 'ALEX specializes in career and can provide personalized guidance.',
        estimatedImpact: lifeWheelScores.career <= 4 
          ? 'Could improve your score by 1-2 points in 2 weeks'
          : 'Could reach 8-9 points with strategic planning',
        icon: '💼'
      });
    }

    // Health recommendation (VITA - Premium Plus required)
    if (lifeWheelScores.health <= 6) {
      recommendations.push({
        area: 'health',
        priority: 'medium',
        suggestion: 'Your health and wellness could use some attention.',
        actionItems: [
          'Establish a consistent exercise routine',
          'Focus on nutrition and sleep quality'
        ],
        companionAdvice: 'VITA can help you build sustainable healthy habits.',
        estimatedImpact: 'Could improve your score by 1-2 points in 3 weeks',
        icon: '💪'
      });
    }

    return recommendations.slice(0, 3); // Limit to 3 recommendations
  };

  const recommendations = generateRecommendations();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getCompanionId = (area: string) => {
    const mapping: Record<string, string> = {
      'mental_health': 'sage',
      'career': 'alex',
      'health': 'vita',
      'relationships': 'maya',
      'finance': 'felix',
      'creativity': 'luna'
    };
    return mapping[area] || 'sage';
  };

  const getCompanionName = (area: string) => {
    const mapping: Record<string, string> = {
      'mental_health': 'SAGE',
      'career': 'ALEX',
      'health': 'VITA',
      'relationships': 'MAYA',
      'finance': 'FELIX',
      'creativity': 'LUNA'
    };
    return mapping[area] || 'SAGE';
  };

  const getAreaDisplayName = (area: string) => {
    const mapping: Record<string, string> = {
      'mental_health': 'Mental Health',
      'career': 'Career',
      'health': 'Health',
      'relationships': 'Relationships',
      'finance': 'Finance',
      'creativity': 'Creativity'
    };
    return mapping[area] || area;
  };

  // ✅ Check if companion is available (only SAGE for MVP demo)
  const isCompanionAvailable = (area: string) => {
    const companionName = getCompanionName(area);
    return companionName === 'SAGE'; // Only SAGE is available in MVP demo
  };

  const handleTalkToCompanion = (area: string) => {
    const companionId = getCompanionId(area);
    const companionName = getCompanionName(area);
    
    // ✅ Only allow SAGE conversations in MVP demo
    if (companionName === 'SAGE' && onStartChat) {
      onStartChat(companionId);
    }
  };

  const handleSetGoal = (area: string) => {
    // ✅ Disabled for MVP demo - no functionality
    console.log('Set Goal disabled for MVP demo');
  };

  if (recommendations.length === 0) {
    return (
      <Card className="bg-white/5 border-white/10 rounded-lg">
        <CardContent className="p-6 text-center">
          <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-white font-semibold mb-2">You're doing great!</h3>
          <p className="text-white/60 text-sm">
            All your life areas are well-balanced. Keep up the excellent work!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/5 border-white/10 rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <Target className="w-5 h-5 text-[#FF9500]" />
          <span>Personalized Insights & Recommendations</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((recommendation, index) => {
          const isExpanded = expandedRecommendation === recommendation.area;
          const companionName = getCompanionName(recommendation.area);
          const isAvailable = isCompanionAvailable(recommendation.area);
          
          return (
            <div
              key={recommendation.area}
              className="bg-white/5 rounded-xl p-4 border border-white/10 transition-all duration-300 hover:bg-white/8"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{recommendation.icon}</div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge className={`${getPriorityColor(recommendation.priority)} text-white text-xs px-2 py-1`}>
                        {recommendation.priority.toUpperCase()} PRIORITY
                      </Badge>
                      <h4 className="text-white font-semibold">{getAreaDisplayName(recommendation.area)}</h4>
                    </div>
                  </div>
                </div>
                {!isAvailable && (
                  <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                )}
              </div>

              {/* Suggestion */}
              <p className="text-white/80 text-sm mb-3 leading-relaxed">
                {recommendation.suggestion}
              </p>

              {/* AI Analysis Quote */}
              <div className="bg-black/20 rounded-lg p-3 mb-4 border-l-4 border-[#FF9500]">
                <p className="text-white/90 text-sm italic leading-relaxed">
                  "{recommendation.companionAdvice}"
                </p>
                <p className="text-[#FF9500] text-xs mt-1 font-medium">- AI Analysis</p>
              </div>

              {/* Action Items */}
              <div className="space-y-2 mb-4">
                {recommendation.actionItems.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-[#FF9500] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-white/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* Impact Estimate */}
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm font-medium">{recommendation.estimatedImpact}</span>
              </div>

              {/* ✅ FIXED: Action Buttons with proper layout and functionality */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* ✅ Talk to Companion Button - Only enabled for SAGE */}
                <Button
                  onClick={() => handleTalkToCompanion(recommendation.area)}
                  disabled={!isAvailable}
                  className={cn(
                    "flex-1 transition-all duration-300 font-medium text-sm",
                    "px-4 py-3 min-h-[44px] rounded-lg", // ✅ Increased padding and height
                    "flex items-center justify-center gap-2", // ✅ Better content alignment
                    isAvailable
                      ? "bg-gradient-to-r from-[#FF9500] to-pink-500 hover:from-[#FF6B00] hover:to-pink-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]"
                      : "bg-gray-600/50 text-gray-400 cursor-not-allowed border border-gray-500/30"
                  )}
                >
                  {isAvailable ? (
                    <>
                      <MessageCircle className="w-4 h-4 flex-shrink-0" />
                      <span className="whitespace-nowrap">Talk to {companionName}</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 flex-shrink-0" />
                      <span className="whitespace-nowrap">Talk to {companionName}</span>
                    </>
                  )}
                </Button>

                {/* ✅ Set Goal Button - Always disabled for MVP demo */}
                <Button
                  onClick={() => handleSetGoal(recommendation.area)}
                  disabled={true} // ✅ Always disabled for MVP demo
                  className={cn(
                    "flex-1 sm:flex-none transition-all duration-300 font-medium text-sm",
                    "px-6 py-3 min-h-[44px] rounded-lg", // ✅ Increased padding and height
                    "flex items-center justify-center gap-2", // ✅ Better content alignment
                    "bg-gray-600/50 text-gray-400 cursor-not-allowed border border-gray-500/30"
                  )}
                >
                  <Target className="w-4 h-4 flex-shrink-0" />
                  <span className="whitespace-nowrap">Set Goal</span>
                </Button>
              </div>
            </div>
          );
        })}

        {/* ✅ MVP Demo Notice */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mt-4">
          <div className="flex items-center space-x-2">
            <Lightbulb className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <p className="text-blue-300 text-sm">
              <strong>MVP Demo:</strong> Only SAGE conversations are available. Other companions require premium access.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}