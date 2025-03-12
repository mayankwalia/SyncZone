import { TimeZone } from '../types';

export const timeZoneOptions = [
  { value: { id: 'UTC', name: 'Etc/UTC', offset: 0, abbreviation: 'UTC' }, label: 'UTC' },
  { value: { id: 'America/New_York', name: 'America/New_York', offset: -5, abbreviation: 'EST' }, label: 'New York' },
  { value: { id: 'America/Los_Angeles', name: 'America/Los_Angeles', offset: -8, abbreviation: 'PST' }, label: 'Los Angeles' },
  { value: { id: 'Europe/London', name: 'Europe/London', offset: 0, abbreviation: 'GMT' }, label: 'London' },
  { value: { id: 'Europe/Paris', name: 'Europe/Paris', offset: 1, abbreviation: 'CET' }, label: 'Paris' },
  { value: { id: 'Asia/Tokyo', name: 'Asia/Tokyo', offset: 9, abbreviation: 'JST' }, label: 'Tokyo' },
  { value: { id: 'Australia/Sydney', name: 'Australia/Sydney', offset: 11, abbreviation: 'AEDT' }, label: 'Sydney' },
  { value: { id: 'Asia/Dubai', name: 'Asia/Dubai', offset: 4, abbreviation: 'GST' }, label: 'Dubai' },
  { value: { id: 'Asia/Kolkata', name: 'Asia/Kolkata', offset: 5.5, abbreviation: 'IST' }, label: 'Kolkata' },
  { value: { id: 'Asia/Shanghai', name: 'Asia/Shanghai', offset: 8, abbreviation: 'CST' }, label: 'Shanghai' },
  { value: { id: 'Asia/Singapore', name: 'Asia/Singapore', offset: 8, abbreviation: 'SGT' }, label: 'Singapore' },
  { value: { id: 'America/Sao_Paulo', name: 'America/Sao_Paulo', offset: -3, abbreviation: 'BRT' }, label: 'São Paulo' },
  { value: { id: 'Africa/Cairo', name: 'Africa/Cairo', offset: 2, abbreviation: 'EET' }, label: 'Cairo' },
  { value: { id: 'Africa/Johannesburg', name: 'Africa/Johannesburg', offset: 2, abbreviation: 'SAST' }, label: 'Johannesburg' },
  { value: { id: 'Pacific/Auckland', name: 'Pacific/Auckland', offset: 13, abbreviation: 'NZDT' }, label: 'Auckland' },
];