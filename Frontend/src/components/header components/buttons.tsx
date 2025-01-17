import { ReactElement } from "react"

export interface buttonProps{
    variant: "primary" | "secondary" | "logout" | "login" | "signup" | "add" | 'getStarted' | "shared" | "copy",
    size ?: "sm" | "md" | "lg" | "xs",
    text ?: string,
    startIcon ?: ReactElement,
    endIcon ?: ReactElement,
    onClick ?: () => void,
}

const VariantStyles={
    copy : 'bg-white text-black w-auto',
    secondary:'bg-white text-black w-auto',
    primary:'bg-white text-black w-auto',
    logout:'bg-white text-black w-auto ',
    login:'bg-white text-black w-32 ',
    signup:'bg-white text-black w-32 ',
    add:'bg-white text-black w-auto',
    getStarted : 'bg-white text-black w-auto text-lg',
    shared:'bg-white text-black w-auto'
}

const defaultHover=`translate-x-1 duration-200`
const defaultStyle='font-semibold flex items-center justify-around  hover:text- font-sans rounded-2xl px-5 py-1.5 gap-2 relative '
export function Button(props : buttonProps){
    return <button onClick={props.onClick}
        className={`hover:${defaultHover} ${defaultStyle} ${VariantStyles[props.variant]} ${props.size=='sm'?'w-auto text-sm px-1 py-0.5 justify-center':''} `}>
        {props.startIcon}
        {props.text}
    </button>
}