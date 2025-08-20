"use client";

import React from "react";

import { RegisterFormActions, RegisterMessages } from "./components";
import { useRegisterForm } from "./hooks/useRegisterForm";
import { RegistrationFormFields } from "./RegistrationFormFields";
import { Container } from "../../components/layout/Container";
import { PageHeader } from "../../components/layout/PageHeader";

/**
 * Main registration form component.
 * Coordinates between business logic (hooks) and UI components.
 * Demonstrates separation of concerns architecture.
 */
export const RegisterForm: React.FC = () => {
	const { formData, handleChange, handleSubmit, handleReset, errors, isLoading, successMessage } = useRegisterForm();

	return (
		<Container size="md" className="py-8">
			<PageHeader
				title="Create Your Account"
				subtitle="Join our language exchange community and start practicing with native speakers"
			/>

			<RegisterMessages successMessage={successMessage} generalError={errors.general} />

			<form onSubmit={handleSubmit} className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
				<RegistrationFormFields formData={formData} handleChange={handleChange} errors={errors} />

				<RegisterFormActions isLoading={isLoading} onReset={handleReset} />
			</form>
		</Container>
	);
};
