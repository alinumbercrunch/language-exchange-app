/**
 * User Routes - Express routing configuration for user endpoints
 * Defines API routes for user registration, authentication, and profile management
 */

import { Router, type RequestHandler } from 'express';
import {
    registerUser,
    loginUser,
    getUserProfile,
    deleteUserProfile,
    updateUserProfile,
} from '../controllers/userController';
import passport from 'passport';
import { validateRegistration, validateLogin, validateUpdate } from '../middleware/userValidators';

/**
 * Express router instance for user-related endpoints.
 */
const router = Router();

/**
 * @route POST /api/users/register
 * @desc Register a new user account
 * @access Public
 */
router.post('/register', validateRegistration, registerUser);

/**
 * @route POST /api/users/login
 * @desc Authenticate user login credentials
 * @access Public
 */
router.post('/login', validateLogin, loginUser);

/**
 * @route GET /api/users/profile
 * @desc Get authenticated user's profile
 * @access Private (requires JWT token)
 */
router.get(
    '/profile',
    passport.authenticate('jwt', { session: false }), // JWT authentication middleware
    getUserProfile as RequestHandler
);

router.delete(
    '/profile', // The path for this endpoint
    passport.authenticate('jwt', { session: false }), // The gatekeeper middleware
    deleteUserProfile as RequestHandler // The controller function that does the work
);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put(
    '/profile',
    passport.authenticate('jwt', { session: false }),
    validateUpdate,
    updateUserProfile as RequestHandler
);

export default router; // Export the router to be used in index.ts

// Define the user login route
