import { useContext, useRef } from 'react'
import './Login.css'
import { Link } from 'wouter'
import { navigate } from 'wouter/use-location'
import UserContext from '../../context/UserContext'

export default function Login () {

    const {user, setUser} = useContext(UserContext)

    const tel = useRef(null)

    const userAuthentication =  (e) => {

        e.preventDefault()

        fetch(`http://localhost:3000/usuarios/authentication/${tel.current.value}`)
        .then(response => response.json())
        .then(data => {

            console.log(data)

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

                newUserInformation.admin ? navigate('/admin'): navigate('/home') 

            } else {
                alert('telefono invalido')
            }
        })

    }
    

    return (

        <form className='loginForm' onSubmit={userAuthentication}>
            <div/>
            <div>

                <h2>Beauty Salon</h2>

                <span>Ingrese su numero telefonico</span>

                <input type="tel" minLength={10} maxLength={10} required ref={tel}/>

                <button type='submit' >INICIAR SESION</button>

            </div>

        </form>
    )
}