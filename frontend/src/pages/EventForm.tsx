import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { postEvent, CreateEventI, EventI } from "../services/createEventService";
import { updateEvent } from "../services/updateEventService";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  initialData?: EventI;
  mode: "Create" | "Edit";
}

const EventForm = ({ initialData, mode }: Props) => {
    const [eventData, setEventData] = useState<CreateEventI>({
        title: "",
        description: "",
        startDate: new Date(),
        endDate: new Date(),
        location: ""
    });

    const [showTime, setShowTime] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (initialData) {
        setEventData({
            title: initialData.title,
            description: initialData.description,
            startDate: new Date(initialData.startDate),
            endDate: new Date(initialData.endDate),
            location: initialData.location
        });
        }
    }, [initialData]);

    useEffect(() => {
        if (!showTime) {
            // When turning off time, reset to start/end of day
            const startOfDay = new Date(eventData.startDate);
            startOfDay.setHours(0, 0, 0, 0);
            
            const endOfDay = new Date(eventData.endDate);
            endOfDay.setHours(23, 59, 59, 999);
            
            setEventData(prev => ({
                ...prev,
                startDate: startOfDay,
                endDate: endOfDay
            }));
        }
    }, [showTime]); // Only run when showTime changes

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    const handleStartDateChange = (date: Date | null) => {
        if (!date) return;
        
        let processedDate = date;
        let processedEndDate = date;
        
        if (!showTime) {
            // For date-only events, set time to start of day
            processedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
            processedEndDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
        } else {
            processedEndDate = new Date(date.getTime() + 30 * 60000);
        }
        
        setEventData({
            ...eventData,
            startDate: processedDate,
            endDate: processedEndDate,
        });
    };

    // Also update the end date handler:
    const handleEndDateChange = (date: Date | null) => {
        if (!date) return;
        
        let processedDate = date;
        
        if (!showTime) {
            // For date-only events, set to end of day
            processedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
        }
        
        setEventData({ ...eventData, endDate: processedDate });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const eventToSubmit = {
                ...eventData,
                hasSpecificTime: showTime  // Add this
            };
            if (mode === "Edit" && initialData?.id) {
                await updateEvent(initialData.id, eventToSubmit);
                console.log("Event updated!");
            } else {
                await postEvent(eventToSubmit);
                console.log("Event created!");
            }
            navigate('/');
        } catch (error) {
            console.error("Failed to submit event", error);
        }
    };

    return (
        <section className="min-h-screen pt-20 pb-16 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {mode === "Edit" ? "Edit Event" : "Create New Event"}
                    </h1>
                    <p className="text-gray-600">Plan your trip</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white/30 backdrop-blur-sm rounded-2xl shadow-xl border border-white/40 p-8 space-y-6">
                    {/* Event Title */}
                    <div className="space-y-2">
                        <label htmlFor="event-title" className="block text-sm font-medium text-gray-700">
                            Event Title *
                        </label>
                        <input 
                            type="text" 
                            name="title" 
                            id="event-title" 
                            value={eventData.title} 
                            onChange={handleChange} 
                            required 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            placeholder="Enter event title"
                        />
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                        <label htmlFor="event-location" className="block text-sm font-medium text-gray-700">
                            Location
                        </label>
                        <input 
                            type="text" 
                            name="location" 
                            id="event-location" 
                            value={eventData.location} 
                            onChange={handleChange} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            placeholder="Where is this happening?"
                        />
                    </div>

                    {/* Date Selection */}
                    <div className="space-y-1">
                        {/* Time Toggle - Better UI */}
                        <div className="flex items-center space-x-3 p-4 bg-blue-50/50 rounded-lg border border-blue-200/30">
                            <input 
                                type="checkbox" 
                                id="include-time"
                                checked={showTime} 
                                onChange={() => setShowTime(!showTime)} 
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                            />
                            <label htmlFor="include-time" className="text-sm font-medium text-gray-700">
                                Add specific times
                            </label>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Start Date *
                                </label>
                                <DatePicker 
                                    selected={eventData.startDate} 
                                    onChange={handleStartDateChange}
                                    showTimeSelect={showTime}
                                    timeFormat="h:mm aa"
                                    timeIntervals={15}
                                    dateFormat={showTime ? "MMM d, yyyy 'at' h:mm aa" : "MMM d, yyyy"}
                                    placeholderText="Select start date"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                    minDate={new Date()}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    End Date *
                                </label>
                                <DatePicker 
                                    selected={eventData.endDate} 
                                    onChange={handleEndDateChange}
                                    showTimeSelect={showTime}
                                    timeFormat="h:mm aa"
                                    timeIntervals={15}
                                    dateFormat={showTime ? "MMM d, yyyy 'at' h:mm aa" : "MMM d, yyyy"}
                                    minDate={eventData.startDate}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                    placeholderText="Select end date"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={eventData.description}
                            onChange={handleChange}
                            rows={6}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
                            placeholder="Tell people about your event... What should they expect? What should they bring?"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                        <button type="submit" className="btn-primary w-full text-lg py-4">
                            {mode === "Edit" ? "Update Event" : "Create Event"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default EventForm;