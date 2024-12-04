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
import { ProductDetail } from "./routes/ProductDetail";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  return user ? children : null;
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
           /*  <ProtectedRoute> */
              <Admin />
            /* </ProtectedRoute> */
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <ListUsers />
            </ProtectedRoute>
          }
        />
        <Route path="/crear-cuenta" element={<CrearCuenta />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/categorias/:id" element={<ProductByCategori />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="*" element={<h1>Error 404 - Page not Found</h1>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
