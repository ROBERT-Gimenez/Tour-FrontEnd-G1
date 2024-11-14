// src/routes/Admin.jsx
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import AdminPopup from "../components/admin/AdminPopup.jsx";
import DeletePopup from "../components/admin/DeletePopup.jsx";
import mockProducto from "../components/utils/mockProducto.json";

function Admin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [productos, setProductos] = useState(mockProducto);
  const [usuarios, setUsuarios] = useState([
    {
      name: "John Doe",
      email: "user@example.com",
      password: "password123",
      isAdmin: true,
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      password: "password456",
      isAdmin: false,
    },
    {
      name: "Bob Brown",
      email: "bob@example.com",
      password: "password789",
      isAdmin: false,
    },
  ]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSave = (item) => {
    console.log("Enviar:", item);

    const isDuplicateName = productos.some(
      (producto) => producto.nombre === item.nombre && producto.id !== item.id
    );
    if (isDuplicateName) {
      alert(
        "Ya existe un producto con ese nombre. Por favor, elija un nombre diferente."
      );
      return;
    }

    let updateList;
    const existingProductIndex = productos.findIndex(
      (producto) => producto.id === item.id
    );

    if (existingProductIndex !== -1) {
      updateList = productos.map((producto, index) =>
        index === existingProductIndex ? item : producto
      );
    } else {
      updateList = [...productos, item];
    }

    setProductos(updateList);
  };

  const handleDelete = (item) => {
    console.log("Eliminar:", item);
  };

  const filteredData = productos.filter((item) =>
    item.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdminModal = () => {
    setIsAdminModalOpen(true);
  };

  const handleCloseAdminModal = () => {
    setIsAdminModalOpen(false);
  };

  const handleAssignAdmin = (user) => {
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((u) =>
        u.email === user.email ? { ...u, isAdmin: true } : u
      )
    );
    setSelectedUser(user);
    setIsAdminModalOpen(false);
  };

  return isMobile ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className="text-red-500 text-4xl mb-4"
        />
        <h2 className="text-xl font-bold text-red-600 mb-2">
          Acceso Restringido
        </h2>
        <p className="text-gray-700">
          No se puede acceder a esta vista desde un dispositivo móvil. Por
          favor, utilice un dispositivo con una pantalla más grande.
        </p>
      </div>
    </div>
  ) : (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow table-admin overflow-x-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 p-10">
            Administración
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                className="input-search"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Buscar destino..."
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute top-2.5 right-3 text-gray-400"
              />
            </div>
            <div className="flex space-x-4">
              <AdminPopup
                item={productos[0]}
                onEdit={handleSave}
                isEditing={false}
              />
              <button
                onClick={handleOpenAdminModal}
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Agregar Administradores
              </button>
            </div>
          </div>
        </div>

        {/* Lista de usuarios disponibles para asignar como administradores */}
        {isAdminModalOpen && (
          <div className="modal fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Selecciona un Usuario</h2>
              <ul>
                {usuarios.map((user) => (
                  <li
                    key={user.email}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                    onClick={() => handleAssignAdmin(user)}
                  >
                    {user.name} ({user.email})
                  </li>
                ))}
              </ul>
              <button
                onClick={handleCloseAdminModal}
                className="mt-4 bg-red-500 text-white p-2 rounded-md"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        <div className="max-h-[60vh] overflow-y-auto overflow-x-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="table-header">Destino</th>
                <th className="table-header">Nombre</th>
                <th className="table-header">Precio</th>
                <th className="table-header">Fecha</th>
                <th className="table-header">Disponible</th>
                <th className="table-header">Comprados</th>
                <th className="table-header">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td className="table-cell">{item.ubicacion}</td>
                  <td className="table-cell">{item.nombre}</td>
                  <td className="table-cell">{item.precio}</td>
                  <td className="table-cell">{item.fecha}</td>
                  <td className="table-cell">{item.stock - item.comprados}</td>
                  <td className="table-cell">{item.comprados}</td>
                  <td className="table-cell">
                    <div className="flex gap-2">
                      <AdminPopup
                        key={item.id}
                        item={item}
                        onEdit={handleSave}
                        isEditing={true}
                      />
                      <DeletePopup itemDelete={item} onDelete={handleDelete} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
