"use strict";
// backend/src/tests/test_user_creation.ts (assuming you moved it to backend/src/tests)
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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt = __importStar(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const db_1 = __importDefault(require("../config/db"));
function runUserCreationTest() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('--- Starting User Creation Test ---');
            console.log('Attempting to connect to MongoDB...');
            yield (0, db_1.default)();
            console.log('MongoDB connected successfully!');
            // --- Step 1: Prepare test user data ---
            console.log('\n--- Preparing Test User Data ---');
            const plainPassword = 'mySecurePassword123';
            console.log('Plain password for test user defined.');
            const saltRounds = 10;
            console.log(`Generating salt with ${saltRounds} rounds for hashing...`);
            const hashedPassword = yield bcrypt.hash(plainPassword, saltRounds);
            console.log('Password successfully hashed.');
            const testUsername = `testuser_${Date.now()}`;
            const testEmail = `test_${Date.now()}@example.com`;
            const userData = {
                username: testUsername,
                email: testEmail,
                passwordHash: hashedPassword,
                firstName: 'Test',
                familyName: 'User',
                bio: 'This is a test account created to verify model functionality and `toJSON` transform.',
                isActive: true,
                registrationDate: new Date(),
            };
            console.log('Test user data prepared (password is hashed, not plain).');
            // Optional: console.log('Prepared user data:', userData); // Be careful not to log sensitive data in production
            // --- Step 2: Create a new User instance ---
            console.log('\n--- Creating User Instance in Memory ---');
            console.log('Instantiating Mongoose User model with prepared data...');
            const newUser = new User_1.default(userData);
            console.log('New User instance created successfully in memory.');
            // console.log('User instance before save (raw Mongoose document):', newUser); // Uncomment for more detailed raw inspection
            // --- Step 3: Save the user to the database ---
            console.log('\n--- Saving User to Database ---');
            console.log(`Attempting to save user '${newUser.username}' to MongoDB...`);
            const savedUser = yield newUser.save();
            console.log('User saved successfully to DB!');
            console.log('Saved User (Mongoose document instance retrieved after save):', savedUser);
            // --- Step 4: Verify toJSON transform output ---
            console.log('\n--- Verifying toJSON Transform Output ---');
            console.log('Applying toJSON transform to the saved user document...');
            const userJson = savedUser.toJSON();
            console.log('User data AFTER toJSON transform (this simulates API response):', userJson);
            // --- Final Automated Checks ---
            console.log('\n--- Automated Checks for API Response Format ---');
            if (typeof userJson._id === 'string' && userJson._id.length > 0) {
                console.log(`✅ Check 1: '_id' is a string and not empty.`);
            }
            else {
                console.log(`❌ Check 1: '_id' is NOT a string or is empty. (Type: ${typeof userJson._id}, Value: ${userJson._id})`);
            }
            if (!userJson.hasOwnProperty('passwordHash')) {
                console.log('✅ Check 2: \'passwordHash\' is NOT present in toJSON output.');
            }
            else {
                console.log('❌ Check 2: \'passwordHash\' IS present in toJSON output!');
            }
            if (userJson.username === testUsername) {
                console.log(`✅ Check 3: 'username' matches the created test username: ${userJson.username}`);
            }
            else {
                console.log(`❌ Check 3: 'username' mismatch. Expected '${testUsername}', Got '${userJson.username}'.`);
            }
            if (typeof userJson.isActive === 'boolean') {
                console.log(`✅ Check 4: 'isActive' is a boolean: ${userJson.isActive}`);
            }
            else {
                console.log(`❌ Check 4: 'isActive' is NOT a boolean. (Type: ${typeof userJson.isActive}, Value: ${userJson.isActive})`);
            }
            console.log('\n--- Test Results ---');
            console.log('All checks complete.');
        }
        catch (error) {
            console.error('\n--- Test FAILED ---');
            console.error('An error occurred during the test:');
            console.error('Error Message:', error.message);
            if (error.errors) {
                console.error('Mongoose Validation Errors Details:', error.errors);
            }
        }
        finally {
            console.log('\n--- Test Cleanup ---');
            console.log('Disconnecting from MongoDB...');
            if (mongoose_1.default.connection.readyState === 1) {
                yield mongoose_1.default.disconnect();
                console.log('MongoDB disconnected.');
            }
            else {
                console.log('MongoDB was not connected, no disconnect needed.');
            }
            console.log('--- User Creation Test Finished ---');
        }
    });
}
// Run the test function
runUserCreationTest();
