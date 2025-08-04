import { Link } from "react-router-dom";

const LandingPage = () => {

      const button = `
        rounded-lg 
        pt-3 pb-3 pl-7 pr-7 
        border border-transparent 
        font-medium 
        bg-[#644444] 
        cursor-pointer 
        hover:border-white 
        transition duration-250`;
    return (
        <header className="flex flex-col items-center justify-center pt-16 pb-16">
            <div className="flex flex-row items-center gap-x-4">
                <h1 className="text-center text-3xl font-bold">InviteMe</h1>
                <Link to="/signup">
                    <button className={button}>
                        Sign Up
                    </button>
                </Link>
                <Link to="/login">
                    <button className={button}>
                        Login
                    </button>
                </Link>
            </div>
        </header>
    )
};

export default LandingPage;

