'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/Button';

import type { ErrorComponentProps } from './types/next-components';

/**
 * Global error page component that catches errors in the root layout.
 * This follows Next.js App Router conventions for global error boundaries.
 * Only shows for errors in the root layout component.
 */
export default function GlobalError({ error, reset }: ErrorComponentProps) {
  useEffect(() => {
    // Log critical application errors
    console.error('Critical application error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-red-500 mb-4">!</h1>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Critical Error
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                A critical error occurred in the application. This may indicate a serious issue.
              </p>
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={reset}
                variant="primary"
                size="lg"
                className="w-full"
              >
                Restart application
              </Button>
              
              <Button 
                onClick={() => window.location.href = '/'}
                variant="outline"
                size="lg"
                className="w-full"
              >
                Reload page
              </Button>
            </div>
            
            <div className="mt-8">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                If this error persists, please{' '}
                <a 
                  href="mailto:support@languageexchange.com" 
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  contact technical support
                </a>
              </p>
            </div>
            
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-left">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                  Critical Error Details (Development)
                </h3>
                {error.digest && (
                  <p className="text-xs font-mono text-red-600 dark:text-red-300 mb-1">
                    Digest: {error.digest}
                  </p>
                )}
                <p className="text-xs font-mono text-red-600 dark:text-red-300 break-all">
                  {error.message}
                </p>
                {error.stack && (
                  <details className="mt-2">
                    <summary className="text-xs font-mono text-red-600 dark:text-red-300 cursor-pointer">
                      Stack trace
                    </summary>
                    <pre className="text-xs font-mono text-red-600 dark:text-red-300 mt-1 whitespace-pre-wrap">
                      {error.stack}
                    </pre>
                  </details>
                )}
              </div>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
