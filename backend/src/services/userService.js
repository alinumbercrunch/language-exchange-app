"use strict";
// backend/src/services/userService.ts
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
exports.UserService = void 0;
const User_1 = __importDefault(require("../models/User"));
const appError_1 = __importDefault(require("../../../shared/appError"));
class UserService {
    /**
     * Check if user exists by email or username
     */
    static checkUserExists(email, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield User_1.default.findOne({
                $or: [{ email }, { username }]
            });
            if (existingUser) {
                if (existingUser.email === email) {
                    throw new appError_1.default('User with that email already exists.', 400);
                }
                if (existingUser.username === username) {
                    throw new appError_1.default('Username is already taken.', 400);
                }
            }
        });
    }
    /**
     * Create new user with validation
     */
    static createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check for existing users
            yield this.checkUserExists(userData.email, userData.username);
            // Create user instance
            const newUser = new User_1.default({
                username: userData.username,
                email: userData.email,
                passwordHash: userData.password, // Will be hashed by pre-save hook
                firstName: userData.firstName,
                familyName: userData.familyName,
                bio: userData.bio || '',
                isActive: true,
                registrationDate: new Date(),
                profileOptions: userData.profileOptions,
            });
            return yield newUser.save();
        });
    }
    /**
     * Authenticate user credentials
     */
    static authenticateUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ email }).select('+passwordHash');
            if (!user) {
                throw new appError_1.default('Invalid credentials.', 401);
            }
            const bcrypt = require('bcrypt');
            const isMatch = yield bcrypt.compare(password, user.passwordHash);
            if (!isMatch) {
                throw new appError_1.default('Invalid email or password.', 401);
            }
            return user;
        });
    }
    /**
     * Get user by ID (for protected routes)
     */
    static getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findById(userId);
            if (!user) {
                throw new appError_1.default('User not found.', 404);
            }
            return user;
        });
    }
    /**
     * Delete a user by ID
     */
    static deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield User_1.default.findByIdAndDelete(userId);
            if (!deletedUser) {
                throw new appError_1.default('User not found.', 404);
            }
        });
    }
    /**
     * Update user profile
     */
    static updateUser(userId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findById(userId);
            if (!user) {
                throw new appError_1.default('User not found.', 404);
            }
            // Update user fields if they are present in the update data
            if (updateData.username)
                user.username = updateData.username;
            if (updateData.email)
                user.email = updateData.email;
            if (updateData.firstName)
                user.firstName = updateData.firstName;
            if (updateData.familyName)
                user.familyName = updateData.familyName;
            if (updateData.bio !== undefined)
                user.bio = updateData.bio;
            if (updateData.profileOptions) {
                user.profileOptions = Object.assign(Object.assign({}, user.profileOptions), updateData.profileOptions);
            }
            // Save the updated user document
            const updatedUser = yield user.save();
            return updatedUser;
        });
    }
}
exports.UserService = UserService;
