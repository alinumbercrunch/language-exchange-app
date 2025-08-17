/**
 * Shared styling utilities for form components
 */

/**
 * Returns consistent input field classes based on error state
 * @param error - Whether the field has an error
 * @param additionalClasses - Additional CSS classes to apply
 * @returns Complete className string for input fields
 */
export const getInputClasses = (error?: string, additionalClasses?: string): string => {
	const baseClasses = `
        block w-full rounded-md border px-3 py-2 text-sm transition-colors
        bg-white text-gray-900 placeholder-gray-500
        focus:outline-none focus:ring-2 focus:ring-offset-1
        disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
    `;

	const errorClasses = error
		? "border-red-300 focus:border-red-500 focus:ring-red-500"
		: "border-gray-300 focus:border-blue-500 focus:ring-blue-500";

	return `${baseClasses} ${errorClasses} ${additionalClasses || ""}`.trim();
};
