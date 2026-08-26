import React, { useState, useEffect } from "react";
import Passo01DadosPessoais from "./passo01";
import Passo02Endereco from "./passo02";
import Passo03ConsultaPagamento from "./passo03";
import medicosList from "../../../mocks/medicos";
import { formDataInicial, type NovoAgendamentoForm } from "../../../types/agendamentoForm";
import { validarPasso1, validarPasso2, validarPasso3 } from "../../../utils/validadores";
import type { Agendamento } from "../../../types/agendamento";

interface ModalAgendamentoProps {
  isOpen: boolean;
  initialData?: Agendamento | null;
  onClose: () => void;
  onSave: (dadosCompletos: NovoAgendamentoForm) => void;
}

export const ModalAgendamento: React.FC<ModalAgendamentoProps> = ({
  isOpen,
  initialData,
  onClose,
  onSave,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<NovoAgendamentoForm>(formDataInicial);
  const [erros, setErros] = useState<Record<string, string>>({});
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const modoEdicao = !!initialData;

  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setFormData({
        ...formDataInicial,
        nomeCompleto: initialData.pacienteNome,
        cpf: initialData.pacienteCpf,
        medicoId: initialData.medicoId,
        especialidade: initialData.especialidade,
        dataHora: `${initialData.data}T${initialData.horario}`,
        tipoConsulta: initialData.tipo === "Primeira Consulta" ? "Consulta" : (initialData.tipo as NovoAgendamentoForm["tipoConsulta"]),
        valor: initialData.valor.toFixed(2),
        formaPagamento:
          initialData.formaPagamento === "Cartão"
            ? "Cartao"
            : initialData.formaPagamento === "Pix"
            ? "PIX"
            : "Dinheiro",
      });
    } else {
      setFormData(formDataInicial);
    }

    setStep(1);
    setErros({});
    setSucesso(false);
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (field: keyof NovoAgendamentoForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (erros[field]) setErros((prev) => ({ ...prev, [field]: "" }));
  };

  const validarEtapaAtual = (): boolean => {
    let errosAtuais: Record<string, string> = {};
    if (step === 1) errosAtuais = validarPasso1(formData);
    if (step === 2) errosAtuais = validarPasso2(formData);
    if (step === 3) errosAtuais = validarPasso3(formData);

    setErros(errosAtuais);
    return Object.keys(errosAtuais).length === 0;
  };

  const handleNext = () => {
    if (!validarEtapaAtual()) return;
    setStep((prev) => (prev < 3 ? ((prev + 1) as 1 | 2 | 3) : prev));
  };

  const handleBack = () => setStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3) : prev));

  const handleClose = () => {
    setStep(1);
    setFormData(formDataInicial);
    setErros({});
    setSucesso(false);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (step < 3) {
      handleNext();
      return;
    }

    if (!validarEtapaAtual()) return;

    setEnviando(true);
    setTimeout(() => {
      onSave(formData);
      setEnviando(false);
      setSucesso(true);

      setTimeout(() => {
        handleClose();
      }, 1200);
    }, 700);
  };

  const progressPercentage = (step / 3) * 100;
  const stepTitles = {
    1: "Dados Pessoais do Paciente",
    2: "Dados de Endereço",
    3: "Consulta e Pagamento",
  };

  if (sucesso) {
    return (
      <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 rounded-4 shadow p-4 text-center">
            <div className="fs-1 mb-2">✅</div>
            <h5 className="fw-bold text-success mb-1">
              {modoEdicao ? "Agendamento atualizado!" : "Agendamento confirmado!"}
            </h5>
            <p className="text-secondary m-0">
              {modoEdicao
                ? `Dados de ${formData.nomeCompleto} atualizados com sucesso.`
                : `Consulta de ${formData.nomeCompleto} registrada com sucesso.`}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 rounded-4 shadow p-3">
          <div className="modal-header border-0 pb-2">
            <div>
              <h5 className="modal-title fs-4 fw-bold text-primary-custom">
                {modoEdicao ? "Editar Agendamento" : "Novo Agendamento"}
              </h5>
              <p className="text-secondary small mb-0">{stepTitles[step]}</p>
            </div>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>

          <div className="px-3 my-2">
            <div className="d-flex justify-content-between text-muted small fw-semibold mb-1">
              <span>PASSO {step} DE 3</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="progress" style={{ height: "6px" }}>
              <div className="progress-bar bg-primary-custom" style={{ width: `${progressPercentage}%` }} />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body py-3">
              {step === 1 && <Passo01DadosPessoais formData={formData} erros={erros} onChange={handleChange} />}
              {step === 2 && <Passo02Endereco formData={formData} erros={erros} onChange={handleChange} />}
              {step === 3 && (
                <Passo03ConsultaPagamento
                  formData={formData}
                  erros={erros}
                  medicosList={medicosList}
                  onChange={handleChange}
                />
              )}
            </div>

            <div className="modal-footer border-0 pt-2 d-flex justify-content-between">
              {step > 1 ? (
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4 py-2 rounded-3 fw-semibold"
                  onClick={handleBack}
                  disabled={enviando}
                >
                  ← Voltar
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-light px-4 py-2 rounded-3 text-secondary"
                  onClick={handleClose}
                  disabled={enviando}
                >
                  Cancelar
                </button>
              )}

              <button type="submit" className="btn btn-primary-custom px-4 py-2 rounded-3 fw-semibold" disabled={enviando}>
                {enviando
                  ? "Salvando..."
                  : step === 3
                  ? modoEdicao
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