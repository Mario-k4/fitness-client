import apiClient from "../api/apiClient"

export const resetPassword = async (token: string, newPassword: string) => {
    const response = await apiClient.post("/auth/reset-password", { token, newPassword })
    return response.data
}