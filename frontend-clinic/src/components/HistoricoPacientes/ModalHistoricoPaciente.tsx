import React from "react";
import { FiX, FiUser, FiCalendar, FiDollarSign } from "react-icons/fi";
import type { Agendamento } from "../../types/agendamento";

interface Props {
  isOpen: boolean;
  pacienteNome: string;
  pacienteCpf: string;
  historico: Agendamento[];
  onClose: () => void;
}

export const ModalHistoricoPaciente: React.FC<Props> = ({
  isOpen,
  pacienteNome,
  pacienteCpf,
  historico,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal show d-block bg-dark bg-opacity-50" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 rounded-3 shadow">
          <div className="modal-header border-bottom-0 pb-0">
            <div className="d-flex align-items-center gap-2">
              <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-circle">
                <FiUser size={20} />
              </div>
              <div>
                <h5 className="modal-title fw-bold text-secondary mb-0">{pacienteNome}</h5>
                <small className="text-muted">CPF/ID: {pacienteCpf}</small>
              </div>
            </div>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Fechar" />
          </div>

          <div className="modal-body py-4">
            <h6 className="fw-bold mb-3 text-secondary">Histórico de Consultas e Cobranças</h6>
            {historico.length === 0 ? (
              <p className="text-muted text-center py-3">Nenhum histórico encontrado.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light small text-uppercase text-secondary">
                    <tr>
                      <th>Data / Hora</th>
                      <th>Médico</th>
                      <th>Tipo</th>
                      <th>Valor</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historico.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="fw-semibold">{item.data}</div>
                          <small className="text-muted">{item.horario}</small>
                        </td>
                        <td>{item.medicoNome}</td>
                        <td>{item.tipo}</td>
                        <td className="fw-semibold">R$ {item.valor.toFixed(2)}</td>
                        <td>
                          <span className="badge bg-secondary bg-opacity-10 text-secondary px-2 py-1 rounded-pill">
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="modal-footer border-top-0 pt-0">
            <button type="button" className="btn btn-secondary rounded-3" onClick={onClose}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalHistoricoPaciente;