import apiClient from "../api/apiClient"

export const loginUser = async (email: string, password: string) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
}