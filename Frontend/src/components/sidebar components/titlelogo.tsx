import { Title } from "./titles"
import { Brainicon } from "../../icons/brainicon"
interface params{
    size : number
}
export function TitleLogo(props : params){
    return <div className={`justify-center bg-black h-16 w-fit flex px-3 ${props.size<768?'px-0':''} ease-in-out gap-5 py-2 items-center`}>
{/*         {props.size>=768 && <Brainicon/>} */}
        {props.size>=768 && <img src='https://raw.githubusercontent.com/luyu0279/BrainyAi/main/misc/logo.png' className='h-8 w-8'></img>}
        <Title color={"white"} size={props.size}/>
    </div>
}
