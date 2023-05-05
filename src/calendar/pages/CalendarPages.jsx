import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { Navbar } from "../components/Navbar"
import { localizer, getMessagesEs } from '../../helpers';

const events = [{
    title: 'Cumpleanios del jefe',
    notes: 'Hay que comprar torta',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Omar'
    }
}]
export const CalendarPages = () => {

    const eventStyleGetter = ( event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#347CF7',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }
    }

    return (
        <>
            <Navbar />
            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={ getMessagesEs() }
                eventPropGetter={ eventStyleGetter }
            />
        </>
    )
}
