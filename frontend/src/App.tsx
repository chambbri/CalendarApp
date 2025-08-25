import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useState } from "react";
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
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  // If not authenticated, show auth flow
  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path="*" element={<Navigate to="/signup" replace />} />
        </Routes>
      </Router>
    );
  }
  
  // If authenticated, show main app
  return (
    <Router>
      <Navbar setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eventform" element={<EventForm mode="Create" />} />
        <Route path="/editevent/:id" element={<EditEvent />} />
        <Route path="/events/:id" element={<ViewEvent />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App
