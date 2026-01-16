import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCandidateJobs } from '../../hooks/useCandidateJobs';
import { useCandidateApplications } from '../../hooks/useCandidateApplications';
import {
  DashboardCard,
  Tabs,
  EmptyState,
  LoadingCard,
  ErrorState,
  Alert,
  Button
} from '../../components/common';
import {
  JobCard,
  ApplicationCard,
  RecommendedJobsWidget,
  ProfileCompletionWidget,
} from '../../components/candidate';

export const CandidateDashboard = () => {
  const navigate = useNavigate();
  
  const {
    jobList,
    loading: jobsLoading,
    error: jobsError,
    fetchAllJobs,
  } = useCandidateJobs();

  const {
    applicationsList,
    loading: appsLoading,
    error: appsError,
    applyLoading,
    applyError,
    applySuccess,
    applyForJob,
    fetchMyApplications,
    clearStatus,
    hasApplied
  } = useCandidateApplications();

  const [activeTab, setActiveTab] = useState('overview');

  // Fetch data on mount
  useEffect(() => {
    fetchAllJobs(1, 10);
    fetchMyApplications();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show success alert
  useEffect(() => {
    if (applySuccess) {
      setTimeout(() => {
        clearStatus();
        fetchMyApplications();
      }, 2000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applySuccess]);

  // Handlers
  const handleViewDetails = (job) => {
    navigate(`/candidate/jobs/${job._id}`);
  };

  const handleApply = async (jobId) => {
    await applyForJob(jobId);
  };

  // Calculate stats
  const stats = {
    totalApplications: applicationsList.length,
    shortlisted: applicationsList.filter(app => app.status === 'Shortlisted').length,
    availableJobs: jobList.length,
    hired: applicationsList.filter(app => app.status === 'Hired').length,
  };

  const tabs = [
    { 
      value: 'overview', 
      label: 'Overview', 
      icon: (props) => (
        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    { 
      value: 'my-applications', 
      label: 'My Applications', 
      count: applicationsList.length,
      icon: (props) => (
        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Success Alert */}
      {applySuccess && (
        <Alert variant="success" className="mb-6" onClose={clearStatus}>
          Application submitted successfully!
        </Alert>
      )}

      {/* Error Alert */}
      {applyError && (
        <Alert variant="error" className="mb-6" onClose={clearStatus}>
          {applyError}
        </Alert>
      )}

      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your job search activity.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Applications"
          value={stats.totalApplications}
          subtitle="All time applications"
          color="blue"
          icon={(props) => (
            <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )}
        />
        <DashboardCard
          title="Shortlisted"
          value={stats.shortlisted}
          subtitle="Under review"
          color="purple"
          icon={(props) => (
            <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        />
        <DashboardCard
          title="Available Jobs"
          value={stats.availableJobs}
          subtitle="Currently open positions"
          color="green"
          icon={(props) => (
            <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          )}
        />
        <DashboardCard
          title="Hired"
          value={stats.hired}
          subtitle="Congratulations!"
          color="amber"
          icon={(props) => (
            <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

            <div className="mt-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Job Openings</h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/candidate/jobs')}
                    >
                      View All Jobs
                    </Button>
                  </div>
                  
                  {jobsLoading ? (
                    <LoadingCard message="Loading jobs..." />
                  ) : jobsError ? (
                    <ErrorState error={jobsError} onRetry={() => fetchAllJobs()} />
                  ) : jobList.length === 0 ? (
                    <EmptyState
                      icon={(props) => (
                        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      )}
                      title="No jobs available"
                      description="Check back later for new opportunities."
                    />
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {jobList.slice(0, 5).map((job) => (
                        <JobCard
                          key={job._id}
                          job={job}
                          onViewDetails={handleViewDetails}
                          onApply={handleApply}
                          hasApplied={hasApplied(job._id)}
                          isApplying={applyLoading}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* My Applications Tab */}
              {activeTab === 'my-applications' && (
                <>
                  {appsLoading ? (
                    <LoadingCard message="Loading applications..." />
                  ) : appsError ? (
                    <ErrorState error={appsError} onRetry={fetchMyApplications} />
                  ) : applicationsList.length === 0 ? (
                    <EmptyState
                      icon={(props) => (
                        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                      title="No applications yet"
                      description="You haven't applied to any jobs yet. Start exploring available opportunities."
                      action={
                        <Button onClick={() => navigate('/candidate/jobs')}>
                          Browse Jobs
                        </Button>
                      }
                    />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {applicationsList.map((application) => (
                        <ApplicationCard
                          key={application._id}
                          application={application}
                          onViewJob={handleViewDetails}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Widgets */}
        <div className="space-y-6">
          <ProfileCompletionWidget />
          <RecommendedJobsWidget
            jobs={jobList}
            onViewJob={handleViewDetails}
            loading={jobsLoading}
          />
        </div>      </div>
    </div>
  );
};