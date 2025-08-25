import axios from "axios";

export interface CreateEventI {
    title: string,
    description: string,
    startDate: Date;
    endDate: Date;
    location: string;
    hasSpecificTime?: boolean;
}

export interface EventI extends CreateEventI {
  id: number;
}
export const postEvent = async (eventData: CreateEventI) => {
    try {
        const token = localStorage.getItem('token'); // get token from local storage
        const response = await axios.post('http://localhost:8000/api/events', eventData, {
            headers: {
                'Authorization': `Bearer ${token}` // Add Authorization header
            }
        });
        console.log("Event created", response.data);
        return response.data
    } catch (error) {
        console.error('Error: ', error)
        throw error;
    }
};