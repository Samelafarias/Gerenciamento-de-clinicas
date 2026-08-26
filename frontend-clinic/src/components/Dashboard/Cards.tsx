import React, { useMemo } from "react";
import { FiCalendar, FiUserCheck, FiDollarSign } from "react-icons/fi";
import agendamentos from "../../mocks/agendamentos";
import { getDataISO, formatarMoeda } from "../../utils/data";

const Cards: React.FC = () => {
  const { totalHoje, atendidosHoje, faturamentoHoje } = useMemo(() => {
    const hoje = getDataISO(0);
    const agendamentosHoje = agendamentos.filter((a) => a.data === hoje && a.status !== "Cancelado");
    const atendidos = agendamentosHoje.filter((a) => a.status === "Atendido");
    const faturamento = atendidos.reduce((soma, a) => soma + a.valor, 0);
    return { totalHoje: agendamentosHoje.length, atendidosHoje: atendidos.length, faturamentoHoje: faturamento };
  }, []);

  return (
    <div className="row g-3">
      <div className="col-12 col-sm-6 col-lg-4">
        <div className="bg-white rounded-3 shadow-sm p-3 h-100">
          <div className="d-flex align-items-center gap-2 mb-2">
            <div
              className="rounded-2 d-flex align-items-center justify-content-center"
              style={{ width: 40, height: 40, backgroundColor: "#e0f2fe", color: "#0284c7" }}
            >
              <FiCalendar size={20} />
            </div>
            <span className="text-secondary fw-bold text-uppercase" style={{ fontSize: "13px" }}>
              Agendamentos do Dia
            </span>
          </div>
          <h2 className="fw-bold m-0">{totalHoje}</h2>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-lg-4">
        <div className="bg-white rounded-3 shadow-sm p-3 h-100">
          <div className="d-flex align-items-center gap-2 mb-2">
            <div
              className="rounded-2 d-flex align-items-center justify-content-center"
              style={{ width: 40, height: 40, backgroundColor: "#cff4fc", color: "#0dcaf0" }}
            >
              <FiUserCheck size={20} />
            </div>
            <span className="text-secondary fw-bold text-uppercase" style={{ fontSize: "13px" }}>
              Pacientes Atendidos
            </span>
          </div>
          <h2 className="fw-bold m-0">{atendidosHoje}</h2>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-lg-4">
        <div className="bg-white rounded-3 shadow-sm p-3 h-100">
          <div className="d-flex align-items-center gap-2 mb-2">
            <div
              className="rounded-2 d-flex align-items-center justify-content-center"
              style={{ width: 40, height: 40, backgroundColor: "#e6f4ea", color: "#198754" }}
            >
              <FiDollarSign size={20} />
            </div>
            <span className="text-secondary fw-bold text-uppercase" style={{ fontSize: "13px" }}>
              Faturamento (Hoje)
            </span>
          </div>
          <h2 className="fw-bold m-0">{formatarMoeda(faturamentoHoje)}</h2>
        </div>
      </div>
    </div>
  );
};

export default Cards;