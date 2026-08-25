import { createContext, useContext, useState, useEffect } from "react";
import { usuarios } from "../mocks/usuarios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Recupera sessão salva ao recarregar a página
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
    setCarregando(false);
  }, []);

  function login(email, senha) {
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
  return useContext(AuthContext);
}