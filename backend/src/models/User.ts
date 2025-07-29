// backend/src/models/User.ts (UPDATED - Reflecting latest user.interface.ts changes)
import mongoose, { HydratedDocument , Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../../../shared/user.interface'; ;

// Define IUserDocument as a HydratedDocument of IUser
// This correctly gives it all properties of IUser AND Mongoose Document methods/properties. HydratedDocument is a utility type. It takes the IUser and returns a new type including Mongoose's Types with the one of IUser so the ID from Mongoose is used instead of the string ID from the interface.
export interface IUserDocument extends HydratedDocument<IUser> {
    passwordHash: string; 
    matchPassword(enteredPassword: string): Promise<boolean>; 
}
const UserSchema: Schema<IUserDocument> = new Schema({
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
        // Removed `default: 'default_profile.png'` here if you're not enforcing a default in the DB directly
        // The `profilePictureUrl?: string;` in the interface already implies it can be undefined or null.
        // If you want a default if the user doesn't provide one, keep the default in the schema.
        // Let's keep the default for now, as it's common to have a fallback image.
        default: 'default_profile.png',
        // No 'required: true' here, reflecting it being optional in the interface
    },
    bio: {
        type: String,
        required: [true, 'Bio is required'], // CHANGED: Now mandatory
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

UserSchema.pre<IUserDocument>('save', async function(next) {
    if (!this.isModified('passwordHash')) {
        return next();
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