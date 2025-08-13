/**
 * Validation Constants - Centralized validation rules and options
 * Contains validation rules, error messages, and supported values for user data
 */

/**
 * Validation rules for user input fields with length and pattern constraints.
 */
export const VALIDATION_RULES = {
    USERNAME: {
        MIN_LENGTH: 3,
        MAX_LENGTH: 30,
        PATTERN: /^[a-zA-Z0-9_]+$/, // Alphanumeric and underscore only
    },
    PASSWORD: {
        MIN_LENGTH: 6,
        MAX_LENGTH: 128,
        REQUIRE_UPPERCASE: true,
        REQUIRE_LOWERCASE: true,
        REQUIRE_NUMBER: true,
    },
    BIO: {
        MAX_LENGTH: 250,
    },
    AGE: {
        MIN: 13,
        MAX: 120,
    },
} as const;

/**
 * Language proficiency levels for language learning (matching frontend options).
 */
export const PROFICIENCY_LEVELS = [
    'Beginner',
    'Elementary', 
    'Intermediate',
    'Upper Intermediate',
    'Advanced',
    'Native'
] as const;

/**
 * Gender options for user profiles (matching frontend options).
 */
export const GENDER_OPTIONS = [
    'Male',
    'Female',
    'Non-binary',
    'Prefer not to say'
] as const;

/**
 * Supported languages for native and practicing language selection.
 */
export const SUPPORTED_LANGUAGES = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
    'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi',
    'Dutch', 'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Polish'
] as const;

/**
 * Supported countries for user location selection.
 */
export const SUPPORTED_COUNTRIES = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France',
    'Spain', 'Italy', 'Netherlands', 'Sweden', 'Norway', 'Denmark',
    'Finland', 'Poland', 'Russia', 'China', 'Japan', 'South Korea',
    'Australia', 'New Zealand', 'Brazil', 'Mexico', 'Argentina'
] as const;

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
    }
} as const;

/**
 * Exported validation arrays for use in middleware and validation functions.
 */
export const VALID_PROFICIENCY_LEVELS = PROFICIENCY_LEVELS;
export const VALID_GENDERS = GENDER_OPTIONS;
