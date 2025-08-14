/**
 * User Model - Mongoose schema and model for user data
 * Defines user document structure, validation, and database operations
 */

import mongoose, { Schema } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IUser } from '../../../shared/user.interface';
import { IUserDocument } from '../types/declarations';
import { getNames as getCountryNames } from 'country-list';
import iso6391 from 'iso-639-1';

// Get supported countries and languages for validation
const supportedCountries = getCountryNames();
const supportedLanguages = iso6391.getAllNames();

/**
 * Mongoose schema definition for User documents with validation and indexing.
 */
const UserSchema = new Schema<IUserDocument>({
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
        transform: function (ret: mongoose.FlatRecord<IUserDocument>): IUser {
            const { passwordHash, _id, ...userObject } = ret;
            const publicUser: IUser = {
                ...userObject,
                _id: _id.toString(),
            };
            return publicUser;
        }
    }
});

// A standard, robust pre-save hook for password hashing
UserSchema.pre('save', async function (next) {
    if (!this.isModified('passwordHash')) {
        next();
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
});

UserSchema.methods.matchPassword = async function(enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.passwordHash);
};

const User = mongoose.model<IUserDocument>('User', UserSchema);

export default User;