import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "../../reducers/reducer";
import mockProducto from "../../components/utils/mockProducto.json";

export const ContextGlobal = createContext();
const lsFavs = JSON.parse(localStorage.getItem("favs")) || [];
const user = JSON.parse(localStorage.getItem("user")) || [];

const initialState = {
  productos: [],
  favs: lsFavs,
  theme: true,
  user: user || {},
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // axios(url).then((res) => {
    //   dispatch({ type: "GET_PRODUCTOS", payload: res.data });
    // });

    dispatch({ type: "GET_PRODUCTOS", payload: mockProducto });
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