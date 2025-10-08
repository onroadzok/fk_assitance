import axios from 'axios';
import type {
  Report,
  CreateReportRequest,
  DashboardStats,
  CourseStats,
  PaginatedResponse,
} from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const reportAPI = {
  generate: (data: CreateReportRequest) =>
    api.post<Report>('/api/reports/generate', data),

  list: (params?: {
    page?: number;
    limit?: number;
    type?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }) => api.get<PaginatedResponse<Report>>('/api/reports', { params }),

  getById: (id: string) => api.get<Report>(`/api/reports/${id}`),

  download: (id: string) =>
    api.get(`/api/reports/${id}/download`, {
      responseType: 'blob',
    }),
};

export const analyticsAPI = {
  getDashboard: () => api.get<DashboardStats>('/api/analytics/dashboard'),
  getCourseStats: (courseId: string) =>
    api.get<CourseStats>(`/api/analytics/course/${courseId}`),
};

export const healthAPI = {
  check: () => api.get('/api/health'),
};

export default api;
