import { useState, useEffect } from "react";
import { Layout } from "../../components/layout/Layout";
import { Button } from "../../components/common/Button";
import { Modal } from "../../components/common/Modal";
import { Table } from "../../components/common/Table";
import { StatusBadge } from "../../components/common/StatusBadge";
import JobForm from "../../components/hr/JobForm";
import { Plus, Briefcase, MapPin, Building2, Users, Calendar, Pencil, Trash2 } from "lucide-react";
import { useJobs } from "../../hooks/useJobs";
import { Alert } from "../../components/common/Alert";
import { DeleteConfirm } from "../../components/common/DeleteConfirm";
import { StatusConfirm } from "../../components/common/StatusConfirm";
import { StatusDropdown } from "../../components/common/StatusDropdown";

const Jobs = () => {
  const { jobs, loading, error, loadJobs, createJob, updateJob, deleteJob } = useJobs();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [jobToUpdateStatus, setJobToUpdateStatus] = useState(null);

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [jobToChangeStatus, setJobToChangeStatus] = useState(null);
  const [nextStatus, setNextStatus] = useState(null);


  useEffect(() => {
    loadJobs();
  }, []);

  const handleCreateJob = async (jobData) => {
    const result = await createJob(jobData);

    if (result.success) {
      setIsModalOpen(false);
      setEditingJob(null);
    } else {
      console.error("Job creation failed:", result.error);
    }
  };

  const handleUpdateJob = async (jobData) => {
    const result = await updateJob(editingJob._id, jobData);

    if (result.success) {
      setIsModalOpen(false);
      setEditingJob(null);
    } else {
      console.error("Job update failed:", result.error);
    }
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const confirmDeleteJob = async () => {
    if (!jobToDelete) return;

    const result = await deleteJob(jobToDelete._id);

    if (result.success) {
      setIsDeleteOpen(false);
      setJobToDelete(null);
    } else {
      console.error("Job deletion failed:", result.error);
    }
  };

  const handleStatusSelect = (job, selectedStatus) => {
    // If same status → do nothing
    if (job.status === selectedStatus) return;

    // Only confirm when closing job
    if (selectedStatus === "CLOSED") {
      setJobToChangeStatus(job);
      setNextStatus("CLOSED");
      setIsStatusModalOpen(true);
    } else {
      // Opening job can be instant (optional confirm)
      updateJob(job._id, { status: "OPEN" });
    }
  };



  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingJob(null);
  };

  const confirmStatusChange = async () => {
    if (!jobToUpdateStatus) return;

    const newStatus =
      jobToUpdateStatus.status === "OPEN" ? "CLOSED" : "OPEN";

    const result = await updateJob(jobToUpdateStatus._id, {
      status: newStatus,
    });

    if (result.success) {
      setIsStatusOpen(false);
      setJobToUpdateStatus(null);
    } else {
      console.error("Status update failed:", result.error);
    }
  };


  const getEmploymentTypeLabel = (type) => {
    const typeMap = {
      FULL_TIME: "Full Time",
      PART_TIME: "Part Time",
      CONTRACT: "Contract",
      INTERN: "Internship"
    };
    return typeMap[type] || type;
  };

  const confirmCloseJob = async () => {
    if (!jobToChangeStatus) return;

    const result = await updateJob(jobToChangeStatus._id, {
      status: nextStatus,
    });

    if (result.success) {
      setIsStatusModalOpen(false);
      setJobToChangeStatus(null);
      setNextStatus(null);
    } else {
      console.error("Failed to update job status");
    }
  };

  const getStatusLabel = (status) => {
    return status === "OPEN" ? "Active" : "Closed";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };



  const jobColumns = [
    {
      key: "title",
      label: "Job Title",
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Briefcase className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500">{getEmploymentTypeLabel(row.employmentType)}</p>
          </div>
        </div>
      ),
    },
    {
      key: "employmentType",
      label: "Type",
      render: (value) => (
        <div className="flex items-center gap-2 text-gray-700">
          <Building2 className="w-4 h-4 text-gray-400" />
          {getEmploymentTypeLabel(value)}
        </div>
      ),
    },
    {
      key: "location",
      label: "Location",
      render: (value) => (
        <div className="flex items-center gap-2 text-gray-700">
          <MapPin className="w-4 h-4 text-gray-400" />
          {value}
        </div>
      ),
    },
    {
      key: "experience",
      label: "Experience",
      render: (value) => (
        <div className="text-gray-700">
          {value}
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "Posted",
      render: (value) => (
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Calendar className="w-4 h-4 text-gray-400" />
          {formatDate(value)}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value, row) => (
        <StatusDropdown
          value={row.status}
          onChange={(selected) =>
            handleStatusSelect(row, selected)
          }
        />
      ),
    },
    {
      key: "_id",
      label: "Actions",
      render: (value, row) => (
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleEditJob(row)}
            icon={Pencil}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              setJobToDelete(row);
              setIsDeleteOpen(true);
            }}
            icon={Trash2}
          >
            Delete
          </Button>

        </div>
      ),
    },
  ];

  return (
    <Layout>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-xl">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            Job Postings
          </h1>
          <p className="text-gray-600 mt-2">Manage all your job postings and track applications</p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)} icon={Plus}>
          Create New Job
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Total Jobs</p>
          <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
        </div>
        <div className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Active Postings</p>
          <p className="text-2xl font-bold text-green-600">{jobs.filter(j => j.status === "OPEN").length}</p>
        </div>
        <div className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Total Applicants</p>
          <p className="text-2xl font-bold text-blue-600">0</p>
        </div>
        <div className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Closed Jobs</p>
          <p className="text-2xl font-bold text-amber-600">{jobs.filter(j => j.status === "CLOSED").length}</p>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">All Job Postings </h2>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading jobs...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : (
          <Table columns={jobColumns} data={jobs} emptyMessage="No jobs posted yet" />
        )}
      </div>

      {/* Modal + Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={editingJob ? "Edit Job Posting" : "Create New Job Posting"}
        size="lg"
      >
        <JobForm
          key={editingJob?._id || 'new'}
          onSubmit={editingJob ? handleUpdateJob : handleCreateJob}
          initialData={editingJob}
          loading={loading}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Confirm Deletion"
        size="sm"
      >
        <DeleteConfirm
          title="Delete Job"
          description={`Are you sure you want to delete "${jobToDelete?.title}"?`}
          onCancel={() => setIsDeleteOpen(false)}
          onConfirm={confirmDeleteJob}
        />
      </Modal>

      <Modal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        title="Confirm Status Change"
        size="sm"
      >
        <div className="space-y-6">
          <p className="text-gray-700">
            Are you sure you want to close the job{" "}
            <span className="font-semibold">
              "{jobToChangeStatus?.title}"
            </span>
            ?
          </p>

          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setIsStatusModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmCloseJob}
            >
              Close Job
            </Button>
          </div>
        </div>
      </Modal>

    </Layout>
  );
};

export default Jobs;
