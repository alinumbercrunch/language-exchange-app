"use strict";
// backend/src/constants/validationConstants.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALIDATION_MESSAGES = exports.SUPPORTED_COUNTRIES = exports.SUPPORTED_LANGUAGES = exports.VALID_GENDERS = exports.VALID_PROFICIENCY_LEVELS = exports.VALIDATION_RULES = void 0;
// Import shared constants from frontend to ensure consistency
const formConstants_1 = require("../../../frontend/src/constants/formConstants");
// Validation rules for user fields
exports.VALIDATION_RULES = {
    USERNAME: {
        MIN_LENGTH: 3,
        MAX_LENGTH: 20,
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
};
// Extract values for validation
exports.VALID_PROFICIENCY_LEVELS = formConstants_1.PROFICIENCY_OPTIONS.map(opt => opt.value);
exports.VALID_GENDERS = formConstants_1.GENDER_OPTIONS.map(opt => opt.value);
// Supported languages (could be moved to shared constants later)
exports.SUPPORTED_LANGUAGES = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
    'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi',
    'Dutch', 'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Polish'
];
// Supported countries (simplified list - could be expanded)
exports.SUPPORTED_COUNTRIES = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France',
    'Spain', 'Italy', 'Netherlands', 'Sweden', 'Norway', 'Denmark',
    'Finland', 'Poland', 'Russia', 'China', 'Japan', 'South Korea',
    'Australia', 'New Zealand', 'Brazil', 'Mexico', 'Argentina'
];
// Error messages
exports.VALIDATION_MESSAGES = {
    USERNAME: {
        REQUIRED: 'Username is required',
        MIN_LENGTH: `Username must be at least ${exports.VALIDATION_RULES.USERNAME.MIN_LENGTH} characters`,
        MAX_LENGTH: `Username cannot exceed ${exports.VALIDATION_RULES.USERNAME.MAX_LENGTH} characters`,
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
        MIN_LENGTH: `Password must be at least ${exports.VALIDATION_RULES.PASSWORD.MIN_LENGTH} characters`,
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
        AGE_RANGE: `Age must be between ${exports.VALIDATION_RULES.AGE.MIN} and ${exports.VALIDATION_RULES.AGE.MAX}`,
    }
};
