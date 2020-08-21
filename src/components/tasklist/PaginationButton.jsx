import React, {useState} from 'react'

import {db} from '../server/firebase'

const PaginationButton = props => {

  const [tareas, setTareas] = useState([])
  const [ultimo, setUltimo]= useState(null)
  const [desactivar, setDesactivar]= useState(false)

  const siguiente = async () => {
    console.log('siguiente')
    try{
      const data = await db.collection(props.user.uid)
          .limit(6)
          .orderBy('fecha', "desc")
          .startAfter(ultimo)
          .get()
    const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setTareas([
      ...tareas,
      ...arrayData
    ])
    setUltimo(data.docs[data.docs.length - 1])

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
        
    } catch(error) {
      console.log(error)
    }
  }

    return (
        <button 
            className="btn btn-info btn-block mt-2 btn-sm"
            onClick={()=> siguiente()}
            disabled={desactivar}
            >
                Siguiente...
        </button>
    )
}

export default PaginationButton
