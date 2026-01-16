import React from 'react';
import { FilterDropdown } from '../common/FilterDropdown';
import { Button } from '../common/Button';

export const JobFilters = ({ 
    employmentType, 
    onEmploymentTypeChange,
    location,
    onLocationChange,
    onReset 
}) => {
    const employmentTypes = [
        { value: '', label: 'All Types' },
        { value: 'FULL_TIME', label: 'Full Time' },
        { value: 'PART_TIME', label: 'Part Time' },
        { value: 'CONTRACT', label: 'Contract' },
        { value: 'INTERN', label: 'Internship' }
    ];

    const hasActiveFilters = employmentType || location;

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filters:
                </div>
                
                <FilterDropdown
                    label=""
                    placeholder="Employment Type"
                    options={employmentTypes}
                    value={employmentType}
                    onChange={onEmploymentTypeChange}
                />

                <input
                    type="text"
                    value={location}
                    onChange={(e) => onLocationChange(e.target.value)}
                    placeholder="Location"
                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                
                {hasActiveFilters && (
                    <Button 
                        variant="outline" 
                        size="sm"
                        onClick={onReset}
                        className="whitespace-nowrap ml-auto"
                    >
                        Clear Filters
                    </Button>
                )}
            </div>
        </div>
    );
};
