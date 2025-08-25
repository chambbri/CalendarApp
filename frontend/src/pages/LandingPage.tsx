import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header/Navigation */}
            <header className="flex justify-between items-center px-6 py-4">
                <div className="text-2xl font-bold text-gray-900">
                    Trippit
                </div>
                <div className="flex gap-3">
                    <Link to="/login">
                        <button className="btn-secondary">
                            Login
                        </button>
                    </Link>
                    <Link to="/signup">
                        <button className="btn-primary">
                            Sign Up
                        </button>
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                        Plan and Customize Events That
                        <span className="text-blue-600"> Everyone </span>
                        Will Love
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Create, organize, and manage events effortlessly. Send invites, track RSVPs, and bring people together.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        <Link to="/signup">
                            <button className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                                Sign Up
                            </button>
                        </Link>
                        <Link to="/login">
                            <button className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
                                I Have an Account
                            </button>
                        </Link>
                    </div>

                    {/* Feature highlights */}
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <div className="text-4xl mb-4">🎉</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Planning</h3>
                            <p className="text-gray-600">Create events in minutes with our intuitive interface</p>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl mb-4">🏆</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Customizable Events</h3>
                            <p className="text-gray-600">Create channels for whatever your event requires</p>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl mb-4">📱</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Stay Organized</h3>
                            <p className="text-gray-600">Keep all your event details and guest lists in one place</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
};

export default LandingPage;

