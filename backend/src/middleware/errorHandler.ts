
import { Request, Response, NextFunction } from 'express';

import { ErrorType } from '../types/declarations';

/**
 * Express error handling middleware.
 * Responds to the client with a structured error message.
 * In production, the stack trace is hidden.
 */
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || 'An unexpected error occurred.',
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
};

export default errorHandler;
