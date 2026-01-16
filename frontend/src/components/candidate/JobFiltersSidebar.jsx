import React from 'react';
import { Checkbox } from '../common/Checkbox';
import { Badge } from '../common/Badge';

export const JobFiltersSidebar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters,
  jobCount = 0 
}) => {
  const employmentTypes = [
    { value: 'FULL_TIME', label: 'Full Time' },
    { value: 'PART_TIME', label: 'Part Time' },
    { value: 'CONTRACT', label: 'Contract' },
    { value: 'INTERN', label: 'Internship' }
  ];

  const experienceRanges = [
    { value: '0-1', label: '0-1 years' },
    { value: '1-3', label: '1-3 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '5-7', label: '5-7 years' },
    { value: '7-10', label: '7-10 years' },
    { value: '10+', label: '10+ years' }
  ];

  const workModes = [
    { value: 'remote', label: 'Remote' },
    { value: 'onsite', label: 'On-site' },
    { value: 'hybrid', label: 'Hybrid' }
  ];

  const handleCheckboxChange = (filterType, value, checked) => {
    const currentValues = filters[filterType] || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter(v => v !== value);
    onFilterChange(filterType, newValues);
  };

  const hasActiveFilters = Object.values(filters).some(
    value => Array.isArray(value) ? value.length > 0 : value
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-20">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </h3>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear All
            </button>
          )}
        </div>
        {jobCount > 0 && (
          <p className="text-sm text-gray-500 mt-1">
            {jobCount} jobs found
          </p>
        )}
      </div>

      {/* Filters Content */}
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
        {/* Employment Type */}
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3 text-sm">Employment Type</h4>
          <div className="space-y-2">
            {employmentTypes.map(type => (
              <label key={type.value} className="flex items-center gap-2 cursor-pointer group">
                <Checkbox
                  checked={filters.employmentTypes?.includes(type.value) || false}
                  onChange={(checked) => handleCheckboxChange('employmentTypes', type.value, checked)}
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {type.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3 text-sm">Experience</h4>
          <div className="space-y-2">
            {experienceRanges.map(range => (
              <label key={range.value} className="flex items-center gap-2 cursor-pointer group">
                <Checkbox
                  checked={filters.experience?.includes(range.value) || false}
                  onChange={(checked) => handleCheckboxChange('experience', range.value, checked)}
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Work Mode */}
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3 text-sm">Work Mode</h4>
          <div className="space-y-2">
            {workModes.map(mode => (
              <label key={mode.value} className="flex items-center gap-2 cursor-pointer group">
                <Checkbox
                  checked={filters.workMode?.includes(mode.value) || false}
                  onChange={(checked) => handleCheckboxChange('workMode', mode.value, checked)}
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {mode.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Location Filter */}
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3 text-sm">Location</h4>
          <input
            type="text"
            value={filters.location || ''}
            onChange={(e) => onFilterChange('location', e.target.value)}
            placeholder="Enter location"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Salary Range */}
        <div className="p-4">
          <h4 className="font-medium text-gray-900 mb-3 text-sm">Minimum Salary</h4>
          <input
            type="text"
            value={filters.minSalary || ''}
            onChange={(e) => onFilterChange('minSalary', e.target.value)}
            placeholder="e.g., 50000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};
