"use strict";
// backend/src/tests/test_user_creation.ts (assuming you moved it to backend/src/tests)
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var bcrypt = require("bcrypt");
var User_1 = require("../models/User");
var db_1 = require("../config/db");
function runUserCreationTest() {
    return __awaiter(this, void 0, void 0, function () {
        var plainPassword, saltRounds, hashedPassword, testUsername, testEmail, userData, newUser, savedUser, userJson, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, 5, 9]);
                    console.log('--- Starting User Creation Test ---');
                    console.log('Attempting to connect to MongoDB...');
                    return [4 /*yield*/, (0, db_1.default)()];
                case 1:
                    _a.sent();
                    console.log('MongoDB connected successfully!');
                    // --- Step 1: Prepare test user data ---
                    console.log('\n--- Preparing Test User Data ---');
                    plainPassword = 'mySecurePassword123';
                    console.log('Plain password for test user defined.');
                    saltRounds = 10;
                    console.log("Generating salt with ".concat(saltRounds, " rounds for hashing..."));
                    return [4 /*yield*/, bcrypt.hash(plainPassword, saltRounds)];
                case 2:
                    hashedPassword = _a.sent();
                    console.log('Password successfully hashed.');
                    testUsername = "testuser_".concat(Date.now());
                    testEmail = "test_".concat(Date.now(), "@example.com");
                    userData = {
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
                    newUser = new User_1.default(userData);
                    console.log('New User instance created successfully in memory.');
                    // console.log('User instance before save (raw Mongoose document):', newUser); // Uncomment for more detailed raw inspection
                    // --- Step 3: Save the user to the database ---
                    console.log('\n--- Saving User to Database ---');
                    console.log("Attempting to save user '".concat(newUser.username, "' to MongoDB..."));
                    return [4 /*yield*/, newUser.save()];
                case 3:
                    savedUser = _a.sent();
                    console.log('User saved successfully to DB!');
                    console.log('Saved User (Mongoose document instance retrieved after save):', savedUser);
                    // --- Step 4: Verify toJSON transform output ---
                    console.log('\n--- Verifying toJSON Transform Output ---');
                    console.log('Applying toJSON transform to the saved user document...');
                    userJson = savedUser.toJSON();
                    console.log('User data AFTER toJSON transform (this simulates API response):', userJson);
                    // --- Final Automated Checks ---
                    console.log('\n--- Automated Checks for API Response Format ---');
                    if (typeof userJson._id === 'string' && userJson._id.length > 0) {
                        console.log("\u2705 Check 1: '_id' is a string and not empty.");
                    }
                    else {
                        console.log("\u274C Check 1: '_id' is NOT a string or is empty. (Type: ".concat(typeof userJson._id, ", Value: ").concat(userJson._id, ")"));
                    }
                    if (!userJson.hasOwnProperty('passwordHash')) {
                        console.log('✅ Check 2: \'passwordHash\' is NOT present in toJSON output.');
                    }
                    else {
                        console.log('❌ Check 2: \'passwordHash\' IS present in toJSON output!');
                    }
                    if (userJson.username === testUsername) {
                        console.log("\u2705 Check 3: 'username' matches the created test username: ".concat(userJson.username));
                    }
                    else {
                        console.log("\u274C Check 3: 'username' mismatch. Expected '".concat(testUsername, "', Got '").concat(userJson.username, "'."));
                    }
                    if (typeof userJson.isActive === 'boolean') {
                        console.log("\u2705 Check 4: 'isActive' is a boolean: ".concat(userJson.isActive));
                    }
                    else {
                        console.log("\u274C Check 4: 'isActive' is NOT a boolean. (Type: ".concat(typeof userJson.isActive, ", Value: ").concat(userJson.isActive, ")"));
                    }
                    console.log('\n--- Test Results ---');
                    console.log('All checks complete.');
                    return [3 /*break*/, 9];
                case 4:
                    error_1 = _a.sent();
                    console.error('\n--- Test FAILED ---');
                    console.error('An error occurred during the test:');
                    console.error('Error Message:', error_1.message);
                    if (error_1.errors) {
                        console.error('Mongoose Validation Errors Details:', error_1.errors);
                    }
                    return [3 /*break*/, 9];
                case 5:
                    console.log('\n--- Test Cleanup ---');
                    console.log('Disconnecting from MongoDB...');
                    if (!(mongoose_1.default.connection.readyState === 1)) return [3 /*break*/, 7];
                    return [4 /*yield*/, mongoose_1.default.disconnect()];
                case 6:
                    _a.sent();
                    console.log('MongoDB disconnected.');
                    return [3 /*break*/, 8];
                case 7:
                    console.log('MongoDB was not connected, no disconnect needed.');
                    _a.label = 8;
                case 8:
                    console.log('--- User Creation Test Finished ---');
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    });
}
// Run the test function
runUserCreationTest();
