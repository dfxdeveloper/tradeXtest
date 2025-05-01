import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

const CountrySelector = ({ selectedCode, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  // Define the only countries we want to show
  const allowedCountries = [
    { code: '+91', isoCode: 'IN' },
    { code: '+1', isoCode: 'US' },
    { code: '+86', isoCode: 'CN' },
    { code: '+971', isoCode: 'AE' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCountries = searchQuery
    ? allowedCountries.filter(country => 
        country.code.includes(searchQuery) || 
        country.isoCode.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allowedCountries;

  const formatDisplayCode = (code) => {
    const country = allowedCountries.find(c => c.code === code);
    return country ? `${code} (${country.isoCode})` : code;
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between rounded-md border border-gray-300 bg-white px-2 py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600"
      >
        <span>{formatDisplayCode(selectedCode)}</span>
        <span className="ml-2 text-xs">▼</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                className="w-full pl-8 pr-3 py-1 border rounded-md text-black"
                placeholder="Search code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <ul className="max-h-60 overflow-auto py-1">
            {filteredCountries.map((country) => (
              <li
                key={country.code}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-black"
                onClick={() => {
                  onSelect(country.code);
                  setIsOpen(false);
                  setSearchQuery('');
                }}
              >
                <span>{country.code} ({country.isoCode})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;