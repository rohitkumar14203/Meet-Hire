import React from 'react';
import { Card, CardHeader, CardContent } from './Card';
import { Loader } from './Loader';

export const EmptyState = ({ 
    icon: Icon, 
    title, 
    description, 
    action,
    className = "" 
}) => {
    return (
        <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
            {Icon && (
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                </div>
            )}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            {description && (
                <p className="text-sm text-gray-600 text-center max-w-md mb-4">
                    {description}
                </p>
            )}
            {action && <div className="mt-4">{action}</div>}
        </div>
    );
};

export const LoadingCard = ({ message = "Loading..." }) => {
    return (
        <Card>
            <CardContent className="py-12">
                <div className="flex flex-col items-center justify-center">
                    <Loader size="lg" />
                    <p className="text-gray-600 mt-4">{message}</p>
                </div>
            </CardContent>
        </Card>
    );
};

export const ErrorState = ({ error, onRetry, className = "" }) => {
    return (
        <div className={`bg-red-50 border border-red-200 rounded-lg p-6 ${className}`}>
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <p className="text-sm text-red-700 mt-1">{error || "Something went wrong"}</p>
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className="mt-3 text-sm font-medium text-red-600 hover:text-red-500"
                        >
                            Try again
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
