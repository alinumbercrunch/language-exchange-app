import React from "react";

/**
 * Social login options component.
 * Pure UI component for third-party authentication options.
 */
export function LoginSocialOptions() {
	return (
		<div className="mt-6">
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-t border-gray-300" />
				</div>
				<div className="relative flex justify-center text-sm">
					<span className="px-2 bg-white text-gray-500">Or continue with</span>
				</div>
			</div>

			<div className="mt-6 grid grid-cols-2 gap-3">
				<button
					type="button"
					className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
				>
					<span>Google</span>
				</button>
				<button
					type="button"
					className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
				>
					<span>Facebook</span>
				</button>
			</div>
		</div>
	);
}
