import React from 'react';
import { Card, CardHeader, CardContent } from '../common/Card';
import { StatusBadge } from '../common/StatusBadge';
import { Button } from '../common/Button';

export const ApplicationCard = ({ application, onViewJob }) => {
    const getStatusColor = (status) => {
        const colors = {
            'Applied': 'blue',
            'Shortlisted': 'purple',
            'Rejected': 'red',
            'Hired': 'green'
        };
        return colors[status] || 'gray';
    };

    const job = application.job;
    const statusColor = getStatusColor(application.status);

    return (
        <Card hover className="transition-all duration-200">
            <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {job.title}
                        </h3>
                        {job.createdBy && (
                            <p className="text-sm text-gray-600">
                                {job.createdBy.firstName} {job.createdBy.lastName}
                            </p>
                        )}
                    </div>
                    <StatusBadge status={application.status} variant={statusColor} />
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>{job.employmentType?.replace('_', ' ')}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
                    <span className="text-gray-500">
                        Applied: {new Date(application.createdAt).toLocaleDateString()}
                    </span>
                    <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onViewJob(job)}
                    >
                        View Job
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
