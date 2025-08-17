/**
 * Response Helper utilities for consistent API responses
 * Provides standardized success and error response formatting
 */

import type { Response } from 'express';
import type { ValidationError, ApiResponse } from '../../../shared/user.interface';
import type { IUserDocument } from '../types/declarations';

/**
 * Utility class for standardized API response formatting.
 */
export class ResponseHelper {
    /**
     * Send success response with optional data payload.
     *
     * @param res - Express Response object
     * @param message - Success message to display
     * @param data - Optional data to include in response
     * @param statusCode - HTTP status code (default: 200)
     * @returns Express Response with standardized success format
     */
    static success<T>(
        res: Response,
        message: string,
        data?: T,
        statusCode: number = 200
    ): Response<ApiResponse<T>> {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }

    /**
     * Send error response with optional error details.
     *
     * @param res - Express Response object
     * @param message - Error message to display
     * @param statusCode - HTTP status code (default: 500)
     * @param errors - Optional array of detailed errors
     * @returns Express Response with standardized error format
     */
    static error(
        res: Response,
        message: string,
        statusCode: number = 500,
        errors?: ValidationError[]
    ): Response<ApiResponse> {
        return res.status(statusCode).json({
            success: false,
            message,
            errors,
        });
    }

    /**
     * Send authentication success response with user data and token.
     *
     * @param res - Express Response object
     * @param message - Success message to display
     * @param user - User document or object
     * @param token - JWT authentication token
     * @param statusCode - HTTP status code (default: 200)
     * @returns Express Response with user and token data
     */
    static authSuccess(
        res: Response,
        message: string,
        user: IUserDocument,
        token: string,
        statusCode: number = 200
    ): Response<ApiResponse> {
        return res.status(statusCode).json({
            success: true,
            message,
            data: {
                user: user.toJSON ? user.toJSON() : user,
                token,
            },
        });
    }

    /**
     * Send validation error response with properly typed validation errors.
     *
     * @param res - Express Response object
     * @param errors - Array of validation errors with field and message info
     * @returns Express Response with validation error format
     */
    static validationError(res: Response, errors: ValidationError[]): Response<ApiResponse> {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors,
        });
    }
}
