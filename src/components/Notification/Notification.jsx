import './Notification.css'
import bell from '../../assets/bell-solid.svg'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/UserContext'
import { Link } from 'wouter'


export default function Notification (){

    const [notification, setNotification] = useState([])
    const {user} = useContext(UserContext)
    const [show, setShow] = useState(false)

    useEffect( () => {

        updateDatesWithLP()
        
    },[])

    const updateDatesWithLP = async () => {
        
        try{
            console.log('LP')
            const res = await fetch('http://localhost:3000/citas/update')
            const data = await res.json()
            console.log(data)
            notification.push(data.cita)
            setNotification([...notification])
        }catch{
            console.log('tiempo de espera terminado')
        }finally {
            updateDatesWithLP()
        }
    }

    useEffect( () =>{ }, [show])


    return (
        <figure className='notification' onClick={() => setShow(!show)}>
            <img src={bell} alt="" />
            {
                notification.length != 0 ? <figure className='number'>
                    <span>
                    {notification.length}
                    </span>
                </figure>
                :null
            }

            {
                show && notification.length > 0 ? 
                <div className='showNotification'>
                    {
                        notification.map( notif => <div>
                            <Link to='/dates' className='linkToDates'>nueva cita a las {notif.hora}</Link>
                        </div>)
                    }
                </div>
                :
                null
            }
        </figure>
    )
}