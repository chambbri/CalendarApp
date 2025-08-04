import axios from "axios";

export interface CreateUserI {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export const createAccount = async (userData: CreateUserI) => {
    try {
        const response = await axios.post('http://localhost:8000/api/auth/register', userData)
        console.log("User created", response.data);
        return response.data
    } catch (error) {
        console.error('Error: ', error)
        throw error;
    }
};