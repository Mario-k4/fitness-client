import apiClient from "../api/apiClient";

export const logoutUser = async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
}