import React, {useState, useEffect} from 'react'
import {db} from '../server/firebase'
import moment from 'moment' 
import 'moment/locale/es' 

const Firestore = (props) => {

    const [tareas, setTareas] = useState([])
    const [tarea, setTarea] = useState('')
    const [modoEdicion, setModoEdicion] = useState(false)
    const [id, setId] = useState('')
    const [error, setError] = useState(null)
    const [ultimo, setUltimo]= useState(null)
    const [desactivar, setDesactivar]= useState(false)
  
  
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
    },[props.user.uid])

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
  
    const agregar = async (e) => {
      e.preventDefault()
  
      if( !tarea.trim() ) {
        setError(' Escriba algo por favor... ')
        return
        } else if ( tarea.trim().length < 3 || tarea.trim().length >= 46 ) {
          setError(' El texto debe comprender entre 3 y 45 carácteres. ')
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
        setError(null)
        
      } catch (error) {
        console.log(error)
      }
      console.log(tarea)
    }
  
    const eliminar = async (id) => {
      try {
        await db.collection(props.user.uid).doc(id).delete()
  
        const arrayFiltrado = tareas.filter(item => item.id !== id)
        setTareas(arrayFiltrado)
  
      } catch (error) {
        console.log(error)
      }
    }
  
    const activarEdicion = (item) => {
      setModoEdicion(true)
      setTarea(item.name)
      setId(item.id)
      setError(null)
    }
  
    const editar = async (e) => {
      e.preventDefault()
      if( !tarea.trim() ){
        setError(' Escriba algo por favor... ')
        return
        
      } else if ( tarea.trim().length < 3 || tarea.trim().length >= 46 ) {
        setError(' El texto debe comprender entre 3 y 45 carácteres. ')
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
        setError(null)
      } catch (error) {
        console.log(error)
      }
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-8">
                    <h3>Lista de tareas</h3>

                    <ul className="list-group">
                        {
                        tareas.map(item => (
                            <li className="list-group-item list-items" key={item.id}>
                              {item.name} 
                            <span className="date"> 
                              - {moment(item.fecha).format('lll')}
                            </span>
                
                            <button 
                                className="btn btn-danger btn-sm float-right"
                                onClick={() => eliminar(item.id)}
                            >
                                Eliminar
                            </button>
                            <button 
                                className="btn btn-warning btn-sm float-right mr-2"
                                onClick={() => activarEdicion(item)}
                            >
                                Editar
                            </button>
                            </li>
                        ))
                        }
                    </ul>

                    <button 
                      className="btn btn-info btn-block mt-2 btn-sm"
                      onClick={()=> siguiente()}
                      disabled={desactivar}
                      >
                        Siguiente...
                    </button>
                </div>

                <div className="col-md-4 mt-4">
                    <h3>
                        {
                        modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
                        }
                    </h3>

                    <form onSubmit={modoEdicion ? editar : agregar}>

                    {!tarea.trim() ? (
                          error && <div className="alert alert-danger">{error}</div>
                       ) : (
                          error && <div className="alert alert-warning">{error}</div> 
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
                        {
                            modoEdicion ? 'Editar' : 'Agregar'
                        }
                        </button>
                    </form>
                </div>
            </div> 
        </div>
    )
}

export default Firestore