import { useEffect, useState } from "react"
import { Cross } from "../../icons/crossicon"
import { Button } from "../header components/buttons"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; 
const apiUrl=import.meta.env.VITE_BACKEND_URL;
const frontEndUrl=import.meta.env.VITE_FRONTEND_URL;
interface params{ 
    setShowLink : (showLink : boolean)=>void
    size : number
}
export function Copylink(props : params){
    const [enable,setEnable]=useState(true);
    useEffect(()=>{
        async function getEnable(){
            try{
                const token=localStorage.getItem('authToken');
                const response=await axios.get(`${apiUrl}/api/v1/brain/share`,{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                })
                if(!response.data.enable){
                    setEnable(false);
                }
                else setEnable(response.data.enable);
            }
            catch(e){
                alert('Unable to get the enable status');
            }
        }
        getEnable();
    },[]);
    const [hash,setHash]=useState('');
    useEffect(()=>{
        async function getLink(){
            try{
                const data={enable};
                const token=localStorage.getItem('authToken')
                if (!token) {
                    setHash('Error: No authToken found in localStorage');
                    return;
                }                
                const response=await axios.post(`${apiUrl}/api/v1/brain/share`,data,{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                })
                setHash(frontEndUrl+response.data.hash || 'Error: No hash provided by server');
                if(response.data.hash=='No link to share'){
                    setHash(response.data.hash);
                }
            }catch(e){
                setHash('Error in fetching Url')
            }
        }
        getLink();
    },[enable])
    function copyToClipboard(){
        navigator.clipboard.writeText(hash)
            .then(() => {
                toast.success('Copied to clipboard!',{
                    position: "top-center",
                    className: "absolute ",
                    autoClose: 2000,
                })
            })
            .catch((e) => {
                toast.error("Failed to copy text.",{
                    position: "top-center",
                    className: "absolute ",
                    autoClose: 2000,
                });
            });
    }
    const style=`text-md text-blue-500 hover:underline cursor-pointer`
    return <>
            <ToastContainer/>
            <div className={`z-50 bg-black border shadow-gray-500 shadow-md rounded-xl h-1/4 w-1/2 flex flex-col pt-1 px-1 pb-2 absolute overflow-visible  items-center justify-around left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ${props.size<=768?'w-5/6 h-1/5 ml-5':''}  `}>
                
                <div className="w-full flex items-baseline justify-end">
                    <div className="rounded-2xl hover:bg-gray-800 cursor-pointer" onClick={()=>props.setShowLink(false)}><Cross/></div>
                </div>
                <div className="w-full flex gap-2">
                    <div className="flex justify-center items-center w-full overflow-hidden rounded-xl text-white text-custom bg-gray-800 h-10">
                        {hash}
                    </div>
                </div>
                <div className="flex w-full justify-around px-2 items-center">
                    {enable?<p className={style} onClick={()=>setEnable(!enable)}>Disable Link</p>:<p className={style} onClick={()=>setEnable(!enable)}>Enable Link</p>}
                    <Button variant="copy" size="lg" text="Copy Link" onClick={copyToClipboard}/>
                </div>
                
            </div>
        </>    
}
