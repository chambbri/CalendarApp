import { EventI } from "../services/createEventService";
import { Event } from './Event'

export const EventList = ({ 
    events, 
    onDeleteEvent,
    onEditEvent,
}: {
    events:EventI[]; 
    onDeleteEvent: (_id: string) => void; 
    onEditEvent: (eventId: String) => void
}) => {
    return (
        <div className="flex flex-wrap gap-x-8">
            {events.map((event, i) => <Event event={event} onDeleteEvent={onDeleteEvent} onEditEvent={onEditEvent} key={i}></Event>)}
        </div>
    )
}