/**
 * Type Declarations - Backend TypeScript interfaces and types
 * Defines custom types for Express requests, Mongoose documents, and API contracts
 */

import { Request, Response, NextFunction } from 'express';
import { HydratedDocument } from 'mongoose';
import { IUser } from '../../../shared/user.interface';

/**
 * Extended Express Request interface for authenticated routes.
 * Includes user data attached by authentication middleware.
 */
export interface AuthenticatedRequest extends Request {
    /** Authenticated user document */
    user?: IUserDocument;
}

/**
 * Type definition for async request handlers to ensure proper error handling.
 */
export type AsyncRequestHandler<T = Request> = (
  req: T,
  res: Response,
  next: NextFunction
) => Promise<Response | void>;

/**
 * Extended Error interface with HTTP status code.
 */
export interface ErrorType extends Error {
    /** HTTP status code for the error */
    statusCode?: number;
}

/**
 * Extended User document interface for Mongoose operations.
 * Includes database-specific methods and properties.
 */
export interface IUserDocument extends HydratedDocument<IUser> {
    /** Hashed password (not exposed in JSON responses) */
    passwordHash: string; 
    /** Method to compare passwords during authentication */
    matchPassword(enteredPassword: string): Promise<boolean>; 
}