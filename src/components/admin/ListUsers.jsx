import "./admin.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import logo from "../../assets/Logo.svg";

const UserGrid = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("authToken"))); 

  useEffect(() => {
    Swal.fire({
      title: 'Cargando usuarios...',
      text: 'Por favor espera...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    axios
      .get('http://localhost:8080/auth/users')
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
        Swal.close();
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar usuarios',
          text: 'No se pudo cargar la lista de usuarios. Intenta nuevamente.',
          background: '#dc3545', 
          color: '#fff',
          iconColor: '#fff',
        });
        setLoading(false);
      });
  }, []);


  const toggleRole = (userId, newRole) => {
    Swal.fire({
      title: 'Actualizando rol...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); 
      },
    });

    handleRoleChange(userId, newRole)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Rol actualizado',
          text: `El usuario ahora es ${newRole ? 'ADMIN' : 'USER'}.`,
          imageUrl: logo,
          imageWidth: 150,
          imageHeight: 150, 
          imageAlt: 'Logo',
        });
      })
      .catch((error) => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar',
          text: 'Hubo un problema al actualizar el rol. Intenta nuevamente.',
        });
      });
  };

  const handleRoleChange = async (userId, isAdmin) => {
    console.log(token)
    try {
      const nuevoRol = isAdmin ? "admin" : "user";

      await axios.put(
        "http://localhost:8080/auth/actualizar-rol",
        { userId, nuevoRol },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                roles: [{ ...user.roles[0], name: nuevoRol.toUpperCase() }],
              }
            : user
        )
      );
    } catch (error) {
      console.error("Error al actualizar el rol del usuario:", error);
    }
  };

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-grid-container">
      <h2>Listado de Usuarios</h2>
      <div className="user-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>
              {user.nombre} {user.apellido}
            </h3>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Rol actual:</strong> {user.roles[0]?.name || "USER"}
            </p>
            <div className="checkbox-container">
              <span className="checkbox-label">Dar rol de Admin:</span>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={user.roles[0]?.name === "ADMIN"}
                  onChange={(e) => toggleRole(user.id, e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserGrid;