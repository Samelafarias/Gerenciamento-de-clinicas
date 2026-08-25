export interface Notificacao {
  id: number;
  titulo: string;
  mensagem: string;
  data: string;
  lida: boolean;
}

const notificacoes: Notificacao[] = [
  {
    id: 1,
    titulo: "Novo agendamento",
    mensagem: "Maria Silva agendou consulta com Dr. Carlos às 14h.",
    data: "Hoje, 09:12",
    lida: false,
  },
  {
    id: 2,
    titulo: "Cancelamento",
    mensagem: "João Pereira cancelou a consulta das 16h30.",
    data: "Hoje, 08:45",
    lida: false,
  },
  {
    id: 3,
    titulo: "Lembrete",
    mensagem: "Reunião de equipe agendada para amanhã às 08h.",
    data: "Ontem, 18:20",
    lida: true,
  },
];

export default notificacoes;