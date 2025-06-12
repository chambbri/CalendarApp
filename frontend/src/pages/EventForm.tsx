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
    });

    const [showTime, setShowTime] = useState(false);
    const [startSelected, setStartSelected] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
    if (initialData) {
      setEventData({
        title: initialData.title,
        description: initialData.description,
        startDate: new Date(initialData.startDate),
        endDate: new Date(initialData.endDate),
      });
    }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            if (mode === "edit" && initialData?._id) {
                await updateEvent(initialData._id, eventData);
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

    return (
        <section className="add-event-container">
            <form onSubmit={handleSubmit} className="add-event-form">
                <div className="add-event-form">
                    <label htmlFor="event-title">Event Title</label>
                    <input type="text" name="title" id="event-title" value={eventData.title} onChange={handleChange} required/>
                </div>
                <div className="add-event-form">
                    <label htmlFor="event-description">Description</label>
                    <input type="text" name="description" id="event-description" value={eventData.description} onChange={handleChange}/>
                </div>
                <div className="add-event-form">
                    <label>
                        <input type="checkbox" checked={showTime} onChange={() => setShowTime(!showTime)} />
                        Include Time
                    </label>
                </div>
                <div className="add-event-form">
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
                    />
                </div>
                {(startSelected || mode === 'edit') && (
                    <div className="add-event-form">
                        <label htmlFor="event-end">Event End</label>
                        <DatePicker 
                            selected={eventData.endDate} 
                            onChange={(date) => setEventData({ ...eventData, endDate: date ?? new Date() })}
                            locale="en-US"
                            showTimeSelect={showTime}
                            timeIntervals={15}
                            dateFormat={showTime ? "Pp" : "P"}
                            minDate={eventData.startDate}
                        />
                    </div>
                )}
                <button type="submit">{mode === "edit" ? "Update" : "Create"} Event</button>
            </form>
        </section>
    )
}

export default EventForm;