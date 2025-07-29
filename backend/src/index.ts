// backend/src/index.ts

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import cors from 'cors'; 

dotenv.config();

const app = express();

// --- Add this line to use the CORS middleware ---
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});