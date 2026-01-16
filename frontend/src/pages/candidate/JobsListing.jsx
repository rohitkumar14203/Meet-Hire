import React, { useEffect, useState } from 'react';
import { useCandidateJobs } from '../../hooks/useCandidateJobs';
import { useCandidateApplications } from '../../hooks/useCandidateApplications';
import {
  SearchBar,
  EmptyState,
  LoadingCard,
  ErrorState,
  Alert,
  Pagination,
  Card,
  CardHeader,
  CardContent
} from '../../components/common';
import {
  JobCard,
  JobDetailsModal,
  JobFilters,
} from '../../components/candidate';

export const JobsListing = () => {
  const {
    jobList,
    loading: jobsLoading,
    error: jobsError,
    fetchAllJobs,
  } = useCandidateJobs();

  const {
    applyLoading,
    applyError,
    applySuccess,
    applyForJob,
    clearStatus,
    hasApplied
  } = useCandidateApplications();

  // State Management
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [location, setLocation] = useState('');
  const [selectedJobForDetails, setSelectedJobForDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const itemsPerPage = 12;

  // Fetch data on mount
  useEffect(() => {
    fetchAllJobs(1, 100);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show success alert
  useEffect(() => {
    if (applySuccess) {
      setTimeout(() => {
        clearStatus();
      }, 3000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applySuccess]);

  // Filter jobs
  const filterJobs = () => {
    let filtered = [...jobList];

    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.createdBy && 
          `${job.createdBy.firstName} ${job.createdBy.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (employmentType) {
      filtered = filtered.filter(job => job.employmentType === employmentType);
    }

    if (location) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    return filtered;
  };

  useEffect(() => {
    setFilteredJobs(filterJobs());
    setCurrentPage(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobList, searchQuery, employmentType, location]);

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage);

  // Handlers
  const handleViewDetails = (job) => {
    setSelectedJobForDetails(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedJobForDetails(null), 300);
  };

  const handleApply = async (jobId) => {
    await applyForJob(jobId);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setEmploymentType('');
    setLocation('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Browse Jobs</h1>
        <p className="text-gray-600 mt-2">
          Discover your next career opportunity from {filteredJobs.length} available positions
        </p>
      </div>

      {/* Alerts */}
      {applySuccess && (
        <Alert variant="success" className="mb-6">
          Application submitted successfully!
        </Alert>
      )}

      {applyError && (
        <Alert variant="error" className="mb-6" onClose={clearStatus}>
          {applyError}
        </Alert>
      )}

      <Card>
        <CardHeader title={`${filteredJobs.length} Jobs Found`} />
        <CardContent>
          {/* Filters */}
          <JobFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            employmentType={employmentType}
            onEmploymentTypeChange={setEmploymentType}
            location={location}
            onLocationChange={setLocation}
            onReset={handleResetFilters}
          />

          {/* Jobs List */}
          {jobsLoading ? (
            <LoadingCard message="Loading jobs..." />
          ) : jobsError ? (
            <ErrorState error={jobsError} onRetry={() => fetchAllJobs()} />
          ) : paginatedJobs.length === 0 ? (
            <EmptyState
              icon={(props) => (
                <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
              title="No jobs found"
              description="Try adjusting your filters or search terms to find more opportunities."
            />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 mb-6">
                {paginatedJobs.map((job) => (
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

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                  totalItems={filteredJobs.length}
                />
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Job Details Modal */}
      <JobDetailsModal
        job={selectedJobForDetails}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onApply={handleApply}
        hasApplied={selectedJobForDetails ? hasApplied(selectedJobForDetails._id) : false}
        isApplying={applyLoading}
      />
    </div>
  );
};
