import axios from "axios";
import { API_BASE_URL } from "../Utils/constants.js";

const apiClient = axios.create({
    baseURL: `${API_BASE_URL}/api/auth`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});


apiClient.interceptors.request.use(
    (config) => {
        console.log(`[Frontend API Request] ${config.method.toUpperCase()} to ${config.baseURL || ""}${config.url}`, {
            headers: config.headers,
            data: config.data
        });
        return config;
    },
    (error) => {
        console.error(`[Frontend API Request Error]`, error);
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        console.log(`[Frontend API Response Success] ${response.status} from ${response.config.url}`, response.data);
        return response;
    },
    (error) => {
        console.error(`[Frontend API Response Error] from ${error.config?.url || "unknown URL"}:`, {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });
        const message =
            error.response?.data?.message ||
            error.message ||
            "Something went wrong. Please try again.";

        return Promise.reject(new Error(message));
    }
);

export default apiClient;
