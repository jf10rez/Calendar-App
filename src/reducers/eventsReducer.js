import moment from 'moment'

import { types } from "../types/types";

const initialState = {
        events:[{
            id: new Date().getTime(),
            title: 'Cumpleaños JF',
            start: moment().toDate(),
            end: moment().add( 2, 'hours' ).toDate(),
            bgcolor: '#fafafa',
            notes: 'Comprar pastel',
            user: {
                id: 123,
                name: 'Jhona'
            }
        }
    ],
    activeEvent: null
}

export const eventsReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.addEvent:
            return {...state, events: [...state.events, action.payload]}

        case types.setActiveEvent:
            return {...state, activeEvent: action.payload}

        case types.clearActiveEvent:
            return {...state, activeEvent: null}

        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(
                    e => ( e.id === action.payload.id ? action.payload : e )
                )
            }
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(
                    e => ( e.id !== state.activeEvent.id )
                ),
                activeEvent: null
            }
    
        default: 
            return state
    }

}