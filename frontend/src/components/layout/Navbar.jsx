import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { SearchBar } from "../common/SearchBar";
import { useState } from "react";
import { Bell, LogOut, User, ChevronDown, Briefcase } from "lucide-react";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, role, logout } = useAuth();
  const [search, setSearch] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/login");
    }
  };

  return (
    <header className="h-16 bg-white border-b border-blue-100 px-6 flex items-center justify-between shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl text-gray-900">Meet<span className="text-blue-600">Hire</span></span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl mx-8 mt-3">
        <SearchBar
          value={search}
          onChange={handleChange}
          onSearch={() => console.log("Searching:", search)}
          placeholder="Search candidates, jobs, interviews..."
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name || user?.email?.split('@')[0] || "User"}
                </p>
                <p className="text-xs text-gray-500">{role}</p>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-blue-100 py-2 z-50">
              <div className="px-4 py-2 border-b border-blue-100">
                <p className="text-sm font-medium text-gray-900">{user?.email || "user@example.com"}</p>
                <p className="text-xs text-blue-600 mt-1 capitalize">{role} Dashboard</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

