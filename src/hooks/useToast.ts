import { useContext } from "react";
import { ToastContext } from "../contexts/ToastContext";

export function useToast() {
    const context = useContext(ToastContext)

    if (context == null) {
        throw new Error("This useToast must be in a ToastContext")
    }

    return context
}