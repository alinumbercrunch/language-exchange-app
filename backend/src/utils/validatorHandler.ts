import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ResponseHelper } from './responseHelpers';
import type { AsyncRequestHandler, AuthenticatedRequest } from '../types/declarations';

/**
 * Basic async handler for error handling
 */
export const validatedAsyncHandler = <T = Request>(fn: AsyncRequestHandler<T>) =>
    (req: T, res: Response, next: NextFunction) => {
        // Check for validation errors first
        const errors = validationResult(req as Request);
        
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => ({
                field: 'path' in error ? error.path : 'unknown',
                message: error.msg,
                value: 'value' in error ? error.value : undefined
            }));
            
            return ResponseHelper.validationError(res, errorMessages);
        }

        // Execute the handler
        Promise.resolve(fn(req, res, next)).catch((error) => {
            console.error('AsyncHandler Error:', {
                path: (req as Request).path,
                method: (req as Request).method,
                error: error.message,
            });

            if (res.headersSent) {
                return next(error);
            }

            // Handle known application errors
            if (error.statusCode) {
                return ResponseHelper.error(res, error.message, error.statusCode);
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

            // Default server error
            return ResponseHelper.error(res, 'Internal server error', 500);
        });
    };

/**
 * Authenticated handler that checks for user authentication
 */
export const authenticatedAsyncHandler = <T extends AuthenticatedRequest>(fn: AsyncRequestHandler<T>) =>
    (req: T, res: Response, next: NextFunction) => {
        // Check authentication
        if (!req.user) {
            return ResponseHelper.error(res, 'Authentication required', 401);
        }

        // Use regular handler
        return validatedAsyncHandler(fn)(req, res, next);
    };
