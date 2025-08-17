import React from 'react';

import { classNames, commonStyles, sizeStyles, loadingClasses } from '../../../utils';

import type { ButtonVariant, ComponentSize } from '../../../types/ui-components';

/**
 * Props for the Button component.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Visual style variant of the button */
    variant?: ButtonVariant;
    /** Size of the button */
    size?: ComponentSize;
    /** Whether the button is in a loading state */
    isLoading?: boolean;
    /** Button content */
    children: React.ReactNode;
}

/**
 * A reusable button component with multiple variants and sizes.
 * 
 * @param variant - Visual style variant (default: 'primary')
 * @param size - Button size (default: 'md')  
 * @param isLoading - Shows loading spinner when true (default: false)
 * @param className - Additional CSS classes
 * @param children - Button content
 * @param disabled - Whether the button is disabled
 * @param props - Additional HTML button attributes
 * @returns A styled button element
 */
export function Button({ 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    className = '',
    children,
    disabled,
    ...props 
}: ButtonProps) {
    const variants = {
        primary: commonStyles.buttonPrimary,
        secondary: commonStyles.buttonSecondary,
        outline: "border border-gray-300 bg-transparent hover:bg-gray-50 focus:ring-gray-500",
        ghost: "hover:bg-gray-100 focus:ring-gray-500",
        danger: commonStyles.buttonDanger
    };
    
    return (
        <button
            className={classNames(
                commonStyles.buttonBase,
                variants[variant],
                sizeStyles.button[size],
                loadingClasses(isLoading),
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            )}
            {children}
        </button>
    );
}
