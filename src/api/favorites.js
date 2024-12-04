import api from './api';

export const toggleFavorite = async (email, experienceId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post(
      `/users/favorites/${email}?experienceId=${experienceId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return { success: true }; 
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return { success: false, error: error.message }; 
  }
};


export const getFavorites = async (experienceIdList) => {
  try {
    const token = localStorage.getItem("token");
    if (!experienceIdList || experienceIdList.length === 0) {
      throw new Error("La lista de IDs de experiencias está vacía o no es válida.");
    }

    const queryParam = experienceIdList.join(","); 
    const response = await api.get(`/experiences/favorites?experienceIdList=${queryParam}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data ;
    }
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return { success: false, error: error.message }; 
  }
};
