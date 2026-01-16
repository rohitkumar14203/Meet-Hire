import React from 'react';
import { Card, CardContent } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const JobCard = ({ job, onViewDetails, onApply, hasApplied, isApplying }) => {
    const getEmploymentTypeBadge = (type) => {
        const badges = {
            'FULL_TIME': { color: 'blue', text: 'Full Time' },
            'PART_TIME': { color: 'green', text: 'Part Time' },
            'CONTRACT': { color: 'purple', text: 'Contract' },
            'INTERN': { color: 'amber', text: 'Internship' }
        };
        return badges[type] || { color: 'blue', text: type };
    };

    const badge = getEmploymentTypeBadge(job.employmentType);
    
    const timeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60
        };
        
        for (const [unit, secondsInUnit] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / secondsInUnit);
            if (interval >= 1) {
                return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
            }
        }
        return 'Just now';
    };

    return (
        <Card hover className="transition-all duration-200 hover:shadow-lg border-l-4 border-l-blue-500">
            <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-start gap-3">
                            {/* Company Logo/Icon */}
                            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shrink-0">
                                {job.createdBy?.firstName?.charAt(0).toUpperCase() || 'C'}
                            </div>
                            
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-1 hover:text-blue-600 cursor-pointer"
                                    onClick={() => onViewDetails(job)}>
                                    {job.title}
                                </h3>
                                {job.createdBy && (
                                    <p className="text-sm font-medium text-gray-700 mb-2">
                                        {job.createdBy.firstName} {job.createdBy.lastName}
                                    </p>
                                )}
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{timeAgo(job.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Badge variant={badge.color} className="ml-2">{badge.text}</Badge>
                </div>

                <p className="text-sm text-gray-700 mb-4 line-clamp-3 leading-relaxed">
                    {job.description}
                </p>

                {/* Skills/Requirements Tags */}
                {job.requirements && job.requirements.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {job.requirements.slice(0, 5).map((req, index) => (
                            <span key={index} className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                                {req}
                            </span>
                        ))}
                        {job.requirements.length > 5 && (
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                +{job.requirements.length - 5} more
                            </span>
                        )}
                    </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                        {job.experience && (
                            <span className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {job.experience}
                            </span>
                        )}
                        {job.salary && (
                            <span className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded font-medium">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {job.salary}
                            </span>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => onViewDetails(job)}
                        >
                            View Details
                        </Button>
                        {hasApplied ? (
                            <Button size="sm" disabled className="bg-green-500 hover:bg-green-600">
                                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Applied
                            </Button>
                        ) : (
                            <Button 
                                size="sm" 
                                onClick={() => onApply(job._id)}
                                disabled={isApplying}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {isApplying ? 'Applying...' : 'Apply Now'}
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
