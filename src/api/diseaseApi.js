import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/diseases`;

export const getDiseases = () =>
  axios.get(API);

export const addDisease = (data, token) =>
  axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
