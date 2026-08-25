import { Navigate } from "react-router-dom";
import { getUsuarioLogado } from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const usuario = getUsuarioLogado();

  if (!usuario) {
    // Não autenticado: manda de volta pro login
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;