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

        console.log(user)

        if(user.admin){
            updateDatesWithLP()
        }
        
    },[user])

    const updateDatesWithLP = async () => {
        
        try{
            console.log('LP')
            const response = await fetch('http://localhost:3000/citas/update')
            const data = await response.json()
            
            notification.push(data.cita)
            
            setNotification([...notification])
        }catch{
            console.log('tiempo de espera terminado')
        }finally {
            updateDatesWithLP()
        }
    }

    const getRouteToDate = (date) =>{

        const year = date.substr(0,4)
        const month = date.substr(5,2)
        const day = date.substr(8,2)
        
        const scheduledDate = `/dates/${year}/${month}/${day}`

        return scheduledDate
    }

    useEffect( () =>{

     }, [show])

    useEffect(() => {

        console.log(notification)
    },[notification])

    return (
        <figure className='notification' onClick={() => setShow(!show)}>
            
            <img src={bell} alt="" />
            {
                notification.length > 0 ? <figure className='number'>
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
                            <Link to={getRouteToDate(notif.fecha)} className='linkToDates'>nueva cita a las {notif.hora} el {notif.fecha}</Link>
                        </div>)
                    }
                </div>
                :
                null
            }
        </figure>
    )
}