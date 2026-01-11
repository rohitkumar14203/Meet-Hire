import { axiosInstance } from "../api/axiosInstance";

export const login = async (credentials) => {
    const response = await axiosInstance.post("auth/login", credentials);
    return response.data;
}

export const getProfile = async () => {
    const response = await axiosInstance.get("auth/profile");
    return response.data;
}

export const logout = async () => {
    const response = await axiosInstance.post("auth/logout");
    return response.data;
}
