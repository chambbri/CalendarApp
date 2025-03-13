import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { enUS } from 'date-fns/locale/en-US';
import Modal from "./Modal";

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

const MyCalendar = () => {
    const [isAddEventOpen, setIsAddEventOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleSelectSlot = ({ start }: { start: Date }) => {
        setSelectedDate(start); // Save selected date
        setIsAddEventOpen(true); // Open modal
    };
    
    return (
        <div style={{ height: "80vh", padding: "20px" }}>
            <Calendar
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectSlot={handleSelectSlot}
                style={{ height: "100%" }}
            />
            <Modal open={isAddEventOpen} onClose={() => setIsAddEventOpen(false)} selectedDate={selectedDate}></Modal>

        </div>
    );
};

export default MyCalendar;