
import { Request, Response, NextFunction } from 'express';

import { AppError } from '../types/declarations';

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || 'An unexpected error occurred.',
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
};

export default errorHandler;
