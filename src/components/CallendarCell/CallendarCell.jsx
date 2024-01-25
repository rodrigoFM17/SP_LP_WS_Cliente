
import { navigate } from 'wouter/use-location'
import './CallendarCell.css'

export default function CallendarCell({day, month, year}) {


    return(
        <>
        
        {
            (day !== 0) ? 
            <td className='calendarCell' onClick={ () => navigate(`/dates/${year}/${+month + 1}/${day}`)}> 
                <span className='day'>
                    {day}
                </span>
            </td>
            :
            <td className='disabled' />
        }
        </>
    )
}