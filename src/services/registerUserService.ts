import apiClient from '../api/apiClient';

export const registerUser = async (name: string, email: string, password: string) => {
  const response = await apiClient.post('/users/create-user', { name, email, password });
  return response.data;
};
