import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { logout } from "../../hooks/useAuth";

const MainLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: "#f8fafc" }}>
      <Navbar onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)} />
      <div className="d-flex flex-fill">
        <Sidebar collapsed={sidebarCollapsed} onLogout={handleLogout} />
        <main className="flex-fill p-4" style={{ overflowY: "auto" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;