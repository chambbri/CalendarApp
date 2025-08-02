import * as z from "zod";
import pool from '../db/db';

export const validateUserSignUp = (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
) => {
    // check for valid email format and password has length of > 7, a capital letter, a lowercase letter,
    // a number, and a special character. Check that first and last names are not just spaces
    const userSchema = z.object({
        firstName: z.string().trim().min(1, "First name is required"),
        lastName: z.string().trim().min(1, "Last name is required"),
        email: z.email().toLowerCase(),
        password: z.string().min(8).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[!@#$%^&*]/)
    });
    return userSchema.parse({ firstName, lastName, email, password });
};

export const validateUserLogin = (
    email: string,
    password: string,
) => {
    // check for valid email format and password has length of > 7, a capital letter, a lowercase letter,
    // a number, and a special character
    const userSchema = z.object({
        email: z.email().toLowerCase(),
        password: z.string().min(1, "Enter password")
    });
    return userSchema.parse({ email, password });
};

export const checkExistingUser = async (
    email: string
) => {
    const existingUserQuery = `SELECT id FROM users WHERE email = $1`;
    const existingUser = await pool.query(existingUserQuery, [email]);
    if (existingUser.rows.length > 0) {
        throw new Error('Email already exists');
    }
};