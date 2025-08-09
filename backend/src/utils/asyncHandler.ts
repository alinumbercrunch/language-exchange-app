import { Request, Response, NextFunction } from 'express';
import { AsyncRequestHandler } from '../types/declarations';
import { ResponseHelper } from './responseHelpers';

/**
 * Enhanced async handler with improved error handling and logging
 * Wraps async functions to automatically catch and handle errors
 */
const asyncHandler = <T = Request>(fn: AsyncRequestHandler<T>) =>
    (req: T, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((error) => {
            // Log the error for debugging purposes
            console.error('AsyncHandler Error:', {
                path: (req as any).path,
                method: (req as any).method,
                error: error.message,
                stack: error.stack
            });

            // If headers are already sent, delegate to Express error handler
            if (res.headersSent) {
                return next(error);
            }

            // Handle known application errors
            if (error.statusCode) {
                return ResponseHelper.error(res, error.message, error.statusCode);
            }

            // Handle validation errors
            if (error.name === 'ValidationError') {
                return ResponseHelper.error(res, 'Validation error occurred', 400);
            }

            // Handle MongoDB duplicate key errors
            if (error.code === 11000) {
                const field = Object.keys(error.keyValue)[0];
                return ResponseHelper.error(res, `${field} already exists`, 400);
            }

            // Handle JWT errors
            if (error.name === 'JsonWebTokenError') {
                return ResponseHelper.error(res, 'Invalid token', 401);
            }

            if (error.name === 'TokenExpiredError') {
                return ResponseHelper.error(res, 'Token expired', 401);
            }

            // Default to generic server error
            return ResponseHelper.error(res, 'Internal server error', 500);
        });
    };

/**
 * Specialized async handler for authenticated routes
 * Automatically checks for user authentication
 */
export const authenticatedAsyncHandler = <T extends { user?: any }>(fn: AsyncRequestHandler<T>) =>
    (req: T, res: Response, next: NextFunction) => {
        if (!req.user) {
            return ResponseHelper.error(res, 'Authentication required', 401);
        }

        return asyncHandler(fn)(req, res, next);
    };

export default asyncHandler;

