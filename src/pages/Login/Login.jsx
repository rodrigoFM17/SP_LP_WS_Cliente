import { useContext, useRef } from 'react'
import './Login.css'
import { Link } from 'wouter'
import { navigate } from 'wouter/use-location'
import UserContext from '../../context/UserContext'

export default function Login () {

    const {user, setUser} = useContext(UserContext)

    const tel = useRef(null)

    const userAuthentication = async (e) => {

        e.preventDefault()

        await fetch(`http://localhost:3000/usuarios/authentication/${tel.current.value}`)
        .then(response => response.json())
        .then(data => {

            if(data.success){

                const newUserInformation = {
                    loged: data.success,
                    userId: data.userId,
                    admin: false,
                    name: data.name
                }

                if(tel.current.value == '9611021578'){
                    newUserInformation.admin = true
                }

                setUser(newUserInformation)

                navigate('/home')

            } else {
                alert('telefono invalido')
            }
        })

        console.log(user)
    }
    

    return (

        <form className='loginForm' onSubmit={userAuthentication}>
            <div/>
            <div>

                <h2>Beauty Salon</h2>

                <span>Ingrese su numero telefonico</span>

                <input type="tel" minLength={10} maxLength={10} required ref={tel}/>

                <button type='submit' >INICIAR SESION</button>

                <Link to='/' className='registerLink'> No tienes cuenta? registrate aca</Link>


            </div>

        </form>
    )
}