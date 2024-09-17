export enum Colors {
    CURRENT_COLOR = 'currentColor'
}

export enum TranslationLangSide {
    FROM = "from",
    TO = "to"
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
    ca: 'Catalan',
    en: 'English',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    es: 'Spanish',
}
export type LanguageType = keyof typeof Languages

export const AutoLanguage = 'auto'
export type AutoLanguageType = typeof AutoLanguage