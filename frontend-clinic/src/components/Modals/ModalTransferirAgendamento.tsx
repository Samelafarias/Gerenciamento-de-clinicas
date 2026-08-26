import React, { useState } from "react";
import type { Agendamento } from "../../types/agendamento";

interface ModalTransferirProps {
  agendamento: Agendamento | null;
  isOpen: boolean;
  medicosList: { id: string; nome: string; especialidade: string }[];
  onClose: () => void;
  onSave: (id: string, novoMedicoId: string, novaData: string, novoHorario: string) => void;
}

export const ModalTransferir: React.FC<ModalTransferirProps> = ({
  agendamento,
  isOpen,
  medicosList,
  onClose,
  onSave,
}) => {
  const [medicoId, setMedicoId] = useState(agendamento?.medicoId || "");
  const [novaData, setNovaData] = useState(agendamento?.data || "");
  const [novoHorario, setNovoHorario] = useState(agendamento?.horario || "");

  if (!isOpen || !agendamento) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(agendamento.id, medicoId, novaData, novoHorario);
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 rounded-4 shadow p-3">
          <div className="modal-header border-0 pb-1">
            <div>
              <h5 className="modal-title fs-5 fw-bold">Transferir Atendimento</h5>
              <p className="text-muted small m-0">
                Mover agendamento existente de <strong>{agendamento.pacienteNome}</strong>.
              </p>
            </div>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body py-3 d-flex flex-column gap-3">
              <div>
                <label className="form-label text-muted small fw-semibold">Transferir para o Médico</label>
                <select
                  className="form-select border-1 rounded-3"
                  value={medicoId}
                  onChange={(e) => setMedicoId(e.target.value)}
                  required
                >
                  {medicosList.map((m) => (
                    <option key={m.id} value={m.id}>
                     {m.nome} ({m.especialidade})
                    </option>
                  ))}
                </select>
              </div>

              <div className="row g-2">
                <div className="col-6">
                  <label className="form-label text-muted small fw-semibold">Nova Data</label>
                  <input
                    type="date"
                    className="form-control rounded-3"
                    value={novaData}
                    onChange={(e) => setNovaData(e.target.value)}
                    required
                  />
                </div>
                <div className="col-6">
                  <label className="form-label text-muted small fw-semibold">Novo Horário</label>
                  <input
                    type="time"
                    className="form-control rounded-3"
                    value={novoHorario}
                    onChange={(e) => setNovoHorario(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer border-0 pt-2 d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-light px-4 py-2 rounded-3 text-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary px-4 py-2 rounded-3 fw-semibold">
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalTransferir;