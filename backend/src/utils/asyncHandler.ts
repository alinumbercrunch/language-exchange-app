/**
 * Async Handler Utility - Express error handling wrapper
 * Automatically catches and handles errors in async route handlers
 */

import { Request, Response, NextFunction } from 'express';
import { AsyncRequestHandler, AuthenticatedRequest } from '../types/declarations';
import { ResponseHelper } from './responseHelpers';

/**
 * Enhanced async handler with improved error handling and logging.
 * Wraps async functions to automatically catch and handle errors without try-catch blocks.
 * 
 * @param fn - Async request handler function to wrap
 * @returns Express middleware function that handles errors automatically
 */
const asyncHandler = <T = Request>(fn: AsyncRequestHandler<T>) =>
    (req: T, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((error) => {
            // Log the error for debugging purposes (safe property access)
            const requestInfo = req && typeof req === 'object' ? req as unknown as Request : null;
            console.error('AsyncHandler Error:', {
                path: requestInfo?.path || 'unknown',
                method: requestInfo?.method || 'unknown',
                error: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : undefined
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
                const keyValue = error.keyValue;
                if (keyValue && typeof keyValue === 'object') {
                    const field = Object.keys(keyValue)[0];
                    if (field) {
                        return ResponseHelper.error(res, `${field} already exists`, 400);
                    }
                }
                return ResponseHelper.error(res, 'Duplicate entry detected', 400);
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
export const authenticatedAsyncHandler = <T extends AuthenticatedRequest>(fn: AsyncRequestHandler<T>) =>
    (req: T, res: Response, next: NextFunction) => {
        if (!req.user) {
            return ResponseHelper.error(res, 'Authentication required', 401);
        }

        return asyncHandler(fn)(req, res, next);
    };

export default asyncHandler;

