import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from "./pages/Home"
import EventForm from './pages/EventForm'
import EditEvent from './pages/EditEvent'
import ViewEvent from './pages/ViewEvent'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eventform" element={<EventForm mode="create" />} />
        <Route path="/editevent/:id" element={<EditEvent />} />
        <Route path="/events/:id" element={<ViewEvent />} />
      </Routes>
    </Router>
  )
}

export default App
