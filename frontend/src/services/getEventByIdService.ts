// getEventsService.ts
import axios from "axios";

export const getEventById = async (id: string) => {
    return axios.get(`http://localhost:8000/api/events/${id}`);
};