import React, {useState} from 'react'
import DangerError from './DangerError'
import WarningError from './WarningError'

import {db} from '../server/firebase'

const Form = props => {

  const [tareas, setTareas] = useState([])
  const [tarea, setTarea] = useState('')
  const [modoEdicion, setModoEdicion] = useState(false)
  const [id, setId] = useState('')
  const [error, setError] = useState(null)


    const agregar = async (e) => {
        e.preventDefault()
    
        if( !tarea.trim() ) {
          setError(true)
          return

          } else if ( tarea.trim().length < 3 || tarea.trim().length >= 46 ) {
            setError(true)
            return
          }
  
        try {
          const nuevaTarea = {
            name: tarea,
            fecha: Date.now()
          }
          const data = await db.collection(props.user.uid).add(nuevaTarea)
    
          setTareas([
            ...tareas,
            {...nuevaTarea, id: data.id}
          ])
          
          setTarea('')
          setError(false)
          
        } catch (error) {
          console.log(error)
        }
      }


    const editar = async (e) => {
        e.preventDefault()

        if( !tarea.trim() ){
          setError(true)
          return
          
        } else if ( tarea.trim().length < 3 || tarea.trim().length >= 46 ) {
          setError(true)
          return
        }
       
        try {

          await db.collection(props.user.uid).doc(id).update({
            name: tarea
          })

          const arrayEditado = tareas.map(item => (
            item.id === id ? {id: item.id, fecha: item.fecha, name: tarea} : item
          ))

          setTareas(arrayEditado)
          setModoEdicion(false)
          setTarea('')
          setId('')
          setError(false)

        } catch (error) {
          console.log(error)
        }
      }


    return (

        <form onSubmit={modoEdicion ? editar : agregar}>

            {!tarea.trim() ? (
                error && <DangerError dangerMessage="Escriba algo por favor..." />
            ) : (
                error && <WarningError warningMessage="El texto debe comprender entre 3 y 45 carácteres." />
            )} 

          <input 
            type="text"
            placeholder="Ingrese tarea"
            className="form-control mb-2"
            onChange={e => setTarea(e.target.value)}
            value={tarea}
            />

            <button 
              className={
                  modoEdicion ? 'btn btn-warning btn-block' : 'btn btn-dark btn-block'
              }
              type="submit"
            >

            { modoEdicion ? 'Editar' : 'Agregar' }

            </button>
        </form>
    )
}

export default Form
