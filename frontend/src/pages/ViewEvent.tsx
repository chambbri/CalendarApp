import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EventI } from "../services/createEventService";
import { getEventById } from "../services/getEventByIdService";
import { deleteEvent } from "../services/deleteEventService";

const ViewEvent = () => {
    const { id } = useParams();
    const [event, setEvent] = useState<EventI | null>(null);
    const navigate = useNavigate();

    if (!id) {
        console.error("No event ID provided");
        return;
    }

    useEffect(() => {
        const fetchEvent = async () => {
        try {
            const response = await getEventById(id);
            const data = response.data;
            data.startDate = new Date(data.startDate);
            data.endDate = new Date(data.endDate);
            setEvent(data);
        } catch (err) {
            console.error("Error fetching event:", err);
        }
        };
        fetchEvent();
    }, [id]);

    if (!event) return <p>Loading...</p>;

    const handleDelete = async () => {
        try {
            const response = await deleteEvent(id);
            console.log("Deleted event. Status:", response.status)
            navigate("/")
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };
  
  
    const handleEdit = () => {
        navigate(`/editevent/${id}`);
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Back Navigation */}
            <div className="mb-6">
                <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Events
                </Link>
            </div>

            {/* Main Event Card */}
            <div className="bg-white/20 backdrop-blur-sm rounded-xl shadow-lg border border-white/30 overflow-hidden">
                {/* Header with Actions */}
                <div className="p-8 border-b border-white/20 relative">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 pr-20">{event.title}</h1>
                    <div className="flex items-center text-gray-700">
                        <span className="mr-2">📍</span>
                        <span className="text-lg">{event.location}</span>
                    </div>
                    
                    {/* Action Icons */}
                    <div className="absolute top-6 right-6 flex gap-2">
                        <button 
                            onClick={handleEdit} 
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white/30 rounded-lg transition-all duration-200"
                            title="Edit Event"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                        
                        <button 
                            onClick={handleDelete} 
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-white/30 rounded-lg transition-all duration-200"
                            title="Delete Event"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content - Now Full Width */}
                <div className="p-8">
                    <div className="max-w-2xl space-y-6">
                        {/* Event Details */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Event Details</h3>
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <span className="mr-3 mt-1">🗓️</span>
                                    <div>
                                        <p className="font-medium text-gray-900">Date</p>
                                        <p className="text-gray-700">
                                            {new Date(event.startDate).toLocaleDateString()}
                                            {event.startDate !== event.endDate && 
                                                ` - ${new Date(event.endDate).toLocaleDateString()}`
                                            }
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <span className="mr-3 mt-1">📍</span>
                                    <div>
                                        <p className="font-medium text-gray-900">Location</p>
                                        <p className="text-gray-700">{event.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                            <div className="bg-white/30 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                                <p className="text-gray-800 leading-relaxed">
                                    {event.description || "No description provided."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
};

export default ViewEvent;