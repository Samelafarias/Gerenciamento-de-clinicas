import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { usuarios } from "../mocks/usuarios";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  cargo: string;
}

interface ResultadoLogin {
  sucesso: boolean;
  mensagem?: string;
}

interface AuthContextData {
  usuario: Usuario | null;
  login: (email: string, senha: string) => ResultadoLogin;
  logout: () => void;
  autenticado: boolean;
  carregando: boolean;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);

  // Recupera sessão salva ao recarregar a página
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo) as Usuario);
    }
    setCarregando(false);
  }, []);

  function login(email: string, senha: string): ResultadoLogin {
    const usuarioEncontrado = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (!usuarioEncontrado) {
      return { sucesso: false, mensagem: "E-mail ou senha inválidos." };
    }

    // Remove a senha antes de guardar no estado/localStorage
    const { senha: _, ...usuarioSemSenha } = usuarioEncontrado;

    setUsuario(usuarioSemSenha);
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioSemSenha));

    return { sucesso: true };
  }

  function logout() {
    setUsuario(null);
    localStorage.removeItem("usuarioLogado");
  }

  return (
    <AuthContext.Provider
      value={{ usuario, login, logout, autenticado: !!usuario, carregando }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  }
  return context;
}