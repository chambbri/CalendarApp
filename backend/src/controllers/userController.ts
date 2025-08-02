import { ZodError } from 'zod';
import { Request, Response } from 'express';
import { createUser, loginUser } from '../services/userService';

export const createUserHandler = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const user = await createUser(firstName, lastName, email, password);
        res.status(201).json({ status: 'ok', user });
    } catch (error: unknown) {
        // validation error (incorrect email format, password strength, or blank first name/last name)
        if (error instanceof ZodError) {
            res.status(400).json({ 
                error: 'Validation failed', 
                details: error.issues
            });
        }
        if (error instanceof Error) {
            // email found in DB, user already exists
            if (error.message === 'Email already exists') {
                res.status(409).json({ error: 'Email already exists' });
            }
            // Default to 500 for unexpected errors
            res.status(500).json({ error: 'Internal server error' });
            }
        }
};


export const loginUserHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await loginUser(email, password);
        res.status(200).json({ status: 'ok', token, user });
    } catch (error: unknown) {
        // invalid format for email or password
        if (error instanceof ZodError) {
            res.status(400).json({ 
                error: 'Validation failed', 
                details: error.issues
            });
        }

        if (error instanceof Error) {
            // invalid credentials during login
            if (error.message === 'Invalid email or password') {
                res.status(401).json({ error: 'Invalid credentials' });
            }
            // Default to 500 for unexpected errors
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};