import React from "react";

interface LoginFormFieldsProps {
	email: string;
	password: string;
	isSubmitting: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Login form input fields component.
 * Pure UI component without business logic.
 *
 * @param email - Current email value
 * @param password - Current password value
 * @param isSubmitting - Whether form is currently submitting
 * @param onChange - Input change handler
 */
export function LoginFormFields({ email, password, isSubmitting, onChange }: LoginFormFieldsProps) {
	return (
		<div className="space-y-6">
			<div>
				<label htmlFor="email" className="block text-sm font-medium text-gray-700">
					Email address
				</label>
				<div className="mt-1">
					<input
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						required
						value={email}
						onChange={onChange}
						disabled={isSubmitting}
						className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm disabled:bg-gray-100"
						placeholder="Enter your email"
					/>
				</div>
			</div>

			<div>
				<label htmlFor="password" className="block text-sm font-medium text-gray-700">
					Password
				</label>
				<div className="mt-1">
					<input
						id="password"
						name="password"
						type="password"
						autoComplete="current-password"
						required
						value={password}
						onChange={onChange}
						disabled={isSubmitting}
						className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm disabled:bg-gray-100"
						placeholder="Enter your password"
					/>
				</div>
			</div>

			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<input
						id="remember-me"
						name="remember-me"
						type="checkbox"
						disabled={isSubmitting}
						className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded disabled:opacity-50"
					/>
					<label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
						Remember me
					</label>
				</div>

				<div className="text-sm">
					<a href="#" className="font-medium text-black hover:underline">
						Forgot your password?
					</a>
				</div>
			</div>
		</div>
	);
}
