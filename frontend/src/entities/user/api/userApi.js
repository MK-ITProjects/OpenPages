import { apiClient } from '../../../shared/api/client.js';

export const userApi = {
  get: (id) => apiClient.get(`/users/${id}`).then((res) => res.data),
  following: (id) => apiClient.get(`/users/${id}/following`).then((res) => res.data),
  followers: (id) => apiClient.get(`/users/${id}/followers`).then((res) => res.data),
  follow: (id) => apiClient.post(`/users/${id}/follow`).then((res) => res.data),
  bookmarks: () => apiClient.get('/users/me/bookmarks').then((res) => res.data),
  suggestions: (excludeId, limit) =>
    apiClient.get('/users/suggestions', { params: { exclude: excludeId, limit } }).then((res) => res.data),
};
