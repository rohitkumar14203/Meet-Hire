import { Layout } from "../../components/layout/Layout";
import { DashboardCard } from "../../components/common/dashboard/DashboardCard";
import { Table } from "../../components/common/Table";
import { StatsGrid } from "../../components/common/dashboard/StatsGrid";
import { StatusBadge } from "../../components/common/StatusBadge";
import { Button } from "../../components/common/Button";
import { 
  Briefcase, 
  Users, 
  Calendar, 
  Clock, 
  TrendingUp,
  Plus,
  FileText,
  UserCheck,
  AlertCircle
} from "lucide-react";

export const HRDashboard = () => {
  const stats = {
    jobs: 5,
    candidates: 24,
    interviews: 8,
    pendingFeedback: 3,
  };

  const interviewColumns = [
    { key: "candidate", label: "Candidate" },
    { key: "role", label: "Role" },
    { key: "time", label: "Time" },
    {
      key: "status",
      label: "Status",
      render: (value) => <StatusBadge status={value} />,
    },
  ];

  const interviews = [
    {
      candidate: "Amit Sharma",
      role: "Frontend Developer",
      time: "10:30 AM",
      status: "Scheduled",
    },
    {
      candidate: "Priya Singh",
      role: "Backend Developer",
      time: "12:00 PM",
      status: "Completed",
    },
    {
      candidate: "Rahul Kumar",
      role: "Full Stack Developer",
      time: "2:30 PM",
      status: "Scheduled",
    },
  ];

  const recentApplicationsColumns = [
    { key: "name", label: "Candidate Name" },
    { key: "position", label: "Position" },
    { key: "experience", label: "Experience" },
    {
      key: "status",
      label: "Status",
      render: (value) => <StatusBadge status={value} />,
    },
  ];

  const recentApplications = [
    {
      name: "Sarah Johnson",
      position: "Senior UI/UX Designer",
      experience: "5 years",
      status: "Pending",
    },
    {
      name: "Michael Chen",
      position: "DevOps Engineer",
      experience: "4 years",
      status: "In Progress",
    },
    {
      name: "Emily Davis",
      position: "Product Manager",
      experience: "7 years",
      status: "Approved",
    },
  ];

  const upcomingTasksColumns = [
    { key: "task", label: "Task" },
    { key: "deadline", label: "Deadline" },
    { key: "priority", label: "Priority" },
  ];

  const upcomingTasks = [
    {
      task: "Review Frontend Developer applications",
      deadline: "Today, 5:00 PM",
      priority: "High",
    },
    {
      task: "Schedule interviews for Backend role",
      deadline: "Tomorrow",
      priority: "Medium",
    },
    {
      task: "Update job descriptions",
      deadline: "Jan 15",
      priority: "Low",
    },
  ];

  return (
    <Layout>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-xl">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            HR Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={FileText}>
            Reports
          </Button>
          <Button variant="primary" icon={Plus}>
            New Job Post
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <StatsGrid>
        <DashboardCard 
          title="Active Jobs" 
          value={stats.jobs} 
          icon={Briefcase}
          color="blue"
          trend="up"
          trendValue="+2 this week"
        />
        <DashboardCard 
          title="Total Candidates" 
          value={stats.candidates} 
          icon={Users}
          color="green"
          trend="up"
          trendValue="+12 new"
        />
        <DashboardCard 
          title="Scheduled Interviews" 
          value={stats.interviews} 
          icon={Calendar}
          color="purple"
          subtitle="3 today"
        />
        <DashboardCard
          title="Pending Feedback"
          value={stats.pendingFeedback}
          icon={Clock}
          color="amber"
          subtitle="Needs attention"
        />
      </StatsGrid>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Today's Interviews - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Today's Interviews
              </h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <Table columns={interviewColumns} data={interviews} emptyMessage="No interviews scheduled for today" />
          </div>

          {/* Recent Applications */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-600" />
                Recent Applications
              </h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <Table 
              columns={recentApplicationsColumns} 
              data={recentApplications} 
              emptyMessage="No recent applications"
            />
          </div>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button 
                variant="secondary" 
                icon={Plus} 
                className="w-full bg-white text-blue-700 hover:bg-blue-50"
              >
                Post New Job
              </Button>
              <Button 
                variant="secondary" 
                icon={Calendar} 
                className="w-full bg-white/10 text-white hover:bg-white/20 border-white/20"
              >
                Schedule Interview
              </Button>
              <Button 
                variant="secondary" 
                icon={Users} 
                className="w-full bg-white/10 text-white hover:bg-white/20 border-white/20"
              >
                Review Candidates
              </Button>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900">
              <Clock className="w-5 h-5 text-blue-600" />
              Upcoming Tasks
            </h3>
            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <div 
                  key={index} 
                  className="p-3 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  <p className="text-sm font-medium text-gray-900">{task.task}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-600">{task.deadline}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      task.priority === "High" 
                        ? "bg-red-100 text-red-700" 
                        : task.priority === "Medium"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-green-100 text-green-700"
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};


