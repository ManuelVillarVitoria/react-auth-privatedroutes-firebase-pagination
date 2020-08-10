import React, {useState, useCallback} from 'react';
import {auth, db} from '../server/firebase';
import {withRouter} from 'react-router-dom';

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState(null)
    const [esRegistro, setEsRegistro] = useState(true)

    const procesarDatos = e => {
        e.preventDefault();

        if(!email.trim()){
            setError('Ingrese un e-mail')
         
            return
        }
        if(!pass.trim()){
            setError('Ingrese un password')
            return
        }
        if(pass.length < 6){
            setError('Password de 6 carácteres o más')
            return
        }
        setError(null)
        console.log('Pasando todas las validaciones!')

        if(esRegistro) {
            registrar()
        } else {
            login()
        }
    }

    const login = useCallback(async() => {

        try {
            const res = await auth.signInWithEmailAndPassword(email, pass)
            console.log(res.user) 
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/admin')

        } catch (error) {
            if(error.code === 'auth/user-not-found') {
                setError('Usuario no registrado')
            }
            if(error.code === 'auth/wrong-password') {
                setError('Contraseña incorrecta')
            }
        }
    }, [email, pass, props.history])


    const registrar = useCallback(async() => {

        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass)
            console.log(res.user)
            await db.collection('usuarios').doc(res.user.email).set({
                email: res.user.email,
                uid: res.user.uid
            })
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/admin')
            
        } catch (error) { 
            if(error.code === 'auth/invalid-email') {
                setError('E-mail no válido')
            }
            if(error.code === 'auth/email-already-in-use') {
                setError('E-mail ya utilizado')
            }
        }

    }, [email, pass, props.history])


    return (  
        <div className="mt-5">
            <h3 className="text-center">

            { esRegistro ? 'Registro de usuarios' : 'Login de acceso' }

            </h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>

                    { error && (<div className="alert alert-danger">{error}</div>) } 

                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="Ingrese un e-mail"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        <input 
                            type="password"
                            className="form-control mb-2"
                            placeholder="Ingrese un password"
                            onChange={e => setPass(e.target.value)}
                            value={pass}
                        />
                        <button 
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                        >
                            {esRegistro ? 'Registrar' : 'Acceder'}

                        </button>
                        <button 
                            className="btn btn-sm btn-info btn-block"
                            type="button"
                            onClick={() => setEsRegistro(!esRegistro)}
                        >
                            { esRegistro ? '¿ Ya estás registrado ?' : '¿ No tienes cuenta ?' }

                        </button>
                        { !esRegistro &&
                            (
                                <button 
                                    className="btn btn-danger btn-lg btn-sm mt-2"
                                    type="button"
                                    onClick={() => props.history.push('/reset')}
                                >
                                    Recuperar contraseña

                                </button>
                            )
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default withRouter(Login);