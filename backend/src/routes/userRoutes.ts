import { RequestHandler, Router } from 'express';
import { registerUser, loginUser, getUserProfile, deleteUserProfile, updateUserProfile } from '../controllers/userController'; // Import the controller function
import passport from 'passport'; 

const router = Router(); // Create a new Express router

// Define the registration route
// When a POST request comes to /api/users/register, it will be handled by registerUser
import { validateRegistration, validateLogin, validateUpdate } from '../middleware/userValidators';

router.post('/register', validateRegistration, registerUser);

// Define the login route
// When a POST request comes to /api/users/login, it will be handled by loginUser
router.post('/login', validateLogin, loginUser);

router.get(
    '/profile',
    passport.authenticate('jwt', { session: false }), // This is the protection middleware
    getUserProfile as RequestHandler // Your controller function to get the profile
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
