/**
 * Next.js App Router Error Component Types
 * Shared types for error boundaries and error handling
 */

/**
 * Props for Next.js error boundary components
 */
export interface ErrorComponentProps {
  /** Error object with optional digest for Next.js error tracking */
  error: Error & { digest?: string };
  /** Function to attempt recovery from the error */
  reset: () => void;
}

/**
 * Template component props
 */
export interface TemplateProps {
  children: React.ReactNode;
}
