import { useContext, useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import DatesContext from "../../context/DatesContext";
import TreatmentCard from "../../components/TreatmentCard/TreatmentCard";
import './AdminHome.css'


export default function AdminHome () {

    const {dates, setDates} = useContext(DatesContext)
    const [treatments, setTreatments] = useState([])

    
    useEffect(() =>{

        fetch('http://localhost:3000/citas')
        .then(response => response.json())
        .then(data => setDates(data.citas))

        fetch('http://localhost:3000/tratamientos')
        .then(response => response.json())
        .then(data => setTreatments(data.tratamientos))
        
    },[])

    useEffect( () => {

        console.log(dates)

    },[dates])
    

    return (
        <section className="adminHome">
            <NavBar />

            <div>

            {
                treatments.map(treatment => <TreatmentCard admin={true} 
                                            price={treatment.precio} 
                                            duration={treatment.duracion} 
                                            name={treatment.nombre}
                                            />)
            }

            </div>

            

        </section>
    )
}