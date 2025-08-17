/**
 * Utility functions for CSS class manipulation and conditional styling
 */

/**
 * Conditionally join class names, filtering out falsy values
 * 
 * @param classes - Array of class names or conditional objects
 * @returns Joined class string
 */
export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Create conditional class names based on conditions
 * 
 * @param baseClasses - Always applied classes
 * @param conditionalClasses - Object with condition -> class mappings
 * @returns Combined class string
 */
export function conditionalClasses(
  baseClasses: string,
  conditionalClasses: Record<string, boolean>
): string {
  const additional = Object.entries(conditionalClasses)
    .filter(([, condition]) => condition)
    .map(([className]) => className)
    .join(' ');

  return classNames(baseClasses, additional);
}

/**
 * Common Tailwind CSS class sets for reusability
 */
export const commonStyles = {
  // Button styles
  buttonBase: 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  buttonPrimary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  buttonSecondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
  buttonDanger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  
  // Input styles
  inputBase: 'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500',
  inputError: 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500',
  
  // Layout styles
  containerBase: 'mx-auto px-4 sm:px-6 lg:px-8',
  sectionBase: 'py-16 lg:py-24',
  
  // Text styles
  headingPrimary: 'text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl',
  headingSecondary: 'text-2xl font-bold text-gray-900',
  textMuted: 'text-gray-500',
  textError: 'text-red-600 text-sm',
  
  // Card styles
  cardBase: 'bg-white overflow-hidden shadow rounded-lg',
  cardPadding: 'px-4 py-5 sm:p-6'
} as const;

/**
 * Size-based style variants
 */
export const sizeStyles = {
  button: {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-12 px-6 text-lg'
  },
  input: {
    sm: 'px-3 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg'
  }
} as const;

/**
 * Helper function to get responsive text sizes
 */
export function getResponsiveTextSize(size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'): string {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl'
  };
  
  return sizes[size];
}

/**
 * Helper function to generate loading state classes
 */
export function loadingClasses(isLoading: boolean): string {
  return classNames(
    isLoading && 'opacity-50 cursor-not-allowed'
  );
}
