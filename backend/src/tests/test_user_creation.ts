// backend/src/tests/test_user_creation.ts (assuming you moved it to backend/src/tests)

import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import User from '../models/User';      
import connectDB from '../config/db';   


async function runUserCreationTest() {
    try {
        console.log('--- Starting User Creation Test ---');
        console.log('Attempting to connect to MongoDB...');
        await connectDB();
        console.log('MongoDB connected successfully!');

        // --- Step 1: Prepare test user data ---
        console.log('\n--- Preparing Test User Data ---');
        const plainPassword = 'mySecurePassword123';
        console.log('Plain password for test user defined.');

        const saltRounds = 10;
        console.log(`Generating salt with ${saltRounds} rounds for hashing...`);
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
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
        const newUser = new User(userData);
        console.log('New User instance created successfully in memory.');
        // console.log('User instance before save (raw Mongoose document):', newUser); // Uncomment for more detailed raw inspection

        // --- Step 3: Save the user to the database ---
        console.log('\n--- Saving User to Database ---');
        console.log(`Attempting to save user '${newUser.username}' to MongoDB...`);
        const savedUser = await newUser.save();
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
        } else {
            console.log(`❌ Check 1: '_id' is NOT a string or is empty. (Type: ${typeof userJson._id}, Value: ${userJson._id})`);
        }

        if (!userJson.hasOwnProperty('passwordHash')) {
            console.log('✅ Check 2: \'passwordHash\' is NOT present in toJSON output.');
        } else {
            console.log('❌ Check 2: \'passwordHash\' IS present in toJSON output!');
        }

        if (userJson.username === testUsername) {
            console.log(`✅ Check 3: 'username' matches the created test username: ${userJson.username}`);
        } else {
            console.log(`❌ Check 3: 'username' mismatch. Expected '${testUsername}', Got '${userJson.username}'.`);
        }

        if (typeof userJson.isActive === 'boolean') {
            console.log(`✅ Check 4: 'isActive' is a boolean: ${userJson.isActive}`);
        } else {
            console.log(`❌ Check 4: 'isActive' is NOT a boolean. (Type: ${typeof userJson.isActive}, Value: ${userJson.isActive})`);
        }

        console.log('\n--- Test Results ---');
        console.log('All checks complete.');

    } catch (error: unknown) {
        console.error('\n--- Test FAILED ---');
        console.error('An error occurred during the test:');
        const errorMessage = error instanceof Error ? error.message : 'Unknown test error';
        console.error('Error Message:', errorMessage);
        if (error instanceof Error && 'errors' in error) {
            console.error('Mongoose Validation Errors Details:', error.errors);
        }
    } finally {
        console.log('\n--- Test Cleanup ---');
        console.log('Disconnecting from MongoDB...');
        if (mongoose.connection.readyState === 1) {
            await mongoose.disconnect();
            console.log('MongoDB disconnected.');
        } else {
            console.log('MongoDB was not connected, no disconnect needed.');
        }
        console.log('--- User Creation Test Finished ---');
    }
}

// Run the test function
runUserCreationTest();