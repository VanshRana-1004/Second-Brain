import { Header } from "../header components/headers"
import { Data } from "./data"
interface params{
    share : boolean,
    contentType:string,
    showInput : boolean,
    onClick:()=>void
    setContentPage : (contentPage : boolean)=>void,
    setWelcomePage : (welcomePage : boolean)=>void,
    setShare : (share : boolean)=>void,
    setShowLink : (showLink : boolean)=>void,
    hash : string,
    showContent : boolean,
    setShowContent : (showContent : boolean)=>void,
    size : number
}
export function Content(props : params){
    return<>
        <div className={`${props.showInput?'opacity-10':'opacity-100'} flex flex-col w-full h-screen top-0 absolute transition-all duration-200 ease-in-out`}>
            <Header setContentPage={props.setContentPage} setWelcomePage={props.setWelcomePage} share={props.share} size={props.size}/> 
            <Data contentType={props.contentType} showInput={props.showInput} onClick={props.onClick} share={props.share} setShowLink={props.setShowLink} hash={props.hash} showContent={props.showContent} setShowContent={props.setShowContent} size={props.size}/>
        </div>
    </> 
}
   