import { ReactElement } from "react"

interface Option{
    text: string,
    Logo?: ReactElement,
    onClick: () => void,
    hover : true | false,
    setHover : any,
    showSideBar : boolean,
    icon : boolean,
    size : number
}


export function Option(props : Option){
    let show=false;
    if(props.showSideBar && !props.icon) show=true;
    if(!props.icon) show=true;
    let style=``;
    if(props.showSideBar && !props.icon) style=`justify-between w-72`;
    else style=`justify-center w-8`;
    if(props.size>=768){
        if(!props.icon) style=`justify-between w-72`
    }
    else style=`justify-between w-52`;
    
    return <div className={`ease-in-out transition-all duration-200 ${style} cursor-pointer flex  items-center h-[15%] rounded-xl px-5 hover:bg-gray-700 hover:translate-x-1 `} onClick={props.onClick} onMouseEnter={()=>props.setHover(true)} onMouseLeave={()=>props.setHover(false)}>
        {show || props.size<768?<p className={`font-regular font-custom text-lg py-1 overflow-hidden flex items-center ${(props.hover==true)?"text-white":"text-gray-500"}`}>{props.text}</p>:""}
        <p className="">{props.Logo}</p>
    </div>    
}


