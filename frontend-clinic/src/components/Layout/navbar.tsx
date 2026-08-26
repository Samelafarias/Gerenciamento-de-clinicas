import React, { useState, useRef, useEffect } from "react";
import { FiBell, FiMenu } from "react-icons/fi";
import LogoImg from "../../assets/Logo.png";
import { getUsuarioLogado } from "../../hooks/useAuth";
import { getInitials } from "../../utils/getInitials";
import notificacoesMock, { type Notificacao } from "../../mocks/notificacoes";

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const usuario = getUsuarioLogado();
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>(notificacoesMock);
  const [painelAberto, setPainelAberto] = useState(false);
  const painelRef = useRef<HTMLDivElement>(null);

  const naoLidas = notificacoes.filter((n) => !n.lida).length;

  const marcarComoLida = (id: number) => {
    setNotificacoes((prev) => prev.map((n) => (n.id === id ? { ...n, lida: true } : n)));
  };

  useEffect(() => {
    function handleClickFora(event: MouseEvent) {
      if (painelRef.current && !painelRef.current.contains(event.target as Node)) {
        setPainelAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  return (
    <nav
      className="navbar bg-white border-bottom shadow-sm sticky-top px-3"
      style={{ height: "70px", zIndex: 100 }}
    >
      <div className="d-flex align-items-center gap-3">
        <button
          onClick={onToggleSidebar}
          aria-label="Alternar Menu"
          className="btn text-primary-custom fs-4 p-1 border-0"
        >
          <FiMenu />
        </button>
        <img src={LogoImg} alt="Logo Saúde" style={{ height: "40px", objectFit: "contain" }} />
      </div>

      <div className="d-flex align-items-center gap-3 ms-auto">
        <div className="position-relative" ref={painelRef}>
          <button
            aria-label="Notificações"
            onClick={() => setPainelAberto((prev) => !prev)}
            className="btn text-primary-custom fs-5 position-relative border-0"
          >
            <FiBell />
            {naoLidas > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "10px" }}
              >
                {naoLidas}
              </span>
            )}
          </button>

          {painelAberto && (
            <div
              className="position-absolute end-0 mt-2 bg-white border rounded-3 shadow-lg overflow-auto"
              style={{ width: "320px", maxHeight: "380px", zIndex: 200 }}
            >
              <div className="px-3 py-2 fw-bold text-primary-custom border-bottom small">
                Notificações
              </div>
              {notificacoes.length === 0 ? (
                <div className="text-center text-secondary small py-4">
                  Nenhuma notificação por aqui.
                </div>
              ) : (
                notificacoes.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => marcarComoLida(n.id)}
                    className={`px-3 py-2 border-bottom small ${n.lida ? "bg-white" : "bg-info bg-opacity-10"}`}
                    style={{ cursor: "pointer" }}
                  >
                    <p className="fw-bold text-primary-custom mb-1">{n.titulo}</p>
                    <p className="text-secondary mb-1">{n.mensagem}</p>
                    <span className="text-muted" style={{ fontSize: "11px" }}>
                      {n.data}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="d-flex align-items-center gap-2">
          <div className="d-none d-md-flex flex-column lh-sm">
            <span className="fw-bold text-primary-custom" style={{ fontSize: "13px" }}>
              {usuario?.nome ?? "Usuário"}
            </span>
            <span className="text-secondary" style={{ fontSize: "11px" }}>
              {usuario?.cargo ?? ""}
            </span>
          </div>
          <div className="avatar-circle d-flex align-items-center justify-content-center" title={usuario?.nome ?? "Usuário"}>
            {getInitials(usuario?.nome ?? "US")}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;