export enum Colors {
    CURRENT_COLOR = 'currentColor'
}
export type Option = {
    value: string
    label?: string
    img?: string
}

export enum LightDarkTheme {
    LIGHT = "light",
    DARK = "dark",
    SYSTEM = "light dark"
}

export enum TextBoxType {
    WRITE = "write",
    READ = "read"
}

export enum ToastClass {
    INFO = "info",
    SUCCESS = "success",
    WARNING = "warning",
    ERROR = "error"
}
export type ToastType = {
    id: number,
    text: string,
    toastClass: ToastClass,
    cancelable: boolean,
    delay: number
}

export const Languages = {
    ar: "Arabic",
    ca: "Catalan",
    cs: "Czech",
    da: "Danish",
    el: "Greek",
    en: "English",
    es: "Spanish",
    de: "German",
    fi: "Finnish",
    fr: "French",
    it: "Italian",
    ja: "Japanese",
    nb: "Norwegian",
    pt: "Portuguese",
    ru: "Russian",
    sv: "Swedish",
    uk: "Ukrainian",
    zh: "Chinese"
}
export type LanguageType = keyof typeof Languages

export const AutoLanguage = 'auto'
export type AutoLanguageType = typeof AutoLanguage

export type ExerciseGuideDetails = {
    exercise: string,
    description: string
    time?: number,
    reps?: number
}
