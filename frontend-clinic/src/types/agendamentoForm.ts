export interface NovoAgendamentoForm {
  // Passo 1 — cadastrar o paciente
  nomeCompleto: string;
  cpf: string;
  dataNascimento: string;
  email: string;
  telefone: string;

  // Passo 2 — Cadastra o endereço do pacienrte
  cep: string;
  cidade: string;
  uf: string;
  rua: string;
  bairro: string;
  numero: string;

  // Passo 3 — Cadastrar o que é a consulta e o metodo de pagamento escolhido pelo paciente
  medicoId: string;
  especialidade: string;
  dataHora: string;
  tipoConsulta: "Consulta" | "Retorno" | "Exame";
  observacoes: string;
  formaPagamento: "Cartao" | "PIX" | "Dinheiro";
  valor: string;
}

export const formDataInicial: NovoAgendamentoForm = {
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
  valor: "0",
};