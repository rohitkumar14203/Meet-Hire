import React from 'react';
import { Card, CardContent } from '../common/Card';

export const RecommendedJobsWidget = ({ jobs, onViewJob, loading }) => {
    if (loading) {
        return (
            <Card>
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended for You</h3>
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!jobs || jobs.length === 0) {
        return null;
    }

    const recommendedJobs = jobs.slice(0, 5);

    return (
        <Card>
            <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended for You</h3>
                <div className="space-y-3">
                    {recommendedJobs.map((job) => (
                        <div 
                            key={job._id}
                            onClick={() => onViewJob(job)}
                            className="p-3 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-blue-200"
                        >
                            <h4 className="font-medium text-gray-900 text-sm mb-1">
                                {job.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                <span>{job.location}</span>
                                <span>•</span>
                                <span>{job.employmentType?.replace('_', ' ')}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
