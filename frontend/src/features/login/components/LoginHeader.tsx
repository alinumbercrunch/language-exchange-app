import Link from "next/link";
import React from "react";

/**
 * Login page header component with branding and navigation.
 * Pure UI component for page header and navigation links.
 */
export function LoginHeader() {
	return (
		<div className="sm:mx-auto sm:w-full sm:max-w-md">
			<Link href="/" className="flex justify-center">
				<h2 className="text-3xl font-bold text-black">Language Exchange</h2>
			</Link>
			<h2 className="mt-6 text-center text-3xl font-medium text-gray-900">Sign in to your account</h2>
			<p className="mt-2 text-center text-sm text-gray-600">
				Or{" "}
				<Link href="/register" className="font-medium text-black hover:underline">
					create a new account
				</Link>
			</p>
		</div>
	);
}
