import mongoose, { HydratedDocument, Schema } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IUser } from '../../../shared/user.interface';
import { IUserDocument } from '../types/declarations';

/**
 * Mongoose schema for the User model.
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
        set: (plainPassword: string) => { // <--- ADD THIS SETTER
            if (!plainPassword) return plainPassword;
            const salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(plainPassword, salt);
        },
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
        required: [true, 'Bio is required'],
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
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc: IUserDocument, ret: mongoose.FlatRecord<IUserDocument>): IUser {
            // 1. Destructure and omit sensitive fields
            const { passwordHash, _id, ...userObject } = ret;

            // 2. Reconstruct the object for the public API
            const publicUser: IUser = {
                ...userObject, // Spreads all properties from 'ret' except 'passwordHash' and '_id'
                _id: _id.toString(), // Convert ObjectId to string
            };

            return publicUser;
        }
    }
});

// Corrected and simpler pre-save hook
UserSchema.pre('save', async function (next) {
    const user = this as IUserDocument & { _plainPassword?: string };

    // Only hash the password if a plain password was provided (via the virtual setter)
    // and the document is new, or if the plain password was modified.
    // We check `user._plainPassword` because that's what the virtual setter populates.
    if (!user._plainPassword) {
        return next(); // No plain password provided, nothing to hash.
    }

    // If a plain password exists, hash it
    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(user._plainPassword, salt);
    user._plainPassword = undefined; // Clear the temporary plain password after hashing

    next();
});

UserSchema.methods.matchPassword = async function(enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.passwordHash);
};

const User = mongoose.model<IUserDocument>('User', UserSchema);

export default User;