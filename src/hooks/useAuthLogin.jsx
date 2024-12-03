import { useState, useEffect } from 'react';
import { login } from '../api/authLogin';
import { jwtDecode } from "jwt-decode";

const useAuthLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rol, setRol] = useState(null);
  const [user, setUser] = useState({});

  const loginUser = async(userData) => {
    try {
        setLoading(true);
        setError(null); 
        const data = await login(userData);
        const decodedToken = await handleLogin(data.token)
        checkToken();
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
      return decodedToken
    } catch (error) {
      console.error("Error al decodificar el token", error);
    }
}

  const decodeJwt = (token) => {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  };

  const checkToken = () => {//ver
    const token = localStorage.getItem("authToken");
    if (token) {
      if (isTokenExpired(token)) {
        console.log("sin token")
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
    checkToken();
    window.location.reload()
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
