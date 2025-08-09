// backend/src/services/userService.ts

import User from '../models/User';
import AppError from '../../../shared/appError';
import { IUserRegistrationRequest, IUser } from '../../../shared/user.interface';

export class UserService {
    /**
     * Check if user exists by email or username
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
     * Create new user with validation
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

        return await newUser.save();
    }

    /**
     * Authenticate user credentials
     */
    static async authenticateUser(email: string, password: string): Promise<any> {
        const user = await User.findOne({ email }).select('+passwordHash');
        
        if (!user) {
            throw new AppError('Invalid credentials.', 401);
        }

        const bcrypt = require('bcrypt');
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        
        if (!isMatch) {
            throw new AppError('Invalid email or password.', 401);
        }

        return user;
    }

    /**
     * Get user by ID (for protected routes)
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
