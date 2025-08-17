'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/Button';

import type { ErrorComponentProps } from './types/next-components';

/**
 * Error page component for handling runtime errors in the application.
 * This follows Next.js App Router conventions for error boundaries.
 * 
 * @param error - The error object containing error information
 * @param reset - Function to attempt to recover from the error
 */
export default function Error({ error, reset }: ErrorComponentProps) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">500</h1>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We encountered an unexpected error. Please try again or contact support if the problem persists.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={reset}
            variant="primary"
            size="lg"
            className="w-full"
          >
            Try again
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/'}
            variant="outline"
            size="lg"
            className="w-full"
          >
            Go home
          </Button>
        </div>
        
        {process.env.NODE_ENV === 'development' && error.digest && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-left">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
              Error Details (Development)
            </h3>
            <p className="text-xs font-mono text-red-600 dark:text-red-300">
              Digest: {error.digest}
            </p>
            <p className="text-xs font-mono text-red-600 dark:text-red-300 mt-1">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
