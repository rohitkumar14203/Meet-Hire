import React from 'react';
import { Card, CardContent } from '../common/Card';
import { Button } from '../common/Button';

export const ProfileCompletionWidget = () => {
    const completionPercentage = 60; // This would come from user profile data

    return (
        <Card>
            <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Strength</h3>
                
                <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Profile Completion</span>
                        <span className="font-semibold text-blue-600">{completionPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${completionPercentage}%` }}
                        />
                    </div>
                </div>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">Basic Information</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-500">Upload Resume</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-500">Add Skills</span>
                    </div>
                </div>

                <Button size="sm" variant="outline" className="w-full">
                    Complete Profile
                </Button>
            </CardContent>
        </Card>
    );
};
