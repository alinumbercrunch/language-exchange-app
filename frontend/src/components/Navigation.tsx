import Link from "next/link";
import React from "react";

interface NavigationProps {
	brandName?: string;
}

/**
 * Navigation component that displays the main site navigation with brand name and action buttons.
 *
 * @param brandName - The brand name to display (default: "Language Exchange")
 * @returns Navigation bar with brand link and action buttons
 */
export const Navigation: React.FC<NavigationProps> = ({ brandName = "Language Exchange" }) => {
	return (
		<nav className="flex items-center justify-between px-6 py-6 lg:px-12">
			<Link href="/" className="text-2xl font-bold text-black hover:text-gray-800 transition-colors">
				{brandName}
			</Link>
			<div className="flex items-center space-x-4">
				<Link
					href="/register"
					className="px-6 py-2 text-sm font-medium text-black border border-black rounded-md hover:bg-black hover:text-white transition-colors duration-200"
				>
					Sign Up
				</Link>
				<Link
					href="/login"
					className="px-6 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors duration-200"
				>
					Login
				</Link>
			</div>
		</nav>
	);
};
