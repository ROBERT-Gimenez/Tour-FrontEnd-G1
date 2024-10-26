//src\routes\Admin.jsx

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import AdminPopup from '../components/admin/AdminPopup.jsx'
import DeletePopup from '../components/admin/DeletePopup.jsx'
import mockProducto from "../components/utils/mockProducto.json"
function Admin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [productos, setProductos] = useState(mockProducto);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSave = (item) => {
    console.log("Enviar:", item)
    let updateList
    const existingProductIndex = productos.findIndex((producto) => producto.id === item.id);
    if (existingProductIndex !== -1) {
      updateList = productos.map((producto, index) =>
        index === existingProductIndex ? item : producto
      );
    }else{
      updateList = [...prevProductos, item];
    }
    setProductos(updateList) 
  };

  const handleDelete = (item) => {
    console.log("Eliminar:", item);
  };
 

  const filteredData = productos.filter((item) =>
    item.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="table-admin overflow-x-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Administración
        </h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input type="text" className="input-search"
              value={searchTerm}  onChange={handleSearch}
              placeholder="Buscar destino..."
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute top-2.5 right-3 text-gray-400"
            />
          </div>
          <AdminPopup item={productos[0]} onEdit={handleSave} isEditing={false} />
        </div>
      </div>

      <div className="max-h-[60vh] overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="table-header">Destino</th>
              <th className="table-header">Nombre</th>
              <th className="table-header">Precio</th>
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
                <td className="table-cell">{item.stock - item.comprados}</td>
                <td className="table-cell">{item.comprados}</td>
                <td className="table-cell">
                  <div className="flex gap-2">
                  <AdminPopup key={item.id} item={item} onEdit={handleSave} isEditing={true} />

                  <DeletePopup itemDelete={item} onDelete={handleDelete} />
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
