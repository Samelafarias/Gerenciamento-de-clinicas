import React from "react";
import type { NovoAgendamentoForm } from "../../../types/agendamentoForm";
import type { MedicoComValor } from "../../../mocks/medicos";

interface StepProps {
  formData: NovoAgendamentoForm;
  erros: Record<string, string>;
  medicosList: MedicoComValor[];
  onChange: (field: keyof NovoAgendamentoForm, value: string) => void;
}

export const Passo03ConsultaPagamento: React.FC<StepProps> = ({ formData, erros, medicosList, onChange }) => {
  const handleMedicoChange = (medicoId: string) => {
    const medico = medicosList.find((m) => m.id === medicoId);
    onChange("medicoId", medicoId);
    if (medico) {
      onChange("especialidade", medico.especialidade);
      onChange("valor", medico.valorConsulta.toFixed(2));
    }
  };

  return (
    <div className="d-flex flex-column gap-3">
      <div className="border-bottom pb-3">
        <h6 className="fw-bold text-primary-custom mb-3">Dados da Consulta</h6>
        <div className="row g-2">
          <div className="col-md-6">
            <label className="form-label text-muted small fw-semibold">Médico Atendente *</label>
            <select
              className={`form-select rounded-3 ${erros.medicoId ? "is-invalid" : ""}`}
              value={formData.medicoId}
              onChange={(e) => handleMedicoChange(e.target.value)}>
              <option value="">Selecione o médico</option>
              {medicosList && medicosList.length > 0 ? (
                medicosList.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nome} — {m.especialidade}
                  </option>
                ))
              ) : (
                <option value="" disabled>Nenhum médico encontrado</option>
              )}
            </select>
            {erros.medicoId && <div className="invalid-feedback">{erros.medicoId}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label text-muted small fw-semibold">Especialidade</label>
            <input
              type="text"
              className="form-control rounded-3 bg-light"
              value={formData.especialidade}
              readOnly
              placeholder="Selecione um médico primeiro"
            />
          </div>
        </div>

        <div className="row g-2 mt-1">
          <div className="col-md-6">
            <label className="form-label text-muted small fw-semibold">Data e Horário *</label>
            <input
              type="datetime-local"
              className={`form-control rounded-3 ${erros.dataHora ? "is-invalid" : ""}`}
              value={formData.dataHora}
              min={new Date().toISOString().slice(0, 16)}
              onChange={(e) => onChange("dataHora", e.target.value)}
            />
            {erros.dataHora && <div className="invalid-feedback">{erros.dataHora}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label text-muted small fw-semibold">Tipo de Agendamento</label>
            <select
              className="form-select rounded-3"
              value={formData.tipoConsulta}
              onChange={(e) => onChange("tipoConsulta", e.target.value)}
            >
              <option value="Consulta">Consulta Primeira Vez</option>
              <option value="Retorno">Retorno</option>
              <option value="Exame">Exame</option>
            </select>
          </div>
        </div>

        <div className="mt-2">
          <label className="form-label text-muted small fw-semibold">Observações / Sintomas</label>
          <textarea
            className="form-control rounded-3"
            rows={2}
            placeholder="Sintomas relatados pelo paciente..."
            value={formData.observacoes}
            onChange={(e) => onChange("observacoes", e.target.value)}
          />
        </div>
      </div>

      <div className="bg-light p-3 rounded-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold text-primary-custom m-0">Informações de Pagamento</h6>
          <span className="fs-5 fw-bold text-success">
            R$ {Number(formData.valor).toFixed(2).replace(".", ",")}
          </span>
        </div>

        <div className="row g-2 mb-3">
          {(["Cartao", "PIX", "Dinheiro"] as const).map((forma) => (
            <div className="col-4" key={forma}>
              <div
                className={`payment-option text-center d-flex align-items-center justify-content-center gap-2 ${
                  formData.formaPagamento === forma ? "active" : ""
                }`}
                onClick={() => onChange("formaPagamento", forma)}
                role="button"
              >
                {forma === "Cartao" && (
                  <>
                    <i className="bi bi-credit-card-2-front me-1"></i> Cartão
                  </>
                )}
                {forma === "PIX" && (
                  <>
                    <i className="bi bi-qr-code me-1"></i> PIX
                  </>
                )}
                {forma === "Dinheiro" && (
                  <>
                    <i className="bi bi-cash-stack me-1"></i> Dinheiro
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {formData.formaPagamento === "Cartao" && (
          <div className="row g-2">
            <div className="col-md-6">
              <input type="text" className="form-control rounded-3" placeholder="Número do Cartão" />
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control rounded-3" placeholder="MM/AA" />
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control rounded-3" placeholder="CVV" />
            </div>
          </div>
        )}

        {formData.formaPagamento === "PIX" && (
          <p className="text-muted small text-center m-0 py-2">
            O QR Code para pagamento via PIX será gerado na tela de confirmação.
          </p>
        )}
      </div>
    </div>
  );
};

export default Passo03ConsultaPagamento;