import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Calendar, 
  Clock,
  FileText
} from "lucide-react";

const menuConfig = {
  HR: [
    { label: "Dashboard", path: "/hr/dashboard", icon: LayoutDashboard },
    { label: "Jobs", path: "/hr/jobs", icon: Briefcase },
    { label: "Candidates", path: "/hr/candidates", icon: Users },
    { label: "Interviews", path: "/hr/interviews", icon: Calendar },
  ],
  INTERVIEWER: [
    { label: "Dashboard", path: "/interviewer/dashboard", icon: LayoutDashboard },
    { label: "My Availability", path: "/interviewer/availability", icon: Clock },
    { label: "Interviews", path: "/interviewer/interviews", icon: Calendar },
  ],
  CANDIDATE: [
    { label: "Dashboard", path: "/candidate/dashboard", icon: LayoutDashboard },
    { label: "My Interviews", path: "/candidate/interviews", icon: Calendar },
    { label: "Applications", path: "/candidate/applications", icon: FileText },
  ],
};

export const Sidebar = () => {
  const { role } = useAuth();

  return (
    <aside className="w-64 bg-gradient-to-b from-white to-blue-50/30 border-r border-blue-100 h-full">
      {/* Brand Section */}
      <div className="p-6 border-b border-blue-100">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-900">
              Meet<span className="text-blue-600">Hire</span>
            </h1>
            <p className="text-xs text-gray-500 capitalize">{role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {menuConfig[role]?.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-500"}`} />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>


    </aside>
  );
};
