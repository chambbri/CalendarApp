import { useState } from "react";
import DatePicker from "react-datepicker";
import { postEvent, Event } from "../services/createEventService";
import "react-datepicker/dist/react-datepicker.css";

const CreateEvent = () => {
    const [eventData, setEventData] = useState<Event>({
        title: "",
        description: "",
        startDate: new Date(),
        endDate: new Date(),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await postEvent(eventData);
            console.log("Event Submitted!", eventData);
        } catch (error) {
            console.error("Failed to submit event", error);
        }
    };

    return (
        <section className="add-event-form">
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
                    <label htmlFor="event-start">Start Time</label>
                    <DatePicker 
                    selected={eventData.startDate} 
                    showDateSelect 
                    onChange={(date) => setEventData({ ...eventData, startDate: date ?? new Date() })}
                    locale="en-US"
                    showTimeSelect
                    timeFormat="p"
                    timeIntervals={15}
                    dateFormat="Pp"
                    />
                </div>
                <div className="add-event-form">
                    <label htmlFor="event-end">End Time</label>
                    <DatePicker 
                    selected={eventData.endDate} 
                    showDateSelect 
                    onChange={(date) => setEventData({ ...eventData, endDate: date ?? new Date() })}
                    locale="en-US"
                    showTimeSelect
                    timeFormat="p"
                    timeIntervals={15}
                    dateFormat="Pp"
                    />
                </div>
                <div className="add-event-form">
                    <input type="submit" value="Add Event" id="addevent"/>
                </div>
            </form>
        </section>
    )
}

export default CreateEvent;