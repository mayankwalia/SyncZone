import React from 'react';
import Select from 'react-select';
import { Clock } from 'lucide-react';
import { TimeZone } from '../types';
import { timeZoneOptions } from '../utils/timeZones';

interface TimeZoneSelectorProps {
  onSelect: (timezone: TimeZone) => void;
  placeholder?: string;
  isDarkMode?: boolean;
}

export function TimeZoneSelector({ onSelect, placeholder = 'Select a timezone...', isDarkMode = false }: TimeZoneSelectorProps) {
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: isDarkMode ? '#1f2937' : provided.backgroundColor,
      borderColor: isDarkMode ? '#374151' : provided.borderColor,
      boxShadow: state.isFocused 
        ? isDarkMode 
          ? '0 0 0 1px #3b82f6' 
          : '0 0 0 1px #3b82f6' 
        : provided.boxShadow,
      '&:hover': {
        borderColor: isDarkMode ? '#4b5563' : provided.borderColor,
      },
      borderRadius: '0.5rem',
      padding: '2px',
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: isDarkMode ? '#1f2937' : provided.backgroundColor,
      borderRadius: '0.5rem',
      overflow: 'hidden',
      zIndex: 100,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: isDarkMode 
        ? state.isSelected 
          ? '#3b82f6' 
          : state.isFocused 
            ? '#374151' 
            : '#1f2937' 
        : provided.backgroundColor,
      color: isDarkMode 
        ? state.isSelected 
          ? 'white' 
          : '#d1d5db'
        : provided.color,
      cursor: 'pointer',
      '&:active': {
        backgroundColor: isDarkMode ? '#2563eb' : provided.backgroundColor,
      },
    }),
    input: (provided: any) => ({
      ...provided,
      color: isDarkMode ? '#d1d5db' : provided.color,
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: isDarkMode ? '#9ca3af' : provided.color,
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: isDarkMode ? '#d1d5db' : provided.color,
    }),
  };
  
  return (
    <div className="w-full max-w-md">
      <Select
        options={timeZoneOptions}
        onChange={(option: any) => onSelect(option.value)}
        placeholder={placeholder}
        className="text-sm"
        styles={customStyles}
        formatOptionLabel={({ label, value }: any) => (
          <div className="flex items-center gap-2 py-1">
            <Clock size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
            <span>{label}</span>
            <span className={isDarkMode ? 'text-gray-400 text-xs' : 'text-gray-500 text-xs'}>
              ({value.abbreviation})
            </span>
          </div>
        )}
      />
    </div>
  );
}