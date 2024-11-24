// src/routes/Admin.jsx

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import AdminPopup from "../components/admin/AdminPopup.jsx";
import DeletePopup from "../components/admin/DeletePopup.jsx";
import { CharacteristicsForm } from "../components/admin/CharacteristicsForm.jsx";
import { CatalagoForm } from "../components/admin/CatagoriForm.jsx";
import { useContextGlobal } from "../components/utils/GlobalContext.jsx";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Link } from "react-router-dom";

function Admin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { state, dispatch } = useContextGlobal();
  const [productos, setProductos] = useState(state.productos);
  const [usuarios, setUsuarios] = useState([]); // Nuevo estado para los usuarios
  const [showUsuarios, setShowUsuarios] = useState(false); // Estado para controlar si mostramos los usuarios
  const [categorias, setCategorias] = useState(state.catagorias || []);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCategorias(state.categorias || []);
  }, [state.categorias]);

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions ? selectedOptions.map((opt) => opt.value) : []);
  };

  const filteredData = productos?.filter((item) => {
    const categoriaNombre = categorias.find(
      (categoria) => categoria.id === item.categoria
    )?.name;

    const matchesSearchTerm = item?.ubicacion
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(categoriaNombre);

    return matchesSearchTerm && matchesCategory;
  });

  const categoryOptions = categorias.map((categoria) => ({
    value: categoria.name,
    label: categoria.name,
  }));


  useEffect(() => {
    const admin = state?.user?.roles[0];
    if(admin.name != "ADMIN"){
      navigate("/")
    }
  }, [navigate]);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const fetchedUsuarios = [
      { id: 1, nombre: "Juan Perez", email: "juan@ejemplo.com" },
      { id: 2, nombre: "Ana Gomez", email: "ana@ejemplo.com" },
      { id: 3, nombre: "Carlos Ruiz", email: "carlos@ejemplo.com" },
    ];
    setUsuarios(fetchedUsuarios);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSave = (item) => {
    console.log("Enviar:", item);

    const isDuplicateName = state.productos.some(
      (producto) => producto?.nombre === item?.nombre && producto?.id !== item.id
    );
    if (isDuplicateName) {
      alert(
        "Ya existe un producto con ese nombre. Por favor, elija un nombre diferente."
      );
      return;
    }

    let updateList;
    const existingProductIndex = state?.productos.findIndex(
      (producto) => producto.id === item.id
    );

    if (existingProductIndex !== -1) {
      updateList = state.productos.map((producto, index) =>
        index === existingProductIndex ? item : producto
      );
    } else {
      updateList = [...state.productos, item];
    }
    localStorage.setItem("productos", JSON.stringify(updateList));
    dispatch({ type: 'PUT_PRODUCTOS' , updateList })
    setProductos(updateList)
  };

  const handleDelete = (item) => {
    console.log("Eliminar:", item);
  };

  const toggleUsuariosList = () => {
    setShowUsuarios(!showUsuarios); // Alternamos la visibilidad de la lista de usuarios
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
                        
          <div className="flex items-center space-x-4 content-search-inputs">
            
          <div className="fitered-categori">
            <Select
              isMulti
              options={categoryOptions}
              placeholder="Seleccione categorías"
              onChange={handleCategoryChange}
              classNamePrefix="react-select"
            />
            <p>Productos: {filteredData?.length}</p>
          </div>

            <div className="relative">
              <input type="text" className="input-search" value={searchTerm} onChange={handleSearch}
                placeholder="Buscar destino..." />
              <FontAwesomeIcon icon={faSearch} className="absolute top-2.5 right-3 text-gray-400" />
            </div>
            <div className="btns-popus">
            <AdminPopup item={state?.productos[0]} onEdit={handleSave} isEditing={false}/>
            <Link to="/admin/users">
                <button className="btn-open-characterist">
                  Usuarios
                </button>
              </Link>
              <CharacteristicsForm/>
              <CatalagoForm/>
            </div>
          </div>

        </div>

        {/* Mostrar la lista de administradores */}
        {showUsuarios && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h2 className="text-xl font-bold mb-4">Lista de Administradores</h2>
            <ul>
              {usuarios.map((usuario) => (
                <li key={usuario.id} className="mb-2">
                  <span>
                    {usuario.nombre} ({usuario.email})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="max-h-[60vh] overflow-y-auto overflow-x-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 sticky top-0 ">
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
