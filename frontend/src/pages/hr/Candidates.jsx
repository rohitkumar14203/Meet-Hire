import { useState } from "react";
import { mockCandidates } from "../../utils/mockCandidates";
import { CandidateTable } from "../../components/hr/CandidateTable";
import { Layout } from "../../components/layout/Layout";
import { SearchBar } from "../../components/ui/SearchBar";
import { Dropdown } from "../../components/ui/Dropdown";
import { Users, Filter, TrendingUp } from "lucide-react";

export const Candidates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "Pending", label: "Pending" },
    { value: "In Progress", label: "In Progress" },
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
    { value: "Scheduled", label: "Scheduled" },
  ];

  // Filter candidates based on search and status
  const filteredCandidates = mockCandidates.filter((candidate) => {
    const matchesSearch = 
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = !statusFilter || candidate.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: mockCandidates.length,
    pending: mockCandidates.filter(c => c.status === "Pending").length,
    approved: mockCandidates.filter(c => c.status === "Approved").length,
    rejected: mockCandidates.filter(c => c.status === "Rejected").length,
  };

  return (
    <Layout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-xl">
            <Users className="w-8 h-8 text-white" />
          </div>
          Candidates
        </h1>
        <p className="text-gray-600 mt-2">Manage and review all candidate applications</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Candidates</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending Review</p>
              <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-lg">
              <Filter className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Approved</p>
              <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or role..."
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
        {filteredCandidates.length !== mockCandidates.length && (
          <p className="text-sm text-gray-600 mt-3">
            Showing {filteredCandidates.length} of {mockCandidates.length} candidates
          </p>
        )}
      </div>

      {/* Candidates Table */}
      <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">All Candidates</h2>
        <CandidateTable candidates={filteredCandidates} />
      </div>
    </Layout>
  );
};


