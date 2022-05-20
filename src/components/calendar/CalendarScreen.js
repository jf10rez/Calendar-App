import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'

import { Navbar } from '../ui/Navbar'
import messages from 'react-big-calendar/lib/utils/messages'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'
import { clearActiveEvent, setActiveEvent } from '../../actions/event'
import { AddEvent } from '../ui/AddEvent'
import { DeleteEvent } from '../ui/DeleteEvent'

moment.locale('es')

const localizer = momentLocalizer(moment) // or globalizeLocalizer


export const CalendarScreen = () => {

    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' )

    const {event} = useSelector(({rootReducers}) => rootReducers)
    const dispatch = useDispatch()
    const { activeEvent } = event

    const onDoubleClick = () => {
        dispatch( uiOpenModal() )
    }

    const onSelectEvent = (e) => {
        dispatch( setActiveEvent(e) )
    }

    const onViewChange = (e) => {
        setLastView( e )
        localStorage.setItem('lastView', e)
    }

    const hideButtonDelete = (e) => {
        dispatch( clearActiveEvent() )
    }

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    }
    
  return (
    <div className='calendar-screen'>
        <Navbar />

        <Calendar
            localizer={localizer}
            events={event.events}
            startAccessor="start"
            endAccessor="end"
            messages={ messages }
            eventPropGetter={ eventStyleGetter }
            onDoubleClickEvent= { onDoubleClick }
            onSelectEvent={ onSelectEvent }
            onView={ onViewChange }
            onSelectSlot= { hideButtonDelete }
            selectable={true}
            view={ lastView }
            components={ {
                event: CalendarEvent
            } }
        />

        <AddEvent />

        { activeEvent && <DeleteEvent /> } 
        
        <CalendarModal />
    </div>
  )
}
