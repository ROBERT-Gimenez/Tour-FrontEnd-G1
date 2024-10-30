import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "../../reducers/reducer";
import mockProducto from "../../components/utils/mockProducto.json"; // Asegúrate de que la ruta sea correcta

export const ContextGlobal = createContext();
const lsFavs = JSON.parse(localStorage.getItem("favs")) || [];

const initialState = {
  productos: [],
  favs: lsFavs,
  theme: true,
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Comentar la llamada a Axios
    // axios(url).then((res) => {
    //   dispatch({ type: "GET_PRODUCTOS", payload: res.data });
    // });

    dispatch({ type: "GET_PRODUCTOS", payload: mockProducto });
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