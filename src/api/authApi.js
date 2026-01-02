import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/auth`;

export const signupUser = (data) =>
  axios.post(`${API}/signup`, data);

export const loginUser = (data) =>
  axios.post(`${API}/login`, data);
