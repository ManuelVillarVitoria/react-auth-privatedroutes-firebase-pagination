import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const  firebaseConfig = {
    apiKey: "AIzaSyB6Clg2qug7sdTgpcz2M3hcj1wnidIlTZE",
    authDomain: "react-auth-privatedroutes-pag.firebaseapp.com",
    databaseURL: "https://react-auth-privatedroutes-pag.firebaseio.com",
    projectId: "react-auth-privatedroutes-pag",
    storageBucket: "react-auth-privatedroutes-pag.appspot.com",
    messagingSenderId: "109722488536",
    appId: "1:109722488536:web:85e3f4a29d63dd766291ad"
  };
 
  app.initializeApp(firebaseConfig);

  const db = app.firestore();
  const auth = app.auth();
  
  export {db, auth};