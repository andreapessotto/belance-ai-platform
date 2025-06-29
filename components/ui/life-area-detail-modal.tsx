'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { LifeAreaDetail, LIFE_AREAS } from '@/lib/types';
import { TrendingUp, TrendingDown, Minus, MessageCircle, Target, X } from 'lucide-react';

interface LifeAreaDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  areaDetail: LifeAreaDetail | null;
  onStartChat?: (companionId: string) => void;
}

export function LifeAreaDetailModal({ isOpen, onClose, areaDetail, onStartChat }: LifeAreaDetailModalProps) {
  if (!areaDetail) return null;

  const areaInfo = LIFE_AREAS[areaDetail.area as keyof typeof LIFE_AREAS];
  
  if (!areaInfo) {
    return null;
  }

  const getTrendIcon = () => {
    switch (areaDetail.trend) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      default:
        return <Minus className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTrendText = () => {
    const change = areaDetail.changeAmount;
    const sign = change > 0 ? '+' : '';
    return `${sign}${change} this week`;
  };

  const getCompanionId = () => {
    const companionMap: { [key: string]: string } = {
      'SAGE': 'sage',
      'MAYA': 'maya',
      'ALEX': 'alex',
      'VITA': 'vita',
      'FELIX': 'felix',
      'LUNA': 'luna'
    };
    return companionMap[areaDetail.relatedCompanion] || 'sage';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="modal-content max-w-[400px] max-h-[80vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="modal-close"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <DialogHeader className="text-left mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{areaInfo.icon}</span>
            <DialogTitle className="text-xl font-bold text-white">
              {areaInfo.name} Deep Dive
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Score Display */}
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-white mb-2">
            {areaDetail.currentScore}/10
          </div>
          <div className="flex items-center justify-center gap-2">
            {getTrendIcon()}
            <span className={`text-sm font-medium ${
              areaDetail.trend === 'up' ? 'text-green-500' : 
              areaDetail.trend === 'down' ? 'text-red-500' : 'text-gray-500'
            }`}>
              {getTrendText()}
            </span>
          </div>
        </div>

        {/* Progress Chart Placeholder */}
        <Card className="mb-6 bg-white/5 border-white/10">
          <CardContent className="p-4">
            <h3 className="text-white font-semibold mb-3">30-Day Progress</h3>
            <div className="chart-container">
              <div className="text-white/60 text-sm">
                Progress visualization would appear here
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="mb-6 bg-white/5 border-white/10">
          <CardContent className="p-4">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              💡 AI Insights
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              {areaDetail.insights}
            </p>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="mb-6 bg-white/5 border-white/10">
          <CardContent className="p-4">
            <h3 className="text-white font-semibold mb-3">Recommendations</h3>
            <div className="space-y-2">
              {areaDetail.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-orange-400 text-sm mt-1">•</span>
                  <span className="text-white/80 text-sm">{rec}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={() => {
              onStartChat?.(getCompanionId());
              onClose();
            }}
            className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white min-h-[44px]"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Talk to {areaDetail.relatedCompanion}
          </Button>
          
          <Button
            variant="outline"
            className="flex-1 border-white/20 text-white/70 hover:bg-white/10 min-h-[44px]"
            onClick={() => {
              // In a real app, this would open goal setting
              alert(`Goal setting for ${areaInfo.name} would open here! 🎯`);
              onClose();
            }}
          >
            <Target className="w-4 h-4 mr-2" />
            Set Goal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}