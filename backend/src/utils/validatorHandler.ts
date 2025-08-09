import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ResponseHelper } from './responseHelpers';
import { AsyncRequestHandler } from '../types/declarations';

/**
 * Validation async handler that automatically checks for validation errors
 * and returns appropriate error responses before executing the main handler
 */
export const validatedAsyncHandler = <T = Request>(fn: AsyncRequestHandler<T>) =>
    (req: T, res: Response, next: NextFunction) => {
        // Check for validation errors
        const errors = validationResult(req as any);
        
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => ({
                field: 'path' in error ? error.path : 'unknown',
                message: error.msg,
                value: 'value' in error ? error.value : undefined
            }));
            
            return ResponseHelper.validationError(res, errorMessages);
        }

        // If no validation errors, proceed with the original handler
        Promise.resolve(fn(req, res, next)).catch((error) => {
            // Enhanced error logging for validation handlers
            console.error('ValidatedAsyncHandler Error:', {
                path: (req as any).path,
                method: (req as any).method,
                body: (req as any).body,
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
 * Combined validation and authentication handler
 */
export const validatedAuthenticatedAsyncHandler = <T extends { user?: any }>(fn: AsyncRequestHandler<T>) =>
    (req: T, res: Response, next: NextFunction) => {
        // Check authentication first
        if (!req.user) {
            return ResponseHelper.error(res, 'Authentication required', 401);
        }

        // Then check validation
        return validatedAsyncHandler(fn)(req, res, next);
    };
