import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Social Event Creation App</h1>
            <Link to="/createevent">
                <button>Create New Event</button>
            </Link>
        </div>
    );
};

export default Home;