// frontend/src/utils/appError.ts

/**
 * Custom error class to handle application-specific errors, mirroring the backend's AppError.
 * This helps in standardizing error handling across the full stack.
 */
class AppError extends Error {
    statusCode?: number;

    constructor(message: string, statusCode?: number) {
        super(message);
        this.name = 'AppError'; // Set the error name
        this.statusCode = statusCode;

        // This line is needed to correctly set the prototype chain for TypeScript/ES6
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export default AppError;
