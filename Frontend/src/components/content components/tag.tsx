import { TagIcon } from "../../icons/tagicon";
interface TagProps {
    name ?: string;
    tagRef ?: boolean;
    cursor?:boolean;
    onClick:()=>void;
}
export function Tag(props : TagProps){
    let cursor='';
    if(props.hasOwnProperty('cursor')) cursor='cursor-pointer';
    return <div className={` h-8 tracking-wide border border-gray-200 rounded-2xl text-lg flex flex-wrap gap-1 items-center px-2 ${props.tagRef?'text-black bg-white':'bg-black text-white'} font-custom font-regular ${cursor}`} onClick={props.onClick}><TagIcon len={"14px"} color={props.tagRef} />{props.name}</div>
}
