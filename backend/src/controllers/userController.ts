import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'; // JWT for authentication
import User from '../models/User';
import { AuthenticatedRequest, IUserDocument } from '../types/declarations';

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
        res.status(400).json({ message: 'User with that email already exists.' });
        return;
    }

    const usernameExists = await User.findOne({ username }); // Check by username
    if (usernameExists) {
        res.status(400).json({ message: 'Username is already taken.' });
        return;
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
          return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // 2. Compare passwords
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password.' });
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
        res.status(401).json({ message: 'Not authorized, user data not found after authentication.' });
    }
});