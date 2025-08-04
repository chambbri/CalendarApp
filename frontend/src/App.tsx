import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import EventForm from './pages/EventForm';
import EditEvent from './pages/EditEvent';
import ViewEvent from './pages/ViewEvent';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Navbar from './components/Navbar';

const App = () => {
  const token = localStorage.getItem('token');

  // If not authenticated, show auth flow
  if (!token) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/signup" replace />} />
        </Routes>
      </Router>
    );
  }
  
  // If authenticated, show main app
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eventform" element={<EventForm mode="create" />} />
        <Route path="/editevent/:id" element={<EditEvent />} />
        <Route path="/events/:id" element={<ViewEvent />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App
