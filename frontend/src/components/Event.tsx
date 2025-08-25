import { EventI } from "../services/createEventService";
import { Link } from "react-router-dom";

export const Event = ( { 
    event, 
}: { 
    event: EventI; 
} ) => {
    const formatEventDateTime = (dateString: Date, hasSpecificTime = true) => {
    if (!dateString) return 'No date';
    
    const date = new Date(dateString);

    // Debug logging - you can remove this later
    console.log('Date debug:', {
        originalDate: dateString,
        parsedDate: date,
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
    });
    
    // Check if this is likely a date-only event (starts at midnight)
    const isDateOnly = date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0;
    
    if (isDateOnly || !hasSpecificTime) {
        return date.toLocaleDateString();
    } else {
        return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], {
            hour: '2-digit', 
            minute: '2-digit'
        });
        }
    };
    return (
        <Link to={`/events/${event.id}`} key={event.id}>
            <div className="group bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 shadow-sm hover:shadow-md hover:bg-white/30 transition-all duration-200 overflow-hidden">
                {/* Header with title */}
                <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-lg text-gray-900 truncate group-hover:text-blue-600 transition-colors" 
                        title={event.title}>
                        {event.title}
                    </h3>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                    {/* Location */}
                    <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">📍</span>
                        <span className="truncate">{event.location}</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {event.description}
                    </p>

                    {/* Date range */}
                    <div className="flex items-center text-sm text-gray-500 pt-2 border-t border-gray-100">
                        <span className="mr-2">🗓️</span>
                        <span>
                            {formatEventDateTime(event.startDate)}
                            {event.startDate !== event.endDate && event.endDate &&
                                ` - ${formatEventDateTime(event.endDate)}`
                            }
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}