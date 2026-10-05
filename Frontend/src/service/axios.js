import axios from 'axios';

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:7000/api/v2';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Attach Authorization header if access token exists in localStorage
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Blog endpoints
export const getAllBlogs = async () => {
  const response = await apiClient.get('/blog/blogs');
  return response.data?.data ?? [];
};

export const getBlogById = async (id) => {
  const response = await apiClient.get(`/blog/${id}`);
  return response.data?.data ?? null;
};

export const createBlogPost = async (formData) => {
  const response = await apiClient.post('/blog/create', formData);
  return response.data;
};

// Auth endpoints
export const loginUser = async ({ email, password }) => {
  const response = await apiClient.post('/users/login', { email, password });
  const token = response.data?.data?.accessToken;
  if (token) {
    localStorage.setItem('accessToken', token);
  }
  return response.data;
};

export const registerUser = async (formData) => {
  const response = await apiClient.post('/users/register', formData);
  return response.data;
};

export const logoutUser = async () => {
  try {
    await apiClient.post('/users/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('accessToken');
  }
};

export const currentUser = async () => {
  const response = await apiClient.get('/users/me');
  return response.data;
};

// Like endpoints
export const getBlogLikes = async (blogId) => {
  const response = await apiClient.get(`/like/${blogId}`);
  return response.data?.data ?? { likesCount: 0, isLiked: false };
};

export const toggleBlogLike = async (blogId) => {
  const response = await apiClient.post(`/like/toggle/${blogId}`);
  return response.data?.data ?? { likesCount: 0, isLiked: false };
};

// Comment endpoints
export const getBlogComments = async (blogId) => {
  const response = await apiClient.get(`/comment/${blogId}`);
  return response.data?.data ?? [];
};

export const createComment = async (blogId, content) => {
  const response = await apiClient.post(`/comment/${blogId}`, { content });
  return response.data?.data ?? response.data;
};

export const deleteComment = async (commentId) => {
  const response = await apiClient.delete(`/comment/${commentId}`);
  return response.data;
};

export const updateComment = async (commentId, content) => {
  const response = await apiClient.patch(`/comment/${commentId}`, { content });
  return response.data?.data ?? response.data;
};

export default apiClient;
