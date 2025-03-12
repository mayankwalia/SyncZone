import React, { useState } from 'react';
import { Globe, ArrowDownUp } from 'lucide-react';
import { TimeZone, TimeBlock } from './types';
import { TimeZoneSelector } from './components/TimeZoneSelector';
import { TimeZoneList } from './components/TimeZoneList';
import { TimeGrid } from './components/TimeGrid';

function App() {
  const [timezones, setTimezones] = useState<TimeZone[]>([]);
  const [selectedTimeBlock, setSelectedTimeBlock] = useState<TimeBlock | undefined>();

  const handleAddSourceTimezone = (timezone: TimeZone) => {
    if (timezones.length === 0) {
      setTimezones([{ ...timezone, isSource: true }]);
    }
  };

  const handleAddTimezone = (timezone: TimeZone) => {
    if (!timezones.find(tz => tz.id === timezone.id)) {
      setTimezones([...timezones, timezone]);
    }
  };

  const handleRemoveTimezone = (timezone: TimeZone) => {
    setTimezones(timezones.filter(tz => tz.id !== timezone.id));
  };

  const handleReorderTimezones = (newTimezones: TimeZone[]) => {
    setTimezones(newTimezones);
  };

  const handleSortByOffset = () => {
    const sourceTimezone = timezones.find(tz => tz.isSource);
    if (!sourceTimezone) return;

    const sortedTimezones = [...timezones].sort((a, b) => {
      if (a.isSource) return -1;
      if (b.isSource) return 1;
      return a.offset - b.offset;
    });

    setTimezones(sortedTimezones);
  };

  const handleTimeBlockSelect = (start: Date, end: Date) => {
    setSelectedTimeBlock({ start, end });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Globe className="text-blue-500" size={32} />
            <h1 className="text-3xl font-bold">Time Zone Converter</h1>
          </div>
          <p className="text-gray-600">Compare times across different time zones</p>
        </header>

        <div className="space-y-8">
          {timezones.length === 0 ? (
            <div className="text-center space-y-4">
              <p className="text-lg font-medium">Start by selecting your source time zone:</p>
              <div className="flex justify-center">
                <TimeZoneSelector
                  onSelect={handleAddSourceTimezone}
                  placeholder="Select source time zone..."
                />
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4 justify-between">
                <TimeZoneSelector
                  onSelect={handleAddTimezone}
                  placeholder="Add another time zone..."
                />
                <button
                  onClick={handleSortByOffset}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-50"
                >
                  <ArrowDownUp size={16} />
                  <span>Sort by offset</span>
                </button>
              </div>

              <TimeZoneList
                timezones={timezones}
                onReorder={handleReorderTimezones}
                onRemove={handleRemoveTimezone}
                selectedTimeBlock={selectedTimeBlock}
              />

              <TimeGrid
                timezones={timezones}
                onTimeBlockSelect={handleTimeBlockSelect}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;