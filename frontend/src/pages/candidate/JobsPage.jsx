import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCandidateJobs } from '../../hooks/useCandidateJobs';
import { useCandidateApplications } from '../../hooks/useCandidateApplications';
import { EnhancedSearchBar } from '../../components/common/EnhancedSearchBar';
import { JobFiltersSidebar } from '../../components/candidate/JobFiltersSidebar';
import { JobCard } from '../../components/candidate/JobCard';
import { Pagination, EmptyState, LoadingCard, ErrorState } from '../../components/common';

export const JobsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const {
    jobList,
    loading: jobsLoading,
    error: jobsError,
    fetchAllJobs,
  } = useCandidateJobs();

  const {
    hasApplied,
    applyLoading,
    applyForJob
  } = useCandidateApplications();

  // Search state
  const [searchData, setSearchData] = useState({
    query: searchParams.get('q') || '',
    experience: searchParams.get('exp') || '',
    location: searchParams.get('loc') || ''
  });

  // Filter state
  const [filters, setFilters] = useState({
    employmentTypes: [],
    experience: [],
    workMode: [],
    location: '',
    minSalary: ''
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Fetch jobs on mount
  useEffect(() => {
    fetchAllJobs(1, 100);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle search
  const handleSearch = (data) => {
    setSearchData(data);
    setCurrentPage(1);
    
    // Update URL params
    const params = new URLSearchParams();
    if (data.query) params.set('q', data.query);
    if (data.experience) params.set('exp', data.experience);
    if (data.location) params.set('loc', data.location);
    setSearchParams(params);
  };

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      employmentTypes: [],
      experience: [],
      workMode: [],
      location: '',
      minSalary: ''
    });
    setCurrentPage(1);
  };

  // Filter jobs
  const filterJobs = () => {
    let filtered = [...jobList];

    // Search query filter
    if (searchData.query) {
      filtered = filtered.filter(job =>
        job.title?.toLowerCase().includes(searchData.query.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchData.query.toLowerCase()) ||
        job.requirements?.some(req => 
          req.toLowerCase().includes(searchData.query.toLowerCase())
        ) ||
        (job.createdBy && 
          `${job.createdBy.firstName} ${job.createdBy.lastName}`.toLowerCase().includes(searchData.query.toLowerCase()))
      );
    }

    // Experience filter from search
    if (searchData.experience) {
      filtered = filtered.filter(job => {
        if (!job.experience) return false;
        // Match experience range
        return job.experience.includes(searchData.experience.split('-')[0]);
      });
    }

    // Location filter from search
    if (searchData.location) {
      filtered = filtered.filter(job =>
        job.location?.toLowerCase().includes(searchData.location.toLowerCase())
      );
    }

    // Employment type filter
    if (filters.employmentTypes.length > 0) {
      filtered = filtered.filter(job =>
        filters.employmentTypes.includes(job.employmentType)
      );
    }

    // Experience filter from sidebar
    if (filters.experience.length > 0) {
      filtered = filtered.filter(job => {
        if (!job.experience) return false;
        return filters.experience.some(exp => 
          job.experience.includes(exp.split('-')[0])
        );
      });
    }

    // Location filter from sidebar
    if (filters.location) {
      filtered = filtered.filter(job =>
        job.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredJobs = filterJobs();
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage);

  // Handle job click
  const handleViewDetails = (job) => {
    navigate(`/candidate/jobs/${job._id}`);
  };

  // Handle apply
  const handleApply = async (jobId) => {
    await applyForJob(jobId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Enhanced Search Bar */}
      <div className="mb-6">
        <EnhancedSearchBar 
          onSearch={handleSearch}
          initialValues={searchData}
        />
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
        </h2>
        {searchData.query && (
          <p className="text-sm text-gray-600 mt-1">
            Showing results for "{searchData.query}"
          </p>
        )}
      </div>

      {/* Main Content: Filters + Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Filters */}
        <div className="lg:col-span-1">
          <JobFiltersSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            jobCount={filteredJobs.length}
          />
        </div>

        {/* Right Side - Jobs Grid */}
        <div className="lg:col-span-3">
          {jobsLoading ? (
            <LoadingCard message="Loading jobs..." />
          ) : jobsError ? (
            <ErrorState error={jobsError} onRetry={fetchAllJobs} />
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
              {/* Jobs Grid */}
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
        </div>
      </div>
    </div>
  );
};
