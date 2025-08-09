// Form field constants for better maintainability and type safety

export const PROFICIENCY_OPTIONS = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
] as const;

export const GENDER_OPTIONS = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Non-binary', label: 'Non-binary' },
    { value: 'Prefer not to say', label: 'Prefer not to say' },
] as const;

// Default form values
export const DEFAULT_REGISTRATION_DATA = {
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
