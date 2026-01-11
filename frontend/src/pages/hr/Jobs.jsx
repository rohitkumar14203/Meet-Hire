import { useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { Table } from "../../components/ui/Table";
import { StatusBadge } from "../../components/ui/StatusBadge";
import JobForm from "../../components/hr/JobForm";
import { Plus, Briefcase, MapPin, Building2, Users, Calendar } from "lucide-react";

const Jobs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "New York, Remote",
      type: "Full Time",
      applicants: 24,
      postedDate: "2 days ago",
      status: "Approved",
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "San Francisco",
      type: "Full Time",
      applicants: 18,
      postedDate: "1 week ago",
      status: "Approved",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      department: "Design",
      location: "Remote",
      type: "Contract",
      applicants: 31,
      postedDate: "3 days ago",
      status: "Pending",
    },
    {
      id: 4,
      title: "Backend Developer",
      department: "Engineering",
      location: "Austin, TX",
      type: "Full Time",
      applicants: 12,
      postedDate: "5 days ago",
      status: "Approved",
    },
  ]);

  const handleCreateJob = async (jobData) => {
    setLoading(true);
    console.log("New Job Data:", jobData);

    // Simulate API call
    setTimeout(() => {
      const newJob = {
        id: jobs.length + 1,
        ...jobData,
        applicants: 0,
        postedDate: "Just now",
        status: "Pending",
      };
      setJobs([newJob, ...jobs]);
      setLoading(false);
      setIsModalOpen(false);
    }, 800);
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
            <p className="text-xs text-gray-500">{row.type}</p>
          </div>
        </div>
      ),
    },
    {
      key: "department",
      label: "Department",
      render: (value) => (
        <div className="flex items-center gap-2 text-gray-700">
          <Building2 className="w-4 h-4 text-gray-400" />
          {value}
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
      key: "applicants",
      label: "Applicants",
      render: (value) => (
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-600" />
          <span className="font-semibold text-blue-600">{value}</span>
        </div>
      ),
    },
    {
      key: "postedDate",
      label: "Posted",
      render: (value) => (
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Calendar className="w-4 h-4 text-gray-400" />
          {value}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => <StatusBadge status={value} />,
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
          <p className="text-2xl font-bold text-green-600">{jobs.filter(j => j.status === "Approved").length}</p>
        </div>
        <div className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Total Applicants</p>
          <p className="text-2xl font-bold text-blue-600">{jobs.reduce((sum, job) => sum + job.applicants, 0)}</p>
        </div>
        <div className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Pending Review</p>
          <p className="text-2xl font-bold text-amber-600">{jobs.filter(j => j.status === "Pending").length}</p>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">All Job Postings</h2>
        <Table columns={jobColumns} data={jobs} emptyMessage="No jobs posted yet" />
      </div>

      {/* Modal + Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Job Posting"
        size="lg"
      >
        <JobForm onSubmit={handleCreateJob} loading={loading} />
      </Modal>
    </Layout>
  );
};

export default Jobs;
