import { Colors } from "@/utils/types"

interface Props {
    className?: string
    duotone?: boolean
    filled?: boolean
    color?: Colors
}

export default function ArrowDownIcon({className , duotone, filled, color = Colors.CURRENT_COLOR} : Props) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {
            duotone ? 
                filled ?
                    <>
                    <path d="M8.30273 12.4044L11.6296 15.8351C11.8428 16.0549 12.1573 16.0549 12.3704 15.8351L18.8001 9.20467C19.2013 8.79094 18.9581 8 18.4297 8H12.7071L8.30273 12.4044Z" fill={color}/>
                    <path opacity="0.5" d="M11.2929 8H5.5703C5.04189 8 4.79869 8.79094 5.1999 9.20467L7.60648 11.6864L11.2929 8Z" fill={color}/>
                    </>
                :
                    <>
                    <path d="M19 9L12 15L5 9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </>
            :
                filled ?
                    <>
                    <path d="M12.3704 15.8351L18.8001 9.20467C19.2013 8.79094 18.9581 8 18.4297 8H5.5703C5.04189 8 4.79869 8.79094 5.1999 9.20467L11.6296 15.8351C11.8427 16.0549 12.1573 16.0549 12.3704 15.8351Z" fill={color}/>
                    </>
                :
                    <>
                    <path d="M19 9L12 15L5 9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </>
        }
        </svg>
    )
}
