import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { eventsReducer } from "./eventsReducer";
import { uiReducer } from "./uiReducer";

export const rootReducers = combineReducers({
    ui: uiReducer,
    event: eventsReducer,
    auth: authReducer
})


