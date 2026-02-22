import apiClient from './client';

export const authApi = {
  checkUserName: (userName: string) =>
    apiClient.post(`/auth/checkUserName/${userName}`),

  checkMail: (mail: string) =>
    apiClient.post(`/auth/mailValidation/${mail}`),

  signup: (data: { data: { userName: string; sureName: string; mail: string; password: string } }) =>
    apiClient.post('/auth/signup', data),

  signin: (data: { data: { mail: string; password: string } }) =>
    apiClient.post('/auth/signin', data),

  googleAuth: (tokenId: string) =>
    apiClient.post('/auth/googleAuth', { tokenId }),

  checkAuth: () =>
    apiClient.get('/auth/checkAuth'),

  deleteAccount: (uid: string) =>
    apiClient.delete(`/auth/deleteAccount/${uid}`),
};
