import axios from "axios";

const API_URL = "http://localhost:5000";

export const api = axios.create({
  baseURL: API_URL,
});

export const registerUser = async (userData) => {
  return await api.post("/register", userData);
};

export const loginUser = async (credentials) => {
  return await api.post("/login", credentials);
};
