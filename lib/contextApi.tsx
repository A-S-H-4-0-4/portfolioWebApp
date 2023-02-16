import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router'

// sessionStorage
import { getData, saveData } from "../local/storage";
import { callAPI } from '../api/api';

interface wrapperInterface {
  session: string,
  sessionCallback: Function,
  themeCallback: Function,
  theme: string,
  phoneNumber: number
}

interface ResponseType {
  message: string;
  data: {};
  errors: [];
}

const setCallback = (value: boolean) => {

}

const AppContext = createContext<wrapperInterface>({ session: "", sessionCallback: setCallback, themeCallback: setCallback, theme: "light", phoneNumber: 0 });


export const AppWrapper = ({ children }) => {
  const [session, setSession] = useState("")
  const router = useRouter()
  const [theme, setTheme] = useState("light")
  const [phoneNumber, setPhoneNumber] = useState<number>(0)
  const componentDidMount = async () => {

    if (session.trim() === "") {
      const value = getData("session")
      setSession(value)
    }
    const oldTheme: string | null = getData("theme")
    if (oldTheme) {
      setTheme(oldTheme)
    }


    if (session.trim() !== "") {
      if (phoneNumber === 0) {
        const response: ResponseType = await callAPI(
          'phoneNumber',
        );
        const { message, data, errors } = response;
        if (message === "success") {
          if (typeof data === "object") {
            const phoneNumber = data['data'].phoneNumber
            setPhoneNumber(+phoneNumber);
          }
        } else if (message === "failed") {
          errors.map((errorObject: any) => {
            const { errorMessage } = errorObject;
            alert(errorMessage);
          });
        } else {
          alert("Some Server error");

        }
      }
    }
  }
  useEffect(() => {
    if (window.Object !== undefined) {
      componentDidMount()
    }
    return () => { }
  }, [])


  const themeCallback = (value: string) => {
    setTheme(value)
    saveData("theme", value)
  }

  const sessionCallback = () => {
    sessionStorage.clear();
    setSession("");
    router.push("/signin")
  }

  return (
    <AppContext.Provider value={{ session, sessionCallback: sessionCallback, theme, themeCallback: themeCallback, phoneNumber }}  >
      {children}
    </AppContext.Provider>
  );
}

export const useWrapper = () => {

  return useContext(AppContext)


}