import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FiGrid, FiCalendar, FiBookOpen, FiUser, FiLogOut } from "react-icons/fi";

interface SidebarContainerProps {
  $collapsed: boolean;
}

const SidebarContainer = styled.aside<SidebarContainerProps>`
  width: ${(props) => (props.$collapsed ? "80px" : "250px")};
  min-height: calc(100vh - 70px);
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 12px;
  transition: width 0.3s ease;
  box-sizing: border-box;

  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    bottom: 0;
    left: 0;
    z-index: 99;
    transform: ${(props) => (props.$collapsed ? "translateX(-100%)" : "translateX(0)")};
    width: 240px;
  }
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledNavLink = styled(NavLink)<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  color: #004b87;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  white-space: nowrap;
  transition: all 0.2s ease;
  justify-content: ${(props) => (props.$collapsed ? "center" : "flex-start")};

  &.active {
    background-color: #bce7ef;
    color: #004b87;
  }

  &:hover:not(.active) {
    background-color: #f1f5f9;
  }

  svg {
    font-size: 20px;
    flex-shrink: 0;
  }
`;

const LogoutButton = styled.button<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: none;
  background: transparent;
  color: #dc2626;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  border-radius: 12px;
  justify-content: ${(props) => (props.$collapsed ? "center" : "flex-start")};
  width: 100%;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #fee2e2;
    color: #dc2626;
  }

  svg {
    font-size: 20px;
    flex-shrink: 0;
  }
`;

interface SidebarProps {
  collapsed: boolean;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onLogout }) => {
  return (
    <SidebarContainer $collapsed={collapsed}>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard" $collapsed={collapsed}>
            <FiGrid />
            {!collapsed && <span>Dashboard</span>}
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/agendamentos" $collapsed={collapsed}>
            <FiCalendar />
            {!collapsed && <span>Agendamentos</span>}
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/historico" $collapsed={collapsed}>
            <FiBookOpen />
            {!collapsed && <span>Histórico de pacientes</span>}
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/medicos" $collapsed={collapsed}>
            <FiUser />
            {!collapsed && <span>Médicos</span>}
          </StyledNavLink>
        </li>
      </NavList>

      <div>
        <hr className="text-secondary opacity-25 my-3" />
        <LogoutButton $collapsed={collapsed} onClick={onLogout}>
          <FiLogOut />
          {!collapsed && <span>Sair</span>}
        </LogoutButton>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;