import React, {useEffect, useState, Fragment} from 'react';
import {withRouter} from 'react-router-dom';

import {auth} from '../server/firebase';

import TasklistMain from '../tasklist/TasklistMain'


const Admin = props => {
    
    const [user, setUser] = useState(null);
    

    useEffect(() => { 
        if(auth.currentUser){
                setUser(auth.currentUser)
            }else{
                props.history.push('/login')
            }

        },[props.history])


    return ( 
        <Fragment>  
            <div className="mt-4 mb-4 card-header">
                <h4 className="my-0 font-weight-normal text-center">Ruta Protegida</h4>
            </div>
            <div className="alert alert-info">
                { user && ( <TasklistMain user={user} /> )}
            </div>
       </Fragment>
     );
}

export default withRouter(Admin);