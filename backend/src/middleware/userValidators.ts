import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateRegistration = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('familyName').notEmpty().withMessage('Family name is required'),
    body('bio').isString().withMessage('Bio must be a string'),
    body('profileOptions.nativeLanguage').notEmpty().withMessage('Native language is required'),
    body('profileOptions.practicingLanguage.language').notEmpty().withMessage('Practicing language is required'),
    body('profileOptions.practicingLanguage.proficiency').notEmpty().withMessage('Proficiency is required'),
    body('profileOptions.country').notEmpty().withMessage('Country is required'),
    body('profileOptions.city').notEmpty().withMessage('City is required'),
    body('profileOptions.gender').notEmpty().withMessage('Gender is required'),
    body('profileOptions.age').isNumeric().withMessage('Age must be a number'),
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