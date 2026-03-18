// src/api.js
import axios from "axios";

// Base URL from environment variable
const API_URL = process.env.REACT_APP_API_URL;

// Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Attach token automatically if exists
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;