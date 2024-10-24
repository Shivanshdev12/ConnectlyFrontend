import * as React from "react";
const MOBILE_BREAKPOINT = 768;

const useScreenSize=()=>{
    const [isMobile,setIsMobile] = React.useState(window.innerWidth<=MOBILE_BREAKPOINT);
    React.useEffect(()=>{
        const handleResize=()=>{
            setIsMobile(window.innerWidth<=MOBILE_BREAKPOINT);
        }
        window.addEventListener("resize",handleResize);
        return ()=>window.removeEventListener("resize",handleResize);
    },[]);
    return isMobile;
}

export default useScreenSize;