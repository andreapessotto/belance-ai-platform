'use client';

import { Bell, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TopNavigationProps {
  title?: string;
  subtitle?: string;
  firstName?: string; // ✅ NEW: Add firstName prop
  showProfileIcon?: boolean;
  isSticky?: boolean;
  bgColor?: string;
}

export function TopNavigation({ 
  title = "Dashboard", 
  subtitle,
  firstName, // ✅ NEW: Accept firstName prop
  showProfileIcon = true,
  isSticky = true,
  bgColor = "bg-[#0F0F23]"
}: TopNavigationProps) {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push('/profile');
  };

  // ✅ NEW: Create personalized greeting
  const getGreeting = () => {
    if (firstName) {
      return `Hi, ${firstName}!`;
    }
    return title;
  };

  return (
    <header className={`
      ${isSticky ? 'sticky top-0' : 'relative'} 
      ${bgColor} 
      border-b border-white/10 z-50 transition-all duration-300
    `}>
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* ✅ UPDATED: Logo changed from "BELANCE" to "BE" and greeting logic */}
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <h1 className="text-xl font-bold">
                <span className="text-[#FF9500]">BE</span>
                {firstName && (
                  <>
                    <span className="text-white/40 mx-2">|</span>
                    <span className="text-white">{getGreeting()}</span>
                  </>
                )}
              </h1>
            </div>
            {!firstName && title && (
              <h2 className="text-2xl font-bold text-white mt-1">{title}</h2>
            )}
            {subtitle && (
              <p className="text-white/60 text-sm mt-1">{subtitle}</p>
            )}
          </div>

          {/* ✅ UPDATED: Removed notification bell, kept only profile icon */}
          <div className="flex items-center space-x-3">
            {showProfileIcon && (
              <button 
                onClick={handleProfileClick}
                className="p-2 rounded-full hover:bg-white/10 transition-colors duration-300 group"
                aria-label="Go to profile"
              >
                <User className="w-6 h-6 text-white/70 group-hover:text-[#FF9500] transition-colors duration-300" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}