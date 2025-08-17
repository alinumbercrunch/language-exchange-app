import React from "react";

import { Input, Select, TextArea, FormSection } from "../../../components/ui";
import {
	PROFICIENCY_OPTIONS,
	GENDER_OPTIONS,
	LANGUAGE_OPTIONS,
	COUNTRY_OPTIONS
} from "../../../constants/formConstants";

import type { IUserRegistrationRequest } from "../../../../../shared/user.interface";

export interface RegistrationFormFieldsProps {
	formData: IUserRegistrationRequest;
	handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
	errors?: Record<string, string | undefined>;
}

export function RegistrationFormFields({ formData, handleChange, errors }: RegistrationFormFieldsProps) {
	return (
		<div className="space-y-6">
			<FormSection title="Personal Information" useGrid>
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
			</FormSection>

			<FormSection title="Language Preferences" useGrid>
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
			</FormSection>

			<FormSection title="Location & Personal Details" useGrid>
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
			</FormSection>

			<FormSection title="About You">
				<TextArea
					label="Bio"
					name="bio"
					value={formData.bio}
					onChange={handleChange}
					placeholder="Tell us a bit about yourself, your interests, and what you'd like to achieve through language exchange..."
					error={errors?.bio}
					helperText="Optional - help others get to know you better"
				/>
			</FormSection>
		</div>
	);
}
