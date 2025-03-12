import React from 'react';
import Select from 'react-select';
import { Clock } from 'lucide-react';
import { TimeZone } from '../types';
import { timeZoneOptions } from '../utils/timeZones';

interface TimeZoneSelectorProps {
  onSelect: (timezone: TimeZone) => void;
  placeholder?: string;
}

export function TimeZoneSelector({ onSelect, placeholder = 'Select a timezone...' }: TimeZoneSelectorProps) {
  return (
    <div className="w-full max-w-md">
      <Select
        options={timeZoneOptions}
        onChange={(option: any) => onSelect(option.value)}
        placeholder={placeholder}
        className="text-sm"
        formatOptionLabel={({ label, value }: any) => (
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{label}</span>
            <span className="text-gray-500 text-xs">({value.abbreviation})</span>
          </div>
        )}
      />
    </div>
  );
}