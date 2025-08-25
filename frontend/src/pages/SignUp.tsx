import { useState } from "react";
import { Link } from "react-router-dom";
import { createAccount, CreateUserI } from "../services/createAccountService";
import { loginUser } from "../services/loginService";

// for automatically loggin a user in after they have successfully signed up
interface SignUpProps {
  setIsAuthenticated: (value: boolean) => void;
}

const SignUp = ({ setIsAuthenticated }: SignUpProps) => {
    // sign up parameters
    const [userData, setUserData] = useState<CreateUserI>({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
    });


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // create the account
            await createAccount(userData);
            // automatically log the user in
            const loginResponse = await loginUser(userData.email, userData.password);

            // establish token
            localStorage.setItem('token', loginResponse.token);
            localStorage.setItem('user', JSON.stringify(loginResponse.user));

            setIsAuthenticated(true);
        } catch (error) {
            console.error("Failed to create account", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Trippit</h1>
                    <p className="text-gray-600">Create your account to start planning events</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/20">
                    <div className="space-y-6">
                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                                    First Name
                                </label>
                                <input 
                                    type="text" 
                                    name="firstName" 
                                    id="firstname" 
                                    value={userData.firstName}
                                    onChange={handleChange}
                                    required 
                                    placeholder="John"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                                    Last Name
                                </label>
                                <input 
                                    type="text" 
                                    name="lastName" 
                                    id="lastname" 
                                    value={userData.lastName}
                                    onChange={handleChange}
                                    required 
                                    placeholder="Doe"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                value={userData.email}
                                onChange={handleChange}
                                required 
                                placeholder="john@example.com"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                value={userData.password}
                                onChange={handleChange}
                                required 
                                placeholder="Create a strong password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            className="w-full btn-primary py-3 text-lg font-medium"
                        >
                            Create Account
                        </button>
                    </div>

                    {/* Footer Links */}
                    <div className="mt-6 text-center space-y-2">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default SignUp;