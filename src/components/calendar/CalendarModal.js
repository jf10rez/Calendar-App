import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'

import { customStyles } from "../../helpers/calendar-modal-style";
import { useForm } from "../../hooks/useForm";
import { uiCloseModal } from "../../actions/ui";
import { addEvent, clearActiveEvent, updateEvent } from "../../actions/event";

Modal.setAppElement("#root");

export const CalendarModal = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(moment().add(1, 'hours').toDate())
    const [isTitleValid, setIsTitleValid] = useState(true)

    const dispatch = useDispatch()
    const {openModal} = useSelector(state => state.rootReducers.ui)
    const {activeEvent} = useSelector(state => state.rootReducers.event)


    const [ inputValue, handleInputChange, setInputValue, reset ] = useForm({
        title: 'Evento',
        notes: '',
        start: Date.now(),
        end: moment().add(2, 'hours').toDate()
    })

    const { title, notes, start, end } = inputValue

    const handleStartDateChange = (e) => {
        setStartDate( e )
        setInputValue({
            ...inputValue,
            start: e
        })
    }
    const handleEndDateChange = (e) => {
        setEndDate( e )
        setInputValue({
            ...inputValue,
            end: e
        })
    }


    const submitForm = (e) => {
        e.preventDefault()

        const momentStart = moment(start)
        const momentEnd = moment(end)

        if( momentStart.isSameOrAfter( momentEnd ) ){
            return Swal.fire('Error', 
                            'La fecha fin debe ser mayor a la fecha de inicio', 
                            'error');
        }

        if( title.trim().length < 2 ){
            setIsTitleValid(false)
            return
        }

        if( activeEvent ){//Editar
          console.log(inputValue)
            dispatch( updateEvent( inputValue ) )
        }else{//Nuevo
          dispatch( addEvent({
            ...inputValue,
            user: {
              id: new Date().getTime(),
              name: 'Camila'
            }
          }) )
        }


        setIsTitleValid(true)
        console.log( inputValue )
    }

  const closeModal = () => {
    dispatch( uiCloseModal() )
    dispatch( clearActiveEvent() )
    reset()
  };

  useEffect(() => {
    if( activeEvent ){
      setInputValue(activeEvent)
    }else{
      setInputValue({})
    }
  }, [activeEvent])
  

  return (
    <div>
      <Modal
        isOpen={openModal}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo"
      >
        <h1> { activeEvent ? 'Editar evento' : 'Nuevo evento' } </h1>
        <hr />
        <form 
            className="container"
            onSubmit={ submitForm }
        >
          <div className="form-group">
            <label>Fecha y hora inicio</label>
            <DateTimePicker 
                className='form-control'
                onChange={handleStartDateChange} 
                value={startDate} 
            />
          </div>

          <div className="form-group">
            <label>Fecha y hora fin</label>
            <DateTimePicker 
                className='form-control'
                onChange={handleEndDateChange} 
                minDate={ startDate }
                value={endDate} 
            />
          </div>

          <hr />
          <div className="form-group">
            <label>Titulo y notas</label>
            <input
              type="text"
              className={`form-control ${ !isTitleValid && 'is-invalid' }`}
              placeholder="Título del evento"
              name="title"
              autoComplete="off"
              value={ title }
              onChange={ handleInputChange }
            />
            <small id="emailHelp" className="form-text text-muted">
              Una descripción corta
            </small>
          </div>

          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notas"
              rows="5"
              name="notes"
              value={ notes }
              onChange={ handleInputChange }
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Información adicional
            </small>
          </div>

          <button type="submit" className="btn btn-outline-primary btn-block">
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    </div>
  );
};
