import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { PassportStatic } from 'passport';
import User from '../models/User'; 
import dotenv from 'dotenv';

dotenv.config();

/**
 * Configures Passport.js with the JWT strategy.
 * This strategy extracts the JWT from the Authorization header (Bearer token)
 * and verifies it using the secret key.
 * If valid, it finds the user in the database and attaches them to req.user.
 */
const configurePassport = (passport: PassportStatic) => {
    const secret = process.env.JWT_SECRET;
    // console.log('Passport JWT Secret:', secret);
    // Options for the JWT strategy
    const opts = {
        // How to extract the JWT from the request
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        // The secret key used to sign the JWTs (must match the one used for generation)
        secretOrKey: process.env.JWT_SECRET!, // '!' asserts that JWT_SECRET will be defined at runtime
    };

    // Use the JWT strategy
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
                // The jwt_payload contains the data you signed into the token (e.g., user ID)
                // Find the user in your database using the ID from the payload
                const user = await User.findById(jwt_payload.id)

                if (user) {
                    // If the user is found, authentication is successful.
                    // 'done' is a Passport callback: done(error, user, info)
                    // Passing null for error and the user object means success.
                    return done(null, user);
                } else {
                    // User not found (e.g., user deleted but token still valid)
                    return done(null, false);
                }
            } catch (error) {
                // Handle any errors that occur during the database lookup
                console.error('Passport JWT Error during user lookup:', error);
                return done(error, false); // Pass the error to Passport
            }
        })
    );
};

export default configurePassport;