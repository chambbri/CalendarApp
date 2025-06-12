import axios from "axios";
import { CreateEventI } from "./createEventService";

export const updateEvent = async (_id: String, updatedEvent: CreateEventI) => {
    try {
        const response = await axios.put(`http://localhost:8000/api/events/${_id}`, updatedEvent)
        console.log("Event updated", response.data);
        return response
    } catch (error) {
        console.error('Error: ', error)
        throw error;
    }
};