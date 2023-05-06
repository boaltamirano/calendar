import { useDispatch, useSelector } from "react-redux"
import { onSetActiveEvent } from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { activeEvent, events } = useSelector(state => state.calendar);

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent(calendarEvent) )
    }
    
    return {
        activeEvent,
        events,

        setActiveEvent,
    }
}
