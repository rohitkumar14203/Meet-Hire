import {Sidebar} from "./Sidebar";
import {Navbar} from "./Navbar";

export const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50/30 via-white to-blue-50/20">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

