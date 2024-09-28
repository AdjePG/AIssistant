import styles from "@/components/ComboBox/ComboBox.module.css"
import ArrowDownIcon from "@/icons/ArrowDownIcon"
import ArrowUpIcon from "@/icons/ArrowUpIcon"
import { Option } from "@/utils/types"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Props {
    currentValue: Option
    options: Option[]
    selectFunction: (option: Option) => void
    classNameProps?: {[key: string]: string;}
}

export default function ComboBox({ currentValue, options, selectFunction, classNameProps} : Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedOption, setSelectedOption] = useState<Option>(currentValue)

    useEffect(() => {
        setSelectedOption(currentValue)
    }, [currentValue])

    const changeOption = (option: Option) => {
        if (option.value === selectedOption.value) {
            setIsOpen(false)
            return
        }

        if (option) {
            setIsOpen(false)
            setSelectedOption(option);
            selectFunction(option)
        }
    }

    return (
        <div className={`${styles[classNameProps?.area ?? '']} relative select-none flex items-center justify-center bg-tertiary ${classNameProps?.general}`}>
            <div onClick={() => setIsOpen(!isOpen)} className={`flex gap-2 items-center justify-between hover:bg-hover transition-[background-color] duration-200 ease-in-out cursor-pointer ${classNameProps?.selectedOption}`}>
                <div className="flex gap-2 items-center">
                    {
                        selectedOption?.img !== undefined
                        ?
                            <Image
                                src={selectedOption.img}
                                alt={`Image of '${selectedOption.value}'`}
                                width={100}
                                height={100}
                                className="h-6 w-6"
                            />
                        :
                            null
                    }
                    {
                        selectedOption?.label !== undefined
                        ?
                            <p className={`${classNameProps?.mainLabel}`}>{selectedOption.label}</p>
                        :
                            null
                    }
                </div>
                {
                    isOpen
                    ?
                        <ArrowUpIcon className="w-4 h-4" />
                    :
                        <ArrowDownIcon className="w-4 h-4" />
                }
            </div>

            {
                isOpen
                ?
                    <div className={`blue-shadow absolute bg-tertiary rounded-lg p-2 gap-1 z-[2] grid ${classNameProps?.options}`}>
                        {options.map(option => (
                            <div key={option.value} onClick={() => changeOption(option)} className="flex p-2 hover:bg-hover transition-[background-color] duration-200 ease-in-out cursor-pointer items-center rounded-md gap-2 w-full">
                                {
                                    option.img
                                    ?
                                        <Image
                                            src={option.img}
                                            alt={`Image of '${option.label}'`}
                                            width={100}
                                            height={100}
                                            className="h-6 w-6 block"
                                        />
                                    :
                                        null
                                }
                                {
                                    option.label
                                    ?
                                        <p className="block">{option.label}</p>
                                    :
                                        null
                                }
                            </div>
                        ))}
                    </div>
                :
                    null
            }
        </div>
    )
}