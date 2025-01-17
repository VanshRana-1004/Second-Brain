interface IconProp{
    hover : boolean
}
export function HamburgerIcon(props : IconProp){
    return <svg width="28px" height="28px" strokeWidth="1.7" viewBox="0 0 24 24"  ><path d="M3 5H21" stroke={props.hover?"#ffffff":"#9E9E9E"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 12H21" stroke={props.hover?"#ffffff":"#9E9E9E"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 19H21" stroke={props.hover?"#ffffff":"#9E9E9E"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
}