import { useState, useCallback, useEffect } from 'react';

import AppError from '../../../shared/appError';

/**
 * A custom hook to handle asynchronous operations and manage loading, data, and error states.
 * Can be configured to run automatically on component mount or be triggered manually.
 *
 * @param asyncFunction The asynchronous function to execute.
 * @param immediate Whether to execute the function immediately on component mount. Defaults to true.
 * @returns An object containing the data, error, isLoading state, and an execute function to manually trigger the async call.
 */
export function useAsync<T>(asyncFunction: () => Promise<T>, immediate = true) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AppError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(immediate);

  const execute = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await asyncFunction();
      setData(result);
      return result;
    } catch (err: unknown) {
      if (err instanceof AppError) {
        setError(err);
      } else if (err instanceof Error) {
        setError(new AppError(err.message, 500));
      } else {
        setError(new AppError('An unknown error occurred.', 500));
      }
    } finally {
      setIsLoading(false);
    }
  }, [asyncFunction]);

  // Execute immediately on mount if requested
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { data, error, isLoading, execute };
}
