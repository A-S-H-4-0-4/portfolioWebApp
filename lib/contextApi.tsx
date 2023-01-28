import { createContext, useContext,useEffect, useState } from 'react';

// sessionStorage
import { getData } from "../local/storage";

interface wrapperInterface {
  session:string
}

const AppContext = createContext<wrapperInterface>({session:""});

export const  AppWrapper = ({ children }) => {
  const [session,setSession] = useState("")
  const componentDidMount = () => {

    const session = getData("session")
    if (session) {
      setSession(session)
    }
 }
  useEffect(()=>{
    if (window.Object!==undefined) {
      componentDidMount()
    }
  
    return ()=>{}
  },[])

  
  return (
    <AppContext.Provider value={{session}}>
      {children}
    </AppContext.Provider>
  );
}

export const useWrapper = ()=>{

  return useContext(AppContext)


}