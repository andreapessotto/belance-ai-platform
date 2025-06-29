'use client';

import { AICompanion } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lock, Video, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompanionCardProps {
  companion: AICompanion;
  userTier: 'free' | 'premium' | 'premium_plus';
  onStartChat?: (companionId: string) => void;
  onUpgrade?: () => void;
  className?: string;
}

const tierOrder = { free: 0, premium: 1, premium_plus: 2 };

export function CompanionCard({ companion, userTier, onStartChat, onUpgrade, className }: CompanionCardProps) {
  const isUnlocked = tierOrder[userTier] >= tierOrder[companion.tier_requirement as keyof typeof tierOrder];
  
  const gradientColors = {
    SAGE: 'from-blue-400 to-blue-600',
    MAYA: 'from-pink-400 to-pink-600',
    ALEX: 'from-green-400 to-green-600',
    VITA: 'from-orange-400 to-orange-600',
    FELIX: 'from-purple-400 to-purple-600',
    LUNA: 'from-cyan-400 to-cyan-600',
  };

  const gradient = gradientColors[companion.name as keyof typeof gradientColors] || 'from-gray-400 to-gray-600';

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:shadow-lg bg-white/5 border-white/10",
      isUnlocked ? "hover:scale-105" : "opacity-75",
      className
    )}>
      {!isUnlocked && (
        <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
          <div className="bg-white/90 rounded-full p-3 backdrop-blur-sm">
            <Lock className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      )}
      
      <div className={`h-32 bg-gradient-to-br ${gradient} relative`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-4 right-4">
          <Badge variant={isUnlocked ? "default" : "secondary"} className="text-xs bg-black/20 text-white border-white/20">
            {companion.tier_requirement.replace('_', ' ').toUpperCase()}
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4">
          <h3 className="text-2xl font-bold text-white">{companion.name}</h3>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wide">
              {companion.specialty}
            </h4>
            <p className="text-white/60 text-sm mt-1 line-clamp-3">
              {companion.description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {companion.personality_traits.traits.slice(0, 3).map((trait) => (
              <Badge key={trait} variant="outline" className="text-xs border-white/20 text-white/70">
                {trait}
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-2">
            {isUnlocked ? (
              <>
                <Button
                  onClick={() => onStartChat?.(companion.id)}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                  size="sm"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Start Chat
                </Button>
                <Button variant="outline" size="sm" className="border-white/20 text-white/70 hover:bg-white/10">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button
                onClick={onUpgrade}
                variant="outline"
                className="flex-1 border-dashed border-white/30 text-white/60 hover:bg-white/10"
                size="sm"
              >
                <Lock className="w-4 h-4 mr-2" />
                Upgrade to Unlock
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}