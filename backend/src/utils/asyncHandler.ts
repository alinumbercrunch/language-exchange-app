import { Request, Response, NextFunction } from 'express';

// This is a generic type for an Express request handler that can be used
// with a custom request type.
import { AsyncRequestHandler } from '../types/declarations';

const asyncHandler = <T = Request>(fn: AsyncRequestHandler<T>) =>
    (req: T, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

export default asyncHandler;

