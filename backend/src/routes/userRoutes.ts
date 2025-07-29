import { Router } from 'express';
import { registerUser } from '../controllers/userController'; // Import the controller function

const router = Router(); // Create a new Express router

// Define the registration route
// When a POST request comes to /api/users/register, it will be handled by registerUser
router.post('/register', registerUser);

export default router; // Export the router to be used in index.ts