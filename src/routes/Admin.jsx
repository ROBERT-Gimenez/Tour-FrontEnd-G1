//src\routes\Admin.jsx

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Admin() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (item) => {
    console.log("Editar:", item);
  };

  const handleDelete = (item) => {
    console.log("Eliminar:", item);
  };

  const handleAdd = () => {
    console.log("Agregar nuevo elemento");
  };

  const data = [
    { destino: "Nueva York", precio: "$500", stock: 10, comprados: 5 },
    { destino: "Los Ángeles", precio: "$600", stock: 20, comprados: 10 },
    { destino: "Chicago", precio: "$400", stock: 15, comprados: 7 },
    { destino: "Miami", precio: "$450", stock: 12, comprados: 3 },
    { destino: "Nueva York", precio: "$500", stock: 10, comprados: 5 },
    { destino: "Los Ángeles", precio: "$600", stock: 20, comprados: 10 },
    { destino: "Chicago", precio: "$400", stock: 15, comprados: 7 },
    { destino: "Miami", precio: "$450", stock: 12, comprados: 3 },
    { destino: "Nueva York", precio: "$500", stock: 10, comprados: 5 },
    { destino: "Los Ángeles", precio: "$600", stock: 20, comprados: 10 },
    { destino: "Chicago", precio: "$400", stock: 15, comprados: 7 },
    { destino: "Miami", precio: "$450", stock: 12, comprados: 3 },
  ];

  const filteredData = data.filter((item) =>
    item.destino.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="table-admin overflow-x-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Administración
        </h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar destino..."
              value={searchTerm}
              onChange={handleSearch}
              className="input-search"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute top-2.5 right-3 text-gray-400"
            />
          </div>

          <button onClick={handleAdd} className="button-add">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Agregar
          </button>
        </div>
      </div>

      <div className="max-h-[60vh] overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="table-header">Destino</th>
              <th className="table-header">Precio</th>
              <th className="table-header">Disponible</th>
              <th className="table-header">Comprados</th>
              <th className="table-header">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td className="table-cell">{item.destino}</td>
                <td className="table-cell">{item.precio}</td>
                <td className="table-cell">{item.stock - item.comprados}</td>
                <td className="table-cell">{item.comprados}</td>
                <td className="table-cell">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="button-edit"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-2" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="button-delete"
                    >
                      <FontAwesomeIcon icon={faTrash} className="mr-2" />
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
