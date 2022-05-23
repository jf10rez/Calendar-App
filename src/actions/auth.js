import Swal from "sweetalert2"
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch"
import { types } from "../types/types"

export const startLogin = ( email, password ) =>{
    return async( dispatch ) => {

        try {
            
            const response = await fetchWithoutToken( 'auth', { email, password }, 'POST' )
            const { token, uid, name, ok, message } = await response.json()
            
            if( ok ){
                localStorage.setItem('token', token)
                localStorage.setItem('token-init-date', new Date().getTime())

                dispatch( login({uid, name}) )
            }else{
                Swal.fire('Error', message, 'error')
            }

        } catch (error) {
            return new Error('Se produjo un error con el token')
        }
    }
}

export const startRegister = ( rName, email, password ) => {
    return async( dispatch ) => {
        try {

            const response = await fetchWithoutToken( 'auth/new', { name: rName, email, password }, 'POST' )
            const { name, ok, token, uid } = await response.json()

            if( ok ){
                localStorage.setItem('token', token)
                localStorage.setItem('token-init-date', new Date().getTime())
                dispatch( login({uid, name}) )
            }else{
                Swal.fire('Error', 'Ups! se produjo un error', 'error')
            }

        } catch (error) {
            console.log(error)
            Swal.fire('Error', 'Ups! se ha producido un error')
        }
    }
}

export const startChecking = () => {
    return async(dispatch) => {
        try {

            const response = await fetchWithToken( 'auth/renew' )
            const { ok, token, uid, name } = await response.json()
            

            if( ok ){
                localStorage.setItem('token', token)
                localStorage.setItem('token-init-date', new Date().getTime())
                dispatch( login({uid, name}) )
            }else{
                dispatch(checkingFinish())
            }

        } catch (error) {
            console.log(error)
            Swal.fire('Error', 'Ups! se ha producido un error')
        }
    }
}

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear()
        dispatch( logoutCleanEvent() )
        dispatch( logout() )
    }
}

const logout = () => ({type: types.authLogout})

const checkingFinish = () => ({ type: types.authCheckingFinish })

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
})

const logoutCleanEvent = () => ({ type: types.logoutCleanEvent})