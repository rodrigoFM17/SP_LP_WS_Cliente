import { useState } from 'react'
import './Calendar.css'
import { useEffect } from 'react'
import CallendarCell from '../CallendarCell/CallendarCell'


export default function Calendar () {
    const year = new Date().getFullYear()
    const months = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']
    const [index, setIndex] = useState(new Date().getMonth())
    const date = new Date(year, index, 1)
    const firstDay = date.getDay()
    const [month, setMonth] = useState(months[index]) 
    const daysMonth = new Date(year, index + 1, 0).getDate()
    const days = []
    const auxDays = []

    if (firstDay != 0){
        for(let i=0; i< firstDay -1; i++){
            days.push(0)
        }
    } else {
        days.push(0,0,0,0,0,0)
    }

    for ( let i=1; i<= daysMonth; i++){
        days.push(i)
    }

    const nRows = Math.ceil(days.length / 7)
    const rest = nRows * 7 - days.length
    for(let i=0; i < rest; i++ ){
        days.push(0)
    } 
    console.log(nRows)
    console.log(rest)
    console.log(days)

    for(let i=0; i< nRows; i++){
        let arrayAux = days.splice(0,7) 
        auxDays.push(arrayAux)
    }
    
    console.log(auxDays)

    useEffect(()=>{
        setMonth(months[index])
    },[index])

    const increaseMonth = () =>{
        if(index == 11){
            setIndex(0)
        } else{
            setIndex(index + 1)
        }
    }

    const decreaseMonth = () => {
        if(index == 0){
            setIndex(11)
        } else{
            setIndex(index - 1)
        }
    }

    return(
        <section>

            <div className='containerMonth'>
                <button onClick={decreaseMonth}> - </button>
                <h2>{month}</h2>
                <button onClick={increaseMonth}>  + </button>
            </div>
            

            <table>
                <thead>
                    <tr>
                        <td>Lunes</td>
                        <td>Martes</td>
                        <td>Miercoles</td>
                        <td>Jueves</td>
                        <td>Viernes</td>
                        <td>Sabado</td>
                        <td>Domingo</td>
                    </tr>
                </thead>
                <tbody>
                        {
                            auxDays.map(row =>{
                                 return <tr >
                                    {
                                        row.map( day =>{
                    
                                            return <CallendarCell day={day} month={index} year={year} dayOrders={dayOrders}/>
                                        })
                                    }
                                </tr>
                                
                                
                            })
                            
                        }

                    
                </tbody>
            </table>


        </section>
    )
}