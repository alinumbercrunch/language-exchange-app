/**
 * Language proficiency levels for language learning platform.
 */
export const PROFICIENCY_LEVELS = [
    'Beginner',
    'Elementary', 
    'Intermediate',
    'Upper Intermediate',
    'Advanced',
    'Native'
] as const;

export type ProficiencyLevel = typeof PROFICIENCY_LEVELS[number];

/**
 * Gender options for user profiles.
 */
export const GENDER_OPTIONS = [
    'Male',
    'Female',
    'Non-binary',
    'Prefer not to say'
] as const;

export type Gender = typeof GENDER_OPTIONS[number];

/**
 * Supported languages for language exchange platform.
 */
export const SUPPORTED_LANGUAGES = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
    'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi',
    'Dutch', 'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Polish'
] as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

/**
 * Supported countries for user location selection.
 */
export const SUPPORTED_COUNTRIES = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France',
    'Spain', 'Italy', 'Netherlands', 'Sweden', 'Norway', 'Denmark',
    'Finland', 'Poland', 'Russia', 'China', 'Japan', 'South Korea',
    'Australia', 'New Zealand', 'Brazil', 'Mexico', 'Argentina'
] as const;

export type SupportedCountry = typeof SUPPORTED_COUNTRIES[number];

export interface IUser {
    // MongoDB has its own ID type. In the backend user.ts file, we are extending this file and the MongoDB document which have different ID types. THis creates an error. Research suggests using a new feature of Mongo DB (HydratedDocument). 
     _id: string;
    username: string;
    email: string;
    firstName: string;
    familyName: string;
    profilePictureUrl?: string;
    bio: string;
    registrationDate: Date;
    isActive: boolean;
    lastLoginDate?: Date;
    createdAt: Date;
    updatedAt: Date;

    profileOptions: {
    nativeLanguage: string;
    practicingLanguage: {
        language: string;
        proficiency: ProficiencyLevel;
        };
        country: SupportedCountry;
        city: string;
        gender: Gender;
        age: number;
    };
}

export interface IUserRegistrationRequest {
    username: string;
    email: string;
    password: string;
    firstName: string;
    familyName: string;
    bio: string;
    profileOptions: {
        nativeLanguage: SupportedLanguage;
        practicingLanguage: {
            language: SupportedLanguage;
            proficiency: ProficiencyLevel;
        };
        country: SupportedCountry;
        city: string;
        gender: Gender;
        age: number;
    };
}

export interface IUserLoginRequest {
    email: string;
    password: string;
}

export interface IUserAuthResponse {
    user: IUser;
    token: string;
}

export interface IUserProfileUpdateRequest {
    firstName?: string;
    familyName?: string;
    profilePictureUrl?: string;
    bio?: string;
}

export interface IUserPasswordUpdateRequest {
    currentPassword: string;
    newPassword: string;
}