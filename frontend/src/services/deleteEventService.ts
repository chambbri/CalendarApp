import axios from "axios";

export const deleteEvent = async (id: String) => {
    try {
        const response = await axios.delete(`http://localhost:8000/api/events/${id}`)
        console.log("Event deleted", response.data);
        return response
    } catch (error) {
        console.error('Error: ', error)
        throw error;
    }
};