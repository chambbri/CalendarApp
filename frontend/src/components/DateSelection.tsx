import DatePicker from "react-datepicker";
import { useState } from "react";
import { Event } from "../services/createEventService"

export const DateSelection = (eventData: Event) => {
    const [showTime, setShowTime] = useState(false);
    const [startSelected, setStartSelected] = useState(false);

    const handleStartDateChange = (date: Date | null) => {
        setStartSelected(true);
    };
    return (
        <DatePicker 
            selected={eventData.startDate} 
            onChange={handleStartDateChange}
            locale="en-US"
            showTimeSelect={showTime}
            timeFormat="p"
            timeIntervals={15}
            dateFormat={showTime ? "Pp" : "P"} 
            placeholderText="Select Start Date"
        />
    );
};