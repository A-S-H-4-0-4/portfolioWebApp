import { createContext, useContext,useEffect, useState } from 'react';

// sessionStorage
import { getData, saveData } from "../local/storage";

interface wrapperInterface {
  session:string,
  themeCallback:Function,
  theme:string,
}

const setCallback = (value:boolean)=>{
  
}

const AppContext = createContext<wrapperInterface>({session:"",themeCallback:setCallback,theme:"light"});


export const  AppWrapper = ({ children }) => {
  const [session,setSession] = useState("")
  
  const [theme,setTheme] = useState("light") 

  const componentDidMount = () => {
      console.log("inside component did");
      
      if (session.trim()==="") {
      const value = getData("session") 
      console.log("inside session");
      setSession(value)
    }
    const oldTheme:string|null = getData("theme")
    if(oldTheme){
      setTheme(oldTheme)
    }
 }
  useEffect(()=>{
    if (window.Object!==undefined) {
      console.log("window");
      
      componentDidMount()
    }
  
    return ()=>{}
  },[])

    console.log("Wrapper check");
    
  const themeCallback = (value:string)=>{

    setTheme(value)
    saveData("theme",value)
  }

  return (
    <AppContext.Provider value={{session,theme,themeCallback:themeCallback}}  >
      {children}
    </AppContext.Provider>
  );
}

export const useWrapper = ()=>{

  return useContext(AppContext)


}