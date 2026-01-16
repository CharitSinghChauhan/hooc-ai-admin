import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
});

export const googleAuth = (code: string) =>
  api.get(`/auth/google?code=${code}`);

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const getUserProfile = () => api.get("/auth/profile");

export const getAllUsers = () => api.get("/users");

export const updateUserRole = (userId: string, role: string) =>
  api.patch(`/users/${userId}/role`, { role });
