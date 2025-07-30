import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { postEvent, CreateEventI, EventI } from "../services/createEventService";
import { updateEvent } from "../services/updateEventService";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  initialData?: EventI;
  mode: "create" | "edit";
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
    const [startSelected, setStartSelected] = useState(false);
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    const handleStartDateChange = (date: Date | null) => {
        setStartSelected(true);
        setEventData({
            ...eventData,
            startDate: date ?? new Date(),
            endDate: date ? new Date(date.getTime() + 30 * 60000) : new Date(),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (mode === "edit" && initialData?.id) {
                await updateEvent(initialData.id, eventData);
                console.log("Event updated!");
            } else {
                await postEvent(eventData);
                console.log("Event created!");
            }
            navigate('/');
        } catch (error) {
            console.error("Failed to submit event", error);
        }
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
        <section className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col border-2 items-left p-6 gap-y-4 w-1/2 shadow-sm shadow-black">
                <h1 className="text-center text-lg">Create Event</h1>
                <div className="flex flex-col items-left p-6 gap-y-4 md:w-1/2">
                    <div className="flex gap-x-4">
                        <label htmlFor="event-title">Event Title</label>
                        <input type="text" name="title" id="event-title" value={eventData.title} onChange={handleChange} required className="rounded border"/>
                    </div>
                    <div className="flex gap-x-4">
                        <label htmlFor="event-location">Location</label>
                        <input type="text" name="location" id="event-location" value={eventData.location} onChange={handleChange} className="rounded border"/>
                    </div>
                    <div className="flex gap-x-4">
                        <label>
                            Include Time
                            <input type="checkbox" checked={showTime} onChange={() => setShowTime(!showTime)} className="p-2" />
                        </label>
                    </div>
                    <div className="flex gap-x-4">
                        <label htmlFor="event-start">Event Start</label>
                        <DatePicker 
                            selected={eventData.startDate} 
                            onChange={handleStartDateChange}
                            locale="en-US"
                            showTimeSelect={showTime}
                            timeFormat="p"
                            timeIntervals={15}
                            dateFormat={showTime ? "Pp" : "P"} 
                            placeholderText="Select Start Date"
                            className="rounded border"
                        />
                    </div>
                    {(startSelected || mode === 'edit') && (
                        <div className="flex gap-x-4">
                            <label htmlFor="event-end">Event End</label>
                            <DatePicker 
                                selected={eventData.endDate} 
                                onChange={(date) => setEventData({ ...eventData, endDate: date ?? new Date() })}
                                locale="en-US"
                                showTimeSelect={showTime}
                                timeIntervals={15}
                                dateFormat={showTime ? "Pp" : "P"}
                                minDate={eventData.startDate}
                                className="rounded border"
                            />
                        </div>
                    )}
                </div>
                <div className="flex-1">
                    <textarea
                        placeholder="Description (Optional)"
                        rows={8}
                        className="w-full h-full border p-2 rounded resize-none"
                        name="description"
                        value={eventData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button type="submit" className={createEventButton}>{mode === "edit" ? "Update" : "Create"} Event</button>
            </form>
        </section>
    )
}

export default EventForm;