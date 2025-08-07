import { Request, Response, NextFunction } from 'express';
import { HydratedDocument } from 'mongoose';
import { IUser } from '../../../shared/user.interface';

export interface AuthenticatedRequest extends Request {
    user?: IUserDocument;
}

export type AsyncRequestHandler<T = Request> = (
  req: T,
  res: Response,
  next: NextFunction
) => Promise<any>;

export interface ErrorType extends Error {
    statusCode?: number;
}

export interface IUserDocument extends HydratedDocument<IUser> {
    passwordHash: string; 
    matchPassword(enteredPassword: string): Promise<boolean>; 
}

// src/types/requests.ts

export interface IUserRegistrationRequest {
    username: string;
    email: string;
    password: string;
    firstName: string;
    familyName: string;
    bio: string;
    profileOptions: {
        nativeLanguage: string;
        practicingLanguage: {
            language: string;
            proficiency: 'Beginner' | 'Intermediate' | 'Advanced';
        };
        country: string;
        city: string;
        gender: 'Male' | 'Female' | 'Non-binary' | 'Prefer not to say';
        age: number;
    };
}