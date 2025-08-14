/**
 * Main Server Entry Point - Express.js application setup
 * Configures middleware, routes, database connection, and authentication
 */

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import cors from 'cors';
import passport from 'passport';
import configurePassport from './config/passport';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// --- Place the logging middleware here ---
app.use((req, res, next) => {
    console.warn(`[REQUEST] ${req.method} ${req.originalUrl}`);
    console.warn('Body:', req.body);
    next();
});

app.use(passport.initialize());
configurePassport(passport);

app.get('/', (req, res) => {
    res.send('API is running...');
});

import errorHandler from './middleware/errorHandler';

app.use('/api/users', userRoutes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
    console.warn(`Server running on port ${PORT}`);
});
