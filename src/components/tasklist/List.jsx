import React, { useState, Fragment } from 'react'
import moment from 'moment'
import 'moment/locale/es' 

import DeleteButton from './DeleteButton'
import UpdateButton from './UpdateButton'


const List = () => {

    const [tareas,] = useState([])
    
    return (
        <Fragment>
          <ul className="list-group">
            { tareas.map(item => (

                <li className="list-group-item list-items" key={item.id}>
                    {item.name} 

                    <span className="date"> 
                    - {moment(item.fecha).format('lll')}
                    </span>

                    <DeleteButton />

                    <UpdateButton />

                </li>
            ))}
        </ul>

        </Fragment>

    )
}

export default List
