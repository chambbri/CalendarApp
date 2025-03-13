import './App.css'
import MyCalendar from './components/Calendar'

const App: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>My Event Calendar</h1>
      <MyCalendar />
    </div>
  )
}

export default App
