import { EventI } from "../services/createEventService";
import { Event } from './Event'

export const EventList = ({ 
    events, 
}: {
    events:EventI[]; 
}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {events.map((event, i) => <Event event={event} key={i}></Event>)}
        </div>
    )
}