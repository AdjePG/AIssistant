import { useEffect, useState } from "react"

interface Props {
    time: number
    onFinish: () => void
}

export default function Timer({ time, onFinish } : Props) {
    const [currentTime, setCurrentTime] = useState<number>(time)

    useEffect(() => {
        if (currentTime === 0) {
            onFinish()
            return
        }

        const timer = setInterval(() => {
            setCurrentTime(prevState => prevState - 1)
        }, 1000)
        
        return () => clearInterval(timer)
    }, [currentTime])

    const formatTime = () => {
        const minutes = Math.floor(currentTime / 60) 
        const seconds = currentTime % 60

        return [minutes.toString().padStart(2, '0'), seconds.toString().padStart(2, '0')]
    }

    const [minutes, seconds] = formatTime()
    const progressBar = (time - currentTime) * 100 / time;

    return (
        <div className="flex flex-col justify-center items-center gap-4 p-4 h-32">
            <div className="flex text-4xl select-none font-semibold">
                <p className="w-16 text-center">{minutes}</p>
                <p>:</p>
                <p className="w-16 text-center">{seconds}</p>
            </div>
            <div className="h-2 w-full rounded-full duration-1000 ease-linear" style={{ background: `linear-gradient(to right, #227dd170 ${progressBar}%, var(--tertiary) ${progressBar}%)` }}></div>
        </div>
    )
}