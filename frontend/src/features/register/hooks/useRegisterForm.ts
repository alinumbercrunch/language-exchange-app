import { useState } from "react";

import { DEFAULT_REGISTRATION_DATA } from "../../../constants/formConstants";
import { useFormState } from "../../../hooks/useFormState";
import { useFormValidation } from "../../../hooks/useFormValidation";
import { registerUser } from "../../../services/userService";

/**
 * Custom hook for registration form logic and state management.
 * Separates business logic from UI presentation.
 *
 * @returns Object containing form state, handlers, and submission logic
 */
export function useRegisterForm() {
	const { formData, handleChange, resetForm } = useFormState(DEFAULT_REGISTRATION_DATA);
	const { errors, validateForm, clearErrors } = useFormValidation();
	const [isLoading, setIsLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState<string>("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		clearErrors();
		setSuccessMessage("");

		// Client-side validation
		if (!validateForm(formData)) {
			setIsLoading(false);
			return;
		}

		try {
			const result = await registerUser(formData);
			const userName = result.user?.firstName || result.user?.username || "User";
			setSuccessMessage(`Registration successful! Welcome, ${userName}!`);
			resetForm();
		} catch (error) {
			if (error instanceof Error) {
				// Handle validation errors or other specific errors
				// For server-side errors, we'll display them as general errors for now
				// TODO: Map server validation errors to specific fields
				console.error("Registration error:", error.message);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const handleReset = () => {
		resetForm();
		clearErrors();
		setSuccessMessage("");
	};

	return {
		formData,
		handleChange,
		handleSubmit,
		handleReset,
		errors,
		isLoading,
		successMessage
	};
}
