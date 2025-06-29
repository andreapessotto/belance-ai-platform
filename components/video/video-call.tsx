'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Mic, MicOff, Phone, Camera, MoreVertical } from 'lucide-react';
import { TavusVideoCall } from './tavus-video-call';

interface VideoCallProps {
  companionName?: string;
  companionSpecialty?: string;
  onBack?: () => void;
  onEndCall?: () => void;
  useTavus?: boolean; // Flag to enable Tavus integration
}

export const VideoCall: React.FC<VideoCallProps> = ({ 
  companionName = 'SAGE', 
  companionSpecialty = 'Mental Health & Personal Growth', 
  onBack,
  onEndCall,
  useTavus = false // Default to false for backward compatibility
}) => {
  // If Tavus is enabled, use the Tavus component
  if (useTavus) {
    return (
      <TavusVideoCall
        companionName={companionName}
        companionSpecialty={companionSpecialty}
        onBack={onBack}
        onEndCall={onEndCall}
      />
    );
  }

  // Original mock video call implementation
  const [isLive, setIsLive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(95); // 01:35 in seconds
  const [currentMessage, setCurrentMessage] = useState(
    "Remember, every small step forward is progress. You're building resilience and self-awareness through this journey."
  );

  // Format duration to MM:SS
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Update call duration every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleEndCall = () => {
    if (onEndCall) {
      onEndCall();
    } else if (onBack) {
      onBack();
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Video Background - Simulazione dell'avatar video */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
          {/* Placeholder per l'avatar video reale - sostituire con Tavus */}
          <div className="w-full h-full bg-gray-600 flex items-center justify-center text-white">
            <div className="text-center space-y-4">
              <span className="text-6xl">🧘‍♂️</span>
              <p className="text-xl">{companionName} Avatar Video</p>
              <p className="text-sm text-gray-300">Mock Implementation</p>
              <p className="text-xs text-gray-400">Set useTavus=true to enable Tavus integration</p>
            </div>
          </div>
        </div>
      </div>

      {/* Header Controls */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center justify-between px-4 py-4 pt-12">
          <button 
            onClick={onBack}
            className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>

          <div className="flex items-center space-x-4">
            {/* Live Indicator */}
            <div className="flex items-center space-x-2 bg-black/30 rounded-full px-3 py-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-white text-sm font-medium">
                {formatDuration(callDuration)}
              </span>
              <div className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                Live
              </div>
            </div>

            <button className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors">
              <MoreVertical className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Companion Info */}
        <div className="px-4 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">{companionName}</h2>
              <p className="text-gray-200 text-sm">{companionSpecialty}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Message Overlay */}
      {currentMessage && (
        <div className="absolute bottom-32 left-4 right-4 z-10">
          <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <p className="text-white text-base leading-relaxed">
              "{currentMessage}"
            </p>
          </div>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 to-transparent">
        <div className="px-6 pb-8">
          {/* Main Controls */}
          <div className="flex items-center justify-center space-x-8 mb-6">
            {/* Microphone Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`
                w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200
                ${isMuted 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20'
                }
              `}
            >
              {isMuted ? (
                <MicOff className="w-6 h-6 text-white" />
              ) : (
                <Mic className="w-6 h-6 text-white" />
              )}
            </button>

            {/* End Call */}
            <button
              onClick={handleEndCall}
              className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all duration-200 shadow-lg"
            >
              <Phone className="w-7 h-7 text-white transform rotate-[135deg]" />
            </button>

            {/* Camera Toggle */}
            <button className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200">
              <Camera className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Secondary Controls */}
          <div className="flex items-center justify-center space-x-4">
            <button className="bg-purple-500/80 hover:bg-purple-500 backdrop-blur-sm px-6 py-2 rounded-full transition-all duration-200">
              <span className="text-white font-medium">Captions</span>
            </button>

            <button className="bg-slate-700/80 hover:bg-slate-600 backdrop-blur-sm px-6 py-2 rounded-full transition-all duration-200">
              <span className="text-white font-medium">Mirror Mode</span>
            </button>
          </div>
        </div>

        {/* Safe Area - Spazio extra per iPhone e per evitare sovrapposizione con Bolt Badge */}
        <div className="h-16 bg-black/70" />
      </div>
    </div>
  );
};