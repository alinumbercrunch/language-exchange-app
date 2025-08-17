/**
 * Loading page component for the entire application.
 * This follows Next.js App Router conventions for loading UI.
 * Shows while any page in the app is loading.
 */
export default function Loading() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="text-center">
				<div className="relative">
					{/* Spinning loader */}
					<div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin border-t-blue-600 dark:border-t-blue-400 mx-auto mb-4" />

					{/* Pulsing dots */}
					<div className="flex justify-center space-x-2 mb-4">
						<div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse" />
						<div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse [animation-delay:0.1s]" />
						<div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse [animation-delay:0.2s]" />
					</div>
				</div>

				<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Loading...</h2>
				<p className="text-sm text-gray-600 dark:text-gray-400">Please wait while we prepare your content</p>
			</div>
		</div>
	);
}
