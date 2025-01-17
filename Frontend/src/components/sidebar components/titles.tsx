interface params{
    color:string,
    size: number
}
export function Title(props : params){
    return <div className="flex items-center overflow-hidden ">
        <p className={`font-bold font-jersey ${props.size<=500?'text-3xl':'text-4xl'}  tracking-wide cursor-default text-${props.color}`}>Second Brain</p>
    </div>
}