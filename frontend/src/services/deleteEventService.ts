import axios from "axios";

export const deleteEvent = async (_id: String) => {
    try {
        const response = await axios.delete(`http://localhost:8000/api/events/${_id}`)
        console.log("Event deleted", response.data);
        return response
    } catch (error) {
        console.error('Error: ', error)
        throw error;
    }
};