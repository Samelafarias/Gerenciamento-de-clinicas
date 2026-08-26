import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { logout } from "../../hooks/useAuth";

const MainLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const handleToggleSidebar = () => {
    if (window.innerWidth < 768) {
      setMobileOpen((prev) => !prev);
    } else {
      setSidebarCollapsed((prev) => !prev);
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <Navbar onToggleSidebar={handleToggleSidebar} />

      <Sidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        onLogout={handleLogout}
      />

      <main
        style={{
          paddingTop: "70px",
          paddingLeft: window.innerWidth >= 768 ? (sidebarCollapsed ? "80px" : "250px") : "0px",
          transition: "padding-left 0.3s ease",
          minHeight: "100vh",
          boxSizing: "border-box",
        }}
        className="p-3 p-md-4"
      >
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;