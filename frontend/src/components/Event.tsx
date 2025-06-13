import { EventI } from "../services/createEventService";
import { MdDeleteForever, MdEdit } from 'react-icons/md'

export const Event = ( { 
    event, 
    onDeleteEvent, 
    onEditEvent
}: { 
    event: EventI; 
    onDeleteEvent: (_id: string) => void; 
    onEditEvent: (eventId: String) => void;
} ) => {
    return (
        <div className="flex flex-col w-70 h-50 border-1 rounded-lg p-2 gap-y-2 shadow-black shadow-sm">
            <div className="text-center font-semibold text-2xl truncate" title={event.location}>Title: {event.title}</div>
            <div className="line-clamp-1 text-ellipsis">Location: {event.location}</div>
            <div className="line-clamp-3 text-ellipsis">Description: {event.description}</div>
            <div>{new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</div>
            <div className="flex gap-x-2">
                <MdDeleteForever onClick={ () => onDeleteEvent(event._id)} /> 
                <MdEdit onClick={ () => onEditEvent(event._id)} />
            </div>
        </div>
    )
}