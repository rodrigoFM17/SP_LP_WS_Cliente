
import './CallendarCell.css'

export default function CallendarCell({day, month, year, dayOrders}) {


    return(
        <>
        
        {
            (day !== 0) ? (
                <td className='calendarCell'> 
                    <span className='day'>
                        {day}
                    </span>
                    {
                        dayOrders.map(order => {
                            console.log(order);
                            return <span className='orderSpan' key={order}>
                                    <span>{order.hour}</span>
                                    <span>#{order.order}</span>
                                </span>
                        })
                    }
                </td>

            ): (
                <td className='disabled'>
                    
                </td>
            )
            
        }
        </>
    )
}