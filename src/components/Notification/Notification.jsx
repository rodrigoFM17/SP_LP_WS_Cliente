import './Notification.css'
import bell from '../../assets/bell-solid.svg'
import { useEffect, useState } from 'react'


export default function Notification (){

    const [numberNotification, setNumberNotification] = useState(0)

    useEffect( () => {
        
    })

    return (
        <figure className='notification'>
            <img src={bell} alt="" />
            {
                numberNotification != 0 ? <figure className='number'>
                    <span>
                    {numberNotification}
                    </span>
                </figure>
                :null
            }
            

        </figure>
    )
}