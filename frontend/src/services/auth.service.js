import { axiosInstance } from "../api/axiosInstance";

export const login = async (credentials) => {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
}