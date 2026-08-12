import { apiClient } from '../../../shared/api/client.js';

export const commentApi = {
  list: (postId) => apiClient.get(`/posts/${postId}/comments`).then((res) => res.data),
  create: (postId, text) => apiClient.post(`/posts/${postId}/comments`, { text }).then((res) => res.data),
  remove: (postId, id) => apiClient.delete(`/posts/${postId}/comments/${id}`),
};
