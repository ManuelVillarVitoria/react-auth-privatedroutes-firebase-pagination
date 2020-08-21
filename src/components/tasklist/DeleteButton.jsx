import React, {useState} from 'react'

import {db} from '../server/firebase'

const DeleteButton = ({props, item}) => {

  const [tareas, setTareas] = useState([])
 
    const eliminar = async (id) => {
        try {
          await db.collection(props.user.uid).doc(id).delete()
    
          const arrayFiltrado = tareas.filter(item => item.id !== id)
          setTareas(arrayFiltrado)
    
        } catch (error) {
          console.log(error)
        }
      }
    
    return (
        <button 
            className="btn btn-danger btn-sm float-right"
            onClick={() => eliminar(item.id)}
        >
            Eliminar
        </button>
    )
}

export default DeleteButton
