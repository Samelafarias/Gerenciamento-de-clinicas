import { useState, useCallback } from "react";
import agendamentosMock from "../mocks/agendamentos";
import type { Agendamento, BloqueioHorario } from "../types/agendamento";
import medicos from "../mocks/medicos";

export function useAgendamentos() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>(agendamentosMock);
  const [bloqueios, setBloqueios] = useState<BloqueioHorario[]>([]);

  const cancelarAgendamento = useCallback((id: string, motivo: string) => {
    setAgendamentos((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "Cancelado" as const, motivoCancelamento: motivo } : a
      )
    );
  }, []);

  const transferirAgendamento = useCallback(
    (id: string, novoMedicoId: string, novaData: string, novoHorario: string) => {
      setAgendamentos((prev) =>
        prev.map((a) => {
          if (a.id !== id) return a;
          const medico = medicos.find((m) => m.id === novoMedicoId);
          return {
            ...a,
            medicoId: novoMedicoId,
            medicoNome: medico?.nome ?? a.medicoNome,
            especialidade: medico?.especialidade ?? a.especialidade,
            data: novaData,
            horario: novoHorario,
          };
        })
      );
    },
    []
  );

  const bloquearHorario = useCallback((dados: Omit<BloqueioHorario, "id">) => {
    const novoBloqueio: BloqueioHorario = {
      ...dados,
      id: `bloq-${Date.now()}`,
    };
    setBloqueios((prev) => [...prev, novoBloqueio]);
  }, []);

  const criarAgendamento = useCallback((novo: Omit<Agendamento, "id">) => {
    const novoAgendamento: Agendamento = {
      ...novo,
      id: `ag-${Date.now()}`,
    };
    setAgendamentos((prev) => [...prev, novoAgendamento]);
  }, []);

  const atualizarAgendamento = useCallback((id: string, dados: Partial<Agendamento>) => {
    setAgendamentos((prev) => prev.map((a) => (a.id === id ? { ...a, ...dados } : a)));
  }, []);

  return {
    agendamentos,
    bloqueios,
    cancelarAgendamento,
    transferirAgendamento,
    bloquearHorario,
    criarAgendamento,
    atualizarAgendamento,
  };
}