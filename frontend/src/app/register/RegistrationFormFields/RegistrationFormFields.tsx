import React from 'react';

import { Input, Select, TextArea } from '../../../components/ui';
import { PROFICIENCY_OPTIONS, GENDER_OPTIONS } from '../../../constants/formConstants';

import type { IUserRegistrationRequest } from '../../../../../shared/user.interface';

export interface RegistrationFormFieldsProps {
    formData: IUserRegistrationRequest;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    errors?: Record<string, string>;
}

// Temporary inline constants until we resolve the import issue
const LANGUAGE_OPTIONS = [
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

const COUNTRY_OPTIONS = [
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

export function RegistrationFormFields({ formData, handleChange, errors }: RegistrationFormFieldsProps) {
    return (
        <div className="space-y-6">
            {/* Personal Information Section */}
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        error={errors?.username}
                        required
                    />
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors?.email}
                        required
                    />
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors?.password}
                        required
                    />
                    <Input
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        error={errors?.firstName}
                        required
                    />
                    <Input
                        label="Family Name"
                        name="familyName"
                        value={formData.familyName}
                        onChange={handleChange}
                        error={errors?.familyName}
                        required
                    />
                </div>
            </div>

            {/* Language Preferences Section */}
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Language Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                        label="Native Language"
                        name="profileOptions.nativeLanguage"
                        value={formData.profileOptions.nativeLanguage}
                        onChange={handleChange}
                        options={LANGUAGE_OPTIONS}
                        placeholder="Select your native language"
                        error={errors?.nativeLanguage}
                        required
                    />
                    <Select
                        label="Language to Practice"
                        name="profileOptions.practicingLanguage.language"
                        value={formData.profileOptions.practicingLanguage.language}
                        onChange={handleChange}
                        options={LANGUAGE_OPTIONS}
                        placeholder="Select language to practice"
                        error={errors?.practicingLanguage}
                        required
                    />
                    <Select
                        label="Proficiency Level"
                        name="profileOptions.practicingLanguage.proficiency"
                        value={formData.profileOptions.practicingLanguage.proficiency}
                        onChange={handleChange}
                        options={PROFICIENCY_OPTIONS}
                        error={errors?.proficiency}
                        required
                    />
                </div>
            </div>

            {/* Location & Personal Details Section */}
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Location & Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                        label="Country"
                        name="profileOptions.country"
                        value={formData.profileOptions.country}
                        onChange={handleChange}
                        options={COUNTRY_OPTIONS}
                        placeholder="Select your country"
                        error={errors?.country}
                        required
                    />
                    <Input
                        label="City"
                        name="profileOptions.city"
                        value={formData.profileOptions.city}
                        onChange={handleChange}
                        error={errors?.city}
                        required
                    />
                    <Select
                        label="Gender"
                        name="profileOptions.gender"
                        value={formData.profileOptions.gender}
                        onChange={handleChange}
                        options={GENDER_OPTIONS}
                        error={errors?.gender}
                        required
                    />
                    <Input
                        label="Age"
                        name="profileOptions.age"
                        type="number"
                        min="13"
                        max="120"
                        value={formData.profileOptions.age}
                        onChange={handleChange}
                        error={errors?.age}
                        required
                    />
                </div>
            </div>

            {/* Bio Section */}
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">About You</h3>
                <TextArea
                    label="Bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us a bit about yourself, your interests, and what you'd like to achieve through language exchange..."
                    error={errors?.bio}
                    helperText="Optional - help others get to know you better"
                />
            </div>
        </div>
    );
}
