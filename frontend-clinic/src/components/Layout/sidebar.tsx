import React from "react";
import { NavLink } from "react-router-dom";
import { FiGrid, FiCalendar, FiBookOpen, FiUser, FiLogOut, FiX } from "react-icons/fi";

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, mobileOpen, onCloseMobile, onLogout }) => {
  const isMobile = window.innerWidth < 768;

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `sidebar-link nav-link d-flex align-items-center gap-2 px-3 py-2 mb-2 ${isActive ? "active" : ""} ${
      collapsed && !mobileOpen ? "justify-content-center" : ""
    }`;

  const handleLinkClick = () => {
    if (isMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Fundo escuro cobrindo 100% da tela no Mobile */}
      {mobileOpen && (
        <div
          className="d-md-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1040 }}
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-white border-end flex-column justify-content-between p-3 ${
          mobileOpen ? "d-flex" : "d-none d-md-flex"
        }`}
        style={{
          position: "fixed",
          /* No mobile vai do topo até o fim da tela. No Desktop fica abaixo da Navbar (70px) */
          top: isMobile ? 0 : "70px",
          left: 0,
          bottom: 0,
          height: isMobile ? "100%" : "calc(100vh - 70px)",
          width: mobileOpen ? "280px" : collapsed ? "80px" : "250px",
          transition: "width 0.3s ease, transform 0.3s ease",
          zIndex: isMobile ? 1050 : 1030,
          overflowY: "auto",
        }}
      >
        <div>
          {/* Cabeçalho exclusivo para Mobile com botão de fechar */}
          {isMobile && (
            <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom">
              <span className="fw-bold text-primary-custom fs-5">Menu</span>
              <button onClick={onCloseMobile} className="btn btn-sm btn-light border-0">
                <FiX size={22} />
              </button>
            </div>
          )}

          <ul className="nav flex-column">
            <li>
              <NavLink to="/dashboard" className={linkClass} onClick={handleLinkClick}>
                <FiGrid size={20} />
                {(!collapsed || mobileOpen) && <span>Dashboard</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/agendamentos" className={linkClass} onClick={handleLinkClick}>
                <FiCalendar size={20} />
                {(!collapsed || mobileOpen) && <span>Agendamentos</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/historico-pacientes" className={linkClass} onClick={handleLinkClick}>
                <FiBookOpen size={20} />
                {(!collapsed || mobileOpen) && <span>Histórico de pacientes</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/em-construcao" className={linkClass} onClick={handleLinkClick}>
                <FiUser size={20} />
                {(!collapsed || mobileOpen) && <span>Médicos</span>}
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <hr className="text-secondary opacity-25 my-3" />
          <button
            onClick={() => {
              handleLinkClick();
              onLogout?.();
            }}
            className={`logout-link btn w-100 d-flex align-items-center gap-2 px-3 py-2 border-0 ${
              collapsed && !mobileOpen ? "justify-content-center" : ""
            }`}
          >
            <FiLogOut size={20} />
            {(!collapsed || mobileOpen) && <span>Sair</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;