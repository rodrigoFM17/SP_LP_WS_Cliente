
import './TreatmentCard.css'

export default function TreatmentCard({price, duration, name, id}) {


    return(

        <fieldset className='treatmentCard'>
            <label htmlFor={`treatment${id}`}>
    
                <span>{name}</span>
                <span>$ {price}</span>
                <span>{duration} hora </span>
                
            </label>
            <input type="radio" value={id} name='treatments' id={`treatment${id}`}/>
        </fieldset>
    )
}