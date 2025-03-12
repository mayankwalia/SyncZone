import React, { useState, useEffect } from 'react';
import { TimeZone } from '../types';
import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

interface TimeGridProps {
  timezones: TimeZone[];
  onTimeBlockSelect: (start: Date, end: Date) => void;
  isDarkMode?: boolean;
}

export function TimeGrid({ timezones, onTimeBlockSelect, isDarkMode }: TimeGridProps) {
  const [dragStart, setDragStart] = useState<Date | null>(null);
  const [hoveredHour, setHoveredHour] = useState<Date | null>(null);
  const [currentHour, setCurrentHour] = useState<number>(() => {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    return now.getHours();
  });
  
  // Update current hour every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      now.setMinutes(0, 0, 0);
      setCurrentHour(now.getHours());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const hours = Array.from({ length: 24 }, (_, i) => {
    const date = new Date();
    date.setHours(i, 0, 0, 0);
    return date;
  });

  const handleMouseDown = (hour: Date) => {
    setDragStart(hour);
  };

  const handleMouseUp = (hour: Date) => {
    if (dragStart) {
      const start = dragStart.getTime() < hour.getTime() ? dragStart : hour;
      const end = dragStart.getTime() < hour.getTime() ? hour : dragStart;
      
      // Add one hour to end time to make the selection inclusive
      const endPlusHour = new Date(end);
      endPlusHour.setHours(end.getHours() + 1);
      
      onTimeBlockSelect(start, endPlusHour);
      setDragStart(null);
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px] relative">
        {/* Hour headers */}
        <div className="grid grid-cols-24 gap-px mb-6 pl-32" style={{ gridTemplateColumns: 'repeat(24, minmax(0, 1fr))' }}>
          {hours.map((hour) => (
            <div 
              key={hour.getTime()} 
              className={`text-center text-xs font-medium py-2 ${
                hour.getHours() === currentHour 
                  ? 'text-blue-600 dark:text-blue-400 font-bold' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {format(hour, 'HH:mm')}
            </div>
          ))}
        </div>
        
        {/* Current time indicator */}
        <div 
          className="absolute top-0 bottom-0 w-px bg-blue-500 dark:bg-blue-400 z-10" 
          style={{
            left: `calc(${(currentHour / 24) * 100}% + ${132 - 83 + (currentHour / 24) * 24}px)`,
            boxShadow: '0 0 4px rgba(59, 130, 246, 0.5)'
          }}
        ></div>
        
        {/* Timezone rows */}
        {timezones.map((timezone) => (
          <div
            key={timezone.id}
            className="pl-32 grid grid-cols-24 gap-px mb-4 relative"
            style={{ gridTemplateColumns: 'repeat(24, minmax(0, 1fr))' }}
          >
            <div className="absolute -left-0 top-1/2 transform -translate-y-1/2 w-28 pr-2 flex items-center justify-end">
              <div className="text-right mr-3">
                <p className="font-medium text-gray-700 dark:text-gray-300 text-sm truncate max-w-[120px]">
                  {timezone.name.split('/').pop()?.replace('_', ' ')}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{timezone.abbreviation}</p>
              </div>
            </div>
            
            {hours.map((hour) => {
              const timeInZone = formatInTimeZone(hour, timezone.name, 'HH:mm');
              const isSelected = dragStart && hoveredHour && (
                (hour.getTime() >= dragStart.getTime() && hour.getTime() <= hoveredHour.getTime()) ||
                (hour.getTime() <= dragStart.getTime() && hour.getTime() >= hoveredHour.getTime())
              );
              const isCurrentHour = hour.getHours() === currentHour;

              return (
                <div
                  key={hour.getTime()}
                  className={`h-12 border dark:border-gray-700 rounded transition-all duration-150 flex items-center justify-center ${
                    isSelected 
                      ? 'bg-blue-100 dark:bg-blue-900/40 border-blue-300 dark:border-blue-700' 
                      : isCurrentHour
                        ? 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'
                  }`}
                  onMouseDown={() => handleMouseDown(hour)}
                  onMouseUp={() => handleMouseUp(hour)}
                  onMouseEnter={() => setHoveredHour(hour)}
                >
                  <span className={`text-sm ${
                    isSelected 
                      ? 'text-blue-700 dark:text-blue-300 font-medium' 
                      : isCurrentHour
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-300'
                  }`}>{timeInZone}</span>
                </div>
              );
            })}
          </div>
        ))}
        
        {/* Instructions */}
        {timezones.length > 0 && (
          <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
            Click and drag to select a time block across hours
          </div>
        )}
      </div>
    </div>
  );
}