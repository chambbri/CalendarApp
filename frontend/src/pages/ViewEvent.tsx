import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { EventI } from "../services/createEventService";
import { getEventById } from "../services/getEventByIdService";
import { deleteEvent } from "../services/deleteEventService";

const ViewEvent = () => {
    const { id } = useParams();
    const [event, setEvent] = useState<EventI | null>(null);
    const navigate = useNavigate();

    if (!id) {
        console.error("No event ID provided");
        return;
    }

    useEffect(() => {
        const fetchEvent = async () => {
        try {
            const response = await getEventById(id);
            const data = response.data;
            data.startDate = new Date(data.startDate);
            data.endDate = new Date(data.endDate);
            setEvent(data);
        } catch (err) {
            console.error("Error fetching event:", err);
        }
        };
        fetchEvent();
    }, [id]);

    if (!event) return <p>Loading...</p>;

    const handleDelete = async () => {
        try {
            const response = await deleteEvent(id);
            console.log("Deleted event. Status:", response.status)
            navigate("/")
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };
  
  
    const handleEdit = () => {
        navigate(`/editevent/${id}`);
    };
  
    const buttonFormat = `
        rounded-lg 
        pt-3 pb-3 pl-7 pr-7 
        border border-transparent 
        font-medium 
        bg-[#644444] 
        cursor-pointer 
        hover:border-white 
        transition duration-250`;

  return (
    <div>
      <h2>{event.title}</h2>
      <div className="flex flex-col gap-y-4">
        <div>Location: {event.location}</div>
        <div>Description: {event.description}</div>
        <div>{new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</div>
      </div>
      <div className="flex gap-4">
        <button onClick={handleEdit} className={buttonFormat}>Edit</button>
        <button onClick={handleDelete} className={buttonFormat}>Delete</button>
      </div>
    </div>
  );
};

export default ViewEvent;