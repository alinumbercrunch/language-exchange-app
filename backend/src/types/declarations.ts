import { Request, Response, NextFunction } from 'express';
import { HydratedDocument } from 'mongoose';
import { IUser } from '../../../shared/user.interface';

export interface AuthenticatedRequest extends Request {
    user?: IUserDocument;
}

export interface ErrorType extends Error {
    statusCode?: number;
}

export interface IUserDocument extends HydratedDocument<IUser> {
    passwordHash: string; 
    matchPassword(enteredPassword: string): Promise<boolean>; 
}

export type AsyncRequestHandler<T = Request> = (
  req: T,
  res: Response,
  next: NextFunction
) => Promise<any>;