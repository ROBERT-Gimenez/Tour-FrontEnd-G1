import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "../reducers/reducer";
import axios from "axios";
import { getProducts } from "../api/productos";

export const ContextGlobal = createContext();
const lsFavs = JSON.parse(localStorage.getItem("favs")) || [];
const products =[];
const catagori = JSON.parse(localStorage.getItem("categorias")) || [];
const caracteristica = JSON.parse(localStorage.getItem("caracteristicas")) || [];

const initialState = {
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

  useEffect(() => {
    const fetchCaracteristicas = async () => {
      try {
        const response = await axios.get("http://localhost:8080/travel/public/caracteristicas");
        dispatch({ type: "GET_CARACTERISTICAS", payload: response.data });
      } catch (error) {
        console.error("Error al cargar las caracteristicas:", error);
      }
    };

    fetchCaracteristicas();
    loadProducts()
  }, []);


  const loadProducts = async () => {
    try{
      const response = await getProducts()
      console.log(response)
      dispatch({ type:"GET_PRODUCTOS" , payload: response})
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