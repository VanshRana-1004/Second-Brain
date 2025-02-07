import { TitleLogo } from "../sidebar components/titlelogo"
import { Button } from "./buttons"
import { Logout } from "../../icons/logouticon"
import {toast,ToastContainer} from 'react-toastify';
const frontEndUrl='https://secondbrain-app.vercel.app/';
interface params{
    setContentPage : (contentPage : boolean)=>void,
    setWelcomePage : (welcomePage : boolean)=>void,
    share : boolean,
    size:number,
    showMenu : boolean,
    setShowMenu : (setMenu : boolean)=>void
}
export function Header(props : params){
    function logout(){
        toast.loading('User logging out...',{
            position: "top-center",
            className: "absolute ",
            autoClose: 2000,
        })
        setTimeout(()=>{
            localStorage.removeItem('authToken');
            props.setContentPage(false);
            props.setWelcomePage(true);
        },2000)
        
    }
    function welcomePage(){
        const newUrl = frontEndUrl; 
        window.open(newUrl, '_blank'); 
    }
    function sideBar(){
        props.setShowMenu(!props.showMenu);
    }
    return <>
        <ToastContainer/>
        <div className={` w-full flex justify-between items-center border-b-2 border-b-gray-700  pl-16 pr-10 bg-black ${props.size<=768?'pr-2 pl-2':''} ${props.size==380?'pl-12 justify-between gap-0 pr-0':''}`}>
            <TitleLogo size={props.size}/>
            <div className='flex gap-2'>
            {props.size<768?<Button variant={"logout"} size={"sm"} text={"Menu"} onClick={sideBar}/>:<></>}
            {!props.share?<Button startIcon={props.size<=768?<></>:<Logout/>} variant={"logout"}  size={"sm"} text={"logout"} onClick={logout} />:
            <Button variant={"shared"} size={"lg"} text={props.size<=500?"Site":"Visit Site"} onClick={welcomePage}/>}
            </div>
            
        </div>
    </>
        
}

