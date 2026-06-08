import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

// ✅ Create instance
export const axiosInstance = axios.create({
    baseURL: BASE_URL, // optional but recommended
    timeout: 10000,
});

// 🔧 Generic API connector
export const apiConnector = async <T = any>(
    method: Method,
    url: string,
    bodyData?: unknown,
    headers?: Record<string, string>,
    params?: Record<string, any>
): Promise<AxiosResponse<T>> => {
    const config: AxiosRequestConfig = {
        method,
        url,
        data: bodyData ?? undefined,
        headers: headers ?? undefined,
        params: params ?? undefined,
    };

    return axiosInstance(config);
};