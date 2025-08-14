/**
 * API configuration constants for backend communication.
 */
export const API_CONFIG = {
    /** Base URL for API requests, defaults to localhost:5000 */
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
    /** API endpoint paths */
    ENDPOINTS: {
        USERS: '/api/users',
        AUTH: '/api/auth',
        TEST: '/api/test',
        HEALTH: '/'
    }
} as const;
