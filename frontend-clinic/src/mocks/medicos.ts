import type { Medico } from '../types/agendamento';

export interface MedicoComValor {
  id: string;
  nome: string;
  especialidade: string;
  valorConsulta: number;
}

const medicos: MedicoComValor[] = [
  { id: "med-1", nome: "Dra. Ana Beatriz", especialidade: "Cardiologia", valorConsulta: 200 },
  { id: "med-2", nome: "Dra. Beatriz Silva", especialidade: "Dermatologia", valorConsulta: 250 },
  { id: "med-3", nome: "Dr. João Carlos", especialidade: "Pediatria", valorConsulta: 280 },
  { id: "med-4", nome: "Dr. Rafael Souza", especialidade: "Oftalmologia", valorConsulta: 180 },
  { id: "med-5", nome: "Dra. Ana Maria Souza", especialidade: "Ginecologia", valorConsulta: 190 },
  { id: "med-6", nome: "Dr. José Santos", especialidade: "Cardiologia", valorConsulta: 240 },
];

export default medicos;