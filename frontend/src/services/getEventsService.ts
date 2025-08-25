import axios from "axios";

export const getEvents = async () => {
    try {
        const token = localStorage.getItem('token'); // get token from local storage
        const response = await axios.get('http://localhost:8000/api/events', {
            headers: {
                'Authorization': `Bearer ${token}` // Add Authorization header
            }
        });
        console.log("Events retrieved", response.data);
        return response
    } catch (error) {
        console.error('Error: ', error)
        throw error;
    }
};