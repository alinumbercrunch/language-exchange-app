/**
 * User Service - Business logic for user operations
 * Handles user registration, authentication, and profile management
 */

import * as bcrypt from 'bcrypt';
import User from '../models/User';
import AppError from '../../../shared/appError';
import { IUserRegistrationRequest } from '../types/declarations';
import { AuthService } from './authService';

/**
 * Service class for user-related operations including registration, authentication, and profile management.
 */
export class UserService {
    /**
     * Check if user exists by email or username to prevent duplicates.
     * 
     * @param email - Email address to check
     * @param username - Username to check
     * @throws {AppError} When user already exists with given email or username
     * @returns Promise that resolves when no conflicts are found
     */
    static async checkUserExists(email: string, username: string): Promise<void> {
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            if (existingUser.email === email) {
                throw new AppError('User with that email already exists.', 400);
            }
            if (existingUser.username === username) {
                throw new AppError('Username is already taken.', 400);
            }
        }
    }

    /**
     * Create new user with validation and return user data with authentication token.
     * 
     * @param userData - User registration data including profile information
     * @returns Promise resolving to object containing saved user and JWT token
     * @throws {AppError} When user already exists or validation fails
     */
    static async createUser(userData: IUserRegistrationRequest): Promise<any> {
        // Check for existing users
        await this.checkUserExists(userData.email, userData.username);

        // Create user instance
        const newUser = new User({
            username: userData.username,
            email: userData.email,
            passwordHash: userData.password, // Will be hashed by pre-save hook
            firstName: userData.firstName,
            familyName: userData.familyName,
            bio: userData.bio || '',
            isActive: true,
            registrationDate: new Date(),
            profileOptions: userData.profileOptions,
        });

        const savedUser = await newUser.save();
        
        // Debug: Log what we're returning
        console.log('UserService returning savedUser:', JSON.stringify(savedUser.toJSON(), null, 2));
        
        // Generate token
        const token = AuthService.generateToken(savedUser._id.toString());
        
        return { user: savedUser, token };
    }

    /**
     * Authenticate user credentials and return user data with token.
     * 
     * @param email - User's email address
     * @param password - User's plain text password
     * @returns Promise resolving to object containing user and JWT token
     * @throws {AppError} When credentials are invalid
     */
    static async authenticateUser(email: string, password: string): Promise<{ user: any; token: string }> {
        const user = await User.findOne({ email }).select('+passwordHash');
        
        if (!user) {
            throw new AppError('Invalid credentials.', 401);
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        
        if (!isMatch) {
            throw new AppError('Invalid email or password.', 401);
        }

        // Generate token
        const token = AuthService.generateToken(user._id.toString());

        return { user, token };
    }

    /**
     * Get user by ID for protected routes and profile access.
     * 
     * @param userId - MongoDB ObjectId as string
     * @returns Promise resolving to user document
     * @throws {AppError} When user is not found
     */
    static async getUserById(userId: string): Promise<any> {
        const user = await User.findById(userId);
        
        if (!user) {
            throw new AppError('User not found.', 404);
        }

        return user;
    }

    /**
     * Delete a user by ID
     */
    static async deleteUser(userId: string): Promise<void> {
        const deletedUser = await User.findByIdAndDelete(userId);
        
        if (!deletedUser) {
            throw new AppError('User not found.', 404);
        }
    }

    /**
     * Update user profile
     */
    static async updateUser(userId: string, updateData: Partial<IUserRegistrationRequest>): Promise<any> {
        const user = await User.findById(userId);

        if (!user) {
            throw new AppError('User not found.', 404);
        }

        // Update user fields if they are present in the update data
        if (updateData.username) user.username = updateData.username;
        if (updateData.email) user.email = updateData.email;
        if (updateData.firstName) user.firstName = updateData.firstName;
        if (updateData.familyName) user.familyName = updateData.familyName;
        if (updateData.bio !== undefined) user.bio = updateData.bio;
        if (updateData.profileOptions) {
            user.profileOptions = { ...user.profileOptions, ...updateData.profileOptions };
        }
        
        // Save the updated user document
        const updatedUser = await user.save();
        return updatedUser;
    }
}
