// react
import { useEffect } from "react";


// next
import { useRouter } from 'next/router'

// local
import { getData } from "../local/storage";





export default function Home() {
  const router = useRouter()
  useEffect(() => {
    if (window.Object !== undefined) {
      const session = getData("session")
      if (session) {
        router.push("/home")
      } else{
        router.push("/signin")
      }
    }

    
    return () => { }
  }, [])
  return (
    <div>
    </div>
  )
}