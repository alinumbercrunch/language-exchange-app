/**
 * Form field constants for better maintainability and type safety.
 * Contains field options, validation messages, and default form values.
 */

import type { IUserRegistrationRequest } from '../../../shared/user.interface';

/**
 * Language proficiency level options for select dropdowns.
 */
export const PROFICIENCY_OPTIONS = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Elementary', label: 'Elementary' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Upper Intermediate', label: 'Upper Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
    { value: 'Native', label: 'Native' }
] as const;

export const GENDER_OPTIONS = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Non-binary', label: 'Non-binary' },
    { value: 'Prefer not to say', label: 'Prefer not to say' },
] as const;

export const LANGUAGE_OPTIONS = [
    { value: 'English', label: 'English' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'German', label: 'German' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Portuguese', label: 'Portuguese' },
    { value: 'Russian', label: 'Russian' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Korean', label: 'Korean' },
    { value: 'Arabic', label: 'Arabic' },
    { value: 'Hindi', label: 'Hindi' }
] as const;

export const COUNTRY_OPTIONS = [
    { value: 'United States', label: 'United States' },
    { value: 'Canada', label: 'Canada' },
    { value: 'United Kingdom', label: 'United Kingdom' },
    { value: 'Germany', label: 'Germany' },
    { value: 'France', label: 'France' },
    { value: 'Spain', label: 'Spain' },
    { value: 'Italy', label: 'Italy' },
    { value: 'Japan', label: 'Japan' },
    { value: 'South Korea', label: 'South Korea' },
    { value: 'China', label: 'China' },
    { value: 'Australia', label: 'Australia' },
    { value: 'Brazil', label: 'Brazil' }
] as const;

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
        nativeLanguage: '',
        practicingLanguage: {
            language: '',
            proficiency: 'Beginner' as const,
        },
        country: '',
        city: '',
        gender: 'Prefer not to say' as const,
        age: 18,
    },
} as const;
