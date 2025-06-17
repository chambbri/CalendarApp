import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='sticky top-0 z-50 border-white shadow-md shadow-black p-4'>
            <div className='mx-auto flex items-left'>
                <Link to="/" className='text-xl font-semibold hover:underline'>
                    InviteMe
                </Link> 
            </div>
        </nav>
    );
};

export default Navbar