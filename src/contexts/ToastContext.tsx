'use client'

import { createContext, useState } from "react"
import Toasts from "../components/Toasts/Toasts"
import { ToastClass, ToastType } from "@/utils/types"

type Props = {
  children: React.ReactElement
}

type ToastContextValue = {
  openToast: (text: string, toastClass: ToastClass, cancelable?: boolean, delay?: number) => void
  closeToast: (id: number) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: Props) {
  const [toasts, setToasts] = useState<ToastType[]>([])

  const openToast = (text: string, toastClass: ToastClass, cancelable: boolean = true, delay: number = 3000) => {
    const newToast: ToastType = {
      id: Date.now(),
      text,
      cancelable,
      toastClass,
      delay
    }

    if (toasts.length < 3) {
      setToasts(prevState => ([...prevState, newToast]))
    } else {
      const newToastList = toasts.splice(1, 2)
      setToasts([...newToastList, newToast])
    }
  }

  const closeToast = (id: number) => {
    setToasts(prevState => prevState.filter(toast => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{
      openToast,
      closeToast
    }}>
      <Toasts toasts={toasts} />
      {children}
    </ToastContext.Provider>
  )
}