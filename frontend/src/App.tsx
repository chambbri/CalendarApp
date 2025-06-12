import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from "./pages/Home"
import EventForm from './pages/EventForm'
import EditEvent from './pages/EditEvent'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eventform" element={<EventForm mode="create" />} />
        <Route path="/editevent/:id" element={<EditEvent />} />
      </Routes>
    </Router>
  )
}

export default App
