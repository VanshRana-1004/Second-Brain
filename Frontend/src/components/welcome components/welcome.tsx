import { Title } from "../sidebar components/titles"
import { Button } from "../header components/buttons"
import { useEffect, useState } from "react"

interface params{
    setLogPage: (logPage : boolean)=>void,
    setWelcomePage : (welcome : boolean)=>void,
    setUp: (up : boolean)=>void,
    size : number 
}
export function Welcome(props : params){
    const [isLoading,setIsLoading]=useState(true);
    const [opaque,setOpaque]=useState(false);
    const [guest,setGuest]=useState(false);
    useEffect(()=>{
            setGuest(true);
    },[]);
    useEffect(()=>{
        let interval=setInterval(()=>setOpaque(!opaque),2000);
        return ()=>{
            clearInterval(interval);
        }
    },[opaque])
    function signupFxn(){
        props.setLogPage(true);
        props.setWelcomePage(false);
        props.setUp(true);
    }
    function signinFxn(){            
        props.setLogPage(true);
        props.setWelcomePage(false);
        props.setUp(false)
    }
    return <div className={`h-screen w-screen flex bg-black ${props.size<=940?'flex-col':''}`}>
                <div className={`flex w-full mt-4 justify-between h-auto absolute z-10 text-white ${props.size<=500?'px-2':'px-10'}`}>
                    <div className='flex gap-2'>
                        {props.size>=768 && <img src='https://raw.githubusercontent.com/luyu0279/BrainyAi/main/misc/logo.png' className='h-12 w-12'></img>}
                        <Title color={"white"} size={props.size}/>
                    </div>
                    <div className={`flex  ${props.size<=500?'gap-2':'gap-10'}`}>
                        <Button variant={"signup"} text={"Sign Up"} onClick={signupFxn} size={props.size<=500?'sm':'lg'} ></Button>
                        <Button variant={"login"} text={"Sign In"} onClick={signinFxn} size={props.size<=500?'sm':'lg'}></Button>
                    </div>
                    
                </div>
                <div className={`flex w-1/2 relative  items-end  mb-32 ml-10 mt-5 ${props.size<=940?'w-full justify-start':'mb-16 ml-5 w-3/5'} `}>
                    <video className={`h-full justify-self-start ${props.size<=940?' ml-0 w-5/6 mt-5':''} `} preload="auto" autoPlay loop muted onProgress={()=>setIsLoading(false)}>
                        <source src="brainvideo.mp4" type="video/mp4"/>
                    </video>
                    <div className={`p-5 pb-0 text-white  font-regular text-3xl flex flex-wrap flex-col h-auto w-auto absolute z-10 ml-10 ${props.size<=500?'ml-0 text-xl translate-y-48 -translate-x-16':''}`}>
                            Welcome to your   
                            <br />
                            <div className={`bg-gradient-to-r cursor-default  from-blue-700 via-green-800 to-green-700  text-transparent bg-clip-text text-7xl font-custom font-bold ml-10 ${props.size<=500?'ml-5 text-7xl':''}  `}>
                                Second Brain
                            </div>
                            – where everything important is just a click away!
                    </div>
                </div>
                <div className={`flex flex-col flex-1 bg-gradient-to-r from-bg-black to-bg-gray-950  items-center text-white font-custom font-semibols text-2xl pb-20 px-10 gap-10 ${props.size<=940?'py-40':'py-52'}`}>
                    <div className={`text-gray-400 flex h-auto flex-col text-3xl font-semibold duration-1000 ${opaque?'opacity-0':'opacity-100'} ${props.size<940?'text-2xl':''} ${props.size<=500?'text-xl':''} `}>
                        <p>- Smart Organization,</p>
                        <p>- Easy Access, and</p>
                        <p>- Share Your Brain effortlessly!</p>
                    </div>
                    
                    <div className=" justify-self-end self-center"><Button variant={"getStarted"} text={"Get Started"} onClick={()=>{props.setLogPage(true),props.setWelcomePage(false),props.setUp(true)}} /></div>
                    
                    <div className={`translate-y-12 backdrop-blur bg-white/5 border-white/30 shadow shadow-white/10  rounded-2xl p-2 px-16 flex flex-col items-center hover:scale-105 cursor-default duration-[2000ms] transform ${!guest?'opacity-0':'opacity-100'}`}>
                        <p className={`font-custom text-base font-semibold duration-[5000ms] ${!guest?'opacity-0':'opacity-100'}`}>Explore as a guest</p>
                        <p className={`font-custom text-base duration-[5000ms] ${!guest?'opacity-0':'opacity-100'}`}>username : <b className="text-blue-500">johndoe</b></p>
                        <p className={`font-custom text-base duration-[5000ms] ${!guest?'opacity-0':'opacity-100'}`}>password : <b className="text-blue-500">123456</b></p>
                    </div>
                </div>
            </div>
}
