import React, {useState, useEffect} from 'react';

import {auth} from './components/server/firebase';

import Routes from './components/Routes';


function App() {
  const [firebaseUser, setFirebaseUser] = useState(false)

  useEffect(() => {
      auth.onAuthStateChanged(user => {
          if(user){
              setFirebaseUser(user)
          }else{
              setFirebaseUser(null)
          }
      })
  }, [])
  
  return firebaseUser !== false ? (
      <Routes />
  ) : (
      <div>Cargando...</div>
  )
}

export default App;
