import { useState } from "react"
import { Option } from "./option"
import { Home } from "../../icons/homeicon"
import { LinkIcon } from "../../icons/linkicon"
import { TweeterIcon } from "../../icons/tweetericon"
import { YouTubeIcon } from "../../icons/youtubeicon"
import { HamburgerIcon } from "../../icons/hamburgericon"
import { Notion } from "../../icons/notionicon"
import { InstaIcon } from "../../icons/instaicon"

interface AllOptionsProps {
    setContentType:(contentType : string)=>void, 
    showSideBar : boolean,
    icon: boolean ,
    setIcon : (icon : boolean) => void,
    showMenu : boolean,
    setShowMenu : (showMenu : boolean) => void,
    size : number
}

export function AllOptions( props : AllOptionsProps){
    function Display(tag : string){
        props.setContentType(tag);
    }
    function menu(){
        if(props.size>=768) props.setIcon(!props.icon)
        else{
            props.setShowMenu(false);
        }
    }
    const hoverArr=Array(7).fill(false).map(()=>useState(false));
    const iconsArr=[<Home hover={hoverArr[0][0]}/>,<HamburgerIcon hover={hoverArr[1][0]}/>,<TweeterIcon hover={hoverArr[2][0]}/>,<YouTubeIcon hover={hoverArr[3][0]}/>,<LinkIcon hover={hoverArr[4][0]}/>,<Notion hover={hoverArr[5][0]}/>,<InstaIcon hover={hoverArr[6][0]}/>]
    const optionArr=["Home","Hide Menu","Tweets","YouTube","Websites","Notions",'Instagram']
    const fxnArr=[()=>{Display("home")},()=>{menu()},()=>{Display("twitter")},()=>{Display("youtube")},()=>{Display("website")},()=>{Display("notion")},()=>{Display("instagram")}];

    const style=`overflow-hidden flex flex-col py-3 px-3 gap-3 h-96 ${props.showSideBar?'justify-start':'justify-center' }  `
   
    return <div className={style}>
        {Array(7).fill(1).map((x,index)=><Option key={index+x} text={optionArr[index]} Logo={iconsArr[index]} onClick={fxnArr[index]} hover={hoverArr[index][0]} setHover={hoverArr[index][1]} showSideBar={props.showSideBar} icon={props.icon} size={props.size} />)}
    </div>
}
  