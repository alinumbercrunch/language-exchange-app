import { useAsync } from "../../../hooks/useAsync";
import { useSimpleFormState } from "../../../hooks/useFormState";
import { loginUser } from "../../../services/userService";

// Login data interface
interface LoginData {
	email: string;
	password: string;
	[key: string]: string; // Index signature to satisfy Record<string, unknown>
}

const INITIAL_LOGIN_DATA: LoginData = {
	email: "",
	password: ""
};

/**
 * Custom hook for login form logic and state management.
 * Separates business logic from UI presentation.
 *
 * @returns Object containing form state, handlers, and submission logic
 */
export function useLoginForm() {
	const { formData, handleChange } = useSimpleFormState<LoginData>(INITIAL_LOGIN_DATA);

	const {
		data: loginResult,
		error: submitError,
		isLoading: isSubmitting,
		execute: submitLogin
	} = useAsync(() => loginUser(formData), false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await submitLogin();
	};

	return {
		formData,
		handleChange,
		handleSubmit,
		loginResult,
		submitError,
		isSubmitting
	};
}

export type { LoginData };
