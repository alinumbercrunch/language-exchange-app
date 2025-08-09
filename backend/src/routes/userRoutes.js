"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController"); // Import the controller function
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)(); // Create a new Express router
// Define the registration route
// When a POST request comes to /api/users/register, it will be handled by registerUser
const userValidators_1 = require("../middleware/userValidators");
router.post('/register', userValidators_1.validateRegistration, userController_1.registerUser);
// Define the login route
// When a POST request comes to /api/users/login, it will be handled by loginUser
router.post('/login', userValidators_1.validateLogin, userController_1.loginUser);
router.get('/profile', passport_1.default.authenticate('jwt', { session: false }), // This is the protection middleware
userController_1.getUserProfile // Your controller function to get the profile
);
router.delete('/profile', // The path for this endpoint
passport_1.default.authenticate('jwt', { session: false }), // The gatekeeper middleware
userController_1.deleteUserProfile // The controller function that does the work
);
// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', passport_1.default.authenticate('jwt', { session: false }), userValidators_1.validateUpdate, userController_1.updateUserProfile);
exports.default = router; // Export the router to be used in index.ts
// Define the user login route
