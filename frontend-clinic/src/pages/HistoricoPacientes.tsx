import React, { useState, useMemo } from "react";
import { FiSearch, FiEdit2, FiDownload, FiEye } from "react-icons/fi";
import agendamentosMock from "../mocks/agendamentos";
import medicosMock from "../mocks/medicos";
import type { Agendamento } from "../types/agendamento";
import type { NovoAgendamentoForm } from "../types/agendamentoForm";
import ModalHistoricoPaciente from "../components/HistoricoPacientes/ModalHistoricoPaciente";
import ModalStatusNotificacoes from "../components/Modals/ModalStatusNoticacoes";
import ModalAgendamento from "../components/Agendamentos/ModalNovoAgendamento/layout";

export const HistoricoPacientePage: React.FC = () => {
  const [lista, setLista] = useState<Agendamento[]>(agendamentosMock);

  const [busca, setBusca] = useState("");
  const [medicoFiltro, setMedicoFiltro] = useState("TODOS");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [pacienteHistorico, setPacienteHistorico] = useState<{ nome: string; cpf: string } | null>(null);
  const [agendamentoEditar, setAgendamentoEditar] = useState<Agendamento | null>(null);
  const [toast, setToast] = useState<{ mensagem: string; tipo: "sucesso" | "erro" } | null>(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  const agendamentosFiltrados = useMemo(() => {
    return lista.filter((item) => {
      const matchBusca =
        item.pacienteNome.toLowerCase().includes(busca.toLowerCase()) ||
        item.pacienteCpf.includes(busca) ||
        item.pacienteId.toLowerCase().includes(busca.toLowerCase());

      const matchMedico = medicoFiltro === "TODOS" || item.medicoId === medicoFiltro;
      const matchDataInicio = !dataInicio || item.data >= dataInicio;
      const matchDataFim = !dataFim || item.data <= dataFim;

      return matchBusca && matchMedico && matchDataInicio && matchDataFim;
    });
  }, [lista, busca, medicoFiltro, dataInicio, dataFim]);

  const totalPaginas = Math.max(Math.ceil(agendamentosFiltrados.length / itensPorPagina), 1);
  const paginaSegura = Math.min(paginaAtual, totalPaginas);

  const dadosPaginados = useMemo(() => {
    const inicio = (paginaSegura - 1) * itensPorPagina;
    return agendamentosFiltrados.slice(inicio, inicio + itensPorPagina);
  }, [agendamentosFiltrados, paginaSegura]);

  const historicoPacienteSelecionado = useMemo(() => {
    if (!pacienteHistorico) return [];
    return lista
      .filter((i) => i.pacienteCpf === pacienteHistorico.cpf)
      .sort((a, b) => (a.data + a.horario < b.data + b.horario ? 1 : -1));
  }, [lista, pacienteHistorico]);

  const handleExportarCSV = () => {
    if (agendamentosFiltrados.length === 0) {
      setToast({ mensagem: "Nenhum registro para exportar com os filtros atuais.", tipo: "erro" });
      return;
    }

    const cabecalho = ["Paciente", "CPF", "Data", "Horario", "Medico", "Status", "Valor"];
    const linhas = agendamentosFiltrados.map((item) =>
      [
        item.pacienteNome,
        item.pacienteCpf,
        item.data,
        item.horario,
        item.medicoNome,
        item.status,
        item.valor.toFixed(2).replace(".", ","),
      ].join(";")
    );

    const conteudoCsv = [cabecalho.join(";"), ...linhas].join("\n");
    const blob = new Blob(["\uFEFF" + conteudoCsv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `agendamentos_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    setToast({ mensagem: "Relatório CSV exportado com sucesso!", tipo: "sucesso" });
  };

  const handleSaveEdicao = (dados: NovoAgendamentoForm) => {
    if (!agendamentoEditar) return;

    try {
      const medico = medicosMock.find((m) => m.id === dados.medicoId);
      const [data, horario] = dados.dataHora.split("T");

      const atualizado: Agendamento = {
        ...agendamentoEditar,
        pacienteNome: dados.nomeCompleto,
        pacienteCpf: dados.cpf,
        medicoId: dados.medicoId,
        medicoNome: medico?.nome ?? agendamentoEditar.medicoNome,
        especialidade: medico?.especialidade ?? agendamentoEditar.especialidade,
        data: data || agendamentoEditar.data,
        horario: horario || agendamentoEditar.horario,
        valor: Number(dados.valor),
        formaPagamento:
          dados.formaPagamento === "Cartao" ? "Cartão" : dados.formaPagamento === "PIX" ? "Pix" : "Dinheiro",
      };

      setLista((prev) => prev.map((item) => (item.id === agendamentoEditar.id ? atualizado : item)));
      setToast({ mensagem: "Agendamento e cobrança atualizados com sucesso!", tipo: "sucesso" });
      setAgendamentoEditar(null);
    } catch {
      setToast({ mensagem: "Erro ao salvar alterações. Verifique os dados.", tipo: "erro" });
    }
  };

  const statusBadgeClasses: Record<Agendamento["status"], string> = {
    Confirmado: "bg-success bg-opacity-10 text-success",
    Aguardando: "bg-warning bg-opacity-25 text-warning-emphasis",
    Atendido: "bg-info bg-opacity-10 text-info-emphasis",
    Cancelado: "bg-danger bg-opacity-10 text-danger",
  };

  return (
    <div className="main-content container-fluid p-0 position-relative">
      <div className="mb-4">
        <h2 className="fs-4 fw-bold m-0" style={{ color: "#004b87" }}>
          Consulta de Prontuários e Agendamentos
        </h2>
      </div>

      <div className="bg-white rounded-3 shadow-sm p-3 mb-4">
        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <label className="form-label small fw-semibold text-secondary mb-1">Buscar Paciente</label>
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-white border-end-0">
                <FiSearch className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control form-control-sm border-start-0 ps-0"
                placeholder="Nome, ID ou CPF..."
                value={busca}
                onChange={(e) => {
                  setBusca(e.target.value);
                  setPaginaAtual(1);
                }}
              />
            </div>
          </div>

          <div className="col-md-3">
            <label className="form-label small fw-semibold text-secondary mb-1">Filtrar por Médico</label>
            <select
              className="form-select form-select-sm"
              value={medicoFiltro}
              onChange={(e) => {
                setMedicoFiltro(e.target.value);
                setPaginaAtual(1);
              }}
            >
              <option value="TODOS">Todos os médicos</option>
              {medicosMock.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-5">
            <label className="form-label small fw-semibold text-secondary mb-1">Intervalo de Datas</label>
            <div className="d-flex align-items-center gap-2">
              <input
                type="date"
                className="form-control form-control-sm"
                value={dataInicio}
                onChange={(e) => {
                  setDataInicio(e.target.value);
                  setPaginaAtual(1);
                }}
              />
              <span className="text-muted small">até</span>
              <input
                type="date"
                className="form-control form-control-sm"
                value={dataFim}
                onChange={(e) => {
                  setDataFim(e.target.value);
                  setPaginaAtual(1);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3 shadow-sm p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fs-6 fw-bold text-secondary mb-0">Agendamentos Recentes</h5>
          <button
            type="button"
            className="btn btn-sm btn-outline-primary d-flex align-items-center gap-2 fw-semibold"
            onClick={handleExportarCSV}
          >
            <FiDownload size={14} /> Exportar CSV
          </button>
        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr className="text-uppercase text-secondary" style={{ fontSize: "12px", letterSpacing: "0.5px" }}>
                <th className="border-0 ps-3">Paciente</th>
                <th className="border-0">Data e Hora</th>
                <th className="border-0">Médico</th>
                <th className="border-0">Status</th>
                <th className="border-0">Valor Cobrado</th>
                <th className="border-0 text-end pe-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {dadosPaginados.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-5">
                    Nenhum registro encontrado com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                dadosPaginados.map((item) => (
                  <tr key={item.id} className="border-bottom">
                    <td className="ps-3">
                      <div className="fw-semibold text-dark">{item.pacienteNome}</div>
                      <small className="text-muted">ID: {item.pacienteId}</small>
                    </td>
                    <td>
                      <div className="fw-semibold">{item.data}</div>
                      <small className="text-muted">{item.horario}</small>
                    </td>
                    <td>
                      <div className="fw-semibold text-secondary">{item.medicoNome}</div>
                      <small className="text-muted">{item.especialidade}</small>
                    </td>
                    <td>
                      <span className={`badge rounded-pill px-3 py-2 ${statusBadgeClasses[item.status]}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="fw-bold text-secondary">R$ {item.valor.toFixed(2)}</td>
                    <td className="text-end pe-3">
                      <button
                        type="button"
                        className="btn btn-sm btn-light border-0 text-primary me-1"
                        title="Ver Histórico do Paciente"
                        onClick={() => setPacienteHistorico({ nome: item.pacienteNome, cpf: item.pacienteCpf })}
                      >
                        <FiEye size={16} />
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-light border-0 text-secondary"
                        title="Editar Agendamento e Cobrança"
                        onClick={() => setAgendamentoEditar(item)}
                      >
                        <FiEdit2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between align-items-center pt-3 border-top mt-3">
          <small className="text-muted">
            Exibindo {dadosPaginados.length} de {agendamentosFiltrados.length} registros
          </small>
          <div className="btn-group btn-group-sm">
            <button
              type="button"
              className="btn btn-light border"
              disabled={paginaSegura === 1}
              onClick={() => setPaginaAtual((p) => Math.max(p - 1, 1))}
            >
              Anterior
            </button>
            <button type="button" className="btn btn-primary" style={{ backgroundColor: "#004b87" }}>
              {paginaSegura} / {totalPaginas}
            </button>
            <button
              type="button"
              className="btn btn-light border"
              disabled={paginaSegura >= totalPaginas}
              onClick={() => setPaginaAtual((p) => Math.min(p + 1, totalPaginas))}
            >
              Próximo
            </button>
          </div>
        </div>
      </div>

      {pacienteHistorico && (
        <ModalHistoricoPaciente
          isOpen={!!pacienteHistorico}
          pacienteNome={pacienteHistorico.nome}
          pacienteCpf={pacienteHistorico.cpf}
          historico={historicoPacienteSelecionado}
          onClose={() => setPacienteHistorico(null)}
        />
      )}

      {agendamentoEditar && (
        <ModalAgendamento
          isOpen={!!agendamentoEditar}
          initialData={agendamentoEditar}
          onClose={() => setAgendamentoEditar(null)}
          onSave={handleSaveEdicao}
        />
      )}

      {toast && (
        <ModalStatusNotificacoes mensagem={toast.mensagem} tipo={toast.tipo} onClose={() => setToast(null)} />
      )}
    </div>
  );
};

export default HistoricoPacientePage;