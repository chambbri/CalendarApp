import pool from '../db/db';
import { IUser, IPublicUser } from "../types/user";
import { hashPassword, comparePassword } from "./encryptService";
import { validateUserSignUp, validateUserLogin, checkExistingUser } from "./userValidationService";
import { generateToken } from './authService';


export const createUser = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
): Promise<IUser> => {
    try {
        // check that user input for signup is valid
        const validatedData = validateUserSignUp(firstName, lastName, email, password)

        // Check for email already existing in database
        await checkExistingUser(validatedData.email);
        
        // Hash password and add user into table
        const passwordHash = await hashPassword(validatedData.password);
        const query = `
            INSERT INTO users (first_name, last_name, email, password_hash)
            VALUES ($1, $2, $3, $4)
            RETURNING id, first_name as "firstName", last_name as "lastName", email, created_at as "createdAt"
        `;
        const values = [validatedData.firstName, validatedData.lastName, validatedData.email, passwordHash]
        const result = await pool.query(query, values);

        return result.rows[0];
    } catch (error) {
        console.error('Error creating user: ', error);
        throw(error);
    }
};

export const loginUser = async (
    email: string,
    password: string
): Promise<{ token: string, user: IPublicUser }> => {
    try {
        // check that user login info is valid
        const validatedData = validateUserLogin(email, password);

        // retrieve user data to verify email and password
        const userInfo = await findUserByEmail(validatedData.email);
        if (!userInfo) {
            throw new Error('Invalid email or password');
        }

        const passwordMatch = await comparePassword(password, userInfo.passwordHash);
        if (passwordMatch !== true) {
            throw new Error('Invalid email or password');
        };
        
        // Generate JWT token
        const token = generateToken(userInfo.id);

        // Return token and safe user info
        const user: IPublicUser = {
            id: userInfo.id,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName
        };

        return { token, user };
    } catch (error) {
        console.error('Error during login: ', error);
        throw(error);
    }
};

const findUserByEmail = async (
    email: string
): Promise<IUser | null> => {
    try {
        // search for user in DB and return null if nothing found else the result
        const userQuery = `SELECT * FROM users WHERE email = $1`;
        const result = await pool.query(userQuery, [email]);
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error finding user: ', error);
        throw(error);
    }
};