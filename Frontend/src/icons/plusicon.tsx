interface IconProps{
    variant : string;
}

export function PlusIcon(props : IconProps) {
    return <svg width="28px" height="28px" strokeWidth="1.5" viewBox="0 0 24 24" stroke="black"><path d="M6 12H12M18 12H12M12 12V6M12 12V18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
}