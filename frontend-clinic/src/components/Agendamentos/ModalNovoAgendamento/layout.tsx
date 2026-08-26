import React, { useState, useEffect } from "react";
import Passo01DadosPessoais from "./passo01";
import Passo02Endereco from "./passo02";
import Passo03ConsultaPagamento from "./passo03";
import type { NovoAgendamentoForm } from "../../../types/agendamentoForm";

interface ModalAgendamentoProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dadosCompletos: NovoAgendamentoForm) => void;
  initialData?: any;
  medicosList?: any[];
}

const initialFormState: NovoAgendamentoForm = {
  nomeCompleto: "",
  cpf: "",
  dataNascimento: "",
  email: "",
  telefone: "",
  cep: "",
  cidade: "",
  uf: "",
  rua: "",
  bairro: "",
  numero: "",
  medicoId: "",
  especialidade: "",
  dataHora: "",
  tipoConsulta: "Consulta",
  observacoes: "",
  formaPagamento: "Cartao",
  valor: "150.00",
};

export const ModalAgendamento: React.FC<ModalAgendamentoProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  medicosList = [],
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<NovoAgendamentoForm>(initialFormState);
  const [erros, setErros] = useState<Record<string, string>>({});
  const [alerta, setAlerta] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          ...initialFormState,
          ...initialData,
          nomeCompleto: initialData.pacienteNome || initialData.nomeCompleto || "",
          valor: initialData.valor ? String(initialData.valor) : "150.00",
        });
      } else {
        setFormData(initialFormState);
      }
      setErros({});
      setAlerta(null);
      setStep(1);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (field: keyof NovoAgendamentoForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setAlerta(null);
    if (erros[field]) {
      setErros((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Função de validação por etapa
  const validarPassoAtual = (): boolean => {
    const novosErros: Record<string, string> = {};

    if (step === 1) {
      if (!formData.nomeCompleto.trim()) novosErros.nomeCompleto = "Campo obrigatório";
      if (!formData.cpf.trim()) novosErros.cpf = "Campo obrigatório";
      if (!formData.dataNascimento.trim()) novosErros.dataNascimento = "Campo obrigatório";
      if (!formData.email.trim()) novosErros.email = "Campo obrigatório";
      if (!formData.telefone.trim()) novosErros.telefone = "Campo obrigatório";
    }

    if (step === 2) {
      if (!formData.cep.trim()) novosErros.cep = "Campo obrigatório";
      if (!formData.cidade.trim()) novosErros.cidade = "Campo obrigatório";
      if (!formData.uf.trim()) novosErros.uf = "Campo obrigatório";
      if (!formData.rua.trim()) novosErros.rua = "Campo obrigatório";
      if (!formData.bairro.trim()) novosErros.bairro = "Campo obrigatório";
      if (!formData.numero.trim()) novosErros.numero = "Campo obrigatório";
    }

    if (step === 3) {
      if (!formData.medicoId.trim()) novosErros.medicoId = "Campo obrigatório";
      if (!formData.dataHora.trim()) novosErros.dataHora = "Campo obrigatório";
    }

    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      setAlerta("Preencha todos os campos obrigatórios (*) para continuar.");
      return false;
    }

    setAlerta(null);
    return true;
  };

  const handleNext = () => {
    if (validarPassoAtual()) {
      setStep((prev) => Math.min(prev + 1, 3) as 1 | 2 | 3);
    }
  };

  const handleBack = () => {
    setAlerta(null);
    setStep((prev) => Math.max(prev - 1, 1) as 1 | 2 | 3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!validarPassoAtual()) return;

    if (step < 3) {
      handleNext();
    } else {
      onSave(formData);
      onClose();
    }
  };

  const progressPercentage = (step / 3) * 100;

  const stepTitles = {
    1: "Dados Pessoais do Paciente",
    2: "Dados de Endereço",
    3: "Consulta e Pagamento",
  };

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 rounded-4 shadow p-3">
          {/* Cabeçalho */}
          <div className="modal-header border-0 pb-2">
            <div>
              <h5 className="modal-title fs-4 fw-bold text-primary-custom">
                {initialData ? "Editar Agendamento" : "Novo Agendamento"}
              </h5>
              <p className="text-secondary small mb-0">{stepTitles[step]}</p>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
            ></button>
          </div>

          {/* Alerta Personalizado */}
          {alerta && (
            <div className="px-3">
              <div className="alert alert-warning alert-dismissible fade show rounded-3 py-2 px-3 small d-flex align-items-center mb-1" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2 fs-6 text-warning"></i>
                <div className="fw-semibold text-dark">{alerta}</div>
                <button
                  type="button"
                  className="btn-close py-2"
                  onClick={() => setAlerta(null)}
                ></button>
              </div>
            </div>
          )}

          {/* Progresso */}
          <div className="px-3 my-2">
            <div className="d-flex justify-content-between text-muted small fw-semibold mb-1">
              <span>PASSO {step} DE 3</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="modal-step-indicator" style={{ height: "6px", backgroundColor: "#e9ecef", borderRadius: "4px" }}>
              <div
                className="modal-step-progress"
                style={{
                  width: `${progressPercentage}%`,
                  height: "100%",
                  backgroundColor: "#004b87",
                  borderRadius: "4px",
                  transition: "width 0.3s ease",
                }}
              ></div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="modal-body py-3">
              {step === 1 && (
                <Passo01DadosPessoais
                  formData={formData}
                  erros={erros}
                  onChange={handleChange}
                />
              )}
              {step === 2 && (
                <Passo02Endereco
                  formData={formData}
                  erros={erros}
                  onChange={handleChange}
                />
              )}
              {step === 3 && (
                <Passo03ConsultaPagamento
                  formData={formData}
                  erros={erros}
                  medicosList={medicosList}
                  onChange={handleChange}
                />
              )}
            </div>

            {/* Rodapé */}
            <div className="modal-footer border-0 pt-2 d-flex justify-content-between">
              {step > 1 ? (
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4 py-2 rounded-3 fw-semibold"
                  onClick={(e) => {
                    e.preventDefault();
                    handleBack();
                  }}
                >
                  ← Voltar
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-light px-4 py-2 rounded-3 text-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                  }}
                >
                  Cancelar
                </button>
              )}

              <button
                type="submit"
                className="btn btn-primary-custom px-4 py-2 rounded-3 fw-semibold text-white"
                style={{ backgroundColor: "#004b87" }}
              >
                {step === 3
                  ? initialData
                    ? "Salvar Alterações ✓"
                    : "Confirmar Agendamento ✓"
                  : "Próximo →"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalAgendamento;