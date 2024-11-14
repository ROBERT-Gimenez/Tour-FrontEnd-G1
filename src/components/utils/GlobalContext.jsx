import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "../../reducers/reducer";
import mockProducto from "../../components/utils/mockProducto.json";
import categorias from "../../components/utils/categorias.json";
import caracteristicas from "../../components/utils/caracteristicas.json";

export const ContextGlobal = createContext();
const lsFavs = JSON.parse(localStorage.getItem("favs")) || [];
const products = JSON.parse(localStorage.getItem("productos")) || mockProducto;
const catagori = JSON.parse(localStorage.getItem("catagorias")) || categorias;
const caracteristica = JSON.parse(localStorage.getItem("caracteristicas")) || caracteristicas;
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

  useEffect(() => {
    localStorage.setItem("categorias", JSON.stringify(state.catagorias));
    localStorage.setItem("productos", JSON.stringify(state.productos));

  }, []);

  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(state.favs));
  }, [state.favs]);

  useEffect(() => {
      localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <ContextGlobal.Provider value={{ state, dispatch }}>
      {children}
    </ContextGlobal.Provider>
  );
};

export const useContextGlobal = () => {
  return useContext(ContextGlobal);
};