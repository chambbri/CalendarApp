import jwt from 'jsonwebtoken';

// Generate JWT token for user
export const generateToken = (userId: number): string => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const payload = { userId };
    
    return jwt.sign(payload, secret, { expiresIn: '7d' });
};


// Verify JWT token and return payload
export const verifyToken = (token: string): { userId: number } => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    try {
        const decoded = jwt.verify(token, secret) as { userId: number };
        return decoded;
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw new Error('Invalid token');
        }
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error('Token expired');
        }
        throw new Error('Token verification failed');
    }
};
