/**
 * Shared Validation Rules - Frontend/Backend consistency
 * Contains validation rules that should be consistent across client and server
 */

export const SHARED_VALIDATION_RULES = {
    USERNAME: {
        MIN_LENGTH: 3,
        MAX_LENGTH: 30,
        PATTERN: /^[a-zA-Z0-9_]+$/, // Alphanumeric and underscore only
    },
    PASSWORD: {
        MIN_LENGTH: 6,
        MAX_LENGTH: 128,
    },
    BIO: {
        MAX_LENGTH: 250,
    },
    AGE: {
        MIN: 13,
        MAX: 120,
    },
} as const;

/**
 * Client-side validation helper functions
 */
export const ValidationHelpers = {
    /**
     * Validates username format and length
     */
    validateUsername(username: string): { isValid: boolean; error?: string } {
        if (!username) {
            return { isValid: false, error: 'Username is required' };
        }
        if (username.length < SHARED_VALIDATION_RULES.USERNAME.MIN_LENGTH) {
            return { isValid: false, error: `Username must be at least ${SHARED_VALIDATION_RULES.USERNAME.MIN_LENGTH} characters` };
        }
        if (username.length > SHARED_VALIDATION_RULES.USERNAME.MAX_LENGTH) {
            return { isValid: false, error: `Username cannot exceed ${SHARED_VALIDATION_RULES.USERNAME.MAX_LENGTH} characters` };
        }
        if (!SHARED_VALIDATION_RULES.USERNAME.PATTERN.test(username)) {
            return { isValid: false, error: 'Username can only contain letters, numbers, and underscores' };
        }
        return { isValid: true };
    },

    /**
     * Validates password strength and length
     */
    validatePassword(password: string): { isValid: boolean; error?: string } {
        if (!password) {
            return { isValid: false, error: 'Password is required' };
        }
        if (password.length < SHARED_VALIDATION_RULES.PASSWORD.MIN_LENGTH) {
            return { isValid: false, error: `Password must be at least ${SHARED_VALIDATION_RULES.PASSWORD.MIN_LENGTH} characters` };
        }
        if (password.length > SHARED_VALIDATION_RULES.PASSWORD.MAX_LENGTH) {
            return { isValid: false, error: `Password cannot exceed ${SHARED_VALIDATION_RULES.PASSWORD.MAX_LENGTH} characters` };
        }
        return { isValid: true };
    },

    /**
     * Validates email format
     */
    validateEmail(email: string): { isValid: boolean; error?: string } {
        if (!email) {
            return { isValid: false, error: 'Email is required' };
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { isValid: false, error: 'Please enter a valid email address' };
        }
        return { isValid: true };
    },

    /**
     * Validates age range
     */
    validateAge(age: number): { isValid: boolean; error?: string } {
        if (age < SHARED_VALIDATION_RULES.AGE.MIN) {
            return { isValid: false, error: `Age must be at least ${SHARED_VALIDATION_RULES.AGE.MIN}` };
        }
        if (age > SHARED_VALIDATION_RULES.AGE.MAX) {
            return { isValid: false, error: `Age cannot exceed ${SHARED_VALIDATION_RULES.AGE.MAX}` };
        }
        return { isValid: true };
    },

    /**
     * Validates bio length
     */
    validateBio(bio: string): { isValid: boolean; error?: string } {
        if (bio && bio.length > SHARED_VALIDATION_RULES.BIO.MAX_LENGTH) {
            return { isValid: false, error: `Bio cannot exceed ${SHARED_VALIDATION_RULES.BIO.MAX_LENGTH} characters` };
        }
        return { isValid: true };
    },
} as const;
