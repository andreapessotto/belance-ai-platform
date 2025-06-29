'use client';

import { useState } from 'react';
import { LifeWheelScores, LifeAreaDetail } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LifeWheel } from '@/components/ui/life-wheel';
import { LifeAreaDetailModal } from '@/components/ui/life-area-detail-modal';
import { AIRecommendations } from '@/components/ui/ai-recommendations';
import { TrendingUp, Target, Award, Calendar, Zap } from 'lucide-react';

interface ProgressViewProps {
  lifeWheelScores: LifeWheelScores;
  onStartChat?: (companionId: string) => void;
}

export function ProgressView({ lifeWheelScores, onStartChat }: ProgressViewProps) {
  const [selectedAreaDetail, setSelectedAreaDetail] = useState<LifeAreaDetail | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  
  const overallScore = Object.values(lifeWheelScores).reduce((a, b) => a + b, 0) / 6;
  
  const mockGoals = [
    { id: 1, title: 'Reduce daily stress', progress: 65, category: 'Mental Health' },
    { id: 2, title: 'Exercise 3x per week', progress: 80, category: 'Health' },
    { id: 3, title: 'Save $500/month', progress: 45, category: 'Finance' },
  ];

  const mockAchievements = [
    { id: 1, title: 'First Week Complete', icon: '🎉', date: '2 days ago' },
    { id: 2, title: 'Stress Warrior', icon: '🧘', date: '1 week ago' },
    { id: 3, title: 'Goal Setter', icon: '🎯', date: '2 weeks ago' },
  ];

  const handleAreaClick = (areaDetail: LifeAreaDetail) => {
    setSelectedAreaDetail(areaDetail);
    setShowDetailModal(true);
  };

  const handleSetGoal = (area: string) => {
    // In a real app, this would open a goal-setting interface
    console.log('Setting goal for area:', area);
    alert(`Goal setting for ${area} would open here in the full app! 🎯`);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* ✅ FIXED: Consistent title spacing and font size */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Your Progress</h2>
        <p className="text-white/60">Track your journey and celebrate your wins</p>
      </div>

      {/* Overall Score */}
      <Card className="bg-[#1A1A2E]/50 border-[#16213E]">
        <CardContent className="p-6 text-center">
          <div className="text-4xl font-bold text-white mb-2">
            {Math.round(overallScore * 10) / 10}/10
          </div>
          <p className="text-white/60">Overall Life Balance Score</p>
          <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30">
            +0.3 this week
          </Badge>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <AIRecommendations 
        lifeWheelScores={lifeWheelScores}
        onStartChat={onStartChat}
        onSetGoal={handleSetGoal}
      />

      {/* Detailed Life Wheel with Professional Layout */}
      <Card className="bg-[#1A1A2E]/50 border-[#16213E] overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <TrendingUp className="w-5 h-5" />
            <span>Life Balance Breakdown</span>
          </CardTitle>
          <p className="text-white/60 text-sm">Click on any area for detailed insights and recommendations</p>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex justify-center">
            <LifeWheel
              scores={lifeWheelScores}
              size={600}
              darkMode={true}
              showLabels={true}
              onAreaClick={handleAreaClick}
              className="transition-all duration-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Goals Tracking */}
      <Card className="bg-[#1A1A2E]/50 border-[#16213E]">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Target className="w-5 h-5" />
            <span>Active Goals</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockGoals.map((goal) => (
            <div key={goal.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-white font-medium">{goal.title}</h4>
                  <p className="text-white/60 text-sm">{goal.category}</p>
                </div>
                <Badge variant="outline" className="border-white/20 text-white/70">
                  {goal.progress}%
                </Badge>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-[#1A1A2E]/50 border-[#16213E]">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Award className="w-5 h-5" />
            <span>Recent Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockAchievements.map((achievement) => (
            <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <h4 className="text-white font-medium">{achievement.title}</h4>
                <p className="text-white/60 text-sm">{achievement.date}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weekly Insights */}
      <Card className="bg-[#1A1A2E]/50 border-[#16213E]">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Calendar className="w-5 h-5" />
            <span>This Week's Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-lg border border-orange-500/30">
            <p className="text-white/90">
              "You've shown great consistency in your mental health practices this week. 
              Consider exploring some creativity exercises to boost that area next!"
            </p>
            <p className="text-white/60 text-sm mt-2">- AI Analysis</p>
          </div>
        </CardContent>
      </Card>

      {/* Life Area Detail Modal */}
      <LifeAreaDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        areaDetail={selectedAreaDetail}
        onStartChat={onStartChat}
      />
    </div>
  );
}