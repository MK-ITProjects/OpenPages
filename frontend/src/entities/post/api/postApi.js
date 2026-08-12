import { apiClient } from '../../../shared/api/client.js';

export const postApi = {
  list: (params) => apiClient.get('/posts', { params }).then((res) => res.data),
  feed: (params) => apiClient.get('/posts/feed', { params }).then((res) => res.data),
  drafts: () => apiClient.get('/posts/drafts').then((res) => res.data),
  top: (limit) => apiClient.get('/posts/top', { params: { limit } }).then((res) => res.data),
  popularTags: () => apiClient.get('/posts/tags/popular').then((res) => res.data),
  search: (q, params) => apiClient.get('/posts/search', { params: { q, ...params } }).then((res) => res.data),
  get: (slug) => apiClient.get(`/posts/${slug}`).then((res) => res.data),
  create: (payload) => apiClient.post('/posts', payload).then((res) => res.data),
  update: (id, payload) => apiClient.put(`/posts/${id}`, payload).then((res) => res.data),
  remove: (id) => apiClient.delete(`/posts/${id}`),
  clap: (slug) => apiClient.post(`/posts/${slug}/clap`).then((res) => res.data),
  bookmark: (slug) => apiClient.post(`/posts/${slug}/bookmark`).then((res) => res.data),
  userStats: () =>apiClient.get("/posts/stats").then((res) => res.data),
};
