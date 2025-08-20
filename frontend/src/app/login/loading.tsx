/**
 * Loading page component for the login page.
 * This follows Next.js App Router conventions for route-specific loading UI.
 */
export default function Loading() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900">
			<div className="text-center">
				<div className="relative mb-6">
					{/* Login form skeleton */}
					<div className="w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
						<div className="h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-4" />
						<div className="space-y-4">
							<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
							<div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
							<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
							<div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
							<div className="h-10 bg-blue-200 dark:bg-blue-800 rounded animate-pulse mt-6" />
							<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-4" />
						</div>
					</div>
				</div>

				<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Preparing Login</h2>
				<p className="text-sm text-gray-600 dark:text-gray-400">Setting up your authentication form...</p>
			</div>
		</div>
	);
}
