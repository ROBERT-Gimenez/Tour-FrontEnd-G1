//src\routes\SubComponentes\IniciarSesion.jsx
import React, { useState } from 'react';
import './session.css'; 
import { useNavigate } from 'react-router-dom';
import { useContextGlobal } from '../../components/utils/GlobalContext';

const IniciarSesion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { dispatch } = useContextGlobal();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === 'user@example.com' && password === 'password123') {
      setUser({ name: 'John Doe', email });
      setError('');
      const token = 'token';
      localStorage.setItem("token",token)
      dispatch({ type: 'LOGIN', payload: token });
      setTimeout(() => {
        navigate('/'); 
      }, 2000);
    } else {
      setError('Correo electrónico o contraseña incorrectos');
    }

  };

  return (
    <div className="container">
      {user ? (
        <div>
          <div className="avatar">
            {user.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <p className="welcome-message">Bienvenido, {user.name}!</p>
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="title">Iniciar sesión</h2>
          <input
            className="input"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className="error-message">{error}</div>}
          <button className="button" type="submit">Iniciar sesión</button>
        </form>
      )}
    </div>
  );
};

export default IniciarSesion;
