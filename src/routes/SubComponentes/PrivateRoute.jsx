// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Recuperamos el usuario desde el localStorage o el contexto global
  const user = JSON.parse(localStorage.getItem("user"));

  // Verificamos si el usuario está autenticado y si tiene el correo correcto
  if (!user || user.email !== "user@example.com") {
    // Si no está autenticado o no tiene el correo correcto, lo redirigimos a la página de inicio
    return <Navigate to="/" />;
  }

  // Si el usuario es válido, renderizamos los componentes hijos
  return children;
};

export default PrivateRoute;
