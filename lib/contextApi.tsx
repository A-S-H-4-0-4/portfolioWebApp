import { createContext, useContext,useEffect, useState } from 'react';

// sessionStorage
import { getData } from "../local/storage";

interface wrapperInterface {
  session:string,
  alertCallback:Function,
  alert:boolean
}

const setCallback = (value:boolean)=>{
  
}

const AppContext = createContext<wrapperInterface>({session:"",alertCallback:setCallback,alert:false});

export const  AppWrapper = ({ children }) => {
  const [session,setSession] = useState("")
  const [showAlert,setShowAlert] = useState(false)

  const componentDidMount = () => {
      console.log("inside component did");
      
      if (session.trim()==="") {
      const value = getData("session")
      console.log("inside session");
      setSession(value)
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
    


  return (
    <AppContext.Provider value={{session,alertCallback:(value:boolean)=>{
      setShowAlert(value)
    },alert:showAlert}}  >
      {children}
    </AppContext.Provider>
  );
}

export const useWrapper = ()=>{

  return useContext(AppContext)


}