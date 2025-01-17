import { useState } from "react";
import { AllOptions } from "./alloptions";
interface PropsType{
    contentType:string,
    setContentType:(contentType : string)=>void, 
    showInput:boolean,
    showSideBar: boolean,
    setShowSideBar: (showSideBar:boolean)=>void,
    size : number
}
 
export function Sidebar(props : PropsType){
    const [icon,setIcon]=useState(true);
    let style=``;
    
    if(props.size==380){
        style=`w-12`
        if(props.showSideBar && !icon) style=`w-68`
        if(!icon) style='w-68';
    } 
    else{
        if(!icon) style='w-80';
        else style=`w-16`;
        if(!icon) style='w-80';
    }
    

    return <div className={`z-50 overflow-visible top-0 left-0 flex  flex-col items-center gap-2 duration-200 ease-in-out min-h-screen border-r-2 border-r-gray-700 shadow-gray-500 shadow-md ${props.showInput?'opacity-25':'opacity-100'} ${style}  bg-black`}>
        <AllOptions setContentType={props.setContentType} showSideBar={props.showSideBar} icon={icon} setIcon={setIcon}/>
    </div>
}
 