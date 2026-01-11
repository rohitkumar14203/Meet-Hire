import { useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { Table } from "../../components/ui/Table";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { SearchBar } from "../../components/ui/SearchBar";
import { Dropdown } from "../../components/ui/Dropdown";
import { Calendar, Plus, Clock, Users, Video, MapPin, User } from "lucide-react";
import ScheduleInterviewForm from "../../components/hr/ScheduleInterviewForm";

export const Interviews = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const [interviews, setInterviews] = useState([
    {
      id: 1,
      candidateName: "Alice Johnson",
      role: "Senior Frontend Developer",
      interviewer: "John Doe",
      date: "2026-01-12",
      time: "10:00 AM",
      type: "Technical",
      mode: "Video Call",
      status: "Scheduled",
    },
    {
      id: 2,
      candidateName: "Bob Smith",
      role: "Product Manager",
      interviewer: "Jane Smith",
      date: "2026-01-12",
      time: "2:00 PM",
      type: "Behavioral",
      mode: "In-Person",
      status: "Scheduled",
    },
    {
      id: 3,
      candidateName: "Charlie Davis",
      role: "UI/UX Designer",
      interviewer: "Mike Johnson",
      date: "2026-01-11",
      time: "11:00 AM",
      type: "Portfolio Review",
      mode: "Video Call",
      status: "Completed",
    },
    {
      id: 4,
      candidateName: "Diana Prince",
      role: "Backend Developer",
      interviewer: "Sarah Wilson",
      date: "2026-01-13",
      time: "3:30 PM",
      type: "Technical",
      mode: "Video Call",
      status: "Scheduled",
    },
    {
      id: 5,
      candidateName: "Ethan Hunt",
      role: "DevOps Engineer",
      interviewer: "Tom Anderson",
      date: "2026-01-10",
      time: "4:00 PM",
      type: "Technical",
      mode: "Phone",
      status: "Cancelled",
    },
  ]);

  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "Scheduled", label: "Scheduled" },
    { value: "Completed", label: "Completed" },
    { value: "Cancelled", label: "Cancelled" },
    { value: "In Progress", label: "In Progress" },
  ];

  const filteredInterviews = interviews.filter((interview) => {
    const matchesSearch =
      interview.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.interviewer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = !statusFilter || interview.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleScheduleInterview = async (interviewData) => {
    setLoading(true);
    console.log("Schedule Interview:", interviewData);

    setTimeout(() => {
      const newInterview = {
        id: interviews.length + 1,
        ...interviewData,
        status: "Scheduled",
      };
      setInterviews([newInterview, ...interviews]);
      setLoading(false);
      setIsModalOpen(false);
    }, 800);
  };

  const interviewColumns = [
    {
      key: "candidate",
      label: "Candidate",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
            {row.candidateName.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{row.candidateName}</p>
            <p className="text-xs text-gray-500">{row.role}</p>
          </div>
        </div>
      ),
    },
    {
      key: "interviewer",
      label: "Interviewer",
      render: (value) => (
        <div className="flex items-center gap-2 text-gray-700">
          <User className="w-4 h-4 text-blue-600" />
          {value}
        </div>
      ),
    },
    {
      key: "dateTime",
      label: "Date & Time",
      render: (_, row) => (
        <div>
          <div className="flex items-center gap-2 text-gray-900 font-medium">
            <Calendar className="w-4 h-4 text-blue-600" />
            {row.date}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <Clock className="w-3 h-3" />
            {row.time}
          </div>
        </div>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (value) => (
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
          {value}
        </span>
      ),
    },
    {
      key: "mode",
      label: "Mode",
      render: (value) => (
        <div className="flex items-center gap-2 text-gray-700">
          {value === "Video Call" ? (
            <Video className="w-4 h-4 text-green-600" />
          ) : value === "In-Person" ? (
            <MapPin className="w-4 h-4 text-blue-600" />
          ) : (
            <Users className="w-4 h-4 text-purple-600" />
          )}
          <span className="text-sm">{value}</span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => <StatusBadge status={value} />,
    },
  ];

  // Calculate stats
  const stats = {
    total: interviews.length,
    scheduled: interviews.filter((i) => i.status === "Scheduled").length,
    completed: interviews.filter((i) => i.status === "Completed").length,
    cancelled: interviews.filter((i) => i.status === "Cancelled").length,
  };

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-xl">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            Interviews
          </h1>
          <p className="text-gray-600 mt-2">Schedule and manage all interviews</p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)} icon={Plus}>
          Schedule Interview
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Interviews</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Scheduled</p>
              <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Completed</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Cancelled</p>
              <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by candidate, role, or interviewer..."
            />
          </div>
          <div className="md:w-64">
            <Dropdown
              label="Filter by Status"
              options={statusOptions}
              value={statusFilter}
              onSelect={setStatusFilter}
            />
          </div>
        </div>
        {filteredInterviews.length !== interviews.length && (
          <p className="text-sm text-gray-600 mt-3">
            Showing {filteredInterviews.length} of {interviews.length} interviews
          </p>
        )}
      </div>

      {/* Interviews Table */}
      <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">All Interviews</h2>
        <Table
          columns={interviewColumns}
          data={filteredInterviews}
          emptyMessage="No interviews scheduled"
        />
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule New Interview"
        size="lg"
      >
        <ScheduleInterviewForm onSubmit={handleScheduleInterview} loading={loading} />
      </Modal>
    </Layout>
  );
};