import { ArrowRight } from "lucide-react";
import React from "react";

interface LoginSubmitButtonProps {
	isSubmitting: boolean;
}

/**
 * Login form submit button component.
 * Pure UI component for form submission.
 *
 * @param isSubmitting - Whether form is currently submitting
 */
export function LoginSubmitButton({ isSubmitting }: LoginSubmitButtonProps) {
	return (
		<button
			type="submit"
			disabled={isSubmitting}
			className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white transition-colors duration-200 ${
				isSubmitting
					? "bg-gray-400 cursor-not-allowed"
					: "bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
			}`}
		>
			{isSubmitting ? "Signing in..." : "Sign in"}
			{!isSubmitting && (
				<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
			)}
		</button>
	);
}
