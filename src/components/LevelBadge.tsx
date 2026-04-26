import React from 'react';

interface LevelBadgeProps {
  level: number;
  progressPercent: number;
  size?: number;
}

export default function LevelBadge({ level, progressPercent, size = 64 }: LevelBadgeProps) {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center p-1 bg-amber-50 rounded-full shadow-sm" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 absolute" width={size} height={size}>
        {/* Background circle */}
        <circle
          className="text-amber-100"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className="text-amber-500 transition-all duration-1000 ease-in-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      
      <div className="absolute flex flex-col items-center justify-center w-full h-full">
        <span className="text-[10px] font-bold text-amber-700 leading-none mb-0.5">LVL</span>
        <span className="text-sm font-black text-amber-600 leading-none">{level}</span>
      </div>
    </div>
  );
}
