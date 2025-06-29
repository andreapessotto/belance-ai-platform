'use client';

import React, { useState, useEffect } from 'react';
import { LifeWheelScores } from '@/lib/types';

interface LifeWheelPieProps {
  scores: LifeWheelScores;
  size?: number;
  darkMode?: boolean;
  className?: string;
  onScoreUpdate?: (scores: LifeWheelScores) => void;
  interactive?: boolean;
}

const LIFE_AREAS = [
  { 
    key: 'mental_health' as keyof LifeWheelScores, 
    name: 'Mental Health', 
    shortName: 'Mental',
    emoji: '🧠', 
    color: '#8B5CF6',
    angle: 0 
  },
  { 
    key: 'relationships' as keyof LifeWheelScores, 
    name: 'Relationships & Love', 
    shortName: 'Relations',
    emoji: '💕', 
    color: '#EC4899',
    angle: 60 
  },
  { 
    key: 'career' as keyof LifeWheelScores, 
    name: 'Career & Purpose', 
    shortName: 'Career',
    emoji: '💼', 
    color: '#3B82F6',
    angle: 120 
  },
  { 
    key: 'health' as keyof LifeWheelScores, 
    name: 'Health & Wellness', 
    shortName: 'Health',
    emoji: '💪', 
    color: '#10B981',
    angle: 180 
  },
  { 
    key: 'finance' as keyof LifeWheelScores, 
    name: 'Financial Wellbeing', 
    shortName: 'Finance',
    emoji: '💰', 
    color: '#F59E0B',
    angle: 240 
  },
  { 
    key: 'creativity' as keyof LifeWheelScores, 
    name: 'Fun & Recreation', 
    shortName: 'Creative',
    emoji: '🎨', 
    color: '#06B6D4',
    angle: 300 
  }
];

export function LifeWheelPie({ 
  scores, 
  size = 280, 
  darkMode = true, 
  className = '',
  onScoreUpdate,
  interactive = false
}: LifeWheelPieProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [localScores, setLocalScores] = useState<LifeWheelScores>(scores);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setLocalScores(scores);
  }, [scores]);

  // Responsive sizing
  const wheelSize = isMobile ? Math.min(size * 0.8, 240) : size;
  const centerX = wheelSize / 2;
  const centerY = wheelSize / 2;
  const radius = wheelSize * 0.35;
  const labelRadius = wheelSize * 0.48;
  
  // Calculate overall score
  const overallScore = Object.values(localScores).reduce((sum, score) => sum + score, 0) / 6;

  // Create SVG path for each segment
  const createSegmentPath = (startAngle: number, endAngle: number, score: number) => {
    const maxRadius = radius;
    const scoreRadius = (score / 10) * maxRadius;
    
    const startAngleRad = (startAngle - 90) * (Math.PI / 180);
    const endAngleRad = (endAngle - 90) * (Math.PI / 180);
    
    const x1 = centerX + Math.cos(startAngleRad) * scoreRadius;
    const y1 = centerY + Math.sin(startAngleRad) * scoreRadius;
    const x2 = centerX + Math.cos(endAngleRad) * scoreRadius;
    const y2 = centerY + Math.sin(endAngleRad) * scoreRadius;
    
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${scoreRadius} ${scoreRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  // Handle score updates
  const handleScoreChange = (area: keyof LifeWheelScores, newScore: number) => {
    const updatedScores = { ...localScores, [area]: newScore };
    setLocalScores(updatedScores);
    if (onScoreUpdate) {
      onScoreUpdate(updatedScores);
    }
  };

  // Calculate label position
  const getLabelPosition = (angle: number) => {
    const angleRad = (angle - 90) * (Math.PI / 180);
    const x = centerX + Math.cos(angleRad) * labelRadius;
    const y = centerY + Math.sin(angleRad) * labelRadius;
    
    // Determine text anchor based on position
    let textAnchor = 'middle';
    if (x < centerX - 10) textAnchor = 'end';
    else if (x > centerX + 10) textAnchor = 'start';
    
    return { x, y, textAnchor };
  };

  return (
    <div className={`flex flex-col items-center space-y-6 ${className}`}>
      {/* SVG Wheel */}
      <div className="relative overflow-visible">
        <svg 
          width={wheelSize} 
          height={wheelSize} 
          viewBox={`0 0 ${wheelSize} ${wheelSize}`}
          className="overflow-visible"
        >
          {/* Background circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke={darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
            strokeWidth="1"
          />
          
          {/* Grid lines */}
          {[2, 4, 6, 8, 10].map((level) => (
            <circle
              key={level}
              cx={centerX}
              cy={centerY}
              r={(level / 10) * radius}
              fill="none"
              stroke={darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"}
              strokeWidth="1"
            />
          ))}
          
          {/* Segment dividers */}
          {LIFE_AREAS.map((area) => {
            const angleRad = (area.angle - 90) * (Math.PI / 180);
            const x = centerX + Math.cos(angleRad) * radius;
            const y = centerY + Math.sin(angleRad) * radius;
            
            return (
              <line
                key={`divider-${area.key}`}
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke={darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
                strokeWidth="1"
              />
            );
          })}
          
          {/* Score segments */}
          {LIFE_AREAS.map((area, index) => {
            const startAngle = area.angle;
            const endAngle = area.angle + 60;
            const score = localScores[area.key];
            
            return (
              <path
                key={`segment-${area.key}`}
                d={createSegmentPath(startAngle, endAngle, score)}
                fill={area.color}
                opacity={0.8}
                stroke={darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}
                strokeWidth="1"
              />
            );
          })}
          
          {/* Area labels with emojis */}
          {LIFE_AREAS.map((area) => {
            const { x, y, textAnchor } = getLabelPosition(area.angle + 30); // Center of segment
            const displayName = isMobile ? area.shortName : area.name;
            const emojiSize = isMobile ? 16 : 20;
            const fontSize = isMobile ? 10 : 12;
            
            return (
              <g key={`label-${area.key}`}>
                {/* Background circle for emoji */}
                <circle
                  cx={x}
                  cy={y - 8}
                  r={emojiSize}
                  fill={darkMode ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.9)"}
                  stroke={area.color}
                  strokeWidth="2"
                />
                
                {/* Emoji */}
                <text
                  x={x}
                  y={y - 4}
                  textAnchor="middle"
                  fontSize={emojiSize}
                  dominantBaseline="middle"
                >
                  {area.emoji}
                </text>
                
                {/* Area name */}
                <text
                  x={x}
                  y={y + 16}
                  textAnchor={textAnchor}
                  fontSize={fontSize}
                  fontWeight="600"
                  fill={darkMode ? "#ffffff" : "#000000"}
                  dominantBaseline="middle"
                >
                  {displayName}
                </text>
                
                {/* Score display */}
                <text
                  x={x}
                  y={y + 28}
                  textAnchor={textAnchor}
                  fontSize={fontSize - 1}
                  fontWeight="500"
                  fill={area.color}
                  dominantBaseline="middle"
                >
                  {localScores[area.key]}/10
                </text>
              </g>
            );
          })}
          
          {/* Center circle with overall score */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius * 0.3}
            fill={darkMode ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.9)"}
            stroke={darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}
            strokeWidth="2"
          />
          
          <text
            x={centerX}
            y={centerY - 8}
            textAnchor="middle"
            fontSize={isMobile ? 20 : 24}
            fontWeight="bold"
            fill={darkMode ? "#ffffff" : "#000000"}
            dominantBaseline="middle"
          >
            {overallScore.toFixed(1)}
          </text>
          
          <text
            x={centerX}
            y={centerY + 8}
            textAnchor="middle"
            fontSize={isMobile ? 10 : 12}
            fontWeight="500"
            fill={darkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)"}
            dominantBaseline="middle"
          >
            Overall
          </text>
        </svg>
      </div>

      {/* Interactive Sliders (only show if interactive) */}
      {interactive && (
        <div className="w-full max-w-md space-y-4">
          <h3 className={`text-center font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Adjust Your Scores
          </h3>
          
          {LIFE_AREAS.map((area) => (
            <div key={`slider-${area.key}`} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{area.emoji}</span>
                  <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {isMobile ? area.shortName : area.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>0</span>
                  <span className={`text-sm font-bold min-w-[20px] text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {localScores[area.key]}
                  </span>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>10</span>
                </div>
              </div>
              
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={localScores[area.key]}
                  onChange={(e) => handleScoreChange(area.key, parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, ${area.color} 0%, ${area.color} ${localScores[area.key] * 10}%, ${darkMode ? '#374151' : '#e5e7eb'} ${localScores[area.key] * 10}%, ${darkMode ? '#374151' : '#e5e7eb'} 100%)`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile Legend (optional, for very small screens) */}
      {isMobile && !interactive && (
        <div className="grid grid-cols-2 gap-2 w-full max-w-xs text-xs">
          {LIFE_AREAS.map((area) => (
            <div key={`legend-${area.key}`} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: area.color }}
              />
              <span className={darkMode ? 'text-white' : 'text-gray-900'}>
                {area.shortName}: {localScores[area.key]}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}