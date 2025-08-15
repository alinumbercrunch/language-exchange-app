import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test Page - Language Exchange',
  description: 'Test page to verify Next.js is working correctly',
};

export default function TestPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold text-black">Test Page</h1>
      <p className="text-lg text-gray-600 mt-4">
        This is a simple test page to verify Next.js is working correctly.
      </p>
    </div>
  );
}
