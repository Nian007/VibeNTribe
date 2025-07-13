import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { config } from '../config';
import { ApiResponse, LoginResponse, User, OnboardingData, MatchResponse } from '../types';

// Create axios instance with default configuration
const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: config.api.baseUrl,
    timeout: config.api.timeout,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor to add auth token
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor for error handling
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

const api = createApiInstance();

// API service class
export class ApiService {
  // Authentication endpoints
  static async loginWithLinkedIn(code: string, state: string): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/linkedin', {
      code,
      state,
    });
    
    if (!response.data.success) {
      throw new Error(response.data.error || 'Login failed');
    }
    
    return response.data.data!;
  }

  static async refreshToken(): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/refresh');
    
    if (!response.data.success) {
      throw new Error(response.data.error || 'Token refresh failed');
    }
    
    return response.data.data!;
  }

  static async logout(): Promise<void> {
    await api.post('/auth/logout');
  }

  // User endpoints
  static async getCurrentUser(): Promise<User> {
    const response = await api.get<ApiResponse<User>>('/users/me');
    
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to fetch user');
    }
    
    return response.data.data!;
  }

  static async updateUser(userData: Partial<User>): Promise<User> {
    const response = await api.put<ApiResponse<User>>('/users/me', userData);
    
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to update user');
    }
    
    return response.data.data!;
  }

  // Onboarding endpoints
  static async submitOnboarding(data: OnboardingData): Promise<void> {
    const response = await api.post<ApiResponse>('/onboarding', data);
    
    if (!response.data.success) {
      throw new Error(response.data.error || 'Onboarding failed');
    }
  }

  static async getOnboardingStatus(): Promise<{ isCompleted: boolean; data?: OnboardingData }> {
    const response = await api.get<ApiResponse<{ isCompleted: boolean; data?: OnboardingData }>>('/onboarding/status');
    
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to fetch onboarding status');
    }
    
    return response.data.data!;
  }

  // Matching endpoints
  static async getMatches(page: number = 1, limit: number = 10): Promise<MatchResponse> {
    const response = await api.get<ApiResponse<MatchResponse>>('/matches', {
      params: { page, limit },
    });
    
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to fetch matches');
    }
    
    return response.data.data!;
  }

  static async acceptMatch(matchId: string): Promise<void> {
    const response = await api.post<ApiResponse>(`/matches/${matchId}/accept`);
    
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to accept match');
    }
  }

  static async declineMatch(matchId: string): Promise<void> {
    const response = await api.post<ApiResponse>(`/matches/${matchId}/decline`);
    
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to decline match');
    }
  }

  // Notification endpoints
  static async sendWhatsAppNotification(userId: string, message: string): Promise<void> {
    const response = await api.post<ApiResponse>('/notifications/whatsapp', {
      userId,
      message,
    });
    
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to send WhatsApp notification');
    }
  }

  static async getNotifications(page: number = 1, limit: number = 20): Promise<any> {
    const response = await api.get<ApiResponse>('/notifications', {
      params: { page, limit },
    });
    
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to fetch notifications');
    }
    
    return response.data.data!;
  }

  static async markNotificationAsRead(notificationId: string): Promise<void> {
    const response = await api.put<ApiResponse>(`/notifications/${notificationId}/read`);
    
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to mark notification as read');
    }
  }
}

// Error handling utility
export const handleApiError = (error: any): string => {
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};

export default api;
