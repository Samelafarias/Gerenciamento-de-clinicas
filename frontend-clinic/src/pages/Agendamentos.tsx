import React, { useState, useMemo, useEffect, useRef } from "react";
import { FiCalendar, FiMoreVertical, FiPlus, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import agendamentosMock from "../mocks/agendamentos";
import medicosMock from "../mocks/medicos";
import type { Agendamento, StatusAgendamento } from "../types/agendamento";
import type { NovoAgendamentoForm } from "../types/agendamentoForm";
import { getDataISO } from "../utils/data";
import ModalAgendamento from "../components/Agendamentos/ModalNovoAgendamento/layout";
import ModalCancelar from "../components/Modals/ModalCancelarAtendimento";
import ModalTransferir from "../components/Modals/ModalTransferirAgendamento";
import ModalBloquearHorario from "../components/Modals/ModalBLoquearHorario";

const statusClasses: Record<StatusAgendamento, string> = {
  Confirmado: "bg-success bg-opacity-10 text-success",
  Aguardando: "bg-warning bg-opacity-25 text-warning-emphasis",
  Atendido: "bg-info bg-opacity-10 text-info-emphasis",
  Cancelado: "bg-danger bg-opacity-10 text-danger",
};

export const AgendamentosPage: React.FC = () => {
  const [listaAgendamentos, setListaAgendamentos] = useState<Agendamento[]>(agendamentosMock);
  const [medicoFiltro, setMedicoFiltro] = useState<string>("TODOS");
  const [dataFiltro, setDataFiltro] = useState<string>(getDataISO(0));
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const [isNovoModalOpen, setIsNovoModalOpen] = useState(false);
  const [isBloquearModalOpen, setIsBloquearModalOpen] = useState(false);
  const [agendamentoCancelar, setAgendamentoCancelar] = useState<Agendamento | null>(null);
  const [agendamentoTransferir, setAgendamentoTransferir] = useState<Agendamento | null>(null);
  const [agendamentoEditar, setAgendamentoEditar] = useState<Agendamento | null>(null);

  useEffect(() => {
    function handleClickFora(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  const agendamentosFiltrados = useMemo(() => {
    return listaAgendamentos
      .filter((item) => item.data === dataFiltro)
      .filter((item) => medicoFiltro === "TODOS" || item.medicoId === medicoFiltro)
      .sort((a, b) => a.horario.localeCompare(b.horario));
  }, [listaAgendamentos, medicoFiltro, dataFiltro]);

  const irParaDia = (offset: number) => {
    const atual = new Date(dataFiltro + "T00:00:00");
    atual.setDate(atual.getDate() + offset);
    setDataFiltro(atual.toISOString().split("T")[0]);
  };

  const dataFormatada = useMemo(() => {
    if (dataFiltro === getDataISO(0)) return "Hoje";
    return new Date(dataFiltro + "T00:00:00").toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  }, [dataFiltro]);

  const handleOpenDatePicker = () => {
    if (dateInputRef.current) {
      if ("showPicker" in HTMLInputElement.prototype) {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.click();
      }
    }
  };

  const handleSaveNovoAgendamento = (dados: NovoAgendamentoForm) => {
    const medico = medicosMock.find((m) => m.id === dados.medicoId);
    const [data, horario] = dados.dataHora.split("T");

    const tipoConvertido =
      dados.tipoConsulta === "Consulta" ? "Primeira Consulta" : dados.tipoConsulta;

    const novoItem: Agendamento = {
      id: agendamentoEditar ? agendamentoEditar.id : `agend-${Date.now()}`,
      pacienteId: agendamentoEditar?.pacienteId ?? `#${Math.floor(10000 + Math.random() * 90000)}`,
      pacienteNome: dados.nomeCompleto,
      pacienteCpf: dados.cpf,
      medicoId: dados.medicoId,
      medicoNome: medico?.nome ?? "Médico não informado",
      especialidade: dados.especialidade,
      data,
      horario,
      duracaoMinutos: 30,
      tipo: tipoConvertido as Agendamento["tipo"],
      status: agendamentoEditar?.status ?? "Confirmado",
      valor: Number(dados.valor),
      convenio: agendamentoEditar?.convenio,
      formaPagamento:
        dados.formaPagamento === "Cartao" ? "Cartão" : dados.formaPagamento === "PIX" ? "Pix" : "Dinheiro",
    };

    setListaAgendamentos((prev) =>
      agendamentoEditar
        ? prev.map((item) => (item.id === agendamentoEditar.id ? novoItem : item))
        : [novoItem, ...prev]
    );

    setIsNovoModalOpen(false);
    setAgendamentoEditar(null);
  };

  const handleConfirmCancelar = (id: string, motivo: string) => {
    setListaAgendamentos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Cancelado" as const, motivoCancelamento: motivo } : item
      )
    );
    setAgendamentoCancelar(null);
  };

  const handleSaveTransferir = (id: string, novoMedicoId: string, novaData: string, novoHorario: string) => {
    const medico = medicosMock.find((m) => m.id === novoMedicoId);
    setListaAgendamentos((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              medicoId: novoMedicoId,
              medicoNome: medico ? medico.nome : item.medicoNome,
              especialidade: medico ? medico.especialidade : item.especialidade,
              data: novaData,
              horario: novoHorario,
            }
          : item
      )
    );
    setAgendamentoTransferir(null);
  };

  const handleOpenNovo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAgendamentoEditar(null);
    setIsNovoModalOpen(true);
  };

  const handleOpenEditar = (e: React.MouseEvent, item: Agendamento) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(null);
    setAgendamentoEditar(item);
    setIsNovoModalOpen(true);
  };

  return (
    <div className="main-content container-fluid p-0 position-relative">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <h2 className="fs-8 fw-bold m-0" style={{ color: "#004b87" }}>Agenda de Consultas</h2>

        <div className="d-flex flex-wrap align-items-center gap-2">
          <div className="btn-group bg-white rounded-3 border shadow-sm position-relative" style={{ height: "38px" }}>
            <input
              ref={dateInputRef}
              type="date"
              className="position-absolute opacity-0"
              style={{ pointerEvents: "none", width: 0, height: 0 }}
              value={dataFiltro}
              onChange={(e) => {
                if (e.target.value) {
                  setDataFiltro(e.target.value);
                }
              }}
            />

            <button
              type="button"
              className="btn btn-sm btn-light border-0 px-2 text-secondary d-flex align-items-center"
              onClick={() => irParaDia(-1)}
              title="Dia anterior"
            >
              <FiChevronLeft size={16} />
            </button>

            <button
              type="button"
              className="btn btn-sm btn-light border-0 fw-semibold px-3 text-secondary d-flex align-items-center gap-2"
              onClick={handleOpenDatePicker}
              title="Clique para abrir o calendário"
            >
              <FiCalendar size={15} /> {dataFormatada}
            </button>

            <button
              type="button"
              className="btn btn-sm btn-light border-0 px-2 text-secondary d-flex align-items-center"
              onClick={() => irParaDia(1)}
              title="Próximo dia"
            >
              <FiChevronRight size={16} />
            </button>
          </div>

          <select
            className="form-select form-select-sm bg-white rounded-3 border shadow-sm text-secondary fw-semibold px-3"
            style={{ height: "38px", width: "auto", minWidth: "180px" }}
            value={medicoFiltro}
            onChange={(e) => setMedicoFiltro(e.target.value)}
          >
            <option value="TODOS">Todos os médicos</option>
            {medicosMock.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nome}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="btn btn-sm btn-outline-secondary rounded-3 px-3 fw-semibold"
            style={{ height: "38px" }}
            onClick={() => setIsBloquearModalOpen(true)}
          >
            Bloquear Horário
          </button>

          <button
            type="button"
            className="btn btn-sm btn-primary rounded-3 px-3 fw-semibold shadow-sm d-flex align-items-center gap-2"
            style={{ height: "38px", backgroundColor: "#004b87", borderColor: "#004b87" }}
            onClick={handleOpenNovo}
          >
            <FiPlus size={16} /> Novo Agendamento
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3 shadow-sm p-4 h-100">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr className="text-uppercase text-secondary" style={{ fontSize: "12px", letterSpacing: "0.5px" }}>
                <th className="border-0 ps-3">Horário</th>
                <th className="border-0">Paciente</th>
                <th className="border-0">Tipo</th>
                <th className="border-0">Médico</th>
                <th className="border-0">Status</th>
                <th className="border-0 text-end pe-3" style={{ width: "80px" }}>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {agendamentosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-secondary py-5">
                    Nenhum agendamento encontrado para esta data/filtro.
                  </td>
                </tr>
              ) : (
                agendamentosFiltrados.map((item) => (
                  <tr key={item.id} className="border-bottom">
                    <td className="ps-3 fw-bold text-secondary" style={{ fontSize: "14px" }}>
                      {item.horario}
                    </td>
                    <td>
                      <div className="fw-semibold">{item.pacienteNome}</div>
                      <div className="text-muted" style={{ fontSize: "12px" }}>
                        {item.convenio || "Particular"}
                      </div>
                    </td>
                    <td className="text-secondary" style={{ fontSize: "13px" }}>
                      {item.tipo}
                    </td>
                    <td className="text-secondary" style={{ fontSize: "13px" }}>
                      {item.medicoNome}
                    </td>
                    <td>
                      <span className={`badge rounded-pill fw-semibold px-3 py-2 ${statusClasses[item.status]}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="text-end pe-3 position-relative" ref={activeDropdown === item.id ? dropdownRef : null}>
                      <button
                        type="button"
                        className="btn btn-sm btn-light border-0 text-secondary p-1 rounded-2"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveDropdown(activeDropdown === item.id ? null : item.id);
                        }}
                        aria-label="Opções"
                      >
                        <FiMoreVertical size={18} />
                      </button>

                      {activeDropdown === item.id && (
                        <div
                          className="dropdown-menu show position-absolute end-0 mt-1 shadow-sm border-0 rounded-3 p-1"
                          style={{ zIndex: 1000, minWidth: "160px", backgroundColor: "#ffffff" }}
                        >
                          <button
                            type="button"
                            className="dropdown-item rounded-2 small py-2 text-secondary"
                            onClick={(e) => handleOpenEditar(e, item)}
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            className="dropdown-item rounded-2 small py-2 text-secondary"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setActiveDropdown(null);
                              setAgendamentoTransferir(item);
                            }}
                          >
                            Transferir
                          </button>
                          <div className="dropdown-divider my-1"></div>
                          <button
                            type="button"
                            className="dropdown-item rounded-2 small py-2 text-danger"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setActiveDropdown(null);
                              setAgendamentoCancelar(item);
                            }}
                          >
                            Cancelar
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isNovoModalOpen && (
        <ModalAgendamento
          isOpen={isNovoModalOpen}
          initialData={agendamentoEditar}
          onClose={() => {
            setIsNovoModalOpen(false);
            setAgendamentoEditar(null);
          }}
          onSave={handleSaveNovoAgendamento}
          medicosList={medicosMock}
        />
      )}

      {agendamentoCancelar && (
        <ModalCancelar
          agendamento={agendamentoCancelar}
          isOpen={!!agendamentoCancelar}
          onClose={() => setAgendamentoCancelar(null)}
          onConfirm={handleConfirmCancelar}
        />
      )}

      {agendamentoTransferir && (
        <ModalTransferir
          agendamento={agendamentoTransferir}
          isOpen={!!agendamentoTransferir}
          medicosList={medicosMock}
          onClose={() => setAgendamentoTransferir(null)}
          onSave={handleSaveTransferir}
        />
      )}

      {isBloquearModalOpen && (
        <ModalBloquearHorario
          isOpen={isBloquearModalOpen}
          medicosList={medicosMock}
          onClose={() => setIsBloquearModalOpen(false)}
          onSaveBlock={(dados) => {
            console.log("Bloqueio registrado:", dados);
            setIsBloquearModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default AgendamentosPage;