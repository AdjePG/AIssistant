import { ExerciseGuideDetails } from "@/utils/types"
import { useRef, useState } from "react"
import styles from "@/components/TrainingGuide/TrainingGuide.module.css"
import Timer from "@/components/Timer/Timer"
import RoundedButton from "@/components/RoundedButton/RoundedButton"
import TrainingIcon from "@/icons/TrainingIcon"

interface Props {
    guide: ExerciseGuideDetails[],
    training: Record<string, any>
}

export default function TrainingGuide({ guide, training } : Props) {
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(-1)
    const [isRestTime, setIsRestTime] = useState<boolean>(false)
    const bell = useRef(new Audio('/assets/sounds/bell.wav'))

    const setNextExercise = () => {
        setIsRestTime(true)
        if (currentExerciseIndex === guide.length - 1) {
            setCurrentExerciseIndex(-1)
            bell.current.play()
        } else {
            setCurrentExerciseIndex(prevState => prevState + 1)

            if (currentExerciseIndex !== -1) {
                bell.current.play()
            }
        }
    }

    const endRest = () => {
        setIsRestTime(false)
        bell.current.play()
    }

    return (
        <div className={`${styles.training_guide} flex flex-col gap-2 h-full max-h-[600px]`}>
            {
                currentExerciseIndex !== -1 
                ?
                    <>
                    {
                        isRestTime
                        ?
                            <>
                            <div className="bg-primary rounded-lg">
                                <Timer key={`rest-${currentExerciseIndex}`} time={10} onFinish={endRest}/>
                            </div>
                            <p className="bg-[#227dd170] rounded-lg p-4 text-base text-center font-semibold select-none">
                                {currentExerciseIndex === 0 ? training.firstExerciseRest : 
                                    <>
                                    {currentExerciseIndex === guide.length - 1 ? training.lastExerciseRest : training.nextExerciseRest
                                    }
                                    </>
                                }
                            </p>
                            </>
                        :
                            <>
                            <div className="bg-primary rounded-lg">
                                {
                                    guide[currentExerciseIndex]?.time !== undefined
                                    ?
                                        <Timer key={`exercise-${currentExerciseIndex}`} time={guide[currentExerciseIndex].time} onFinish={setNextExercise}/>
                                    :
                                        <div className="flex flex-col justify-center gap-2 items-center h-32 p-4">
                                            <p className="text-4xl select-none font-semibold">{guide[currentExerciseIndex].reps} reps.</p>
                                            <RoundedButton
                                                label={training.nextExerciseButton}
                                                clickFunction={setNextExercise}
                                            />
                                        </div>
                                }
                            </div>
                            <p className="bg-[#227dd170] rounded-lg p-4 text-base text-center font-semibold select-none">{training.currentExercise}</p>
                            </>
                    }
                    <div className={`${styles.training_details} flex flex-col flex-1 py-4 pl-4  gap-2 custom-scrollbar`}>
                        <p className="text-2xl font-semibold first-letter:capitalize">
                            {guide[currentExerciseIndex].exercise}
                        </p>
                        <p>
                            {guide[currentExerciseIndex].description}
                        </p>
                    </div>
                    </>
                :
                    <div className="flex flex-col mx-auto items-center justify-center flex-1 gap-8">
                        <TrainingIcon duotone className="w-28 h-28" />
                        <RoundedButton
                            label={training.startSessionButton}
                            clickFunction={setNextExercise}
                        />
                    </div>
            }
        </div>
    )
}