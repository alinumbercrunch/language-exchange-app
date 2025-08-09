"use strict";
// backend/src/utils/responseHelpers.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHelper = void 0;
class ResponseHelper {
    /**
     * Send success response with data
     */
    static success(res, message, data, statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    }
    /**
     * Send error response
     */
    static error(res, message, statusCode = 500, errors) {
        return res.status(statusCode).json({
            success: false,
            message,
            errors
        });
    }
    /**
     * Send authentication success response (user + token)
     */
    static authSuccess(res, message, user, token, statusCode = 200) {
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
    static validationError(res, errors) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }
}
exports.ResponseHelper = ResponseHelper;
