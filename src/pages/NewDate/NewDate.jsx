import { useContext, useEffect, useRef, useState } from "react"
import './NewDate.css'
import UserContext from "../../context/UserContext"
import { navigate } from "wouter/use-location"

export default function NewDate({params}) {

    const treatmentId = params.id
    const inputDate = useRef(null)
    const selectHour = useRef(null)
    const {user} = useContext(UserContext)
    const [scheduledDate, setScheduledDate] = useState(null)
    const [availableHours, setAvailableHours] = useState([])
    const hours = ['09:00:00', '10:00:00', '11:00:00', '12:00:00', "13:00:00", "14:00:00", '15:00:00', "16:00:00"]

    const ws = new WebSocket('ws://localhost:4000/')

    console.log(user, treatmentId)

    useEffect( () => {

    },[])

    const addZero =  (number) =>{

        let stringNumber = number.toString()
        if(stringNumber.length == 1){
            stringNumber = `0${stringNumber}`
        }

        return stringNumber
    }

    const actualDate = new Date() 

    const minDate = `${actualDate.getFullYear()}-${addZero(actualDate.getMonth() + 1)}-${addZero(actualDate.getDate())}`

    const scheduleNewDate = async (e) => {

        e.preventDefault()
        
        const date = inputDate.current.value
        const hour = selectHour.current.value

        const newDate = {
            fecha: date,
            hora: hour,
            usuarioId: user.userId,
            tratamientoId: treatmentId
        }

        console.log(newDate)

        fetch('http://localhost:3000/citas', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(newDate)
        })
        .then(response => response.json())
        .then(data => console.log(data))
       
        ws.send(JSON.stringify(newDate))
        ws.close(1000, "Cita agendada correctamente")
        
        navigate('/home')
    }

    const verifyDate = (e) => {

        e.preventDefault()

        const stringDate = inputDate.current.value

        const auxYear = Number.parseInt(stringDate.substr(0,4))
        const auxMonth = Number.parseInt(stringDate.substr(5,2))
        const auxDay = Number.parseInt(stringDate.substr(8,2))
        
        const auxDate = new Date(auxYear, auxMonth - 1, auxDay)

        setScheduledDate(auxDate)

    }

    useEffect( () => {

        if(scheduledDate){

            const year = scheduledDate.getFullYear()
            const month = addZero(scheduledDate.getMonth() + 1)
            const day = addZero(scheduledDate.getDate())

            console.log(scheduledDate)

            fetch(`http://localhost:3000/citas/${year}/${month}/${day}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const {citas} = data
                let auxArray = hours
                citas.forEach(cita => {
                    auxArray = hours.filter(hour => hour != cita.hora)
                });
    
                console.log(auxArray)
                setAvailableHours(auxArray)
            })

        }

    },[scheduledDate])

    return (

        <section>

            <form className="dateForm" onSubmit={scheduleNewDate}>

                <h2>Agenda tu cita</h2>

                <input type="date" min={minDate} ref={inputDate} onInput={verifyDate} />

                {
                    scheduledDate ? <select name="" id="" required ref={selectHour}>
                        <option value="" disabled selected >seleccione el horario</option>
                    {
                        availableHours.map(availableHour => <option value={availableHour}> {availableHour}</option>)
                    }
                        
                        
                    </select> : null
                }

                <button>AGENDAR</button>


            </form>

        </section>
    )
}