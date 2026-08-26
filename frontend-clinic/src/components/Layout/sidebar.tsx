import React from "react";
import { NavLink } from "react-router-dom";
import { FiGrid, FiCalendar, FiBookOpen, FiUser, FiLogOut } from "react-icons/fi";

interface SidebarProps {
  collapsed: boolean;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onLogout }) => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `sidebar-link nav-link d-flex align-items-center gap-2 px-3 py-2 mb-3 ${isActive ? "active" : ""} ${
      collapsed ? "justify-content-center" : ""
    }`;

  return (
    <aside
      className="d-none d-md-flex bg-white border-end flex-column justify-content-between p-3"
      style={{ position: "fixed", top: "70px", left: 0, height: "calc(100vh - 70px)", width: collapsed ? "80px" : "250px", transition: "width 0.3s ease", zIndex: 1000, overflowY: "auto" }}>
      <ul className="nav flex-column gap-10">
        <li>
          <NavLink to="/dashboard" className={linkClass}>
            <FiGrid size={20} />
            {!collapsed && <span>Dashboard</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/agendamentos" className={linkClass}>
            <FiCalendar size={20} />
            {!collapsed && <span>Agendamentos</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/historico" className={linkClass}>
            <FiBookOpen size={20} />
            {!collapsed && <span>Histórico de pacientes</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/em-construcao" className={linkClass}>
            <FiUser size={20} />
            {!collapsed && <span>Médicos</span>}
          </NavLink>
        </li>
      </ul>

      <div>
        <hr className="text-secondary opacity-25 my-3" />
        <button
          onClick={onLogout}
          className={`logout-link btn w-100 d-flex align-items-center gap-2 px-3 py-2 border-0 ${
            collapsed ? "justify-content-center" : ""
          }`}
        >
          <FiLogOut size={20} />
          {!collapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;