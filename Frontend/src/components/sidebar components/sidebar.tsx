import { useState } from "react";
import { AllOptions } from "./alloptions";
interface PropsType{
    contentType:string,
    setContentType:(contentType : string)=>void, 
    showInput:boolean,
    showSideBar: boolean,
    setShowSideBar: (showSideBar:boolean)=>void,
    size : number,
    showMenu : boolean,
    setShowMenu : (showMenu : boolean)=>void
}
 
export function Sidebar(props : PropsType){
    const [icon,setIcon]=useState(true);
    let style=``;
    
    if(props.size<768){
        style='w-68';
    }
    else{
        if(!icon) style='w-80';
        else style=`w-16`;
    }
    return <div className={`z-50 overflow-visible top-0 left-0 flex  flex-col items-center gap-2 duration-200 ease-in-out min-h-screen border-r-2 border-r-gray-700 shadow-gray-500 shadow-md ${props.showInput?'opacity-25':'opacity-100'} ${style}  bg-black`}>
        <AllOptions setContentType={props.setContentType} showSideBar={props.showSideBar} icon={icon} setIcon={setIcon} showMenu={props.showMenu} setShowMenu={props.setShowMenu} size={props.size}/>
    </div>
}
 