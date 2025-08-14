// backend/src/config/db.ts

import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

/**
 * Establishes a connection to the MongoDB database using the URI from environment variables.
 * Exits the process if the connection fails.
 */

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables. Please check your .env file.');
        }

        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown database connection error';
        console.error(`Error connecting to MongoDB: ${errorMessage}`);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;