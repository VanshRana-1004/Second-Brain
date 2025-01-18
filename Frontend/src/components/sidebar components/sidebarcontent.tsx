import { useState,useEffect } from "react"
import { Sidebar } from "./sidebar";
import { Content } from "../content components/content";
import { Input } from "../content components/input";
import { Copylink } from "../content components/copylink";

interface params{
    setContentPage : (contentPage : boolean)=>void,
    setWelcomePage : (welcomePage : boolean)=>void,
    share : boolean,
    setShare : (share : boolean)=>void,
    hash: string,
    size : number
}
export function SideBarContent(props : params){
    const [showInput,setShowInput]=useState(false);
    const [showSideBar,setShowSideBar]= useState(true);
    const [showLink,setShowLink]=useState(false);
    const [contentType,setContentType]=useState('home');
    const [showContent,setShowContent]=useState(true);

    useEffect(()=>{
        function handle(){
            const curWidth=window.innerWidth;
            const breakPoint=900;
            setShowSideBar(curWidth>=breakPoint);
        }
        handle();
        window.addEventListener("resize",handle);
        return ()=>{
            window.removeEventListener("resize",handle);
        }
    },[]); 
    return <>
        <div className={`flex h-full w-full`}>
        {showContent?
            <div className={`flex h-full w-full relative `}>
            {showInput?<Input showInput={showInput} onClick={()=>setShowInput(false)} size={props.size}/>:''}  
            {showLink?<Copylink setShowLink={setShowLink} size={props.size}/>:''}
            {props.size>=768?<Sidebar contentType={contentType} setContentType={setContentType} showInput={showInput} showSideBar={showSideBar} setShowSideBar={setShowSideBar} size={props.size}/>:<></>}
            <Content contentType={contentType} showInput={showInput} onClick={()=>setShowInput(true)} setContentPage={props.setContentPage} setWelcomePage={props.setWelcomePage} share={props.share} setShare={props.setShare} setShowLink={setShowLink} hash={props.hash} showContent={showContent} setShowContent={setShowContent} size={props.size}/>
            </div>:
            <img src="invalidlink.png" alt="Invalid link" className="-translate-y-5 m-auto h-full shadow-black"/>
        }
    </div>    
    </>
} 

