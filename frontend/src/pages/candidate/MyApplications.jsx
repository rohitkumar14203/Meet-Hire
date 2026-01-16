import React, { useEffect, useState } from 'react';
import { useCandidateApplications } from '../../hooks/useCandidateApplications';
import {
  EmptyState,
  LoadingCard,
  ErrorState,
  Tabs,
  Card,
  CardHeader,
  CardContent,
  DashboardCard
} from '../../components/common';
import {
  ApplicationCard,
  JobDetailsModal,
} from '../../components/candidate';

export const MyApplications = () => {
  const {
    applicationsList,
    loading,
    error,
    fetchMyApplications,
  } = useCandidateApplications();

  const [activeTab, setActiveTab] = useState('all');
  const [selectedJobForDetails, setSelectedJobForDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchMyApplications();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter applications by status
  const getFilteredApplications = () => {
    if (activeTab === 'all') return applicationsList;
    return applicationsList.filter(app => app.status === activeTab);
  };

  const filteredApplications = getFilteredApplications();

  // Calculate stats
  const stats = {
    total: applicationsList.length,
    applied: applicationsList.filter(app => app.status === 'Applied').length,
    shortlisted: applicationsList.filter(app => app.status === 'Shortlisted').length,
    rejected: applicationsList.filter(app => app.status === 'Rejected').length,
    hired: applicationsList.filter(app => app.status === 'Hired').length,
  };

  const tabs = [
    { value: 'all', label: 'All', count: stats.total },
    { value: 'Applied', label: 'Applied', count: stats.applied },
    { value: 'Shortlisted', label: 'Shortlisted', count: stats.shortlisted },
    { value: 'Rejected', label: 'Rejected', count: stats.rejected },
    { value: 'Hired', label: 'Hired', count: stats.hired },
  ];

  const handleViewDetails = (job) => {
    setSelectedJobForDetails(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedJobForDetails(null), 300);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
        <p className="text-gray-600 mt-2">
          Track the status of all your job applications
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <DashboardCard
          title="Total"
          value={stats.total}
          color="blue"
          icon={(props) => (
            <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )}
        />
        <DashboardCard
          title="Applied"
          value={stats.applied}
          color="blue"
          icon={(props) => (
            <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        />
        <DashboardCard
          title="Shortlisted"
          value={stats.shortlisted}
          color="purple"
          icon={(props) => (
            <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        />
        <DashboardCard
          title="Rejected"
          value={stats.rejected}
          color="red"
          icon={(props) => (
            <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        />
        <DashboardCard
          title="Hired"
          value={stats.hired}
          color="green"
          icon={(props) => (
            <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        />
      </div>

      {/* Applications List */}
      <Card>
        <CardHeader title="Application History" />
        <CardContent>
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

          {loading ? (
            <LoadingCard message="Loading applications..." />
          ) : error ? (
            <ErrorState error={error} onRetry={fetchMyApplications} />
          ) : filteredApplications.length === 0 ? (
            <EmptyState
              icon={(props) => (
                <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
              title={activeTab === 'all' ? 'No applications yet' : `No ${activeTab.toLowerCase()} applications`}
              description={
                activeTab === 'all'
                  ? "You haven't applied to any jobs yet. Start exploring available opportunities."
                  : `You don't have any applications with ${activeTab.toLowerCase()} status.`
              }
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredApplications.map((application) => (
                <ApplicationCard
                  key={application._id}
                  application={application}
                  onViewJob={handleViewDetails}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Job Details Modal */}
      <JobDetailsModal
        job={selectedJobForDetails}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onApply={() => {}}
        hasApplied={true}
        isApplying={false}
      />
    </div>
  );
};
