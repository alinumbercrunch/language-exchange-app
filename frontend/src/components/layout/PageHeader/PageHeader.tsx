import React from "react";

/**
 * Props for the PageHeader component.
 */
export interface PageHeaderProps {
	/** Main title text */
	title: string;
	/** Optional subtitle text */
	subtitle?: string;
	/** Optional content displayed on the right side of the header */
	children?: React.ReactNode;
}

/**
 * A page header component that displays a title, optional subtitle, and optional actions.
 *
 * @param title - Main heading text
 * @param subtitle - Optional descriptive text below the title
 * @param children - Optional content (typically buttons or actions) aligned to the right
 * @returns A styled page header with title, subtitle, and action area
 */
export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
	return (
		<div className="border-b border-gray-200 pb-4 mb-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">{title}</h1>
					{subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
				</div>
				{children && <div className="flex items-center space-x-2">{children}</div>}
			</div>
		</div>
	);
}
