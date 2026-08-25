import React, { useState } from "react";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { logout } from "../../hooks/useAuth";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8fafc;
`;

const ContentBody = styled.div`
  display: flex;
  flex: 1;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
`;

const MainLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <LayoutWrapper>
      <Navbar onToggleSidebar={toggleSidebar} />

      <ContentBody>
        <Sidebar collapsed={sidebarCollapsed} onLogout={handleLogout} />

        <MainContent>
          <Outlet />
        </MainContent>
      </ContentBody>
    </LayoutWrapper>
  );
};

export default MainLayout;