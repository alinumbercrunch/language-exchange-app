"use client";

import React from "react";

import { LoginFormFields, LoginHeader, LoginMessages, LoginSocialOptions, LoginSubmitButton } from "./components";
import { useLoginForm } from "./hooks/useLoginForm";

/**
 * Main login form component.
 * Coordinates between business logic (hooks) and UI components.
 * Demonstrates separation of concerns architecture.
 */
export function LoginForm() {
	const { formData, handleChange, handleSubmit, loginResult, submitError, isSubmitting } = useLoginForm();

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<LoginHeader />

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<LoginMessages submitError={submitError} loginResult={loginResult} />

					<form onSubmit={handleSubmit}>
						<LoginFormFields
							email={formData.email}
							password={formData.password}
							isSubmitting={isSubmitting}
							onChange={handleChange}
						/>

						<div className="mt-6">
							<LoginSubmitButton isSubmitting={isSubmitting} />
						</div>
					</form>

					<LoginSocialOptions />
				</div>
			</div>
		</div>
	);
}
