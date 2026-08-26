import React, { useState } from "react";
import type { Agendamento } from "../../types/agendamento";

interface ModalCancelarProps {
  agendamento: Agendamento | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string, motivo: string) => void;
  onRemarcar?: (agendamento: Agendamento) => void;
}

export const ModalCancelar: React.FC<ModalCancelarProps> = ({
  agendamento,
  isOpen,
  onClose,
  onConfirm,
  onRemarcar,
}) => {
  const [motivo, setMotivo] = useState("Solicitação do Paciente");

  if (!isOpen || !agendamento) return null;

  return (
    <div className="modal show d-block tab-index-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 rounded-4 shadow p-3">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fs-5 fw-bold text-danger d-flex align-items-center gap-2">
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body py-3">
            <p className="text-secondary mb-3">
              Tem certeza que deseja cancelar o agendamento de{" "}
              <strong className="text-dark">{agendamento.pacienteNome}</strong> em{" "}
              <strong className="text-dark">
                {agendamento.data} às {agendamento.horario}
              </strong>
              ? Esta ação não poderá ser desfeita.
            </p>

            <div className="mb-2">
              <label className="form-label text-muted small fw-semibold">Motivo do Cancelamento</label>
              <select
                className="form-select border-1 rounded-3"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
              >
                <option value="Solicitação do Paciente">Solicitação do Paciente</option>
                <option value="Imprevisto Médico">Imprevisto Médico</option>
                <option value="Falta de Pagamento">Falta de Pagamento</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
          </div>

          <div className="modal-footer border-0 pt-0 d-flex gap-2">
            {onRemarcar && (
              <button
                type="button"
                className="btn btn-outline-secondary flex-grow-1 py-2 fw-semibold rounded-3"
                onClick={() => onRemarcar(agendamento)}
              >
                Remarcar Atendimento
              </button>
            )}
            <button
              type="button"
              className="btn btn-danger flex-grow-1 py-2 fw-semibold rounded-3"
              onClick={() => onConfirm(agendamento.id, motivo)}
            >
              Confirmar Cancelamento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCancelar;