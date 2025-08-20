import React from "react";

/**
 * Props for the Container component.
 */
export interface ContainerProps {
	/** Content to be contained */
	children: React.ReactNode;
	/** Maximum width size of the container */
	size?: "sm" | "md" | "lg" | "xl" | "full";
	/** Additional CSS classes */
	className?: string;
}

/**
 * A responsive container component that centers content and provides consistent spacing.
 *
 * @param children - Content to be wrapped in the container
 * @param size - Maximum width of the container (default: 'md')
 * @param className - Additional CSS classes
 * @returns A centered container with responsive padding and max-width
 */
export function Container({ children, size = "md", className = "" }: ContainerProps) {
	const sizes = {
		sm: "max-w-2xl",
		md: "max-w-4xl",
		lg: "max-w-6xl",
		xl: "max-w-7xl",
		full: "max-w-full"
	};

	return <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${sizes[size]} ${className}`}>{children}</div>;
}
