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
      const nuevoFavorito = {
        id: action.payload.id,
        nombre: action.payload.nombre,
        img: action.payload.imagenes || [],
        categoria: action.payload.categoria?.name || "Sin categoría",
        ubicacion: action.payload.ubicacion || "Ubicación no disponible",
      };

      if (state.favs.some((fav) => fav.id === nuevoFavorito.id)) {
        return state;
      }

      return { ...state, favs: [...state.favs, nuevoFavorito] };

    case "REMOVE_FAV":
      const filteredFavs = state.favs.filter(
        (fav) => fav.id !== action.payload.id
      );
      return { ...state, favs: filteredFavs };

    case "TOGGLE_THEME":
      return { ...state, theme: !state.theme };

    case "LOGIN":
      return { ...state, user: action.payload };

    case "LOGOUT":
      return { ...state, user: null };

    default:
      return state;
  }
};
