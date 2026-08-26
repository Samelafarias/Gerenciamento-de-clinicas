import React, { useState } from "react";
import { FiAlertCircle, FiInfo, FiVolume2, FiX } from "react-icons/fi";
import avisosMock from "../../mocks/avisos";
import type { Aviso, TipoAviso } from "../../mocks/avisos";

const estiloPorTipo: Record<TipoAviso, { bg: string; color: string; icone: React.ReactNode }> = {
  danger: { bg: "#fff5f5", color: "#e53e3e", icone: <FiAlertCircle /> },
  info: { bg: "#f0f7ff", color: "#3182ce", icone: <FiInfo /> },
  cyan: { bg: "#e6f8fa", color: "#00a3ad", icone: <FiVolume2 /> },
};

const Avisos: React.FC = () => {
  const [avisos, setAvisos] = useState<Aviso[]>(avisosMock);

  const dispensarAviso = (id: number) => {
    setAvisos((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="bg-white rounded-3 shadow-sm p-4 h-100 d-flex flex-column gap-3">
      <h3 className="fs-5 fw-bold m-0">Avisos e Lembretes</h3>

      {avisos.length === 0 ? (
        <p className="text-secondary text-center py-4 m-0">Nenhum aviso no momento.</p>
      ) : (
        avisos.map((aviso) => {
          const estilo = estiloPorTipo[aviso.tipo];
          return (
            <div
              key={aviso.id}
              className="rounded-3 p-3 d-flex gap-2 position-relative"
              style={{ backgroundColor: estilo.bg }}
            >
              <div style={{ color: estilo.color, fontSize: "20px", marginTop: "2px" }}>{estilo.icone}</div>
              <div className="flex-grow-1">
                <h4 className="fw-bold m-0" style={{ fontSize: "14px", color: "#2d3748" }}>
                  {aviso.titulo}
                </h4>
                <p className="m-0 text-secondary" style={{ fontSize: "13px" }}>
                  {aviso.mensagem}
                </p>
              </div>
              <button
                onClick={() => dispensarAviso(aviso.id)}
                aria-label="Dispensar aviso"
                title="Dispensar"
                className="btn btn-sm border-0 text-secondary p-1 align-self-start"
              >
                <FiX size={16} />
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Avisos;