import axios from "axios";

export interface CreateEventI {
    title: string,
    description: string,
    startDate: Date;
    endDate: Date;
    location: string
}

export interface EventI extends CreateEventI {
  _id: string;
}
export const postEvent = async (eventData: CreateEventI) => {
    try {
        const response = await axios.post('http://localhost:8000/api/events', eventData)
        console.log("Event created", response.data);
        return response.data
    } catch (error) {
        console.error('Error: ', error)
        throw error;
    }
};