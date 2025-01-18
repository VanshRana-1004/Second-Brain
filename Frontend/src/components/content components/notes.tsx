import { Button } from "../header components/buttons"
import { PlusIcon } from "../../icons/plusicon"
import { ShareIcon } from "../../icons/shareicon"
interface params{
    contentType:string,
    onClick : ()=>void,
    share : boolean,
    setShowLink : (showLink : boolean)=>void,
    size : number
}
export function Notes(props : params){
    const heading=props.contentType;
    return <div className={`mx-10 flex items-center justify-between  ${props.size<=768?'py-1 px-2  mx-0':'p-10 py-2'} h-auto bg-black rounded-full border border-gray-900 shadow shadow-gray-800 `}>
        <div className={`font-bold font-custom text-3xl  ${props.size==768?'text-2xl':''} ${props.size<=500?'text-xl':''} ${props.size==380?'text-lg':''}  text-white`}>
            {heading=='home' && 'All Notes'}
            {heading=='twitter' && 'Tweets'}
            {heading=='youtube' && 'YouTube'}
            {heading=='website' && 'Websites'}
            {heading=='notion' && 'Notion'}   
            {heading=='instagram' && 'Instagram'} 
        </div>
        {heading=='home' && !props.share?<Buttons contentType={props.contentType} onClick={props.onClick} share={props.share}  setShowLink={props.setShowLink} size={props.size}/>:''}
    </div>
}

function Buttons(props : params){
    function createLink(){
        props.setShowLink(true);
    }
    return <div className="flex gap-2">
    <Button variant={"primary"} size={props.size<=768?'sm':"lg"} text={props.size<=768?"Share":"Share Brain"} startIcon={props.size<=768?<></>:<ShareIcon variant={"primary"}/>} onClick={createLink}  ></Button>
    <Button variant={"secondary"} size={props.size<=768?'sm':"lg"} text={props.size<=768?"Add":"Add Content"} startIcon={props.size<=768?<></>:<PlusIcon variant={"secondary"}/> } onClick={props.onClick} ></Button>
  </div>
}
