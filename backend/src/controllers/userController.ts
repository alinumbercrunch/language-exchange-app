// backend/src/controllers/userController.ts

import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { AuthService } from '../services/authService';
import { ResponseHelper } from '../utils/responseHelpers';
import { AuthenticatedRequest, IUserRegistrationRequest } from '../types/declarations';
import asyncHandler from '../utils/asyncHandler';
import { IUser } from '../../../shared/user.interface';

export const registerUser = asyncHandler(async (req: Request<{}, { user: IUser }, IUserRegistrationRequest>, res: Response) => {
    const userData = req.body;

    // Create user using service layer
    const savedUser = await UserService.createUser(userData);

    // Generate authentication token
    const token = AuthService.generateToken(savedUser._id.toString());

    // Send success response
    return ResponseHelper.authSuccess(
        res,
        'User registered successfully!',
        savedUser.toJSON(),
        token,
        201
    );
});

// @desc    Login as a user
// @route   POST /api/users/login
// @access  Public
// @route   POST /api/users/login
// @access  Public
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


// @desc    Get authenticated user profile
// @route   GET /api/users/profile
// @access  Private (requires JWT token)
export const getUserProfile = asyncHandler<AuthenticatedRequest>(async (req, res) => {
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
export const deleteUserProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        return ResponseHelper.error(res, 'Authentication error, user not found.', 401);
    }

    await UserService.deleteUser(req.user._id);

    return ResponseHelper.success(res, 'User profile deleted successfully.');
});

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
export const updateUserProfile = asyncHandler<AuthenticatedRequest>(async (req, res) => {
    if (!req.user) {
        return ResponseHelper.error(res, 'Authentication error, user not found.', 401);
    }

    const updatedUser = await UserService.updateUser(req.user.id, req.body);

    return ResponseHelper.success(
        res,
        'User profile updated successfully!',
        updatedUser.toJSON()
    );
});