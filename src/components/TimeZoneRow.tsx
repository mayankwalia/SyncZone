import React, { useState, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X } from 'lucide-react';
import { TimeZone } from '../types';
import { format, utcToZonedTime } from 'date-fns-tz';

interface TimeZoneRowProps {
  timezone: TimeZone;
  onRemove: () => void;
  selectedTimeBlock?: { start: Date; end: Date };
}

export function TimeZoneRow({ timezone, onRemove, selectedTimeBlock }: TimeZoneRowProps) {
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

  useEffect(() => {
    const interval = setInterval(() => {
      const zonedTime = utcToZonedTime(new Date(), timezone.name);
      setTimeInZone(format(zonedTime, 'HH:mm:ss', { timeZone: timezone.name }));
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone.name]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-4 p-4 bg-white rounded-lg shadow ${
        timezone.isSource ? 'border-2 border-blue-500' : ''
      }`}
    >
      <button
        className="cursor-grab hover:text-blue-500"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={20} />
      </button>
      
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">{timezone.name}</h3>
            <p className="text-sm text-gray-500">{timezone.abbreviation}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{timeInZone}</p>
            {selectedTimeBlock && (
              <p className="text-sm text-gray-500">
                {format(utcToZonedTime(selectedTimeBlock.start, timezone.name), 'HH:mm', { timeZone: timezone.name })} - 
                {format(utcToZonedTime(selectedTimeBlock.end, timezone.name), 'HH:mm', { timeZone: timezone.name })}
              </p>
            )}
          </div>
        </div>
      </div>

      {!timezone.isSource && (
        <button
          onClick={onRemove}
          className="p-1 hover:bg-red-100 rounded-full text-red-500"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}