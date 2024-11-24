import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "../../reducers/reducer";
import mockProducto from "../../components/utils/mockProducto.json";
import axios from "axios";

export const ContextGlobal = createContext();
const lsFavs = JSON.parse(localStorage.getItem("favs")) || [];
const products = JSON.parse(localStorage.getItem("productos")) || mockProducto;
const catagori = JSON.parse(localStorage.getItem("catagorias")) || [];
const caracteristica = JSON.parse(localStorage.getItem("caracteristicas")) || [];
const user = JSON.parse(localStorage.getItem("user")) || [];

const initialState = {
  productos: [],
  favs: lsFavs,
  theme: true,
  user: user || {},
  productos: products || [],
  catagorias: catagori || [],
  caracteristicas: caracteristica || [],
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authHeader = state.user?.token 
  ? { Authorization: `Bearer ${state.user.token}` }
  : {};

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get("http://localhost:8080/travel/public/categorias");
        dispatch({ type: "GET_CATEGORIAS", payload: response.data });
        localStorage.setItem("categorias", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      }
    };

    fetchCategorias();
  }, []);


  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(state.productos));

  }, []);

  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(state.favs));
  }, [state.favs]);
  

  return (
    <ContextGlobal.Provider value={{ state, dispatch }}>
      {children}
    </ContextGlobal.Provider>
  );
};

export const useContextGlobal = () => {
  return useContext(ContextGlobal);
};