import React from "react";

interface RegisterMessagesProps {
	successMessage: string;
	generalError: string | undefined;
}

/**
 * Registration form messages component for displaying success/error states.
 * Pure UI component for user feedback.
 *
 * @param successMessage - Success message to display
 * @param generalError - General error message to display
 */
export function RegisterMessages({ successMessage, generalError }: RegisterMessagesProps) {
	if (!successMessage && !generalError) return null;

	return (
		<>
			{/* Success Message */}
			{successMessage && (
				<div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
					<p className="text-green-800">{successMessage}</p>
				</div>
			)}

			{/* General Error Message */}
			{generalError && (
				<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
					<p className="text-red-800">{generalError}</p>
				</div>
			)}
		</>
	);
}
