import { useToast } from '@/hooks/useToast'
import styles from '@/components/Toasts/Toasts.module.css'
import React, { useEffect } from "react"
import { ToastClass, ToastType } from '@/utils/types'
import InfoIcon from '@/icons/InfoIcon'
import SuccessIcon from '@/icons/SuccessIcon'
import WarningIcon from '@/icons/WarningIcon'
import ErrorIcon from '@/icons/ErrorIcon'
import RoundedButton from '@/components/RoundedButton/RoundedButton'
import CloseIcon from '@/icons/CloseIcon'
import { useGlobalSettings } from '@/hooks/useGlobalSettings'

type Props = {
    toasts: ToastType[]
}

type ToastProps = {
    id: number,
    text: string,
    toastClass: ToastClass,
    cancelable: boolean
    delay: number
}

export default function Toasts({ toasts }: Props) {
    if (toasts && toasts.length === 0) return null

    return (
        <div className={`${styles.toasts_container}`}>
        {
            toasts.map(toast => (
            <Toast
                key={toast.id}
                id={toast.id}
                text={toast.text}
                toastClass={toast.toastClass}
                cancelable={toast.cancelable}
                delay={toast.delay} />
            ))
        }
        </div>
    )
}

function Toast({ id, text, toastClass, cancelable, delay }: ToastProps) {
    const { langData } = useGlobalSettings()
    const { types, messages } = langData.toast
    const { closeToast } = useToast()
    let title;
    let icon;

    useEffect(() => {
        const timer = setTimeout(() => {
            closeToast(id)
        }, delay)

        return () => { clearTimeout(timer) }
    }, [])

    if (toastClass === ToastClass.INFO) {
        title = types.info
        icon = InfoIcon
    } else if (toastClass === ToastClass.SUCCESS) {
        title = types.success
        icon = SuccessIcon
    } else if (toastClass === ToastClass.WARNING) {
        title = types.warning
        icon = WarningIcon
    } else {
        title = types.error
        icon = ErrorIcon
    }

    return (
        <div key={id} className={`blue-shadow ${styles.toast}`}>
            <div className={`${styles.icon} ${styles[toastClass]}`}>
                {React.createElement(icon, { className: "block w-6 h-6" })}
            </div>
            <div className={`${styles.message}`}>
                <h2 className={`${styles.title}`}>{title}</h2>
                <p className={`${styles.description}`}>{messages?.[text] ?? text}</p>
            </div>
            {
                cancelable &&
                <div className='cancelable'>
                    <RoundedButton clickFunction={() => closeToast(id)}>
                        <CloseIcon filled className='w-6 h-6' />
                    </RoundedButton>
                </div>
            }
        </div>
    )
}
