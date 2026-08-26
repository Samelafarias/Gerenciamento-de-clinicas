export type StatusAgendamento = "Confirmado" | "Aguardando" | "Atendido" | "Cancelado";
export type TipoConsulta = "Primeira Consulta" | "Retorno" | "Exame";

export interface Agendamento {
  id: string;
  pacienteId: string;
  pacienteNome: string;
  pacienteCpf: string;
  medicoId: string;
  medicoNome: string;
  especialidade: string;
  data: string; // "YYYY-MM-DD"
  horario: string; // "HH:mm"
  duracaoMinutos: number;
  tipo: TipoConsulta;
  status: StatusAgendamento;
  valor: number;
  convenio?: string; 
  formaPagamento?: "Dinheiro" | "Cartão" | "Pix" | "Convênio";
  motivoCancelamento?: string;
}

export interface Medico {
  id: string;
  nome: string;
  especialidade: string;
}

export interface BloqueioHorario {
  id: string;
  medicoId: string;
  dataInicio: string;
  horarioInicio: string;
  dataFim: string;
  horarioFim: string;
  motivo: string;
}