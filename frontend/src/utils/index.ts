/**
 * Barrel export for utility functions
 * Provides a single import point for all utilities
 */

// API utilities
export { api, apiRequest } from "./apiClient";

// Form utilities
export { setNestedValue } from "./formHelpers";

// Validation utilities
export {
	validateEmail,
	validatePassword,
	validateRequired,
	validateUsername,
	validateAge,
	type ValidationResult,
	type PasswordRequirements
} from "./validation";

// Storage utilities
export {
	getStorageItem,
	setStorageItem,
	removeStorageItem,
	clearStorage,
	isStorageAvailable,
	tokenStorage,
	STORAGE_KEYS,
	type StorageKey
} from "./localStorage";

// Styling utilities
export {
	classNames,
	conditionalClasses,
	commonStyles,
	sizeStyles,
	getResponsiveTextSize,
	loadingClasses
} from "./classNames";

// Logging utilities
export { logger, loggers, performanceLogger, LogLevel } from "./logger";
