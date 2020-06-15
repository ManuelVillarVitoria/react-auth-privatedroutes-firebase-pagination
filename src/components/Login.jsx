import React, {useState} from 'react';

const Login = () => {

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
        //Limpiar el mensaje de error
        setError(null)
        console.log('Pasando todas las validaciones!')
    }


    return (  
        <div className="mt-5">
            <h3 className="text-center">

            { esRegistro ? 'Registro de usuarios' : 'Login de acceso' }

            </h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>

                    {/*error && = error ? : null*/}
                    { error && (<div className="alert alert-danger">{error}</div>) } 

                        <input name
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
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default Login;