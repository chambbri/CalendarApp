import axios from "axios";

export interface LoginUserI {
    email: string,
    password: string
}
export const loginUser = async (email: string, password: string) => {
    try {
        const userData = { email, password }
        const response = await axios.post('http://localhost:8000/api/auth/login', userData)
        console.log("User logged in", response.data);
        return response.data
    } catch (error) {
        console.error('Error: ', error)
        throw error;
    }
};