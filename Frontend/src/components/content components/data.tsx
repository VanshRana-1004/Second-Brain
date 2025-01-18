import { Notes } from "./notes";
import { MainCard } from "./card";
interface params{
    contentType:string,
    showInput: boolean,
    onClick : ()=>void,
    share : boolean,
    setShowLink : (showLink : boolean)=>void,
    hash : string,
    showContent : boolean,
    setShowContent : (showContent : boolean)=>void,
    size : number
}
export function Data(props : params){
    return <div className={` h-full flex-1 flex-col p-10  pr-0 gap-10 ${props.size<500?'w-full pl-1':'pl-14'} overflow-y-auto scroll-smooth scrollbar-black your-scroll-container`}>
        <Notes contentType={props.contentType} onClick={props.onClick} share={props.share} setShowLink={props.setShowLink} size={props.size}/>
        <MainCard contentType={props.contentType} showInput={props.showInput} share={props.share} hash={props.hash} showContent={props.showContent} setShowContent={props.setShowContent} size={props.size} />
    </div>
} 
 