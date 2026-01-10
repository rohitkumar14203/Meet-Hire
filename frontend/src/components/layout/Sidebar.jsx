import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const menuConfig = {
  HR: [
    { label: "Dashboard", path: "/hr/dashboard" },
    { label: "Jobs", path: "/hr/jobs" },
    { label: "Candidates", path: "/hr/candidates" },
    { label: "Interviews", path: "/hr/interviews" },
  ],
  INTERVIEWER: [
    { label: "Dashboard", path: "/interviewer/dashboard" },
    { label: "My Availability", path: "/interviewer/availability" },
    { label: "Interviews", path: "/interviewer/interviews" },
  ],
  CANDIDATE: [
    { label: "Dashboard", path: "/candidate/dashboard" },
    { label: "My Interviews", path: "/candidate/interviews" },
  ],
};

export const Sidebar = () => {
  const { role } = useAuth();

  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-4 font-bold text-lg text-primary">
        Meet-Hire
      </div>

      <nav className="mt-4 space-y-1">
        {menuConfig[role]?.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 text-sm rounded transition ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
