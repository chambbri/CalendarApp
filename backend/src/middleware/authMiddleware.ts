import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/authService';

// Typescript definition so Express request objects can include userID
declare global {
    namespace Express {
        interface Request {
            userId?: number;
        }
    }
};


export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // extract token from request

    if (!token) {
        res.status(401).json({ error: 'Access token required' });
        return;
    }

    try {
        const decoded = verifyToken(token);
        req.userId = decoded.userId; // Add userId to request
        next(); // continue to route handler
    } catch (error) {
        res.status(403).json({ error: 'Invalid or expired token' });
        return;
    }
};