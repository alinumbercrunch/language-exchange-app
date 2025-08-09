// API configuration constants
export const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
    ENDPOINTS: {
        USERS: {
            REGISTER: '/api/users/register',
            LOGIN: '/api/users/login',
        },
        HEALTH: '/',
    },
} as const;
