import React from "react";

export interface FormSectionProps {
	title: string;
	children: React.ReactNode;
	useGrid?: boolean;
}

/**
 * Reusable form section component to eliminate duplicate styling patterns.
 * Provides consistent styling for section headers and optional grid layout.
 */
export function FormSection({ title, children, useGrid = false }: FormSectionProps) {
	return (
		<div>
			<h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
			{useGrid ? <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div> : children}
		</div>
	);
}
