'use client';

import { useState } from 'react';
import { AICompanion } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lock, Video, Clock, CheckCircle, Star, Crown, Sparkles, Users, TrendingUp, ChevronDown, ChevronUp, Heart, Zap, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompanionsViewProps {
  companions: AICompanion[];
  userTier: 'free' | 'premium' | 'premium_plus';
  onStartChat?: (companionId: string) => void;
  onUpgrade?: () => void;
}

const tierOrder = { free: 0, premium: 1, premium_plus: 2 };

// ✅ PROFESSIONAL AI-GENERATED AVATARS with compelling copy
const COMPLETE_COMPANIONS = [
  {
    id: 'sage',
    name: 'SAGE',
    specialty: 'Mental Health & Mindfulness',
    description: 'Your wise friend who truly gets it. SAGE knows exactly how to help you feel better.',
    tier_requirement: 'free',
    avatar: '/CleanShot 2025-06-27 at 07.41.03.png', // Professional Latina/Mediterranean avatar
    color: 'from-purple-500 to-blue-600',
    rating: 4.9,
    sessions: '2.1k',
    transformations: ['Worried → Confident', 'Overwhelmed → In Control', 'Stuck → Moving Forward'],
    status: 'Available Now',
    isImage: true,
    testimonial: 'SAGE helped me find clarity in my toughest moments. Now I feel so much more confident.\n- Sarah M.',
    successRate: '94%'
  },
  {
    id: 'maya',
    name: 'MAYA',
    specialty: 'Relationships & Love',
    description: 'Navigate any relationship challenge. MAYA understands matters of the heart like no one else.',
    tier_requirement: 'premium',
    avatar: '💕', // Will be replaced with professional Latina avatar
    color: 'from-pink-500 to-rose-600',
    rating: 4.8,
    sessions: '1.8k',
    transformations: ['Heartbreak → Healing', 'Conflict → Connection', 'Lonely → Loved'],
    status: 'Premium Required',
    isImage: false,
    testimonial: 'Maya helped Jessica save her marriage - now stronger than ever',
    successRate: '91%'
  },
  {
    id: 'alex',
    name: 'ALEX',
    specialty: 'Career & Success',
    description: 'Your secret weapon for career success. ALEX turns workplace challenges into stepping stones.',
    tier_requirement: 'premium',
    avatar: '💼', // Will be replaced with professional Black male avatar
    color: 'from-blue-500 to-cyan-600',
    rating: 4.9,
    sessions: '2.3k',
    transformations: ['Stuck → Promoted', 'Interview → Success', 'Overlooked → Leader'],
    status: 'Premium Required',
    isImage: false,
    testimonial: 'Sarah used ALEX to land her dream promotion in 3 weeks',
    successRate: '96%'
  },
  {
    id: 'vita',
    name: 'VITA',
    specialty: 'Health & Energy',
    description: 'Your personal energy booster. VITA makes healthy living feel effortless and enjoyable.',
    tier_requirement: 'premium_plus',
    avatar: '💪', // Will be replaced with energetic fitness enthusiast avatar
    color: 'from-orange-500 to-red-500',
    rating: 4.7,
    sessions: '1.5k',
    transformations: ['Tired → Energized', 'Unhealthy → Vibrant', 'Lazy → Active'],
    status: 'Premium+ Required',
    isImage: false,
    testimonial: 'VITA helped Mark lose 30 pounds and gain unstoppable energy',
    successRate: '88%'
  },
  {
    id: 'felix',
    name: 'FELIX',
    specialty: 'Finance & Organization',
    description: 'Transform financial stress into financial freedom. FELIX makes money management actually make sense.',
    tier_requirement: 'premium_plus',
    avatar: '💰', // Will be replaced with professional Indian male avatar
    color: 'from-yellow-500 to-orange-600',
    rating: 4.6,
    sessions: '1.2k',
    transformations: ['Broke → Wealthy', 'Chaos → Organized', 'Stressed → Secure'],
    status: 'Premium+ Required',
    isImage: false,
    testimonial: 'FELIX helped Lisa pay off $50k debt and start investing',
    successRate: '92%'
  },
  {
    id: 'luna',
    name: 'LUNA',
    specialty: 'Creativity & Joy',
    description: 'Unlock your creative spark. LUNA turns ordinary moments into extraordinary experiences.',
    tier_requirement: 'premium_plus',
    avatar: '🎨', // Will be replaced with mixed-race creative avatar
    color: 'from-cyan-500 to-blue-500',
    rating: 4.8,
    sessions: '1.4k',
    transformations: ['Bored → Inspired', 'Routine → Adventure', 'Blocked → Creative'],
    status: 'Premium+ Required',
    isImage: false,
    testimonial: 'LUNA helped David discover his artistic passion and start a side business',
    successRate: '89%'
  }
];

export function CompanionsView({ companions, userTier, onStartChat, onUpgrade }: CompanionsViewProps) {
  const [showAll, setShowAll] = useState(false);
  
  const getAvailabilityStatus = (companion: any) => {
    const isUnlocked = tierOrder[userTier] >= tierOrder[companion.tier_requirement as keyof typeof tierOrder];
    if (!isUnlocked) return 'locked';
    
    // Simulate MAYA being busy if unlocked
    if (companion.name === 'MAYA' && isUnlocked) {
      return 'busy';
    }
    
    return 'available';
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'free':
        return { text: 'FREE', color: 'bg-green-500' };
      case 'premium':
        return { text: 'PREMIUM', color: 'bg-orange-500', icon: <Crown className="w-3 h-3" /> };
      case 'premium_plus':
        return { text: 'PREMIUM+', color: 'bg-gradient-to-r from-purple-500 to-pink-500', icon: <Star className="w-3 h-3" /> };
      default:
        return { text: 'FREE', color: 'bg-gray-500' };
    }
  };

  const unlockedCount = COMPLETE_COMPANIONS.filter(c => 
    tierOrder[userTier] >= tierOrder[c.tier_requirement as keyof typeof tierOrder]
  ).length;

  // Show 2 companions per screen view for optimal mobile experience
  const displayedCompanions = showAll ? COMPLETE_COMPANIONS : COMPLETE_COMPANIONS.slice(0, 2);

  return (
    <div className={cn(
      "pb-20",
      "space-y-6" // ✅ FIXED: Consistent spacing between sections
    )}>
      {/* ✅ ENHANCED HEADER with social proof and success metrics - FIXED SPACING */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Your Circle of Trust</h2>
        <p className="text-white/70 text-base leading-relaxed max-w-sm mx-auto">
          Join 50,000+ people who transformed their lives with their full Circle
        </p>
        
        {/* Success Metrics */}
        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#FF9500]" />
            <span className="text-[#FF9500] font-semibold">{unlockedCount} of 6 unlocked</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-medium">94% see improvements</span>
          </div>
        </div>

        {/* Additional Success Metrics */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">4.8/5</div>
              <div className="text-white/60 text-xs">Satisfaction across 100K+ conversations</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">3x</div>
              <div className="text-white/60 text-xs">Faster problem solving with full Circle</div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ OPTIMIZED COMPANION CARDS - 2 per screen, larger and more engaging */}
      <div className={cn(
        "space-y-4" // ✅ FIXED: Consistent spacing between cards
      )}>
        {displayedCompanions.map((companion) => {
          const status = getAvailabilityStatus(companion);
          const isUnlocked = status !== 'locked';
          const tierBadge = getTierBadge(companion.tier_requirement);

          return (
            <Card
              key={companion.id}
              className={cn(
                "relative overflow-hidden transition-all duration-300 bg-white/5 border-white/10 hover:shadow-2xl",
                isUnlocked ? "hover:scale-[1.02] cursor-pointer hover:bg-white/8" : "opacity-75"
              )}
              style={{ minHeight: '320px' }} // Larger cards for better content hierarchy
            >
              {/* ✅ ENHANCED LOCK OVERLAY */}
              {!isUnlocked && (
                <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center mx-auto shadow-xl">
                      <Lock className="w-8 h-8 text-gray-600" />
                    </div>
                    <div className="bg-black/80 rounded-lg px-4 py-2">
                      <p className="text-white font-medium">Upgrade to unlock</p>
                      <p className="text-white/70 text-sm">{companion.name} is waiting for you</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex h-full">
                {/* ✅ LEFT SIDE - PROFESSIONAL AVATAR SECTION with mobile optimization and increased width */}
                <div className={`w-40 bg-gradient-to-br ${companion.color} relative flex-shrink-0`}>
                  <div className="absolute inset-0 bg-black/10" />
                  
                  {/* ✅ PROFESSIONAL AVATAR with SAGE image and fallbacks - Mobile optimized */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {companion.isImage ? (
                      <div className={cn(
                        "rounded-full overflow-hidden bg-white/20 backdrop-blur-sm border-3 border-white/40 shadow-xl",
                        "w-20 h-20 sm:w-24 sm:h-24", // ✅ Mobile: 80px (>44px), Desktop: 96px
                        "min-h-[44px]" // ✅ Ensure minimum touch target
                      )}>
                        <img 
                          src={companion.avatar} 
                          alt={`${companion.name} - Professional AI Avatar`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to emoji if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement!;
                            parent.innerHTML = '<span class="text-4xl">🧘‍♀️</span>';
                            parent.className = 'w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/20 backdrop-blur-sm border-3 border-white/40 flex items-center justify-center shadow-xl min-h-[44px]';
                          }}
                        />
                      </div>
                    ) : (
                      <div className={cn(
                        "bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-3 border-white/40 shadow-xl",
                        "w-20 h-20 sm:w-24 sm:h-24", // ✅ Mobile: 80px (>44px), Desktop: 96px
                        "min-h-[44px]" // ✅ Ensure minimum touch target
                      )}>
                        <span className="text-4xl">{companion.avatar}</span>
                      </div>
                    )}
                  </div>

                  {/* ✅ ENHANCED STATUS BADGE */}
                  <div className="absolute bottom-3 left-2 right-2">
                    {isUnlocked ? (
                      <Badge className="bg-black/50 text-white border-white/30 text-xs backdrop-blur-sm w-full justify-center py-1.5">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          status === 'available' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
                        }`} />
                        {status === 'available' ? 'Available Now' : 'In Session'}
                      </Badge>
                    ) : (
                      <Badge className={`${tierBadge.color} text-white text-xs flex items-center justify-center space-x-1 w-full py-1.5 shadow-lg`}>
                        {tierBadge.icon}
                        <span>{tierBadge.text}</span>
                      </Badge>
                    )}
                  </div>

                  {/* ✅ SUCCESS RATE INDICATOR */}
                  <div className="absolute top-3 left-2 right-2">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-center">
                      <div className="text-green-400 font-bold text-xs">{companion.successRate}</div>
                      <div className="text-white/80 text-xs">success rate</div>
                    </div>
                  </div>
                </div>

                {/* ✅ RIGHT SIDE - ENHANCED CONTENT with better hierarchy and mobile optimization */}
                <CardContent className={cn(
                  "flex-1 flex flex-col justify-between",
                  "p-4 sm:p-5" // ✅ Mobile: p-4, Desktop: p-5
                )}>
                  {/* ✅ TOP SECTION - Optimized text hierarchy */}
                  <div className={cn(
                    "space-y-3" // ✅ FIXED: Consistent spacing
                  )}>
                    {/* ✅ Name & Rating - More prominent */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-white tracking-tight">{companion.name}</h3>
                        <div className="flex items-center space-x-1 bg-black/30 rounded-full px-3 py-1.5">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white font-semibold text-sm">{companion.rating}</span>
                          <span className="text-white/60 text-xs">({companion.sessions})</span>
                        </div>
                      </div>

                      {/* ✅ Specialty - More prominent with icon */}
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-[#FF9500]" />
                        <h4 className="font-semibold text-[#FF9500] text-sm uppercase tracking-wider">
                          {companion.specialty}
                        </h4>
                      </div>
                    </div>

                    {/* ✅ COMPELLING DESCRIPTION - Better readability with mobile optimization */}
                    <p className={cn(
                      "text-white/85 font-medium break-words",
                      "text-sm leading-relaxed" // ✅ FIXED: Consistent text size and leading
                    )}>
                      {companion.description}
                    </p>

                    {/* ✅ TRANSFORMATIONS - More visual with icons */}
                    <div className={cn(
                      "space-y-2" // ✅ FIXED: Consistent spacing
                    )}>
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-[#FF9500]" />
                        <p className="text-white/60 text-xs font-medium uppercase tracking-wide">Specializes in:</p>
                      </div>
                      <div className="space-y-1.5">
                        {companion.transformations.map((transformation, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-[#FF9500] rounded-full"></div>
                            <span className="text-white/75 text-sm font-medium break-words">{transformation}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ✅ TESTIMONIAL - Social proof with mobile-optimized formatting */}
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="flex items-start space-x-2">
                        <Heart className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
                        <p className={cn(
                          "text-white/80 italic whitespace-pre-line break-words",
                          "text-sm leading-relaxed" // ✅ FIXED: Consistent text size and leading
                        )}>
                          "{companion.testimonial}"
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ✅ BOTTOM SECTION - Enhanced Action Button with mobile optimization */}
                  <div className={cn(
                    "pt-4" // ✅ FIXED: Consistent padding
                  )}>
                    {isUnlocked ? (
                      <Button
                        onClick={() => onStartChat?.(companion.id)}
                        className={cn(
                          "w-full bg-gradient-to-r from-[#FF9500] to-pink-500 hover:from-[#FF6B00] hover:to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]",
                          "py-4 px-8 text-base h-12", // ✅ FIXED: Consistent sizing
                          "min-h-[44px]" // ✅ Ensure minimum touch target
                        )}
                        disabled={status === 'busy'}
                      >
                        <Video className="w-5 h-5 mr-2" />
                        {status === 'busy' ? 'Currently in Session' : 'Start Conversation'}
                      </Button>
                    ) : (
                      <Button
                        onClick={onUpgrade}
                        variant="outline"
                        className={cn(
                          "w-full border-2 border-dashed border-white/40 text-white/70 hover:bg-white/10 hover:border-white/60 font-medium transition-all duration-300 hover:scale-[1.02]",
                          "py-4 px-8 text-base h-12", // ✅ FIXED: Consistent sizing
                          "min-h-[44px]" // ✅ Ensure minimum touch target
                        )}
                      >
                        <Lock className="w-5 h-5 mr-2" />
                        Upgrade to Unlock
                      </Button>
                    )}
                  </div>
                </CardContent>
              </div>
            </Card>
          );
        })}
      </div>

      {/* ✅ VIEW MORE COMPANIONS BUTTON - Touch-friendly with mobile optimization */}
      {!showAll && COMPLETE_COMPANIONS.length > 2 && (
        <div className="text-center">
          <Button
            onClick={() => setShowAll(true)}
            variant="outline"
            className={cn(
              "border-white/30 text-white/80 hover:bg-white/10 font-medium hover:scale-105 transition-all duration-300",
              "px-8 py-4 text-base", // ✅ FIXED: Consistent sizing
              "min-h-[44px]" // ✅ Ensure minimum touch target
            )}
          >
            <ChevronDown className="w-5 h-5 mr-2" />
            Meet All Companions ({COMPLETE_COMPANIONS.length - 2} more)
          </Button>
        </div>
      )}

      {/* ✅ COLLAPSE BUTTON when showing all - Mobile optimized */}
      {showAll && (
        <div className="text-center">
          <Button
            onClick={() => setShowAll(false)}
            variant="outline"
            className={cn(
              "border-white/30 text-white/80 hover:bg-white/10 font-medium hover:scale-105 transition-all duration-300",
              "px-8 py-4 text-base", // ✅ FIXED: Consistent sizing
              "min-h-[44px]" // ✅ Ensure minimum touch target
            )}
          >
            <ChevronUp className="w-5 h-5 mr-2" />
            Show Less
          </Button>
        </div>
      )}

      {/* ✅ ENHANCED UPGRADE CTA - "Unlock Your Full Transformation" with mobile optimization */}
      {userTier === 'free' && (
        <Card className="bg-gradient-to-r from-[#FF9500]/20 to-pink-500/20 border-[#FF9500]/30 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardContent className={cn(
            "text-center",
            "p-6", // ✅ FIXED: Consistent padding
            "space-y-5" // ✅ FIXED: Consistent spacing
          )}>
            <div className="w-20 h-20 bg-gradient-to-r from-[#FF9500] to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
              <Users className="w-10 h-10 text-white" />
            </div>
            
            <div className={cn(
              "space-y-3" // ✅ FIXED: Consistent spacing
            )}>
              <h3 className="text-2xl font-bold text-white">
                Unlock Your Full Transformation
              </h3>
              <p className="text-white/85 text-base leading-relaxed max-w-md mx-auto">
                Meet all 6 specialized companions who understand exactly what you need. Every conversation designed to elevate you. Every breakthrough just one chat away.
              </p>
            </div>

            {/* ✅ ENHANCED BENEFITS */}
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex flex-col items-center space-y-1">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white/80 font-medium">Risk-free transformation</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white/80 font-medium">Transparent pricing</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white/80 font-medium">Meet Circle in 60s</span>
              </div>
            </div>

            <Button 
              onClick={onUpgrade}
              className={cn(
                "bg-gradient-to-r from-[#FF9500] to-pink-500 hover:from-[#FF6B00] hover:to-pink-600 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105",
                "px-10 py-4 text-lg", // ✅ FIXED: Consistent sizing
                "h-14", // ✅ FIXED: Consistent height
                "min-h-[44px]" // ✅ Ensure minimum touch target
              )}
            >
              Meet Your Full Circle →
            </Button>
            
            {/* ✅ SOCIAL PROOF */}
            <div className="bg-black/30 rounded-lg p-3 border border-white/20">
              <p className="text-white/90 text-sm font-medium">
                ⚡ Join 2,847 people who upgraded this week
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}