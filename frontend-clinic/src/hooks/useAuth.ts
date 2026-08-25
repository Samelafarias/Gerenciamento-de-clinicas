import { usuarios } from "../mocks/usuarios";

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  cargo: string;
}

interface ResultadoAutenticacao {
  sucesso: boolean;
  usuario?: Usuario;
  mensagem?: string;
}

const AUTH_KEY = "@clinica:usuarioLogado";

export function autenticar(email: string, senha: string): ResultadoAutenticacao {
  const usuario = usuarios.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha
  );

  if (!usuario) {
    return { sucesso: false, mensagem: "Email ou senha inválidos." };
  }

  const { senha: _senha, ...usuarioSemSenha } = usuario;
  sessionStorage.setItem(AUTH_KEY, JSON.stringify(usuarioSemSenha));

  return { sucesso: true, usuario: usuarioSemSenha };
}

export function getUsuarioLogado(): Usuario | null {
  const dados = sessionStorage.getItem(AUTH_KEY);
  return dados ? JSON.parse(dados) : null;
}

export function logout(): void {
  sessionStorage.removeItem(AUTH_KEY);
}