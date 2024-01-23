
import './CallendarCell.css'

export default function CallendarCell({day, month, year, dayOrders}) {


    return(
        <>
        
        {
            (day !== 0) ? 
            <td className='calendarCell'> 
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