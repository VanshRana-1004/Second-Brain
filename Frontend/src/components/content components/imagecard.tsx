import { useEffect, useState } from "react";
import { YouTubeEmbed,XEmbed,InstagramEmbed } from "react-social-media-embed";
import {TwitterCard} from "./twittercard"
import captureWebsite from 'capture-website';

interface params2{
    link : string
}

export function ImageCard(props : params2){
    const [element,setElement]=useState<React.ReactNode>(
        <img src="https://cdn.dribbble.com/userupload/14704018/file/original-e2278ac50bd1c945c062e0554e4b733d.png?crop=0x0-6000x4500&format=webp&resize=450x338&vertical=center" alt="default" className="h-full w-full"/>
    )

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
                setElement(<img src={props.link} alt="default" className={style}/>)
            }
            else if(props.link.startsWith("https://www.google.com/")){
                setElement(<img src={"https://images2.thanhnien.vn/thumb_w/640/528068263637045248/2024/8/23/wired-uk-google-watching-1724377409027-17243774094672016963639.jpg"} className={style}/>)
            }
            else if(props.link.startsWith("https://www.linkedin.com/")){
                setElement(<img src={"https://images.unsplash.com/photo-1704382002666-5dc4fbb522c0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGlua2VkaW58ZW58MHx8MHx8fDA%3D"} className={style}/>)
            }
            else if(props.link.startsWith("https://www.notion.so/")){
                setElement(<img src={"https://i0.wp.com/iamsteve.in/wp-content/uploads/2020/11/notion-logo.png?ssl=1"} className={style}/>)
            }
            else if(props.link.startsWith("https://")){
                async function capture() {
                    try {
                        const buffer = await captureWebsite.buffer(props.link);
                        const blob = new Blob([buffer], { type: "image/png" });
                        const url = URL.createObjectURL(blob);
                        setElement(<img src={url} className="your-css-class" alt="Screenshot" />);
                    } catch (error) {
                        console.error("Error capturing website:", error);
                        setElement(<img src="https://cdn.dribbble.com/userupload/14704018/file/original-e2278ac50bd1c945c062e0554e4b733d.png?crop=0x0-6000x4500&format=webp&resize=450x338&vertical=center" alt="default" className={style}/>);
                    }
                }
                capture();
            }
            else{
                setElement(<img src="https://cdn.dribbble.com/userupload/14704018/file/original-e2278ac50bd1c945c062e0554e4b733d.png?crop=0x0-6000x4500&format=webp&resize=450x338&vertical=center" alt="default" className={style}/>)
            }
        }
        catch (error) {
            console.error("Invalid URL:", error);
        }
    },[props.link]);
    
    return element;
}

