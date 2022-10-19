import api from "../helpers/api";

const signup = async (username: string, email: string, password: string) => {
  return await api.post("/auth/signup", {
    username,
    email,
    password,
  });
};

const login = async (email: string, password: string) => {
  return await api.post("/auth/login", { email, password });
};

export { signup, login };
