import React from "react";

import { Button } from "../../../components/ui/Button";

interface RegisterFormActionsProps {
	isLoading: boolean;
	onReset: () => void;
}

/**
 * Registration form action buttons component.
 * Pure UI component for form actions.
 *
 * @param isLoading - Whether form is currently submitting
 * @param onReset - Reset form handler
 */
export function RegisterFormActions({ isLoading, onReset }: RegisterFormActionsProps) {
	return (
		<div className="mt-8 flex justify-end space-x-4">
			<Button type="button" variant="outline" onClick={onReset} disabled={isLoading}>
				Reset Form
			</Button>
			<Button type="submit" isLoading={isLoading} disabled={isLoading}>
				{isLoading ? "Creating Account..." : "Create Account"}
			</Button>
		</div>
	);
}
