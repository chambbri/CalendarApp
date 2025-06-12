import axios from "axios";

export const getEvents = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/events')
        console.log("Events retrieved", response.data);
        return response
    } catch (error) {
        console.error('Error: ', error)
        throw error;
    }
};