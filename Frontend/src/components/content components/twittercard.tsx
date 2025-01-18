import { useEffect } from "react";

declare global {
  interface Window {
    twttr: any;
  }
}

const loadTwitterScript = () => {
  if (!document.getElementById("twitter-wjs")) {
    const script = document.createElement("script");
    script.id = "twitter-wjs";
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);
  }
};

interface params{
    url: string;
}
export function TwitterCard(props : params){
  useEffect(() => {
    loadTwitterScript(); 
    const checkAndLoadWidgets = () => {
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load();
      } else {
        setTimeout(checkAndLoadWidgets, 200);
      }
    };

    checkAndLoadWidgets();
  }, [props.url]);

  return (
    <div>
      <blockquote className="twitter-tweet">
        <a href={props.url}></a>
      </blockquote>
    </div>
  );
};
