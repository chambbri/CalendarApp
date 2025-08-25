import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getEvents } from "../services/getEventsService";
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

    return (
        <div className="min-h-screen">
            <header className="pt-20 pb-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Welcome to Trippit
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Create and manage events effortlessly. Invite friends and keep track of everything in one place.
                    </p>
                    <Link to="/eventform">
                        <button className="btn-primary text-lg px-8 py-4">
                            Create Event
                        </button>
                    </Link>
                </div>
            </header>
            <main className="max-w-6xl mx-auto px-4 pb-16">
                <div className="rounded-xl shadow-lg p-6 bg-white/20 backdrop-blur-sm border border-white/30">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900">Your Events</h2>
                        <Link to="/eventform">
                            <button className="btn-secondary">+ New Event</button>
                        </Link>
                    </div>
                    
                    {events.length > 0 ? (
                        <EventList events={events} />
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg mb-4">No events yet</p>
                            <p className="text-gray-400">Create your first event to get started!</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Home;