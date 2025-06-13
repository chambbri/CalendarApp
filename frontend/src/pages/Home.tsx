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

    const createEventButton = `
        rounded-lg 
        pt-3 pb-3 pl-7 pr-7 
        border border-transparent 
        font-medium 
        bg-[#644444] 
        cursor-pointer 
        hover:border-white 
        transition duration-250`;

    return (
        <div>
            <header className="flex flex-col items-center justify-center pt-16 pb-16">
                <div className="flex flex-col items-center gap-y-4">
                    <h1 className="text-center text-3xl font-bold">InviteMe</h1>
                    <Link to="/eventform">
                        <button className={createEventButton}>
                            Create Event
                        </button>
                    </Link>
                </div>
            </header>
            <div className="flex flex-col pt-8 p-4 gap-y-4">
                <h2>Your Events</h2>
                <div>
                    {events.length > 0 ? (
                            <EventList events={events} onDeleteEvent={onDeleteEvent} onEditEvent={onEditEvent} />
                        ) : (
                            <p>No events found.</p>
                        )}
                </div>
            </div>
        </div>
    );
};

export default Home;