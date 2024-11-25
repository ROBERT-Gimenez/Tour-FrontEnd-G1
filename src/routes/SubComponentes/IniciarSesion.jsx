import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContextGlobal } from "../../components/utils/GlobalContext";
import "./session.css";
import logo from "../../assets/Logo.svg";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const IniciarSesion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { state , dispatch } = useContextGlobal();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const processingLogin = (e) =>{
    Swal.fire({
      title: 'Cargando...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); 
      },
    });

    handleSubmit(e)
      .then(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        Swal.fire({
          icon: 'success',
          title: 'Bienvenido ' + storedUser.nombre,
          imageUrl: logo,
          imageWidth: 150,
          imageHeight: 150, 
          imageAlt: 'Logo',
        });
      })
      .catch((err) => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error,
        });
      });
  }


  const handleLogin = (token) => {
    localStorage.setItem("authToken", JSON.stringify(token));
    try {
      const decodedToken = jwtDecode(token);
      localStorage.setItem("user", JSON.stringify(decodedToken));
      dispatch({ type: "LOGIN", payload: decodedToken });
      setUser(decodedToken);
    } catch (error) {
      console.error("Error al decodificar el token", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username: email,
        password: password,
      });
      const userData = response.data;
      await handleLogin(userData.token);
      setError("");
      setIsPopupVisible(false);
    } catch (error) {
      setError(error?.response?.data?.errorMessage);
    }
  };

  const getUserInitials = (name) => {
    return name?.split(" ").map((n) => n[0]).join("");
  };

  return (
    <div className="container">
      {user ? (
        <div>
          <div className="avatar">
            {getUserInitials(user?.nombre)}
          </div>
        </div>
      ) : (
        <div>
          <button
            className="button-header open-popup-button bg-[#FFFFFF] text-black border border-black px-2 py-1 text-xs md:px-3 md:py-2 rounded-[50px] hover:bg-black hover:text-white hover:border-white transition duration-300 transform hover:scale-105"
            onClick={() => setIsPopupVisible(true)}
          >
            Iniciar sesión
          </button>

          {isPopupVisible && (
            <div className="popup-overlay">
              <div className="popup-content">
                <button className="close-button" onClick={() => setIsPopupVisible(false)}>
                  <FontAwesomeIcon icon={faClose} />
                </button>
                <form className="form" onSubmit={processingLogin}>
                  <div className="logo-session">
                    <img src={logo} alt="Logo" />
                  </div>
                  <h2 className="title">Iniciar sesión</h2>
                  <input
                    className="input"
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="password-container">
                    <input
                      className="input"
                      placeholder="Contraseña"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="toggle-password" type="button" onClick={togglePasswordVisibility}>
                      {showPassword ? "👁️" : "🙈"}
                    </button>
                  </div>
                  {error && <div className="error-message">{error}</div>}
                  <button className="button" type="submit">
                    Iniciar sesión
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IniciarSesion;