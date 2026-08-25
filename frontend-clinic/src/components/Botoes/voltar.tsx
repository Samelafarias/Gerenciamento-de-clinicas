import React from "react";
import styled from "styled-components";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ButtomContainer = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent; 
  border: 2px solid #004B87; 
  border-radius: 20px; 
  padding: 6px 14px; 
  cursor: pointer; 
  margin: 10px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #004B87;
    
    /* Altera a cor do texto/ícone no hover */
    & > div {
      color: #ffffff;
    }
  }

  &:focus {
    outline: none;
  }
`;

const Text = styled.div`
  display: flex; 
  align-items: center; 
  gap: 6px; 
  font-size: 16px;
  font-weight: 500;
  color: #004B87;
  transition: color 0.2s ease-in-out;
`;

interface BackButtonProps {
  to?: string;
}

const ButaoVoltar: React.FC<BackButtonProps> = ({ to }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    // 1. Se uma rota foi explicitamente informada (ex: to="/"), navega até ela
    if (to) {
      navigate(to);
      return;
    }

    // 2. Sem restrição de login: se houver histórico anterior, volta 1 página
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // 3. Caso o usuário tenha aberto o link diretamente em uma nova aba (sem histórico)
      navigate("/", { replace: true });
    }
  };

  return (
    <ButtomContainer onClick={handleBack} type="button">
      <Text>
        <IoArrowBackCircleSharp size={20} />
        Voltar
      </Text>
    </ButtomContainer>
  );
};

export default ButaoVoltar;