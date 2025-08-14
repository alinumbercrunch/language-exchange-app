
import AppError from '../../../shared/appError';
import { API_CONFIG } from '../constants/apiConstants';

import type { IUser, IUserRegistrationRequest, ValidationError } from '../../../shared/user.interface';

/**
 * Registers a new user with the backend API.
 * 
 * @param userData - User registration data including profile information
 * @returns Promise resolving to registration response with user data and token
 * @throws {AppError} When registration fails or validation errors occur
 */
export async function registerUser(userData: IUserRegistrationRequest): Promise<{ message: string; user: IUser; token: string }> {
  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS_REGISTER}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    // Use the new ValidationError type for better type safety
    const errorMessage = data.errors ? data.errors.map((err: ValidationError) => err.msg).join(', ') : data.message;
    throw new AppError(errorMessage || 'An error occurred during registration.', response.status);
  }

  // The backend returns { success: true, message: "...", data: { user: {...}, token: "..." } }
  return {
    message: data.message,
    user: data.data.user,
    token: data.data.token
  };
}
