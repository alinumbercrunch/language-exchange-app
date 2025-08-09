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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.deleteUserProfile = exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const userService_1 = require("../services/userService");
const authService_1 = require("../services/authService");
const responseHelpers_1 = require("../utils/responseHelpers");
const asyncHandler_1 = __importStar(require("../utils/asyncHandler"));
exports.registerUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    // Create user using service layer
    const savedUser = yield userService_1.UserService.createUser(userData);
    // Generate authentication token
    const token = authService_1.AuthService.generateToken(savedUser._id.toString());
    // Send success response
    return responseHelpers_1.ResponseHelper.authSuccess(res, 'User registered successfully!', savedUser.toJSON(), token, 201);
}));
// @desc    Login as a user
// @route   POST /api/users/login
// @access  Public
// @route   POST /api/users/login
// @access  Public
exports.loginUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Authenticate user using service layer
    const { user, token } = yield userService_1.UserService.authenticateUser(email, password);
    // Send success response
    return responseHelpers_1.ResponseHelper.authSuccess(res, 'Login successful!', user, token);
}));
// @desc    Get authenticated user profile
// @route   GET /api/users/profile
// @access  Private (requires JWT token)
exports.getUserProfile = (0, asyncHandler_1.authenticatedAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService_1.UserService.getUserById(req.user.id);
    return responseHelpers_1.ResponseHelper.success(res, 'User profile fetched successfully!', user.toJSON());
}));
// @desc    Delete authenticated user's profile
// @route   DELETE /api/users/profile
// @access  Private
exports.deleteUserProfile = (0, asyncHandler_1.authenticatedAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userService_1.UserService.deleteUser(req.user._id);
    return responseHelpers_1.ResponseHelper.success(res, 'User profile deleted successfully.');
}));
/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
exports.updateUserProfile = (0, asyncHandler_1.authenticatedAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield userService_1.UserService.updateUser(req.user.id, req.body);
    return responseHelpers_1.ResponseHelper.success(res, 'User profile updated successfully!', updatedUser.toJSON());
}));
