import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const isAuthenticated = true; 

  return isAuthenticated ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;