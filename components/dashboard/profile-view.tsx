'use client';

import { UserProfile } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { User, Crown, Star, CreditCard, LogOut, Calendar, Bell, Smartphone, Shield, Download, FileText, HelpCircle, MessageSquare, Edit, Globe, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileViewProps {
  userProfile: UserProfile;
  onUpgrade?: () => void;
  onLogout?: () => void;
}

export function ProfileView({ userProfile, onUpgrade, onLogout }: ProfileViewProps) {
  const getTierInfo = () => {
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

  const tierInfo = getTierInfo();

  // Mock trial data - in real app this would come from backend
  const mockTrialData = {
    isActive: userProfile.subscription_tier === 'free',
    daysRemaining: 7,
    tierTrialing: 'premium' as const
  };

  return (
    <div className={cn(
      "pb-20",
      "space-y-4 sm:space-y-6" // ✅ Mobile: gap-4, Desktop: gap-6
    )}>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Profile</h2>
        <p className="text-white/60">Manage your account and subscription</p>
      </div>

      {/* ✅ 1. User Info - Mobile optimized header */}
      <Card className="bg-white/5 border-white/10 rounded-lg">
        <CardContent className={cn(
          "p-4 sm:p-6" // ✅ Mobile: p-4, Desktop: p-6
        )}>
          <div className={cn(
            "flex items-center space-x-4",
            "flex-col space-y-4 space-x-0 sm:flex-row sm:space-y-0 sm:space-x-4" // ✅ Mobile: stack vertically, Desktop: horizontal
          )}>
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className={cn(
              "flex-1",
              "text-center sm:text-left" // ✅ Mobile: center text, Desktop: left align
            )}>
              <h3 className="text-xl font-semibold text-white">{userProfile.full_name}</h3>
              <p className="text-white/60">{userProfile.email}</p>
              <div className={cn(
                "flex items-center space-x-2 mt-2",
                "justify-center sm:justify-start" // ✅ Mobile: center badge, Desktop: left align
              )}>
                <Badge className={`${tierInfo.color} text-white`}>
                  {tierInfo.icon}
                  <span className="ml-1">{tierInfo.name}</span>
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ✅ 2. Trial Status (if applicable) - Mobile optimized */}
      {mockTrialData.isActive && (
        <Card className="bg-gradient-to-r from-orange-500/20 to-pink-500/20 border-orange-500/30 rounded-lg">
          <CardContent className={cn(
            "p-4 sm:p-6" // ✅ Mobile: p-4, Desktop: p-6
          )}>
            <div className={cn(
              "flex items-center space-x-3",
              "flex-col space-y-3 space-x-0 sm:flex-row sm:space-y-0 sm:space-x-3" // ✅ Mobile: stack vertically, Desktop: horizontal
            )}>
              <Calendar className="w-6 h-6 text-orange-400" />
              <div className={cn(
                "flex-1",
                "text-center sm:text-left" // ✅ Mobile: center text, Desktop: left align
              )}>
                <h4 className="text-white font-semibold">Free Trial Available</h4>
                <p className="text-white/80 text-sm">
                  Start your 7-day free trial of {tierInfo.name} today
                </p>
              </div>
              <Button 
                onClick={onUpgrade}
                className={cn(
                  "bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white transition-all duration-300",
                  "w-full sm:w-auto", // ✅ Mobile: full width, Desktop: auto width
                  "py-4 px-6", // ✅ Touch-friendly padding
                  "min-h-[44px]" // ✅ Minimum touch target
                )}
              >
                Start Trial
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ✅ 3. Subscription Details - Mobile optimized */}
      <Card className="bg-white/5 border-white/10 rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <CreditCard className="w-5 h-5" />
            <span>Subscription</span>
          </CardTitle>
        </CardHeader>
        <CardContent className={cn(
          "space-y-3 sm:space-y-4" // ✅ Mobile: gap-3, Desktop: gap-4
        )}>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white font-medium">{tierInfo.name}</p>
              <p className="text-white/60 text-sm">{tierInfo.description}</p>
            </div>
            <Badge variant="outline" className="border-white/20 text-white/70">
              {userProfile.subscription_tier === 'free' ? 'Free' : 'Active'}
            </Badge>
          </div>

          {userProfile.subscription_tier === 'free' ? (
            <Button 
              onClick={onUpgrade}
              className={cn(
                "w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white transition-all duration-300",
                "py-4 px-6", // ✅ Touch-friendly padding
                "min-h-[44px]" // ✅ Minimum touch target
              )}
            >
              Upgrade Plan
            </Button>
          ) : (
            <div className={cn(
              "space-y-2 sm:space-y-3" // ✅ Mobile: gap-2, Desktop: gap-3
            )}>
              <Button 
                variant="outline" 
                className={cn(
                  "w-full border-white/20 text-white/70 hover:bg-white/10 transition-all duration-300",
                  "py-4 px-6", // ✅ Touch-friendly padding
                  "min-h-[44px]" // ✅ Minimum touch target
                )}
              >
                Manage Subscription
              </Button>
              <Button 
                variant="outline" 
                className={cn(
                  "w-full border-white/20 text-white/70 hover:bg-white/10 transition-all duration-300",
                  "py-4 px-6", // ✅ Touch-friendly padding
                  "min-h-[44px]" // ✅ Minimum touch target
                )}
              >
                Billing History
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ✅ 4. Account Stats - Mobile optimized grid */}
      <Card className="bg-white/5 border-white/10 rounded-lg">
        <CardHeader>
          <CardTitle className="text-white">Account Statistics</CardTitle>
        </CardHeader>
        <CardContent className={cn(
          "space-y-3 sm:space-y-4" // ✅ Mobile: gap-3, Desktop: gap-4
        )}>
          <div className={cn(
            "grid gap-4",
            "grid-cols-1 sm:grid-cols-2" // ✅ Mobile: 1x4 grid, Desktop: 2x2 grid
          )}>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-white">0</div>
              <div className="text-white/60 text-sm">Total Sessions</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-white">0h</div>
              <div className="text-white/60 text-sm">Time Spent</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-white">
                {userProfile.life_wheel_scores ? 
                  Math.round(Object.values(userProfile.life_wheel_scores).reduce((a: number, b: number) => a + b, 0) / 6 * 10) / 10 
                  : '0.0'
                }
              </div>
              <div className="text-white/60 text-sm">Life Balance</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-white">
                {new Date(userProfile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </div>
              <div className="text-white/60 text-sm">Member Since</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ✅ 5. Notifications - Touch optimized switches */}
      <Card className="bg-white/5 border-white/10 rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className={cn(
          "space-y-4 sm:space-y-6" // ✅ Mobile: gap-4, Desktop: gap-6
        )}>
          <div className={cn(
            "flex items-center justify-between",
            "min-h-[44px]" // ✅ Minimum touch target height
          )}>
            <div className="flex-1 pr-4">
              <Label className="text-white">Push Notifications</Label>
              <p className="text-white/60 text-sm">Get notified about check-ins and reminders</p>
            </div>
            <Switch 
              defaultChecked
              className="data-[state=checked]:bg-orange-500"
            />
          </div>
          
          <div className={cn(
            "flex items-center justify-between",
            "min-h-[44px]" // ✅ Minimum touch target height
          )}>
            <div className="flex-1 pr-4">
              <Label className="text-white">Proactive Suggestions</Label>
              <p className="text-white/60 text-sm">AI-powered recommendations based on your schedule</p>
            </div>
            <Switch 
              defaultChecked 
              className="data-[state=checked]:bg-orange-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* ✅ 6. Calendar Integration - Touch optimized */}
      <Card className="bg-white/5 border-white/10 rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Calendar className="w-5 h-5" />
            <span>Calendar Integration</span>
          </CardTitle>
        </CardHeader>
        <CardContent className={cn(
          "space-y-4 sm:space-y-6" // ✅ Mobile: gap-4, Desktop: gap-6
        )}>
          <div className={cn(
            "flex items-center justify-between",
            "min-h-[44px]" // ✅ Minimum touch target height
          )}>
            <div className="flex-1 pr-4">
              <Label className="text-white">Calendar Sync</Label>
              <p className="text-white/60 text-sm">Allow BELANCE to access your calendar for proactive support</p>
            </div>
            <Switch className="data-[state=checked]:bg-orange-500" />
          </div>
          
          <Button 
            variant="outline" 
            className={cn(
              "w-full border-white/20 text-white/70 hover:bg-white/10 transition-all duration-300",
              "py-4 px-6", // ✅ Touch-friendly padding
              "min-h-[44px]" // ✅ Minimum touch target
            )}
          >
            <Globe className="w-4 h-4 mr-2" />
            Connect Google Calendar
          </Button>
        </CardContent>
      </Card>

      {/* ✅ 7. App Preferences - Touch optimized */}
      <Card className="bg-white/5 border-white/10 rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Smartphone className="w-5 h-5" />
            <span>App Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className={cn(
          "space-y-4 sm:space-y-6" // ✅ Mobile: gap-4, Desktop: gap-6
        )}>
          <div className={cn(
            "flex items-center justify-between",
            "min-h-[44px]" // ✅ Minimum touch target height
          )}>
            <div className="flex-1 pr-4">
              <Label className="text-white">Dark Mode</Label>
              <p className="text-white/60 text-sm">Use dark theme throughout the app</p>
            </div>
            <Switch 
              defaultChecked 
              className="data-[state=checked]:bg-orange-500"
            />
          </div>
          
          <div className={cn(
            "flex items-center justify-between",
            "min-h-[44px]" // ✅ Minimum touch target height
          )}>
            <div className="flex-1 pr-4">
              <Label className="text-white">Sound Effects</Label>
              <p className="text-white/60 text-sm">Play sounds for interactions and notifications</p>
            </div>
            <Switch 
              defaultChecked 
              className="data-[state=checked]:bg-orange-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* ✅ 8. Privacy & Security - Touch optimized buttons */}
      <Card className="bg-white/5 border-white/10 rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Shield className="w-5 h-5" />
            <span>Privacy & Security</span>
          </CardTitle>
        </CardHeader>
        <CardContent className={cn(
          "space-y-3 sm:space-y-4" // ✅ Mobile: gap-3, Desktop: gap-4
        )}>
          <Button 
            variant="outline" 
            className={cn(
              "w-full border-white/20 text-white/70 hover:bg-white/10 transition-all duration-300 justify-start",
              "py-4 px-6", // ✅ Touch-friendly padding
              "min-h-[44px]" // ✅ Minimum touch target
            )}
          >
            <Download className="w-4 h-4 mr-2" />
            Download My Data
          </Button>
          
          <Button 
            variant="outline" 
            className={cn(
              "w-full border-white/20 text-white/70 hover:bg-white/10 transition-all duration-300 justify-start",
              "py-4 px-6", // ✅ Touch-friendly padding
              "min-h-[44px]" // ✅ Minimum touch target
            )}
          >
            <FileText className="w-4 h-4 mr-2" />
            Privacy Policy
          </Button>
          
          <Button 
            variant="outline" 
            className={cn(
              "w-full border-white/20 text-white/70 hover:bg-white/10 transition-all duration-300 justify-start",
              "py-4 px-6", // ✅ Touch-friendly padding
              "min-h-[44px]" // ✅ Minimum touch target
            )}
          >
            <FileText className="w-4 h-4 mr-2" />
            Terms of Service
          </Button>
        </CardContent>
      </Card>

      {/* ✅ 9. Support - Touch optimized buttons */}
      <Card className="bg-white/5 border-white/10 rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <HelpCircle className="w-5 h-5" />
            <span>Support</span>
          </CardTitle>
        </CardHeader>
        <CardContent className={cn(
          "space-y-3 sm:space-y-4" // ✅ Mobile: gap-3, Desktop: gap-4
        )}>
          <Button 
            variant="outline" 
            className={cn(
              "w-full border-white/20 text-white/70 hover:bg-white/10 transition-all duration-300 justify-start",
              "py-4 px-6", // ✅ Touch-friendly padding
              "min-h-[44px]" // ✅ Minimum touch target
            )}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
          
          <Button 
            variant="outline" 
            className={cn(
              "w-full border-white/20 text-white/70 hover:bg-white/10 transition-all duration-300 justify-start",
              "py-4 px-6", // ✅ Touch-friendly padding
              "min-h-[44px]" // ✅ Minimum touch target
            )}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Send Feedback
          </Button>
        </CardContent>
      </Card>

      {/* ✅ 10. Account Actions - Touch optimized buttons */}
      <Card className="bg-white/5 border-white/10 rounded-lg">
        <CardContent className={cn(
          "p-4 sm:p-6", // ✅ Mobile: p-4, Desktop: p-6
          "space-y-3 sm:space-y-4" // ✅ Mobile: gap-3, Desktop: gap-4
        )}>
          <Button 
            variant="outline" 
            className={cn(
              "w-full border-white/20 text-white/70 hover:bg-white/10 transition-all duration-300 justify-start",
              "py-4 px-6", // ✅ Touch-friendly padding
              "min-h-[44px]" // ✅ Minimum touch target
            )}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
          
          <Button 
            variant="outline" 
            className={cn(
              "w-full border-white/20 text-white/70 hover:bg-white/10 transition-all duration-300 justify-start",
              "py-4 px-6", // ✅ Touch-friendly padding
              "min-h-[44px]" // ✅ Minimum touch target
            )}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          
          <Button 
            onClick={onLogout}
            variant="outline" 
            className={cn(
              "w-full border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all duration-300 justify-start",
              "py-4 px-6", // ✅ Touch-friendly padding
              "min-h-[44px]" // ✅ Minimum touch target
            )}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}