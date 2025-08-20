import React from "react";

import FormFieldWrapper from "../FormFieldWrapper/FormFieldWrapper";
import { getInputClasses } from "../FormFieldWrapper/formStyles";

/**
 * Props for the TextArea component.
 */
export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	/** Label text to display above the textarea */
	label?: string;
	/** Error message to display below the textarea */
	error?: string;
	/** Helper text to display below the textarea when no error */
	helperText?: string;
}

/**
 * A reusable textarea component with label, error, and helper text support.
 *
 * @param label - Optional label text displayed above textarea
 * @param error - Error message displayed below textarea in red
 * @param helperText - Helper text displayed below textarea when no error
 * @param className - Additional CSS classes
 * @param id - HTML id attribute, falls back to name if not provided
 * @param props - Additional HTML textarea attributes
 * @returns A styled textarea field with optional label and messages
 */
export function TextArea({ label, error, helperText, className = "", id, ...props }: TextAreaProps) {
	const textAreaId = id || props.name;

	return (
		<FormFieldWrapper
			label={label}
			required={props.required}
			error={error}
			helperText={helperText}
			id={textAreaId}
			name={props.name}
		>
			<textarea
				id={textAreaId}
				rows={4}
				className={getInputClasses(error, `resize-vertical ${className}`)}
				{...props}
			/>
		</FormFieldWrapper>
	);
}
