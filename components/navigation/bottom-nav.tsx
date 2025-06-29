'use client';

import { useState } from 'react';
import { Home, MessageCircle, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Today', icon: Home },
  { id: 'companions', label: 'Chat Now', icon: MessageCircle },
  { id: 'progress', label: 'Progress', icon: TrendingUp },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0F0F23]/95 backdrop-blur-xl border-t border-gray-800/50 px-4 py-2 z-40">
      <div className="flex justify-center items-center max-w-md mx-auto gap-x-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all duration-300 min-w-[60px] relative group",
                isActive 
                  ? "bg-[#FF9500]/20 text-[#FF9500]" 
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
              )}
            >
              {/* Icon Container */}
              <div className={cn(
                "relative p-1 rounded-lg transition-all duration-300",
                isActive ? "scale-110" : "group-hover:scale-105"
              )}>
                <Icon className={cn(
                  "w-5 h-5 transition-all duration-300",
                  isActive ? "stroke-2" : "stroke-1.5"
                )} />
              </div>
              
              {/* Label */}
              <span className={cn(
                "text-xs font-medium transition-all duration-300",
                isActive ? "text-[#FF9500] font-semibold" : "text-gray-500 group-hover:text-gray-200"
              )}>
                {item.label}
              </span>
              
              {/* Active background glow */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-t from-[#FF9500]/10 to-transparent rounded-xl -z-10" />
              )}
            </button>
          );
        })}
      </div>
      
      {/* Bottom safe area for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-[#0F0F23]/95" />
      
      {/* Spazio extra per evitare sovrapposizione con il badge Bolt */}
      <div className="h-2" />
    </nav>
  );
}