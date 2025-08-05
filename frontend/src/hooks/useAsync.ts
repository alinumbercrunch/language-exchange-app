import { useState, useEffect } from 'react';
import AppError from '../utils/appError';

/**
 * A custom hook to handle asynchronous operations and manage loading, data, and error states.
 * This is the frontend equivalent of the backend's asyncHandler, designed for the React component lifecycle.
 *
 * @param asyncFunction The asynchronous function to execute.
 * @returns An object containing the data, error, and loading state.
 */
export function useAsync<T>(asyncFunction: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AppError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true; // Prevent state updates on unmounted components

    async function execute() {
      try {
        const result = await asyncFunction();
        if (isMounted) {
          setData(result);
        }
      } catch (err: unknown) {
        if (isMounted) {
          if (err instanceof AppError) {
            setError(err);
          } else if (err instanceof Error) {
            setError(new AppError(err.message));
          } else {
            setError(new AppError('An unknown error occurred.'));
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    execute();

    return () => {
      isMounted = false; // Cleanup function to set isMounted to false
    };
  }, [asyncFunction]); // Re-run the effect if the async function changes

  return { data, error, isLoading };
}
