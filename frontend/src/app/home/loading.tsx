/**
 * Loading page component for the home page.
 * This follows Next.js App Router conventions for route-specific loading UI.
 */
export default function Loading() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-white">
			<div className="text-center">
				<div className="relative">
					{/* Hero section skeleton */}
					<div className="w-full max-w-4xl mx-auto bg-gray-50 rounded-lg p-8 mb-6">
						<div className="h-12 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-4 mx-auto w-3/4" />
						<div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4 mx-auto w-1/2" />
						<div className="flex justify-center space-x-4">
							<div className="h-10 bg-blue-200 dark:bg-blue-800 rounded animate-pulse w-32" />
							<div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-32" />
						</div>
					</div>

					{/* Features section skeleton */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
						<div className="h-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
						<div className="h-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
						<div className="h-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
					</div>
				</div>

				<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Loading Home Page</h2>
				<p className="text-sm text-gray-600 dark:text-gray-400">Preparing the language exchange experience...</p>
			</div>
		</div>
	);
}
