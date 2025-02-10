import { Page } from "./components/pages"
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Shared } from "./components/main pages/shared";
import { useState,useEffect } from "react";
function App() {
  return <>
    <Router>
      <Routes>
        <Route path="*" element={<MainComponent />} />
      </Routes>
    </Router>
  </>
}

function MainComponent(){

  const [size,setSize]=useState(1280);

  useEffect(()=>{
    function handle(){
      const cur=window.innerWidth;
      if(cur>=1320) setSize(1320);
      else if(cur>=1260) setSize(1260);
      else if(cur>=1190) setSize(1190);
      else if(cur>=1080) setSize(1000);
      else if(cur>=940) setSize(940);
      else if(cur>=768) setSize(768);
      else if(cur>=500) setSize(500);
      else setSize(380);

    }
    handle();
    window.addEventListener("resize",handle);
    return ()=>{
      window.removeEventListener("resize",handle);
    }
  },[])
      
  
  const [share, setShare] = useState(true);
  const location = useLocation();

  // Extract the hash value from the path or query params
  const queryParams = new URLSearchParams(location.search);
  const hashFromQuery = queryParams.get("");
  const hashFromPath = location.pathname.slice(1); // Remove leading "/"

  // Determine which hash to use
  const hash = hashFromQuery || hashFromPath;

  // Conditional rendering based on the presence of a hash
  if (hash) {
    console.log(hash); // Log the detected hash value
    return (
      <div className="h-screen w-screen flex bg-black">
        <Shared share={share} setShare={setShare} hash={hash} size={size}/>
      </div>
    );
  } else if (location.pathname === "/") {
    return (
      <div className="h-screen w-screen flex bg-black">
        <Page size={size}/>
      </div>
    );
  }

  return <div className="h-screen w-screen flex bg-black">404 Not Found</div>;
}

export default App
