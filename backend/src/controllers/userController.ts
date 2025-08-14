/**
 * User Controller - HTTP request handlers for user operations
 * Handles user registration, login, and profile management endpoints
 */

import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { ResponseHelper } from '../utils/responseHelpers';
import { AuthenticatedRequest, IUserRegistrationRequest } from '../types/declarations';
import asyncHandler from '../utils/asyncHandler';
import { authenticatedAsyncHandler } from '../utils/validatorHandler';
import { IUser } from '../../../shared/user.interface';

/**
 * Register a new user account.
 * 
 * @route POST /api/users/register
 * @access Public
 * @param req - Express Request with user registration data
 * @param res - Express Response object
 * @returns Success response with user data and JWT token
 */
export const registerUser = asyncHandler(async (req: Request<{}, { user: IUser }, IUserRegistrationRequest>, res: Response) => {
    const userData = req.body;

    // Create user using service layer
    const { user, token } = await UserService.createUser(userData);

    // Send success response
    return ResponseHelper.authSuccess(
        res,
        'User registered successfully!',
        user,
        token,
        201
    );
});

/**
 * Authenticate user login credentials.
 * 
 * @route POST /api/users/login
 * @access Public
 * @param req - Express Request with email and password
 * @param res - Express Response object
 * @returns Success response with user data and JWT token
 */
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Authenticate user using service layer
    const { user, token } = await UserService.authenticateUser(email, password);

    // Send success response
    return ResponseHelper.authSuccess(
        res,
        'Login successful!',
        user,
        token
    );
});

/**
 * Get authenticated user's profile information.
 * 
 * @route GET /api/users/profile
 * @access Private (requires JWT token)
 * @param req - Authenticated Express Request
 * @param res - Express Response object
 * @returns Success response with user profile data
 */
export const getUserProfile = authenticatedAsyncHandler<AuthenticatedRequest>(async (req, res) => {
    if (!req.user) {
        return ResponseHelper.error(res, 'Authentication error, user not found.', 401);
    }
    const user = await UserService.getUserById(req.user.id);
    
    return ResponseHelper.success(
        res, 
        'User profile fetched successfully!', 
        user.toJSON()
    );
});

// @desc    Delete authenticated user's profile
// @route   DELETE /api/users/profile
// @access  Private
export const deleteUserProfile = authenticatedAsyncHandler<AuthenticatedRequest>(async (req, res) => {
    await UserService.deleteUser(req.user!._id);

    return ResponseHelper.success(res, 'User profile deleted successfully.');
});

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
export const updateUserProfile = authenticatedAsyncHandler<AuthenticatedRequest>(async (req, res) => {
    const updatedUser = await UserService.updateUser(req.user!.id, req.body);

    return ResponseHelper.success(
        res,
        'User profile updated successfully!',
        updatedUser.toJSON()
    );
});