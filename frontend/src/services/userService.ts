import { API_CONFIG } from "@/constants/apiConstants";
import { api } from "@/utils";

import type { IUser, IUserRegistrationRequest } from "../../../shared/user.interface";

/*import { API_CONFIG } from "../constants/apiConstants";
import { api } from "../utils/apiClient";

import type { IUser, IUserRegistrationRequest } from "../../../shared/user.interface";

/**
 * Registers a new user with the backend API.
 *
 * @param userData - User registration data including profile information
 * @returns Promise resolving to registration response with user data and token
 * @throws {AppError} When registration fails or validation errors occur
 */
export async function registerUser(
  userData: IUserRegistrationRequest
): Promise<{ message: string; user: IUser; token: string }> {
  const result = await api.post<{ user: IUser; token: string }>(
    API_CONFIG.ENDPOINTS.USERS_REGISTER,
    userData
  );

  return {
    message: "Registration successful",
    user: result.user,
    token: result.token,
  };
}

/**
 * Login user interface
 */
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  user: IUser;
  token: string;
}

/**
 * Logs in a user by making a POST request to the backend API.
 *
 * @param loginData The user login data.
 * @returns The user data and authentication token.
 * @throws {AppError} Throws an AppError if the API response is not ok.
 */
export async function loginUser(loginData: LoginRequest): Promise<LoginResponse> {
  const result = await api.post<LoginResponse>(`${API_CONFIG.ENDPOINTS.AUTH}/login`, loginData);

  return result;
}
