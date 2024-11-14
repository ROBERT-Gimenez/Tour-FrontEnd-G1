export const reducer = (state, action) => {
    switch (action.type) {
      case "PUT_CARACTERISTICAS": 
        return { ...state, caracteristicas: action.updateList };
      case "GET_CARACTERISTICAS": 
        return { ...state, caracteristicas: action.payload };
      case "PUT_CATEGORIAS": 
        return { ...state, categorias: action.updateList };
      case "GET_CATEGORIAS": 
        return { ...state, categorias: action.payload };
      case "PUT_PRODUCTOS": 
        return { ...state, productos: action.updateList };
      case "GET_PRODUCTOS": 
        return { ...state, productos: action.payload };
      case "ADD_FAV":
        return { ...state, favs: [...state.favs, action.payload] };
      case "TOGGLE_THEME":
        return { ...state, theme: !state.theme };
      case "REMOVE_FAV":
        const filteredFavs = state.favs.filter(
          (fav) => fav.id !== action.payload.id
        );
        return { ...state, favs: filteredFavs };
      case "LOGIN":
        return { ...state, user: action.payload };
      case "LOGOUT":
        return { ...state, user: null };
      default:
        return state;
    }
  };