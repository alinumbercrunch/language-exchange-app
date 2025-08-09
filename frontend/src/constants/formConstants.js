"use strict";
// Form field constants for better maintainability and type safety
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_REGISTRATION_DATA = exports.GENDER_OPTIONS = exports.PROFICIENCY_OPTIONS = void 0;
exports.PROFICIENCY_OPTIONS = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
];
exports.GENDER_OPTIONS = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Non-binary', label: 'Non-binary' },
    { value: 'Prefer not to say', label: 'Prefer not to say' },
];
// Default form values
exports.DEFAULT_REGISTRATION_DATA = {
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
            proficiency: 'Beginner',
        },
        country: '',
        city: '',
        gender: 'Prefer not to say',
        age: 18,
    },
};
