"use client";

import { useEffect } from "react";

import { Button } from "../../components/ui/Button";

import type { ErrorComponentProps } from "@/app/types";

/**
 * Error page component for the home page.
 * This follows Next.js App Router conventions for route-specific error boundaries.
 */
export default function Error({ error, reset }: ErrorComponentProps) {
  useEffect(() => {
    console.error("Home page error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
            <svg
              className="h-8 w-8 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            Page Loading Error
          </h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            We encountered an issue while loading the home page. Please try again.
          </p>
        </div>

        <div className="space-y-3">
          <Button onClick={reset} variant="primary" size="lg" className="w-full">
            Try again
          </Button>

          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            size="lg"
            className="w-full"
          >
            Reload page
          </Button>
        </div>

        {process.env.NODE_ENV === "development" && error.message && (
          <div className="mt-6 rounded-lg bg-red-50 p-4 text-left dark:bg-red-900/20">
            <h3 className="mb-2 text-sm font-medium text-red-800 dark:text-red-200">
              Error Details (Development)
            </h3>
            <p className="font-mono text-xs break-all text-red-600 dark:text-red-300">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
