"use strict";
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
const passport_jwt_1 = require("passport-jwt");
const User_1 = __importDefault(require("../models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * Configures Passport.js with the JWT strategy.
 * This strategy extracts the JWT from the Authorization header (Bearer token)
 * and verifies it using the secret key.
 * If valid, it finds the user in the database and attaches them to req.user.
 */
const configurePassport = (passport) => {
    const secret = process.env.JWT_SECRET;
    // console.log('Passport JWT Secret:', secret);
    // Options for the JWT strategy
    const opts = {
        // How to extract the JWT from the request
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        // The secret key used to sign the JWTs (must match the one used for generation)
        secretOrKey: process.env.JWT_SECRET, // '!' asserts that JWT_SECRET will be defined at runtime
    };
    // Use the JWT strategy
    passport.use(new passport_jwt_1.Strategy(opts, (jwt_payload, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // The jwt_payload contains the data you signed into the token (e.g., user ID)
            // Find the user in your database using the ID from the payload
            const user = yield User_1.default.findById(jwt_payload.id);
            if (user) {
                // If the user is found, authentication is successful.
                // 'done' is a Passport callback: done(error, user, info)
                // Passing null for error and the user object means success.
                return done(null, user);
            }
            else {
                // User not found (e.g., user deleted but token still valid)
                return done(null, false);
            }
        }
        catch (error) {
            // Handle any errors that occur during the database lookup
            console.error('Passport JWT Error during user lookup:', error);
            return done(error, false); // Pass the error to Passport
        }
    })));
};
exports.default = configurePassport;
