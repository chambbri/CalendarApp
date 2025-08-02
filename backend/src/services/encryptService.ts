import bcrypt from "bcryptjs";

export const hashPassword = async (
    password: string
): Promise<string> => {
    try {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    } catch (error) {
        console.error('Error hashing password: ', error);
        throw error;
    }
};

export const comparePassword = async (
    password: string,
    passwordHash: string
): Promise<boolean> => {
    try {
        return await bcrypt.compare(password, passwordHash);
    } catch (error) {
        console.error('Error comparing passwords: ', error);
        throw error;
    }
};