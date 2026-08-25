import React from "react";
import styled from "styled-components";
import { FiArrowLeft } from "react-icons/fi";
import { FaTools } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  width: 100%;
  text-align: center;
  padding: 24px 16px;
  background-color: #f9fafb;
  box-sizing: border-box;
`;

const IconWrapper = styled.div`
  background-color: #e0f7fa;
  color: #00a3ad;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  font-size: 48px;
  box-shadow: 0 4px 15px rgba(36, 210, 233, 0.2);

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    font-size: 36px;
    margin-bottom: 20px;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  color: #001f3f;
  margin-bottom: 12px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  color: #6b7280;
  max-width: 450px;
  width: 100%;
  line-height: 1.6;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 24px;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #001f3f;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #00143a;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px; 
    padding: 14px 20px;
  }
`;

interface Props {
  modulo?: string;
  onVoltar?: () => void;
}

const EmConstrucao: React.FC<Props> = ({ modulo = "esta página", onVoltar }) => {
  const navigate = useNavigate(); 

  const handleAction = () => {
    if (onVoltar) {
      onVoltar(); 
    } else {
      navigate("/"); 
    }
  };

  return (
    <Container>
      <IconWrapper>
        <FaTools />
      </IconWrapper>

      <Title>Em Construção</Title>
      <Description>
        Estamos trabalhando arduamente para trazer as melhores funcionalidades para
        <strong> {modulo}</strong>. Em breve, esta seção estará disponível para uso.
      </Description>

      {/* 3. Botão sem a condição para aparecer SEMPRE */}
      <BackButton onClick={handleAction}>
        <FiArrowLeft /> Voltar para o Início
      </BackButton>
    </Container>
  );
};

export default EmConstrucao;