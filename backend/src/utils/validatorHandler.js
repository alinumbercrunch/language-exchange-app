"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatedAuthenticatedAsyncHandler = exports.validatedAsyncHandler = void 0;
const express_validator_1 = require("express-validator");
const responseHelpers_1 = require("./responseHelpers");
/**
 * Validation async handler that automatically checks for validation errors
 * and returns appropriate error responses before executing the main handler
 */
const validatedAsyncHandler = (fn) => (req, res, next) => {
    // Check for validation errors
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => ({
            field: 'path' in error ? error.path : 'unknown',
            message: error.msg,
            value: 'value' in error ? error.value : undefined
        }));
        return responseHelpers_1.ResponseHelper.validationError(res, errorMessages);
    }
    // If no validation errors, proceed with the original handler
    Promise.resolve(fn(req, res, next)).catch((error) => {
        // Enhanced error logging for validation handlers
        console.error('ValidatedAsyncHandler Error:', {
            path: req.path,
            method: req.method,
            body: req.body,
            error: error.message,
            stack: error.stack
        });
        // If headers are already sent, delegate to Express error handler
        if (res.headersSent) {
            return next(error);
        }
        // Handle known application errors
        if (error.statusCode) {
            return responseHelpers_1.ResponseHelper.error(res, error.message, error.statusCode);
        }
        // Handle validation errors
        if (error.name === 'ValidationError') {
            return responseHelpers_1.ResponseHelper.error(res, 'Validation error occurred', 400);
        }
        // Handle MongoDB duplicate key errors
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return responseHelpers_1.ResponseHelper.error(res, `${field} already exists`, 400);
        }
        // Handle JWT errors
        if (error.name === 'JsonWebTokenError') {
            return responseHelpers_1.ResponseHelper.error(res, 'Invalid token', 401);
        }
        if (error.name === 'TokenExpiredError') {
            return responseHelpers_1.ResponseHelper.error(res, 'Token expired', 401);
        }
        // Default to generic server error
        return responseHelpers_1.ResponseHelper.error(res, 'Internal server error', 500);
    });
};
exports.validatedAsyncHandler = validatedAsyncHandler;
/**
 * Combined validation and authentication handler
 */
const validatedAuthenticatedAsyncHandler = (fn) => (req, res, next) => {
    // Check authentication first
    if (!req.user) {
        return responseHelpers_1.ResponseHelper.error(res, 'Authentication required', 401);
    }
    // Then check validation
    return (0, exports.validatedAsyncHandler)(fn)(req, res, next);
};
exports.validatedAuthenticatedAsyncHandler = validatedAuthenticatedAsyncHandler;
