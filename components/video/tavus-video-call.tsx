'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mic, MicOff, Phone, Camera, MoreVertical, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { getTavusAPI, getCompanionAvatarId, getVoiceSettings } from '@/lib/tavus';

interface TavusVideoCallProps {
  companionName: string;
  companionSpecialty: string;
  onBack?: () => void;
  onEndCall?: () => void;
}

export const TavusVideoCall: React.FC<TavusVideoCallProps> = ({ 
  companionName, 
  companionSpecialty, 
  onBack,
  onEndCall
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'connecting' | 'connected' | 'error'>('idle');
  const [apiStatus, setApiStatus] = useState<'unknown' | 'valid' | 'invalid'>('unknown');
  const [replicaData, setReplicaData] = useState<any>(null);

  const tavusAPI = getTavusAPI();

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isConnected]);

  useEffect(() => {
    const testAPI = async () => {
      setConnectionStatus('testing');
      setError(null);
      
      try {
        const isValid = await tavusAPI.testConnection();
        
        if (isValid) {
          setApiStatus('valid');
          
          const replicaId = getCompanionAvatarId(companionName);
          
          const replica = await tavusAPI.getReplica(replicaId);
          if (replica) {
            setReplicaData(replica);
          }
        } else {
          setApiStatus('invalid');
          setError('Demo mode - Tavus API not configured');
        }
      } catch (err) {
        setApiStatus('invalid');
        setError('Demo mode - Using mock video call');
      } finally {
        setConnectionStatus('idle');
      }
    };

    testAPI();
  }, [companionName, tavusAPI]);

  const startCall = async () => {
    setIsConnecting(true);
    setError(null);
    setConnectionStatus('connecting');

    try {
      // For demo purposes, simulate connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsConnected(true);
      setConnectionStatus('connected');
      setCallDuration(0);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start video call');
      setConnectionStatus('error');
    } finally {
      setIsConnecting(false);
    }
  };

  const endCall = () => {
    setIsConnected(false);
    setConnectionStatus('idle');
    setCallDuration(0);
    if (onEndCall) {
      onEndCall();
    }
  };

  const handleBack = () => {
    if (isConnected) {
      endCall();
    }
    if (onBack) {
      onBack();
    }
  };

  const handleMainButtonClick = () => {
    if (isConnected) {
      endCall();
    } else if (!isConnecting) {
      startCall();
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'bg-green-500';
      case 'connecting': case 'testing': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected': return `Live • ${formatDuration(callDuration)}`;
      case 'connecting': return 'Connecting...';
      case 'testing': return 'Testing API...';
      case 'error': return 'Demo Mode';
      default: return 'Ready';
    }
  };

  const getMainButtonColor = () => {
    if (isConnected) {
      return 'bg-red-500 hover:bg-red-600';
    } else if (isConnecting) {
      return 'bg-gray-500 cursor-not-allowed';
    } else {
      return 'bg-green-500 hover:bg-green-600';
    }
  };

  const getMainButtonIcon = () => {
    if (isConnecting) {
      return <Loader2 className="w-7 h-7 text-white animate-spin" />;
    } else if (isConnected) {
      return <Phone className="w-7 h-7 text-white transform rotate-[135deg]" />;
    } else {
      return <Phone className="w-7 h-7 text-white" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
          {isConnected ? (
            <div className="w-full h-full bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center relative">
              <div className="text-center text-white">
                <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <span className="text-6xl">🧘‍♂️</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{companionName}</h3>
                <p className="text-purple-200 mb-4">{companionSpecialty}</p>
                <div className="space-y-2">
                  <div className="bg-black/30 rounded-full px-4 py-2">
                    <span className="text-sm">✅ Demo Video Call Active</span>
                  </div>
                  <div className="bg-green-900/30 rounded-full px-4 py-2">
                    <span className="text-xs">Hackathon Demo Mode</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-white max-w-md mx-auto p-6">
              {connectionStatus === 'testing' && (
                <div className="space-y-4">
                  <Loader2 className="animate-spin h-12 w-12 mx-auto text-blue-400" />
                  <p>Testing connection...</p>
                </div>
              )}
              
              {connectionStatus === 'connecting' && (
                <div className="space-y-4">
                  <Loader2 className="animate-spin h-12 w-12 mx-auto text-purple-400" />
                  <p>Connecting to {companionName}...</p>
                  <p className="text-sm text-gray-300">Initializing demo...</p>
                </div>
              )}
              
              {connectionStatus === 'idle' && (
                <div className="space-y-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-4xl">🧘‍♂️</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{companionName}</h3>
                    <p className="text-gray-300 mb-4">{companionSpecialty}</p>
                    
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm">Demo Ready</span>
                    </div>

                    <div className="bg-blue-900/30 rounded-lg p-3 mb-4">
                      <p className="text-blue-400 text-sm font-medium">🎬 Hackathon Demo</p>
                      <p className="text-blue-300 text-xs">Simulated AI video conversation</p>
                    </div>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="bg-blue-900/50 border border-blue-500/50 rounded-lg p-4 mt-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    <span className="text-blue-400 font-medium">Demo Mode</span>
                  </div>
                  <p className="text-blue-300 text-sm">Running in hackathon demo mode</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Header Controls */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center justify-between px-4 py-4 pt-12">
          <button 
            onClick={handleBack}
            className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-black/30 rounded-full px-3 py-1">
              <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
              <span className="text-white text-sm font-medium">
                {getStatusText()}
              </span>
            </div>

            <button className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors">
              <MoreVertical className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <div className="px-4 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">{companionName}</h2>
              <p className="text-gray-200 text-sm">{companionSpecialty}</p>
              <p className="text-green-400 text-xs">Demo Mode</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 to-transparent">
        <div className="px-6 pb-8">
          <div className="flex items-center justify-center space-x-8 mb-6">
            <button
              onClick={() => isConnected && setIsMuted(!isMuted)}
              disabled={!isConnected}
              className={`
                w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200
                ${!isConnected 
                  ? 'bg-white/10 border border-white/20 cursor-not-allowed opacity-50' 
                  : isMuted 
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

            <button
              onClick={handleMainButtonClick}
              disabled={isConnecting}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg ${getMainButtonColor()}`}
            >
              {getMainButtonIcon()}
            </button>

            <button 
              onClick={() => isConnected && setIsCameraOn(!isCameraOn)}
              disabled={!isConnected}
              className={`
                w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200
                ${!isConnected 
                  ? 'bg-white/10 border border-white/20 cursor-not-allowed opacity-50' 
                  : !isCameraOn 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20'
                }
              `}
            >
              <Camera className="w-6 h-6 text-white" />
            </button>
          </div>

          {isConnected && (
            <div className="flex items-center justify-center space-x-4">
              <button className="bg-purple-500/80 hover:bg-purple-500 backdrop-blur-sm px-6 py-2 rounded-full transition-all duration-200">
                <span className="text-white font-medium">Demo Mode</span>
              </button>
            </div>
          )}
        </div>

        <div className="h-16 bg-black/70" />
      </div>
    </div>
  );
};