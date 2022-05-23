import { types } from "../types/types";

// {
//     id: new Date().getTime(),
//     title: 'Cumpleaños JF',
//     start: moment().toDate(),
//     end: moment().add( 2, 'hours' ).toDate(),
//     notes: 'Comprar pastel',
//     user: {
//         id: 123,
//         name: 'Jhona'
//     }
// }

const initialState = {
        events:[],
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

        case types.eventsLoaded:
            return {
                ...state,
                events: action.payload
            }

        case types.logoutCleanEvent: 
            return {
                ...initialState
            }
        
        default: 
            return state
    }

}