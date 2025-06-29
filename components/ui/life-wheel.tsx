'use client';

import React from 'react';
import { LifeWheelScores, LifeAreaDetail } from '@/lib/types';

interface LifeWheelProps {
  scores: LifeWheelScores;
  size?: number;
  darkMode?: boolean;
  showLabels?: boolean;
  onAreaClick?: (areaDetail: LifeAreaDetail) => void;
  className?: string;
  onScoreUpdate?: (scores: LifeWheelScores) => void;
  interactive?: boolean;
}

const LIFE_AREAS = [
  { 
    key: 'mental_health' as keyof LifeWheelScores, 
    name: 'Mental Health', 
    emoji: '🧠', 
    color: '#8B5CF6',
    shortName: 'Mental'
  },
  { 
    key: 'relationships' as keyof LifeWheelScores, 
    name: 'Relationships', 
    emoji: '💕', 
    color: '#EC4899',
    shortName: 'Love'
  },
  { 
    key: 'career' as keyof LifeWheelScores, 
    name: 'Career', 
    emoji: '💼', 
    color: '#3B82F6',
    shortName: 'Career'
  },
  { 
    key: 'health' as keyof LifeWheelScores, 
    name: 'Health', 
    emoji: '💪', 
    color: '#10B981',
    shortName: 'Health'
  },
  { 
    key: 'finance' as keyof LifeWheelScores, 
    name: 'Finance', 
    emoji: '💰', 
    color: '#F59E0B',
    shortName: 'Finance'
  },
  { 
    key: 'creativity' as keyof LifeWheelScores, 
    name: 'Creativity', 
    emoji: '🎨', 
    color: '#06B6D4',
    shortName: 'Creative'
  }
];

export function LifeWheel({ 
  scores, 
  size = 400, 
  darkMode = false, 
  showLabels = true, 
  onAreaClick, 
  className = '',
  onScoreUpdate,
  interactive = false
}: LifeWheelProps) {
  // ✅ RESPONSIVE: Adjust size and spacing based on screen size
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const responsiveSize = isMobile ? Math.min(size, 320) : size;
  const center = responsiveSize / 2;
  const radius = responsiveSize * 0.35; // Reduced from 0.4 to give more space for labels
  const innerRadius = responsiveSize * 0.15;
  
  // ✅ RESPONSIVE: Dynamic spacing and font sizes
  const labelRadius = responsiveSize * 0.48; // Distance from center for labels
  const emojiSize = isMobile ? '20px' : '24px';
  const textSize = isMobile ? '11px' : '13px';
  const padding = responsiveSize * 0.1; // Padding around the entire component
  
  // ✅ ENHANCED: Better viewBox calculation with padding
  const viewBoxSize = responsiveSize + (padding * 2);
  const viewBoxOffset = -padding;

  const createPath = (startAngle: number, endAngle: number, value: number) => {
    const maxRadius = radius;
    const currentRadius = innerRadius + (maxRadius - innerRadius) * (value / 10);
    
    const startAngleRad = (startAngle - 90) * Math.PI / 180;
    const endAngleRad = (endAngle - 90) * Math.PI / 180;
    
    const x1 = center + innerRadius * Math.cos(startAngleRad);
    const y1 = center + innerRadius * Math.sin(startAngleRad);
    const x2 = center + currentRadius * Math.cos(startAngleRad);
    const y2 = center + currentRadius * Math.sin(startAngleRad);
    
    const x3 = center + currentRadius * Math.cos(endAngleRad);
    const y3 = center + currentRadius * Math.sin(endAngleRad);
    const x4 = center + innerRadius * Math.cos(endAngleRad);
    const y4 = center + innerRadius * Math.sin(endAngleRad);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return `M ${x1} ${y1} L ${x2} ${y2} A ${currentRadius} ${currentRadius} 0 ${largeArcFlag} 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1} ${y1}`;
  };

  const handleAreaClick = (area: typeof LIFE_AREAS[0]) => {
    if (onAreaClick) {
      const areaDetail: LifeAreaDetail = {
        area: area.key,
        currentScore: scores[area.key],
        previousScore: scores[area.key] - 0.5,
        trend: 'up',
        recommendations: [`Improve your ${area.name.toLowerCase()}`],
        relatedCompanion: 'SAGE',
        weeklyProgress: [3, 3.5, 4, 4.2, 4.5, 4.8, scores[area.key]],
        insights: `Your ${area.name.toLowerCase()} is progressing well.`,
        changeAmount: 0.5
      };
      onAreaClick(areaDetail);
    }
  };

  // ✅ ENHANCED: Better label positioning calculation
  const getLabelPosition = (index: number) => {
    const angle = (index * 60 - 90) * Math.PI / 180; // 60 degrees per section, -90 to start at top
    const x = center + labelRadius * Math.cos(angle);
    const y = center + labelRadius * Math.sin(angle);
    
    // ✅ RESPONSIVE: Adjust text anchor based on position to prevent overflow
    let textAnchor: 'start' | 'middle' | 'end' = 'middle';
    if (x < center * 0.3) textAnchor = 'start';
    else if (x > center * 1.7) textAnchor = 'end';
    
    return { x, y, textAnchor };
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg
        width={responsiveSize}
        height={responsiveSize}
        viewBox={`${viewBoxOffset} ${viewBoxOffset} ${viewBoxSize} ${viewBoxSize}`}
        className="overflow-visible" // ✅ CRITICAL: Allow labels to extend beyond SVG bounds
        style={{ 
          maxWidth: '100%', 
          height: 'auto',
          // ✅ ENHANCED: Ensure sufficient space around the wheel
          padding: `${padding}px`
        }}
      >
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={darkMode ? '#374151' : '#E5E7EB'}
          strokeWidth="1"
          opacity="0.3"
        />
        
        {/* Inner circle */}
        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          fill={darkMode ? '#1F2937' : '#F9FAFB'}
          stroke={darkMode ? '#4B5563' : '#D1D5DB'}
          strokeWidth="1"
        />
        
        {/* Life area segments */}
        {LIFE_AREAS.map((area, index) => {
          const startAngle = index * 60;
          const endAngle = (index + 1) * 60;
          const score = scores[area.key] || 0;
          
          return (
            <g key={area.key}>
              <path
                d={createPath(startAngle, endAngle, score)}
                fill={area.color}
                opacity="0.8"
                stroke={darkMode ? '#1F2937' : '#FFFFFF'}
                strokeWidth="2"
                className={onAreaClick ? 'cursor-pointer hover:opacity-100 transition-opacity' : ''}
                onClick={() => handleAreaClick(area)}
              />
            </g>
          );
        })}
        
        {/* Center score display */}
        <g>
          <text
            x={center}
            y={center - 8}
            textAnchor="middle"
            className="fill-current"
            style={{
              fontSize: isMobile ? '24px' : '28px',
              fontWeight: 'bold',
              fill: darkMode ? '#FFFFFF' : '#1F2937'
            }}
          >
            {(Object.values(scores).reduce((a, b) => a + b, 0) / 6).toFixed(1)}
          </text>
          <text
            x={center}
            y={center + 12}
            textAnchor="middle"
            className="fill-current"
            style={{
              fontSize: isMobile ? '12px' : '14px',
              fill: darkMode ? '#9CA3AF' : '#6B7280'
            }}
          >
            Overall
          </text>
        </g>
        
        {/* ✅ ENHANCED: Responsive labels with better positioning */}
        {showLabels && LIFE_AREAS.map((area, index) => {
          const { x, y, textAnchor } = getLabelPosition(index);
          const score = scores[area.key] || 0;
          
          return (
            <g key={`label-${area.key}`} className={onAreaClick ? 'cursor-pointer' : ''} onClick={() => handleAreaClick(area)}>
              {/* ✅ ENHANCED: Background circle for better readability */}
              <circle
                cx={x}
                cy={y - 8}
                r={isMobile ? '16' : '18'}
                fill={darkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.9)'}
                stroke={area.color}
                strokeWidth="2"
                opacity="0.9"
              />
              
              {/* Emoji */}
              <text
                x={x}
                y={y - 4}
                textAnchor="middle"
                style={{
                  fontSize: emojiSize,
                  dominantBaseline: 'middle'
                }}
              >
                {area.emoji}
              </text>
              
              {/* ✅ RESPONSIVE: Area name with better positioning */}
              <text
                x={x}
                y={y + 16}
                textAnchor={textAnchor}
                className="fill-current font-medium"
                style={{
                  fontSize: textSize,
                  fill: darkMode ? '#FFFFFF' : '#1F2937',
                  dominantBaseline: 'middle'
                }}
              >
                {isMobile ? area.shortName : area.name}
              </text>
              
              {/* Score display */}
              <text
                x={x}
                y={y + 30}
                textAnchor={textAnchor}
                className="fill-current font-bold"
                style={{
                  fontSize: isMobile ? '11px' : '12px',
                  fill: area.color
                }}
              >
                {score.toFixed(1)}
              </text>
            </g>
          );
        })}
      </svg>
      
      {/* ✅ ENHANCED: Responsive legend for mobile if needed */}
      {isMobile && showLabels && (
        <div className="mt-4 grid grid-cols-3 gap-2 w-full max-w-sm">
          {LIFE_AREAS.map((area) => (
            <div 
              key={`mobile-legend-${area.key}`}
              className="flex items-center space-x-1 text-xs"
              onClick={() => handleAreaClick(area)}
            >
              <span style={{ color: area.color }}>●</span>
              <span className={darkMode ? 'text-white' : 'text-gray-700'}>
                {area.shortName}
              </span>
              <span className="font-bold" style={{ color: area.color }}>
                {(scores[area.key] || 0).toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}