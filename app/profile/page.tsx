'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Crown, Star, CreditCard, LogOut, Calendar, Bell, Smartphone, Shield, Download, FileText, HelpCircle, MessageSquare, Edit, Globe, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { TopNavigation } from '@/components/ui/top-navigation';
import { BottomNav } from '@/components/navigation/bottom-nav';
import { BoltBadge } from '@/components/layout/bolt-badge';
import { UserProfile } from '@/lib/types';
import { STORAGE_KEYS, getFromStorage, clearAllUserData } from '@/lib/storage';
import { Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  // Settings state
  const [pushNotifications, setPushNotifications] = useState(true);
  const [proactiveSuggestions, setProactiveSuggestions] = useState(true);
  const [calendarSync, setCalendarSync] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);

  // ✅ SIMPLIFIED: Load user profile from localStorage only
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const savedUserProfile = getFromStorage(STORAGE_KEYS.USER_PROFILE);

        console.log('🔍 Loading user profile...', { savedUserProfile });

        if (!savedUserProfile) {
          // User profile not found, redirect to home
          console.log('❌ User profile not found, redirecting to home...');
          router.push('/');
          return;
        }

        // User profile found, set it
        setUserProfile(savedUserProfile);
        console.log('✅ User profile loaded successfully');
      } catch (error) {
        console.error('Error loading user profile:', error);
        // On error, redirect to home
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, [router]);

  // ✅ SIMPLIFIED: Handle logout with localStorage cleanup only
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      console.log('🚪 Logging out user from profile page...');
      
      // Clear all user data from localStorage
      clearAllUserData();
      
      // Clear local state
      setUserProfile(null);
      
      // Redirect to home page (which will show landing page)
      router.push('/');
      
      console.log('✅ Logout completed successfully!');
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if there's an error, still redirect to home
      router.push('/');
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Handle tab changes with proper navigation to main app
  const handleTabChange = (tab: string) => {
    if (tab !== 'profile') {
      // Navigate back to main app with the selected tab as a query parameter
      router.push(`/?tab=${tab}`);
    }
  };

  const getTierInfo = () => {
    if (!userProfile) return { name: 'Loading...', icon: null, color: 'bg-gray-600', description: '' };
    
    switch (userProfile.subscription_tier) {
      case 'free':
        return {
          name: 'Life Sampler',
          icon: null,
          color: 'bg-gray-600',
          description: 'Access to SAGE companion'
        };
      case 'premium':
        return {
          name: 'Life Council',
          icon: <Crown className="w-4 h-4" />,
          color: 'bg-orange-500',
          description: '3 companions + HD video'
        };
      case 'premium_plus':
        return {
          name: 'Full Balance Council',
          icon: <Star className="w-4 h-4" />,
          color: 'bg-gradient-to-r from-orange-500 to-pink-500',
          description: 'All 6 companions + unlimited'
        };
    }
  };

  const handleStartTrial = () => {
    console.log('Starting 7-day trial...');
    // In real app, this would trigger trial activation
  };

  const handleUpgrade = () => {
    console.log('Opening upgrade modal...');
    // In real app, this would open pricing modal
  };

  // Get first name from user profile
  const getFirstName = (): string | undefined => {
    return userProfile?.full_name?.split(' ')[0] || undefined;
  };

  // Show loading screen while checking user profile
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#FF9500]" />
          <p className="text-white/60">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // If no user profile, don't render anything (redirect is happening)
  if (!userProfile) {
    return null;
  }

  const tierInfo = getTierInfo();
  const averageLifeBalance = userProfile.life_wheel_scores 
    ? Object.values(userProfile.life_wheel_scores).reduce((a, b) => a + b, 0) / 6
    : 0;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Header */}
        <TopNavigation 
          title="Profile"
          subtitle="Manage your account and preferences"
          firstName={getFirstName()}
          showProfileIcon={false}
          isSticky={false}
          bgColor="bg-[#0F0F23]"
        />
        
        {/* Main Content */}
        <main className="pb-40 pt-8">
          <div className="max-w-md mx-auto px-4 space-y-6">
            
            {/* User Header - Mobile optimized with vertical stack */}
            <Card className="bg-white/5 border-white/10 rounded-lg transition-all duration-300 hover:bg-white/8">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto sm:mx-0 flex-shrink-0">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-semibold text-white">{userProfile.full_name}</h3>
                    <p className="text-white/60 text-sm">{userProfile.email}</p>
                    <div className="flex items-center justify-center sm:justify-start space-x-2 mt-2">
                      <Badge className={`${tierInfo.color} text-white`}>
                        {tierInfo.icon}
                        <span className="ml-1">{tierInfo.name}</span>
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Free Trial Section - Mobile optimized */}
            {userProfile.subscription_tier === 'free' && (
              <Card className="bg-gradient-to-r from-orange-500/20 to-pink-500/20 border-orange-500/30 rounded-lg transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 sm:items-center">
                    <Calendar className="w-6 h-6 text-orange-400 mx-auto sm:mx-0 flex-shrink-0" />
                    <div className="flex-1 text-center sm:text-left">
                      <h4 className="text-white font-semibold">7-Day Free Trial Available</h4>
                      <p className="text-white/80 text-sm">
                        Unlock your full Circle of Trust with premium companions
                      </p>
                    </div>
                    <Button 
                      onClick={handleStartTrial}
                      className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white transition-all duration-300 py-4 px-6 min-h-[44px] rounded-lg"
                    >
                      Start Trial
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Subscription Details - Mobile optimized */}
            <Card className="bg-white/5 border-white/10 rounded-lg transition-all duration-300 hover:bg-white/8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <CreditCard className="w-5 h-5" />
                  <span>Subscription</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">{tierInfo.name}</p>
                    <p className="text-white/60 text-sm">{tierInfo.description}</p>
                  </div>
                  <Badge variant="outline" className="border-white/20 text-white/70">
                    {userProfile.subscription_tier === 'free' ? 'Free' : 'Active'}
                  </Badge>
                </div>

                <Button 
                  onClick={handleUpgrade}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white transition-all duration-300 py-4 px-6 min-h-[44px] rounded-lg"
                >
                  {userProfile.subscription_tier === 'free' ? 'Upgrade Plan' : 'Manage Subscription'}
                </Button>
              </CardContent>
            </Card>

            {/* Account Statistics - Mobile optimized grid */}
            <Card className="bg-white/5 border-white/10 rounded-lg transition-all duration-300 hover:bg-white/8">
              <CardHeader>
                <CardTitle className="text-white">Account Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/5 rounded-lg transition-all duration-300 hover:bg-white/10">
                    <div className="text-2xl font-bold text-white">0</div>
                    <div className="text-white/60 text-sm">Total Sessions</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg transition-all duration-300 hover:bg-white/10">
                    <div className="text-2xl font-bold text-white">0h</div>
                    <div className="text-white/60 text-sm">Time Spent</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg transition-all duration-300 hover:bg-white/10">
                    <div className="text-2xl font-bold text-white">
                      {Math.round(averageLifeBalance * 10) / 10}
                    </div>
                    <div className="text-white/60 text-sm">Life Balance</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg transition-all duration-300 hover:bg-white/10">
                    <div className="text-2xl font-bold text-white">
                      {new Date(userProfile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </div>
                    <div className="text-white/60 text-sm">Member Since</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications - Touch optimized switches */}
            <Card className="bg-white/5 border-white/10 rounded-lg transition-all duration-300 hover:bg-white/8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Bell className="w-5 h-5" />
                  <span>Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between min-h-[44px]">
                  <div className="flex-1 pr-4">
                    <Label className="text-white font-medium">Push Notifications</Label>
                    <p className="text-white/60 text-sm">Get notified about check-ins and reminders</p>
                  </div>
                  <Switch 
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                    className="data-[state=checked]:bg-orange-500 min-w-[44px] min-h-[24px]"
                  />
                </div>
                
                <div className="flex items-center justify-between min-h-[44px]">
                  <div className="flex-1 pr-4">
                    <Label className="text-white font-medium">Proactive Suggestions</Label>
                    <p className="text-white/60 text-sm">AI-powered recommendations based on your schedule</p>
                  </div>
                  <Switch 
                    checked={proactiveSuggestions}
                    onCheckedChange={setProactiveSuggestions}
                    className="data-[state=checked]:bg-orange-500 min-w-[44px] min-h-[24px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Calendar Integration - Touch optimized */}
            <Card className="bg-white/5 border-white/10 rounded-lg transition-all duration-300 hover:bg-white/8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Calendar className="w-5 h-5" />
                  <span>Calendar Integration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between min-h-[44px]">
                  <div className="flex-1 pr-4">
                    <Label className="text-white font-medium">Calendar Sync</Label>
                    <p className="text-white/60 text-sm">Allow BELANCE to access your calendar for proactive support</p>
                  </div>
                  <Switch 
                    checked={calendarSync}
                    onCheckedChange={setCalendarSync}
                    className="data-[state=checked]:bg-orange-500 min-w-[44px] min-h-[24px]"
                  />
                </div>
                
                {calendarSync && (
                  <Button 
                    variant="outline" 
                    className="w-full border-white/20 text-white/70 hover:bg-white/10 transition-all duration-300 py-4 px-6 min-h-[44px] rounded-lg"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Connect Google Calendar
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* App Preferences - Touch optimized */}
            <Card className="bg-white/5 border-white/10 rounded-lg transition-all duration-300 hover:bg-white/8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Smartphone className="w-5 h-5" />
                  <span>App Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between min-h-[44px]">
                  <div className="flex-1 pr-4">
                    <Label className="text-white font-medium">Dark Mode</Label>
                    <p className="text-white/60 text-sm">Use dark theme throughout the app</p>
                  </div>
                  <Switch 
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                    className="data-[state=checked]:bg-orange-500 min-w-[44px] min-h-[24px]"
                  />
                </div>
                
                <div className="flex items-center justify-between min-h-[44px]">
                  <div className="flex-1 pr-4">
                    <Label className="text-white font-medium">Sound Effects</Label>
                    <p className="text-white/60 text-sm">Play sounds for interactions and notifications</p>
                  </div>
                  <Switch 
                    checked={soundEffects}
                    onCheckedChange={setSoundEffects}
                    className="data-[state=checked]:bg-orange-500 min-w-[44px] min-h-[24px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Security - Touch optimized buttons */}
            <Card className="bg-white/5 border-white/10 rounded-lg transition-all duration-300 hover:bg-white/8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Shield className="w-5 h-5" />
                  <span>Privacy & Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full border-white/20 text-white/70 hover:bg-white/10 transition-all duration-300 py-4 px-6 min-h-[44px] rounded-lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download My Data
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-white/20 text-white/70 hover:bg-white/10 transition-all duration-300 py-4 px-6 min-h-[44px] rounded-lg"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Privacy Policy
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-white/20 text-white/70 hover:bg-white/10 transition-all duration-300 py-4 px-6 min-h-[44px] rounded-lg"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Terms of Service
                </Button>
              </CardContent>
            </Card>

            {/* Support - Touch optimized buttons */}
            <Card className="bg-white/5 border-white/10 rounded-lg transition-all duration-300 hover:bg-white/8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <HelpCircle className="w-5 h-5" />
                  <span>Support</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full border-white/20 text-white/70 hover:bg-white/10 transition-all duration-300 py-4 px-6 min-h-[44px] rounded-lg"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-white/20 text-white/70 hover:bg-white/10 transition-all duration-300 py-4 px-6 min-h-[44px] rounded-lg"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Feedback
                </Button>
              </CardContent>
            </Card>

            {/* Account Actions - Touch optimized buttons with loading states */}
            <Card className="bg-white/5 border-white/10 rounded-lg transition-all duration-300 hover:bg-white/8">
              <CardContent className="p-4 sm:p-6 space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full border-white/20 text-white/70 hover:bg-white/10 transition-all duration-300 py-4 px-6 min-h-[44px] rounded-lg"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                
                {/* ENHANCED LOGOUT BUTTON with loading state */}
                <Button 
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  variant="outline" 
                  className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all duration-300 py-4 px-6 min-h-[44px] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
                >
                  {isLoggingOut ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing Out...
                    </>
                  ) : (
                    <>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        
        {/* Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
      
      {/* Fixed positioned Bolt Badge for profile page */}
      <BoltBadge fixedPosition={true} />
    </>
  );
}