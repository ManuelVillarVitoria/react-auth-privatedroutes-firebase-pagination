import React, { Fragment, useState, useEffect } from 'react'
import {db} from '../server/firebase'

import PaginationButton from './PaginationButton'
import Form from './Form'
import List from './List'
import Header from './Header'



const TasklistMain = props => {

    const [,setTareas] = useState([])
    const [modoEdicion,] = useState(false)
    const [,setUltimo]= useState(null)
    const [,setDesactivar]= useState(false)
  

    useEffect(() => {
        const obtenerDatos = async () => {
    
          try {
            setDesactivar(true)
  
            const data = await db.collection(props.user.uid)
              .limit(6)
              .orderBy('fecha', "desc")
              .get()
            const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
     
            setUltimo(data.docs[data.docs.length - 1])
  
            console.log(arrayData)
            setTareas(arrayData)
  
            const query = await db.collection(props.user.uid)
            .limit(6)
            .orderBy('fecha', "desc")
            .startAfter(data.docs[data.docs.length - 1])
            .get()
            if(query.empty) {
              console.log('No hay más documentos')
              setDesactivar(true)
            } else {
              setDesactivar(false)
            }
            
          } catch (error) {
            console.log(error)
          }
        }
        obtenerDatos()
    
      },[props.user.uid, setDesactivar, setTareas, setUltimo])


    return (
        <Fragment>
            <div>
                <div className="row">
                    <div className="col-md-8">
                        <Header titulo = 'Lista de Tareas'/>
                        
                        <List />

                        <PaginationButton />
                    </div>
              
                    <div className="col-md-4 mt-4">
                          <h3>
                              {
                                 modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
                              }
                          </h3>

                          <Form />
                    </div>
                 </div>
              </div>
        </Fragment>
    )
}

export default TasklistMain
