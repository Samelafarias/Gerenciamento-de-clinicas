import React, { useState } from "react";
import type { BloqueioHorario } from "../types/agendamento";

interface ModalBloquearHorarioProps {
  isOpen: boolean;
  medicosList: { id: string; nome: string }[];
  onClose: () => void;
  onSaveBlock: (data: {
    medicoId: string;
    dataInicio: string;
    horarioInicio: string;
    dataFim: string;
    horarioFim: string;
    motivo: string;
  }) => void;
}

export const ModalBloquearHorario: React.FC<ModalBloquearHorarioProps> = ({
  isOpen,
  medicosList,
  onClose,
  onSaveBlock,
}) => {
  const [medicoId, setMedicoId] = useState("TODOS");
  const [dataInicio, setDataInicio] = useState("");
  const [horarioInicio, setHorarioInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [horarioFim, setHorarioFim] = useState("");
  const [motivo, setMotivo] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveBlock({ medicoId, dataInicio, horarioInicio, dataFim, horarioFim, motivo });
    onClose();
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 rounded-4 shadow p-3">
          <div className="modal-header border-0 pb-1">
            <h5 className="modal-title fs-5 fw-bold d-flex align-items-center gap-2">
               Bloquear horário
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body py-3 d-flex flex-column gap-3">
              <div>
                <label className="form-label text-muted small fw-semibold">Médico</label>
                <select
                  className="form-select border-1 rounded-3"
                  value={medicoId}
                  onChange={(e) => setMedicoId(e.target.value)}
                >
                  <option value="TODOS">Toda a Equipe / Clínica</option>
                  {medicosList.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="row g-2">
                <div className="col-6">
                  <label className="form-label text-muted small fw-semibold">Data Inicial</label>
                  <input
                    type="date"
                    className="form-control rounded-3"
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                    required
                  />
                </div>
                <div className="col-6">
                  <label className="form-label text-muted small fw-semibold">Hora Inicial</label>
                  <input
                    type="time"
                    className="form-control rounded-3"
                    value={horarioInicio}
                    onChange={(e) => setHorarioInicio(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="row g-2">
                <div className="col-6">
                  <label className="form-label text-muted small fw-semibold">Data Final</label>
                  <input
                    type="date"
                    className="form-control rounded-3"
                    value={dataFim}
                    onChange={(e) => setDataFim(e.target.value)}
                    required
                  />
                </div>
                <div className="col-6">
                  <label className="form-label text-muted small fw-semibold">Hora Final</label>
                  <input
                    type="time"
                    className="form-control rounded-3"
                    value={horarioFim}
                    onChange={(e) => setHorarioFim(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="form-label text-muted small fw-semibold">Motivo do Bloqueio</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  placeholder="Ex: Horário de Almoço, Reunião, Férias..."
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="modal-footer border-0 pt-2">
              <button
                type="submit"
                className="btn w-100 py-2 rounded-3 fw-semibold text-white"
                style={{ backgroundColor: "#006666" }}
              >
                Adicionar Bloqueio
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalBloquearHorario;