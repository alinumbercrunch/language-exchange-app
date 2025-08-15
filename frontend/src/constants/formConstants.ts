/**
 * Form field constants for better maintainability and type safety.
 * Contains field options, validation messages, and default form values.
 */

import { PROFICIENCY_LEVELS, GENDER_OPTIONS as SHARED_GENDER_OPTIONS, SUPPORTED_LANGUAGES, SUPPORTED_COUNTRIES } from '../../../shared/user.interface';

import type { IUserRegistrationRequest } from '../../../shared/user.interface';

/**
 * Language proficiency level options for select dropdowns.
 */
export const PROFICIENCY_OPTIONS = PROFICIENCY_LEVELS.map(level => ({
    value: level,
    label: level
}));

export const GENDER_OPTIONS = SHARED_GENDER_OPTIONS.map(gender => ({
    value: gender,
    label: gender
}));

export const LANGUAGE_OPTIONS = SUPPORTED_LANGUAGES.map(language => ({
    value: language,
    label: language
}));

export const COUNTRY_OPTIONS = SUPPORTED_COUNTRIES.map(country => ({
    value: country,
    label: country
}));

/**
 * Default form values for user registration.
 * Provides initial state for the registration form with proper typing.
 */
export const DEFAULT_REGISTRATION_DATA: IUserRegistrationRequest = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    familyName: '',
    bio: '',
    profileOptions: {
        nativeLanguage: 'English' as const,
        practicingLanguage: {
            language: 'Japanese' as const,
            proficiency: 'Beginner' as const,
        },
        country: 'United States' as const,
        city: '',
        gender: 'Prefer not to say' as const,
        age: 18,
    },
};
