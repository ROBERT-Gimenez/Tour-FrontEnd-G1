import { useState, useEffect } from 'react';
import { login } from '../api/authLogin';
import { jwtDecode } from "jwt-decode";
import { useContextGlobal } from '../utils/GlobalContext';

const useAuthLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rol, setRol] = useState(null);
  const [user, setUser] = useState({});
  const { state, dispatch } = useContextGlobal();

  const loginUser = async(userData) => {
    try {
        setLoading(true);
        setError(null); 
        const data = await login(userData);
        const decodedToken = await handleLogin(data.token)
        checkToken();
        dispatch({ type: 'LOGIN', payload: { ...state.user, ...decodedToken } });
        return decodedToken;
    } catch (err) {
        const errorMessage = err?.response?.data?.errorMessage || "Error de conexión";
        setError(errorMessage); 
        throw new Error(errorMessage); 
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (token) => {
    localStorage.setItem("authToken", JSON.stringify(token));
    try {
      const decodedToken = jwtDecode(token);
      console.log("Token decodificado:", decodedToken);
      setRol(decodedToken.roles || []); // Manejo de roles vacíos
      setUser({ ...decodedToken });
      return decodedToken;
    } catch (error) {
      console.error("Error al decodificar el token", error);
    }
  };
  

  const decodeJwt = (token) => {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  };

  const checkToken = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      if (isTokenExpired(token)) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userFavoriteExperienceList')
        setRol(null);
        setUser(null);
        return;
      }
      const decodedToken = decodeJwt(token);
      setRol(decodedToken.roles);
      setUser({ ...decodedToken });
      return decodedToken
      
    }
    console.log("Token en localStorage:", localStorage.getItem("authToken"));
    localStorage.removeItem('userFavoriteExperienceList');
  };

  useEffect(() => {
    checkToken();
  }, []);

  const isTokenExpired = (token) => {
    const decodedToken = decodeJwt(token);
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();
    return currentTime >= expirationTime;
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("favs"); // Limpia cualquier estado persistente
    setRol(null);
    setUser(null);
    dispatch({ type: "LOGOUT" }); // Actualiza el estado global
  
    // Redirigir al home
    window.location.href = "/";
  };

  return {
    loginUser,
    loading,
    error,
    rol,
    user,
    handleLogout,
    checkToken,
    isTokenExpired
  };
};

export default useAuthLogin;
