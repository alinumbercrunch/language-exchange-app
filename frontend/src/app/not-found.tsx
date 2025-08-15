'use client';

import { Button } from '@/components/ui/Button';

/**
 * 404 Not Found page component.
 * This follows Next.js App Router conventions for handling 404 errors.
 * Automatically shown when a route doesn't exist.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300 dark:text-gray-700 mb-4">
            404
          </h1>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Page not found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={() => window.history.back()}
            variant="primary"
            size="lg"
            className="w-full"
          >
            Go back
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
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            If you believe this is an error, please{' '}
            <a 
              href="mailto:support@languageexchange.com" 
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
            >
              contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
