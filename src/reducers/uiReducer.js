import { types } from "../types/types";

const initialState = {
    openModal: false
}


export const uiReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.openModal:
            return {
                ...state,
                openModal: true
            }

        case types.closeModal:
        return {
            ...state,
            openModal: false
        }
    
        default:
            return state
    }
}
