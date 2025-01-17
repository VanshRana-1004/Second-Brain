interface IconProp{
  hover ?: boolean,
  len : string,
  color?:boolean | string 
}
export function TagIcon(props : IconProp){
    let strokeColor="#000000";
    if(props.hasOwnProperty("hover")){
      strokeColor=(props.hover)?"#ffffff":"#9E9E9E"; 
    }
    else if(props.hasOwnProperty("color")){
      if(typeof props.color==="boolean") strokeColor=(props.color)?"#000000":"#ffffff"; 
    }
    return <svg height={props.len} width={props.len} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke={strokeColor}  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5" />
  </svg>
}