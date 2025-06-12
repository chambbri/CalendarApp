import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getEvents } from "../services/getEventsService";
import { deleteEvent } from "../services/deleteEventService";
import { EventI } from "../services/createEventService";
import { EventList } from "../components/EventList";

const Home = () => {
    const [events, setEvents] = useState<EventI[]>([]);

    const fetchEvents = async () => {
        try {
            const response = await getEvents();
            console.log("Fetched data:", response.data);
            setEvents(response.data.events);
        } catch (error) {
            console.error("Error loading events:", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const onDeleteEvent = async (_id: String) => {
        try {
            const response = await deleteEvent(_id);
            console.log("Deleted event. Status:", response.status)
            fetchEvents();
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    }

    const navigate = useNavigate();

    const onEditEvent = (eventId: String) => {
        navigate(`/editevent/${eventId}`);
    };

    return (
        <div>
            <h1>Social Event Creation App</h1>
            <Link to="/eventform">
                <button>Create New Event</button>
            </Link>
            <h2>My Events</h2>
            {events.length > 0 ? (
                <EventList events={events} onDeleteEvent={onDeleteEvent} onEditEvent={onEditEvent} />
            ) : (
                <p>No events found.</p>
            )}
        </div>
    );
};

export default Home;