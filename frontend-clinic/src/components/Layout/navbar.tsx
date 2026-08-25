import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FiBell, FiMenu } from "react-icons/fi";
import LogoImg from "../../assets/Logo.png";
import { getUsuarioLogado } from "../../hooks/useAuth";
import { getInitials } from "../../utils/getInitials";
import notificacoesMock, { type Notificacao } from "../../mocks/notificacoes";

const NavbarContainer = styled.nav`
  height: 70px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  img {
    height: 40px;
    object-fit: contain;
  }
`;

const ToggleBtn = styled.button`
  background: none;
  border: none;
  color: #004b87;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 6px;

  &:hover {
    background-color: #f1f5f9;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const NotificationWrapper = styled.div`
  position: relative;
`;

const NotificationBtn = styled.button`
  background: none;
  border: none;
  color: #004b87;
  font-size: 22px;
  cursor: pointer;
  position: relative;

  &:hover {
    color: #003366;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -4px;
  right: -6px;
  background-color: #dc2626;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  min-width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
`;

const NotificationPanel = styled.div`
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  width: 320px;
  max-height: 380px;
  overflow-y: auto;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border: 1px solid #e5e7eb;
  z-index: 200;
`;

const PanelHeader = styled.div`
  padding: 14px 16px;
  font-weight: 700;
  color: #003366;
  border-bottom: 1px solid #e5e7eb;
  font-size: 14px;
`;

const NotificationItem = styled.div<{ $lida: boolean }>`
  padding: 12px 16px;
  border-bottom: 1px solid #f1f5f9;
  cursor: pointer;
  background-color: ${(props) => (props.$lida ? "#ffffff" : "#f0f9ff")};

  &:hover {
    background-color: #f1f5f9;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const NotifTitle = styled.p`
  margin: 0;
  font-size: 13.5px;
  font-weight: 700;
  color: #003366;
`;

const NotifMessage = styled.p`
  margin: 4px 0 0 0;
  font-size: 13px;
  color: #475569;
`;

const NotifDate = styled.span`
  font-size: 11px;
  color: #94a3b8;
`;

const EmptyState = styled.div`
  padding: 24px 16px;
  text-align: center;
  color: #94a3b8;
  font-size: 13px;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserInfo = styled.div`
  display: none;
  flex-direction: column;
  line-height: 1.2;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const UserName = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #003366;
`;

const UserRole = styled.span`
  font-size: 11px;
  color: #64748b;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #004b87;
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
`;

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
    setNotificacoes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, lida: true } : n))
    );
  };

  const togglePainel = () => setPainelAberto((prev) => !prev);

  // Fecha o painel ao clicar fora dele
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
    <NavbarContainer className="shadow-sm">
      <LeftSection>
        <ToggleBtn onClick={onToggleSidebar} aria-label="Alternar Menu">
          <FiMenu />
        </ToggleBtn>
        <img src={LogoImg} alt="Logo Saúde" />
      </LeftSection>

      <RightSection>
        <NotificationWrapper ref={painelRef}>
          <NotificationBtn aria-label="Notificações" onClick={togglePainel}>
            <FiBell />
            {naoLidas > 0 && <Badge>{naoLidas}</Badge>}
          </NotificationBtn>

          {painelAberto && (
            <NotificationPanel>
              <PanelHeader>Notificações</PanelHeader>
              {notificacoes.length === 0 ? (
                <EmptyState>Nenhuma notificação por aqui.</EmptyState>
              ) : (
                notificacoes.map((n) => (
                  <NotificationItem
                    key={n.id}
                    $lida={n.lida}
                    onClick={() => marcarComoLida(n.id)}
                  >
                    <NotifTitle>{n.titulo}</NotifTitle>
                    <NotifMessage>{n.mensagem}</NotifMessage>
                    <NotifDate>{n.data}</NotifDate>
                  </NotificationItem>
                ))
              )}
            </NotificationPanel>
          )}
        </NotificationWrapper>

        <UserSection>
          <UserInfo>
            <UserName>{usuario?.nome ?? "Usuário"}</UserName>
            <UserRole>{usuario?.cargo ?? ""}</UserRole>
          </UserInfo>
          <UserAvatar title={usuario?.nome ?? "Usuário"}>
            {getInitials(usuario?.nome ?? "US")}
          </UserAvatar>
        </UserSection>
      </RightSection>
    </NavbarContainer>
  );
};

export default Navbar;