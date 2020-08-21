import React, {useState} from 'react'

const UpdateButton = item => {

    const [,setTarea] = useState('')
    const [,setModoEdicion] = useState(false)
    const [,setId] = useState('')
    const [,setError] = useState(null)
  

    const activarEdicion = (item) => {
        setModoEdicion(true)
        setTarea(item.name)
        setId(item.id)
        setError(null)
      }
    
    
    return (
        <button 
            className="btn btn-warning btn-sm float-right mr-2"
            onClick={() => activarEdicion(item)}
        >
            Editar
        </button>
    )
}

export default UpdateButton
