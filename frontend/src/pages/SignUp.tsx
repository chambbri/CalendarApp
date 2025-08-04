import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAccount, CreateUserI } from "../services/createAccountService";
import { loginUser } from "../services/loginService";

const SignUp = () => {
    // sign up parameters
    const [userData, setUserData] = useState<CreateUserI>({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
    });

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // create the account
            await createAccount(userData);
            // automatically log the user in
            const loginResponse = await loginUser(userData.email, userData.password);

            // establish token
            localStorage.setItem('token', loginResponse.data.result.token);
            localStorage.setItem('user', JSON.stringify(loginResponse.data.result.user));

            navigate('/');
        } catch (error) {
            console.error("Failed to create account", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    // button formatting
    const createAccountButton = `
        rounded-lg 
        pt-3 pb-3 pl-7 pr-7 
        border border-transparent 
        font-medium 
        bg-[#644444] 
        cursor-pointer 
        hover:border-white 
        transition duration-250`;

    return (
        <section className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col border-2 p-6 gap-y-4 shadow-sm shadow-black">
                <div className="flex gap-x-4">
                        <label htmlFor="firstname">First Name</label>
                        <input 
                            type="text" 
                            name="firstName" 
                            id="firstname" 
                            value={userData.firstName}
                            onChange={handleChange}
                            required 
                            className="rounded border"/>
                </div>
                <div className="flex gap-x-4">
                        <label htmlFor="lastname">Last Name</label>
                        <input 
                            type="text" 
                            name="lastName" 
                            id="lastname" 
                            value={userData.lastName}
                            onChange={handleChange}
                            required 
                            className="rounded border"/>
                </div>
                <div className="flex gap-x-4">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            value={userData.email}
                            onChange={handleChange}
                            required 
                            className="rounded border"/>
                </div>
                <div className="flex gap-x-4">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            value={userData.password}
                            onChange={handleChange}
                            required 
                            className="rounded border"/>
                </div>
                <button type="submit" className={createAccountButton}>Create Account</button>
            </form>
        </section>
    )
};

export default SignUp;