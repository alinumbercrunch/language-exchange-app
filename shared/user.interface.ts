/**
 * Language proficiency levels for language learning platform.
 */
export type ProficiencyLevel = 'Beginner' | 'Elementary' | 'Intermediate' | 'Upper Intermediate' | 'Advanced' | 'Native';

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
    country: string;
    city: string;
    gender: 'Male' | 'Female' | 'Non-binary' | 'Prefer not to say';
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
        nativeLanguage: string;
        practicingLanguage: {
            language: string;
            proficiency: ProficiencyLevel;
        };
        country: string;
        city: string;
        gender: 'Male' | 'Female' | 'Non-binary' | 'Prefer not to say';
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