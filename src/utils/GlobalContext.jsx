import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "../reducers/reducer";
import mockProducto from "./mockProducto.json";
import axios from "axios";
import useAuthLogin from "../hooks/useAuthLogin";
import { getProducts } from "../api/productos";

export const ContextGlobal = createContext();
const lsFavs = JSON.parse(localStorage.getItem("favs")) || [];
const products =[];
const catagori = JSON.parse(localStorage.getItem("catagorias")) || [];
const caracteristica = JSON.parse(localStorage.getItem("caracteristicas")) || [];

const initialState = {
  productos: [],
  favs: lsFavs,
  theme: true,
  user: {} ,
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
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      }
    };

    fetchCategorias();
    loadProducts()
  }, []);

  const loadProducts = async () => {
    try{
      const response = await getProducts()
      dispatch({ type:"GET_PRODUCTOS" , payload: response.data})
    }catch(err){
      console.error("Error al cargar los productos:", error);
    }
  }


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