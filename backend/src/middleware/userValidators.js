"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdate = exports.validateLogin = exports.validateRegistration = void 0;
const express_validator_1 = require("express-validator");
exports.validateRegistration = [
    (0, express_validator_1.body)('username').notEmpty().withMessage('Username is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Please include a valid email'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    (0, express_validator_1.body)('firstName').notEmpty().withMessage('First name is required'),
    (0, express_validator_1.body)('familyName').notEmpty().withMessage('Family name is required'),
    (0, express_validator_1.body)('bio').isString().withMessage('Bio must be a string'),
    (0, express_validator_1.body)('profileOptions.nativeLanguage').notEmpty().withMessage('Native language is required'),
    (0, express_validator_1.body)('profileOptions.practicingLanguage.language').notEmpty().withMessage('Practicing language is required'),
    (0, express_validator_1.body)('profileOptions.practicingLanguage.proficiency').notEmpty().withMessage('Proficiency is required'),
    (0, express_validator_1.body)('profileOptions.country').notEmpty().withMessage('Country is required'),
    (0, express_validator_1.body)('profileOptions.city').notEmpty().withMessage('City is required'),
    (0, express_validator_1.body)('profileOptions.gender').notEmpty().withMessage('Gender is required'),
    (0, express_validator_1.body)('profileOptions.age').isNumeric().withMessage('Age must be a number'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
exports.validateLogin = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Please include a valid email'),
    (0, express_validator_1.body)('password').exists().withMessage('Password is required'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
/**
 * Middleware to validate the request body for user profile updates.
 */
exports.validateUpdate = [
    // All fields are optional but must pass their validation if present
    (0, express_validator_1.body)('username').optional().notEmpty().withMessage('Username is required'),
    (0, express_validator_1.body)('email').optional().isEmail().withMessage('Please include a valid email'),
    (0, express_validator_1.body)('firstName').optional().notEmpty().withMessage('First name is required'),
    (0, express_validator_1.body)('familyName').optional().notEmpty().withMessage('Family name is required'),
    (0, express_validator_1.body)('bio').optional().isString().withMessage('Bio must be a string'),
    (0, express_validator_1.body)('profileOptions.nativeLanguage').optional().notEmpty().withMessage('Native language is required'),
    (0, express_validator_1.body)('profileOptions.practicingLanguage.language').optional().notEmpty().withMessage('Practicing language is required'),
    (0, express_validator_1.body)('profileOptions.practicingLanguage.proficiency').optional().notEmpty().withMessage('Proficiency is required'),
    (0, express_validator_1.body)('profileOptions.country').optional().notEmpty().withMessage('Country is required'),
    (0, express_validator_1.body)('profileOptions.city').optional().notEmpty().withMessage('City is required'),
    (0, express_validator_1.body)('profileOptions.gender').optional().notEmpty().withMessage('Gender is required'),
    (0, express_validator_1.body)('profileOptions.age').optional().isNumeric().withMessage('Age must be a number'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
