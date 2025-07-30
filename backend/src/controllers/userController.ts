import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'; // JWT for authentication
import User from '../models/User'; // Your User model

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
export const registerUser = async (req: Request, res: Response) => {
    try {
        // 1. Extract data from request body
        const { username, email, password, firstName, familyName, bio } = req.body;

        // 2. Basic Validation: Check if required fields are provided
        if (!username || !email || !password || !firstName || !familyName) {
            return res.status(400).json({ message: 'Please enter all required fields: username, email, password, first name, and family name.' });
        }

        // 3. Check if user already exists
        const userExists = await User.findOne({ email }); // Check by email
        if (userExists) {
            return res.status(400).json({ message: 'User with that email already exists.' });
        }

        const usernameExists = await User.findOne({ username }); // Check by username
        if (usernameExists) {
            return res.status(400).json({ message: 'Username is already taken.' });
        }

        // 4. Create new user instance (using the User model)
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

        // 5. Save the user to the database
        const savedUser = await newUser.save();

        // 6. Send success response (excluding passwordHash using toJSON)
        // The .toJSON() method on the Mongoose document will apply our transform
        res.status(201).json({
            message: 'User registered successfully!',
            user: savedUser.toJSON(), // Ensure passwordHash is not sent back
            token: generateToken(savedUser._id.toString()), 
        });

    } catch (error: any) {
        console.error('Error in registerUser:', error);
        // Handle Mongoose validation errors or other exceptions
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((val: any) => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Server error during registration.' });
    }
};

// @desc    Login as a user
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // 1. Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter both email and password.' });
        }

        // 2. Find user by email
        const user = await User.findOne({ email }).select('+passwordHash');
        if (!user) {
              return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // 3. Compare passwords
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // 4. Send success response (excluding passwordHash)
        res.status(200).json({
            message: 'Login successful!',
            user: user.toJSON(), // Ensure passwordHash is not sent back
            token: generateToken(user._id.toString()), // Generate and send a JWT token
        });

    } catch (error: any) {
        console.error('Error in loginUser:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
};