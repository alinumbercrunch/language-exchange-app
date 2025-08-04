import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'; // JWT for authentication
import User from '../models/User';
import { AuthenticatedRequest } from '../types/declarations';
import AppError from '../utils/appError'

// Helper function to generate a JWT
const generateToken = (id: string) => {
    // Sign the token with the user's ID and your secret from .env
    // The token expires in 30 days (common practice, adjust as needed)
    return jwt.sign({ id }, process.env.JWT_SECRET!, { // '!' asserts that JWT_SECRET will be defined
        expiresIn: '30d',
    });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
import asyncHandler from '../utils/asyncHandler';

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    // 1. Extract data from request body
    const { username, email, password, firstName, familyName, bio } = req.body;

    // 2. Check if user already exists
    const userExists = await User.findOne({ email }); // Check by email
    if (userExists) {
         throw new AppError('User with that email already exists.', 400);
    }

    const usernameExists = await User.findOne({ username }); // Check by username
    if (usernameExists) {
        throw new AppError('Username is already taken.', 400);
    }

    // 3. Create new user instance (using the User model)
    const newUser = new User({
        username,
        email,
        passwordHash: password, 
        firstName,
        familyName,
        bio: bio || '', // Optional field, default to empty string if not provided
        isActive: true, // Default to true upon registration
        registrationDate: new Date(),
    });

    // 4. Save the user to the database
    const savedUser = await newUser.save();

    // 5. Send success response (excluding passwordHash using toJSON)
    // The .toJSON() method on the Mongoose document will apply our transform
    res.status(201).json({
        message: 'User registered successfully!',
        user: savedUser.toJSON(), // Ensure passwordHash is not sent back
        token: generateToken(savedUser._id.toString()), 
    });
});

// @desc    Login as a user
// @route   POST /api/users/login
// @access  Public
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user) {
        throw new AppError('Invalid credentials.', 401);
    }


    // 2. Compare passwords
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
        throw new AppError('Invalid email or password.', 401);
    }

    // 3. Send success response (excluding passwordHash)
    res.status(200).json({
        message: 'Login successful!',
        user: user.toJSON(), // Ensure passwordHash is not sent back
        token: generateToken(user._id.toString()), // Generate and send a JWT token
    });
});


// @desc    Get authenticated user profile
// @route   GET /api/users/profile
// @access  Private (requires JWT token)
export const getUserProfile = asyncHandler<AuthenticatedRequest>(async (req, res) => {
    // Passport.js will have successfully authenticated the user and attached
    // their document to req.user if the token was valid.
    if (req.user) {
        // Use .toJSON() on the Mongoose document to apply your transform
        // and omit the passwordHash from the response.
        const user = req.user.toJSON();
        res.status(200).json({
            message: 'User profile fetched successfully!',
            user: user
        });
    } else {
        // This 'else' block should ideally not be hit if Passport.js middleware is working correctly
        // because Passport.js would have already sent a 401 if authentication failed.
        // It's here as a fallback/type safety.
        throw new AppError('Not authorized, user data not found after authentication.', 401);
    }
});

// @desc    Delete authenticated user's profile
// @route   DELETE /api/users/profile
// @access  Private
export const deleteUserProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    // We use req.user._id to ensure the user can only delete their own profile.;
     if (!req.user) {
        throw new AppError('Authentication error, user not found.', 401);
    }

    const user = await User.findByIdAndDelete(req.user!._id);

    if (!user) {
        // This case should ideally not be reached on a protected route,
        // but it's a good safety check.
        throw new AppError('User not found.', 404);
    }

    res.status(200).json({
        message: 'User profile deleted successfully.'
    });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler<AuthenticatedRequest>(async (req, res) => {
    const user = await User.findById(req.user!.id);

    if (!user) {
        throw new AppError('User not found.', 404);
    }

    // Update user fields if they are present in the request body
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.firstName = req.body.firstName || user.firstName;
    user.familyName = req.body.familyName || user.familyName;
    user.bio = req.body.bio || user.bio;
    
    // Save the updated user document
    const updatedUser = await user.save();

    // Respond with the updated user data
    res.status(200).json({
        message: 'User profile updated successfully!',
        user: updatedUser.toJSON()
    });
});