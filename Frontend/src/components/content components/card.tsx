import axios from "axios";
import { useEffect, useState ,useRef} from "react";
import { Delete } from "../../icons/deleteicon";
import { Open } from "../../icons/openicon";
import { Tag } from "./tag";
import { ImageCard } from "./imagecard";
const apiUrl=import.meta.env.VITE_BACKEND_URL;
interface params1{
    contentType:string,
    showInput : boolean,
    share : boolean,
    hash : string,
    showContent : boolean,
    setShowContent : (showContent : boolean)=>void
    size : number,
}
   
export function MainCard(props : params1){
    const [response, setResponse] = useState<params[]>([]);
    const [deleteRender,setDeleteRender]=useState(false);
    const type : string =props.contentType;
    useEffect(()=>{
        async function getContent(){
            try{
                if(!props.share){
                    const token=localStorage.getItem('authToken');
                    const curResponse=await axios.get(`${apiUrl}/api/v1/content`,{
                        params:{type},
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    });
                    setResponse(curResponse.data.content)
                }
                else{
                    try{
                        const curResponse=await axios.get(`${apiUrl}/api/v1/brain/`,{
                            params: { hash: props.hash, type: type }
                        })
                        setResponse(curResponse.data.content)
                    }catch(e){
                        console.log('error : '+e);
                        props.setShowContent(false);
                    }
                }
            }catch(e){
                props.setShowContent(false);
                console.log('Required fields are missing');
            }
        }
        getContent();
        
    },[props.showInput,deleteRender,props.contentType]);
    let style=`grid-cols-4`;
    if(props.size>=1280) style=`grid-cols-4`;
    else if(props.size>=1260) style=`grid-cols-3`
    else if(props.size>=768) style='grid-cols-2';
    else style='grid-cols-1'
    return<>
        <div className={`relative overflow-x-auto overflow-y-auto gap-10 py-10 px-5 grid ${props.size<=768?'px-3':''} ${style}`}>
            {Array(response.length).fill(0).map((x,index)=>(<Card key={index} title={response[index].title} description={response[index].description} link={response[index].link} tags={response[index].tags} date={response[index].date} _id={response[index]._id} deleteRender={deleteRender} setDeleteRender={setDeleteRender} share={props.share} size={props.size}/>))}
        </div>
    </>
     
}
 
interface params{
    _id : string,
    title: string,
    description: string,
    link : string,
    tags: string[] | [] ,
    date:string,
    deleteRender : boolean,
    setDeleteRender : (deleteRender : boolean)=>void,
    share : boolean,
    size : number
}

export function Card(props : params){
    async function deleteCard(contentId : string){
        const data={contentId};
        const token=localStorage.getItem('authToken');
        try{
            const response=await axios.delete(`${apiUrl}/api/v1/content`,{
                data,
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            props.setDeleteRender(!props.deleteRender);
        }catch(e){
            console.log(e);
        }
    }
    const style=`rounded-2xl hover:bg-gray-800 p-1 cursor-pointer gap-1`
    function openLink(url : string){
        try {
            const validUrl = new URL(url); 
            window.open(validUrl.href, '_blank', 'noopener,noreferrer');
        } catch (error) {
            window.open(
              'https://cdn.dribbble.com/userupload/14704018/file/original-e2278ac50bd1c945c062e0554e4b733d.png?crop=0x0-6000x4500&format=webp&resize=450x338&vertical=center',
              '_blank',
              'noopener,noreferrer'
            );
        }
    }
    return <div className={`border border-gray-800  rounded-xl h-[500px] w-[300px] m-auto ${props.size==380?'w-[290px]':''} bg-black px-3 py-3  flex flex-col overflow-hidden justify-around` }>
            <div className="flex justify-end gap-2">
                <div className={style} onClick={()=>openLink(props.link)}><Open/></div>
                {!props.share && <div className={style} onClick={()=>{deleteCard(props._id)}}><Delete/></div>}
            </div>
            <div className="font-bold text-2xl font-custom text-white ml-2 h-8 overflow-hidden">{props.title}</div>
            <div className="flex flex-wrap font-semibold font-custom text-white text-lg tracking-wide ml-2 h-20 overflow-y-auto scrollbar-hide py-2">{props.description}</div>
            <div className="w-full h-[280px] border border-gray-800 rounded-xl overflow-hidden ">
                <ImageCard link={props.link}/>
            </div>
            <div className="p-2 flex gap-1 bg-black flex-wrap h-24 overflow-y-auto scrollbar-hide">
                {Array((props.tags || []).length).fill(0).map((x,index)=>(<Tag key={index} name={props.tags[index]} tagRef={false} onClick={()=>{}}/>))}
            </div>
            <div className="ml-2 text-md font-semibold font-custom text-white ">Added on : {props.date}</div>
        </div>
}


 
