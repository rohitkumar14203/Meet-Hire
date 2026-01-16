import React, { useState } from 'react';

export const EnhancedSearchBar = ({ 
  onSearch, 
  initialValues = { query: '', experience: '', location: '' } 
}) => {
  const [searchData, setSearchData] = useState({
    query: initialValues.query,
    experience: initialValues.experience,
    location: initialValues.location
  });

  const experienceLevels = [
    { value: '', label: 'Select Experience' },
    { value: '0-1', label: '0-1 years' },
    { value: '1-3', label: '1-3 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '5-7', label: '5-7 years' },
    { value: '7-10', label: '7-10 years' },
    { value: '10+', label: '10+ years' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchData);
  };

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="bg-white rounded-lg shadow-lg border-2 border-gray-200 overflow-hidden">
        <div className="flex flex-col md:flex-row items-stretch">
          {/* Job Title/Keywords Input */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200">
            <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchData.query}
              onChange={(e) => handleInputChange('query', e.target.value)}
              placeholder="Enter skills / designations / companies"
              className="flex-1 outline-none text-sm placeholder:text-gray-400"
            />
          </div>

          {/* Experience Dropdown */}
          <div className="flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200 min-w-[200px]">
            <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <select
              value={searchData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              className="flex-1 outline-none text-sm bg-transparent cursor-pointer text-gray-700"
            >
              {experienceLevels.map(level => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          {/* Location Input */}
          <div className="flex items-center gap-3 px-4 py-3 min-w-[200px]">
            <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input
              type="text"
              value={searchData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Enter location"
              className="flex-1 outline-none text-sm placeholder:text-gray-400"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-medium transition-colors flex items-center justify-center gap-2 md:min-w-[120px]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};
