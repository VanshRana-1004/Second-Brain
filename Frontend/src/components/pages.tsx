import { SignUp_Login } from "./login-signup components/logbox";
import { SideBarContent } from "./sidebar components/sidebarcontent";
import { useEffect, useState } from "react";
import { Welcome } from "./welcome components/welcome";
import { useLocation } from 'react-router-dom';
import { Loader } from "./loaders/gridloader";

interface params{
  welcomePage: boolean;
  logPage: boolean;
  contentPage: boolean;
  up: boolean;
}

interface pageParams{
  size : number
}

export function Page(props : pageParams) {


  
  const getStoredPageState = () => {
    const savedState = localStorage.getItem('pageState');
    return savedState ? JSON.parse(savedState) : { welcomePage: true, logPage: false, contentPage: false, up: false  };
  };

  const [state, setState] = useState(getStoredPageState);

 useEffect(()=>{
   if(localStorage.getItem('authToken')==null){
     setState({ welcomePage: true, logPage: false, contentPage: false, up: false  });
   }
 },[])
  
  useEffect(() => {
    localStorage.setItem('pageState', JSON.stringify(state));
  }, [state]);

  const { welcomePage, logPage, contentPage, up } = state;

  const setWelcomePage = (value: boolean) => setState((prev : params) => ({ ...prev, welcomePage: value }));
  const setLogPage = (value: boolean) => setState((prev : params) => ({ ...prev, logPage: value }));
  const setContentPage = (value: boolean) => setState((prev : params) => ({ ...prev, contentPage: value }));
  const setUp = (value: boolean) => setState((prev : params) => ({ ...prev, up: value }));
  const [loader,setLoader]=useState(false);
  
  useEffect(()=>{
      setLoader(true);
      setTimeout(()=>{
        setLoader(false);
      },2000);
  },[logPage,contentPage])

  return (
    <div className="h-screen w-screen  flex bg-black">
    {loader && !contentPage ?<div className="h-full w-full  flex bg-black"><Loader loading={true}/></div>:
    <div className="h-screen w-screen bg-black flex">
        {welcomePage && logPage==false && contentPage==false && <Welcome setLogPage={setLogPage} setWelcomePage={setWelcomePage} setUp={setUp} size={props.size} />}
        {logPage && welcomePage==false && contentPage==false && <SignUp_Login up={up} setUp={setUp} setWelcomePage={setWelcomePage} setLogPage={setLogPage} setContentPage={setContentPage} size={props.size}/>}
        {contentPage && logPage==false && welcomePage==false && <SideBarContent setContentPage={setContentPage} setWelcomePage={setWelcomePage} share={false} setShare={()=>{}} hash={''} size={props.size}/>}
    </div>}
    </div>
  );
}
 
