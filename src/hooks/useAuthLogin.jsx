import { useState, useEffect } from 'react';
import { login } from '../api/authLogin';
import { jwtDecode } from "jwt-decode";

const useAuthLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);
  const [user, setUser] = useState(null);

  const loginUser = async(userData) => {
    try {
        setLoading(true);
        setError(null); 
        const data = await login(userData);
        handleLogin(data.token)
        checkToken();
        return data;
    } catch (err) {
        console.log(err)
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
      localStorage.setItem("user", JSON.stringify(decodedToken));
      setUser(decodedToken);
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
        localStorage.removeItem('authToken');
        localStorage.removeItem('userFavoriteExperienceList')
        setRole(null);
        setUsername(null);
        return;
      }
      const decodedToken = decodeJwt(token);
      setRole(decodedToken.roles);
      setUsername(decodedToken.sub);
      return;
    }
    localStorage.removeItem('userFavoriteExperienceList');
  };

  useEffect(() => {
    checkToken();
  }, []);

  const isTokenExpired = (token) => {//ver
    const decodedToken = decodeJwt(token);
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();
    return currentTime >= expirationTime;
  };

  const logout = () => {
    localStorage.removeItem("token");
    checkToken();
  };

  return {
    loginUser,
    loading,
    error,
    role,
    username,
    logout,
    checkToken,
    isTokenExpired,
    user
  };
};

export default useAuthLogin;
