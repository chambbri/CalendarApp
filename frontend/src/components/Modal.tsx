import { useState } from "react";
import { startOfDay, endOfDay, format } from "date-fns";
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    selectedDate: Date | null;
}
const Modal: React.FC<ModalProps> = ({ open, onClose, selectedDate }) => {
    if (!open) return null;

    const defaultStart = selectedDate 
        ? format(startOfDay(selectedDate), "yyyy-MM-dd'T'HH:mm") // Ensures 00:00 local time
        : format(new Date(), "yyyy-MM-dd'T'HH:mm");
  
    const defaultEnd = selectedDate 
        ? format(endOfDay(selectedDate), "yyyy-MM-dd'T'HH:mm") // Ensures 23:59 local time
        : format(new Date(), "yyyy-MM-dd'T'HH:mm");

    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        start: defaultStart,
        end: defaultEnd,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Event Submitted!", eventData);
        onClose();
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                        <DialogTitle className="font-bold">Create Event</DialogTitle>
                        <Description>Add Event Details</Description>
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
                                <input type="datetime-local" name="start" id="event-start" value={eventData.start} onChange={handleChange} step="900" required/>
                            </div>
                            <div className="add-event-form">
                                <label htmlFor="event-end">End Time</label>
                                <input type="datetime-local" name="end" id="event-end" value={eventData.end} onChange={handleChange} step="900" required/>
                            </div>
                            <div className="add-event-form">
                                <input type="submit" value="Add Event"/>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default Modal;