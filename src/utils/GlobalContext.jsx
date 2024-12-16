import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { reducer } from "../reducers/reducer";
import axios from "axios";
import { getProducts } from "../api/productos";
import { jwtDecode } from "jwt-decode";

export const ContextGlobal = createContext();

const lsFavs = JSON.parse(localStorage.getItem("favs")) || [];
const catagori = JSON.parse(localStorage.getItem("categorias")) || [];
const caracteristica = JSON.parse(localStorage.getItem("caracteristicas")) || [];
const storedToken = JSON.parse(localStorage.getItem("authToken"));
const initialUser = storedToken ? jwtDecode(storedToken) : null;

const initialState = {
  favs: lsFavs,
  theme: true,
  user: initialUser,
  productos: [],
  catagorias: catagori || [],
  caracteristicas: caracteristica || [],
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const showLoginPopup = () => setIsPopupVisible(!isPopupVisible);

  useEffect(() => {
    const initializeData = async () => {
      try {
        if (!state.productos || state.productos.length === 0) {
          const productsResponse = await getProducts();
          dispatch({ type: "GET_PRODUCTOS", payload: productsResponse });
        }
        if (!state.categorias || state.categorias.length === 0) {
          const categoriesResponse = await axios.get(
            "https://proyectofinald-production.up.railway.app/travel/public/categorias"
          );
          dispatch({ type: "GET_CATEGORIAS", payload: categoriesResponse.data });
        }
        if (!state.caracteristicas || state.caracteristicas.length === 0) {
          const featuresResponse = await axios.get(
            "https://proyectofinald-production.up.railway.app/travel/public/caracteristicas"
          );
          dispatch({ type: "GET_CARACTERISTICAS", payload: featuresResponse.data });
        }
      } catch (error) {
        console.error("Error inicializando datos:", error);
      }
    };

    initializeData();
  }, [state.productos, state.categorias, state.caracteristicas]);

  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(state.favs));
  }, [state.favs]);

  return (
    <ContextGlobal.Provider value={{ state, dispatch , isPopupVisible, showLoginPopup  }}>
      {children}
    </ContextGlobal.Provider>
  );
};

export const useContextGlobal = () => useContext(ContextGlobal);
