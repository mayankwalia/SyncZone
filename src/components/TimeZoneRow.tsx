import React, { useState, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X, Clock, MapPin } from 'lucide-react';
import { TimeZone } from '../types';
import { format, utcToZonedTime } from 'date-fns-tz';

interface TimeZoneRowProps {
  timezone: TimeZone;
  onRemove: () => void;
  selectedTimeBlock?: { start: Date; end: Date };
  isDarkMode?: boolean;
}

export function TimeZoneRow({ timezone, onRemove, selectedTimeBlock, isDarkMode }: TimeZoneRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: timezone.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [timeInZone, setTimeInZone] = useState(() => {
    const zonedTime = utcToZonedTime(new Date(), timezone.name);
    return format(zonedTime, 'HH:mm:ss', { timeZone: timezone.name });
  });

  const [dateInZone, setDateInZone] = useState(() => {
    const zonedTime = utcToZonedTime(new Date(), timezone.name);
    return format(zonedTime, 'EEE, MMM d', { timeZone: timezone.name });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const zonedTime = utcToZonedTime(new Date(), timezone.name);
      setTimeInZone(format(zonedTime, 'HH:mm:ss', { timeZone: timezone.name }));
      setDateInZone(format(zonedTime, 'EEE, MMM d', { timeZone: timezone.name }));
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone.name]);

  const offsetHours = Math.floor(Math.abs(timezone.offset));
  const offsetMinutes = Math.abs(timezone.offset % 1) * 60;
  const offsetString = `${timezone.offset >= 0 ? '+' : '-'}${offsetHours.toString().padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center gap-4 p-4 rounded-lg shadow-md transition-all duration-300 transform hover:shadow-lg ${
        timezone.isSource 
          ? 'border-l-4 border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
          : 'bg-white dark:bg-gray-800'
      }`}
    >
      <button
        className="cursor-grab text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400 transition-colors duration-200"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={20} />
      </button>
      
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-gray-500 dark:text-gray-400" />
              <h3 className="font-medium text-gray-800 dark:text-white">{timezone.name.split('/').pop()?.replace('_', ' ')}</h3>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Clock size={14} className="text-gray-400 dark:text-gray-500" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {timezone.abbreviation} (UTC{offsetString})
              </p>
            </div>
          </div>
          <div className="text-right mt-3 sm:mt-0">
            <p className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {timeInZone}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{dateInZone}</p>
            {selectedTimeBlock && (
              <div className="mt-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full inline-block">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {format(utcToZonedTime(selectedTimeBlock.start, timezone.name), 'HH:mm', { timeZone: timezone.name })} - 
                  {format(utcToZonedTime(selectedTimeBlock.end, timezone.name), 'HH:mm', { timeZone: timezone.name })}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {!timezone.isSource && (
        <button
          onClick={onRemove}
          className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full text-red-500 dark:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          aria-label="Remove timezone"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}