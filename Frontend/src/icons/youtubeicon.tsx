interface IconProp{
  hover : boolean
}
export function YouTubeIcon(props : IconProp){
    return <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32px" 
    height="26px" 
    viewBox="1 1 20 22" 
    fill="none" 
    stroke={props.hover?"#ffffff":"#9E9E9E"}
    strokeWidth="1.3" 
    strokeLinecap="round" 
    strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="3" ry="3"></rect>
    <polygon points="10 9 15 12 10 15 10 9"></polygon>
  </svg>
  
}