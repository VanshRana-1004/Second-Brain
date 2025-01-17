interface IconProp{
    hover : boolean
}
export function Home(props : IconProp){
    return <svg width="28px" height="28px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none"  color={props.hover?"#ffffff":"#9E9E9E"}><path d="M10 18V15C10 13.8954 10.8954 13 12 13V13C13.1046 13 14 13.8954 14 15V18" stroke={props.hover?"#ffffff":"#9E9E9E"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2 8L11.7317 3.13416C11.9006 3.04971 12.0994 3.0497 12.2683 3.13416L22 8" stroke={props.hover?"#ffffff":"#9E9E9E"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M20 11V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V11" stroke={props.hover?"#ffffff":"#9E9E9E"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
}