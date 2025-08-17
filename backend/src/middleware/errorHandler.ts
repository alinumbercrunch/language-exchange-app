
/**
 * Error Handler Middleware - Global Express error handling
 * Provides consistent error responses and secure error information
 */

import AppError from '../../../shared/appError';
import { Request, Response, NextFunction } from 'express';

/**
 * Express error handling middleware for structured error responses.
 * Responds to the client with standardized error format.
 * In production, stack traces are hidden for security.
 * 
 * @param err - AppError instance or generic Error
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction (unused but required for error middleware)
 * @returns Error response with message and optional stack trace
 */
export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || 'An unexpected error occurred.',
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
};

export default errorHandler;
