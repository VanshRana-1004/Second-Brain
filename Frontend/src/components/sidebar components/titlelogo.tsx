import { Title } from "./titles"
import { Brainicon } from "../../icons/brainicon"
interface params{
    size : number
}
export function TitleLogo(props : params){
    return <div className={`justify-center bg-black h-16 w-fit flex px-3 ${props.size<768?'px-1':''} ease-in-out gap-5 py-2 items-center`}>
        {props.size>=768 && <Brainicon/>}
        <Title color={"white"} size={props.size}/>
    </div>
}