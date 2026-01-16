import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCandidateJobs } from '../../hooks/useCandidateJobs';
import { useCandidateApplications } from '../../hooks/useCandidateApplications';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { LoadingCard, ErrorState, Alert } from '../../components/common';

export const JobDetailsPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  
  const {
    jobList,
    loading: jobsLoading,
    error: jobsError,
    fetchAllJobs,
  } = useCandidateJobs();

  const {
    hasApplied,
    applyLoading,
    applyError,
    applySuccess,
    applyForJob,
    clearStatus
  } = useCandidateApplications();

  useEffect(() => {
    if (jobList.length === 0) {
      fetchAllJobs();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const job = useMemo(() => {
    return jobList.find(j => j._id === jobId) || null;
  }, [jobList, jobId]);

  useEffect(() => {
    if (applySuccess) {
      setTimeout(() => {
        clearStatus();
      }, 3000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applySuccess]);

  const handleApply = async () => {
    await applyForJob(jobId);
  };

  const handleBack = () => {
    navigate('/candidate/jobs');
  };

  const getEmploymentTypeBadge = (type) => {
    const badges = {
      'FULL_TIME': { color: 'blue', text: 'Full Time' },
      'PART_TIME': { color: 'green', text: 'Part Time' },
      'CONTRACT': { color: 'purple', text: 'Contract' },
      'INTERN': { color: 'amber', text: 'Internship' }
    };
    return badges[type] || { color: 'blue', text: type };
  };

  if (jobsLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <LoadingCard message="Loading job details..." />
      </div>
    );
  }

  if (jobsError) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <ErrorState error={jobsError} onRetry={fetchAllJobs} />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Job Not Found</h3>
          <p className="text-gray-600 mb-4">The job you're looking for doesn't exist or has been removed.</p>
          <Button onClick={handleBack}>Back to Jobs</Button>
        </div>
      </div>
    );
  }

  const badge = getEmploymentTypeBadge(job.employmentType);
  const isJobApplied = hasApplied(jobId);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="font-medium">Back to Jobs</span>
      </button>

      {/* Success Alert */}
      {applySuccess && (
        <Alert variant="success" className="mb-6" onClose={clearStatus}>
          Application submitted successfully! You can track your application status in your dashboard.
        </Alert>
      )}

      {/* Error Alert */}
      {applyError && (
        <Alert variant="error" className="mb-6" onClose={clearStatus}>
          {applyError}
        </Alert>
      )}

      {/* Job Details Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 p-8 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              {/* Company Logo */}
              <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl shrink-0">
                {job.createdBy?.firstName?.charAt(0).toUpperCase() || 'C'}
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                {job.createdBy && (
                  <p className="text-lg text-gray-700 mb-3">
                    {job.createdBy.firstName} {job.createdBy.lastName}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{job.location}</span>
                  </div>
                  {job.experience && (
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{job.experience}</span>
                    </div>
                  )}
                  {job.salary && (
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">{job.salary}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <Badge variant={badge.color} className="text-sm">{badge.text}</Badge>
                  <span className="text-xs text-gray-500">
                    Posted {new Date(job.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="ml-4">
              {isJobApplied ? (
                <Button size="lg" disabled className="bg-green-500 hover:bg-green-600">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Applied
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  onClick={handleApply}
                  disabled={applyLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {applyLoading ? 'Applying...' : 'Apply Now'}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Description */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Job Description
                </h2>
                <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                  <p className="whitespace-pre-line">{job.description}</p>
                </div>
              </section>

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    Requirements & Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((req, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Responsibilities */}
              {job.responsibilities && (
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Key Responsibilities
                  </h2>
                  <div className="prose prose-sm max-w-none text-gray-700">
                    <p className="whitespace-pre-line">{job.responsibilities}</p>
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-20 space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Job Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Posted Date</p>
                        <p className="font-medium text-gray-900">
                          {new Date(job.createdAt).toLocaleDateString('en-US', { 
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Job Type</p>
                        <p className="font-medium text-gray-900">{badge.text}</p>
                      </div>
                    </div>

                    {job.experience && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Experience</p>
                          <p className="font-medium text-gray-900">{job.experience}</p>
                        </div>
                      </div>
                    )}

                    {job.salary && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Salary</p>
                          <p className="font-medium text-gray-900">{job.salary}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Apply Button (Mobile) */}
                <div className="lg:hidden">
                  {isJobApplied ? (
                    <Button size="lg" disabled className="w-full bg-green-500 hover:bg-green-600">
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Applied
                    </Button>
                  ) : (
                    <Button 
                      size="lg" 
                      onClick={handleApply}
                      disabled={applyLoading}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {applyLoading ? 'Applying...' : 'Apply Now'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
