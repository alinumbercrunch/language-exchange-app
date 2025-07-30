// src/app/page.tsx

'use client'; // This directive makes this a Client Component

import { useState, useEffect } from 'react';

export default function HomePage() {
  const [apiResponse, setApiResponse] = useState<string>('Loading API response...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to test the backend connection
    async function testBackendConnection() {
      try {
        // IMPORTANT: Your backend server must be running on http://localhost:5000
        const response = await fetch('http://localhost:5000/');

        if (response.ok) { // Check if the response status is 200-299
          const text = await response.text(); // Get the response as plain text
          setApiResponse(`Backend responded: "${text}"`);
          console.log('Backend response:', text);
        } else {
          const errorText = await response.text();
          setError(`Backend responded with error: ${response.status} ${response.statusText} - ${errorText}`);
          console.error('Backend error:', response.status, response.statusText, errorText);
        }
      } catch (err: any) {
        // This catch block handles network errors or CORS issues
        setError(`Error connecting to backend: ${err.message}. Check browser console for more details.`);
        console.error('Network or CORS error:', err);
      }
    }

    testBackendConnection();
  }, []); // The empty dependency array ensures this runs only once after initial render

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-4">Welcome to Language Exchange</h1>
      <p className="text-lg text-gray-700">Let’s build something meaningful, multilingual, and scalable.</p>

      {/* Display API Response or Error */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-xl font-semibold mb-2">Backend Connection Status:</h2>
        {error ? (
          <p className="text-red-600 font-medium">{error}</p>
        ) : (
          <p className="text-green-700 font-medium">{apiResponse}</p>
        )}
      </div>
    </main>
  );
}