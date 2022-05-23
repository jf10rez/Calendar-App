import Swal from "sweetalert2"
import { convertEvent } from "../helpers/convert-events"
import { fetchWithToken } from "../helpers/fetch"
import { types } from "../types/types"


export const setActiveEvent = ( event ) => ({
    type: types.setActiveEvent,
    payload: event
})

export const eventStartAddNew = ( event ) => {
    return async( dispatch, getState ) => {

        const { uid, name } = getState().rootReducers.auth
        const response = await fetchWithToken('events', event, 'POST')
        const body = await response.json()

        console.log(body)
        // dispatch( addEvent( event ) )
        if( body.ok ){
            event.id = body.event.id
            event.user = {
                _id: uid,
                name
            }

            dispatch( addEvent( event ) )
        }
    }
}

export const eventStartLoading = () => {
    return async( dispatch )=> {

        try {
            
            const response = await fetchWithToken('events')
            const body = await response.json()
            const events = convertEvent( body.events )

            dispatch( eventLoaded( events ) )

        } catch (error) {
            console.log(error)
        }

    }
}

export const startUpdateEvent = ( event ) => {
    return async( dispatch ) => {
        const response = await fetchWithToken( `events/${event.id}`, event, 'PUT' )
        const body = await response.json()

        if( body.ok ){
            dispatch( updateEvent( event ) )
        }else{
            Swal.fire('Error', body.message, 'error')
        }
    }
}

export const startEventDelete = () => {
    return async( dispatch, getState ) => {

        const { id } = getState().rootReducers.event.activeEvent
        const response = await fetchWithToken( `events/${id}`, {}, 'DELETE' )
        const body = await response.json()

        if( body.ok ){
            dispatch( deleteEvent() )
        }else{
            Swal.fire('Error', body.message, 'error')
        }

    }
}

const eventLoaded = ( events ) => ({ type: types.eventsLoaded, payload: events })

const addEvent = ( event ) => ({
    type: types.addEvent,
    payload: event
})

export const clearActiveEvent = () => ({type: types.clearActiveEvent})

const updateEvent = (e) => ({type: types.eventUpdated, payload: e})

const deleteEvent = () => ({type: types.eventDeleted})