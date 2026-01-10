import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { SearchBar } from "../ui/SearchBar";
import { useState } from "react";

export const Navbar = () => {
  const { user, role, logout } = useAuth();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  return (
    <header className="h-14 bg-white border-b px-6 flex items-center justify-between">

      <div className="flex justify-center items-center mt-5">
        <SearchBar
          value={search}
          onChange={handleChange}
          onSearch={() => console.log("Searching:", search)}
          placeholder="Search candidates..."

        />
      </div>



      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {user?.email || "User"}
        </span>

        <h1 className="font-semibold text-gray-800">
          {role} Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="text-sm text-red-600 hover:underline"
        >


          Logout
        </button>
      </div>
    </header>
  );
};

