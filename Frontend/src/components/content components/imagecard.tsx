import { useEffect, useState } from "react";
import { YouTubeEmbed,InstagramEmbed } from "react-social-media-embed";
import {TwitterCard} from "./twittercard";

interface params2{
    link : string
}

export function ImageCard(props : params2){
    const [element,setElement]=useState<React.ReactNode>(
        <img src="https://i.sstatic.net/xSMT3.png" alt="default" className="h-full w-full"/>
    )
    const handleError = () => {
        setElement(<img src="https://cdn.dribbble.com/userupload/4487190/file/original-d4c3ba33335a133315f0e2dca0332649.png?resize=752x&vertical=center" alt="default" className="h-full w-full"/>)
    };
    useEffect(()=>{
        const style=`h-full w-full overflow-hidden`;
        const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|svg|tiff|tif|ico|avif|heif|heic|jpx|jp2)$/i;
        try{
            if(props.link.startsWith("https://youtube.com/") || props.link.startsWith("https://youtube.com/") || props.link.startsWith("https://youtu.be/")){
                setElement(<div className={style}>
                    <YouTubeEmbed url={props.link} height={"250px"} width={"283px"} />
                </div>)
            }
            else if(props.link.startsWith("https://x.com/")){
                const url=props.link;
                const correctedUrl = url.replace("x.com", "twitter.com");
                setElement(<div className={style}>
                    <TwitterCard url={correctedUrl}/>
                </div>)
            }
            else if(props.link.startsWith("https://www.instagram.com/")){
                setElement(<div className={style}>
                    <InstagramEmbed url={props.link} />
                </div>)
            }
            else if(imageExtensions.test(props.link) || props.link.startsWith("data:image/jpeg;base64,")){
                setElement(<img src={props.link} alt="default" className={style} onError={handleError}/>)
            }
            else if(props.link.startsWith("https://www.google.com/")){
                setElement(<img src={"https://images2.thanhnien.vn/thumb_w/640/528068263637045248/2024/8/23/wired-uk-google-watching-1724377409027-17243774094672016963639.jpg"} className={style} onError={handleError}/>)
            }
            // else if(props.link.startsWith("https://www.notion.so/")){
            //     setElement(<img src={"https://i0.wp.com/iamsteve.in/wp-content/uploads/2020/11/notion-logo.png?ssl=1"} className={style}/>)
            // }
            else if(props.link.startsWith("https://www.notion.so/") || props.link.startsWith("https://") || props.link.startsWith("https://www.linkedin.com/")){
                try{
                    setElement(<img src={`//image.thum.io/get/${props.link}`} className={`${style}`} onError={handleError}/>)
                    if(props.link=='https://secondbrain-app.vercel.app/'){
                        setElement(<img src={'landing.png'} className={`${style}  w-full h-full`} onError={handleError}/>)
                    }
                }
                catch(e){
                    setElement(<img src="https://cdn.dribbble.com/userupload/4487190/file/original-d4c3ba33335a133315f0e2dca0332649.png?resize=752x&vertical=center" alt="default" className={style} onError={handleError}/>)
                }
            }
            else{
                setElement(<img src="https://cdn.dribbble.com/userupload/4487190/file/original-d4c3ba33335a133315f0e2dca0332649.png?resize=752x&vertical=center" alt="default" className={style} onError={handleError}/>)
            }
        }
        catch (error) {
            console.error("Invalid URL:", error);
        }
    },[props.link]);
    
    return element;
}

