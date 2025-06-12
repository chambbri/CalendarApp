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
        <tr>
            <td>{event.title}</td>
            <td>{new Date(event.startDate).toLocaleDateString()}</td>
            <td>{new Date(event.endDate).toLocaleDateString()}</td>
            <td><MdDeleteForever onClick={ () => onDeleteEvent(event._id)} />  <MdEdit onClick={ () => onEditEvent(event._id)} /></td>
        </tr>
    )
}