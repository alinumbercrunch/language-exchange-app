/**
 * Authentication Service - JWT token management
 * Handles JWT generation, verification, and authentication logic
 */

import * as jwt from 'jsonwebtoken';
import AppError from '../../../shared/appError';
import { ERROR_MESSAGES, HTTP_STATUS } from '../constants/validationConstants';

/**
 * JWT payload interface for token verification.
 */
export interface JwtPayload {
    /** User ID from the token */
    id: string;
    /** Token issued at timestamp */
    iat?: number;
    /** Token expiration timestamp */
    exp?: number;
}

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
            throw new AppError(ERROR_MESSAGES.AUTH.JWT_SECRET_NOT_CONFIGURED, HTTP_STATUS.INTERNAL_SERVER_ERROR);
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
    static verifyToken(token: string): JwtPayload {
        if (!process.env.JWT_SECRET) {
            throw new AppError(ERROR_MESSAGES.AUTH.JWT_SECRET_NOT_CONFIGURED, HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }

        try {
            return jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
        } catch (error) {
            throw new AppError(ERROR_MESSAGES.AUTH.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED);
        }
    }

    /**
     * Extract token from Authorization header
     */
    static extractTokenFromHeader(authHeader: string | undefined): string {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError(ERROR_MESSAGES.AUTH.NO_TOKEN_PROVIDED, HTTP_STATUS.UNAUTHORIZED);
        }

        return authHeader.substring(7); // Remove 'Bearer ' prefix
    }
}
