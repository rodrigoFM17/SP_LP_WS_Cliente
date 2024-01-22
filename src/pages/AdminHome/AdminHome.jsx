import { useContext, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import DatesContext from "../../context/DatesContext";


export default function AdminHome () {

    const {dates, setDates} = useContext(DatesContext)

    const updateDatesWithLP = async () => {
        
        try{
            const res = await fetch('http://localhost:3000/citas/update')
            const data = await res.json()
            console.log(data)
        }catch{
            console.log('tiempo de espera terminado')
        }finally {
            
        }
    }
    
    useEffect(() =>{

        fetch('http://localhost:3000/citas')
        .then(response => response.json())
        .then(data => setDates(data.citas))
        
        updateDatesWithLP()
    },[])
    

    return (
        <section>
            <NavBar/>

            {dates.length}
        </section>
    )
}