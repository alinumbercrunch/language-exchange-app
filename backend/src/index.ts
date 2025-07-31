// backend/src/index.ts

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import cors from 'cors'; 
import passport from 'passport'; // Import the passport library
import configurePassport from './config/passport';

dotenv.config();
connectDB();

const app = express();

// --- Add this line to use the CORS middleware ---
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.use(passport.initialize());
// Configure Passport with your JWT strategy (pass the passport instance)
configurePassport(passport);


app.get('/', (req, res) => {
    res.send('API is running...');
});

import errorHandler from './middleware/errorHandler';

app.use('/api/users', userRoutes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});