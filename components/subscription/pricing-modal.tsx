'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GradientButton } from '@/components/ui/gradient-button';
import { SUBSCRIPTION_TIERS, FeatureObject } from '@/lib/types';
import { Check, Crown, Star, Target } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: 'free' | 'premium' | 'premium_plus';
  onSelectTier: (tier: 'free' | 'premium' | 'premium_plus') => void;
}

// ✅ NEW: Mapping for dynamic Lucide icon rendering
const LucideIconMap: Record<string, React.ComponentType<any>> = {
  Target,
  Check,
  Crown,
  Star,
};

export function PricingModal({ isOpen, onClose, currentTier, onSelectTier }: PricingModalProps) {
  const [selectedTier, setSelectedTier] = useState<'free' | 'premium' | 'premium_plus'>(currentTier);
  const [isAnnual, setIsAnnual] = useState(false);

  const getIcon = (tierId: string) => {
    switch (tierId) {
      case 'free': return null;
      case 'premium': return <Crown className="w-5 h-5" />;
      case 'premium_plus': return <Star className="w-5 h-5" />;
    }
  };

  const isCurrentTier = (tierId: string) => tierId === currentTier;
  const isUpgrade = (tierId: string) => {
    const tierOrder = { free: 0, premium: 1, premium_plus: 2 };
    return tierOrder[tierId as keyof typeof tierOrder] > tierOrder[currentTier];
  };

  const getPrice = (tier: any) => {
    if (tier.price === 0) return '$0';
    return isAnnual ? `$${tier.annualPrice}` : `$${tier.price}`;
  };

  const getPeriod = (tier: any) => {
    if (tier.price === 0) return '';
    return isAnnual ? '/year' : '/month';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-[#0F0F23] border-[#1A1A2E]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center text-white">
            Choose Your AI Life Balance Council
          </DialogTitle>
          <p className="text-white/60 text-center">
            Start your 7-day free trial • Cancel anytime during trial
          </p>
        </DialogHeader>

        {/* Annual/Monthly Toggle with Save Badge */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Save 17% Badge - Always visible with different colors */}
            <div className="absolute -top-2 -right-2 z-10">
              <Badge 
                className={`text-white text-[11px] font-semibold px-2 py-1 rounded-[10px] shadow-lg transition-all duration-300 ${
                  isAnnual 
                    ? 'bg-gradient-to-r from-[#FF6B9D] to-[#FF9500]' 
                    : 'bg-gradient-to-r from-[#22c55e] to-[#16a34a]'
                }`}
              >
                Save 17%
              </Badge>
            </div>
            
            <div className="bg-[#1A1A2E] p-1 rounded-lg flex border border-[#16213E]">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                  !isAnnual 
                    ? 'bg-gradient-to-r from-[#FF9500] to-[#FF6B9D] text-white shadow-lg' 
                    : 'text-white/60 hover:text-white hover:bg-[#16213E]'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                  isAnnual 
                    ? 'bg-gradient-to-r from-[#FF9500] to-[#FF6B9D] text-white shadow-lg' 
                    : 'text-white/60 hover:text-white hover:bg-[#16213E]'
                }`}
              >
                Annual
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SUBSCRIPTION_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative border rounded-xl p-6 transition-all cursor-pointer bg-[#1A1A2E] ${
                selectedTier === tier.id
                  ? 'border-[#FF9500] shadow-lg scale-105 shadow-[#FF9500]/20'
                  : 'border-[#16213E] hover:border-[#16213E]/60 hover:bg-[#16213E]'
              } ${tier.id === 'premium' ? 'md:scale-110 md:shadow-xl md:shadow-[#FF9500]/10' : ''}`}
              onClick={() => setSelectedTier(tier.id)}
            >
              {tier.id === 'premium' && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#FF9500] to-[#FF6B9D] text-white">
                  Most Popular
                </Badge>
              )}

              {tier.trialDays > 0 && (
                <Badge className="absolute -top-3 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white">
                  {tier.trialDays} Days Free
                </Badge>
              )}
              
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  {getIcon(tier.id)}
                  <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                </div>
                
                <div>
                  <div className="text-3xl font-bold text-white">
                    {getPrice(tier)}
                    {tier.price > 0 && <span className="text-lg text-white/60">{getPeriod(tier)}</span>}
                  </div>
                  {isAnnual && tier.price > 0 && (
                    <p className="text-green-400 text-sm font-medium">{tier.savings} annually</p>
                  )}
                  <p className="text-white/60 text-sm">{tier.description}</p>
                </div>

                {/* ✅ ENHANCED: Feature rendering with support for FeatureObject */}
                <div className="space-y-3 text-left">
                  {tier.features.map((feature, index) => {
                    // ✅ Check if feature is a string or FeatureObject
                    const isFeatureObject = typeof feature === 'object' && feature !== null;
                    const featureText = isFeatureObject ? (feature as FeatureObject).text : feature as string;
                    const isComingSoon = isFeatureObject ? (feature as FeatureObject).isComingSoon : false;
                    const lucideIcon = isFeatureObject ? (feature as FeatureObject).lucideIcon : null;
                    const description = isFeatureObject ? (feature as FeatureObject).description : null;

                    // ✅ Get the appropriate icon component
                    const IconComponent = lucideIcon && LucideIconMap[lucideIcon] ? LucideIconMap[lucideIcon] : Check;
                    const iconColor = lucideIcon ? 'text-orange-400' : 'text-green-500';

                    return (
                      <div key={index} className="flex items-start space-x-3">
                        <IconComponent className={`w-4 h-4 mt-0.5 flex-shrink-0 ${iconColor}`} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-sm ${
                              featureText.includes('FREE TRIAL') ? 'text-green-400 font-semibold' : 'text-white/80'
                            }`}>
                              {featureText}
                            </span>
                            {/* ✅ Coming Soon Badge */}
                            {isComingSoon && (
                              <Badge className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                                Coming Soon
                              </Badge>
                            )}
                          </div>
                          {/* ✅ Feature Description */}
                          {description && (
                            <p className="text-xs text-white/60 mt-1 leading-relaxed">
                              {description}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4">
                  {isCurrentTier(tier.id) ? (
                    <Button variant="outline" className="w-full border-[#16213E] text-white/60 bg-[#16213E]" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <GradientButton
                      onClick={() => onSelectTier(tier.id)}
                      className="w-full bg-gradient-to-r from-[#FF9500] to-[#FF6B9D] hover:from-[#FF8500] hover:to-[#FF5A8A] shadow-lg"
                    >
                      {tier.trialDays > 0 && isUpgrade(tier.id) ? 'Start Free Trial' : isUpgrade(tier.id) ? 'Upgrade' : 'Select Plan'}
                    </GradientButton>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-sm text-white/50">
          <p>All plans include secure data encryption and 24/7 AI companion availability.</p>
          <p>Cancel anytime during trial • No hidden fees • {isAnnual ? 'Billed annually' : 'Billed monthly'}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}