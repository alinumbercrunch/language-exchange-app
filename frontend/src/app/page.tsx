'use client'; // This directive makes this a Client Component

import { useCallback } from 'react';

import AppError from '../../../shared/appError';
import { API_CONFIG } from '../constants/apiConstants';
import { useAsync } from '../hooks/useAsync';

// This function contains the actual API call logic.
// We define it outside the component so it can be memoized with useCallback.
async function testBackendConnection(): Promise<string> {
  // IMPORTANT: Your backend server must be running
  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.HEALTH}`);

  if (response.ok) {
    const text = await response.text();
    return `Backend responded: "${text}"`;
  } else {
    const errorText = await response.text();
    throw new AppError(
      `Backend responded with error: ${response.status} ${response.statusText} - ${errorText}`,
      response.status
    );
  }
}

/**
 * The main landing page of the application.
 * It features a welcome message and a status check for the backend connection.
 */
  export default function Home() {
  // Use our new hook to handle the async logic
  const { data: apiResponse, error, isLoading } = useAsync(useCallback(() => testBackendConnection(), []));

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-4">Welcome to Language Exchange</h1>
      <p className="text-lg text-gray-700">Let’s build something meaningful, multilingual, and scalable.</p>

      {/* Display API Response or Error */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-xl font-semibold mb-2">Backend Connection Status:</h2>
        {isLoading && <p className="text-gray-500 font-medium">Loading...</p>}
        {error && <p className="text-red-600 font-medium">{error.message}</p>}
        {apiResponse && <p className="text-green-700 font-medium">{apiResponse}</p>}
      </div>
    </main>
  );
}