import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { EventI } from "../services/createEventService";
import { getEventById } from "../services/getEventByIdService";
import EventForm from "./EventForm";

const EditEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<EventI | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEventById(id as string);
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

  return (
    <div>
      <EventForm
        initialData={event}
        mode="Edit"
      />
    </div>
  );
};

export default EditEvent;
