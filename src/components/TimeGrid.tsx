import React, { useState } from 'react';
import { TimeZone } from '../types';
import { addHours, format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

interface TimeGridProps {
  timezones: TimeZone[];
  onTimeBlockSelect: (start: Date, end: Date) => void;
}

export function TimeGrid({ timezones, onTimeBlockSelect }: TimeGridProps) {
  const [dragStart, setDragStart] = useState<Date | null>(null);
  const [hoveredHour, setHoveredHour] = useState<Date | null>(null);

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
      const start = dragStart < hour ? dragStart : hour;
      const end = dragStart < hour ? hour : dragStart;
      onTimeBlockSelect(start, end);
      setDragStart(null);
    }
  };

  return (
    <div className="w-full">
      <div className="min-w-[800px]">
        {timezones.map((timezone) => (
          <div
            key={timezone.id}
            className="grid grid-cols-24 gap-1 mb-4 relative"
          >
            <div className="absolute -left-64 top-1/2 transform -translate-y-1/2 w-28 pr-4">
              <p className="font-medium">{timezone.name}</p>
              <p className="text-sm text-gray-500">{timezone.abbreviation}</p>
            </div>
            
            {hours.map((hour) => {
              const timeInZone = formatInTimeZone(hour, timezone.name, 'HH:mm');
              const isSelected = dragStart && hoveredHour && (
                (hour >= dragStart && hour <= hoveredHour) ||
                (hour <= dragStart && hour >= hoveredHour)
              );

              return (
                <div
                  key={hour.getTime()}
                  className={`h-12 border rounded flex items-center justify-center ${
                    isSelected ? 'bg-blue-100' : 'hover:bg-gray-50'
                  }`}
                  onMouseDown={() => handleMouseDown(hour)}
                  onMouseUp={() => handleMouseUp(hour)}
                  onMouseEnter={() => setHoveredHour(hour)}
                >
                  <span className="text-sm">{timeInZone}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}