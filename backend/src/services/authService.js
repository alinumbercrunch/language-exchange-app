"use strict";
// backend/src/services/authService.ts
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const appError_1 = __importDefault(require("../../../shared/appError"));
class AuthService {
    /**
     * Generate JWT token for user
     */
    static generateToken(userId) {
        if (!process.env.JWT_SECRET) {
            throw new appError_1.default('JWT secret not configured', 500);
        }
        return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
    }
    /**
     * Verify JWT token
     */
    static verifyToken(token) {
        if (!process.env.JWT_SECRET) {
            throw new appError_1.default('JWT secret not configured', 500);
        }
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        }
        catch (error) {
            throw new appError_1.default('Invalid token', 401);
        }
    }
    /**
     * Extract token from Authorization header
     */
    static extractTokenFromHeader(authHeader) {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new appError_1.default('No token provided', 401);
        }
        return authHeader.substring(7); // Remove 'Bearer ' prefix
    }
}
exports.AuthService = AuthService;
