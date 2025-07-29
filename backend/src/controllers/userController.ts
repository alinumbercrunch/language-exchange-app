import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import User from '../models/User'; // Your User model

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

        // 4. Hash the password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // 5. Create new user instance (using the User model)
        const newUser = new User({
            username,
            email,
            passwordHash, // Store the hashed password
            firstName,
            familyName,
            bio: bio || '', // Optional field, default to empty string if not provided
            isActive: true, // Default to true upon registration
            registrationDate: new Date(),
        });

        // 6. Save the user to the database
        const savedUser = await newUser.save();

        // 7. Send success response (excluding passwordHash using toJSON)
        // The .toJSON() method on the Mongoose document will apply our transform
        res.status(201).json({
            message: 'User registered successfully!',
            user: savedUser.toJSON() // Ensure passwordHash is not sent back
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