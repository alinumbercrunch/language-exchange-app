import AppError from '../../../shared/appError';
import { API_CONFIG } from '../constants/apiConstants';

import type { ValidationError } from '../../../shared/user.interface';

/**
 * Configuration options for API requests
 */
interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
}

/**
 * Standard API response wrapper
 */
interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: ValidationError[];
}

/**
 * Enhanced fetch wrapper with error handling and type safety
 * 
 * @param endpoint - API endpoint path
 * @param options - Request configuration options
 * @returns Promise resolving to the API response data
 * @throws {AppError} When the request fails or validation errors occur
 */
export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  const url = `${API_CONFIG.BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, config);
    const data: ApiResponse<T> = await response.json();

    if (!response.ok) {
      const errorMessage = data.errors 
        ? data.errors.map((err: ValidationError) => err.msg).join(', ')
        : data.message || `HTTP ${response.status}: Request failed`;
      
      throw new AppError(errorMessage, response.status);
    }

    // Return the data directly for successful responses
    return data.data as T;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    // Handle network errors and other fetch failures
    throw new AppError(
      error instanceof Error ? error.message : 'Network error occurred',
      500
    );
  }
}

/**
 * Convenience methods for common HTTP verbs
 */
export const api = {
  get: <T>(endpoint: string, headers?: Record<string, string>) =>
    apiRequest<T>(endpoint, { method: 'GET', headers }),

  post: <T>(endpoint: string, body?: unknown, headers?: Record<string, string>) =>
    apiRequest<T>(endpoint, { method: 'POST', body, headers }),

  put: <T>(endpoint: string, body?: unknown, headers?: Record<string, string>) =>
    apiRequest<T>(endpoint, { method: 'PUT', body, headers }),

  patch: <T>(endpoint: string, body?: unknown, headers?: Record<string, string>) =>
    apiRequest<T>(endpoint, { method: 'PATCH', body, headers }),

  delete: <T>(endpoint: string, headers?: Record<string, string>) =>
    apiRequest<T>(endpoint, { method: 'DELETE', headers }),
};
