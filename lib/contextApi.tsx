import { createContext, useContext,useEffect, useState} from 'react';
import { useRouter } from 'next/router'
// sessionStorage
import { getData, saveData } from "../local/storage";

interface wrapperInterface {
  session:string,
  sessionCallback:Function,
  themeCallback:Function,
  theme:string,
}

const setCallback = (value:boolean)=>{
  
}
const AppContext = createContext<wrapperInterface>({session:"",sessionCallback:setCallback,themeCallback:setCallback,theme:"light"});


export const  AppWrapper = ({ children }) => {
  const [session,setSession] = useState("")
  const router = useRouter()
  const [theme,setTheme] = useState("light") 

  const componentDidMount = () => {
      if (session.trim()==="") {
      const value = getData("session") 
      setSession(value)
    }
    const oldTheme:string|null = getData("theme")
    if(oldTheme){
      setTheme(oldTheme)
    }
 }
  useEffect(()=>{
    if (window.Object!==undefined) {
      componentDidMount()
    }
    return ()=>{}
  },[])

    
  const themeCallback = (value:string)=>{

    setTheme(value)
    saveData("theme",value)
  }
  
  const sessionCallback = ()=>{
    sessionStorage.clear();
    setSession("");
    router.push("/signin")
  }

  return (
    <AppContext.Provider value={{session,sessionCallback:sessionCallback,theme,themeCallback:themeCallback}}  >
      {children}
    </AppContext.Provider>
  );
}

export const useWrapper = ()=>{

  return useContext(AppContext)


}