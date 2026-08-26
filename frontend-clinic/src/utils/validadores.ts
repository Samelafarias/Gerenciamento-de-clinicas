export function validarCPF(cpf: string): boolean {
  const numeros = cpf.replace(/\D/g, "");
  if (numeros.length !== 11 || /^(\d)\1{10}$/.test(numeros)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(numeros[i]) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;
  if (resto !== parseInt(numeros[9])) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(numeros[i]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;
  return resto === parseInt(numeros[10]);
}

export function formatarCPF(valor: string): string {
  const nums = valor.replace(/\D/g, "").slice(0, 11);
  return nums
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function formatarTelefone(valor: string): string {
  const nums = valor.replace(/\D/g, "").slice(0, 11);
  return nums
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

export function formatarCEP(valor: string): string {
  const nums = valor.replace(/\D/g, "").slice(0, 8);
  return nums.replace(/(\d{5})(\d)/, "$1-$2");
}

// Serve para validar cada etapa antes de liberar o próximo
export function validarPasso1(form: { nomeCompleto: string; cpf: string; dataNascimento: string; email: string; telefone: string }) {
  const erros: Record<string, string> = {};
  if (!form.nomeCompleto.trim()) erros.nomeCompleto = "Informe o nome completo.";
  if (!validarCPF(form.cpf)) erros.cpf = "CPF inválido.";
  if (!form.dataNascimento) erros.dataNascimento = "Informe a data de nascimento.";
  if (!/^\S+@\S+\.\S+$/.test(form.email)) erros.email = "E-mail inválido.";
  if (form.telefone.replace(/\D/g, "").length < 10) erros.telefone = "Telefone inválido.";
  return erros;
}

export function validarPasso2(form: { cep: string; cidade: string; uf: string; rua: string; bairro: string; numero: string }) {
  const erros: Record<string, string> = {};
  if (form.cep.replace(/\D/g, "").length !== 8) erros.cep = "CEP inválido.";
  if (!form.cidade.trim()) erros.cidade = "Informe a cidade.";
  if (form.uf.trim().length !== 2) erros.uf = "UF deve ter 2 letras.";
  if (!form.rua.trim()) erros.rua = "Informe a rua.";
  if (!form.bairro.trim()) erros.bairro = "Informe o bairro.";
  if (!form.numero.trim()) erros.numero = "Informe o número.";
  return erros;
}

export function validarPasso3(form: { medicoId: string; especialidade: string; dataHora: string }) {
  const erros: Record<string, string> = {};
  if (!form.medicoId) erros.medicoId = "Selecione o médico.";
  if (!form.especialidade) erros.especialidade = "Selecione a especialidade.";
  if (!form.dataHora) erros.dataHora = "Selecione data e horário.";
  return erros;
}