import type { StatusAgendamento } from "../types/agendamento";

const proximoStatus: Partial<Record<StatusAgendamento, StatusAgendamento>> = {
  Aguardando: "Confirmado",
  Confirmado: "Em Atendimento",
  "Em Atendimento": "Atendido",
};

export function getProximoStatus(atual: StatusAgendamento): StatusAgendamento | null {
  return proximoStatus[atual] ?? null;
}

export function getLabelAcaoRapida(atual: StatusAgendamento): string | null {
  const labels: Partial<Record<StatusAgendamento, string>> = {
    Aguardando: "Confirmar",
    Confirmado: "Iniciar Atendimento",
    "Em Atendimento": "Concluir Atendimento",
  };
  return labels[atual] ?? null;
}

export const statusBadgeClasses: Record<StatusAgendamento, string> = {
  Confirmado: "bg-primary bg-opacity-10 text-primary",
  Aguardando: "bg-warning bg-opacity-25 text-warning-emphasis",
  "Em Atendimento": "bg-info bg-opacity-10 text-info-emphasis",
  Atendido: "bg-success bg-opacity-10 text-success",
  Cancelado: "bg-danger bg-opacity-10 text-danger",
};

export const todosStatus: StatusAgendamento[] = [
  "Aguardando",
  "Confirmado",
  "Em Atendimento",
  "Atendido",
  "Cancelado",
];