export interface LifeWheelScores {
  mental_health: number;
  relationships: number;
  career: number;
  health: number;
  finance: number;
  creativity: number;
}

export interface LifeAreaDetail {
  area: string;
  currentScore: number;
  previousScore: number;
  trend: 'up' | 'down' | 'stable';
  recommendations: string[];
  relatedCompanion: string;
  weeklyProgress: number[];
  insights: string;
  changeAmount: number;
}

export interface AIRecommendation {
  area: string;
  priority: 'high' | 'medium' | 'low';
  suggestion: string;
  actionItems: string[];
  companionAdvice: string;
  estimatedImpact: string;
  icon: string;
}

export interface AICompanion {
  id: string;
  name: string;
  specialty: string;
  description: string;
  tier_requirement: 'free' | 'premium' | 'premium_plus';
  personality_traits: {
    traits: string[];
    approach: string;
    communication_style: string;
  };
  avatar_config: {
    age_range: string;
    gender: string;
    style: string;
    voice_tone: string;
  };
  sort_order: number;
}

export interface UserSession {
  id: string;
  user_id: string;
  companion_id: string;
  conversation_summary?: string;
  duration: number;
  satisfaction_rating?: number;
  life_area_focus?: string;
  session_metadata: any;
  created_at: string;
}

// ✅ NEW: Feature object interface for structured features
export interface FeatureObject {
  text: string;
  isComingSoon?: boolean;
  lucideIcon?: string;
  description?: string;
}

export interface SubscriptionTier {
  id: 'free' | 'premium' | 'premium_plus';
  name: string;
  price: number;
  annualPrice: number;
  description: string;
  features: (string | FeatureObject)[]; // ✅ UPDATED: Accept both strings and FeatureObjects
  companions_included: string[];
  conversation_limit?: string;
  video_quality: string;
  trialDays: number;
  savings: string;
}

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'free',
    name: 'Life Sampler',
    price: 0,
    annualPrice: 0,
    description: 'Get started with SAGE',
    features: [
      'Access to SAGE companion only',
      '30 minutes total conversation time',
      'Basic Life Wheel assessment',
      'Standard video quality (720p)',
      'Preview of locked companions'
    ],
    companions_included: ['SAGE'],
    conversation_limit: '30 minutes total',
    video_quality: '720p',
    trialDays: 0,
    savings: ''
  },
  {
    id: 'premium',
    name: 'Life Council',
    price: 12.99,
    annualPrice: 129,
    description: 'Expand your support system',
    features: [
      '7 DAYS FREE TRIAL',
      'Access to 3 companions (SAGE + MAYA + ALEX)',
      '2 hours conversation per week',
      'Proactive check-ins via calendar integration',
      'HD video quality (1080p)',
      'Life Wheel analytics (monthly)',
      'Cross-companion memory system',
      'Mirror Mode for conversation practice'
    ],
    companions_included: ['SAGE', 'MAYA', 'ALEX'],
    conversation_limit: '2 hours per week',
    video_quality: '1080p',
    trialDays: 7,
    savings: 'Save 17%'
  },
  {
    id: 'premium_plus',
    name: 'Full Balance Council',
    price: 24.99,
    annualPrice: 249,
    description: 'Complete life transformation',
    features: [
      '7 DAYS FREE TRIAL',
      'Access to all 6 companions',
      'Unlimited conversations',
      'Advanced Life Wheel analytics (weekly)',
      'Health app integration',
      'Custom companion personality adjustments',
      'Export conversation insights',
      'Premium video quality (4K when available)',
      'Early access to new companions',
      // ✅ NEW: Human Expert Sessions feature with FeatureObject structure
      {
        text: 'Human Expert Sessions',
        isComingSoon: true,
        lucideIcon: 'Target',
        description: 'Book 1-on-1 video calls with certified life coaches and wellness professionals'
      }
    ],
    companions_included: ['SAGE', 'MAYA', 'ALEX', 'VITA', 'FELIX', 'LUNA'],
    conversation_limit: 'Unlimited',
    video_quality: '4K',
    trialDays: 7,
    savings: 'Save 17%'
  }
];

// User profile interface
export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  subscription_tier: 'free' | 'premium' | 'premium_plus';
  onboarding_completed: boolean;
  life_wheel_scores?: LifeWheelScores;
  preferences?: {
    age?: string;
    country?: string;
    language?: string;
    interests?: string[];
    goals?: string[];
    calendarEnabled?: boolean;
    communicationStyle?: string[];
    challenges?: string[];
  };
  created_at: string;
  updated_at: string;
}

// Personalization data interface
export interface PersonalizationData {
  firstName: string;
  age: string;
  country: string;
  language: string;
  interests: string[];
  lifeWheelScores: LifeWheelScores;
  goals: string[];
  calendarEnabled: boolean;
  communicationStyle: string[];
  challenges: string[];
}

// Trial status interface
export interface TrialStatus {
  isActive: boolean;
  startDate: Date;
  daysRemaining: number;
  tierTrialing: 'premium' | 'premium_plus';
}

// Calendar event interface
export interface CalendarEvent {
  id: string;
  user_id: string;
  event_type: string;
  event_data: any;
  reminder_sent: boolean;
  scheduled_at?: string;
  created_at: string;
}

// Companion memory interface
export interface CompanionNote {
  id: string;
  user_id: string;
  from_companion_id: string;
  to_companion_id: string;
  note_content: string;
  priority: 'low' | 'medium' | 'high';
  created_at: string;
}

// Life area mapping
export const LIFE_AREAS = {
  mental_health: {
    name: 'Mental Health',
    color: '#8B5CF6',
    companion: 'SAGE',
    icon: '🧠'
  },
  career: {
    name: 'Career',
    color: '#3B82F6',
    companion: 'ALEX',
    icon: '💼'
  },
  finance: {
    name: 'Finance',
    color: '#F59E0B',
    companion: 'FELIX',
    icon: '💰'
  },
  relationships: {
    name: 'Relationships',
    color: '#EC4899',
    companion: 'MAYA',
    icon: '💕'
  },
  health: {
    name: 'Health',
    color: '#10B981',
    companion: 'VITA',
    icon: '🏃'
  },
  creativity: {
    name: 'Creativity',
    color: '#06B6D4',
    companion: 'LUNA',
    icon: '🎨'
  }
};