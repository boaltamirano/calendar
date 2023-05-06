import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onSetActiveEvent } from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { activeEvent, events } = useSelector(state => state.calendar);

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent(calendarEvent) )
    }

    const startSavingEvent = async( calendarEvent ) => {
        if( calendarEvent._id) {
            
        } else {
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }))
        }
    }
    
    return {
        activeEvent,
        events,

        setActiveEvent,
        startSavingEvent
    }
}
