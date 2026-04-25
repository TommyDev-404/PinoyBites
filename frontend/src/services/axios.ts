import { triggerSessionExpired } from "@/utils/sessionHandler";
import axios from "axios";
import type { AxiosInstance } from "axios";

// 1. Create Axios instance
const api: AxiosInstance = axios.create({
      baseURL: "http://localhost:3000", // replace with your backend
      headers: {
            "Content-Type": "application/json",
      },
      withCredentials: true,
});

//  Response interceptor (optional)
api.interceptors.response.use(
      (response) => response,
      (error) => {
            // Handle errors globally
            if (error.response.status) {
                  triggerSessionExpired();
                  console.error("Server error:", error.response.status, error.response.data.message);
            } else {
                  console.error("Network error:", error.message);
            }
      return Promise.reject(error);
      }
);

export default api;