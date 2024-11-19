import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Admin from "./routes/Admin";
import Header from "./routes/Header";
import Footer from "./routes/Footer";
import CrearCuenta from "./routes/SubComponentes/CrearCuenta";
import IniciarSesion from "./routes/SubComponentes/IniciarSesion";
import { ProductDetail } from "./routes/ProductDetail";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Errores from "./routes/Errores";
import Users from "./routes/Users";

{
  /* 

const ProtectedRoute = ({ children, redirectTo }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate(redirectTo); // Redirige al login si no está autenticado
    }
  }, [navigate, user, redirectTo]);

  return user ? children : null;
};

*/
}

function App() {
  return (
    <div className="flex flex-col min-h-screen pt-16">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        {/*para hacer que quede sin rutas protegidas comentar toda la funcion de ProtectedRoute y 
        activar las rutas comentadas simples*/}

        <Route path="/Admin" element={<Admin />} />
        <Route path="/Admin/users" element={<Users />} />

        {/*para hacer que quede con rutas protegidas descomentar toda la funcion de ProtectedRoute y 
        activar las rutas comentadas que contiene el ProtectedRoute*/}

        {/*
        <Route
          path="/admin"
          element={
            <ProtectedRoute redirectTo="/iniciar-sesion">
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute redirectTo="/iniciar-sesion">
              <Errores tipoError="401" />
            </ProtectedRoute>
          }
        />

         */}
        <Route path="/crear-cuenta" element={<CrearCuenta />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="*" element={<Errores tipoError="404" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
