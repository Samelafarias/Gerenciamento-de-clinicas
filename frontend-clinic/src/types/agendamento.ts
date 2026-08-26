export type StatusAgendamento = "Confirmado" | "Aguardando" | "Atendido" | "Cancelado";

export interface Agendamento {
  id: number;
  pacienteNome: string;
  medicoNome: string;
  especialidade: string;
  data: string; // formato "YYYY-MM-DD"
  horario: string; // formato "HH:mm"
  duracaoMinutos: number;
  status: StatusAgendamento;
  valor: number;
}