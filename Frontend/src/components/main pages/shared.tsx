import { SideBarContent } from "../sidebar components/sidebarcontent";
interface params{
    share : boolean,
    setShare : (share : boolean)=>void,
    hash : string,
    size : number
}
export function Shared(props : params){
    return <div className="bg-[url(https://marketplace.canva.com/NxUJE/MADyQ4NxUJE/1/s2/canva-dark-starry-sky-MADyQ4NxUJE.jpg)] h-full w-full gap-16 flex">
        <SideBarContent setContentPage={()=>{}} setWelcomePage={()=>{}}  share={props.share} setShare={props.setShare} hash={props.hash} size={props.size}/>
    </div>        
}  