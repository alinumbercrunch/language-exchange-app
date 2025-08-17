'use client';

import { useEffect } from 'react';

import { Button } from '../../components/ui/Button';

import type { ErrorComponentProps } from '../types/next-components';

/**
 * Error page component for the registration page.
 * This follows Next.js App Router conventions for route-specific error boundaries.
 */
export default function Error({ error, reset }: ErrorComponentProps) {
  useEffect(() => {
    console.error('Registration error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 px-4">
      <div className="max-w-md w-full text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Registration Error
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We encountered an issue while setting up your registration. Please try again.
          </p>
        </div>
        
        <div className="space-y-3">
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
        
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-left">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
              Error Details (Development)
            </h3>
            <p className="text-xs font-mono text-red-600 dark:text-red-300 break-all">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
