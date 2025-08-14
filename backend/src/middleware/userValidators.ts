/**
 * User Validation Middleware - Express-validator rules for user operations
 * Provides validation chains for registration, login, and profile updates
 */

import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

import { PROFICIENCY_LEVELS, GENDER_OPTIONS, SUPPORTED_LANGUAGES, SUPPORTED_COUNTRIES } from '../../../shared/user.interface';
import { VALIDATION_RULES } from '../constants/validationConstants';

/**
 * Validation chain for user registration.
 * Validates username, email, password, names, bio, and profile options.
 */
export const validateRegistration = [
    body('username')
        .isLength({ min: VALIDATION_RULES.USERNAME.MIN_LENGTH, max: VALIDATION_RULES.USERNAME.MAX_LENGTH })
        .withMessage(`Username must be between ${VALIDATION_RULES.USERNAME.MIN_LENGTH} and ${VALIDATION_RULES.USERNAME.MAX_LENGTH} characters`)
        .matches(VALIDATION_RULES.USERNAME.PATTERN)
        .withMessage('Username can only contain letters, numbers, and underscores'),
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password')
        .isLength({ min: VALIDATION_RULES.PASSWORD.MIN_LENGTH, max: VALIDATION_RULES.PASSWORD.MAX_LENGTH })
        .withMessage(`Password must be between ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} and ${VALIDATION_RULES.PASSWORD.MAX_LENGTH} characters`),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('familyName').notEmpty().withMessage('Family name is required'),
    body('bio')
        .optional()
        .isLength({ max: VALIDATION_RULES.BIO.MAX_LENGTH })
        .withMessage(`Bio cannot exceed ${VALIDATION_RULES.BIO.MAX_LENGTH} characters`),
    body('profileOptions.nativeLanguage')
        .isIn(SUPPORTED_LANGUAGES)
        .withMessage('Please select a valid native language'),
    body('profileOptions.practicingLanguage.language')
        .isIn(SUPPORTED_LANGUAGES)
        .withMessage('Please select a valid language to practice'),
    body('profileOptions.practicingLanguage.proficiency')
        .isIn(PROFICIENCY_LEVELS)
        .withMessage('Please select a valid proficiency level'),
    body('profileOptions.country').notEmpty().withMessage('Country is required'),
    body('profileOptions.city').notEmpty().withMessage('City is required'),
    body('profileOptions.gender')
        .isIn(GENDER_OPTIONS)
        .withMessage('Please select a valid gender option'),
    body('profileOptions.age')
        .isInt({ min: VALIDATION_RULES.AGE.MIN, max: VALIDATION_RULES.AGE.MAX })
        .withMessage(`Age must be between ${VALIDATION_RULES.AGE.MIN} and ${VALIDATION_RULES.AGE.MAX}`),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export const validateLogin = [
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').exists().withMessage('Password is required'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

/**
 * Middleware to validate the request body for user profile updates.
 * All fields are optional but must pass validation if provided.
 */
export const validateUpdate = [
    // All fields are optional but must pass their validation if present
    body('username').optional().notEmpty().withMessage('Username is required'),
    body('email').optional().isEmail().withMessage('Please include a valid email'),
    body('firstName').optional().notEmpty().withMessage('First name is required'),
    body('familyName').optional().notEmpty().withMessage('Family name is required'),
    body('bio').optional().isString().withMessage('Bio must be a string'),
    body('profileOptions.nativeLanguage').optional().notEmpty().withMessage('Native language is required'),
    body('profileOptions.practicingLanguage.language').optional().notEmpty().withMessage('Practicing language is required'),
    body('profileOptions.practicingLanguage.proficiency').optional().notEmpty().withMessage('Proficiency is required'),
    body('profileOptions.country').optional().notEmpty().withMessage('Country is required'),
    body('profileOptions.city').optional().notEmpty().withMessage('City is required'),
    body('profileOptions.gender').optional().notEmpty().withMessage('Gender is required'),
    body('profileOptions.age').optional().isNumeric().withMessage('Age must be a number'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];