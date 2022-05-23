import moment from "moment"

export const convertEvent = ( event ) => {
    return event.map( e => ({
        ...e,
        end: moment( e.end ).toDate(),
        start: moment( e.start ).toDate(),
    }) )
}