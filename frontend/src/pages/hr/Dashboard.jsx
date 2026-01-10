import { Layout } from "../../components/layout/Layout";
import { DashboardCard } from "../../components/ui/dashboard/DashboardCard";
import { Table } from "../../components/ui/dashboard/Table";
import { StatsGrid } from "../../components/ui/dashboard/StatsGrid";
import { StatusBadge } from "../../components/ui/StatusBadge";


export const HRDashboard = () => {


  const stats = {
    jobs: 5,
    candidates: 24,
    interviews: 8,
    pendingFeedback: 3,
  };

  const columns = [
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
  ];

  return (
    <Layout>
     <h1 className="text-2xl font-semibold mb-6">HR Dashboard</h1>

      <StatsGrid>
        <DashboardCard title="Total Jobs" value={stats.jobs} />
        <DashboardCard title="Candidates" value={stats.candidates} />
        <DashboardCard title="Interviews" value={stats.interviews} />
        <DashboardCard
          title="Pending Feedback"
          value={stats.pendingFeedback}
        />
      </StatsGrid>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold mb-3">
            Today's Interviews
          </h2>
          <Table columns={columns} data={interviews} />
        </div>

      </div>
    </Layout>
  );
};


