import React from "react";

export interface FormFieldWrapperProps {
	label?: string;
	required?: boolean;
	error?: string;
	helperText?: string;
	id?: string;
	name?: string;
	children: React.ReactNode;
}

/**
 * Shared wrapper component for form fields to eliminate duplicate styling and structure.
 * Provides consistent label, error, and helper text display across all form components.
 */
export default function FormFieldWrapper({
	label,
	required,
	error,
	helperText,
	id,
	name,
	children
}: FormFieldWrapperProps) {
	const fieldId = id || name;

	return (
		<div className="space-y-1">
			{label && (
				<label htmlFor={fieldId} className="block text-sm font-medium text-gray-700">
					{label}
					{required && <span className="text-red-500 ml-1">*</span>}
				</label>
			)}
			{children}
			{error && <p className="text-sm text-red-600">{error}</p>}
			{helperText && !error && <p className="text-sm text-gray-500">{helperText}</p>}
		</div>
	);
}
