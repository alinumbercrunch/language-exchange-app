/**
 * Custom error class to handle application-specific errors with an HTTP status code.
 * This class extends the built-in Error class, allowing it to work with error handling middleware.
 */
class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message); // Call the parent Error class constructor with the message
        this.statusCode = statusCode;
        // This line is needed to correctly set the prototype chain for TypeScript/ES6
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export default AppError;
