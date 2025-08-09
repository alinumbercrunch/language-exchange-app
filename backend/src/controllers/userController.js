"use strict";
// backend/src/controllers/userController.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.deleteUserProfile = exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const appError_1 = __importDefault(require("../../../shared/appError"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
// Helper function to generate a JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};
exports.registerUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Extract data from request body
    const { username, email, password, firstName, familyName, bio, profileOptions } = req.body;
    const { nativeLanguage, practicingLanguage, country, city, gender, age } = profileOptions;
    const { language, proficiency } = practicingLanguage;
    // 2. Check if user already exists
    const userExists = yield User_1.default.findOne({ email });
    if (userExists) {
        throw new appError_1.default('User with that email already exists.', 400);
    }
    const usernameExists = yield User_1.default.findOne({ username });
    if (usernameExists) {
        throw new appError_1.default('Username is already taken.', 400);
    }
    // 3. Create new user instance (password will be hashed by the pre-save hook)
    const newUser = new User_1.default({
        username,
        email,
        passwordHash: password,
        firstName,
        familyName,
        bio: bio || '',
        isActive: true,
        registrationDate: new Date(),
        profileOptions: {
            nativeLanguage,
            practicingLanguage: {
                language,
                proficiency
            },
            country,
            city,
            gender,
            age,
        },
    });
    // 4. Save the user to the database. Errors here are caught by asyncHandler.
    const savedUser = yield newUser.save();
    // 5. Send success response (excluding passwordHash using toJSON)
    res.status(201).json({
        message: 'User registered successfully!',
        user: savedUser.toJSON(),
        token: generateToken(savedUser._id.toString()),
    });
}));
// @desc    Login as a user
// @route   POST /api/users/login
// @access  Public
// @route   POST /api/users/login
// @access  Public
exports.loginUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // 1. Find user by email
    const user = yield User_1.default.findOne({ email }).select('+passwordHash');
    if (!user) {
        throw new appError_1.default('Invalid credentials.', 401);
    }
    // 2. Compare passwords
    const isMatch = yield bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
        throw new appError_1.default('Invalid email or password.', 401);
    }
    // 3. Send success response (excluding passwordHash)
    res.status(200).json({
        message: 'Login successful!',
        user: user.toJSON(),
        token: generateToken(user._id.toString()),
    });
}));
// @desc    Get authenticated user profile
// @route   GET /api/users/profile
// @access  Private (requires JWT token)
exports.getUserProfile = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const user = req.user.toJSON();
        res.status(200).json({
            message: 'User profile fetched successfully!',
            user: user
        });
    }
    else {
        throw new Error('Not authorized, user data not found after authentication.');
    }
}));
// @desc    Delete authenticated user's profile
// @route   DELETE /api/users/profile
// @access  Private
exports.deleteUserProfile = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new appError_1.default('Authentication error, user not found.', 401);
    }
    const user = yield User_1.default.findByIdAndDelete(req.user._id);
    if (!user) {
        throw new appError_1.default('User not found.', 404);
    }
    res.status(200).json({
        message: 'User profile deleted successfully.'
    });
}));
/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
exports.updateUserProfile = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new appError_1.default('Authentication error, user not found.', 401);
    }
    const user = yield User_1.default.findById(req.user.id);
    if (!user) {
        throw new appError_1.default('User not found.', 404);
    }
    // Update user fields if they are present in the request body
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.firstName = req.body.firstName || user.firstName;
    user.familyName = req.body.familyName || user.familyName;
    user.bio = req.body.bio || user.bio;
    // Save the updated user document
    const updatedUser = yield user.save();
    // Respond with the updated user data
    res.status(200).json({
        message: 'User profile updated successfully!',
        user: updatedUser.toJSON()
    });
}));
