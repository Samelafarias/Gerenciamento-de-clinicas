import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { FaTools } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center p-3 p-sm-4"
      style={{ minHeight: "100dvh", width: "100%", backgroundColor: "#f9fafb" }}
    >
      <div
        className="d-flex align-items-center justify-content-center rounded-circle mb-4"
        style={{
          width: 100,
          height: 100,
          backgroundColor: "#e0f7fa",
          color: "#00a3ad",
          fontSize: "48px",
          boxShadow: "0 4px 15px rgba(36, 210, 233, 0.2)",
        }}
      >
        <FaTools />
      </div>

      <h1 className="fw-bold mb-3" style={{ fontSize: "28px", color: "#004B87" }}>
        Em Construção
      </h1>

      <p
        className="text-secondary mb-4"
        style={{ fontSize: "16px", maxWidth: "450px", width: "100%", lineHeight: 1.6 }}
      >
        Estamos trabalhando arduamente para trazer as melhores funcionalidades para
        <strong> {modulo}</strong>. Em breve, esta seção estará disponível para uso.
      </p>

      <button
        onClick={handleAction}
        className="btn d-flex align-items-center justify-content-center gap-2 fw-semibold px-4 py-3 border-0 text-white"
        style={{ backgroundColor: "#004B87", borderRadius: "8px" }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00143a")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#004B87")}
      >
        <FiArrowLeft /> Voltar para o Início
      </button>
    </div>
  );
};

export default EmConstrucao;