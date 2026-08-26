import React, { useState } from "react";
import type { Agendamento, StatusAgendamento } from "../../types/agendamento";
import { todosStatus, statusBadgeClasses } from "../../utils/statusAgendamento";

interface Props {
  agendamento: Agendamento | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, novoStatus: StatusAgendamento) => void;
}

export const ModalAlterarStatus: React.FC<Props> = ({ agendamento, isOpen, onClose, onSave }) => {
  const [statusSelecionado, setStatusSelecionado] = useState<StatusAgendamento>(
    agendamento?.status ?? "Aguardando"
  );

  if (!isOpen || !agendamento) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(agendamento.id, statusSelecionado);
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 rounded-4 shadow p-3">
          <div className="modal-header border-0 pb-1">
            <div>
              <h5 className="modal-title fs-5 fw-bold">Alterar Status</h5>
              <p className="text-muted small m-0">
                Agendamento de <strong>{agendamento.pacienteNome}</strong>
              </p>
            </div>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body py-3 d-flex flex-column gap-2">
              {todosStatus.map((status) => (
                <label
                  key={status}
                  className={`d-flex align-items-center gap-2 p-2 rounded-3 border ${
                    statusSelecionado === status ? "border-primary" : "border-light"
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  <input
                    type="radio"
                    name="status"
                    className="form-check-input m-0"
                    checked={statusSelecionado === status}
                    onChange={() => setStatusSelecionado(status)}
                  />
                  <span className={`badge rounded-pill px-3 py-2 ${statusBadgeClasses[status]}`}>
                    {status}
                  </span>
                </label>
              ))}
            </div>

            <div className="modal-footer border-0 pt-2 d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-light text-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary fw-semibold">
                Salvar Status
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalAlterarStatus;