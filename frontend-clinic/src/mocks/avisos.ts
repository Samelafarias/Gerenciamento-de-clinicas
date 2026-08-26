export type TipoAviso = "danger" | "info" | "cyan";

export interface Aviso {
  id: number;
  tipo: TipoAviso;
  titulo: string;
  mensagem: string;
}

const avisos: Aviso[] = [
  {
    id: 1,
    tipo: "danger",
    titulo: "Manutenção do Sistema",
    mensagem: "O sistema ficará indisponível das 02h às 04h no domingo.",
  },
  {
    id: 2,
    tipo: "info",
    titulo: "Nova Atualização",
    mensagem: "Módulo de telemedicina atualizado para versão 2.1.",
  },
  {
    id: 3,
    tipo: "cyan",
    titulo: "Reunião de Equipe",
    mensagem: "Hoje às 17:00 na sala de conferências A.",
  },
];

export default avisos;