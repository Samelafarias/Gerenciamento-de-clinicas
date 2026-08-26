import React from "react";
import type { NovoAgendamentoForm } from "../../../types/agendamentoForm";
import { formatarCPF, formatarTelefone } from "../../../utils/validadores";

interface StepProps {
  formData: NovoAgendamentoForm;
  erros: Record<string, string>;
  onChange: (field: keyof NovoAgendamentoForm, value: string) => void;
}

export const Passo01DadosPessoais: React.FC<StepProps> = ({ formData, erros, onChange }) => {
  return (
    <div className="d-flex flex-column gap-3">
      <div>
        <label className="form-label text-muted small fw-semibold">Nome Completo *</label>
        <input
          type="text"
          className={`form-control rounded-3 ${erros.nomeCompleto ? "is-invalid" : ""}`}
          placeholder="Ex: Maria Silva Costa"
          value={formData.nomeCompleto}
          onChange={(e) => onChange("nomeCompleto", e.target.value)}
        />
        {erros.nomeCompleto && <div className="invalid-feedback">{erros.nomeCompleto}</div>}
      </div>

      <div className="row g-2">
        <div className="col-md-6">
          <label className="form-label text-muted small fw-semibold">CPF *</label>
          <input
            type="text"
            className={`form-control rounded-3 ${erros.cpf ? "is-invalid" : ""}`}
            placeholder="000.000.000-00"
            value={formData.cpf}
            maxLength={14}
            onChange={(e) => onChange("cpf", formatarCPF(e.target.value))}
          />
          {erros.cpf && <div className="invalid-feedback">{erros.cpf}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label text-muted small fw-semibold">Data de Nascimento *</label>
          <input
            type="date"
            className={`form-control rounded-3 ${erros.dataNascimento ? "is-invalid" : ""}`}
            value={formData.dataNascimento}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => onChange("dataNascimento", e.target.value)}
          />
          {erros.dataNascimento && <div className="invalid-feedback">{erros.dataNascimento}</div>}
        </div>
      </div>

      <div className="row g-2">
        <div className="col-md-6">
          <label className="form-label text-muted small fw-semibold">E-mail *</label>
          <input
            type="email"
            className={`form-control rounded-3 ${erros.email ? "is-invalid" : ""}`}
            placeholder="paciente@email.com"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
          {erros.email && <div className="invalid-feedback">{erros.email}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label text-muted small fw-semibold">Telefone / Celular *</label>
          <input
            type="tel"
            className={`form-control rounded-3 ${erros.telefone ? "is-invalid" : ""}`}
            placeholder="(00) 00000-0000"
            value={formData.telefone}
            maxLength={15}
            onChange={(e) => onChange("telefone", formatarTelefone(e.target.value))}
          />
          {erros.telefone && <div className="invalid-feedback">{erros.telefone}</div>}
        </div>
      </div>
    </div>
  );
};

export default Passo01DadosPessoais;