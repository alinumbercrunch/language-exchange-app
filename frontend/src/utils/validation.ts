/**
 * Common validation utilities for frontend forms
 */

/**
 * Validation result interface
 */
export interface ValidationResult {
	isValid: boolean;
	error?: string;
}

/**
 * Email validation using HTML5 pattern
 */
export function validateEmail(email: string): ValidationResult {
	if (!email) {
		return { isValid: false, error: "Email is required" };
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const isValid = emailRegex.test(email);

	return {
		isValid,
		error: isValid ? undefined : "Please enter a valid email address"
	};
}

/**
 * Password validation with customizable requirements
 */
export interface PasswordRequirements {
	minLength?: number;
	requireUppercase?: boolean;
	requireLowercase?: boolean;
	requireNumbers?: boolean;
	requireSpecialChars?: boolean;
}

export function validatePassword(password: string, requirements: PasswordRequirements = {}): ValidationResult {
	const {
		minLength = 6,
		requireUppercase = false,
		requireLowercase = false,
		requireNumbers = false,
		requireSpecialChars = false
	} = requirements;

	if (!password) {
		return { isValid: false, error: "Password is required" };
	}

	if (password.length < minLength) {
		return {
			isValid: false,
			error: `Password must be at least ${minLength} characters long`
		};
	}

	const errors: string[] = [];

	if (requireUppercase && !/[A-Z]/.test(password)) {
		errors.push("at least one uppercase letter");
	}

	if (requireLowercase && !/[a-z]/.test(password)) {
		errors.push("at least one lowercase letter");
	}

	if (requireNumbers && !/\d/.test(password)) {
		errors.push("at least one number");
	}

	if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
		errors.push("at least one special character");
	}

	if (errors.length > 0) {
		return {
			isValid: false,
			error: `Password must contain ${errors.join(", ")}`
		};
	}

	return { isValid: true };
}

/**
 * Required field validation
 */
export function validateRequired(value: string, fieldName: string): ValidationResult {
	const trimmedValue = value?.trim();

	if (!trimmedValue) {
		return {
			isValid: false,
			error: `${fieldName} is required`
		};
	}

	return { isValid: true };
}

/**
 * Username validation
 */
export function validateUsername(username: string): ValidationResult {
	if (!username) {
		return { isValid: false, error: "Username is required" };
	}

	if (username.length < 3) {
		return {
			isValid: false,
			error: "Username must be at least 3 characters long"
		};
	}

	if (username.length > 20) {
		return {
			isValid: false,
			error: "Username must be no more than 20 characters long"
		};
	}

	const usernameRegex = /^[a-zA-Z0-9_-]+$/;
	if (!usernameRegex.test(username)) {
		return {
			isValid: false,
			error: "Username can only contain letters, numbers, hyphens, and underscores"
		};
	}

	return { isValid: true };
}

/**
 * Age validation
 */
export function validateAge(age: number, minAge = 13, maxAge = 120): ValidationResult {
	if (!age || isNaN(age)) {
		return { isValid: false, error: "Age is required" };
	}

	if (age < minAge) {
		return {
			isValid: false,
			error: `You must be at least ${minAge} years old`
		};
	}

	if (age > maxAge) {
		return {
			isValid: false,
			error: `Age must be ${maxAge} or less`
		};
	}

	return { isValid: true };
}
