import { Link } from 'react-router-dom';

interface NavbarProps {
  setIsAuthenticated: (value: boolean) => void;
}
const Navbar = ({ setIsAuthenticated }: NavbarProps) => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
    };

    return (
        <nav className='sticky top-0 z-50 bg-blue-50/90 backdrop-blur-sm border-b border-blue-200/50 shadow-sm p-4'>
            <div className='mx-auto flex justify-between items-center'>
                <Link to="/" className='text-xl font-semibold hover:underline text-gray-900'>
                    Trippit
                </Link> 
                <button onClick={handleLogout} className="btn-secondary">
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar