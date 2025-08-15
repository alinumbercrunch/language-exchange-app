/**
 * Validation Constants - Centralized validation rules and options
 * Contains validation rules, error messages, and supported values for user data
 */

import {
    PROFICIENCY_LEVELS as _PROFICIENCY_LEVELS,
    GENDER_OPTIONS as _GENDER_OPTIONS,
    SUPPORTED_LANGUAGES as _SUPPORTED_LANGUAGES,
    SUPPORTED_COUNTRIES as _SUPPORTED_COUNTRIES,
} from '../../../shared/user.interface';
import { SHARED_VALIDATION_RULES } from '../../../shared/validationRules';

/**
 * Validation rules for user input fields with length and pattern constraints.
 * Uses shared rules to ensure frontend/backend consistency.
 */
export const VALIDATION_RULES = SHARED_VALIDATION_RULES;

/**
 * Standardized validation error messages for consistent user feedback.
 */
export const VALIDATION_MESSAGES = {
    USERNAME: {
        REQUIRED: 'Username is required',
        MIN_LENGTH: `Username must be at least ${VALIDATION_RULES.USERNAME.MIN_LENGTH} characters`,
        MAX_LENGTH: `Username cannot exceed ${VALIDATION_RULES.USERNAME.MAX_LENGTH} characters`,
        PATTERN: 'Username can only contain letters, numbers, and underscores',
        TAKEN: 'Username is already taken',
    },
    EMAIL: {
        REQUIRED: 'Email is required',
        INVALID: 'Please provide a valid email address',
        TAKEN: 'User with that email already exists',
    },
    PASSWORD: {
        REQUIRED: 'Password is required',
        MIN_LENGTH: `Password must be at least ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} characters`,
        WEAK: 'Password must contain uppercase, lowercase, and number',
    },
    PROFILE: {
        NATIVE_LANGUAGE: 'Native language is required',
        PRACTICING_LANGUAGE: 'Practicing language is required',
        PROFICIENCY: 'Valid proficiency level is required',
        COUNTRY: 'Country is required',
        CITY: 'City is required',
        GENDER: 'Gender selection is required',
        AGE: 'Valid age is required',
        AGE_RANGE: `Age must be between ${VALIDATION_RULES.AGE.MIN} and ${VALIDATION_RULES.AGE.MAX}`,
    },
    PERSONAL: {
        FIRST_NAME: 'First name is required',
        FAMILY_NAME: 'Family name is required',
        NATIVE_LANGUAGE_INVALID: 'Please select a valid native language',
        PRACTICING_LANGUAGE_INVALID: 'Please select a valid practicing language',
        PROFICIENCY_INVALID: 'Please select a valid proficiency level',
        COUNTRY_INVALID: 'Please select a valid country',
        GENDER_INVALID: 'Please select a valid gender',
    },
} as const;

/**
 * Application error messages for services and business logic
 */
export const ERROR_MESSAGES = {
    USER: {
        NOT_FOUND: 'User not found.',
        INVALID_CREDENTIALS: 'Invalid credentials.',
        INVALID_EMAIL_PASSWORD: 'Invalid email or password.',
    },
    AUTH: {
        JWT_SECRET_NOT_CONFIGURED: 'JWT secret not configured',
        INVALID_TOKEN: 'Invalid token',
        NO_TOKEN_PROVIDED: 'No token provided',
    },
    GENERAL: {
        REGISTRATION_ERROR: 'An error occurred during registration.',
        SERVER_CONNECTION_FAILED:
            'Failed to connect to the server. Please check if the backend is running on http://localhost:5000',
    },
} as const;

/**
 * HTTP status codes as constants for better readability
 */
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
} as const;
