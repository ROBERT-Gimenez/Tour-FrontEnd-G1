import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faSearch } from "@fortawesome/free-solid-svg-icons";
import ProductPopup from "./components/admin/ProductPopup.jsx";
import DeletePopup from "./components/admin/DeletePopup.jsx";
import { CharacteristicsForm } from "./components/admin/CharacteristicsForm.jsx";
import { CatalagoForm } from "./components/admin/CatagoriForm.jsx";
import { useContextGlobal } from "../utils/GlobalContext.jsx";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Link } from "react-router-dom";
import { createProduct } from "../api/productos.js";
import { showErrorAlert } from "../api/alert.js";

function Admin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { state, dispatch } = useContextGlobal();
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario es administrador
    const adminRoles = state?.user?.roles?.some((role) => role.name === "ADMIN");
    if (!adminRoles) {
      navigate("/"); // Redirige si no es administrador
    }
  }, [state?.user?.roles, navigate]);

  useEffect(() => {
    // Sincronizar productos con el estado global
    if (state.productos) {
      setProductos(state.productos);
    }
  }, [state.productos]);

  useEffect(() => {
    // Sincronizar categorías con el estado global
    if (state.categorias) {
      setCategorias(state.categorias);
    }
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
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSave = async (item) => {
    const isDuplicateName = state?.productos?.some(
      (producto) => producto?.nombre === item?.nombre && producto?.id !== item.id
    );

    if (isDuplicateName) {
      showErrorAlert("Ya existe un producto con ese nombre. Por favor, elija un nombre diferente.")
      return;
    }

    let updateList;
    const existingProductIndex = state?.productos?.findIndex(
      (producto) => producto.id === item.id
    );
    if (existingProductIndex !== -1) {
      updateList = state.productos?.map((producto, index) =>
        index === existingProductIndex ? item : producto
      );
    } else {
      updateList = [...state.productos, item];
    }

    dispatch({ type: "PUT_PRODUCTOS", updateList });
    setProductos(updateList);

    const formData = await setFormData(item);

    await createProduct(formData);
  };

  const setFormData = async (item) => {
    const formData = new FormData();
    formData.append("nombre", item.nombre);
    formData.append("descripcion", item.descripcion);
    formData.append("ubicacion", item.ubicacion);
    formData.append("precio", item.precio);
    formData.append("categoriaId", item.categoriaId);
    item?.caracteristicas?.forEach((id) => {
      formData.append("caracteristicaIds[]", id);
    });

    item?.img.forEach((imagen) => {
      formData.append("imagenes[]", imagen);
    });

    item?.fechasDisponibles.forEach((fechaDisponible, index) => {
      formData.append(`fechasDisponibles[${index}].fecha`, fechaDisponible.fecha);
      formData.append(`fechasDisponibles[${index}].stock`, fechaDisponible.stock);
      formData.append(`fechasDisponibles[${index}].duracionDias`, fechaDisponible.duracionDias);
    });

    return formData;
  };

  return isMobile ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className="text-red-500 text-4xl mb-4"
        />
        <h2 className="text-xl font-bold text-red-600 mb-2">Acceso Restringido</h2>
        <p className="text-gray-700">
          No se puede acceder a esta vista desde un dispositivo móvil. Por favor, utilice un
          dispositivo con una pantalla más grande.
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
              <input
                type="text"
                className="input-search"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Buscar destino..."
              />
              <FontAwesomeIcon icon={faSearch} className="absolute top-2.5 right-3 text-gray-400" />
            </div>
            <div className="btns-popus">
              <ProductPopup item={state?.productos} onEdit={handleSave} isEditing={false} />
              <Link to="/admin/users">
                <button className="btn-open-characterist">Usuarios</button>
              </Link>
              <CharacteristicsForm />
              <CatalagoForm />
            </div>
          </div>
        </div>
        <div className="max-h-[60vh] overflow-y-auto overflow-x-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 sticky top-0 ">
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
              {filteredData?.map((item, index) => (
                <tr key={index}>
                  <td className="table-cell">{item.ubicacion}</td>
                  <td className="table-cell">{item.nombre}</td>
                  <td className="table-cell">{item.precio}</td>
                  <td className="table-cell">{item.stock - item.comprados}</td>
                  <td className="table-cell">{item.comprados}</td>
                  <td className="table-cell">
                    <div className="flex gap-2">
                      <ProductPopup
                        key={item.id}
                        item={item}
                        onEdit={handleSave}
                        isEditing={true}
                      />
                      <DeletePopup itemDelete={item} onDelete={() => {}} />
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
