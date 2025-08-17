/**
 * Shared component type definitions for common UI patterns
 */

import type { ReactNode } from 'react';

/**
 * Base props for components that can have children
 */
export interface WithChildren {
  children: ReactNode;
}

/**
 * Base props for components that accept additional CSS classes
 */
export interface WithClassName {
  className?: string;
}

/**
 * Base props for components that can be disabled
 */
export interface WithDisabled {
  disabled?: boolean;
}

/**
 * Base props for components that handle loading states
 */
export interface WithLoading {
  isLoading?: boolean;
}

/**
 * Common form field props
 */
export interface FormFieldProps extends WithClassName {
  id?: string;
  name?: string;
  label?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

/**
 * Common button variant types
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

/**
 * Common size types for components
 */
export type ComponentSize = 'sm' | 'md' | 'lg';

/**
 * Common loading state interface
 */
export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

/**
 * Common async operation result
 */
export interface AsyncResult<T> extends LoadingState {
  data?: T | null;
}
