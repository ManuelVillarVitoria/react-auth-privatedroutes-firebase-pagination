import React, {useState} from 'react';

const Login = () => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const procesarDatos = e => {
        e.preventDefault();
        if(!email.trim()){
            console.log('Ingrese un e-mail')
            return
        }
        if(!pass.trim()){
            console.log('Ingrese un password')
            return
        }
        if(pass.length < 6){
            console.log('Password mayor a 6 carácteres')
            return
        }
        console.log('Pasando todas las validaciones!')
    }


    return (  
        <div className="mt-5">
            <h3 className="text-center">Acceso o Registro de usuarios</h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>
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
                            Registrarse
                        </button>
                        <button 
                            className="btn btn-sm btn-info btn-block"
                            type="button"
                        >
                            ¿ Ya tienes cuenta ?
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default Login;