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
        <table id="eventlist">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {events.map((event, i) => <Event event={event} onDeleteEvent={onDeleteEvent} onEditEvent={onEditEvent} key={i}></Event>)}
            </tbody>
        </table>
    )
}