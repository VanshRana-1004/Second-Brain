import { useState } from "react";
import { Button } from "../header components/buttons";
import axios from "axios";
import { Cross } from "../../icons/crossicon";
import { Show } from "../../icons/show";
import { Hide } from "../../icons/hide";
// import { TitleLogo } from "../sidebar components/titlelogo";
import { Title } from "../sidebar components/titles";
import React from "react";
import { ToastContainer, toast } from 'react-toastify';
const apiUrl=import.meta.env.VITE_BACKEND_URL;

interface params{
    up : boolean,
    setUp : (up : boolean)=>void
    setWelcomePage:(welcomePage : boolean)=>void,
    setLogPage:(logPage : boolean)=>void,
    setContentPage:(contentPage : boolean)=>void,
    size : number
}
export function SignUp_Login(props : params){
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');    
    const [show,setShow]=useState(false);
    function handleUsername(event : React.ChangeEvent<HTMLInputElement>){
        setUsername(event.target.value);
    }
    function handlePassword(event : React.ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value);
    }

    interface params{
        username : string,
        password : string
    }
    
    async function signup(){
        const data : params={username,password}
        setUsername('');
        setPassword('');
        try{
            let response=await axios.post(`${apiUrl}/api/v1/signup`,data);
            toast.success('User signed up successfully!',{
                position: "top-center",
                className: "absolute ",
                autoClose: 2000,
            });
            setTimeout(()=>{
                props.setUp(false);    
            },2000);
            
            
        }catch(e){
            if(e=='AxiosError: Request failed with status code 411'){
                toast.error("username already taken...",{
                    position: "top-center",
                    className: "absolute ",
                    autoClose: 2000,
                });
            }
            else if(e=='AxiosError: Request failed with status code 401'){
                toast.error("Incorrect input format...",{
                    position: "top-center",
                    className: "absolute ",
                    autoClose: 2000,
                });
            }
            else{
                toast.error('error : '+e,{
                    position: "top-center",
                    className: "absolute ",
                    autoClose: 2000,
                });
            }
        }
    }

    async function login(){
        const data : params={username,password}
        setUsername('');
        setPassword('');
        try{
            let response=await axios.post(`${apiUrl}/api/v1/login`,data);
            if(response.data.token==undefined){
                // alert('Invalid Token');
                toast.error('Invalid Token',{
                    position: "top-center",
                    className: "absolute ",
                    autoClose: 2000,
                });
                return;
            } 
            localStorage.setItem('authToken',response.data.token);
            toast.loading('User signing in...',{
                position: "top-center",
                className: "absolute ",
                autoClose: 2000,
            })
            setTimeout(()=>{
                props.setLogPage(false);
                props.setContentPage(true);
            },3000);
            
        }catch(e){
            if(e=='AxiosError: Request failed with status code 411'){
                toast.error('User not found',{
                    position: "top-center",
                    className: "absolute ",
                    autoClose: 2000,
                });
            }
            else if(e=='AxiosError: Request failed with status code 401'){
                toast.error('Incorrect credentials',{
                    position: "top-center",
                    className: "absolute ",
                    autoClose: 2000,
                })
            }
            else if(e=='AxiosError: Request failed with status code 403'){
                toast.error('Incorrect credentials',{
                    position: "top-center",
                    className: "absolute ",
                    autoClose: 2000,
                })
            }
            else{
                toast.error('error : '+e,{
                    position: "top-center",
                    className: "absolute ",
                    autoClose: 2000,
                });
            }
        }
    }

    function fixUp(){
        props.setUp(!props.up);
        setUsername('');
        setPassword('');
    }

    const InputStyle=`w-full h-10 rounded-xl outline-none border border-gray-300 shadow-sm text-gray-300  text-md`
    const textStyle=`font-custom text-md font-semibold`
    const placeholderStyle=`text-gray-300 bg-black font-custom text-md font-regular`
    return <div className={`bg-black border shadow-gray-500 shadow-md rounded-md h-[430px] w-96 ${props.size<=500?'w-72':''} flex flex-col pt-1 px-1 m-auto  items-center justify-between`}>
        <ToastContainer/>
        <div className="w-full flex items-baseline justify-end">
            <div className="rounded-2xl hover:bg-gray-800 cursor-pointer" onClick={()=>{props.setLogPage(false),props.setWelcomePage(true)}}><Cross/></div>
        </div>
        <div className={` flex items-center justify-start w-full gap-2 px-6`}>
            <p className={`${textStyle} text-2xl font-semibold text-white`}>Welcome to</p>
            <Title color={"white"} size={500}/>
        </div>
        <p className={`${textStyle} text-md font-semibold text-blue-500`}>Your go-to memory for links, tasks, and docs!</p>
        <div className="flex flex-col  items-center h-full w-full px-6 py-5 pt-2 justify-around  ">
            <div className="w-full ">
                <p className={`${textStyle} text-gray-300`}>Username </p>
                <input type="text" placeholder="Enter username" value={username} onChange={handleUsername} className={`px-3 ${InputStyle} focus-within:ring-2 focus-within:ring-white focus-within:ring-offset placeholder:${placeholderStyle}`}/>
            </div>
            <div className="w-full">
                <p className={`${textStyle} text-gray-300`}>Password</p>
                <div className={`flex items-center px-3 w-[90%]${InputStyle} focus-within:ring-2 focus-within:ring-white focus-within:ring-offset`}>
                    <input type={show?"text":"password"} placeholder="Enter password" value={password} onChange={handlePassword} className={`w-full outline-none border-none placeholder:${placeholderStyle} type:${placeholderStyle} `}/>
                    <div className="rounded-2xl hover:bg-gray-800 cursor-pointer" onClick={()=>{setShow(!show)}} >
                        {!show?<Hide/>:<Show/>}
                    </div>
                </div>
            </div>
            <div className="flex w-full  items-end justify-between ">
                <div className="flex flex-col justify-between ">
                    {!props.up?<p className={`text-sm text-gray-300 ${textStyle}`}>New to this platform?</p>
                    :<p onClick={fixUp} className={`text-sm cursor-pointer text-blue-600 ${textStyle}  hover:underline`}>already have an account?</p>}
                    {!props.up?<p onClick={fixUp} className={`text-xl cursor-pointer text-blue-600 ${textStyle}  hover:underline`}>Create Account</p>:''}             
                </div>
                {props.up?<Button variant="signup" text="SignUp" onClick={signup}  size={"md"}/>
                :<Button variant="login" text="Login" onClick={login}  size={"md"}/>}
            </div>
        </div>
    </div>
}
