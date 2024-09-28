import { Colors } from "@/utils/types"

interface Props {
    className?: string
    duotone?: boolean
    filled?: boolean
    color?: Colors
}

export default function ArrowUpIcon({className , duotone, filled, color = Colors.CURRENT_COLOR} : Props) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {
            duotone ? 
                filled ?
                    <>
                    <path d="M8.30273 11.5956L11.6296 8.16485C11.8428 7.94505 12.1573 7.94505 12.3704 8.16485L18.8001 14.7953C19.2013 15.2091 18.9581 16 18.4297 16H12.7071L8.30273 11.5956Z" fill={color}/>
                    <path opacity="0.5" d="M11.2929 15.9999H5.5703C5.04189 15.9999 4.79869 15.2089 5.1999 14.7952L7.60648 12.3135L11.2929 15.9999Z" fill={color}/>
                    </>
                :
                    <>
                    <path d="M19 15L12 9L5 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </>
            :
                filled ?
                    <>
                    <path d="M12.3704 8.16485L18.8001 14.7953C19.2013 15.2091 18.9581 16 18.4297 16H5.5703C5.04189 16 4.79869 15.2091 5.1999 14.7953L11.6296 8.16485C11.8427 7.94505 12.1573 7.94505 12.3704 8.16485Z" fill={color}/>
                    </>
                :
                    <>
                    <path d="M19 15L12 9L5 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </>
        }
        </svg>
    )
}
