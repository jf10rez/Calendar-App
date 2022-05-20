import { types } from "../types/types"

export const addEvent = ( event ) => ({
    type: types.addEvent,
    payload: event
})

export const setActiveEvent = ( event ) => ({
    type: types.setActiveEvent,
    payload: event
})

export const clearActiveEvent = () => ({type: types.clearActiveEvent})

export const updateEvent = (e) => ({type: types.eventUpdated, payload: e})

export const deleteEvent = () => ({type: types.eventDeleted})