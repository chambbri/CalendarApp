import axios from "axios";

export interface Event {
    title: string,
    description: string,
    startDate: Date;
    endDate: Date;
}
export const postEvent = async (eventData: Event) => {
    try {
        const response = await axios.post('http://localhost:8000/api/events', eventData)
        console.log("Event created", response.data);
        return response.data
    } catch (error) {
        console.error('Error: ', error)
        throw error;
    }
};