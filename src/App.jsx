// src/App.jsx
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Admin from "./routes/Admin";
import Header from "./routes/Header";
import Footer from "./routes/Footer";
import CrearCuenta from "./routes/components/login-Register/CrearCuenta";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import ListUsers from "./routes/components/admin/ListUsers";
import ProductByCategori from "./routes/components/producto/ProductByCategori";
import Favoritos from "./routes/components/producto/Favoritos";
import Resultados from "./routes/components/producto/Resultados";
import { ProductDetail } from "./routes/ProductDetail";
import { useContextGlobal } from "./utils/GlobalContext";
import Perfil from "./routes/components/Perfil";
import ConfirmacionReserva from "./routes/components/ConfirmacionReserva";
import IniciarSesion from "./routes/components/login-Register/IniciarSesion";

const ProtectedRoute = ({ children, requiredRole }) => {
  const navigate = useNavigate();
  const { state } = useContextGlobal();
  const userRoles = state?.user?.roles;

  useEffect(() => {
    if (!userRoles || (requiredRole && !userRoles.some(role => role.name === requiredRole))) {
      navigate("/");
    }
  }, [navigate, userRoles, requiredRole]);

  return userRoles && (!requiredRole || userRoles.some(role => role.name === requiredRole))
    ? children
    : null;
};

function App() {
  return (
    <div className="flex flex-col min-h-screen pt-16">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
            /*<ProtectedRoute>*/
              <Admin />
            /*</ProtectedRoute>*/
          }
        />
        <Route
          path="/admin/users"
          element={
           <ProtectedRoute requiredRole="ADMIN">
              <ListUsers />
           </ProtectedRoute>
          }
        />
        <Route path="/crear-cuenta" element={<CrearCuenta />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/categorias/:id" element={<ProductByCategori />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="*" element={<h1>Error 404 - Page not Found</h1>} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/confirmacion-reserva" element={<ConfirmacionReserva />} />
        <Route path="/login" element={<IniciarSesion isPage={true} />} />
        <Route path="/resultados" element={<Resultados />} />
        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
