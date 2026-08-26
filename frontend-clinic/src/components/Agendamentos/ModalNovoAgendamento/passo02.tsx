import React, { useState } from "react";
import type { NovoAgendamentoForm } from "../../../types/agendamentoForm";
import { formatarCEP } from "../../../utils/validadores";
import { buscarEnderecoPorCep } from "../../../hooks/cep";

interface StepProps {
  formData: NovoAgendamentoForm;
  erros: Record<string, string>;
  onChange: (field: keyof NovoAgendamentoForm, value: string) => void;
}

export const Passo02Endereco: React.FC<StepProps> = ({ formData, erros, onChange }) => {
  const [buscandoCep, setBuscandoCep] = useState(false);

  const handleCepBlur = async () => {
    const cepLimpo = formData.cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) return;

    setBuscandoCep(true);
    const endereco = await buscarEnderecoPorCep(cepLimpo);
    setBuscandoCep(false);

    if (endereco) {
      onChange("cidade", endereco.cidade);
      onChange("uf", endereco.uf);
      onChange("rua", endereco.rua);
      onChange("bairro", endereco.bairro);
    }
  };

  return (
    <div className="d-flex flex-column gap-3">
      <div className="row g-2">
        <div className="col-md-4">
          <label className="form-label text-muted small fw-semibold">CEP *</label>
          <div className="position-relative">
            <input
              type="text"
              className={`form-control rounded-3 ${erros.cep ? "is-invalid" : ""}`}
              placeholder="00000-000"
              value={formData.cep}
              maxLength={9}
              onChange={(e) => onChange("cep", formatarCEP(e.target.value))}
              onBlur={handleCepBlur}
            />
            {buscandoCep && (
              <span
                className="spinner-border spinner-border-sm text-primary-custom position-absolute top-50 end-0 translate-middle-y me-3"
                role="status"
              />
            )}
          </div>
          {erros.cep && <div className="invalid-feedback d-block">{erros.cep}</div>}
        </div>
        <div className="col-md-5">
          <label className="form-label text-muted small fw-semibold">Cidade *</label>
          <input
            type="text"
            className={`form-control rounded-3 ${erros.cidade ? "is-invalid" : ""}`}
            placeholder="Nome da cidade"
            value={formData.cidade}
            onChange={(e) => onChange("cidade", e.target.value)}
          />
          {erros.cidade && <div className="invalid-feedback">{erros.cidade}</div>}
        </div>
        <div className="col-md-3">
          <label className="form-label text-muted small fw-semibold">UF *</label>
          <input
            type="text"
            className={`form-control rounded-3 ${erros.uf ? "is-invalid" : ""}`}
            placeholder="UF"
            maxLength={2}
            value={formData.uf}
            onChange={(e) => onChange("uf", e.target.value.toUpperCase())}
          />
          {erros.uf && <div className="invalid-feedback">{erros.uf}</div>}
        </div>
      </div>

      <div>
        <label className="form-label text-muted small fw-semibold">Rua / Logradouro *</label>
        <input
          type="text"
          className={`form-control rounded-3 ${erros.rua ? "is-invalid" : ""}`}
          placeholder="Nome da rua"
          value={formData.rua}
          onChange={(e) => onChange("rua", e.target.value)}
        />
        {erros.rua && <div className="invalid-feedback">{erros.rua}</div>}
      </div>

      <div className="row g-2">
        <div className="col-md-8">
          <label className="form-label text-muted small fw-semibold">Bairro *</label>
          <input
            type="text"
            className={`form-control rounded-3 ${erros.bairro ? "is-invalid" : ""}`}
            placeholder="Nome do bairro"
            value={formData.bairro}
            onChange={(e) => onChange("bairro", e.target.value)}
          />
          {erros.bairro && <div className="invalid-feedback">{erros.bairro}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label text-muted small fw-semibold">Número *</label>
          <input
            type="text"
            className={`form-control rounded-3 ${erros.numero ? "is-invalid" : ""}`}
            placeholder="Ex: 123"
            value={formData.numero}
            onChange={(e) => onChange("numero", e.target.value)}
          />
          {erros.numero && <div className="invalid-feedback">{erros.numero}</div>}
        </div>
      </div>
    </div>
  );
};

export default Passo02Endereco;