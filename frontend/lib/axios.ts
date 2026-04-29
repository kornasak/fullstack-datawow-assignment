import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
