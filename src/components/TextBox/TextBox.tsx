import CopyIcon from "@/icons/CopyIcon";
import FileIcon from "@/icons/FileIcon";
import SoundIcon from "@/icons/SoundIcon";
import { AutoLanguageType, LanguageType, TextBoxType, ToastClass } from "@/utils/types"
import { ChangeEvent, useState } from "react"
import styles from "@/components/TextBox/TextBox.module.css"
import RoundedButton from "@/components/RoundedButton/RoundedButton";
import PasteIcon from "@/icons/PasteIcon";
import { useToast } from "@/hooks/useToast";
import { useGlobalSettings } from "@/hooks/useGlobalSettings";

type Props = {
    type: TextBoxType,
    value: string,
    language: LanguageType | AutoLanguageType,
    placeholder?: string,
    setText?: (text: string) => void,
    submitButton?: {fun: () => void, label: string}
    classNameProps?: {[key: string]: string;}
}

export default function TextBox({type, value, language, placeholder, setText, submitButton, classNameProps} : Props) {
    const { openToast } = useToast()
    const { langData } = useGlobalSettings()
    const { dropzone } = langData.others
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const handleDrag = (e : React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragging(true)
        } else if (e.type === 'dragleave') {
            setIsDragging(false)
        }
    }

    const handleDrop = (e : React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
        if (typeof setText !== 'undefined') {
          if (e.dataTransfer.files) {
            const file = e.dataTransfer.files[0];
    
            if (typeof file !== 'undefined') {
              if (file.type === "text/plain") {
                const reader = new FileReader();
    
                reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
                  const result = readerEvent.target?.result
    
                  if (typeof result === "string") {
                    setText(result);
                  }
                };
    
                reader.readAsText(file);
              } else {
                openToast("invalidDropFile", ToastClass.WARNING)
              }
            }
          }
        }
    }

    const handleChange = (e : ChangeEvent<HTMLTextAreaElement>) => {
        if (typeof setText !== 'undefined') {
            setText(e.target.value)
        }
    }

    const activateSpeech = () => {
        const utterance = new SpeechSynthesisUtterance(value)
        utterance.lang = language
        speechSynthesis.speak(utterance)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(value)
    }

    const pasteFromClipboard = async () => {
        if (typeof setText !== 'undefined') {
            setText(await navigator.clipboard.readText() || '')
        }
    }

    return (
        <div
            className={`${styles[type]} ${styles[classNameProps?.area ?? '']} ${classNameProps?.general} relative flex flex-col gap-2 rounded-lg`}
            onDragEnter={handleDrag}
        >
            {
                type === TextBoxType.WRITE && isDragging
                ?
                    <>
                        <div className={`${styles.dropzone_background}`}>
                            <FileIcon filled duotone className="w-14 h-14" />
                            <p>{dropzone}</p>
                        </div>
                        <div className={`${styles.dropzone}`}
                            onDragEnter={handleDrag}
                            onDragOver={handleDrag}
                            onDragLeave={handleDrag}
                            onDrop={handleDrop}
                        />
                    </>
                :
                    <textarea
                        className={`${styles.textarea} custom-scrollbar`}
                        placeholder={placeholder}
                        autoFocus={type === TextBoxType.WRITE}
                        onChange={handleChange}
                        disabled={type === TextBoxType.READ}
                        value={value}
                    />
            }

            {
                type === TextBoxType.READ || !isDragging
                ?
                    <div className="flex p-2 justify-between">
                        <div className="flex gap-1 ">
                            {
                                value.length !== 0 
                                ?
                                    <RoundedButton clickFunction={activateSpeech}>
                                        <SoundIcon className="w-6 h-6" />
                                    </RoundedButton>
                                :
                                    null
                            }
                            {
                                type === TextBoxType.WRITE 
                                ?
                                    <RoundedButton clickFunction={pasteFromClipboard}>
                                        <PasteIcon className="w-6 h-6" />
                                    </RoundedButton>
                                :
                                    <>
                                    {
                                        value.length !== 0 
                                        ?
                                            <RoundedButton clickFunction={copyToClipboard}>
                                                <CopyIcon className="w-6 h-6" />
                                            </RoundedButton>
                                        :
                                            null
                                    }
                                    </>
                            }
                        </div>
                        {
                            typeof submitButton !== 'undefined' && value.length !== 0
                            ?
                                <RoundedButton 
                                    clickFunction={submitButton.fun}
                                    label={submitButton.label}
                                />
                            :
                                null
                        }
                    </div>
                :
                    null
            }
        </div>
    )
}