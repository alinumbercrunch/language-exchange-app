// backend/src/utils/responseHelpers.ts

import { Response } from 'express';
import { IUser } from '../../../shared/user.interface';

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    errors?: any[];
}

export class ResponseHelper {
    /**
     * Send success response with data
     */
    static success<T>(res: Response, message: string, data?: T, statusCode: number = 200): Response<ApiResponse<T>> {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    }

    /**
     * Send error response
     */
    static error(res: Response, message: string, statusCode: number = 500, errors?: any[]): Response<ApiResponse> {
        return res.status(statusCode).json({
            success: false,
            message,
            errors
        });
    }

    /**
     * Send authentication success response (user + token)
     */
    static authSuccess(res: Response, message: string, user: IUser, token: string, statusCode: number = 200): Response<ApiResponse> {
        return res.status(statusCode).json({
            success: true,
            message,
            data: {
                user: user,
                token: token
            }
        });
    }

    /**
     * Send validation error response
     */
    static validationError(res: Response, errors: any[]): Response<ApiResponse> {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }
}
