import React, { useState } from 'react';
import Navbar from "../../components/Navbar";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const events = [
    {
        title: 'Sample Event',
        start: new Date(),
        end: new Date(),
    },
];

export default function CalendarPage() {
    const [myEvents, setMyEvents] = useState(events);

    return (
        <div className="main-container w-full h-auto bg-[#f9faef] relative overflow-hidden mx-auto my-0">
            <Navbar />
            <div className="calendar-container p-4">
                <Calendar
                    localizer={localizer}
                    events={myEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    className="bg-white shadow-md rounded-lg p-4"
                />
            </div>
        </div>
    );
}