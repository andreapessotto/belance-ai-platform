'use client';

import React from 'react';
import { Home, Bot, TrendingUp, Settings, User } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/' },
  { id: 'companions', label: 'Companions', icon: Bot, path: '/companions' },
  { id: 'progress', label: 'Progress', icon: TrendingUp, path: '/progress' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
];

export const BottomNavigation: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const getActiveTab = () => {
    if (pathname === '/') return 'dashboard';
    if (pathname?.startsWith('/companions')) return 'companions';
    if (pathname?.startsWith('/progress')) return 'progress';
    if (pathname?.startsWith('/settings')) return 'settings';
    if (pathname?.startsWith('/profile')) return 'profile';
    return 'dashboard';
  };

  const activeTab = getActiveTab();

  const handleTabChange = (tabId: string) => {
    const item = navItems.find(item => item.id === tabId);
    if (item) {
      router.push(item.path);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A]/95 backdrop-blur-xl border-t border-gray-800/50 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`
                flex flex-col items-center space-y-1 px-3 py-2 rounded-xl 
                transition-all duration-300 min-w-[60px] relative group
                ${isActive 
                  ? "bg-[#FF9500]/20 text-[#FF9500]" 
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                }
              `}
            >
              {/* Icon Container */}
              <div className={`
                relative p-1 rounded-lg transition-all duration-300
                ${isActive ? "scale-110" : "group-hover:scale-105"}
              `}>
                <Icon className={`
                  w-5 h-5 transition-all duration-300
                  ${isActive ? "stroke-2" : "stroke-1.5"}
                `} />
                
                {/* Active indicator dot */}
                {isActive && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF9500] rounded-full animate-pulse" />
                )}
              </div>
              
              {/* Label */}
              <span className={`
                text-xs font-medium transition-all duration-300
                ${isActive ? "text-[#FF9500] font-semibold" : "text-gray-500 group-hover:text-gray-200"}
              `}>
                {item.label}
              </span>
              
              {/* Active background glow */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-t from-[#FF9500]/10 to-transparent rounded-xl -z-10" />
              )}
              
              {/* Badge for notifications */}
              {item.id === 'companions' && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF9500] rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Bottom safe area for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-[#1A1A1A]/95" />
    </nav>
  );
};