import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const JobDetailsModal = ({ job, isOpen, onClose, onApply, hasApplied, isApplying }) => {
    if (!job) return null;

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

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Job Details">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h2>
                    <div className="flex items-center gap-3 flex-wrap">
                        <Badge variant={badge.color}>{badge.text}</Badge>
                        {job.status === 'OPEN' ? (
                            <Badge variant="green">Open</Badge>
                        ) : (
                            <Badge variant="red">Closed</Badge>
                        )}
                    </div>
                </div>

                {/* Company Info */}
                {job.createdBy && (
                    <div className="flex items-center gap-2 text-gray-700">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="font-medium">
                            {job.createdBy.firstName} {job.createdBy.lastName}
                        </span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-600">{job.createdBy.email}</span>
                    </div>
                )}

                {/* Job Details */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-gray-700">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div>
                            <p className="text-xs text-gray-500">Location</p>
                            <p className="font-medium">{job.location}</p>
                        </div>
                    </div>

                    {job.experience && (
                        <div className="flex items-center gap-2 text-gray-700">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <div>
                                <p className="text-xs text-gray-500">Experience</p>
                                <p className="font-medium">{job.experience}</p>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-2 text-gray-700">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div>
                            <p className="text-xs text-gray-500">Posted On</p>
                            <p className="font-medium">{new Date(job.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <p className="text-xs text-gray-500">Last Updated</p>
                            <p className="font-medium">{new Date(job.updatedAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                        {job.description}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                    <Button variant="outline" onClick={onClose} className="flex-1">
                        Close
                    </Button>
                    {job.status === 'OPEN' && (
                        hasApplied ? (
                            <Button disabled className="flex-1">
                                Already Applied ✓
                            </Button>
                        ) : (
                            <Button 
                                onClick={() => onApply(job._id)} 
                                disabled={isApplying}
                                className="flex-1"
                            >
                                {isApplying ? 'Applying...' : 'Apply Now'}
                            </Button>
                        )
                    )}
                </div>
            </div>
        </Modal>
    );
};
