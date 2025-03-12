// Create a new file Globe.tsx
import React from 'react';

export const Globe = ({ isDarkMode = false }) => {
  return (
    <div className="flex items-center justify-center p-8">
      <svg width="200" height="200" viewBox="0 0 200 200">
        {/* Base circle */}
        <circle 
          cx="100" 
          cy="100" 
          r="80" 
          fill="none" 
          stroke={isDarkMode ? "#3b82f6" : "#60a5fa"} 
          strokeWidth="2" 
        />
        
        {/* Longitude lines */}
        {Array.from({ length: 6 }).map((_, i) => (
          <ellipse 
            key={`long-${i}`}
            cx="100" 
            cy="100" 
            rx="80" 
            ry={80 * Math.cos(Math.PI * i / 6)} 
            fill="none" 
            stroke={isDarkMode ? "#3b82f6" : "#60a5fa"} 
            strokeWidth="1" 
            transform={`rotate(${i * 30}, 100, 100)`} 
            opacity="0.7"
          />
        ))}
        
        {/* Latitude lines */}
        {Array.from({ length: 5 }).map((_, i) => (
          <circle 
            key={`lat-${i}`}
            cx="100" 
            cy="100" 
            r={20 + i * 15} 
            fill="none" 
            stroke={isDarkMode ? "#3b82f6" : "#60a5fa"} 
            strokeWidth="1" 
            opacity="0.7"
          />
        ))}
      </svg>
    </div>
  );
};
