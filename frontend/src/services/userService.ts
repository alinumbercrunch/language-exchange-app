
import AppError from '../../../shared/appError';
import { API_CONFIG } from '../constants/apiConstants';

import type { IUser, IUserRegistrationRequest } from '../../../shared/user.interface';

// Define a type for the validation errors returned by express-validator
interface ValidationError {
  type: string;
  msg: string;
  path: string;
  location: string;
}

/**
 * Registers a new user by making a POST request to the backend API.
 *
 * @param userData The user registration data.
 * @returns The newly created user data.
 * @throws {AppError} Throws an AppError if the API response is not ok.
 */
export async function registerUser(userData: IUserRegistrationRequest): Promise<{ message: string; user: IUser; token: string }> {
  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS.REGISTER}`, {
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

  return data;
}
