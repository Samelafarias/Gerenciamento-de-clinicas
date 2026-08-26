import type { Agendamento } from "../types/agendamento";
import { getDataISO } from "../utils/data";

const agendamentos: Agendamento[] = [
  // Atendidos hoje (já ocorreram)
  {
    id: 1,
    pacienteNome: "Maria Silva",
    medicoNome: "Dr. Carlos Mendes",
    especialidade: "Cardiologia",
    data: getDataISO(0),
    horario: "08:00",
    duracaoMinutos: 30,
    status: "Atendido",
    valor: 250,
  },
  {
    id: 2,
    pacienteNome: "Pedro Santos",
    medicoNome: "Dra. Ana Souza",
    especialidade: "Dermatologia",
    data: getDataISO(0),
    horario: "08:30",
    duracaoMinutos: 30,
    status: "Atendido",
    valor: 200,
  },

  // Próximos agendamentos de hoje
  {
    id: 3,
    pacienteNome: "João Souza",
    medicoNome: "Dr. Carlos Mendes",
    especialidade: "Cardiologia",
    data: getDataISO(0),
    horario: "10:00",
    duracaoMinutos: 45,
    status: "Aguardando",
    valor: 250,
  },
  {
    id: 4,
    pacienteNome: "Ana Oliveira",
    medicoNome: "Dra. Ana Souza",
    especialidade: "Dermatologia",
    data: getDataISO(0),
    horario: "11:30",
    duracaoMinutos: 30,
    status: "Confirmado",
    valor: 200,
  },
  {
    id: 5,
    pacienteNome: "Lucas Ferreira",
    medicoNome: "Dr. Rafael Lima",
    especialidade: "Ortopedia",
    data: getDataISO(0),
    horario: "14:00",
    duracaoMinutos: 30,
    status: "Confirmado",
    valor: 220,
  },
  {
    id: 6,
    pacienteNome: "Beatriz Costa",
    medicoNome: "Dra. Ana Souza",
    especialidade: "Dermatologia",
    data: getDataISO(0),
    horario: "15:30",
    duracaoMinutos: 30,
    status: "Cancelado",
    valor: 200,
  },

  // Amanhã (pra usar depois na tela de Agendamento)
  {
    id: 7,
    pacienteNome: "Rafael Torres",
    medicoNome: "Dr. Carlos Mendes",
    especialidade: "Cardiologia",
    data: getDataISO(1),
    horario: "09:00",
    duracaoMinutos: 30,
    status: "Confirmado",
    valor: 250,
  },
];

export default agendamentos;