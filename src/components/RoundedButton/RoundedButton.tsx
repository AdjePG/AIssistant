import { ReactNode } from "react";
import styles from "@/components/RoundedButton/RoundedButton.module.css"

interface Props {
    clickFunction?: () => void;
    label?: string
    isSubmit?: boolean
    children?: ReactNode
    classNameProps?: {[key: string]: string;}
}

export default function RoundedButton({clickFunction, label, isSubmit, children, classNameProps} : Props) {
    return (
        <button 
            type={isSubmit ? 'submit' : 'button'}
            onClick={clickFunction}
            className={`flex justify-center items-center ${label !== undefined ? 'w-fit' : 'w-10'} gap-2 h-10 transition-[background-color] hover:bg-hover duration-200 ease-in-out rounded-full select-none ${styles[classNameProps?.area ?? '']} ${classNameProps?.general ?? ''}`}
        >
            {
                children !== undefined
                ?
                    <>
                    {children}
                    </>
                :
                    null
            }
            {
                label !== undefined
                ?
                    <p className="mx-4">{label}</p>
                :
                    null
            }
        </button>
    )
}
