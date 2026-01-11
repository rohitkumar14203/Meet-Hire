import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle 401 errors (unauthorized)
        if (error.response && error.response.status === 401) {
            console.log("Unauthorized access - token may be expired or invalid");
            // You can dispatch a logout action here if needed
        }
        return Promise.reject(error);
    }
);