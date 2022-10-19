import api from "../helpers/api";
import { setSessionUser } from "../helpers/auth";

const getAllCharacters = async (page = 1) => {
  const { data } = await api.get("/api/character", {
    params: { page },
  });
  return data;
};

const getCharacter = async (id: string) => {
  try {
    const { data, status } = await api.get(`/api/character/${id}`);
    return { data, status };
  } catch ({ response: { data, status } }) {
    return { data: false, status: false };
  }
};

const updateFavs = async (userId: string, favs: number[]) => {
  const { data } = await api.patch(`/api/user/${userId}`, { favs });
  setSessionUser(data);
};

export { getAllCharacters, getCharacter, updateFavs };
