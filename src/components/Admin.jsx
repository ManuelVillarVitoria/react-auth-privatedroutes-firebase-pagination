import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {auth} from '../firebase';


const Admin = (props) => {

    const [user, setUser] = useState(null)

    useEffect(() => {

        if(auth.currentUser){
            console.log('Existe el usuario')
            setUser(auth.currentUser)
        }else{
            console.log('No existe el usuario')
            props.history.push('/login')
        }

    }, [props.history])


    return ( 
        <div>
              <h2>Ruta protegida</h2>

        </div>
  
     );
}
 
export default withRouter(Admin);