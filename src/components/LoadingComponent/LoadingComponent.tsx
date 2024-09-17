import styles from '@/components/LoadingComponent/LoadingComponent.module.css'

interface Props {
    classNameProps?: {[key: string]: string;}
}

export default function LoadingComponent({classNameProps} : Props) {
    return (
        <div className={`flex items-center justify-center gap-5 h-full w-full ${styles[classNameProps?.page ?? '']} ${styles[classNameProps?.area ?? '']} ${classNameProps?.general}`}>
            <div className={`${styles.loadingBall}`}></div>
            <div className={`${styles.loadingBall}`}></div>
            <div className={`${styles.loadingBall}`}></div>
        </div>
    )
}