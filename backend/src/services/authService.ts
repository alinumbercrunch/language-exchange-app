/**
 * Authentication Service - JWT token management
 * Handles JWT generation, verification, and authentication logic
 */

import * as jwt from 'jsonwebtoken';
import AppError from '../../../shared/appError';

/**
 * Service class for authentication operations including JWT token management.
 */
export class AuthService {
    /**
     * Generate JWT token for authenticated user.
     * 
     * @param userId - User's MongoDB ObjectId as string
     * @returns Signed JWT token with 30-day expiration
     * @throws {AppError} When JWT secret is not configured
     */
    static generateToken(userId: string): string {
        if (!process.env.JWT_SECRET) {
            throw new AppError('JWT secret not configured', 500);
        }

        return jwt.sign(
            { id: userId }, 
            process.env.JWT_SECRET, 
            { expiresIn: '30d' }
        );
    }

    /**
     * Verify JWT token and extract payload data.
     * 
     * @param token - JWT token to verify
     * @returns Decoded token payload
     * @throws {AppError} When JWT secret is not configured or token is invalid
     */
    static verifyToken(token: string): any {
        if (!process.env.JWT_SECRET) {
            throw new AppError('JWT secret not configured', 500);
        }

        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new AppError('Invalid token', 401);
        }
    }

    /**
     * Extract token from Authorization header
     */
    static extractTokenFromHeader(authHeader: string | undefined): string {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError('No token provided', 401);
        }

        return authHeader.substring(7); // Remove 'Bearer ' prefix
    }
}
