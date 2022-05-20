import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteEvent } from '../../actions/event'

export const DeleteEvent = () => {

    const dispatch = useDispatch()

    const deleted = () => {
        dispatch( deleteEvent() )
    }
  return (
    <button 
        className='btn btn-danger fab-danger'
        onClick={ deleted }
    >
        <i className='fas fa-trash'></i>
        <span>Borrar evento</span>
    </button>
  )
}
