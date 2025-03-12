import React, { useState, useEffect } from 'react';
import { Globe, ArrowDownUp, Moon, Sun } from 'lucide-react';
import { TimeZone, TimeBlock } from './types';
import { TimeZoneSelector } from './components/TimeZoneSelector';
import { TimeZoneList } from './components/TimeZoneList';
import { TimeGrid } from './components/TimeGrid';

function App() {
  const [timezones, setTimezones] = useState<TimeZone[]>([]);
  const [selectedTimeBlock, setSelectedTimeBlock] = useState<TimeBlock | undefined>();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check user preference from localStorage or system preference
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    } else if (prefersDark) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

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

  const handleTimeBlockSelect = (start: Date, end: Date) => {
    setSelectedTimeBlock({ start, end });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const sortTimezonesByOffset = () => {
    const sortedTimezones = [...timezones].sort((a, b) => a.offset - b.offset);
    setTimezones(sortedTimezones);
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">SyncZone</h1>
            </div>
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Time Zone Converter</h2>
          <p className="text-gray-600 dark:text-gray-400">Seamlessly compare times across different time zones</p>
        </header>

        <div className="space-y-8">
          {timezones.length === 0 ? (
            <div className="text-center space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-300 transform hover:shadow-xl">
              <p className="text-lg font-medium text-gray-800 dark:text-white">Start by selecting your source time zone:</p>
              <div className="flex justify-center">
                <TimeZoneSelector
                  onSelect={handleAddSourceTimezone}
                  placeholder="Select source time zone..."
                  isDarkMode={darkMode}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between bg-white dark:bg-gray-800 rounded-lg shadow p-4 transition-all duration-300">
                <TimeZoneSelector
                  onSelect={handleAddTimezone}
                  placeholder="Add another time zone..."
                  isDarkMode={darkMode}
                />
                <button
                  onClick={sortTimezonesByOffset}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
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
                isDarkMode={darkMode}
              />

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transition-all duration-300 overflow-x-auto">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Time Grid</h3>
                <TimeGrid
                  timezones={timezones}
                  onTimeBlockSelect={handleTimeBlockSelect}
                  isDarkMode={darkMode}
                />
                {timezones.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Globe />
                    <p className="mt-4 text-gray-600 dark:text-gray-300 text-center">
                      Select a timezone to get started
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      
      <footer className="mt-16 py-8 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} TimeSync - A modern timezone management tool
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;