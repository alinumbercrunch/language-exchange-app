"use strict";
// backend/src/models/User.ts
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt = __importStar(require("bcrypt"));
const country_list_1 = require("country-list");
const iso_639_1_1 = __importDefault(require("iso-639-1"));
const supportedCountries = (0, country_list_1.getNames)();
const supportedLanguages = iso_639_1_1.default.getAllNames();
/**
 * Mongoose schema for the User model.
 */
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    passwordHash: {
        type: String,
        required: [true, 'Password is required'],
        select: false,
        // The password is now hashed via the pre-save hook below, so no setter is needed here.
    },
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
    },
    familyName: {
        type: String,
        required: [true, 'Family name is required'],
        trim: true,
    },
    profilePictureUrl: {
        type: String,
        default: 'default_profile.png',
    },
    bio: {
        type: String,
        maxLength: [250, 'Bio cannot exceed 250 characters'],
    },
    registrationDate: {
        type: Date,
        default: Date.now,
    },
    lastLoginDate: {
        type: Date,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    profileOptions: {
        nativeLanguage: {
            type: String,
            required: [true, 'Native language is required'],
            enum: supportedLanguages,
        },
        practicingLanguage: {
            language: {
                type: String,
                required: [true, 'Practicing language is required'],
                enum: supportedLanguages,
            },
            proficiency: {
                type: String,
                enum: ['Beginner', 'Intermediate', 'Advanced'],
                required: [true, 'Proficiency level is required'],
            }
        },
        country: {
            type: String,
            required: [true, 'Country is required'],
            enum: supportedCountries,
        },
        city: {
            type: String,
            required: [true, 'City is required'],
            trim: true,
        },
        gender: {
            type: String,
            required: [true, 'Gender is required'],
            enum: ['Male', 'Female', 'Non-binary', 'Prefer not to say'],
        },
        age: {
            type: Number,
            required: [true, 'Age is required'],
            min: [13, 'Age must be at least 13'],
            max: [120, 'Age cannot exceed 120'],
        }
    },
}, {
    timestamps: true,
    toJSON: {
        transform: function (ret) {
            const { passwordHash, _id } = ret, userObject = __rest(ret, ["passwordHash", "_id"]);
            const publicUser = Object.assign(Object.assign({}, userObject), { _id: _id.toString() });
            return publicUser;
        }
    }
});
// A standard, robust pre-save hook for password hashing
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('passwordHash')) {
            next();
            return;
        }
        const salt = yield bcrypt.genSalt(10);
        this.passwordHash = yield bcrypt.hash(this.passwordHash, salt);
        next();
    });
});
UserSchema.methods.matchPassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.compare(enteredPassword, this.passwordHash);
    });
};
const User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
