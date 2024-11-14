// src/App.jsx
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Admin from "./routes/Admin";
import Header from "./routes/Header";
import Footer from "./routes/Footer";
import CrearCuenta from "./routes/SubComponentes/CrearCuenta";
import IniciarSesion from "./routes/SubComponentes/IniciarSesion";
import { ProductDetail } from "./routes/ProductDetail";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/iniciar-sesion"); // Si no está autenticado, redirige al login
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
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/crear-cuenta" element={<CrearCuenta />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="*" element={<h1>Error 404 - Page not Found</h1>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
