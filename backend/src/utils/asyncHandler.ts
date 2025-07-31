import { Request, Response, NextFunction } from 'express';

// This is a generic type for an Express request handler that can be used
// with a custom request type.
type AsyncRequestHandler<T = Request> = (
  req: T,
  res: Response,
  next: NextFunction
) => Promise<any>;

const asyncHandler = <T = Request>(fn: AsyncRequestHandler<T>) =>
    (req: T, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

export default asyncHandler;

