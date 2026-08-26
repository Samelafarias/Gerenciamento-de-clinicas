import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import agendamentosMock from "../../mocks/agendamentos";
import { getDataISO } from "../../utils/data";
import type { StatusAgendamento } from "../../types/agendamento";

const statusClasses: Record<StatusAgendamento, string> = {
  Confirmado: "bg-success bg-opacity-10 text-success",
  Aguardando: "bg-warning bg-opacity-25 text-warning-emphasis",
  Atendido: "bg-info bg-opacity-10 text-info-emphasis",
  Cancelado: "bg-danger bg-opacity-10 text-danger",
};

const Agendamentos: React.FC = () => {
  const agendaHoje = useMemo(() => {
    const hoje = getDataISO(0);
    return agendamentosMock
      .filter((a) => a.data === hoje && a.status !== "Cancelado")
      .sort((a, b) => a.horario.localeCompare(b.horario));
  }, []);

  return (
    <div className="bg-white rounded-3 shadow-sm p-4 h-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fs-5 fw-bold m-0">Agenda do Dia</h3>
        <Link to="/agendamentos" className="link-accent text-decoration-none small">
          Ver Todos
        </Link>
      </div>

      <div className="d-flex flex-column gap-2">
        {agendaHoje.length === 0 ? (
          <p className="text-secondary text-center py-4 m-0">Nenhum agendamento para hoje.</p>
        ) : (
          agendaHoje.map((agendamento) => (
            <div
              key={agendamento.id}
              className="border rounded-3 p-3 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2"
              style={{ backgroundColor: "#f8fafc" }}
            >
              <div style={{ minWidth: "70px" }}>
                <div className="fw-bold text-secondary" style={{ fontSize: "14px" }}>
                  {agendamento.horario}
                </div>
                <div className="text-muted" style={{ fontSize: "12px" }}>
                  {agendamento.duracaoMinutos} min
                </div>
              </div>

              <div className="flex-grow-1">
                <div className="fw-semibold">{agendamento.pacienteNome}</div>
                <div className="text-secondary" style={{ fontSize: "13px" }}>
                  {agendamento.especialidade} — {agendamento.medicoNome}
                </div>
              </div>

              <span className={`badge rounded-pill fw-semibold px-3 py-2 ${statusClasses[agendamento.status]}`}>
                {agendamento.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Agendamentos;