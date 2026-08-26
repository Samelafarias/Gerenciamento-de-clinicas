import React, { useEffect } from "react";
import { FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi";

interface Props {
  mensagem: string;
  tipo: "sucesso" | "erro";
  onClose: () => void;
}

export const ModalStatusNotificacoes: React.FC<Props> = ({ mensagem, tipo, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSucesso = tipo === "sucesso";

  return (
    <div
      className={`toast-notificacao position-fixed bottom-0 end-0 m-4 p-3 rounded-3 shadow text-white d-flex align-items-center justify-content-between gap-3 ${
        isSucesso ? "bg-success" : "bg-danger"
      }`}
    >
      <div className="d-flex align-items-center gap-2">
        {isSucesso ? <FiCheckCircle size={20} /> : <FiAlertCircle size={20} />}
        <span className="fw-semibold small">{mensagem}</span>
      </div>
      <button
        type="button"
        className="btn-close btn-close-white ms-2"
        onClick={onClose}
        aria-label="Fechar"
      />
    </div>
  );
};

export default ModalStatusNotificacoes;