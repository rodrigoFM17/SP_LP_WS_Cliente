import { useEffect, useState } from "react"
import TreatmentCard from "../../components/TreatmentCard/TreatmentCard"
import './Home.css'
import { navigate } from "wouter/use-location"
import NavBar from "../../components/NavBar/NavBar"

export default function Home () {

    const [treatments, setTreatments] = useState([])

    useEffect( () => {

        fetch('http://localhost:3000/tratamientos')
        .then(response => response.json())
        .then(data => setTreatments(data.tratamientos))

    }, [])

    const goToDate = (e) => {
        
        e.preventDefault()

        const selectedInput = document.querySelector('input[name="treatments"]:checked')

        if(selectedInput) {
            console.log(selectedInput)

            navigate(`/newDate/${selectedInput.value}`)

            
        } else {
            alert('no has seleccionado ningun tratamiento')
        }



    }   

    return (
        <section className="home">

            <NavBar />

            <form onSubmit={goToDate}>

                {
                treatments.map( treatment => {
                    let i = 1
                    return <TreatmentCard 
                            name={treatment.nombre} 
                            duration={treatment.duracion} 
                            price={treatment.precio}
                            id={treatment.id} 
                            key={`treatment${i++}`} />
                    })
                }

                <button>AGENDAR UNA CITA</button>

            </form>

            

            

        </section>
    )
}