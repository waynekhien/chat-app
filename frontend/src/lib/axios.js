import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "/api" : "https://chat-app-backend-lqld.onrender.com/api",
    withCredentials: true
})