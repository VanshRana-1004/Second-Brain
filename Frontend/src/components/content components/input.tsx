import {  useState } from "react";
import { Button } from "../header components/buttons";
import { Cross } from "../../icons/crossicon";
import axios from 'axios';
import { Tag } from "./tag";
import React from "react";
import { toast,ToastContainer } from "react-toastify";
const apiUrl=import.meta.env.VITE_BACKEND_URL;

interface params{
    title: string,
    description: string,
    link: string,
    allTags: string[],
    date: string,
}
interface params1{
    showInput : boolean
    onClick : ()=>void,
    size : number

}
export function Input(props : params1){
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [link,setLink]=useState('');
    const [allTags,setAllTags]=useState([''])
    const [otherTags,setOtherTags]=useState('');
    const tagsArr=['twitter','document','youtube','notion','website','instagram'];
    const tagsRef=Array(tagsArr.length).fill(false).map((x,index)=>useState(false));
    function handleTitle(event : React.ChangeEvent<HTMLInputElement>){
        setTitle(event.target.value);
    }
    function handleDescription(event : React.ChangeEvent<HTMLInputElement>){
        setDescription(event.target.value);
    }
    function handleLink(event : React.ChangeEvent<HTMLInputElement>){
        setLink(event.target.value);
    }
    function handleOtherTags(event : React.ChangeEvent<HTMLInputElement>){
        setOtherTags(event.target.value);
        let tags=event.target.value;
        const Arr = tags ? (tags.includes(",") ? tags.split(",") : [tags]) : [];
        console.log('other tags : '+Arr);
        setAllTags(Arr);
    }
    function handleTags(){
        const Arr=allTags;
        for(let i=0;i<tagsArr.length;i++) if(tagsRef[i][0]==true) Arr.push(tagsArr[i]);
        if(Arr.length>0) setAllTags(Arr);
    }
    
    async function addcontent(){
        handleTags();
        const date : string =(new Date()).toISOString().split('T')[0];
        const data : params={title,description,link,allTags,date};
        
        try{
            const token = localStorage.getItem('authToken');
            let response=await axios.post(`${apiUrl}/api/v1/content`,data,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            setTitle('');
            setDescription('');
            setLink('');
            setAllTags([]);
            setOtherTags('');
            for(let i=0;i<tagsArr.length;i++){
                tagsRef[i][1](false);
            }
            props.onClick();
            toast.loading('Adding content...',{
                position: "top-center",
                className: "absolute ",
                autoClose: 2000,
            })
        }catch(e){
            toast.warning('Required fields are missing',{
                position: "top-center",
                className: "absolute ",
                autoClose: 2000,
            });
        }
    }

    const textStyle=`font-custom text-md font-semibold`
    const placeholderStyle=`text-gray-300 font-custom text-md font-regular bg-black`
    const InputStyle=`w-full h-10 rounded-xl outline-none border border-gray-300 shadow-sm text-gray-300  text-md`
    return <>
        <ToastContainer/>
        <div className={`z-50 bg-black border shadow-gray-500 shadow-md rounded-md h-3/4  flex flex-col pt-1 px-1 pb-2 items-center absolute overflow-visible left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ${props.size<=768?'w-80':'w-96'} `}>
        <div className="w-full flex items-baseline justify-end">
            <div className="rounded-2xl hover:bg-gray-800 cursor-pointer" onClick={props.onClick}><Cross/></div>
        </div>
        <div className="flex flex-col  items-center h-full w-full px-6 justify-around  ">
            <div className="w-full">
                <p className={`${textStyle} text-gray-300`}>Title </p>
                <input type="text" placeholder="Enter Title" value={title} onChange={handleTitle} className={`px-3 ${InputStyle} focus-within:ring-2 focus-within:ring-white focus-within:ring-offset placeholder:${placeholderStyle}`}/>
            </div>
            <div className="w-full">
                <p className={`${textStyle} text-gray-300`}>Description </p>
                <input type="text" placeholder="Enter Short Description" value={description} onChange={handleDescription} className={`px-3 ${InputStyle} focus-within:ring-2 focus-within:ring-white focus-within:ring-offset placeholder:${placeholderStyle}`}/>
            </div>
            <div className="w-full">
                <p className={`${textStyle} text-gray-300`}>Link </p>
                <input type="text" placeholder="Enter Link" value={link} onChange={handleLink} className={`px-3 ${InputStyle} focus-within:ring-2 focus-within:ring-white focus-within:ring-offset placeholder:${placeholderStyle}`}/>
            </div>
            <div className="w-full">
                <p className={`${textStyle} text-gray-300`}>Select Tags</p>
                <div className="flex flex-wrap gap-2 px-3 py-1 h-auto overflow-hidden ">
                    {Array(tagsArr.length).fill(0).map((x,index)=><Tag key={index} name={tagsArr[index]} cursor={true} tagRef={tagsRef[index][0]} onClick={()=>{tagsRef[index][1](!tagsRef[index][0])}} />)}
                </div>
            </div>
            <div className="w-full">
                <p className={`${textStyle} text-gray-300`}>Other Tags (optional) </p>
                <input type="text" placeholder="Write Tags ( , separated)" value={otherTags} onChange={handleOtherTags} className={`px-3 ${InputStyle} focus-within:ring-2 focus-within:ring-white focus-within:ring-offset placeholder:${placeholderStyle}`}/>
            </div>
            <div className="w-full flex justify-end">
                <Button variant="add" size="lg" text="Add Content" onClick={addcontent} />
            </div>
        </div>   
    </div>
    </>
     
}

