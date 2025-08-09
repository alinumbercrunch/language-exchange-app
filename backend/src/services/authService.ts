// backend/src/services/authService.ts

import * as jwt from 'jsonwebtoken';
import AppError from '../../../shared/appError';

export class AuthService {
    /**
     * Generate JWT token for user
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
     * Verify JWT token
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
