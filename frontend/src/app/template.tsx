import type { TemplateProps } from "./types/next-components";

/**
 * Template component that wraps all pages in the application.
 * This follows Next.js App Router conventions for shared UI that persists across pages.
 * Unlike layout, template creates a new instance for each route.
 */
export default function Template({ children }: TemplateProps) {
	return <div className="template-wrapper">{children}</div>;
}
