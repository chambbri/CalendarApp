import { EventI } from "../services/createEventService";
import { Link } from "react-router-dom";

export const Event = ( { 
    event, 
}: { 
    event: EventI; 
} ) => {
    return (
        <Link to={`/events/${event._id}`} key={event._id}>
            <div className="flex flex-col w-full h-50 border-1 rounded-lg p-2 gap-y-2 shadow-black shadow-sm hover:opacity-70">
                <div className="text-center font-semibold text-2xl truncate" title={event.location}>{event.title}</div>
                <div className="line-clamp-1 text-ellipsis">Location: {event.location}</div>
                <div className="line-clamp-3 text-ellipsis">Description: {event.description}</div>
                <div>{new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</div>
            </div>
        </Link>
    )
}