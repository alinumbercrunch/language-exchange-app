import React from "react";

interface LoginMessagesProps {
	submitError: Error | null;
	loginResult: { message: string } | null;
}

/**
 * Login form messages component for displaying success/error states.
 * Pure UI component for user feedback.
 *
 * @param submitError - Error object if submission failed
 * @param loginResult - Success result object if login succeeded
 */
export function LoginMessages({ submitError, loginResult }: LoginMessagesProps) {
	if (!submitError && !loginResult) return null;

	return (
		<>
			{/* Error Message */}
			{submitError && (
				<div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
					<p className="text-sm">{submitError.message}</p>
				</div>
			)}

			{/* Success Message */}
			{loginResult && (
				<div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
					<p className="text-sm">{loginResult.message}</p>
				</div>
			)}
		</>
	);
}
